# ANÁLISIS DE ROI — SUPCON EN INDUSTRIA CHILENA
## Vidrio y Cemento | 13-abr-2026

---

## 1. ROI: APC PARA HORNO DE VIDRIO — CRISTALERÍAS CHILE

### Datos base

| Parámetro | Valor | Fuente |
|-----------|-------|--------|
| Hornos operando | 6 (3 por planta) | Análisis Cristalerías Chile |
| Capacidad instalada | ~505,000 ton/año vidrio | Análisis interno |
| Producción real estimada | ~379,000 ton/año (75% utilización) | Estimado |
| Ventas consolidadas 2024 | US$285M | Estados financieros |
| Costos operativos estimados | ~US$290M (margen neto -1.96%) | Calculado |
| **Gas natural / combustible** | **~60% de costos operativos** | Benchmark vidrio hueco |

### Cálculo del costo de gas

```
Gas natural (60% costos operativos):
  Costos operativos × 60% = US$290M × 0.60 = US$174M/año en gas + energía

Gas natural (estimado 70% de energía):
  US$174M × 0.70 = **US$122M/año en gas natural**

Distribución por horno (6 hornos):
  US$122M ÷ 6 = **US$20.3M/año por horno** en gas natural
```

### Ahorro con APC (Control Predictivo Avanzado de Combustión)

| Escenario | Ahorro gas | Ahorro $/año (6 hornos) | Ahorro $/año (por horno) |
|-----------|-----------|------------------------|--------------------------|
| Conservador (3%) | 3.0% | **US$3.7M/año** | US$608K/año |
| Base (4%) | 4.0% | **US$4.9M/año** | US$810K/año |
| Optimista (5%) | 5.0% | **US$6.1M/año** | US$1.0M/año |

### Beneficios adicionales (no incluidos en ahorro gas)

| Beneficio | Impacto estimado |
|-----------|-----------------|
| Reducción de paradas no planificadas | US$500K-2M/año (evitar 1-2 paradas × US$250K c/u) |
| Extensión vida útil del horno (+10-15%) | Ahorro de reposición US$85-120M cada 8-10 años |
| Reducción de descarte de vidrio | ~0.5-1% de producción = US$1.4-2.9M/año |
| **Total beneficios adicionales** | **US$1.9-4.9M/año** |

### Inversión y payback

| Concepto | Cantidad | Costo unitario | Total |
|---------|---------|----------------|-------|
| SUPCON ECS-700 (redundante hot-standby) | 6 nodos | US$80K | US$480K |
| I/O y field instruments (por horno) | 6 paquetes | US$60K | US$360K |
| SCADA + HMI (sistema central) | 1 licencia | US$120K | US$120K |
| APC (control predictivo combustión) | 6 instancias | US$50K | US$300K |
| Ingeniería, commissioning, startup | — | — | US$640K |
| Training y documentación | — | — | US$100K |
| **TOTAL INVERSIÓN FASE 1 (6 hornos)** | | | **US$2.0M** |

| Escenario | Ahorro gas | Payback | ROI año 1 | ROI 3 años |
|-----------|-----------|---------|-----------|------------|
| Conservador (3%) | US$3.7M | **6.5 meses** | +83% | +455% |
| Base (4%) | US$4.9M | **4.9 meses** | +143% | +635% |
| Optimista (5%) | US$6.1M | **3.9 meses** | +203% | +815% |

### Conclusión ROI Cristalerías Chile

> **Payback < 1 año en todos los escenarios.** Con el escenario base (4% ahorro gas), la inversión de US$2.0M se recupera en menos de 5 meses. La propuesta es aún más atractiva dado el EBIT negativo de la empresa — necesitan eficiencia urgente.

---

## 2. ROI: APC PARA HORNO DE CEMENTO — POLPAICO

### Datos base

