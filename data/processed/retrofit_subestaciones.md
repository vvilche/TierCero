# RETROFIT DE SUBESTACIONES Y RTUs
## Checklist de Documentación y Material para Estimación
**Fecha:** 14-abr-2026 | **Especialidad:** SUPCON Industrial

---

## RESUMEN EJECUTIVO

El retrofit de subestaciones eléctricas y sistemas RTU (Remote Terminal Units) es un proceso crítico que requiere documentación precisa para garantizar una transición sin interrupciones. 

### Desafío típico
> *"Tenemos RTUs de los años 90 que ya no tienen soporte, pero no podemos parar la subestación para cambiarlos."*

### Solución SUPCON
> **Brownfield Integration** — Modernización por etapas, sin detener la operación.

---

## 1. DOCUMENTACIÓN DE INGENIERÍA REQUERIDA

### 1.1 Documentación de la Subestación

| Documento | Descripción | Prioridad |
|-----------|-------------|-----------|
| **Diagrama Unifilar** | Configuración eléctrica de la subestación | 🔴 CRÍTICA |
| **Diagrama de Arranque** | Lógica de operación de equipos | 🔴 CRÍTICA |
| **Planos de Cableado** | Conexiones físicas de RTU a equipos de campo | 🔴 CRÍTICA |
| **Planos de Ubicación** | Layout físico de equipos en sala de control | 🟡 IMPORTANTE |
| **Diagrama de Comunicación** | Arquitectura de red, protocolos, interfaces | 🔴 CRÍTICA |

### 1.2 Documentación de RTU Existente

| Documento | Descripción | Prioridad |
|-----------|-------------|-----------|
| **Modelo y Fabricante** | ABB, Siemens, Schneider, SEL, etc. | 🔴 CRÍTICA |
| **Año de Instalación** | Para evaluar obsolescencia | 🔴 CRÍTICA |
| **Puntos de I/O** | Lista completa de entradas/salidas | 🔴 CRÍTICA |
| **Protocolos de Comunicación** | DNP3, IEC 61850, Modbus, etc. | 🔴 CRÍTICA |
| **Manuales Técnicos** | Documentación del fabricante | 🟡 IMPORTANTE |
| **Lógica de Control** | Programación existente, ladder, etc. | 🔴 CRÍTICA |

### 1.3 Documentación de Protocolos

| Protocolo | Versión | Notas |
|-----------|---------|-------|
| IEC 61850 | ☐ Sí / ☐ No | ¿MMS, GOOSE, Sampled Values? |
| DNP3 | ☐ Serial / ☐ TCP | ¿Secure Authentication? |
| IEC 60870-5-104 | ☐ Sí / ☐ No | Usado en Chile |
| Modbus TCP | ☐ Sí / ☐ No | Legacy |
| OPC UA | ☐ Sí / ☐ No | Para integración IT |

---

## 2. LEVANTAMIENTO DE PUNTOS DE I/O

### 2.1 Entradas Digitales (DI)

| # | Descripción | Equipo de Campo | Estado | Tipo Contacto |
|---|-------------|----------------|--------|---------------|
| 1 | Posición interruptor 52-1 | SF6 Breaker | ☐ NC / ☐ NA | |
| 2 | Posición interruptor 52-2 | SF6 Breaker | ☐ NC / ☐ NA | |
| 3 | Falla SF6 - bahía 1 | Detector presión | ☐ NC / ☐ NA | |
| 4 | Falla SF6 - bahía 2 | Detector presión | ☐ NC / ☐ NA | |
| 5 | Falla relé 67-1 | Protección sobrecorriente | ☐ NC / ☐ NA | |
| 6 | Falla relé 67-2 | Protección sobrecorriente | ☐ NC / ☐ NA | |
| 7 | Alarma relé 50/51 | Protección distancia | ☐ NC / ☐ NA | |
| 8 | Syncrocheck | Sincronización | ☐ NC / ☐ NA | |
| 9 | Posición seccionador 89-1 | Seccionador | ☐ NC / ☐ NA | |
| 10 | Posición seccionador 89-2 | Seccionador | ☐ NC / ☐ NA | |
| | | | | |
| | | | | |
| | | | | |

**Total DIs estimados:** _______

### 2.2 Salidas Digitales (DO)

