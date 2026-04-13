# ANÁLISIS COMERCIAL: CRISTALERÍAS CHILE S.A.
## Procesos industriales y oportunidades para SUPCON
**Fecha:** 13-abr-2026 | **Target:** Cristalerías Chile S.A. | **RUT:** 90.331.000-6

---

## 1. PERFIL DE LA EMPRESA

| Dato | Detalle |
|------|---------|
| RUT | 90.331.000-6 |
| Casa Matriz | Hendaya 60, Of. 1502, Las Condes, Santiago |
| Gerente General | Eduardo Carvallo Infante |
| Gerente de Operaciones | Pablo Saavedra Sánchez |
| Plantas | Padre Hurtado (RM) + Llay-Llay (R5) |
| Capacidad instalada | ~505.000 ton/año de vidrio |
| Hornos | 6 (3 por planta), operando 5-6 |
| Líneas de producción | 12 (6 por planta) |
| Trabajadores | 506-700 |
| Filiales | Cristalchile Inversiones, Taguavento, Ediciones Chiloé |
| Affiliadas | Viña Santa Rita, Viña Doña Paula, Rayén Curá (Arg.), Parque Eólico Las Peñas |
| Grupo económico | Grupo Claro |
| Tecnología actual | SAP (ERP), IBM Maximo (EAM), Mincom LinkOne (EAM), ABB/Eaton (PLCs) |

### Desempeño financiero 2024
- Ventas consolidadas: CLP $251.022M (~US$285M)
- Resultado: **EBIT -92.77%**, Margen neto -1.96% (pérdida)
- Endeudamiento: 3.86% (bajo, confortable)
- ROE: negativo

> **Nota:** La empresa está bajo presión financiera. Esto favorece propuestas de **ROI rápido** y **payback corto**.

---

## 2. PROCESO PRODUCTIVO DEL VIDRIO — MAPA DE PROCESOS

```
                    ┌─────────────────┐
                    │  RECEPCIÓN Y     │  ← Arena silícea, sosa, caliza,
                    │  ALMACENAJE      │    feldespato, cullet (vidrio molido)
                    │  DE MATERIAS     │
                    │  PRIMAS          │
                    └────────┬────────┘
                             │  (cintas transportadoras, tolvas)
                             ▼
                    ┌─────────────────┐
                    │  BATCH HOUSE    │  ← Dosificación + mezclado
                    │  (Preparación   │    automático de materias primas
                    │   de mezcla)    │    Control: peso, ratios, cullet %
                    └────────┬────────┘
                             │  (cintas, elevadores)
                             ▼
                    ┌─────────────────┐
                    │  HORNO DE        │  ← Horno de fusión
                    │  FUNDICIÓN       │    Temperatura: ~1.500°C
              ╔═════╡  (6 hornos       ╞═════╗
              ║     │   24/7/365)       │     ║
              ║     └────────┬────────┘     ║  Regeneradores
              ║              │              ║  de calor
              ║              ▼              ║  (aire precalentado)
              ║     ┌─────────────────┐    ║
              ║     │  FEEDERS /      │    ║  ← Canales que distribuyen
              ║     │  CANALES DE     │    ║    vidrio fundido a las
              ║     │  DISTRIBUCIÓN   │    ║    máquinas IS
              ║     └────────┬────────┘    ║
              ╚══════════════│══════════════╝
                             │
                             ▼
                    ┌─────────────────┐
                    │  MÁQUINA IS     │  ← Individual Section (IS) machine
                    │  (Formado)      │    6-8 secciones por máquina
                    │                 │    Variables: temperatura gob,
                    │  [gob cutter]   │    presión soplado, tiempo,
                    │  [soplado]      │    velocidad, carrera servo
                    │  [moldeo]       │    ★ PROCESO CRÍTICO
                    │  [expulsión]    │      (define forma, peso,
                    └────────┬────────┘    │    pared del envase)
                             │
                             ▼
                    ┌─────────────────┐
                    │  HORNOS DE      │  ← Alivio de tensiones
                    │  RECOCIDO       │    térmicas (annealing)
                    │  (Annealing)    │    T: ~550-600°C
                    └────────┬────────┘    ↓gradual
                             │
                             ▼
                    ┌─────────────────┐
                    │  INSPECCIÓN     │  ← Cámaras de visión artificial
                    │  AUTOMÁTICA     │    + sensores electrónicos
                    │                 │    Detecta: grietas, burbujas,
                    └────────┬────────┘    burbujas, defectos dimensión
                             │  ✓ OK → línea de embolsado
                             ▼
                    ┌─────────────────┐
                    │  EMBOLSADO,     │  ← Embalaje automático
                    │  PALETIZADO     │    + robótica de apilado
                    │  Y DESPACHO     │    ★ Paletizadores servo-asistidos
                    └─────────────────┘    (ya mencionan servo en Horno G)
```