| Parámetro | Valor | Fuente |
|-----------|-------|--------|
| Capacidad instalada | 2.7M ton/año cemento | Top50 |
| Planta integrada (horno) | Cerro Blanco (RM) | Análisis cementeras |
| Producción efectiva estimada | ~1.8M ton/año (67% utilización) | Estimado |
| Consumo específico gas | ~3.2 GJ/ton clinker | Benchmark cemento |
| Toneladas clinker producidas | ~1.95M ton/año (ratio 1.1:1) | Calculado |
| **Gas natural / fuel** | **~60-70% de costos energéticos** | Benchmark cemento |

### Cálculo del costo de combustible

```
Cemento Polpaico Cerro Blanco (~1.8M ton/año producción):
  1,800,000 ton × 3.2 GJ/ton × 0.948 MMBTU/GJ = 5.46M MMBTU/año
  × US$13/MMBTU (precio gas Chile industrial) = **US$71M/año en combustible**

O bien, si el costo energético es ~40% de costos operativos
y el combustible es 65% de energía:
  US$71M/año en combustible

Consumo por horno (3 hornos Cerro Blanco):
  US$71M ÷ 3 = **US$24M/año por horno**
```

### Ahorro con APC para horno de cemento

APC en horno rotatorio de cemento es una de las aplicaciones más maduras del control predictivo. Los benchmarks de la industria (Yokogawa, FLSmidth, ABB) reportan:

| Escenario | Ahorro combustible | Ahorro $/año | Payback |
|-----------|-------------------|--------------|---------|
| Conservador (4%) | 4.0% | **US$2.8M/año** | 12-18 meses |
| Base (6%) | 6.0% | **US$4.3M/año** | 8-12 meses |
| Optimista (8%) | 8.0% | **US$5.7M/año** | 6-9 meses |

### Inversión Polpaico (overlayer ABB existente)

| Concepto | Detalle | Costo |
|---------|---------|-------|
| SUPCON ECS-700 (redundante) | Para 3 hornos + molinos | US$600K |
| APC multivariable (hormigo) | ABB ya tiene Expert Optimizer → coexistencia | US$400K |
| SCADA unificado (overlayer ABB) | 3 plantas | US$350K |
| Historian + Integration gateway | Conexión SAP/ABB/SUPCON | US$250K |
| Ingeniería + commissioning | 6 meses | US$500K |
| Training + docs | — | US$100K |
| **TOTAL** | | **US$2.2M** |

> **Nota:** Polpaico ya tiene ABB 800xA + Expert Optimizer. La propuesta de SUPCON es **coexistencia/overlayer**, no reemplazo. Esto reduce riesgo para el cliente y el payback es más largo (12-18 meses) pero la inversión es menor y el riesgo de rechazo se minimiza.

---

## 3. ROI: DCS PARA GRUPO CBB — SIN DCS CENTRAL

### Datos base

| Parámetro | Valor | Fuente |
|-----------|-------|--------|
| Capacidad instalada | 1.2M+ ton/año cemento | Top50 |
| Plantas con horno | Talcahuano, Concón, Teno (3 integradas) | Análisis cementeras |
| Tecnología actual | SAP + SCADA parcial + PLCs dispersos | LinkedIn tech stack |
| Plan de inversión | US$150M (activo) | Análisis interno |
| Sistemas de automatización | SCADA fragmentado, sin historian | Estimado |

### Cálculo de costos

```
Producción efectiva (75% utilización): ~900K ton/año
  900,000 ton × 3.2 GJ/ton × 0.948 MMBTU/GJ = 2.73M MMBTU/año
  × US$13/MMBTU = **US$35.5M/año en combustible**

Gas por planta (3 plantas):
  US$35.5M ÷ 3 = **US$11.8M/año por planta**
```

### Oportunidad CBB vs. Polpaico

CBB **NO tiene DCS centralizado**. SUPCON puede ofrecer:

| Solución | Beneficio | Ahorro estimado | Inversión | Payback |
|----------|-----------|-----------------|-----------|---------|
| **DCS unificado** (3 plantas) | Control completo horno + molinos | — | US$3.5M | — |
| APC horno (3 plantas) | 5% ahorro gas | US$1.8M/año | US$1.0M | 6-7 meses |
| SCADA + Historian | Visibilidad + datos | US$300K/año (OPEX) | US$600K | — |
| Gateway SAP | Integración en tiempo real | US$200K/año | US$200K | — |
| **PAQUETE COMPLETO** | | **US$2.3M/año** | **US$5.3M** | **~28 meses** |

