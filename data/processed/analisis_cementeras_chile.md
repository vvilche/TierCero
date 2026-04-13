# ANÁLISIS COMERCIAL: CEMENTERAS CHILENAS
## Procesos industriales y oportunidades para SUPCON
**Fecha:** 13-abr-2026 | **Targets:** Polpaico, Cementos Bío Bío, Melón | **Sector:** Cemento

---

## 1. MAPA DE ACTORES — CEMENTERAS CHILENAS

| Empresa | Grupo | Capacidad | Plantas Chile | PLC/DCS Actual |
|---------|-------|-----------|--------------|----------------|
| **Polpaico** (ex-Holcim Chile) | Grupo Hurtado Vicuña | 2.7M ton/año | Cerro Blanco (RM), Coronel (Biobío), Mejillones (Antofagasta) | **ABB DCS** (estandarizado 2006-2011 por Holcim) |
| **Grupo CBB** (Cementos Bío Bío) | Nacional | 1.2M+ ton/año | Talcahuano, Concón, Teno, Arica, Talca | SAP, SCADA mentioned, automatización parcial |
| **Melón** | Grupo Brescia (Perú) | ~1.5M ton/año | La Calera (integrada), Puerto Montt (molienda), Ventanas (molienda) | Sin info pública clara |

### Cuota de mercado estimada
- **Polpaico:** ~35-40% (líder)
- **Grupo CBB:** ~30-35%
- **Melón:** ~20-25%
- Otros: ~5% (importaciones)

---

## 2. PROCESO PRODUCTIVO DEL CEMENTO — MAPA COMPLETO

### 2A. Visión general de la cadena

```
  EXTRACCIÓN        TRITURACIÓN        PREHOMOGENIZACIÓN
  DE MATERIAS       Y MOLIENDA          DE MATERIAS
  PRIMAS            CRUDA               PRIMAS
  ──────────       ──────────         ──────────────
  Caliza            Trituradora         Pile / Domo
  (cantera)         primaria            de premezcla
  Arcilla            ↓                  ↑
  Yeso               Molino              Mezcla
  Mineral de         de crudo           homogenizada
  hierro             (barras/bolas)      ↓
  Arena              ↓                  MOLIENDA
  ↑                  PRECALENTADOR       DE CLÍNKER
  sílice             (5-6 ciclones)     ───────────
                      ↓                  Molino
  Clínker            HORNO               de cemento
  (importado         ROTATORIO           (bolas)
  para Melón         ~1.450°C            ↓
  molienda)          ↓                  ENSACADO /
                      ENFRIADOR          DESPACHO
                      (clinker           ───────────
                       ~100°C)            Embolsado /
                                         Granelero /
                                         Camión
```

### 2B. Procesos críticos detallados

#### PROCESO 1: Extracción y trituración de materias primas
```
Cantera → Voladura → Carguío → Camiones → Trituradora primaria
                                         ↓
                              Trituradora secundaria (conos)
                                         ↓
                              Clasificación por tamaño
                                         ↓
                              Acopio en cantera o envío directo
```
**Variables críticas:** Fragmentación, humedad, contenido de sílice, ratio CaO/SiO₂
**Equipamiento:** Excavadoras, camiones CAT, trituradoras de mandíbula/cono, bandas transportadoras
**Automatización típica:** PLC para arranque/paro de trituradoras, monitoring de consumo eléctrico

#### PROCESO 2: Molienda de crudo (raw mill)
```
Materias primas → Balanza dosificadora → Molino de crudo (bolas/barras)
                                            ↓
                                  Clasificador dinámico (separador)
                                            ↓
                          Polvo crudo → Precalentador del horno
```
**Variables críticas:** Finura del polvo ( Blaine ), composición química (módulo de silicato, aluminato), humedad
**Equipamiento:** Molino de crudo, separador dinámico, alimentador de balanza
**⚠️ Oportunidad SUPCON:** Control de dosificación automática + control de finura + APC
**Automatización actual en Chile:** ABB DCS en Polpaico, SCADA parcial en CBB

