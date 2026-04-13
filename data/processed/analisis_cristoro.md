# ANÁLISIS COMERCIAL: CRISTORO S.A.
## Procesos industriales y oportunidades para SUPCON
**Fecha:** 13-abr-2026 | **Target:** Cristoro S.A. | **Sector:** Vidrio Hueco

---

## 1. PERFIL DE LA EMPRESA

| Dato | Detalle |
|------|---------|
| RUT | 96.572.220-6 |
| Casa Matriz | Santiago, Chile |
| Plantas | Maipú (RM) + Cerrillos (RM) |
| Capacidad actual | ~600 ton/día vidrio (~220K ton/año) |
| Capacidad objetivo | 1.000+ ton/día (~365K ton/año) |
| Proceso | Hornos híbridos gas + eléctrico |
| Grupo económico | Grupo Toro / Familia Toro |
| Dueño estratégico | **Vidrala S.A.** (adquirida 2025-2026) |
| Contacto operaciones | Ricardo Munizaga, Francisco Ruiz |

### Desempeño y contexto

Cristoro es la segunda mayor productoras de vidrio de Chile. En 2025-2026 fue adquirida por **Vidrala**, el líder mundial del vidrio hueco con operaciones en 8 países y 14 plantas.

> **VENTANA ESTRATÉGICA CRÍTICA:** La adquisición por Vidrala es el momento ideal para proponer a SUPCON como estándar DCS del grupo.

---

## 2. PLAN DE EXPANSIÓN — US$100M

### Proyectos en curso

| Proyecto | Detalle | Estado |
|----------|---------|--------|
| **Horno híbrido Maipú** | +400 ton/día, gas + eléctrico | En especificación |
| **Planta Cerrillos** | Modernización y expansión | En evaluación |
| **Capacidad total** | 700+ → 1.000+ ton/día | Plan 2026-2028 |

### Inversión estimada por componente

```
Nuevo horno híbrido (400 ton/día):
  - Inversión total: ~US$100M
  - Incluye: horno, Batch House, líneas IS
  - DCS: NO especificado aún = OPORTUNIDAD

Horno actual Maipú (300 ton/día):
  - Ya opera con tecnología híbrida
  - Posible overlayer DCS

Planta Cerrillos:
  - Modernización pendiente
  - Evaluación de nuevos equipos
```

---

## 3. PROCESO PRODUCTIVO

### Mapa de procesos (similar a Cristalerías Chile)

```
                    ┌─────────────────┐
                    │  RECEPCIÓN Y     │
                    │  ALMACENAJE      │  ← Materias primas
                    │  DE MATERIAS     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  BATCH HOUSE    │  ← Dosificación + mezclado
                    │  (Nueva obra)   │    Control automático
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  HORNO DE        │
                    │  FUNDICIÓN       │  ← HÍBRIDO: gas + eléctrico
                    │  (Nuevo Híbrido)│    Temperatura: ~1.500°C
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  MÁQUINAS IS    │  ← Individual Section
                    │  (Formado)      │    6-8 secciones
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  RECOCIDO       │  ← Alivio tensiones
                    │  + INSPECCIÓN   │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  EMBOLSADO      │
                    │  + DESPACHO     │
                    └─────────────────┘
```

### Diferenciador: Horno híbrido gas + eléctrico

| Característica | Horno convencional | Horno híbrido Cristoro |
|----------------|--------------------|-----------------------|
| Combustible | 100% gas natural | Gas + energía eléctrica |
| Eficiencia | ~55-60% | ~70-75% |
| Emisiones CO₂ | Altas | Reducidas (hasta 30%) |
| Control | Manual/semi-automático | Automatizable |
| Costo operación | US$15-20/ton | US$12-16/ton (estimado) |

> **Implicación:** El horno híbrido tiene más variables de control que uno convencional. Un DCS con APC puede optimizar el ratio gas/eléctrico en tiempo real.

---

## 4. ESTADO ACTUAL DE AUTOMATIZACIÓN

