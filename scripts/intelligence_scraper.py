#!/usr/bin/env python3
"""
ProcessFDV Intelligence Scraper
===============================
Fuentes de datos:
  1. IDE Chile FeatureServer (services2.arcgis.com/cRH3tEMPESJz6DMX)
     - Establecimientos_Industriales_RECT       -> data/raw/rect_[region].geojson
     - EstablecimientosIndustrialesRECT_VNorte  -> data/raw/rect_vnorte.geojson
  2. SEA MMA RCA_POL (services3.arcgis.com/aSoEm9TBK2shtWjP)
     - RCA_POL -> data/raw/rca_polygons.geojson
  3. SEIA (seia.sea.gob.cl) -> búsqueda de RCA por tipología industrial
  4. Memorias integradas de empresas (sitios corporativos)

Uso offline air-gapped:
  python3 scripts/intelligence_scraper.py --mode offline
"""

import json
import csv
import time
import argparse
import urllib.request
import urllib.parse
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
RAW_DIR = BASE_DIR / "data" / "raw"
PROC_DIR = BASE_DIR / "data" / "processed"
RAW_DIR.mkdir(parents=True, exist_ok=True)
PROC_DIR.mkdir(parents=True, exist_ok=True)

IDLE_CHILE_SERVER = "https://services2.arcgis.com/cRH3tEMPESJz6DMX/arcgis/rest/services"
SEA_RCA_SERVER = "https://services3.arcgis.com/aSoEm9TBK2shtWjP/arcgis/rest/services"


def fetch_json(url, timeout=30):
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read())


