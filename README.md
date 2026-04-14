# Tablero Táctico Tier Cero | SUPCON Chile 🇨🇱

Este repositorio contiene la **"Bala de Plata" (Tier Cero Dashboard)**, una herramienta industrial de alta fidelidad diseñada para que los Key Account Managers (KAMs) de SUPCON Chile desplacen a la competencia tradicional (marcas legacy) mediante la digitalización nativa y la IA Generativa Industrial.

## 🚀 La Trilogía Estratégica (Valor Agregado)

Para ganar el mercado, entendemos la interacción entre tres pilares fundamentales:

1.  **UCS (Universal Control System)**: El hardware abierto definido por software. Elimina el *vendor lock-in* (dependencia de marca) y reduce el CAPEX del cliente en un 40%.
2.  **Tier Cero (Unified Namespace - UNS)**: La arquitectura que democratiza los datos. Pone toda la planta en una "Fuente Única de Verdad" accesible vía MQTT/Sparkplug B.
3.  **TPT (Time-Series Pre-trained Transformer)**: La IA nativa. Analiza telemetría en tiempo real para predecir fallas y optimizar procesos, aumentando el OEE del cliente en un 25%.

---

## 🛠️ Funcionalidades del Dashboard

- **Calculadora TCO/IPC**: Herramienta de ventas para demostrar el aumento de costos de mantenimiento de marcas legacy (2009-2026).
- **Industrial Big Data (2009-2026)**: Librería de referencia masiva con +1,500 puntos de datos y fallas históricas reales (BHP, Codelco, Arauco, CMPC).

---

## 📦 Despliegue en Terreno (Air-Gapped)

Para visitas a planta sin internet, utiliza el script industrial de despliegue:

```bash
./deploy_tier0.sh
```

Este script inicializa la infraestructura local (`Docker`, `EMQX Broker`) necesaria para que la demo funcione en el laptop del KAM sin conexión externa.

---

## 📂 Estructura del Proyecto

- `index.html`: Dashboard táctico central (Estrategia 2026-2030).
- `tier0.html`: Interfaz de ingeniería y simulación (Bala de Plata).
- `tier0_core.js`: Motor de inferencia TPT (Instancia Chile v2.4) y lógica de conectividad MQTT.
- `reference_data.js`: BIG DATA Industrial (Fingerprints de falla 2009-2026 para Minería, Celulosa, Energía).
- `style.css`: Sistema de diseño industrial con estética *Premium Glassmorphism*.

---

© 2026 SUPCON Chile. Todos los derechos reservados. Confidencial - Uso Exclusivo para KAMs.