> **Prioridad alta para CBB:** Sin DCS = oportunidad limpia. El package completo tiene payback de ~28 meses, pero cada módulo individual tiene payback < 1 año. **Vender módulo por módulo** reduce riesgo y genera wins rápidos.

---

## 4. ROI: MELÓN (CEMENTOS MELÓN S.A.) — GRUPO BRESCIA

### Datos base

| Parámetro | Valor | Fuente |
|-----------|-------|--------|
| Grupo | **Grupo Brescia (Perú)** | Análisis cementeras |
| Capacidad total Chile | ~900K ton/año cemento | Top50 |
| Plantas | La Calera (integrada), Puerto Montt (molienda), Ventanas (molienda) | Análisis cementeras |
| Tecnología actual | Sin info pública — menor digitalización que competidores | Estimado |
| Horno | La Calera: desde 1908 (posiblemente modernizado) | Inspección visual |

### Desglose por planta

| Planta | Capacidad | Proceso | Consumo energético |
|--------|-----------|---------|-------------------|
| **La Calera** | ~400K ton/año | Integrada (horno) | ~US$15M/año gas |
| **Puerto Montt** | ~300K ton/año | Molienda (Cemengal) | ~US$1.1M/año eléctrico |
| **Ventanas** | ~200K ton/año | Molienda | ~US$0.7M/año eléctrico |
| **Total** | **~900K ton/año** | | **~US$16.8M/año** |

### Cálculo detallado

```
PLANTA LA CALERA (horno integrado):
  Producción: 400,000 ton × 3.2 GJ/ton × 0.948 MMBTU/GJ = 1.21M MMBTU/año
  Gas anual: 1.21M × US$13/MMBTU = **US$15.7M/año en combustible**
  
  Ahorro APC (5% base): US$785K/año
  Ahorro APC (7% optimista): US$1.1M/año

MOLINOS PUERTO MONTT + VENTANAS:
  Consumo eléctrico: ~35 kWh/ton × 500K ton = 17.5M kWh/año
  Costo eléctrico: 17.5M × US$0.10/kWh = **US$1.75M/año**
  
  Ahorro control molinos (8-12%): US$140K-210K/año
```

### Oportunidad por planta

| Planta | Oportunidad | Ahorro/año | Inversión | Payback |
|--------|-------------|------------|-----------|---------|
| **La Calera (horno)** | DCS + APC para horno antiguo | US$785K-1.1M | US$1.2M | **14-18 meses** |
| **Puerto Montt (molino)** | Control avanzado Cemengal | US$90K-130K | US$250K | **23-33 meses** |
| **Ventanas (molino)** | Control avanzado molino | US$55K-80K | US$200K | **30-44 meses** |
| **Integración grupo Brescia** | Estándar DCS para grupo | — | — | estratégico |

### Pitch para Melón / Grupo Brescia

> *"Melón tiene un horno en La Calera que opera desde 1908. SUPCON puede modernizar el control del horno con un DCS redundante y APC, capturando 5-7% de ahorro en gas — US$785K-1.1M anuales. Y si Brescia busca estandarizar la automatización en sus cementeras de Perú y Chile, podemos ser el estándar del grupo."*

### SKU sugerido para Melón

| Concepto | Detalle | Costo |
|---------|---------|-------|
| SUPCON ECS-700 (redundante) | Para horno La Calera | US$400K |
| APC multivariable (horno) | Control predictivo combustión | US$300K |
| SCADA + HMI | Supervisión planta completa | US$150K |
| Control molinos | Extensión a Puerto Montt/Ventanas | US$350K |
| Ingeniería + commissioning | 4-6 meses | US$300K |
| Training + docs | — | US$50K |
| **TOTAL PAQUETE** | | **US$1.55M** |

> **Nota:** La oportunidad más inmediata es La Calera. Los molinos tienen payback más largo pero son una extensión natural una vez que se gana confianza con el horno.

---

