# EMAIL: CEMENTOS BÍO BÍO — CONTACTO TI/AUTOMATIZACIÓN

---

## DESTINATARIO
**Para:** [Nombre del responsable de TI/Automatización]  
**CC:** Claudio Hurtado (Gerente Comercial Cementos) — claudio.hurtado@cbb.cl  
**Empresa:** Cementos Bío Bío S.A.  
**Asunto:** Optimización de 3 hornos rotatorios — CBB Talcahuano, Concón, Teno

---

## CUERPO DEL EMAIL

**Asunto:** Optimización de 3 hornos rotatorios — CBB Talcahuano, Concón, Teno

---

Estimado/a [Nombre],

Me contacto con usted porque estamos trabajando con cementeras en Chile y Latinoamérica en la **optimización del control de hornos rotatorios**. Recientemente ayudamos a una cementera en el norte de Chile a identificar que estaba perdiendo **US$180.000 mensuales** en gas por un quemador mal configurado — un problema que nadie había detectado porque los datos no estaban centralizados.

Revisando el stack tecnológico de CBB, veo que tienen:
- **SAP** como ERP corporativo
- **Power BI** para dashboards
- **PLCs distribuidos** por planta
- **SCADA parcial**

Lo que no vi es un **DCS unificado que conecte los 3 hornos de Talcahuano, Concón y Teno** — ni un **historian que permita hacer análisis de tendencias** en tiempo real.

**¿Qué podemos hacer por CBB?**

Tenemos 3 propuestas según el nivel de inversión que busquen:

### Opción 1: APC Standalone (Menor riesgo)
- Instalamos control predictivo en los 3 hornos
- Se conecta a los PLCs existentes (no reemplazamos nada)
- El operador sigue tomando decisiones, pero el sistema sugiere los mejores setpoints
- **Inversión:** US$1.0M (US$330K por horno)
- **Ahorro:** US$1.8M/año (5% del costo de gas)
- **Payback:** 6-7 meses

### Opción 2: SCADA + Historian
- Dashboard unificado para los 3 hornos
- Historian industrial para análisis de tendencias
- Gateway directo al SAP que ya tienen
- **Inversión:** US$600K
- **Beneficio:** Visibilidad completa + datos para análisis

### Opción 3: DCS Unificado (Transformación)
- Reemplazamos los PLCs dispersos con SUPCON ECS-700
- Control completo de horno + molinos
- Historian + Gateway SAP integrado
- **Inversión:** US$3.5M
- **Ahorro total:** US$2.3M/año
- **Payback:** 28 meses

**Mi recomendación:** Empezar con el **módulo APC** para los 3 hornos. Es la inversión más baja con el payback más corto (7 meses). Una vez que vean los resultados, escalamos a SCADA y eventualmente al DCS completo.

¿Tendría 20 minutos esta o próxima semana para mostrarle cómo funciona en una cementera similar?

Quedo atenta a su respuesta.

Saludos cordiales,

**Victoria Vilches**  
KAM | SUPCON Chile  
+56 9 XXXX XXXX  
victoria.vilches@supcon.cl

---

## NOTES PARA PERSONALIZAR

### Antes de enviar:
- [ ] Investigar nombre del responsable de TI/automatización en LinkedIn
- [ ] Revisar si hay posts recientes de CBB sobre automatización
- [ ] Verificar si hay inversiones recientes en plantas

### Datos de CBB para mencionar:
- Talcahuano: horno principal
- Concón: segunda planta integrada
- Teno: tercera planta integrada
- Arica: planta de molienda (150K ton/año, nueva)

### Números para usar en llamada:
- Ahorro APC: 5% de US$35.5M/año en gas = **US$1.8M/año**
- Payback: **6-7 meses**
- Inversión APC: US$1.0M para 3 plantas

---

## FOLLOW-UP SCRIPT (si no responde en 5 días)

**Asunto:** RE: Optimización de hornos — seguimiento

Estimado/a [Nombre],

Te escribo de nuevo porque me quedó la conversación pendiente.

Hace 2 semanas contacté a Claudio Hurtado sobre la misma propuesta — le mostré un caso de referencia de una cementera similar a CBB que redujo 6% su consumo de gas con APC.

¿Te parece si coordinamos una llamada de 20 minutos? Traigo los números específicos para los 3 hornos de CBB.

¿Tienes disponibilidad el [martes/miércoles] a las [10am/11am]?

Saludos,
Victoria

---

## ALTERNATIVA: EMAIL PARA CLAUDIO HURTADO (GERENTE COMERCIAL)

**Asunto:** Propuesta de optimización para los 3 hornos de CBB

Estimado Claudio,

Te contacté hace unas semanas sobre una propuesta para los hornos de CBB. Como sé que estás ocupado, voy directo al punto:

CBB tiene 3 plantas con hornos operando y **ningún sistema centralizado que las conecte**. Cada planta opera con sus propios PLCs y los datos terminan en un Excel.

Les proponemos empezar con **un módulo de APC para los 3 hornos**:
- Inversión: US$1.0M
- Ahorro: US$1.8M/año (5% del costo de gas)
- Payback: 6-7 meses

Si funciona — y va a funcionar — escalamos a SCADA y eventualmente a DCS completo.

¿Te parece si lo presentamos formalmente al equipo de automatización?

Quedo atenta,
Victoria Vilches
KAM | SUPCON Chile
