# DEMO CENTER SUPCON CHILE
## Kit de Demostración Completo con Equipos Reales
**Fecha:** 14-abr-2026 | **Elaborado por:** KAM Intelligence

---

## RESUMEN DEL KIT

| Categoría | Equipos | Valor estimado |
|-----------|---------|---------------|
| **Hardware DCS** | Controladores, I/O, Bases | US$15-20K |
| **Red Industrial** | Switches APL, Ethernet | US$5-8K |
| **Instrumentación** | Transmisores, válvulas, sensores | US$10-15K |
| **IT** | Servidores, Workstations, Monitores | US$8-12K |
| **Software** | supOS, PRIDE, Licencias | US$20-30K |
| **Protección** | Aisladores, sobretensión | US$2-3K |
| **Accesorios** | Gabinete, cables, conectividad | US$3-5K |
| **TOTAL KIT** | | **~US$65-95K** |

---

## ESTRUCTURA DEL DEMO

```
┌─────────────────────────────────────────────────────────────┐
│                    DEMO CENTER SUPCON                        │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │   SERVIDOR  │  │   HMI/SCADA │  │   LAPTOP    │       │
│  │  supOS + BD │  │  (PRIDE)    │  │  Presentación│       │
│  └──────┬──────┘  └──────┬──────┘  └─────────────┘       │
│         │                 │                                │
│         └────────┬────────┘                                │
│                  │                                         │
│         ┌────────▼────────┐                                │
│         │  SWITCH APL     │                                │
│         │  ETHERNET-APL   │                                │
│         └────────┬────────┘                                │
│                  │                                         │
│  ┌───────────────┼───────────────┐                        │
│  │               │               │                        │
│  ▼               ▼               ▼                        │
│ ┌──────┐    ┌────────┐    ┌──────────┐                   │
│ │CONTROL│    │CONTROL│    │ TUA      │                   │
│ │ FCU713│    │ FCU713│    │(Terminal)│                   │
│ └───┬───┘    └───┬───┘    └──────────┘                   │
│     │            │                                         │
│     ▼            ▼                                         │
│ ┌───────┐   ┌───────┐                                    │
│ │ RACK  │   │ RACK  │   ← Módulos I/O                   │
│ │ I/O   │   │ I/O   │     (AI, AO, DI, DO)              │
│ └───────┘   └───────┘                                    │
│     │            │                                         │
│     └────────────┼─────────────────────────────────┐      │
│                  │                                 │      │
│     ┌────────────┼────────────┐                    │      │
│     │            │            │                    │      │
│     ▼            ▼            ▼                    ▼      │
│ ┌────────┐  ┌────────┐  ┌────────┐    SENSORES  │      │
│ │PRESIÓN │  │NIVEL   │  │TEMP.   │    REALES    │      │
│ │  SKP   │  │RADAR   │  │ WZPKB  │    EN        │      │
│ └────────┘  └────────┘  └────────┘    CAMPO      │      │
│     │            │            │                    │      │
│     ▼            ▼            ▼                    ▼      │
│ ┌────────┐  ┌────────┐  ┌────────┐               │      │
│ │FLUJO- │  │VÁLVULA │  │VÁLVULA │   WIRELESS    │      │
│ │METRO  │  │LN8100  │  │SN5100  │   SENSOR      │      │
│ └────────┘  └────────┘  └────────┘   WS300        │      │
│                                                     │      │
│         SIMULACIÓN DE HORNO DE VIDRIO/CEMENTO        │      │
└─────────────────────────────────────────────────────┘
```

---

## DEMO 1: Horno de Vidrio (Simulación Completa)

### Escenario
Simular un horno de fusión de vidrio con 6 quemadores. El prospecto ve:
1. Temperatura del horno (real con sensor WZPKB)
2. Flujo de gas (real con medidor electromagnético SFE9001)
3. Presión (real con transmisor SKP)
4. Nivel de vidrio (simulado con radar SL901)

### Cómo funciona

```
FÍSICO (equipos reales):
─────────────────────────────────────────────────────────
 Sensor WZPKB (Temperatura) ──► AI711-H11 ──► Controlador FCU713
                                      │
 Sensor SKP (Presión)      ──► AI711-H11 ──┤
                                      │
 Medidor SFE9001 (Flujo)  ──► AI711-H11 ──┤
                                      │
 Sensor Radar SL901 (Nivel)──► AI711-H11 ──┘
                                              │
                                              ▼
                                       Controlador FCU713
                                              │
                                              ▼
 Válvula LN8100 (Gas) ◄── AO711-H11 ◄── Controlador
 Válvula SN5100 ◄───────── AO711-H11 ◄─┘

DIGITAL (supOS + PRIDE):
─────────────────────────────────────────────────────────
 Controlador FCU713 ──► Ethernet ──► Servidor supOS
                                         │
                                         ▼
                               Dashboard PRIDE en HMI
                               (Ve temperatura, presión,
                                flujo, nivel en tiempo real)
```

### Qué ve el prospecto