## 5. OPCIONES DE ENTRADA ECONÓMICAS — VIDRIO (PILOTOS)

> **Problema:** La propuesta full DCS (US$2M para Cristalerías, US$1.5M para Cristoro) puede ser difícil de aprobar en un primer encuentro.
> 
> **Solución:** Ofrecer opciones de entrada con inversión baja y payback rápido que demuestren valor antes de escalar.

---

### OPCIÓN A: SCADA-ONLY (Supervisión sin DCS)

**Descripción:** Solo supervisión y visualización. No reemplaza PLCs existentes.

| Componente | Costo |
|-----------|-------|
| SUPCON SCADA (1 licencia) | US$30K |
| Hardware servidor + red | US$20K |
| Ingeniería e instalación | US$50K |
| Training | US$10K |
| **TOTAL** | **US$110K** |

**ROI:**
- Reducción de tiempo de respuesta a alarmas: ~US$50K/año
- Prevención de 1 parada no planificada: US$250K evitados
- **Payback: < 6 meses**

**Pitch:**
> *"No le pedimos que reemplace sus PLCs. Solo le damos visibilidad completa de sus 6 hornos en un solo dashboard — los operadores ven todo desde un pantalla y reaccionan antes de que el problema escale. Inversión de US$110K, payback en menos de 6 meses."*

---

### OPCIÓN B: APC STANDALONE (Sin reemplazar control)

**Descripción:** El APC "observa" y sugiere setpoints. El operador decide. No hay override automático.

| Componente | Costo |
|-----------|-------|
| APC software (1 instancia) | US$40K |
| Conexión a PLCs existentes | US$30K |
| Sensores adicionales (T°, O₂) | US$25K |
| Ingeniería + tuning | US$45K |
| **TOTAL (por horno)** | **US$140K** |

**ROI por horno:**
- Ahorro gas (3-4%): US$600-800K/año
- **Payback: 2-3 meses**

**Para 6 hornos (Cristalerías):**
- Inversión: US$140K × 6 = US$840K
- Ahorro: US$3.6-4.8M/año
- **Payback: 2-3 meses**

**Pitch:**
> *"Nuestro APC 'aprende' el comportamiento de su horno y le sugiere al operador el mejor setpoint de combustión cada 5 minutos. El operador decide si acepta o no. Así capturamos el ahorro sin el riesgo de una implementación full DCS. Inversión de US$140K por horno, payback en 2-3 meses."*

---

### OPCIÓN C: PILOTO EN 1 HORNO (Proof of Concept)

**Descripción:** Implementación completa en 1 horno para demostrar valor. Si funciona, expandir.

| Alcance | Componente | Costo |
|---------|-----------|-------|
| **1 horno** | SUPCON ECS-700 (redundante) | US$80K |
| | I/O + instruments | US$60K |
| | SCADA + HMI | US$40K |
| | APC (1 instancia) | US$50K |
| | Ingeniería (2 meses) | US$60K |
| | **Subtotal 1 horno** | **US$290K** |

**ROI piloto (1 horno):**
- Ahorro gas (4%): US$800K/año
- **Payback: 4.4 meses**

**Escalabilidad:**
- 6 hornos × US$290K = US$1.74M (vs. US$2.0M full)
- Descuento por volumen al escalar

**Pitch:**
> *"Le proposons un piloto en 1 horno. Implementamos el sistema completo (DCS, APC, SCADA) en 6 meses y usted ve los resultados en producción real. Si funciona — y funcionará — escalamos a los otros 5 hornos con un descuento por volumen. Inversión piloto: US$290K, payback: 4 meses."*

---

### OPCIÓN D: EDGE GATEWAY + CLOUD ANALYTICS (IoT)

**Descripción:** Solución ultra-económica. Solo conecta equipos existentes a cloud para análisis.

| Componente | Costo |
|-----------|-------|
| Edge gateway (SUPCON o third-party) | US$5-10K |
| Conexiones PLCs (modbus, OPC) | US$10K |
| Cloud platform (análisis, dashboards) | US$15K/año |
| Implementación | US$25K |
| **TOTAL (primero año)** | **US$55K** |