### Lo que se sabe

| Área | Estado | Fuente |
|------|--------|--------|
| DCS | NO definido para horno nuevo | Inspección |
| SCADA | NO mencionado | — |
| PLCs | Probablemente PLCs dispersos | Estimado |
| ERP | Probablemente sistema básico | Estimado |
| Referencias | Sin info pública | — |

### Gaps identificados

| Gap | Impacto | Oportunidad SUPCON |
|-----|---------|-------------------|
| **Sin DCS definido** | Horno nuevo en especificación — momento ideal | **DCS desde día cero** |
| **Control híbrido** | Optimizar ratio gas/eléctrico requiere multivariable | **APC especializado** |
| **Sin estándar grupo** | Vidrala no ha estandarizado | **Propuesta grupal LatAm** |
| **Sin visibilidad** | Operadores sin dashboard integrado | **SCADA + HMI** |

---

## 5. OPORTUNIDAD ESTRATÉGICA: VIDRALA

### Por qué Vidrala es el cliente, no Cristoro

Vidrala es una **corporación institucional** que:
1. Adquiere empresas de vidrio
2. Estandariza tecnología en todas sus plantas
3. Busca proveedores de largo plazo

```
Chile (Cristoro):
  - 2 plantas, 1.000+ ton/día
  - Horno nuevo en especificación = DECISIÓN AHORA
  
LatAm (4 plantas):
  - Argentina: 2 plantas
  - Uruguay: 1 planta
  - Chile: 1-2 plantas (post-expansión)
  
Global (14 plantas, 8 países):
  - España, Portugal, Francia, Alemania
  - Argentina, Uruguay, Chile
  - Arabia Saudita, China
```

### Propuesta para Vidrala

> **"SUPCON como estándar DCS del grupo Vidrala en Latinoamérica"**

| Alcance | Detalle | Valor |
|---------|---------|-------|
| **Fase 1 (Cristoro Chile)** | DCS + APC para horno nuevo + overlayer horno actual | US$1.5M |
| **Fase 2 (LatAm)** | 4 plantas × US$1.5M | US$6.0M pipeline |
| **Fase 3 (Global)** | 14 plantas × US$1.5M | US$21M potencial |

### Pitch para Vidrala España

> *"Vidrala acaba de adquirir Cristoro en Chile — una de las plantas más modernas de Sudamérica con un horno híbrido de US$100M en especificación. Este es el momento para definir el DCS de esa inversión. SUPCON propone ser el estándar de automatización para Cristoro y, si la experiencia es exitosa, para las 4 plantas de Vidrala en LatAm y eventualmente las 14 plantas del grupo. Empezamos con Chile como lighthouse."*

---

## 6. ROI CRISTORO — DETALLE

### Datos base

| Parámetro | Valor | Fuente |
|-----------|-------|--------|
| Producción actual | ~220K ton/año | Estimado |
| Producción objetivo (post-expansión) | ~365K ton/año | Plan |
| Horno nuevo | +400 ton/día (~146K ton/año) | Plan |
| Costo gas actual | ~US$15-18M/año | Estimado |
| Costo eléctrico (híbrido) | ~US$5-8M/año | Estimado |
| Costo total energía | ~US$20-26M/año | Calculado |

### Cálculo de ahorro

```
PRODUCCIÓN ACTUAL (220K ton/año):
  220,000 ton × 18 MMBTU/ton = 3.96M MMBTU/año
  Gas: 3.96M × US$13 = US$51M/año ← MUY ALTO, verificar

CORRECCIÓN: Consumo vidrio hueco típico
  ~5-7 MMBTU/ton vidrio (más eficiente que estimado)
  
Producción: 220,000 ton × 6 MMBTU/ton = 1.32M MMBTU/año
Gas: 1.32M × US$13 = **US$17.2M/año**
Eléctrico híbrido: ~US$6M/año
Total energía: **US$23M/año**

PRODUCCIÓN FUTURA (365K ton/año):
  365,000 × 6 MMBTU/ton = 2.19M MMBTU/año
  Gas futuro: **US$28.5M/año**
  Eléctrico futuro: ~US$10M/año
  Total energía futura: **US$38.5M/año**
```

