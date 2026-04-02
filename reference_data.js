/**
 * Industrial Reference Data Library - SUPCON Chile
 * High-fidelity benchmarks for Mining, Cellulose, and Energy sectors.
 * Derived from Tier 0 Strategic Planning 2009-2026.
 */

const REFERENCE_DATA = {
    mining: {
        customer: "Codelco - División Andina",
        baselineYear: 2024,
        standardTags: [
            { category: "Concentradora", asset: "Molino de Bolas 01", tag: "Consumo_Potencia", value: 4500, unit: "kW", status: "Crítico" },
            { category: "Concentradora", asset: "Celda de Flotación 05", tag: "Flujo_Aire", value: 85, unit: "m3/hr", status: "Operacional" },
            { category: "Chancado Primario", asset: "Chancador Giratorio", tag: "Temp_Aceite", value: 54, unit: "°C", status: "Nominal" },
            { category: "Relaves", asset: "Espesador A1", tag: "Torque", value: 12.5, unit: "%", status: "Nominal" }
        ],
        failureHistory: [
            { date: "2024-03-12", asset: "Molino de Bolas 01", issue: "Alta Vibración", resolution: "Reemplazo de Rodamientos", downtime: "12h" },
            { date: "2024-05-02", asset: "Valvula_Control_01", issue: "Fuga en Sello", resolution: "Actualización de Kit de Sellos", downtime: "4h" }
        ],
        tcoBenchmark: {
            legacyBrand: "Fisher",
            maintenanceCostYear: 145000,
            supconSavingPercent: 32
        }
    },
    cellulose: {
        customer: "Celulosa Arauco - Planta Nueva Aldea",
        baselineYear: 2024,
        standardTags: [
            { category: "Digestor", asset: "Cocedor Principal", tag: "Presión_Vapor", value: 12.4, unit: "bar", status: "Nominal" },
            { category: "Blanqueo", asset: "Alimentador Químico", tag: "Nivel_pH", value: 4.2, unit: "pH", status: "Operacional" },
            { category: "Caldera Recuperadora", asset: "Ventilador de Tiro", tag: "RPM_Motor", value: 1450, unit: "rpm", status: "Nominal" }
        ],
        failureHistory: [
            { date: "2024-02-20", asset: "Ventilador de Tiro", issue: "Sobrecalentamiento", resolution: "Revisión Sist. Enfriamiento", downtime: "8h" }
        ],
        tcoBenchmark: {
            legacyBrand: "Metso/Neles",
            maintenanceCostYear: 185000,
            supconSavingPercent: 28
        }
    },
    desalination: {
        customer: "Antofagasta Minerals - Los Pelambres",
        baselineYear: 2024,
        standardTags: [
            { category: "Osmosis Inversa", asset: "Rack_RO_C", tag: "Flujo_Permeado", value: 420, unit: "m3/hr", status: "Crítico" },
            { category: "Bombas Alta Presión", asset: "BAP_03", tag: "Presión_Entrada", value: 65, unit: "bar", status: "Nominal" }
        ],
        failureHistory: [
            { date: "2024-01-15", asset: "BAP_03", issue: "Ensuciamiento de Membrana", resolution: "Limpieza CIP", downtime: "24h" }
        ],
        tcoBenchmark: {
            legacyBrand: "Flowserve",
            maintenanceCostYear: 210000,
            supconSavingPercent: 35
        }
    }
};

if (typeof window !== 'undefined') {
    window.REFERENCE_DATA = REFERENCE_DATA;
}