#### PROCESO 3: Precalentador + Horno rotatorio (KILN) ← **PROCESO MÁS CRÍTICO**
```
Polvo crudo → Precalentador (5-6 ciclones en serie)
                    ↓ (~900°C)
              Entrada al horno rotatorio
                    ↓
  HORNO ROTATORIO (~60-90m largo, ~4.5m diámetro)
  Temperatura llama: ~2.000°C
  Temperatura material: ~1.450°C
  Velocidad rotación: ~3-4 rpm
  Inclinación: ~3-4%
  Duration: ~30-40 min tránsito
                    ↓
              ENFRIADOR DE CLÍNKER
              (barras, planetary, Satun)
                    ↓ (~100°C)
              Clinker → Almacenamiento / Molienda cemento
```
**Variables críticas:**
| Variable | Rango típico | Impacto |
|----------|-------------|---------|
| Temperatura zona de quemado | 1.800-2.000°C | Calidad clinker, consumo combustible |
| Temperatura salida gases | 900-1.100°C | Eficiencia térmica |
| Velocidad del horno | 3.5-4.5 rpm | Tiempo de residencia |
| Exceso de aire (O₂) | 2-4% | Combustión completa |
| Alimentación de clínker | 3.000-10.000 tpd | Throughput |
| Temperatura clinker salida enfriador | 100-300°C | Energía recuperada |
| NOₓ / CO emissions | Regulados | Cumplimiento ambiental |

**⚠️⚠️ MAYOR OPORTUNIDAD SUPCON ⚠️⚠️**
- Control multivariable del horno rotatorio
- APC (Control Predictivo Avanzado) para optimización de combustión
- Sistema experto para estabilidad de operación
- Monitoreo de anillo de clínker / formación de anillos
- Control de combustibles alternativos (CDF, neumáticos, biomassa)

#### PROCESO 4: Molienda de cemento (cement mill)
```
Clínker + Yeso + Puzolana (opcional) → Molino de cemento (bolas)
                                              ↓
                                    Clasificador (separador)
                                              ↓
                          Cemento terminado → Silo de almacenamiento
```
**Variables críticas:** Finura (Blaine 3.000-4.500 cm²/g), carga de bolas, temperatura cemento
**⚠️ Oportunidad SUPCON:** Control de carga de molino + optimización de energía

#### PROCESO 5: Ensacado y despacho
```
Silo → Ensacadora automática (sacos 25/50kg)
     → Granelero (siloscamión)
     → Big bag (1.5 ton)
```
**Variables críticas:** Peso saco, velocidad ensacado, dosificación aditivos
**Automatización:** PLC para ensacadoras, SCADA para despacho

---

## 3. ANÁLISIS DE CADA CEMENTERA CHILENA

### 3.1 POLPAICO (Cemento Polpaico S.A.)

| Dato | Detalle |
|------|---------|
| RUT | 91.337.000-7 (ya en Top50) |
| Grupo | Grupo Hurtado Vicuña (compró a Holcim en 2017) |
| Capacidad | 2.7M ton cemento/año |
| Plantas | Cerro Blanco (RM), Coronel (VIII), Mejillones (II) |
| Proceso | Cerro Blanco: integrada (horno clinker); Coronel y Mejillones: molienda |
| Empleados | ~1.500+ |
| Tecnologia actual | **ABB DCS** (estandarizado por Holcim 2006-2011) |
| Sistemas | SAP ERP, Expert Optimizer (ABB), Asset Management |

#### Contexto tecnológico Polpaico:
En 2006-2011, Holcim estandarizó sus plantas de Chile con **ABB Ability 800xA** como DCS principal, incluyendo:
- Sistema Experto **ABB Expert Optimizer** (control multivariable para horno y molinos)
- Sistema de manejo de activos (Asset Management)
- Control de combustibles alternativos

**Pregunta clave:** Tras la venta a Hurtado Vicuña en 2017, ¿se mantienen los contratos ABB? ¿Hay necesidad de migrar o complementar?

#### Señales de inversión:
- Inauguración tercer silo Planta Molienda Coronel
- Proyecto "HormiPURIFICA" (hormigón purificador de aire) — innovación en productos
- Inversión sostenida en coprocesamiento de residuos (Coactiva) en hornos de Cerro Blanco
- Programa Race To Zero (descarbonización)

#### Oportunidades específicas para SUPCON en Polpaico:

| Área | Oportunidad | Tipo |
|------|------------|------|
| **Horno Cerro Blanco** | Actualización de DCS o overlayer ABB existente | DCS / SCADA |
| **Molinos de cemento** | Control de carga y energía | APC / Optimization |
| **Coprocesamiento** | Control de combustión con combustibles alternativos (RDF, residuos) | Control multivariable |
| **Descarbonización** | Monitoreo de emisiones en línea, control de CO₂ | Instrumentation + SCADA |
| **Silos y dosificación** | Control de recipes y cambio de producto | PLC + SCADA |

