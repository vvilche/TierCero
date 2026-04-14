# ESTRATEGIAS DE ENTRADA POR INDUSTRIA
## Procesos No Críticos → Alta Escalabilidad
**Meta:** Generar confianza, crear referencias, escalar después

---

## PRINCIPIO FUNDADOR

> **"Ningún cliente nos va a entregar su proceso crítico a alguien que no conoce. Pero todos necesitan ayuda con procesos no críticos."**

### Estrategia: Entry Point Strategy

```
Nivel 0 (Entry)          Nivel 1 (Escalada)         Nivel 2 (Core)
     │                         │                           │
     ▼                         ▼                           ▼
┌─────────┐              ┌──────────┐              ┌─────────┐
│Proceso  │              │Proceso   │              │Proceso  │
│NO       │──────────►   │Semi-    │──────────►   │CRÍTICO  │
│crítico  │  Confianza   │crítico   │  Confianza   │         │
│         │  + ROI       │          │  + ROI       │         │
└─────────┘              └──────────┘              └─────────┘

Ejemplos:
- Monitoreo    →  Control básico    →  DCS completo
- Historian    →  SCADA básico      →  SCADA completo
- Sensores     →  Sensores + APC    →  Control total
```

---

## CEMENTO — Estrategia de Entrada

### Proceso NO Crítico: Monitoreo de Hornos

| Aspecto | Detalle |
|---------|---------|
| **Descripción** | Instalar sensores + historian para monitorear temperatura del horno |
| **Beneficio cliente** | Visibilidad sin cambiar operación |
| **Riesgo cliente** | MUY BAJO — no toca control |
| **Riesgo nosotros** | BAJO — si falla, no afecta producción |

#### Entry Point: "Horno Watch"

| Ítem | Detalle |
|-------|---------|
| **Nombre** | Horno Watch |
| **Descripción** | 6 sensores de temperatura + gateway + dashboard en cloud |
| **Equipos** | WZPKB (temp), AEF6512 (switch), supOS basic |
| **Inversión** | US$25-35K por horno |
| **Tiempo implementación** | 2-3 semanas |
| **Beneficio** | Datos históricos, alarmas, reportes |
| **ROI** | Evitar 1 parada no planificada = US$50-100K salvados |

#### Escalabilidad:

```
ENTRY (US$25K/horno)
    │
    ├─► Historian avanzado (US$15K) — trend analysis
    │
    ├─► APC Standalone (US$140K/horno) — optimización
    │
    └─► Full DCS (US$400K/horno) — control total
```

### Pitch:

> *"No le pido que me dé el control de su horno. Solo le instalo 6 sensores de temperatura y le muestro en un dashboard qué está pasando. Inversión: US$25K por horno. Si no le sirve, no pierde nada. Si le sirve, vemos cómo seguimos."*

---

## VIDRIO — Estrategia de Entrada

### Proceso NO Crítico: Control de Calidad en Recocido

| Aspecto | Detalle |
|---------|---------|
| **Descripción** | Monitorear temperatura de recocido para reducir scrap |
| **Beneficio cliente** | Reducción de scrap 2-3% |
| **Riesgo cliente** | MUY BAJO — proceso post-horno |
| **Riesgo nosotros** | BAJO |

#### Entry Point: "Recocido Watch"

| Ítem | Detalle |
|-------|---------|
| **Nombre** | Recocido Watch |
| **Descripción** | Sensores temp + cámara AI + dashboard |
| **Equipos** | WZPKB, WS300 (wireless), supOS |
| **Inversión** | US$15-25K por línea |
| **Beneficio** | Reducción scrap 2-3% |
| **ROI** | 3 meses (scrap reduction) |

#### Escalabilidad:

```
ENTRY (US$20K/línea)
    │
    ├─► SCADA-only (US$50K) — visibilidad general
    │
    ├─► Control recocido (US$100K) — optimización
    │
    └─► Full DCS (US$350K/horno) — control total
```

### Pitch:

> *"El recocido es donde más scrap generan y nadie lo está monitoreando bien. Le instalo sensores + una cámara de AI que detecta defectos. Inversión: US$20K. Reducción de scrap: 2-3%. Si funciona, escalamos al horno."*

---

## MINERÍA — Estrategia de Entrada

### Proceso NO Crítico: Monitoreo de Equipos Críticos (PRIDE Lite)

