# 🛡️ Guía de Objeciones Técnicas (Manejo de IT/OT)

Esta guía prepara al KAM para las preguntas de los **Jefes de TI y OT** de la planta, quienes suelen ser los "bloqueadores" de la innovación tecnológica.

## 🔒 1. Ciberseguridad: "¿Es seguro conectar tu laptop a mi red?"
- **Respuesta KAM**: "Totalmente. Tier 0 corre en un contenedor aislado (Docker) que solo escucha tráfico industrial (puertos específicos como 502 o 4840). No instalamos software en sus máquinas, solo consumimos datos en modo 'Solo Lectura' (Read-Only)".
- **Nivel Experto**: "Si lo prefieren, podemos usar un **Edge Gateway unidireccional (Data Diode)** que físicamente impide que cualquier dato fluya desde mi laptop hacia su red de control".

## 📡 2. Ancho de Banda: "¿Vas a saturar mi red de control con datos?"
- **Respuesta KAM**: "Tier 0 usa **Report by Exception (RBE)**. Solo enviamos datos cuando hay un cambio en el valor de la variable. El consumo es despreciable (bytes), comparado con los sistemas SCADA tradicionales que consultan todo constantemente".
- **Nivel Experto**: "Implementamos una arquitectura UNS que optimiza el tráfico mediante **MQTT Sparkplug B**, reduciendo el ruido en la red hasta en un 80%".

## 🕹️ 3. Legado: "¿Qué pasa si mis PLCs son de los 90s (Serial/Modbus)?"
- **Respuesta KAM**: "Esa es la especialidad de SUPCON. Tier 0 es **agnóstico**. Tenemos conectores nativos para más de 300 protocolos (Modbus, DH+, Profibus). Si hay un cable, podemos extraer el dato y convertirlo a un formato moderno de inmediato".

## 📂 4. Propiedad del Dato: "¿A dónde van mis datos una vez que suben a Tier 0?"
- **Respuesta KAM**: "Ustedes son los únicos dueños. Tier 0 es una **Data Foundation Local**. Los datos se quedan en su borde (Edge). Solo suben a la nube lo que ustedes decidan para analítica avanzada, y siempre bajo encriptación TLS 1.3 (estándar bancario)".

## 🔌 5. Resiliencia: "¿Qué pasa si se cae la internet en la mina?"
- **Respuesta KAM**: "Tier 0 tiene capacidad de **Store & Forward**. Si la conexión a la nube se pierde, los datos se guardan localmente en la laptop/Edge y se sincronizan automáticamente cuando vuelve la señal. No se pierde ni un milisegundo de eventos".

---

> [!TIP]
> **Consejo de Oro para el KAM**: 
> Si el Jefe de IT se pone muy defensivo, no discutas. Dile: *"Entiendo perfectamente su preocupación por la seguridad. Tier 0 está diseñado precisamente para ser una capa de abstracción que protege su control mientras libera el dato para el negocio"*.

**¿Quieres que agreguemos esta FAQ al [Manual de Demo](file:///Users/victorvilche/.gemini/antigravity/brain/dcc8a2fc-14e9-42a0-8db6-4106463856b9/tier0_demo_guide.md) para tener un solo documento maestro de ventas?**