| # | Descripción | Equipo de Campo | Tipo Salida | Estado |
|---|-------------|----------------|-------------|--------|
| 1 | Comando apertura 52-1 | SF6 Breaker | ☐ Pulse / ☐ Mantiene | |
| 2 | Comando cierre 52-1 | SF6 Breaker | ☐ Pulse / ☐ Mantiene | |
| 3 | Comando apertura 52-2 | SF6 Breaker | ☐ Pulse / ☐ Mantiene | |
| 4 | Comando cierre 52-2 | SF6 Breaker | ☐ Pulse / ☐ Mantiene | |
| 5 | Comando seccionador 89-1 | Seccionador motorizado | ☐ Pulse / ☐ Mantiene | |
| 6 | Comando seccionador 89-2 | Seccionador motorizado | ☐ Pulse / ☐ Mantiene | |
| | | | | |
| | | | | |

**Total DOs estimados:** _______

### 2.3 Entradas Analógicas (AI)

| # | Descripción | Transductor | Rango | Notas |
|---|-------------|-------------|-------|-------|
| 1 | Tensión barra 13.8 kV | PT 600:5 | 0-150V sec | |
| 2 | Corriente línea 1 | CT 600:5 | 0-5A sec | |
| 3 | Corriente línea 2 | CT 600:5 | 0-5A sec | |
| 4 | Potencia activa MW | Transductor P | 4-20mA | |
| 5 | Potencia reactiva Mvar | Transductor Q | 4-20mA | |
| 6 | Frecuencia | Transductor F | 4-20mA | |
| 7 | Temperatura aceite TF1 | Termostato | 4-20mA | |
| 8 | Temperatura aceite TF2 | Termostato | 4-20mA | |
| 9 | Nivel aceite TF1 | Sensor nivel | 4-20mA | |
| 10 | Presión SF6 | Transductor | 4-20mA | |
| | | | | |
| | | | | |

**Total AIs estimados:** _______

### 2.4 Salidas Analógicas (AO)

| # | Descripción | Equipo | Rango | Notas |
|---|-------------|--------|-------|-------|
| 1 | Setpoint AVR | Regulador tensión | 4-20mA | |
| 2 | Setpoint Governor | Controlador velocidad | 4-20mA | |
| | | | | |

**Total AOs estimados:** _______

---

## 3. EQUIPOS DE CAMPO

### 3.1 Interruptores (Breakers)

| # | ID | Tipo | Fabricante | Modelo | Año | Estado |
|---|-----|------|-----------|--------|-----|--------|
| 1 | 52-1 | SF6 | ABB | LTB 245 | 1998 | ☐ OK / ☐ Reemplazar |
| 2 | 52-2 | SF6 | ABB | LTB 245 | 1998 | ☐ OK / ☐ Reemplazar |
| | | | | | | |

### 3.2 Seccionadores

| # | ID | Tipo | Fabricante | Modelo | Año | Motor |
|---|-----|------|-----------|--------|-----|-------|
| 1 | 89-1 | Bajo carga | Siemens | 3DQ1 | 2000 | ☐ OK / ☐ Reemplazar |
| 2 | 89-2 | Bajo carga | Siemens | 3DQ1 | 2000 | ☐ OK / ☐ Reemplazar |
| | | | | | | |

### 3.3 Transformadores de Medida

| # | ID | Tipo | Fabricante | Ratio | Año | Precisión |
|---|-----|------|-----------|-------|-----|-----------|
| 1 | PT-1 | Tensión | ABB | 13.8kV/110V | 1995 | Clase 0.5 |
| 2 | CT-1 | Corriente | ABB | 600:5 | 1995 | Clase 0.2 |
| 3 | CT-2 | Corriente | ABB | 600:5 | 1995 | Clase 0.2 |
| | | | | | | |

### 3.4 Relés de Protección

| # | ID | Fabricante | Modelo | Año | Protocolo | Estado |
|---|-----|-----------|--------|-----|------------|--------|
| 1 | 67-1 | SEL | SEL-751 | 2010 | DNP3 | ☐ OK |
| 2 | 67-2 | SEL | SEL-751 | 2010 | DNP3 | ☐ OK |
| 3 | 50/51 | ABB | REF 615 | 2012 | IEC 61850 | ☐ OK |
| | | | | | | |

---

## 4. ARQUITECTURA DE COMUNICACIÓN

### 4.1 Topología Actual

```
                    ┌─────────────┐
                    │   SCADA     │
                    │   MASTER    │
                    │  (IEC 104) │
                    └──────┬──────┘
                           │
                    ┌──────┴──────┐
                    │   RTU #1    │
                    │  (Legacy)   │
                    └──────┬──────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
    ┌─────┴─────┐   ┌─────┴─────┐   ┌─────┴─────┐
    │  Relé 67  │   │  Relé 67  │   │  Relé 50  │
    │   SEL-751  │   │   SEL-751  │   │  REF 615  │
    └────────────┘   └────────────┘   └────────────┘
```