| Aspecto | Detalle |
|---------|---------|
| **Descripción** | Diagnóstico predictivo de equipos rotativos (molinos, correas) |
| **Beneficio cliente** | Evitar fallas catastróficas |
| **Riesgo cliente** | BAJO — monitoreo nomás |
| **Riesgo nosotros** | BAJO |

#### Entry Point: "Equipment Watch"

| Ítem | Detalle |
|-------|---------|
| **Nombre** | Equipment Watch |
| **Descripción** | 10 sensores vibration + AI en la nube |
| **Equipos** | WS300 (vibración), supOS, PRIDE basic |
| **Inversión** | US$50-80K (10 equipos) |
| **Beneficio** | Predicción de fallas 2 semanas antes |
| **ROI** | Evitar 1 falla = US$200-500K |

#### Escalabilidad:

```
ENTRY (US$60K - 10 equipos)
    │
    ├─► PRIDE full (US$150K) — todos los equipos
    │
    ├─► SCADA de planta (US$200K) — integración
    │
    └─► DCS concentradora (US$2-5M) — control total
```

### Pitch:

> *"No le pido que me dé el control de su concentradora. Le instalo 10 sensores de vibración en sus molinos y con AI le predigo cuándo van a fallar. Inversión: US$60K. Si evitáramos una sola falla de molino, salvamos US$200K. ¿Cuántas fallas tuvo el año pasado?"*

---

## GENERACIÓN ELÉCTRICA — Estrategia de Entrada

### Proceso NO Crítico: Monitoreo de Subestaciones

| Aspecto | Detalle |
|---------|---------|
| **Descripción** | Diagnosticar estado de protecciones y breakers |
| **Beneficio cliente** | Evitar fallas en subestación |
| **Riesgo cliente** | MUY BAJO — monitoreo pasivo |

#### Entry Point: "Substation Watch"

| Ítem | Detalle |
|-------|---------|
| **Nombre** | Substation Watch |
| **Descripción** | Sensores + gateway para diagnóstico de protecciones |
| **Equipos** | Sensores de corriente, WS300, supOS |
| **Inversión** | US$30-50K por subestación |
| **Beneficio** | Diagnóstico remoto, alertas |

#### Escalabilidad:

```
ENTRY (US$40K/subestación)
    │
    ├─► SIS monitoring (US$100K)
    │
    ├─► Integración con DCS (US$200K)
    │
    └─► Control subestación (US$500K+)
```

---

## PULP & PAPER — Estrategia de Entrada

### Proceso NO Crítico: Monitoreo de Digestores

| Aspecto | Detalle |
|---------|---------|
| **Descripción** | Sensores para optimizar carga de digestores |
| **Beneficio cliente** | Reducir consumo de vapor 3-5% |
| **Riesgo cliente** | BAJO |

#### Entry Point: "Digestor Watch"

| Ítem | Detalle |
|-------|---------|
| **Nombre** | Digestor Watch |
| **Descripción** | 4 sensores temp/presión + AI |
| **Equipos** | SKP, WZPKB, supOS |
| **Inversión** | US$35-50K por digestor |
| **Beneficio** | Reducción vapor 3-5% |
| **ROI** | 6 meses |

#### Escalabilidad:

```
ENTRY (US$45K/digestor)
    │
    ├─► APC digestores (US$120K)
    │
    ├─► SCADA planta (US$250K)
    │
    └─► Full DCS (US$1-2M)
```

---

## REFINERÍA/PETROQUÍMICA — Estrategia de Entrada

### Proceso NO Crítico: Monitoreo de Tanks

| Aspecto | Detalle |
|---------|---------|
| **Descripción** | Instrumentación para medición de niveles y temperatura en tanks |
| **Beneficio cliente** | Inventario preciso, seguridad |
| **Riesgo cliente** | MUY BAJO |

#### Entry Point: "Tank Watch"

| Ítem | Detalle |
|-------|---------|
| **Nombre** | Tank Watch |
| **Descripción** | Radares + temp + gateway + dashboard |
| **Equipos** | SL901 (radar), supOS |
| **Inversión** | US$20-30K por tank |
| **Beneficio** | Medición continua, alertas overflow |

#### Escalabilidad:

```
ENTRY (US$25K/tank)
    │
    ├─► Network de tanks (US$150K)
    │
    ├─► SCADA terminal (US$300K)
    │
    └─► Control de planta (US$1M+)
```

---

## ALIMENTOS/BEBIDAS — Estrategia de Entrada

### Proceso NO Crítico: Monitoreo de Calderas

