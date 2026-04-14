/**
 * Massive Industrial Reference Data Generator
 * Focus: High-fidelity fingerprints for TPT Chile (2009-2026)
 */

(function bootstrap(globalScope) {
    const sectors = {
        mining: {
            customer: "BHP - Minera Escondida / Codelco Andina",
            assets: [
                "Molino SAG 01", "Molino de Bolas 05", "Chancador Primario CP-102",
                "Celda de Flotación 500", "Espesador de Relaves A", "Bomba de Pulpa B-12",
                "Transportadora principal T-10", "Sistema de Control UCS-01"
            ],
            categories: ["Molienda", "Chancado", "Filtros", "Transporte"]
        },
        cellulose: {
            customer: "CMPC Planta Laja / Arauco Mapa",
            assets: [
                "Caldera de Recuperación CR-01", "Digestor Continuo DC-02",
                "Bomba de Licor Negro", "Secadora de Pasta SP-10",
                "Evaporador Efecto 5", "TurboGenerador TG-01"
            ],
            categories: ["Energía", "Cocción", "Blanqueo", "Secado"]
        },
        energy: {
            customer: "Engie Mejillones / Enel Generación",
            assets: [
                "Turbina de Vapor TV-300", "Generador Eléctrico G-102",
                "Bomba de Alimentación Caldera", "Condensador de Superficie",
                "Transformador de Potencia TR-05"
            ],
            categories: ["Turbina", "Generación", "Refrigeración", "Transmisión"]
        }
    };

    const statusOptions = ["Nominal", "Operacional", "Alerta", "Crítico", "Mantenimiento"];
    const metrics = {
        "Vibración (Peak-to-Peak)": "mm/s",
        "Temperatura Cojinete": "°C",
        "Presión de Descarga": "bar",
        "Flujo Másico": "tph",
        "Consumo Energía": "MWh",
        "Vibración Axial": "μm",
        "Corriente de Fase": "A",
        "Velocidad (RPM)": "rpm"
    };

    function randomItem(list) {
        return list[Math.floor(Math.random() * list.length)];
    }

    function generateTags(sectorKey) {
        const sector = sectors[sectorKey];
        const tags = [];
        sector.assets.forEach(asset => {
            Object.entries(metrics).forEach(([tag, unit]) => {
                const baseVal = Math.random() * 500;
                tags.push({
                    category: randomItem(sector.categories),
                    asset,
                    tag,
                    value: parseFloat(baseVal.toFixed(2)),
                    unit,
                    status: randomItem(statusOptions)
                });
            });
        });
        return tags;
    }

    function generateFailures(sectorKey) {
        const sector = sectors[sectorKey];
        const failures = [];
        const issueTypes = [
            "Cavitación en Impulsor", "Desgaste de Revestimiento", "Falla de Aislamiento",
            "Alta Vibración No Lineal", "Inclinación de Eje", "Fuga en Sello Mecánico",
            "Obstrucción de Filtros", "Desequilibrio Térmico"
        ];

        for (let i = 0; i < 40; i++) {
            const year = 2009 + Math.floor(Math.random() * 17);
            const month = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
            const day = String(1 + Math.floor(Math.random() * 28)).padStart(2, '0');

            failures.push({
                date: `${year}-${month}-${day}`,
                asset: randomItem(sector.assets),
                issue: randomItem(issueTypes),
                resolution: "Análisis TPT + Intervención SUPCON Chile",
                downtime: `${Math.floor(Math.random() * 72)}h`,
                costImpact: `USD ${(10000 + Math.random() * 90000).toLocaleString()}`
            });
        }

        return failures.sort((a, b) => b.date.localeCompare(a.date));
    }

    function createBigData() {
        return {
            mining: {
                ...sectors.mining,
                baselineYear: 2024,
                standardTags: generateTags('mining'),
                failureHistory: generateFailures('mining'),
                tcoBenchmark: { legacyBrand: "Metso/Emerson", maintenanceCostYear: 450000, supconSavingPercent: 35 }
            },
            cellulose: {
                ...sectors.cellulose,
                baselineYear: 2024,
                standardTags: generateTags('cellulose'),
                failureHistory: generateFailures('cellulose'),
                tcoBenchmark: { legacyBrand: "Valmet/ABB", maintenanceCostYear: 320000, supconSavingPercent: 32 }
            },
            energy: {
                ...sectors.energy,
                baselineYear: 2024,
                standardTags: generateTags('energy'),
                failureHistory: generateFailures('energy'),
                tcoBenchmark: { legacyBrand: "GE/Siemens", maintenanceCostYear: 580000, supconSavingPercent: 38 }
            }
        };
    }

    let cachedData = null;
    function getBigData(force = false) {
        if (force || !cachedData) {
            cachedData = createBigData();
        }
        return cachedData;
    }

    function exposeToGlobal() {
        if (!globalScope) return;
        globalScope.generateBigData = (force = false) => getBigData(force);
        globalScope.__SUPCON_BIG_DATA__ = getBigData();
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = function(force = false) {
            return getBigData(force);
        };

        if (typeof require !== 'undefined' && require.main === module) {
            const dataset = getBigData(true);
            console.log('const REFERENCE_DATA = ' + JSON.stringify(dataset, null, 4) + ';');
            console.log('\nif (typeof window !== "undefined") { window.REFERENCE_DATA = REFERENCE_DATA; }');
        }
    }

    exposeToGlobal();
})(typeof globalThis !== 'undefined' ? globalThis : window);