### 4.2 Interfaces Existentes

| Interfaz | Protocolo | Velocidad | Estado |
|-----------|-----------|-----------|--------|
| RTU ↔ SCADA Master | IEC 60870-5-104 | 64 kbps | ☐ OK / ☐ Lento |
| RTU ↔ Relé 67-1 | DNP3 Serial | 9600 baud | ☐ OK |
| RTU ↔ Relé 67-2 | DNP3 Serial | 9600 baud | ☐ OK |
| RTU ↔ Relé 50/51 | IEC 61850 | 100 Mbps | ☐ OK / ☐ No usado |
| RTU ↔ MTU | Modbus RTU | 9600 baud | ☐ OK |

### 4.3 Infraestructura de Red

| Ítem | Detalle |
|-------|---------|
| Tipo de medio físico | ☐ Cobre / ☐ Fibra óptica |
| Switch existente | ☐ Sí / ☐ No — Modelo: _______ |
| Redundancia | ☐ Sí / ☐ No |
| Firewall | ☐ Sí / ☐ No — Modelo: _______ |
| Dirección IP RTU | _______ |
| Dirección IP SCADA | _______ |

---

## 5. LEVANTAMIENTO DE LÓGICA DE CONTROL

### 5.1 Secuencias de Control

| # | Secuencia | Descripción | Prioridad |
|---|-----------|-------------|-----------|
| 1 | CI-01 | Cierre de interruptor con sincrocheck | 🔴 CRÍTICA |
| 2 | AB-01 | Apertura de bahía en emergencia | 🔴 CRÍTICA |
| 3 | SK-01 | Secuencia de enclavamiento | 🔴 CRÍTICA |
| 4 | CL-01 | Cambio de posición seccionadores | 🟡 MEDIA |
| | | | |

### 5.2 Lógica de Interlocking

```
┌─────────────────────────────────────────────────┐
│                  ENCLAVAMIENTOS                   │
├─────────────────────────────────────────────────┤
│ 1. 52-1 solo cierra si 89-1 y 89-2 cerrados  │
│ 2. 89-1 solo opera si 52-1 abierto            │
│ 3. 89-2 solo opera si 52-1 abierto            │
│ 4. Apertura 52 por falla: CBFP inmediato        │
└─────────────────────────────────────────────────┘
```

### 5.3 Alarmas y Eventos

| # | Alarma | Tipo | Prioridad | Acción |
|---|--------|------|-----------|--------|
| 1 | Falla relé 67 | ALARMA | 🔴 CRÍTICA | Apertura 52 |
| 2 | Falla SF6 | ALARMA | 🔴 CRÍTICA | Aviso SCADA |
| 3 | Temperatura TF > 80°C | WARNING | 🟡 MEDIA | Aviso SCADA |
| 4 | Posición anómala | EVENTO | 🟢 BAJA | Log |
| | | | | |

---

## 6. REQUERIMIENTOS OPERATIVOS

### 6.1 Modos de Operación

| Modo | Descripción | Requerimiento |
|------|-------------|---------------|
| LOCAL | Desde sala de control local | Panel de operador |
| REMOTO | Desde centro de control | Control desde SCADA |
| TEST | Para pruebas sin afectar | Modo de prueba |

### 6.2 Tiempo de Respuesta

| Función | Tiempo requerido | Actual |
|---------|-----------------|--------|
| Apertura de emergencia | < 50 ms | _______ ms |
| Cierre con sincrocheck | < 200 ms | _______ ms |
| Actualización de medidas | < 1 s | _______ s |
| Cambio de estado digital | < 100 ms | _______ ms |

### 6.3 Disponibilidad

| Ítem | Requerimiento |
|------|---------------|
| Disponibilidad | 99.99% (4 horas downtime/año) |
| Redundancia | ☐ Sí / ☐ No |
| Baterías | ☐ Sí / ☐ No — Capacidad: _______ |

---

## 7. FOTOGRAFÍAS REQUERIDAS

### 7.1 Sala de RTU

- [ ] Vista general del rack
- [ ] RTU existente (placa frontal)
- [ ] Módulos de I/O
- [ ] Panel de operador local
- [ ] Fuentes de poder
- [ ] Gabinetes de comunicaciones

### 7.2 Equipos de Campo