---

### 3.2 GRUPO CBB (Cementos Bío Bío)

| Dato | Detalle |
|------|---------|
| RUT | 91.755.000-K |
| Grupo | Nacional — acciones en Bolsa (bajo lupa CMF) |
| Capacidad | 1.2M+ ton/año |
| Plantas Chile | Talcahuano (integrada), Concón (integrada), Teno (integrada), Arica (molienda), Talca (molienda) |
| Presencia regional | También Argentina y Perú |
| Tecnología actual | **SAP** (ERP), **SCADA** (mencionado en tech stack), **Power BI**, **RPA**, GPS tracking |
| Tech stack公开 | PLCs distribuidos, monitoreo de flotas, automatización parcial |
| Gerente General | Jorge Matus |
| Contacto comercial | Claudio Hurtado (Gerente Comercial Cementos), Emilio Cisternas (ventas) |

#### Contexto tecnológico CBB:
- Mencionan SCADA en su stack tecnológico (LinkedIn datos)
- Inversión en digitization con SAP CRM y Power BI
- Sistema de tracking GPS para camiones (logística)
- Menor automatización aparente que Polpaico (no DCS centralizado visible)

#### Plan de inversión CBB:
- US$150M para 2017-2021 (referencia 2019)
- Nueva planta en Arica (150.000 ton/año, inaugurada ~2021)
- Expansión en Perú (Arequipa) y Argentina

#### Oportunidades específicas para SUPCON en CBB:

| Área | Oportunidad | Tipo |
|------|------------|------|
| **Hornos Talcahuano / Concón / Teno** | DCS para reemplazo o extensión de PLCs existentes | **DCS prioridad alta** |
| **Molinos de cemento** | Control de molienda y energía | APC |
| **Integración SAP-DCS** | Gateway entre SAP y piso de planta | MES / Integration |
| **Logística de despacho** | Sistema de despacho integrado con planta | SCADA + ERP |
| **Planta nueva Arica** | DCS para nueva planta o extensión | Greenfield DCS |

---

### 3.3 MELÓN (Cementos Melón S.A.)

| Dato | Detalle |
|------|---------|
| Grupo | **Grupo Brescia (Perú)** — mismo grupo que Brescia Cementos, Cemento Yura |
| Capacidad | ~1.5M ton/año |
| Plantas Chile | La Calera (integrada, desde 1908), Puerto Montt (molienda desde 2008), Ventanas (molienda desde 2011) |
| Tecnología actual | Sin info pública clara — menor digitalización que competidores |
| Estado financiero | Histórico de pérdidas (2.110M CLP pérdida Q1 2013) — información vieja |

#### Highlights:
- Planta Puerto Montt: molino **Cemengal Plug&Grind Xtreme** (horizontal, alta eficiencia)
- Ventanas: planta de molienda
- Estrategia: logística optimizada para competir con plantas distantes (Polpaico/CBB a 500km)
- Uso de clinker importado de Corea del Sur y China

#### Oportunidades específicas para SUPCON en Melón:

| Área | Oportunidad | Tipo |
|------|------------|------|
| **Horno La Calera** | DCS si está antiguo (desde 1908) | DCS / Modernización |
| **Molinos Puerto Montt / Ventanas** | Control avanzado de Cemengal | APC |
| **Integración con matriz Brescia** | Estándar de control del grupo | DCS unificado |
| **Planta nueva o reemplazo** | Si expansionan en Chile | Greenfield |

---

## 4. GAPS COMUNES DE AUTOMATIZACIÓN EN CEMENTERAS CHILENAS

| Gap | Impacto | Oportunidad SUPCON |
|-----|---------|-------------------|
| **Sin APC (Control Predictivo)** | Hornos operando con setpoints manuales → +10-15% consumo de combustible | **ECS-700 + APC** para optimización de horno |
| **SCADA fragmentado** | Datos de planta dispersos en múltiples PLCs sin integración | **SCADA unificado** + historian |
| **Sin historian industrial** | 2.3M+ datapoints/día perdidos — imposible análisis de tendencias | **Sistema de adquisición de datos** |
| **Control de molienda subóptimo** | Molinos operando con carga manual → +5-10% consumo eléctrico | **Control de carga molino** |
| **Combustibles alternativos** | Polpaico usa RDF y residuos en horno — control complejo de mezcla | **Control multivariable** de combustibles |
| **Sin integración ERP** | SAP no conectado a planta en tiempo real | **Gateway MES** |
| **Monitoreo de emisiones** | Cumplimiento ambiental con equipos manuales | **Sistema de monitoreo ambiental** (SCADA + instrumentación) |
| **ABB DCS Polpaico** | Sistema antiguo 2006 → fin de vida útil o migración pendiente | **Migración o coexistencia** con DCS nuevo |

