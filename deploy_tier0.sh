#!/bin/bash

# Industrial Deployment Script for SUPCON Chile Tier Cero Demo
# This script prepares a portable environment for KAMs to present the Silver Bullet strategy.

echo "🚀 Industrializing SUPCON Chile Tier Cero Demo..."

# Check dependencies
if ! command -v docker &> /dev/null
then
    echo "⚠️ Warning: Docker is not installed. MQTT Broker (Local) requires Docker."
else
    echo "✅ Docker detected."
fi

# Prepare assets (If any build steps were needed, they'd go here)
echo "📦 Packaging Dashboard Assets..."
# In this static version, we just ensure files are in place.

# Include intelligence data in bundle
if [ -f "intelligence_data.js" ]; then
    echo "✅ Intelligence DB: intelligence_data.js ($(wc -l < intelligence_data.js) líneas, $(du -sh intelligence_data.js | cut -f1))"
else
    echo "⚠️  intelligence_data.js no encontrado — ejecutar scripts/intelligence_scraper.py primero"
fi

# Include CSV datasets
if [ -d "data/processed" ]; then
    echo "✅ Datasets CSV:"
    for csv in data/processed/*.csv; do
        echo "   — $(basename $csv) ($(wc -l < "$csv" | tr -d ' ') filas)"
    done
fi

# Include documentation PDFs
if [ -d "Documentacion" ]; then
    echo "✅ Documentación descargada:"
    for pdf in Documentacion/*.pdf; do
        echo "   — $(basename "$pdf") ($(du -sh "$pdf" | cut -f1))"
    done
fi

# Success message
echo "*****************************************************"
echo "✅ DEPLOYMENT READY: Tier Cero Industrial Simulator"
echo "*****************************************************"
echo "Instructions for KAM:"
echo "1. Run a local MQTT Broker (e.g., docker run -it -p 1883:1883 -p 9001:9001 emqx/emqx)"
echo "2. Open index.html in any modern browser."
echo "3. Launch 'Bala de Plata' to start the industrial UNS demonstration."
echo "*****************************************************"