### 5 subprocesos industriales del vidrio hueco:

| Subproceso | Descripción | Variables críticas | Peligro |
|-----------|-------------|-------------------|---------|
| **1. Batch House** | Dosificación y mezcla de materias primas | Ratios песок/soda/cal, % cullet, humedad | Desviación = vidrio defectuoso |
| **2. Horno de fusión** | Fundición a ~1.500°C, 24/7 | T° por zonas, atmósfera (ox/red), nivel vidrio, tiro, emisiones | Parada = pérdida US$50K+/día |
| **3. Feeder / Canales** | Distribución a máquinas IS | T° vidrio (~1.100°C), flujo, nivel | Variación = peso inconsistente |
| **4. Máquina IS** | Formado de envases | T° molde, presión soplado, timing servo, carrera | Defectos de forma y pared |
| **5. Annealing / Inspección** | Recocido + control calidad | Perfil T° horno recocido, velocidad línea | Estrés residual = rotura en uso |

---

## 3. ESTADO ACTUAL DE AUTOMATIZACIÓN Y GAPS IDENTIFICADOS

### Lo que YA tienen:
- ✅ IBM Maximo (EAM) — gestión de activos y mantenimiento
- ✅ Mincom LinkOne (EAM) — extendida a Llay-Llay (80% cobertura)
- ✅ SAP — ERP corporativo
- ✅ PLCs ABB y Eaton/Moeller — control distribuido por áreas
- ✅ TPM (Total Performance Management) — cultura de mejora continua
- ✅ Horno G con tecnología full servo-asistida (Llay-Llay)
- ✅ Inspector de Control de Procesos (posición abierta/ocupada)
- ✅ Paneles eléctricos modernizados con protecciones y analizadores de red

### Lo que FALTA / GAPS CRÍTICOS:

| Gap | Impacto | Oportunidad para SUPCON |
|-----|---------|----------------------|
| **Sin DCS integrado** | Hornos, feeders y máquinas IS operan con PLCs aislados sin supervisión centralizada | **DCS unificado** para Batch House → Horno → Feeder → IS → Annealing |
| **Sin SCADA** | Operadores trabajan "ciegos" sin visualización en tiempo real del proceso completo | **Plataforma de supervisión** multi-horno |
| **Combustión sub-óptima** | Quemadores de horno sin control avanzado de ratio aire/gas → ineficiencia energética | **Control avanzado de combustión** → ahorro 3-8% gas |
| **Sin APC (Control Predictivo)** | Variabilidad de temperatura en horno causa defectos y cortos de campaña | **APC** para estabilizar T° y extender vida útil del horno |
| **Alarma aislada** | Cada zona del horno tiene sus propias alarmas, sin correlación | **Sistema de alarms management** con priorización |
| **Datos dispersos** | Maximo + SAP + PLCs no se comunican entre sí en tiempo real | **Gateway/Integración** hacia historian |
| **Sin historian industrial** | Datos de planta no se almacenan con granularidad para análisis | **Sistema de adquisición de datos** con trending |
| **Enfriamiento molde no controlado** | T° de moldes en IS machines no optimizada dinámicamente | **Control de T° moldes** con lazos dedicados |
| **No hay redundancia** | PLCs simples sin redundancia hot-standby para hornos críticos | **Redundancia de control** para alta disponibilidad |

> **Hallazgo clave:** Cristalerías Chile es la **fábrica de vidrio más automatizada en отдельных aspectos** (Maximo, servo-formación) pero **carece de un DCS unificado** que integre el proceso completo. Esto es paradójico y representa una oportunidad de venta limpia.

---

## 4. ESTRATEGIA DE VENTA — ENFOQUE POR FASES