**ROI:**
- Identificación de anomalías: US$100K/año
- Optimización básica: US$200K/año
- **Payback: < 4 meses**

**Pitch:**
> *"Esto no es un DCS — es un ' wearable' para sus hornos. Conectamos sus PLCs existentes a nuestra plataforma cloud en 2 semanas y usted empieza a ver patrones que antes no veía: cuándo el horno está por derivar, cuándo el quemador está ineficiente, cuándo programar mantenimiento. Inversión: US$55K el primer año, US$15K/año después."*

---

### COMPARATIVA DE OPCIONES

| Opción | Inversión | Ahorro/año | Payback | Riesgo | Escalabilidad |
|--------|----------|-----------|---------|--------|---------------|
| **Full DCS** | US$2.0M | US$4.9M | 4.9 meses | Alto | Completa |
| **SCADA-only** | US$110K | US$300K | 4 meses | Bajo | Limitada |
| **APC Standalone** | US$140K/horno | US$800K/horno | 2-3 meses | Bajo | Alta |
| **Piloto 1 horno** | US$290K | US$800K | 4.4 meses | Medio | Alta |
| **Edge+Cloud** | US$55K | US$300K | 2-4 meses | Muy bajo | Limitada |

---

### ESTRATEGIA RECOMENDADA: STARTER → SCALE

```
FASE 1 (Meses 1-3): APC Standalone en 1 horno
  - Inversión: US$140K
  - Objetivo: Demostrar ahorro verificable
  - Decisor: Gerente de Operaciones

FASE 2 (Meses 4-6): Escalar a los 6 hornos
  - Inversión: US$700K adicional
  - Objetivo: Full APC deployment
  - Decisor: Gerente General (visto el ROI)

FASE 3 (Meses 7-12): Full DCS + SCADA
  - Inversión: US$1.0M adicional
  - Objetivo: Control completo integrado
  - Decisor: CEO (visto el ROI completo)
```

> **Total Fases 1-3:** US$1.84M (vs. US$2.0M full upfront)
> **Ahorro acumulado Fases 1-2:** ~US$1.2M (reintegra inversión Fase 3)

---

## 6. ROI CRISTORO — ADQUISIÓN VIDRALA + EXPANSIÓN US$100M

### Datos base

| Parámetro | Valor | Fuente |
|-----------|-------|--------|
| Planta Maipú actual | ~220K ton/año vidrio | Análisis Cristoro |
| Expansión en curso | +400 ton/día → 1.000+ ton/día | Análisis Cristoro |
| Inversión horno nuevo | US$100M | Análisis Cristoro |
| Producción objetivo | ~365K ton/año | Plan 2026-2028 |
| Costo energía actual | ~US$23M/año (gas + eléctrico) | Estimado |
| Costo energía futuro | ~US$38M/año | Estimado |

### Oportunidad Vidrala

Vidrala es un **comprador institucional** — adquiere empresas y luego estandariza la tecnología. El momento es **ahora** (abril 2026, adquisición reciente):

```
Ventana estratégica:
  1. Cristoro tiene horno nuevo en especificación (ahora = momento de decidir DCS)
  2. Vidrala aún no ha estandarizado la adquisición
  3. SUPCON puede proponer a Vidrala España: "SUPCON como estándar DCS grupo"
     → afecta 14 plantas Vidrala en 8 países
  4. Chile como lighthouse para LatAm
```

### ROI Cristoro (detallado)

| Escenario | Ahorro energía | Ahorro $/año | Inversión | Payback |
|-----------|---------------|--------------|-----------|---------|
| Conservador (3%) | 3.0% | US$690K | US$1.2M | **21 meses** |
| Base (4%) | 4.0% | US$920K | US$1.5M | **19 meses** |
| Optimista (5%) | 5.0% | US$1.15M | US$1.5M | **16 meses** |

> **Nota:** Payback más largo que Cristalerías porque el horno híbrido ya es más eficiente. Pero la propuesta grupal Vidrala (pipeline US$6-21M) justifica la estrategia.

### Pitch para Vidrala (líder mundial, 14 plantas, 8 países)