| Pantalla | Contenido |
|----------|-----------|
| **1. Vista General** | Horno con 6 zonas de temperatura, indicador de eficiencia |
| **2. Tendencias** | Gráficos de temperatura, flujo gas, presión últimas 24h |
| **3. Alarmas** | Cuándo la temperatura se desvía ±20°C |
| **4. Optimización** | Recomendaciones de APC (simuladas) |
| **5. Savings** | "Con APC, usted hubiera ahorrado US$8,500 esta semana" |

---

## DEMO 2: Control de Cemento (Variante)

### Escenario
Simular un horno rotatorio de cemento con:
- Temperatura de salida del horno
- Consumo de combustible
- Velocidad del horno
- Flujo de aire primario

### Equipos utilizados

| Equipo | Función | Medición |
|--------|---------|----------|
| WZPKB | Temperatura | 0-1400°C |
| SKP | Presión | 0-6,000 psi |
| SFE9001 | Flujo gas | 0-XXX m³/h |
| WS300 | Wireless (vibración) | Temperatura + vibración |

---

## MATERIAL DE LA DEMO

### 1. Computador de Presentación
- Laptop con video de intro (2 min)
- Presentación PowerPoint reducida (10 slides)
- Conexión a Teams para demo remota

### 2. Pantalla/TV (opcional)
- Si demo presencial: TV 55" para mostrar dashboard
- Si demo remota: compartir pantalla del HMI

### 3. Maletín de Campo (para visitas)
- WS300 (sensor wireless) — se lleva a planta
- X700 (calibrador) — para demostrar calibración
- Tablet con app de demo — para mostrar en terreno

---

## GUION DE LA DEMO (20 minutos)

### MINUTO 0-2: Introducción
```
"Hola [nombre], gracias por su tiempo.

Hoy vamos a hacer algo diferente. No voy a mostrarles 
pptos ni brochures. Voy a mostrarles SUPCON funcionando 
en tiempo real.

Tenemos aquí un kit de demostración con equipos reales: 
un controlador DCS, módulos de entrada/salida, 
instrumentación, y el software supOS que lo conecta todo.

Vamos a simular un horno de vidrio."
```

### MINUTO 2-5: El Problema
```
"Así opera un horno de vidrio sin control avanzado:

[Mostrar pantalla con valores 'ruidosos']

¿Ven cómo la temperatura oscila ±30°C? 
Eso le cuesta a una cementera US$50K por mes.

O peor — si la temperatura baja de 1.500°C, 
el vidrio se 'congela' en el horno y tienen 
que parar 3 días para limpiar. Eso son US$500K."
```

### MINUTO 5-10: La Solución SUPCON
```
"Ahora, veamos cómo SUPCON lo resuelve.

[Mostrar dashboard con los datos reales del kit]

Aquí tenemos los datos reales de nuestro kit de demo:
- Temperatura del sensor WZPKB (real, física)
- Presión del transmisor SKP (real)
- Flujo del medidor SFE9001 (real)

Todo conectado al controlador FCU713, que corre 
el algoritmo de control.

[Mostrar tendencias]

En 24 horas, el sistema ha ajustado el flujo 
de gas 847 veces para mantener la temperatura 
en ±5°C. Sin esto, hubiera oscilado ±30°C."
```

### MINUTO 10-15: El ROI
```
"Hagamos números:

Su planta consume [X] MMBTU de gas al mes.
A US$13/MMBTU, eso son US$[Y] al mes.

Con APC, capturamos 4-5% de ahorro:
US$[Z] al mes × 12 = US$[A] al año.

Inversión para 6 hornos: US$2.0M
Payback: 4.9 meses

¿CUANTO LE CUESTA NO TENER ESTO?"
```

### MINUTO 15-20: Call to Action
```
"¿Les interesa si hacemos una evaluación más detallada 
para [su empresa]?

Podemos:
1. Visitar su planta y hacer un diagnóstico gratuito
2. Presentar una propuesta formal en 2 semanas
3. Empezar con un piloto en 1 horno (US$290K) 
   que se paga solo en 4 meses.

¿Cuál prefieren?"
```

---

## CONFIGURACIÓN DEL KIT

### Red de equipos

```
                    INTERNET
                       │
                       ▼
              ┌────────────────┐
              │  ROUTER/WIFI   │
              └───────┬────────┘
                      │
          ┌───────────┼───────────┐
          │           │           │
          ▼           ▼           ▼
    ┌─────────┐ ┌─────────┐ ┌─────────┐
    │PRIDE    │ │ supOS   │ │ LAPTOP  │
    │HMI      │ │ SERVER  │ │ Ventas  │
    │(HMI)    │ │         │ │         │
    └────┬────┘ └────┬────┘ └─────────┘
         │           │
         │     ┌─────┴─────┐
         │     │           │
         ▼     ▼           ▼
    ┌────────────────────────┐
    │    SWITCH APL         │
    │    AEF6512-2T-S       │
    └────────────┬───────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
    ▼            ▼            ▼
┌────────┐   ┌────────┐   ┌────────┐
│FCU713  │   │FCU713  │   │ TUA    │
│Ctrl #1 │   │Ctrl #2 │   │(Terminal)│
└───┬────┘   └───┬────┘   └────────┘
    │           │
    ▼           ▼
┌────────┐   ┌────────┐
│RACK #1 │   │RACK #2 │
│I/O     │   │I/O     │
└───┬────┘   └───┬────┘
    │           │
    ▼           ▼
  SENSORES Y VÁLVULAS
```