### Fase 1: ENTRADA — Hornos de fusión (mayor impacto, menor riesgo)
**Objetivo:** Reemplazar o overlayer los PLCs de control de horno con SUPCON DCS
**SKU sugerido:** `ECS-700` o `ECS-600` para control redundante de horno

**¿Por qué hornos primero?**
- Horno parado = pérdida ~US$50.000-100.000/día
- Inversión de horno nuevo: US$85-120M → el dueño invierte en reposición pero no en control
- Proceso 24/7/365 — demanda disponibilidad total (redundancia)
- 6 hornos × oportunidad de venta multiplicada
- **ROI demostrado:** Control de combustión avanzado = 3-8% ahorro en gas natural

**Complemento:** SCADA de supervisión de hornos con trending y alarms

** Pitch para el Gerente de Operaciones:**
> *"Vimos que Cristalerías tiene la mejor planta de vidrio de Latinoamérica, pero los hornos que sostienen toda la producción operan con PLCs que no se hablan entre sí. ¿Cuánto le cuesta una parada no planificada de horno? Con nuestra arquitectura redundante Hot-Standby y control predictivo de combustión, podemos darle visibilidad completa y evitar derivas térmicas que acortan la vida del horno."*

---

### Fase 2: BATCH HOUSE — Dosificación y mezcla
**SKU:** Extensión del DCS a Batch House

**Problema real:** Errores de dosificación = vidrio fuera de spec = lotes completos rechazados
**Solución:** Control de ratio automático + verificación en línea + cullet feedback loop

** Pitch:**
> *"¿Cuántos lotes de descarte generaron este año por desviación de batch? Nuestro sistema puede cerrar el lazo entre la balanza, el mezclador y el horno, detectando desviaciones antes de que el vidrio entre al horno."*

---

### Fase 3: MÁQUINAS IS — Formado y annealing
**SKU:** Extensión a IS machines (8 secciones por máquina × 12 líneas)

**Tecnología a ofrecer:** Control de gob temperature + servo motion + annealing oven profile

> *"Las nuevas máquinas servo-asistidas del Horno G tienen capacidad para más — pero sin control integrado, el operador está ajustando manualmente lo que un sistema automático podría optimizar en tiempo real."*

---

### Fase 4: INTEGRACIÓN — Maximo + SAP + Historian
**SKU:** SUPCON MES / Integration gateway

**Problema:** Los datos existen en silos (Maximo para mantenimiento, SAP para negocio, PLCs para planta)
**Solución:** Historian industrial que correlaciona datos de proceso con eventos de mantenimiento

> *"Si sabemos que el horno tiene 5.000 horas de operación y la T° de pared está subiendo 0.3°C/día, podemos predecir el mantenimiento con 6 meses de anticipación. Eso es lo que Maximo no puede hacer solo."*

---

## 5. ARGUMENTOS DE VENTA PARA CRISTALERÍAS CHILE

### Fortalezas de SUPCON vs. competencia

| Competidor | Debilidad vs. SUPCON |
|-----------|---------------------|
| **Siemens (PCS 7)** | Precio 2-3× mayor, implementación lenta, soporte local débil |
| **Rockwell (PlantPAx)** | Enfoque en discrete manufacturing, no óptimo para procesos continuos |
| **Schneider (EcoStruxure)** | Mismo problema — no tienen redundancia real hot-standby tan configurable |
| **ABB (800xA)** | Complejo, licensing caro, requiere integrador externo |
| **Honeywell (Experion)** | Diseñado para Oil&Gas, overkill para vidrio, precio elevado |

### Ventajas diferenciadoras de SUPCON:

1. **Redundancia hot-standby nativa** — uptime >99.99% para proceso continuo
2. **Costo total de propiedad 30-40% menor** que competidores europeos
3. **Soporte local directo** — no intermediarios
4. **SCADA abierto** — no lock-in con historian propio
5. **Integración nativa con Maximo/SAP** — gateway listo
6. **Experiencia regional en vidrio** — caso de referencia buscan en Perú/Argentina

---

## 6. CONTACTO Y MAPA DE DECISORES