| Aspecto | Detalle |
|---------|---------|
| **Descripción** | Eficiencia de calderas y consumo de vapor |
| **Beneficio cliente** | Reducción combustible 3-5% |
| **Riesgo cliente** | MUY BAJO |

#### Entry Point: "Boiler Watch"

| Ítem | Detalle |
|-------|---------|
| **Nombre** | Boiler Watch |
| **Descripción** | Sensores + análisis de eficiencia |
| **Equipos** | SFE9001 (flujo), WZPKB, supOS |
| **Inversión** | US$15-25K por caldera |
| **Beneficio** | Eficiencia + savings |

#### Pitch:

> *"Le monitoreamos su caldera sin tocar nada. Sensores de flujo y temperatura, AI en la nube. Inversión: US$20K. Savings: 3-5% en gas. Si funciona, le extendemos a sus otras 4 calderas."*

---

## TABLA RESUMEN: Entry Points por Industria

| Industria | Entry Point | Proceso | Inversión | Escalabilidad |
|-----------|------------|---------|----------|---------------|
| **Cemento** | Horno Watch | Temperatura horno | US$25-35K/horno | → Full DCS US$400K |
| **Vidrio** | Recocido Watch | Temp recocido | US$15-25K/línea | → Full DCS US$350K |
| **Minería** | Equipment Watch | Vibración molinos | US$50-80K (10 eq) | → Full DCS US$5M |
| **Generación** | Substation Watch | Protecciones | US$30-50K/sub | → Full DCS US$500K |
| **P&P** | Digestor Watch | Vapor digestores | US$35-50K/dig | → Full DCS US$1-2M |
| **Refinación** | Tank Watch | Nivel tanks | US$20-30K/tank | → Full DCS US$1M |
| **Alimentos** | Boiler Watch | Eficiencia calderas | US$15-25K/cald | → Full DCS US$500K |

---

## PREGUNTA MÁGICA PARA CADA INDUSTRIA

> **"¿Qué equipo o proceso les ha dado más headaches este año?"**

| Industria | Respuesta típica | Entry Point |
|----------|----------------|-------------|
| Cemento | "El horno" | Horno Watch |
| Vidrio | "El recocido" | Recocido Watch |
| Minería | "Los molinos" | Equipment Watch |
| Generación | "Las subestaciones" | Substation Watch |
| P&P | "Los digestores" | Digestor Watch |
| Refinación | "Los tanks" | Tank Watch |
| Alimentos | "Las calderas" | Boiler Watch |

---

## TIMELINE DE ESCALABILIDAD

```
MES 1-3: ENTRY POINT
├── Firmar 1-2 Entry Points
├── Implementar en 2-4 semanas
└── Cliente ve resultados

MES 4-6: PRIMERA ESCALADA
├── Extender a más equipos
├── Añadir análisis/AI
└── Cliente pide más

MES 7-12: SEGUNDA ESCALADA
├── SCADA básico
├── Integración con existentes
└── Cliente confiado

AÑO 2: CORE
├── Full DCS
├── APC
└── Control total
```

---

## EJEMPLO: Cristalerías Chile

### Entry Point: Recocido Watch
```
Inversión: US$20K × 3 líneas = US$60K
Beneficio: Reducción scrap 2-3%
ROI: 3-4 meses
Riesgo cliente: MUY BAJO
```

### Escalada 1: SCADA-only
```
Inversión adicional: US$50K
Beneficio: Visibilidad 6 hornos
Riesgo: BAJO
```

### Escalada 2: APC Standalone
```
Inversión adicional: US$140K/horno
Beneficio: Optimización gas
ROI: 2-3 meses
```

### Escalada 3: Full DCS
```
Inversión: US$350K/horno × 6 = US$2.1M
Beneficio: Control total
Cliente: 100% confiado
```

**Total路径: US$60K → US$2.5M**

---

## PRÓXIMOS PASOS

### Esta semana:
1. Identificar "pain point" de cada cliente
2. Proponer Entry Point específico

### Mayo:
1. Firmar 1-2 Entry Points
2. Implementar en 2-4 semanas
3. Documentar resultados

### Junio-Julio:
1. Extender a más equipos
2. Generar referencias

### 2026:
1. 10+ Entry Points firmados
2. 3-5 primeras escaladas
3. Pipeline 2027: US$5M+

---

**Última actualización:** 14-abr-2026  
**Estrategia:** Entry Points → Escalabilidad → Core Business
