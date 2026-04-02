# 📝 Checklist de Visita: Demo Real Tier 0 "Bala de Plata"

Esta lista asegura que el KAM de SUPCON llegue a la planta (Codelco, BHP, Arauco, etc.) con todo lo necesario para desplegar una **Prueba de Concepto (PoC) en 30 minutos** sin depender de la infraestructura del cliente.

## 🧳 1. El Kit de Hardware "Silver Bullet"
Un KAM profesional nunca pide herramientas al cliente. Debes llevar tu propio ecosistema:

- [ ] **Laptop de Demo**: Con Docker Desktop instalado y configurado.
- [ ] **Conversor USB a Ethernet (RJ45)**: Por si tu laptop solo tiene USB-C.
- [ ] **Router 4G/5G Industrial (o Hotspot móvil)**: **CRÍTICO**. No confíes en el Wi-Fi del cliente; los firewalls de TI suelen bloquear el tráfico MQTT.
- [ ] **Cables de Red (2x 3 metros)**: Blindados (STP) para evitar interferencia en salas eléctricas.
- [ ] **Multi-enchufe (Zapatilla)**: Las salas de control nunca tienen suficientes enchufes disponibles.

## 💻 2. Preparación de Software (En la Oficina)
**IMPORTANTE**: No descargues nada en la planta. La señal de celular suele ser mala en minería/industria.

- [ ] **Cache de Docker**: Ejecuta `sh deploy_tier0.sh` en tu oficina un día antes para que todas las imágenes (EMQX, Grafana, etc.) ya estén en tu disco duro.
- [ ] **Repositio Tier 0**: Asegúrate de tener la última versión del código localmente.
- [ ] **Simulador de Respaldo**: Ten abierta la pestaña del **[Tablero Táctico (Simulador)](index.html)** por si la conexión física al PLC falla. El cliente no debe notar el problema.

## 🔌 3. Configuración de Red OT (En Planta)
Antes de conectar al switch industrial:

- [ ] **IP Estática**: Configura tu tarjeta de red en el mismo rango que el PLC del cliente (ej: `192.168.1.xxx`). Pregunta al instrumentista local un IP libre.
- [ ] **Ping de Validación**: Haz un `ping` a la dirección del PLC/DCS antes de iniciar Tier 0.
- [ ] **MQTT Broker Interno**: Asegúrate de que `docker-compose` esté corriendo el broker local `localhost:1883`, no el broker público de internet.

## 🎭 4. El "Protocolo 30 Minutos" (Frente al Cliente)
Sigue este guion técnico:

1.  **Min 0-5**: Introducción estratégica usando el **Tablero Táctico**.
2.  **Min 5-10**: Conexión física. "Voy a conectar mi 'Edge Gateway' (Laptop) a su red de control".
3.  **Min 10-20**: Ejecución de **Tier 0**. "Miren el árbol UNS: se está construyendo solo con sus datos vivos".
4.  **Min 20-30**: **Factor Wow (GenAI)**. Escribe una consulta en el App Builder frente al cliente (ej: *"¿Cuál es la desviación de presión en el domo en la última hora?"*).

---

> [!CAUTION]
> **Seguridad Industrial (Ciberseguridad)**: 
> Si el cliente se niega a conectar tu laptop a su red (Air-gapped network), **NO INSISTAS**. Usa el Simulador local y ofrece una PoC formal con un Edge Gateway certificado por SUPCON para la siguiente visita.

**¿Quieres que añadamos una sección de "FAQ Técnicas" para que el KAM sepa responder si el de IT/OT del cliente empieza a hacer preguntas difíciles?**