def download_arcgis_layer(service_url, out_geojson_path, layer_id=0, fields="*"):
    """Descarga una capa ArcGIS FeatureServer como GeoJSON."""
    url = f"{service_url}/FeatureServer/{layer_id}/query"
    params = {
        "where": "1=1",
        "outFields": fields,
        "f": "json",
        "returnGeometry": "true",
        "resultRecordCount": 1000,
        "resultOffset": 0
    }
    all_features = []
    while True:
        query_url = url + "?" + "&".join(f"{k}={urllib.parse.quote(str(v))}" for k, v in params.items())
        data = fetch_json(query_url)
        feats = data.get("features", [])
        all_features.extend(feats)
        if len(feats) < 1000:
            break
        params["resultOffset"] += 1000
        time.sleep(0.5)

    out = {
        "type": "FeatureCollection",
        "features": all_features,
        "metadata": {
            "source": service_url,
            "layer_id": layer_id,
            "record_count": len(all_features),
            "downloaded_at": time.strftime("%Y-%m-%d %H:%M:%S")
        }
    }
    with open(out_geojson_path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print(f"  [{len(all_features)} registros] -> {out_geojson_path}")
    return out


def arcgis_to_csv(geojson_path, csv_path, field_map=None):
    """Convierte un GeoJSON descargado a CSV aplanado."""
    with open(geojson_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    features = data.get("features", [])
    if not features:
        print(f"  No features en {geojson_path}")
        return

    attrs_keys = set()
    for feat in features:
        attrs_keys.update(feat.get("attributes", {}).keys())

    rows = []
    for feat in features:
        attrs = feat.get("attributes", {})
        geom = feat.get("geometry", {})
        row = {k: attrs.get(k, "") for k in attrs_keys}
        row["longitude"] = geom.get("x", "")
        row["latitude"] = geom.get("y", "")
        rows.append(row)

    if field_map:
        rows = [{field_map.get(k, k): v for k, v in r.items()} for r in rows]

    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)
    print(f"  [{len(rows)} filas] -> {csv_path}")


def download_retc_layers():
    """Descarga todas las capas RETC disponibles de IDE Chile."""
    print("\n[1] Descargando capas RETC de IDE Chile...")
    layers = [
        (f"{IDLE_CHILE_SERVER}/Establecimientos_Industriales_RECT/FeatureServer/0",
         RAW_DIR / "rect_valparaiso.geojson", 0),
        (f"{IDLE_CHILE_SERVER}/EstablecimientosIndustrialesRECT_VNorte/FeatureServer/0",
         RAW_DIR / "rect_vnorte.geojson", 0),
    ]
    for svc_url, out_path, lid in layers:
        download_arcgis_layer(svc_url, out_path, layer_id=lid)


INE_REGION_MAP = {
    5101: "Región de Valparaíso", 5102: "Región de Valparaíso", 5103: "Región de Valparaíso",
    5104: "Región de Valparaíso", 5105: "Región de Valparaíso",
    5106: "Región de Valparaíso", 5107: "Región de Valparaíso",
    5108: "Región de Valparaíso", 5109: "Región de Valparaíso",
    5110: "Región de Valparaíso", 5111: "Región de Valparaíso",
    5401: "Región de Valparaíso", 5405: "Región de Valparaíso",
    1401: "Región de Tarapacá", 1402: "Región de Tarapacá", 1403: "Región de Tarapacá",
    2101: "Región de Antofagasta", 2102: "Región de Antofagasta", 2103: "Región de Antofagasta",
    3101: "Región de Atacama", 4101: "Región de Coquimbo",
    13101: "Región Metropolitana de Santiago",
    8101: "Región del Biobío", 10101: "Región de Los Lagos",
}
REGION_ALIAS = {"Valparaíso": "Región de Valparaíso"}


def combine_industrial_plants():
    """Combina todos los GeoJSON RETC en un solo CSV industrial_plants.csv."""
    print("\n[2] Combinando plantas industriales en industrial_plants.csv...")
    all_rows = []
    for gj_file in RAW_DIR.glob("rect_*.geojson"):
        with open(gj_file, "r", encoding="utf-8") as f:
            data = json.load(f)
        is_vnorte = "vnorte" in gj_file.stem.lower()
        for feat in data.get("features", []):
            p = feat.get("properties", feat.get("attributes", {}))
            g = feat.get("geometry", {})
            coords = g.get("coordinates", g.get("x", []))
            if is_vnorte:
                cod = p.get("comunaINE", 0)
                reg = INE_REGION_MAP.get(cod, f"Cod_{cod}")
                address = f"{p.get('est_calle','')} {p.get('est_numero','')}".strip()
                all_rows.append({
                    "fid": p.get("FID", ""),
                    "name": p.get("NOMBRE", ""),
                    "category": "Industrial",
                    "region": REGION_ALIAS.get(reg, reg),
                    "province": "",
                    "comuna": "",
                    "comuna_code": str(cod),
                    "address": address,
                    "rut": p.get("RUT", ""),
                    "longitude": coords[0] if isinstance(coords, list) and len(coords) > 0 else "",
                    "latitude": coords[1] if isinstance(coords, list) and len(coords) > 1 else "",
                    "source": "RETC_VNorte",
                })
            else:
                reg = p.get("REGIÓN", p.get("REGION", ""))
                reg = REGION_ALIAS.get(reg, reg) if reg else "Región de Valparaíso"
                all_rows.append({
                    "fid": p.get("FID", ""),
                    "name": p.get("NOMBRE", ""),
                    "category": p.get("CATEGORÍA", p.get("CATEGORIA", "")),
                    "region": reg,
                    "province": p.get("PROVINCIA", ""),
                    "comuna": p.get("COMUNA", ""),
                    "comuna_code": "",
                    "address": p.get("CALLE", p.get("DIRECCION", "")),
                    "rut": p.get("RUT", ""),
                    "longitude": coords[0] if isinstance(coords, list) and len(coords) > 0 else coords,
                    "latitude": coords[1] if isinstance(coords, list) and len(coords) > 1 else "",
                    "source": "RETC_Valparaiso",
                })

    out = PROC_DIR / "industrial_plants.csv"
    with open(out, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=all_rows[0].keys() if all_rows else [])
        writer.writeheader()
        writer.writerows(all_rows)
    print(f"  [{len(all_rows)} plantas] -> {out}")


def download_rca_polygons():
    """Descarga la capa RCA_POL del SEA."""
    print("\n[3] Descargando RCA_POL del SEA...")
    url = f"{SEA_RCA_SERVER}/RCA_POL/FeatureServer/0"
    out = RAW_DIR / "rca_polygons.geojson"
    download_arcgis_layer(url, out)


def filter_expansion_projects():
    """Filtra RCA por keywords de expansión y sector industrial."""
    print("\n[4] Filtrando proyectos de expansión industrial...")
    kw_expansion = ["ampliacion", "ampliación", "mejoramiento", "expansion", "expansión",
                    "nuevo proyecto", "nueva planta", "incremento capacidad"]

    kw_industrial = ["fabril", "industrial", "manufactura", "planta", "celulosa",
                      "mineria", "petroleo", "cemento", "quimica", "litio",
                      "lixiviacion", "concentradora", "fundicion", "refineria",
                      "desaladora", "celulosa", "siderurg", "metalurg", "forestal"]

    kw_exclude = ["aeropuerto", "aerodromo", "carriel", "concesion vial",
                  "carretera", "ruta", "terminal bus", "hospital", "vivienda",
                  "inmobiliari", "embalse"]

    gj_path = RAW_DIR / "rca_polygons.geojson"
    with open(gj_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    expansion_projects = []
    industrial_projects = []

    for feat in data.get("features", []):
        a = feat.get("attributes", {})
        g = feat.get("geometry", {})
        nom = (a.get("NOM_PRO_SE") or "").lower()
        tipo = (a.get("TIPO_SEA") or "").lower()

        is_expansion = any(kw in nom for kw in kw_expansion)
        is_industrial = any(kw in nom or kw in tipo for kw in kw_industrial)
        is_excluded = any(ex in nom for ex in kw_exclude)

        row = {
            "fid": a.get("FID"),
            "project_name": a.get("NOM_PRO_SE"),
            "type": a.get("TIPO_SEA"),
            "sea_file_type": a.get("EIA_O_DIA"),
            "investment_usd": a.get("INVER_DOLA"),
            "rca_number": a.get("NUM_RCA"),
            "rca_year": a.get("ANO_RCA"),
            "title_holder": a.get("TITU_ACTU"),
            "stage": a.get("ETAPA"),
            "region": a.get("REGION"),
            "comuna_code": a.get("COMUNA"),
            "mandante": a.get("MANDANTE"),
            "link_rca": a.get("LINK_RCA"),
            "link_expediente": a.get("LINK_EX_SE"),
            "longitude": g.get("x", ""),
            "latitude": g.get("y", ""),
            "source": "RCA_POL"
        }

        if is_expansion and not is_excluded:
            expansion_projects.append(row)
        if is_industrial and not is_excluded:
            industrial_projects.append(row)

    def save_csv(rows, path):
        if not rows:
            print(f"  0 filas -> {path}")
            return
        with open(path, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=rows[0].keys())
            writer.writeheader()
            writer.writerows(rows)
        print(f"  [{len(rows)} proyectos] -> {path}")

    save_csv(expansion_projects, PROC_DIR / "industrial_expansions.csv")
    save_csv(industrial_projects, PROC_DIR / "rca_industrial_projects.csv")


def generate_summary():
    """Genera un resumen de los datasets."""
    print("\n[5] Resumen de datasets generados...")
    for csv_file in PROC_DIR.glob("*.csv"):
        with open(csv_file, "r", encoding="utf-8") as f:
            count = sum(1 for _ in f) - 1
        print(f"  {csv_file.name}: {count} registros")


def run(mode="online"):
    print("=" * 60)
    print("ProcessFDV Intelligence Scraper")
    print(f"Modo: {mode}")
    print("=" * 60)

    if mode == "online":
        download_retc_layers()
        download_rca_polygons()
        combine_industrial_plants()
        filter_expansion_projects()
    else:
        print("(modo offline - usando datos locales)")

    generate_summary()
    print("\nListo. Datos en data/raw/ y data/processed/")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="ProcessFDV Intelligence Scraper")
    parser.add_argument("--mode", choices=["online", "offline"], default="online",
                        help="online=descarga datos, offline=procesa local")
    args = parser.parse_args()
    run(args.mode)