| Concepto | Valor |
|----------|-------|
| Propuesta | DCS SUPCON como estándar para todo el grupo Vidrala en LatAm |
| Alcance inicial | Chile (Cristoro) + Argentina (2 plantas) + Uruguay (1 planta) |
| Alcance potencial | 14 plantas Vidrala × 1 DCS por planta = ~US$15-20M pipeline |
| Ahorro por planta (APC) | US$500K-1M/año en gas |
| Ahorro grupo (LatAm, 4 plantas) | US$2-4M/año |
| **ROI grupal** | **< 18 meses** |

---

## 7. TABLA RESUMEN — ROI COMPARATIVO

### Opciones Full (Inversión completa)

| Target | Sector | Inversión | Ahorro/año | Payback | ROI año 1 |
|--------|--------|-----------|-----------|---------|-----------|
| **Cristalerías Chile** (full) | Vidrio | US$2.0M | US$4.9M | **4.9 meses** | +143% |
| **Cristalerías** (APC solo/horno) | Vidrio | US$140K | US$800K | **2-3 meses** | +471% |
| **Polpaico** (overlayer ABB) | Cemento | US$2.2M | US$4.3M | **6.1 meses** | +95% |
| **Grupo CBB** (módulo APC) | Cemento | US$1.0M | US$1.8M | **6.7 meses** | +80% |
| **Grupo CBB** (DCS completo) | Cemento | US$5.3M | US$2.3M | **28 meses** | +43% |
| **Melón La Calera** (horno) | Cemento | US$1.2M | US$785K-1.1M | **14-18 meses** | +65-92% |
| **Cristoro** (full) | Vidrio | US$1.5M | US$920K | **19 meses** | +61% |
| **Vidrala LatAm** (4 plantas) | Vidrio | US$6.0M | US$3.0M | **24 meses** | +50% |

### Opciones Light (Entrada económica)

| Opción | Target | Inversión | Ahorro/año | Payback | Ideal para |
|--------|--------|----------|-----------|---------|-----------|
| **SCADA-only** | Cristalerías | US$110K | US$300K | **4 meses** | Primera reunión |
| **APC Standalone** | Por horno | US$140K | US$800K | **2-3 meses** | Decisor técnico |
| **Piloto 1 horno** | Cristalerías | US$290K | US$800K | **4.4 meses** | Prueba de concepto |
| **Edge+Cloud** | Cualquiera | US$55K | US$300K | **2-4 meses** | Rápido y sin riesgo |

### Ranking por atractivo (prioridad KAM)

| Prioridad | Target | Razón | Siguiente paso |
|-----------|--------|-------|----------------|
| 🥇 1 | **Cristalerías Chile** | Payback < 5 meses, EBIT negativo = urgencia | Agendar reunión técnica |
| 🥈 2 | **Grupo CBB (APC)** | Payback 7 meses, plan inversión activo | Contactar Claudio Hurtado |
| 🥉 3 | **Polpaico** | Payback 6 meses, overlayer ABB posible | Investigar contratos ABB vigentes |
| 4 | **Melón La Calera** | Oportunidad estratégica Brescia | Buscar contacto Brescia Perú |
| 5 | **Cristoro/Vidrala** | Pipeline US$15-20M, largo plazo | Preparar pitch Vidrala España |

---

## 8. NÚMEROS PARA EL PITCH EJECUTIVO

### Frase para el Gerente General de Cristalerías Chile:
> *"6 hornos quemando ~US$122M en gas al año. Con un control de combustión avanzado, podemos ahorrarle entre US$3.7M y US$6.1M anuales — con una inversión de US$2M y payback de menos de 6 meses."*

### Frase para el Gerente de Operaciones de Cristoro (Ricardo Munizaga):
> *"El nuevo horno híbrido de Maipú va a quemar ~US$10-15M en gas al año. SUPCON puede instalar un DCS redundante con APC desde el día cero — payback de 9 meses vía eficiencia energética. Y si Vidrala nos deja entrar en Chile como referencia, abrimos la puerta a 14 plantas más."*