---

## 5. PROCESO DEL HORNO ROTATORIO — DETALLE TÉCNICO

El **horno rotatorio** es el corazón de cualquier cementera. Es donde se concentra el mayor consumo energético y el mayor riesgo de paradas costosas.

### 5.1 Zonas del horno

```
  ALIMENTACIÓN              ZONA DE           ZONA DE          ZONA DE         SALIDA
  (polvo crudo)            CALCINACIÓN       TRANSICIÓN       QUEMADO         (clinker)
      ↓                        ↓                ↓               ↓               ↓
  ~~~~~~~~~~~~~~~~~~~~|==================|================|===============|~~~~~~~~~~~~~~~~
  ~900°C                 900-1.100°C       1.100-1.300°C   1.400-1.500°C    1.300°C
                        (calcinación)      (reacción        (formación        ↓
                       CO₂ liberado        sólida)          clínker)          ENFRIADOR
                       de caliza                                                  ↓
                                                                    ~~clinker~~  ~100°C
```

### 5.2 Variables de control del horno

| Variable | Sensor típico | Setpoint | Acción de control |
|----------|-------------|----------|-----------------|
| Temperatura zona de quemado | Pirómetro óptico | 1.800°C | Ajuste de combustible |
| Temperatura salida gases | Termopar | 1.000-1.100°C | Ajuste velocidad horno |
| O₂ en gases | Analizador de O₂ | 2-4% | Ajuste aire secundario |
| Velocidad horno | Encoder + variador | 3.5-4.5 rpm | Torque del drive |
| Alimentación de crudo | Balanza + variador | Setpoint t/h | Alimentador |
| Emisiones NOₓ | Analizador continuo | Regulado | Control de temperatura llama |
| Formaciones de anillo | Pirómetro shell + operador | Alerta | Cambio de operación |

### 5.3 Oportunidad de APC para horno de cemento

```
  AHORA (manual):                        CON SUPCON APC:
  ─────────────                          ─────────────
  Operador ajusta setpoints              AI/APC ajusta cada 30-60 seg
  cada 1-2 horas                        automáticamente
  Error humano constante                 Variabilidad reducida 40-60%
  Combustible ineficiente                Ahorro combustible 4-9%
  Calidad variable                      Clinker consistente
  NOₓ sin control activo               NOₓ reducido 2-5%
```

---

## 6. ESTRATEGIA DE VENTA PARA CEMENTERAS CHILENAS

### Enfoque por empresa:

#### POLPAICO — Enfoque: complementación ABB
**Pitch:** *"Holcim les dejó un DCS ABB de 2006. SUPCON puede overlayer ese sistema con un SCADA moderno, APC para el horno y historian — sin reemplazar el ABB, integrando lo existente. Así capturan el valor del APC sin el riesgo de una migración completa."*

**SKU:** ECS-700 redundant + APC + SCADA + Integration gateway
**Áreas:** Horno Cerro Blanco, molinos Coronel, combustibles alternativos

#### GRUPO CBB — Enfoque: DCS unificado
**Pitch:** *"Tienen SCADA parcial y SAP. SUPCON les entrega un DCS completo que integre el horno, molinos y despacho — conectando todos los PLCs existentes en una sola plataforma con historian. Además, conectamos los datos de planta al SAP que ya tienen."*

**SKU:** ECS-700 (2-3 redundantes para 3 plantas) + SCADA + MES gateway
**Áreas:** Hornos Talcahuano/Concón/Teno, integración SAP

#### MELÓN — Enfoque: marrón + greenfield
**Pitch:** *"SUPCON puede ser el estándar que el Grupo Brescia usa en todas sus cementeras de Sudamérica. Les entregamos un DCS moderno para La Calera y los molinos de Puerto Montt y Ventanas, conectados al mismo sistema que usan en Perú."*

**SKU:** ECS-700 (escala pequeña) + APC para molinos
**Áreas:** Molienda Cemengal, posible horno nuevo

