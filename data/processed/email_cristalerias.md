# EMAIL: Cristalerías Chile — Propuesta Baby Steps

---

**Para:** Carlos Concha — Ing. Departamento de Ingeniería  
**Email:** —  
**Fecha:** 14-abr-2026  
**Asunto:** Propuesta escalonada para Cristalerías Chile — Sin riesgo, alto impacto

---

Estimado Carlos,

Gracias por la reunión de hoy. Fue muy productivo entender mejor la operación de Cristalerías.

Según lo que conversamos, entiendo que tienen 6 hornos operando con PLCs que actualmente no se comunican entre sí. Eso significa que no tienen visibilidad centralizada de la temperatura, el flujo de gas, ni la eficiencia de cada horno.

Les propongo una estrategia **escalonada** para ir resolviendo esto sin comprometer capital grande desde el inicio. Así empezamos con algo pequeño, vemos resultados, y escalamos cuando ustedes lo decidan.

---

## OPCIÓN 1: Recocido Watch (Entry Point)
### Inversión: US$20-25K | Tiempo: 3 semanas | Riesgo: MUY BAJO

Empezamos por el proceso de **recocido** — que es donde ustedes generan más scrap según lo que vi.

**Incluye:**
- 3 sensores de temperatura wireless (WS300)
- 1 gateway para conectividad
- Dashboard en cloud con tendencias 24/7
- Alarmas por desviación de temperatura
- Reportes semanales de eficiencia

**Beneficio inmediato:**
- Reducción de scrap 2-3% en vidrio recocido
- Alertas antes de que el vidrio se dañe
- Visibilidad desde cualquier lugar

**ROI:**
- Si ustedes producen 100K ton/año de vidrio recocido
- 2% scrap reduction = 2,000 ton salvadas
- Valor: ~US$40-60K/año
- Payback: **4-6 meses**

> *"No les pido que me den el control del horno. Solo les muestro qué está pasando en el recocido."*

---

## OPCIÓN 2: SCADA-only (1 horno)
### Inversión: US$50-60K | Tiempo: 6 semanas | Riesgo: BAJO

Si el recocido funciona bien, subimos a monitorear **1 horno** completo.

**Incluye:**
- Controlador FCU713 para 1 horno
- Módulos I/O (temperatura, presión, flujo)
- SCADA con dashboard para ese horno
- Historian para tendencias
- Alarmas centralizadas

**Beneficio:**
- Visibilidad completa del horno #1
- Datos históricos para análisis
- Base para escalar a los otros 5

**ROI:**
- Monitoreo de eficiencia = ahorro 2-3% en gas
- Ahorro: ~US$80-120K/año por horno
- Payback: **6-9 meses**

> *"Vemos cómo funciona el sistema en 1 horno. Si funciona, escalamos a los otros 5."*

---

## OPCIÓN 3: APC Standalone (1 horno)
### Inversión: US$140K | Tiempo: 3 meses | Riesgo: MEDIO

Con el control predictivo avanzado, **optimizamos** el consumo de gas del horno #1.

**Incluye:**
- Sistema APC con modelo predictivo
- Conexión a PLCs existentes
- Recomendaciones de setpoints en tiempo real
- El operador decide si acepta o no

**Beneficio:**
- Ahorro de gas 4-5% por horno
- Reducción de variabilidad
- Extensión de vida útil del horno

**ROI:**
- Ahorro: ~US$200-300K/año por horno
- Payback: **5-7 meses**

> *"El APC 'aprende' el comportamiento del horno y sugiere el mejor setpoint cada 5 minutos. El operador decide."*

---

## OPCIÓN 4: Full DCS (6 hornos)
### Inversión: US$2.0M | Tiempo: 12 meses | Riesgo: BAJO (con referencias)

Cuando hayamos demostrado valor en 1 horno, escalamos a los 6.

**Incluye:**
- 2 controladores FCU713 redundantes
- Red completa Ethernet-APL
- SCADA unificado para 6 hornos
- APC para optimización
- supOS como plataforma

**ROI:**
- Ahorro total: US$1.2-1.8M/año
- Payback: **13-20 meses**

---

## NUESTRA RECOMENDACIÓN

```
MES 1-2:  Recocido Watch ──────► US$20-25K
MES 3-4:  SCADA 1 horno ──────► US$50-60K
MES 5-8:  APC 1 horno ───────► US$140K
MES 9-12: Full DCS 6 hornos ──► US$1.0M (descuento por volumen)
                                    ───────────────
TOTAL:                              US$1.2M
                                    (vs US$2.0M upfront)
```

> *"No les pido US$2M upfront. Empezamos con US$20K, demostramos valor, escalamos cuando ustedes quieran."*

---

## PRÓXIMOS PASOS

1. **Esta semana:** Me confirman qué opción les interesa más
2. **Próxima semana:** Visita técnica para levantar specs
3. **2-3 semanas:** Propuesta formal con timeline

¿Les parece? ¿Cuándo podemos agendar la próxima reunión para profundizar en alguna opción?

Quedo atenta.

Saludos,

**Victoria Vilches**  
KAM | SUPCON Chile  
+56 9 XXXX XXXX

---

## NOTAS PARA LA REUNIÓN

### Datos de Cristalerías (estimados):
- 6 hornos operando
- Producción: ~500K ton/año
- Consumo gas: ~US$60M/año (estimado)
- EBIT negativo = urgencia para savings

### Objeciones anticipadas:
| Objeción | Respuesta |
|-----------|-----------|
| "No tenemos presupuesto" | Empezamos con US$20K en recocido. Casi nada. |
| "Ya tenemos Siemens" | No reemplazamos Siemens. Solo agregamos visibilidad. |
| "Funciona bien ahora" | ¿Han medido cuánto les cuesta una parada no planificada? |
| "Prueba primero" | Por eso empezamos con el recocido — riesgo casi cero. |

### Preguntas para discovery:
1. ¿Cuántos grados se desvía la temperatura del horno en operación normal?
2. ¿Cuánto scrap generan en recocido?
3. ¿Cuántas paradas no planificadas tuvieron el año pasado?
4. ¿Quién monitorea los hornos hoy?
5. ¿Qué les gustaría saber que hoy no pueden ver?