### ROI con APC (Control Predictivo Avanzado)

| Escenario | Ahorro | Ahorro $/año | Inversión | Payback |
|-----------|--------|--------------|-----------|---------|
| **Conservador (3%)** | 3.0% | US$690K | US$1.2M | **21 meses** |
| **Base (4%)** | 4.0% | US$920K | US$1.5M | **19 meses** |
| **Optimista (5%)** | 5.0% | US$1.15M | US$1.5M | **16 meses** |

> **Nota:** El payback es más largo que Cristalerías porque el horno híbrido ya es más eficiente. Sin embargo, la oportunidad de estándar grupal (14 plantas) justifica la estrategia.

### Inversión sugerida

| Componente | Detalle | Costo |
|-----------|---------|-------|
| SUPCON ECS-700 (redundante) | 2 nodos para horno nuevo + actual | US$400K |
| I/O + instruments | Sensores T°, presión, gas | US$200K |
| SCADA + HMI | Dashboard multi-horno | US$150K |
| APC (híbrido) | Control multivariable gas/eléctrico | US$250K |
| Ingeniería + commissioning | 6 meses | US$350K |
| Training + docs | — | US$50K |
| **TOTAL FASE 1** | | **US$1.4M** |

### Beneficio adicional: Extensión vida útil horno

| Beneficio | Impacto |
|-----------|---------|
| Extensión vida útil (+15%) | Ahorro de reposición US$15M por cada año adicional |
| Reducción paradas no planificadas | US$200-500K/año evitados |
| Optimización ratio gas/eléctrico | US$300-500K/año |

---

## 7. MAPA DE DECISORES

| Rol | Nombre | Área | Abordar con |
|-----|--------|------|------------|
| **Gerente General** | (?) | Dirección | Pitch Vidrala grupal |
| **Gerente de Operaciones** | Ricardo Munizaga | Operaciones | DCS + APC |
| **Ingeniero automatización** | Francisco Ruiz | Técnica | Demo técnica |
| **Contacto Vidrala España** | (por identificar) | Grupo | Propuesta estándar LatAm |

---

## 8. COMPETIDORES

| Competidor | Presencia en Cristoro | Cómo atacar |
|-----------|----------------------|-------------|
| **ABB** | Posible legacy | Mejor precio, soporte local |
| **Siemens** | Probable propuesta | 30-40% menor costo TCO |
| **Schneider** | Menor foco vidrio | Mejor tecnología para híbrido |
| **Honeywell** | Bajo foco Chile | Overkill para vidrio |

---

## 9. PRÓXIMOS PASOS

- [ ] **Identificar contacto Vidrala España** — LinkedIn, web corporativa
- [ ] **Agendar reunión con Ricardo Munizaga** — visita planta Maipú
- [ ] **Preparar demo APC para horno híbrido** — case study Emerson/Yokogawa
- [ ] **Calcular ROI con datos reales** de producción Cristoro (buscar memoria anual)
- [ ] **Preparar pitch grupal** para Vidrala: "SUPCON como estándar LatAm"

---

## RESUMEN EJECUTIVO

> Cristoro es la segunda mayor productoras de vidrio de Chile con un plan de expansión de US$100M culminando con un horno híbrido nuevo. Fue adquirida por Vidrala en 2025-2026, lo que abre una ventana estratégica para proponer a SUPCON como estándar DCS del grupo. El horno híbrido (gas + eléctrico) requiere un sistema de control multivariable que un APC bien configurado puede optimizar, ahorrando 4-5% del costo energético (US$920K-1.15M/año). La oportunidad más valiosa es la propuesta grupal para Vidrala LatAm (4 plantas, ~US$6M pipeline) con potencial global de 14 plantas (~$21M).