---

## 7. COMPETIDORES Y QUÉ HAY QUE RESPONDER

| Competidor | Qué tienen | Cómo atacar |
|-----------|-----------|-------------|
| **ABB** | 800xA + Expert Optimizer en Polpaico (legacy) | Overlayer, no reemplazar. Mejor precio, soporte local |
| **Siemens** | PCS 7 / PCS Neo | Mejor costo TCO, redundancia comparable |
| **Schneider** | EcoStruxure for Mining | Menor presencia en cemento Chile |
| **FLSmidth** | ECS/ProcessExpert (APC puro, no DCS) | Partner o complemento — SUPCON como DCS |
| **Honeywell** | Experion para cemento | Menor foco en Chile |

---

## 8. DATOS DE CONTACTO

### Polpaico
| Dato | Valor |
|------|-------|
| RUT | 91.337.000-7 |
| Teléfono | 600 620 6200 |
| Casa matriz | Av. El Bosque Norte 0177, Piso 5, Las Condes, Santiago |
| Planta Cerro Blanco | Til Til, RM |
| Planta Coronel | Coronel, VIII Región |
| Planta Mejillones | Mejillones, II Región |

### Grupo CBB (Cementos Bío Bío)
| Dato | Valor |
|------|-------|
| RUT | 91.755.000-K |
| Casa matriz | Av. Andrés Bello 2457, Piso 18, Costanera Center, Providencia, Santiago |
| Teléfono | (56-2) 2560 7000 |
| Call center | 800 720 720 |
| Planta Talcahuano | Av. Gran Bretaña 1725, Talcahuano |
| Planta Concón | Parque Industrial Concón S/N, Concón, V Región |
| Planta Teno | Panamericana Sur KM 173.6, Teno, VII Región |
| Planta Arica | Arica, XV Región |
| Gerente General | Jorge Matus |
| Gerente Comercial Cementos | Claudio Hurtado |
| Ventas Cementos | Emilio Cisternas (Los Andes, V Región) |

### Melón
| Dato | Valor |
|------|-------|
| Casa matriz | Av. Estadio 1935, La Serena |
| Teléfono | (56-51) 220 7000 |
| Planta La Calera | La Calera, V Región (integrada desde 1908) |
| Planta Puerto Montt | Puerto Montt (molienda desde 2008) |
| Planta Ventanas | Ventanas, V Región (molienda desde 2011) |
| Grupo | Grupo Brescia (Perú) |

---

## 9. PRÓXIMOS PASOS

- [ ] **LinkedIn stalking** de Claudio Hurtado (CBB), Nelson Cuello (ex-polpaico), ingeniero de automatización CBB
- [ ] **Investigación Polpaico post-Hurtado:** ¿siguieron con ABB? ¿contratos vigentes?
- [ ] **Búsqueda de memorias** de Cementos Bío Bío en CMF para señales de inversión en automatización
- [ ] **Calcular ROI de APC** para horno de cemento: 5% ahorro gas × consumo típico → ~US$X/año por horno
- [ ] **Contactar** vía portal de proveedores de CBB o vía LinkedIn
- [ ] **Búsqueda de referencias** SUPCON en cemento (Latinoamérica o global)

---

## RESUMEN EJECUTIVO

> El mercado chileno del cemento está dominado por 3 jugadores: **Polpaico** (líder, ~40%, ex-Holcim con ABB DCS heredado), **Grupo CBB** (nacional, ~35%, SAP+SCADA parcial, plan de inversión US$150M) y **Melón** (peruano, ~25%, planta histórica desde 1908 + molinos modernos). Los tres tienen en común la necesidad de **optimizar el consumo energético del horno rotatorio** (proceso que consume ~70% de la energía total de la planta), reducir variabilidad de calidad del clínker y cumplir con normativas ambientales cada vez más estrictas. **SUPCON entra como el DCS + APC que puede overlayer ABB en Polpaico, reemplazar PLCs dispersos en CBB, o establecer estándar para Melón y su grupo peruano** — con un propuesta de valor centrada en: ahorro de combustible (4-9%), reducción de variabilidad de calidad, y costo total 30-40% menor que Siemens/ABB. La oportunidad más inmediata es **Grupo CBB** (sin DCS central, plan de inversión activo) seguido de **Polpaico Cerro Blanco** (horno con ABB heredado listo para overlayer).