### Frase para el CEO de CBB (Jorge Matus):
> *"Tienen 3 plantas con hornos operando con PLCs dispersos y SCADA fragmentado. Les entregamos un DCS unificado con payback en 28 meses, pero el módulo de APC para los 3 hornos se paga solo en 7 meses. Empezamos por ahí."*

### Frase para Polpaico (overlayer ABB):
> *"ABB les dejó un sistema de 2006 con Expert Optimizer que probablemente no se ha actualizado. SUPCON overlayer el ABB existente con SCADA moderno, APC nuevo y historian — sin tocar lo que funciona. Ahorro de US$4.3M/año, payback de 6 meses."*

### Frase para Melón / Grupo Brescia:
> *"Melón tiene un horno en La Calera que opera hace más de un siglo. SUPCON puede modernizar el control del horno con un DCS redundante y APC, capturando 5-7% de ahorro en gas — US$785K-1.1M anuales. Y si Brescia busca estandarizar sus cementeras en Sudamérica, podemos ser el estándar del grupo."*

### Frases para opciones económicas (Vidrio)

#### SCADA-only (US$110K, payback 4 meses):
> *"No le pedimos que reemplace sus PLCs. Solo le damos visibilidad completa de sus 6 hornos en un solo dashboard — los operadores ven todo desde una pantalla y reaccionan antes de que el problema escale. Inversión de US$110K, payback en menos de 6 meses."*

#### APC Standalone por horno (US$140K, payback 2-3 meses):
> *"Nuestro APC 'aprende' el comportamiento de su horno y le sugiere al operador el mejor setpoint de combustión cada 5 minutos. El operador decide si acepta o no. Así capturamos el ahorro sin el riesgo de una implementación full DCS. Inversión de US$140K por horno, payback en 2-3 meses."*

#### Piloto 1 horno (US$290K, payback 4.4 meses):
> *"Le proponemos un piloto en 1 horno. Implementamos el sistema completo (DCS, APC, SCADA) en 6 meses y usted ve los resultados en producción real. Si funciona — y funcionará — escalamos a los otros 5 hornos con un descuento por volumen. Inversión piloto: US$290K, payback: 4 meses."*

#### Edge+Cloud (US$55K, payback 2-4 meses):
> *"Esto no es un DCS — es un 'wearable' para sus hornos. Conectamos sus PLCs existentes a nuestra plataforma cloud en 2 semanas y usted empieza a ver patrones que antes no veía: cuándo el horno está por derivar, cuándo el quemador está ineficiente, cuándo programar mantenimiento. Inversión: US$55K el primer año."*

---

## 9. METODOLOGÍA Y ASSUMPTIONS

| Assumption | Base | Rango sensibilidad |
|-----------|------|-------------------|
| Precio gas natural Chile industrial | US$13/MMBTU | US$10-18/MMBTU |
| Consumo vidrio (por ton vidrio producido) | 15-20 MMBTU/ton | Benchmark vidrio hueco |
| Consumo cemento (por ton clinker) | 3.2 GJ/ton (3.0 MMBTU) | Benchmark industria cemento |
| Ahorro APC vidrio (combustión) | 3-5% | Basado en referencias Emerson Ovation, Yokogawa |
| Ahorro APC cemento (hormigo) | 4-8% | Basado en ABB, FLSmidth, Honeywell referencias |
| Costo DCS SUPCON por horno | US$250-400K | Estimado interno (ECS-700) |
| Costo APC por horno | US$50-100K | Módulo SUPCON APC |
| Vida útil horno vidrio | 8-12 años | Benchmark vidrio hueco |
| Vida útil horno cemento | 15-25 años | Benchmark cemento |

### Sources de benchmark:
- Emerson: "Advanced Combustion Control reduces fuel consumption 3-8% in glass furnaces"
- ABB: "Control Systems in Glass Manufacturing — energy optimization"
- FLSmidth: "ECS/ProcessExpert results in 4-9% fuel savings in cement kilns"
- HeidelbergCement / VICAT: case studies de APC en cemento
- Vidrala annual report 2024: producción, consumo energético por planta
- Cemengal: case studies de molinos Plug&Grind (control de molienda)