### Conexiones físicas

| Desde | Hacia | Tipo cable |
|-------|-------|------------|
| Sensor Temp → | AI711-H11 | SPE-S/FTP |
| Sensor Presión → | AI711-H11 | SPE-S/FTP |
| Flujómetro → | AI711-H11 | SPE-S/FTP |
| Radar Nivel → | AI711-H11 | SPE-S/FTP |
| FCU713 → | Válvula LN8100 | AO711-H11 |
| FCU713 → | Válvula SN5100 | AO711-H11 |
| AI/AO → | Aisladores HD55xx | DB37 |

---

## ESCENARIOS PARA LA DEMO

### Escenario A: "Alarma de temperatura"
```
Objetivo: Mostrar cómo SUPCON detecta y reacciona a anomalías.

Setup:
1. Temperatura baseline: 1.520°C
2. Simular aumento de 50°C (soltar aire caliente)
3. Mostrar alarma en dashboard
4. Mostrar respuesta del sistema

Resultado esperado:
"Sin SUPCON: operador tarda 10 min en reaccionar
Con SUPCON: sistema ajusta en 30 segundos"
```

### Escenario B: "Optimización de gas"
```
Objetivo: Mostrar savings en tiempo real.

Setup:
1. Dejar horno operar 1 hora (registrar consumo)
2. Comparar con "benchmark" de industria
3. Mostrar cuánto se hubiera ahorrado

Resultado esperado:
"Esta hora: 12.3 MMBTU consumidos
Benchmark industria: 11.8 MMBTU
Con APC hubiera sido: 11.4 MMBTU
AHORRO: 0.9 MMBTU = US$11.70"
```

### Escenario C: "Comparativa old vs new"
```
Objetivo: Mostrar diferencia entre PLC y DCS.

Setup:
1. Mostrar sistema actual (foto de PLC Siemens/Allen-Bradley)
2. Mostrar SUPCON DCS (dashboard)
3. Comparar features

Resultado esperado:
"Con PLC: 12 sistemas separados, sin visibilidad
Con SUPCON: 1 dashboard unificado"
```

---

## Checklist de Demo

### Antes de la demo
- [ ] Verificar que todos los equipos estén encendidos
- [ ] Confirmar conexión a internet/WiFi
- [ ] Probar conexión Teams/Zoom
- [ ] Cargar presentación en laptop
- [ ] Verificar que supOS esté corriendo
- [ ] Confirmar que datos fluyan a dashboard
- [ ] Preparar maletín de campo (WS300, X700)

### Durante la demo
- [ ] Laptop con video intro listo
- [ ] Dashboard abierto y funcionando
- [ ] Script de demo impreso (por si acaso)
- [ ] Calculadora de ROI lista
- [ ] Propuesta de piloto impresa

### Después de la demo
- [ ] Enviar email de seguimiento (mismo día)
- [ ] Enviar 1-pager de empresa
- [ ] Agendar visita a planta (si aplica)
- [ ] Actualizar CRM

---

## VARIANTES DE DEMO

### Demo 1: Presencial (en oficina Conecta)
- Duración: 30-45 min
- Incluye: Kit físico funcionando
- Mejor para: Decisores técnicos

### Demo 2: Remota por Teams
- Duración: 20-30 min
- Incluye: Conexión a kit por remote desktop
- Mejor para: Gerentes ocupados

### Demo 3: En planta del cliente
- Duración: 1-2 horas
- Incluye: Tablet + WS300 + diagnóstico
- Mejor para: Técnicos + Gerentes de planta

### Demo 4: Grabada (video)
- Duración: 5-10 min
- Incluye: Video de demo + voiceover
- Mejor para: Enviar por email antes de reunion

---

## PRÓXIMOS PASOS

### Esta semana
- [ ] Configurar kit de demo en oficina
- [ ] Instalar supOS + PRIDE
- [ ] Conectar sensores al rack I/O
- [ ] Configurar dashboard en PRIDE

### Próxima semana
- [ ] Probar demo completa (20 min)
- [ ] Grabar video de demo
- [ ] Preparar script de presentación

### Mayo
- [ ] Usar demo en primera reunión (Cristalerías?)
- [ ] Iterar basado en feedback

---

## PRESUPUESTO ESTIMADO

| Ítem | Costo | Notas |
|------|-------|-------|
| Tiempo de setup | 40 horas | KAM + ingeniería |
| Viajes a planta (demo) | US$500 | 3-5 visitas |
| Material impreso | US$200 | 1-pagers, brochures |
| Video demo | US$500 | Producción profesional |
| **Total adicional** | **~US$1,200** | |

---

**Última actualización:** 14-abr-2026  
**Elaborado por:** KAM Intelligence