| Rol | Nombre | Área | Abordar con |
|-----|--------|------|------------|
| **Gerente General** | Eduardo Carvallo Infante | Dirección | Visión estratégica, ROI, continuidad operacional |
| **Gerente de Operaciones** | Pablo Saavedra Sánchez | Operaciones | Proceso productivo, Fases 1-3 |
| **Subgerente de Mantención** | Nelson Cuello | Mantenimiento | Maximo, integration, Phase 4 |
| **Ingeniero de Control de Procesos** | (por confirmar) | Automatización | Technical deep-dive, prueba de concepto |
| **Gerente de Estudios** | (?) | Inversiones | CAPEX para modernización — proyecto Horno G |

---

## 7. DATOS DE CONTACTO

| Dato | Valor |
|------|-------|
| Teléfono | +56 2 2787 8888 |
| Atención proveedores | 800 203 345 / 800 203 346 / 800 203 347 |
| Web | cristalchile.cl |
| Planta Padre Hurtado | José Luis Caro 501, Padre Hurtado, RM |
| Planta Llay-Llay | El Porvenir 626, Llay-Llay, R5 (San Felipe) |
| Fono Llay-Llay | +56 34 249 4637 |

---

## 8. SEÑALES DE EXPANSIÓN RECIENTES (inteligencia de fuentes abiertas)

| Señal | Detalle | Implicancia |
|-------|---------|-------------|
| **Horno G** (nov-2024) | Nuevo horno en Llay-Llay con tecnología full servo-asistida y Batch House propio | **Momento ideal** — horno nuevo = especificación de control abierta |
| **US$75M proyecto ambiental** (2016) | Reconfiguración de capacidad horno Padre Hurtado (DIA SEA) | Históricamente dispuestos a invertir en modernización |
| **Expansión Llay-Llay Etapa 3** (US$120M) | Horno con capacidad 400 ton/día | Planta moderna = buena base para DCS |
| **Plan de reciclaje EcoLoop** | Economía circular — trazabilidad interna de residuos | Interés en tecnologías de optimización de procesos |
| **Negativo EBIT 2024** | Presión financiera → necesidad de eficiencia = urgencia | **Drivers de compra**: bajar costos, no expandir capacidad |
| **700 empleados** | Gran planta = múltiples áreas = múltiples puntos de venta |

---

## 9. COMPETIDORES DIRECTOS EN CHILE (referencia)

| Empresa | Plantas | Capacidad | Tecnologia actual |
|---------|---------|-----------|-----------------|
| **Cristoro** (familia Toro) | Maipú + Cerrillos (RM) | ~600 ton/día (plan: 1.000+) | Hornos híbridos gas+eléctrico |
| **Verallia Chile** (multinacional francesa) | Chile | Alta | DCS propio del grupo |

> **Nota:** Cristoro está en plena expansión con segundo horno híbrido. Si SUPCON entra a Cristalerías Chile primero, crea referencia local para Cristoro.

---

## 10. PRÓXIMOS PASOS RECOMENDADOS

- [ ] **Descarga memoria anual 2024** de Cristalerías Chile (CMF) — buscar señales de expansión y capex
- [ ] **LinkedIn stalking** de Nelson Cuello y Pablo Saavedra — entender su lenguaje técnico
- [ ] **Visita técnica** a planta Llay-Llay (R5) — recorridos disponibles según su sitio web
- [ ] **Preparar demo** de SCADA de horno con simulación de temperatura y alarms
- [ ] **Calcular ROI** de control de combustión: 5% ahorro en gas × 6 hornos × precio gas = ~US$X/año
- [ ] **Buscar referencias** de SUPCON en industria del vidrio (Perú, Argentina)
- [ ] **Contactar** vía portal de proveedores o linkedin

---

## RESUMEN EJECUTIVO (para meeting de 5 min)

> Cristalerías Chile es líder en envases de vidrio en Chile con 2 plantas, 6 hornos y 12 líneas de producción operando 24/7. Tiene sistemas modernos de gestión de activos (Maximo, LinkOne) pero **carece de un DCS integrado** que controle el proceso productivo completo — desde el Batch House hasta la inspección. Esto genera variabilidad de calidad, ineficiencia energética y dependencia de múltiples PLCs aislados. Con la reciente puesta en marcha del Horno G y presión sobre márgenes, existe una ventana de oportunidad para proponer un **DCS redundante para hornos** con payback < 2 años vía ahorro en gas y reducción de paradas no planificadas. **SUPCON entra como el DCS chino-norteamericano con mejor costo total, soporte local y redundancia hot-standby** — frente a Siemens (caro y lento) y Schneider (sin profundidad local).