- [ ] Interruptores (vista general)
- [ ] Placa de datos interruptor
- [ ] Relés de protección
- [ ] Placa de relés
- [ ] Transformadores de medida

### 7.3 Cableado

- [ ] Bornera de RTU (entrada cables)
- [ ] Detalle de etiquetado cables
- [ ] Patch panel de comunicaciones

---

## 8. CHECKLIST DE VISITA TÉCNICA

### Antes de la Visita

- [ ] Obtener permisos de acceso
- [ ] Coordinar con operación para window de trabajo
- [ ] Confirmar disponibilidad de documentos
- [ ] Preparar equipo de medición

### Durante la Visita

- [ ] Tomar fotos de todo
- [ ] Verificar documentación existente
- [ ] Contar puntos de I/O reales
- [ ] Identificar equipos de campo
- [ ] Mapear cableado
- [ ] Probar comunicación con SCADA

### Después de la Visita

- [ ] Compilar fotos y videos
- [ ] Actualizar checklist de I/O
- [ ] Solicitar documentos faltantes
- [ ] Elaborar informe preliminar

---

## 9. CRONOGRAMA TÍPICO DE RETROFIT

```
FASE 1: DISEÑO (4-6 semanas)
├── Semana 1-2: Levantamiento en sitio
├── Semana 3-4: Diseño de ingeniería
└── Semana 5-6: Aprobación de ingeniería

FASE 2: FABRICACIÓN (8-12 semanas)
├── Semana 7-10: Fabricación de equipos
├── Semana 11: Pruebas en fábrica (FAT)
└── Semana 12: Empaque y envío

FASE 3: INSTALACIÓN (2-4 semanas)
├── Semana 1: Instalación de equipos
├── Semana 2: Cableado y conexiones
└── Semana 3-4: Pruebas y commissioning

FASE 4: PUESTA EN SERVICIO (1-2 semanas)
├── Semana 1: Integración con SCADA
├── Semana 2: Pruebas de aceptación (SAT)
└── Entrega

TOTAL: 15-24 semanas (4-6 meses)
```

---

## 10. SOLUCIÓN SUPCON PARA RETROFIT

### Equipos Recomendados

| Equipo | Modelo | Función |
|--------|--------|---------|
| RTU | **SUPCON SComm** | Controlador de subestación |
| I/O | **SUPCON TUA** | Módulos de I/O |
| Gateway | **SupBox 510** | Protocolo IEC 61850 |
| Red | **AEF6512** | Switch Ethernet-APL |
| HMI | **SOLISCADA** | Visualización local |

### Arquitectura Propuesta

```
┌─────────────────────────────────────────────────────┐
│                    SCADA MASTER                      │
│                    (IEC 60870-5-104)                 │
└─────────────────────────┬───────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────┐
│              SUPCON SComm RTU                         │
│  ┌─────────────────────────────────────────────┐   │
│  │         IEC 61850 / DNP3 / Modbus          │   │
│  └─────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────┐   │
│  │              I/O Modules                    │   │
│  │  DI: 32  DO: 16  AI: 16  AO: 8           │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────┬───────────────────────────┘
                          │
     ┌────────────────────┼────────────────────┐
     │                    │                    │
┌────▼────┐         ┌────▼────┐         ┌────▼────┐
│ Relé 67 │         │ Relé 50 │         │  MTU   │
│  SEL-751│         │ REF 615 │         │ Medidor │
└─────────┘         └─────────┘         └─────────┘
```

### Beneficios del Retrofit SUPCON

| Aspecto | Antes (Legacy) | Después (SUPCON) |
|---------|---------------|-------------------|
| Protocolos | Solo DNP3 | IEC 61850 + DNP3 + Modbus |
| Conectividad | Serial 9600 | Ethernet 100 Mbps |
| Diagnóstico | Manual | Automático |
| Mantenimiento | Predictivo | Basado en condición |
| Escalabilidad | Limitada | Ilimitada |

---

## 11. PRÓXIMOS PASOS

### Información Requerida

- [ ] Diagrama unifilar actualizado
- [ ] Lista de puntos de I/O
- [ ] Protocolos de comunicación
- [ ] Fotos de sala de RTU
- [ ] Estado de equipos de campo

### Contacto para Seguimiento

| Rol | Nombre | Teléfono | Email |
|-----|--------|-----------|-------|
| Cliente | | | |
| Operación | | | |
| Mantenimiento | | | |

---

**Última actualización:** 14-abr-2026  
**Elaborado por:** SUPCON Chile — Especialista Retrofit Subestaciones
