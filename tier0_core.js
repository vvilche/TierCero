// Tier 0 Core Engine - Real Demo (SUPCON Chile)
// Using MQTT.js for Real-Time Industrial Data Foundation

const brokerUrl = 'wss://broker.emqx.io:8084/mqtt';
const clientId = 'supcon_chile_demo_' + Math.random().toString(16).substring(2, 8);
const baseTopic = 'supcon/chile/uns/';

let client = null;
let currentIndustry = 'mining';
let selectedNode = null;
let selectedNodes = [];

const INDUSTRY_REFERENCE_MAP = {
    mining: 'mining',
    pulp: 'cellulose',
    desal: 'energy',
    food: 'cellulose'
};

const INDUSTRY_LABELS = {
    mining: 'Minería',
    pulp: 'Celulosa',
    desal: 'Desalación/Energía',
    food: 'Alimentos'
};

const DEFAULT_ANOMALY_CONFIG = {
    window: 20,
    zScore: 3,
    rocThreshold: 0.25
};
const anomalyConfig = { ...DEFAULT_ANOMALY_CONFIG };
const ANOMALY_HISTORY_LIMIT = 40;

const anomalyEngine = {
    buffers: {},
    meta: {},
    history: [],
    listeners: [],
    failureCursor: {},
    unreadCount: 0
};

let activeDetailTab = 'telemetry';

const FACTORY_DATA = {
    mining: {
        id: 'codelco',
        name: "Codelco Andina",
        uns: {
            "Codelco": {
                "Andina": {
                    "Concentradora": {
                        "Flotacion_Celdas": {
                            "pH": { value: 10.5, unit: "pH" },
                            "Nivel_Pulpa": { value: 1.45, unit: "m" },
                            "Flujo_Aire": { value: 125.2, unit: "Nm3/h" },
                            "Dosificacion_Reactivos": { value: 55.4, unit: "g/t" }
                        }
                    }
                }
            }
        }
    },
    pulp: {
        id: 'arauco',
        name: "Arauco Constitución",
        uns: {
            "Arauco": {
                "Constitucion": {
                    "Evaporadores": {
                        "Licor_Concentrado": {
                            "Solidos": { value: 68.5, unit: "%" },
                            "Flujo_Salida": { value: 145.2, unit: "m3/h" },
                            "Presion_Vapor": { value: 4.2, unit: "bar" }
                        }
                    }
                }
            }
        }
    },
    desal: {
        id: 'bhp',
        name: "BHP Antofagasta",
        uns: {
            "BHP": {
                "Coloso_Desal": {
                    "Osmosis": {
                        "Rack_A": {
                            "Presion": { value: 62, unit: "bar" },
                            "Flujo": { value: 1500, unit: "m3/h" }
                        }
                    }
                }
            }
        }
    },
    food: {
        id: 'agrosuper',
        name: "Agrosuper San Vicente",
        uns: {
            "Agrosuper": {
                "Planta_02": {
                    "Procesado": {
                        "Escaldadora": {
                            "Temp": { value: 62, unit: "°C" },
                            "Nivel": { value: 95, unit: "%" }
                        }
                    }
                }
            }
        }
    }
};

let industryData = {};

const PROCESS_LIMITS = buildProcessLimits();

function initData() {
    const saved = localStorage.getItem('supcon_tier0_data');
    if (saved) {
        industryData = JSON.parse(saved);
    } else {
        industryData = JSON.parse(JSON.stringify(FACTORY_DATA));
    }
    augmentAllIndustriesWithReference();
}

function initMQTT() {
    const statusText = document.getElementById('mqtt-status-text');
    const statusPulse = document.getElementById('mqtt-status-pulse');
    
    client = mqtt.connect(brokerUrl, { clientId });

    client.on('connect', () => {
        statusText.innerText = 'Conectado (Vivo)';
        statusPulse.style.background = '#238636';
        client.subscribe(`${baseTopic}#`);
        renderTree();
    });

    client.on('message', (topic, message) => {
        try {
            const data = JSON.parse(message.toString());
            updateValueFromMQTT(topic, data);
        } catch (e) {}
    });

    client.on('error', () => {
        statusText.innerText = 'Error de Conexión';
        statusPulse.style.background = '#8B949E';
    });
}

function updateValueFromMQTT(topic, data) {
    const parts = topic.replace(baseTopic, '').split('/');
    const industry = parts[0];
    if (industry === currentIndustry && selectedNode && topic.includes(selectedNode.name)) {
        renderDetails(selectedNode.data);
    }
}

function loadIndustryUNS() {
    currentIndustry = document.getElementById('industry-select').value;
    renderTree();
    renderDetails({}); // Reset details
}

function renderTree() {
    const root = document.getElementById('uns-root');
    if (!root) return;
    root.innerHTML = '';
    const data = industryData[currentIndustry].uns;
    buildTreeNodes(data, root, []);
    syncTreeSelectionState();
}

function buildTreeNodes(obj, parentElement, path = []) {
    for (const key in obj) {
        const node = document.createElement('div');
        node.className = 'tree-node';
        const header = document.createElement('div');
        header.className = 'tree-node-header';
        const isLeaf = !Object.values(obj[key]).some(v => typeof v === 'object' && v !== null && !v.unit);
        header.innerHTML = `<span class="folder-icon">${isLeaf ? '📊' : '📁'}</span><span class="node-name">${key}</span>`;
        const nodePath = [...path, key];
        const pathKey = nodePath.join('>');
        header.dataset.path = pathKey;
        header.dataset.industry = currentIndustry;
        header.onclick = (e) => {
            e.stopPropagation();
            selectNode(key, obj[key], header);
            const children = node.querySelector('.tree-children');
            if (children) children.style.display = children.style.display === 'none' ? 'block' : 'none';
        };

        const selectable = nodeContainsTags(obj[key]);
        if (selectable) {
            const pinBtn = document.createElement('button');
            pinBtn.className = 'node-pin';
            pinBtn.dataset.path = pathKey;
            pinBtn.dataset.industry = currentIndustry;
            pinBtn.textContent = '＋';
            pinBtn.setAttribute('title', 'Agregar al comparador');
            pinBtn.onclick = (event) => {
                event.stopPropagation();
                toggleAssetSelection(pathKey, key, obj[key], currentIndustry);
            };
            header.appendChild(pinBtn);
        }

        node.appendChild(header);
        if (!isLeaf) {
            const childrenContainer = document.createElement('div');
            childrenContainer.className = 'tree-children';
            buildTreeNodes(obj[key], childrenContainer, nodePath);
            node.appendChild(childrenContainer);
        }
        parentElement.appendChild(node);
    }
}

function selectNode(name, data, element) {
    const active = document.querySelector('.tree-node-header.selected');
    if (active) active.classList.remove('selected');
    element.classList.add('selected');
    selectedNode = { name, data };
    document.getElementById('detail-title').innerText = `Activo: ${name}`;
    renderDetails(data);
    updateDataInspector(selectedNode);
}

function renderDetails(data) {
    const detailGrid = document.getElementById('detail-content');
    detailGrid.innerHTML = '';
    const hasValues = Object.values(data).some(v => v.unit);
    if (!hasValues) {
        detailGrid.innerHTML = '<p class="placeholder">Selecciona un activo para ver telemetría real de campo.</p>';
        return;
    }
    for (const tag in data) {
        if (data[tag].unit) {
            const card = document.createElement('div');
            card.className = 'tag-card';
            card.innerHTML = `
                <div class="tag-name">${tag}</div>
                <div class="tag-value">${data[tag].value}<span class="tag-unit">${data[tag].unit}</span></div>
            `;
            detailGrid.appendChild(card);
        }
    }
}

// Visual Editor Logic (No-Code)
function openSettings() {
    const modal = document.getElementById('settings-modal');
    modal.style.display = 'flex';
    renderSettingsTable();
}

function closeSettings() {
    document.getElementById('settings-modal').style.display = 'none';
}

function renderSettingsTable() {
    const tbody = document.getElementById('settings-tbody');
    tbody.innerHTML = '';
    
    // Find all tags in the current industry (Deep search)
    const tags = [];
    function findTags(obj, path = "") {
        for (const key in obj) {
            if (obj[key].unit) {
                tags.push({ path: path, key: key, data: obj[key] });
            } else if (typeof obj[key] === 'object') {
                findTags(obj[key], path ? `${path} > ${key}` : key);
            }
        }
    }
    findTags(industryData[currentIndustry].uns);

    tags.forEach((tag, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><small>${tag.path}</small></td>
            <td><input type="text" value="${tag.key}" data-index="${index}" class="edit-key"></td>
            <td><input type="number" step="0.1" value="${tag.data.value}" data-index="${index}" class="edit-value"></td>
            <td><input type="text" value="${tag.data.unit}" data-index="${index}" class="edit-unit"></td>
        `;
        tbody.appendChild(tr);
    });
}

function saveSettings() {
    const inputs = document.querySelectorAll('#settings-tbody tr');
    
    // Re-map the structure (this is a simplified rebuild for the demo)
    // In a production app we would use deep mapping, here we update the existing object
    let i = 0;
    function updateTags(obj) {
        let newObj = {};
        for (const key in obj) {
            if (obj[key].unit) {
                const row = inputs[i++];
                const newKey = row.querySelector('.edit-key').value;
                const newVal = parseFloat(row.querySelector('.edit-value').value);
                const newUnit = row.querySelector('.edit-unit').value;
                newObj[newKey] = { value: newVal, unit: newUnit };
            } else if (typeof obj[key] === 'object') {
                newObj[key] = updateTags(obj[key]);
            } else {
                newObj[key] = obj[key];
            }
        }
        return newObj;
    }

    industryData[currentIndustry].uns = updateTags(industryData[currentIndustry].uns);
    localStorage.setItem('supcon_tier0_data', JSON.stringify(industryData));
    resetIndustryAnomalyState(currentIndustry);
    
    renderTree();
    if (selectedNode) renderDetails(selectedNode.data);
    closeSettings();
    alert('Configuración guardada. La demo ahora refleja tus cambios.');
}

function resetToFactorySettings() {
    if (confirm('¿Seguro que quieres borrar todos los cambios y volver a los datos originales de SUPCON?')) {
        industryData = JSON.parse(JSON.stringify(FACTORY_DATA));
        localStorage.removeItem('supcon_tier0_data');
        augmentAllIndustriesWithReference();
        Object.keys(industryData).forEach(resetIndustryAnomalyState);
        clearSelectedAssets();
        renderTree();
        closeSettings();
    }
}

function startNetworkScan() {
    const btn = document.querySelector('.btn-scan');
    btn.innerText = '🗺️ Mapeando Red Industrial...';
    btn.disabled = true;
    setTimeout(() => {
        btn.innerText = '✅ Mapeo Completo';
        alert(`Tier Cero Dashboard ha mapeado automáticamente el UNS por Sparkplug B.`);
        btn.disabled = false;
        setTimeout(() => btn.innerText = '🔍 Escanear Red (MQTT)', 3000);
    }, 2500);
}

function triggerGenAI() {
    const inputEl = document.getElementById('genai-input');
    const query = inputEl.value.trim();
    if (!query) return;

    appendMessage('user', query);
    inputEl.value = '';

    const historyEl = document.getElementById('genai-chat-history');
    const typingMsg = document.createElement('div');
    typingMsg.className = 'message system typing';
    typingMsg.innerText = 'TPT Inferencia en curso...';
    historyEl.appendChild(typingMsg);
    historyEl.scrollTop = historyEl.scrollHeight;

    setTimeout(() => {
        historyEl.removeChild(typingMsg);
        const response = getAIResponse(query);
        typeMessage('system', response);
        
        // Trigger Dynamic UI if keywords detected
        const q = query.toLowerCase();
        if (q.includes('dashboard') || q.includes('panel')) {
            generateDynamicUI('dashboard');
        } else if (q.includes('tendencia') || q.includes('analiza') || q.includes('flujo')) {
            generateDynamicUI('trends');
        } else if (q.includes('tco') || q.includes('ahorro') || q.includes('valor')) {
            generateDynamicUI('tco');
        }
    }, 1500);
}

function appendMessage(sender, text) {
    const historyEl = document.getElementById('genai-chat-history');
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    msg.innerText = text;
    historyEl.appendChild(msg);
    historyEl.scrollTop = historyEl.scrollHeight;
}

function typeMessage(sender, text) {
    const historyEl = document.getElementById('genai-chat-history');
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    historyEl.appendChild(msg);
    
    let i = 0;
    const interval = setInterval(() => {
        msg.innerText += text[i];
        i++;
        historyEl.scrollTop = historyEl.scrollHeight;
        if (i >= text.length) clearInterval(interval);
    }, 20);
}

function clearGenAIChat() {
    const historyEl = document.getElementById('genai-chat-history');
    if (!historyEl) return;
    historyEl.innerHTML = '';
    appendMessage('system', 'Copiloto reiniciado. Enfocado para nueva interacción Tier 0.');
}

function getAIResponse(query) {
    const q = query.toLowerCase();
    const normalized = normalizeText(q);
    const activeTargets = selectedNodes.length ? selectedNodes : (selectedNode ? [{ name: selectedNode.name, data: selectedNode.data, industry: currentIndustry }] : []);
    const nodeName = activeTargets.length > 1 ? `${activeTargets.length} activos seleccionados` : (activeTargets[0]?.name || "Desconocido");
    const nodeData = activeTargets.length === 1 ? activeTargets[0].data : null;

    if (normalized.includes('anomalia')) {
        return describeAnomalies();
    }

    if (q.includes('dashboard') || normalized.includes('dash') || normalized.includes('tablero') || normalized.includes('vista') || normalized.includes('panel') || normalized.includes('ejecutivo')) {
        setDetailTab('telemetry');
        setTimeout(() => generateDynamicUI('dashboard'), 500);
        const scope = normalized.includes('ejecutivo') ? 'ejecutivo' : 'industrial';
        return `Comprendido. Sintetizando dashboard ${scope} para ${nodeName}. Configurando tarjetas OEE, salud del activo y contexto económico en tiempo real...`;
    }

    if (normalized.includes('grafico') || normalized.includes('tendencia') || q.includes('trend')) {
        setTimeout(() => generateDynamicUI('trends'), 500);
        return `Generando análisis de tendencias para ${nodeName}. Correlacionando variables históricas con el modelo TPT...`;
    }

    if (normalized.includes('reporte') || normalized.includes('ahorro') || q.includes('tco')) {
        const refData = getRefData();
        const tco = refData && refData.tcoBenchmark;
        setTimeout(() => generateDynamicUI('tco'), 500);
        if (tco) {
            return `Generando Reporte de Valor para ${currentIndustry.toUpperCase()}. Comparativa con ${tco.legacyBrand}: Ahorro proyectado del ${tco.supconSavingPercent}% en OPEX.`;
        }
        return `Generando Reporte TCO para ${currentIndustry.toUpperCase()}. Calculando diferencial de costo contra tecnología legacy...`;
    }

    if (normalized.includes('analiza') || q.includes('status')) {
        if (!nodeData && activeTargets.length > 1) {
            const sampleNames = activeTargets.slice(0, 3).map(n => n.name).join(', ');
            return `Analizando ${activeTargets.length} activos seleccionados (${sampleNames}${activeTargets.length > 3 ? '…' : ''}). Señales dentro de los márgenes esperados; revisa la pestaña “Alertas TPT” para los detalles críticos.`;
        }

        if (!nodeData) return `Analizando entorno global... Detecto una eficiencia del 94.2% en el UNS. Selecciona un activo específico para un diagnóstico TPT profundo.`;
        
        let report = `Análisis TPT para ${nodeName}: `;
        if (nodeData.Pressure && nodeData.Pressure.value > 15) {
            report += `⚠️ Alerta de Sobrepresión detectada (${nodeData.Pressure.value} ${nodeData.Pressure.unit}). Se recomienda reducir apertura de válvula un 15% para evitar cavitación.`;
        } else {
            report += `Estado Nominal. Telemetría estable. El Digital Twin no reporta anomalías predictivas para las próximas 48h.`;
        }
        return report;
    }

    if (normalized.includes('script') || q.includes('plc') || normalized.includes('codigo')) {
        const scriptTarget = activeTargets[0] || { name: 'Activo' };
        const blockName = (scriptTarget.name || 'Activo').replace(/\s+/g, '_');
        return `Generando Bloque de Función SCL para ${scriptTarget.name}:
        
FUNCTION_BLOCK "Control_${blockName}"
VAR_INPUT
    Setpoint : REAL;
    Feedback : REAL;
END_VAR
BEGIN
    // PID Control Loop generated by SUPCON TPT
    IF Feedback > Setpoint THEN
        Actuator := Actuator - 0.5;
    END_IF;
END_FUNCTION_BLOCK`;
    }

    if (q.includes('quien eres') || q.includes('quién eres')) {
        return `Soy el Copiloto TPT (Instancia Local Chile v2.4). He sido desplegado por el equipo de software regional de SUPCON Chile para analizar tu planta en tiempo real manteniendo la soberanía total de tus datos.`;
    }

    return `Entendido. Estoy procesando tu solicitud sobre "${query}". Como Copiloto TPT de SUPCON Chile, puedo generar dashboards industriales, reportes de TCO o scripts de control regionalmente. ¿Qué quieres ver ahora?`;
}

function generateDynamicUI(type) {
    const detailContent = document.getElementById('detail-content');
    const detailTitle = document.getElementById('detail-title');
    
    // Pulse effect during synthesis
    detailContent.innerHTML = `<div class="synthesizing"><div class="spinner"></div><p>TPT Sintetizando Interfaz...</p></div>`;
    
    setTimeout(() => {
        if (type === 'dashboard') {
            const targets = selectedNodes.length ? selectedNodes : (selectedNode ? [{ name: selectedNode.name, data: selectedNode.data, industry: currentIndustry }] : []);
            if (targets.length > 1) {
                detailTitle.innerText = `Dashboard Comparado (${targets.length} activos)`;
                const totalTags = targets.reduce((acc, node) => acc + extractTagsFromNode(node.data).length, 0);
                const industries = [...new Set(targets.map(t => INDUSTRY_LABELS[t.industry] || t.industry))];
                const cardsHtml = targets.map(renderSelectedCard).join('');
                detailContent.innerHTML = `
                    <div class="dynamic-dashboard">
                        <div class="widget"><h4>Activos Monitoreados</h4><div class="big-value">${targets.length}</div><div class="trend up">${industries.length} industrias</div></div>
                        <div class="widget"><h4>Tags Auditados</h4><div class="big-value">${totalTags}</div><div class="trend up">Fuente Big Data</div></div>
                        <div class="widget"><h4>Alertas Pendientes</h4><div class="big-value">${anomalyEngine.unreadCount || 0}</div></div>
                        <div class="widget full"><h4>Resumen por Activo</h4><div class="selected-summary-grid">${cardsHtml}</div></div>
                    </div>
                `;
            } else {
                const focusName = targets.length ? targets[0].name : 'Industrial Overview';
                detailTitle.innerText = `Dashboard Generado: ${focusName}`;
                detailContent.innerHTML = `
                    <div class="dynamic-dashboard">
                        <div class="widget"><h4>OEE Automático</h4><div class="big-value">94.2%</div><div class="trend up">↑ 0.5%</div></div>
                        <div class="widget"><h4>Presión Media</h4><div class="big-value">12.4 bar</div></div>
                        <div class="widget"><h4>Salud del Activo</h4><div class="ioi-bar"><div class="fill" style="width: 85%;"></div></div><span>Excelente</span></div>
                        <div class="widget full"><h4>Tendencia TPT (Real-time)</h4><div class="mock-chart"></div></div>
                    </div>
                `;
            }
        } else if (type === 'trends') {
            detailTitle.innerText = `Análisis de Tendencias TPT`;
            detailContent.innerHTML = `
                <div class="dynamic-trends">
                    <div class="trend-box">
                        <h5>Correlación Presión vs Temperatura</h5>
                        <div class="trend-viz"></div>
                    </div>
                    <p class="small">El modelo TPT detecta una desviación del 4% en el trim de la válvula durante picos de caudal. Recomendación: Mantenimiento preventivo en 15 días.</p>
                </div>
            `;
        } else if (type === 'tco') {
            detailTitle.innerText = `Reporte de Valor: SUPCON vs Emerson/Fisher`;
            detailContent.innerHTML = `
                <div class="dynamic-tco-report">
                    <div class="tco-comparison">
                        <div class="comp-col">
                            <h5>Legacy (Fisher)</h5>
                            <div class="bar-legacy" style="height: 100px;"></div>
                            <span>USD 145K/año</span>
                        </div>
                        <div class="comp-col">
                            <h5>SUPCON (TPT Native)</h5>
                            <div class="bar-supcon" style="height: 60px;"></div>
                            <span>USD 98K/año</span>
                        </div>
                    </div>
                    <div class="highlight-box">
                        <strong>Ahorro Estimado: 32%</strong>
                        <p>Principal factor: Reducción de 72h en paradas no programadas gracias a mantenimiento predictivo.</p>
                    </div>
                </div>
            `;
        }
    }, 1000);
}

function startLiveDataLoop() {
    setInterval(() => {
        Object.keys(industryData).forEach(industryKey => {
            iterateIndustryTags(industryKey, ({ meta, tagObj }) => {
                const nextValue = generateNextValue(tagObj.value, meta);
                tagObj.value = nextValue;
                recordMeasurement(meta, nextValue);
            });
        });

        if (selectedNode && selectedNode.data) {
            renderDetails(selectedNode.data);
        }

        const mobileVal = document.getElementById('mobile-val');
        if (mobileVal && selectedNode && selectedNode.data) {
            const singleTag = Object.values(selectedNode.data).find(t => t.unit && typeof t.value === 'number');
            if (singleTag) {
                mobileVal.innerText = `${singleTag.value.toFixed(1)}${singleTag.unit}`;
            }
        }

        if (selectedNodes.length) {
            renderSelectedAssets();
        }
    }, 2000);
}

function iterateIndustryTags(industryKey, callback) {
    const source = industryData[industryKey];
    if (!source || !source.uns) return;

    const walk = (node, chain = []) => {
        Object.keys(node || {}).forEach(key => {
            const value = node[key];
            if (!value) return;
            if (typeof value === 'object' && value.unit) {
                const path = [...chain, key];
                const meta = ensureTagMeta(industryKey, path, value);
                callback({ meta, tagObj: value });
            } else if (typeof value === 'object') {
                walk(value, [...chain, key]);
            }
        });
    };

    walk(source.uns, []);
}

function ensureTagMeta(industryKey, path, tagObj) {
    const metaKey = `${industryKey}|${path.join('>')}`;
    if (!anomalyEngine.meta[metaKey]) {
        const tagName = path[path.length - 1];
        const asset = path.length >= 2 ? path[path.length - 2] : tagName;
        const numericValue = typeof tagObj.value === 'number' ? tagObj.value : parseFloat(tagObj.value) || 0;
        anomalyEngine.meta[metaKey] = {
            key: metaKey,
            industry: industryKey,
            tag: tagName,
            asset,
            unit: tagObj.unit || '',
            pathLabel: path.join(' > '),
            path: [...path],
            baseline: numericValue,
            rocAbsoluteThreshold: Math.max(Math.abs(numericValue) * 0.08, 0.25),
            lastAlertAt: 0,
            lastSeverity: null
        };
    }
    return anomalyEngine.meta[metaKey];
}

function generateNextValue(currentValue, meta) {
    const numericCurrent = typeof currentValue === 'number' ? currentValue : parseFloat(currentValue) || 0;
    const baseline = meta.baseline || numericCurrent || 1;
    const amplitude = Math.max(Math.abs(baseline) * 0.05, 0.1);
    const randomDrift = (Math.random() - 0.5) * amplitude;
    const meanReversion = (baseline - numericCurrent) * 0.05;
    let next = numericCurrent + randomDrift + meanReversion;

    if (Math.random() < 0.04) {
        next += (Math.random() - 0.5) * amplitude * 6;
    }

    return parseFloat(next.toFixed(2));
}

function recordMeasurement(meta, value) {
    if (typeof value !== 'number' || !isFinite(value)) return;

    const windowSize = Math.max(6, Math.round(anomalyConfig.window || DEFAULT_ANOMALY_CONFIG.window));
    const zThreshold = Math.max(1, parseFloat(anomalyConfig.zScore) || DEFAULT_ANOMALY_CONFIG.zScore);
    const rocThreshold = Math.max(0.02, anomalyConfig.rocThreshold || DEFAULT_ANOMALY_CONFIG.rocThreshold);

    const buffer = anomalyEngine.buffers[meta.key] || (anomalyEngine.buffers[meta.key] = []);
    buffer.push(value);
    while (buffer.length > windowSize) buffer.shift();

    meta.baseline = meta.baseline ? (meta.baseline * 0.98 + value * 0.02) : value;

    const alerts = [];

    if (buffer.length >= 5) {
        const mean = buffer.reduce((sum, v) => sum + v, 0) / buffer.length;
        const variance = buffer.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / buffer.length;
        const stdDev = Math.sqrt(variance) || 0;
        const zScore = stdDev === 0 ? 0 : (value - mean) / stdDev;
        if (Math.abs(zScore) >= zThreshold) {
            alerts.push({
                type: 'Z-Score dinámico',
                label: `Δ${zScore.toFixed(1)}σ`,
                detail: `Ventana ${windowSize} muestras`,
                severity: Math.abs(zScore) >= (zThreshold + 1) ? 'critical' : 'warning'
            });
        }
    }

    if (buffer.length >= 2) {
        const prev = buffer[buffer.length - 2];
        const delta = value - prev;
        const baseline = Math.max(Math.abs(prev), Math.abs(meta.baseline), 1);
        const ratio = Math.abs(delta) / baseline;
        if (ratio >= rocThreshold || Math.abs(delta) > meta.rocAbsoluteThreshold) {
            alerts.push({
                type: 'Rate-of-Change',
                label: `${(ratio * 100).toFixed(0)}% / ciclo`,
                detail: `Δ ${delta.toFixed(2)} ${meta.unit || ''}`,
                severity: ratio >= rocThreshold * 1.5 ? 'critical' : 'warning'
            });
        }
    }

    const bounds = getProcessBounds(meta, value);
    if (bounds && (value < bounds.min || value > bounds.max)) {
        alerts.push({
            type: 'Límites de Proceso',
            label: value > bounds.max ? 'Fuera de rango (alto)' : 'Fuera de rango (bajo)',
            detail: `Esperado ${bounds.min.toFixed(1)} - ${bounds.max.toFixed(1)} ${meta.unit || ''}`,
            severity: 'critical'
        });
    }

    if (!alerts.length) return;

    const severity = alerts.some(a => a.severity === 'critical') ? 'critical' : 'warning';
    const now = Date.now();
    if (meta.lastAlertAt && now - meta.lastAlertAt < 4000 && meta.lastSeverity === severity) {
        return;
    }

    meta.lastAlertAt = now;
    meta.lastSeverity = severity;

    const event = {
        id: `${meta.key}-${now}`,
        timestamp: now,
        industry: meta.industry,
        asset: meta.asset,
        tag: meta.tag,
        unit: meta.unit,
        value,
        pathLabel: meta.pathLabel,
        alerts,
        severity
    };

    anomalyEngine.history.unshift(event);
    if (anomalyEngine.history.length > ANOMALY_HISTORY_LIMIT) {
        anomalyEngine.history.pop();
    }

    anomalyEngine.listeners.forEach(listener => listener(event));
}

function openMobileSimulation() {
    document.getElementById('mobile-modal').style.display = 'flex';
}

function closeMobileSimulation() {
    document.getElementById('mobile-modal').style.display = 'none';
}

// --- Reference Data Integration ---
function updateDataInspector(node) {
    const inspectorEl = document.getElementById('db-inspector');
    if (!inspectorEl) return;

    const industryData = getRefData();
    if (!industryData) {
        inspectorEl.innerHTML = `<span class="muted">Sin datos de referencia para este sector.</span>`;
        return;
    }

    // Find failures for the selected asset name (partial match for flexibility)
    const nodeName = node ? node.name : '';
    const failures = (industryData.failureHistory || []).filter(f =>
        f.asset && nodeName && f.asset.toLowerCase().includes(nodeName.toLowerCase().substring(0, 6))
    );
    const tagCount = (industryData.standardTags || []).length;

    let html = `<h6 style="margin:0 0 6px;">Referencia: ${industryData.customer}</h6>`;
    html += `<p class="muted" style="font-size:0.75rem;margin-bottom:10px;">⚙️ ${tagCount} puntos de telemetría auditados (2009-2026)</p>`;

    if (failures.length > 0) {
        html += `<div class="ref-scroll-container">`;
        html += `<table class="ref-table">
                    <thead><tr><th>Fecha</th><th>Incidente</th><th>Downtime</th><th>Costo</th></tr></thead>
                    <tbody>`;
        failures.slice(0, 15).forEach(f => {
            html += `<tr>
                        <td>${f.date || '-'}</td>
                        <td>${f.issue || f.description || '-'}</td>
                        <td>${f.downtime || '-'}</td>
                        <td class="text-danger">${f.costImpact || f.cost || 'N/A'}</td>
                     </tr>`;
        });
        html += `</tbody></table></div>`;
    } else {
        html += `<p class="muted" style="font-size:0.8rem">Selecciona un activo del árbol UNS para ver su historial de fallas (2009-2026).</p>`;
        // Show a sample from the dataset anyway
        const sample = (industryData.standardTags || []).slice(0, 5);
        if (sample.length > 0) {
            html += `<div class="ref-scroll-container"><table class="ref-table"><thead><tr><th>Tag</th><th>Activo</th><th>Valor</th><th>Estado</th></tr></thead><tbody>`;
            sample.forEach(t => {
                const statusColor = t.status === 'Crítico' ? '#f85149' : t.status === 'Alerta' ? '#e3b341' : '#3FB950';
                html += `<tr><td>${t.tag}</td><td>${t.asset}</td><td>${t.value} ${t.unit}</td><td style="color:${statusColor}">${t.status}</td></tr>`;
            });
            html += `</tbody></table></div>`;
        }
    }

    if (industryData.tcoBenchmark) {
        const tco = industryData.tcoBenchmark;
        html += `<div class="tco-mini-badge" style="margin-top:12px;">
            Benchmark ${tco.legacyBrand}: $${(tco.maintenanceCostYear||0).toLocaleString()}/año
            <strong style="color:#3FB950;"> → Ahorro SUPCON: ${tco.supconSavingPercent}%</strong>
        </div>`;
    }

    inspectorEl.innerHTML = html;
}

function downloadReferenceCSV() {
    const data = getRefData();
    if (!data) { alert('Sin datos de referencia para este sector.'); return; }

    let csv = "Category,Asset,Tag,Value,Unit,Status,Historical_Reference\n";
    (data.standardTags || []).forEach(t => {
        csv += `"${t.category||''}","${t.asset||''}","${t.tag||''}",${t.value||0},"${t.unit||''}","${t.status||''}","${data.customer}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `SUPCON_BigData_${currentIndustry}_2009_2026.csv`);
    a.click();

    const tagCount = (data.standardTags || []).length;
    appendMessage('system', `[Exportación] BIG DATA Industrial de ${data.customer} (2009-2026) generado. ${tagCount} registros auditados.`);
}

function registerAnomalyListener(listener) {
    anomalyEngine.listeners.push(listener);
}

function markAnomalyUnread() {
    if (activeDetailTab === 'anomalies') {
        anomalyEngine.unreadCount = 0;
        updateAnomalyBadge();
        return;
    }
    anomalyEngine.unreadCount = (anomalyEngine.unreadCount || 0) + 1;
    updateAnomalyBadge();
}

function updateAnomalyBadge() {
    const badge = document.getElementById('anomaly-unread');
    if (!badge) return;
    const count = anomalyEngine.unreadCount || 0;
    if (activeDetailTab === 'anomalies' || count === 0) {
        badge.style.display = 'none';
    } else {
        badge.style.display = 'inline-block';
        badge.innerText = count > 99 ? '99+' : count;
    }
}

function renderAnomalyMonitor() {
    const feed = document.getElementById('anomaly-feed');
    const pill = document.getElementById('anomaly-health-pill');
    if (!feed || !pill) return;

    if (!anomalyEngine.history.length) {
        feed.innerHTML = '<p class="muted">Sin alertas activas. El motor TPT está monitoreando cuatro sectores en paralelo.</p>';
        pill.className = 'anomaly-pill healthy';
        pill.innerText = 'Estable';
        return;
    }

    const latestEvents = anomalyEngine.history.slice(0, 5).map(event => {
        const icon = event.severity === 'critical' ? '🔴' : '🟡';
        const time = new Date(event.timestamp).toLocaleTimeString('es-CL', { hour12: false });
        const industryLabel = INDUSTRY_LABELS[event.industry] || event.industry;
        const signal = event.alerts.map(a => a.label || a.type).join(' + ');
        const referenceLine = event.referenceMatch ? `<span class="ref">Ref: ${event.referenceMatch.asset} (${event.referenceMatch.date})</span>` : '';
        return `<div class="anomaly-item ${event.severity}"><strong>${icon} ${time} · ${industryLabel}</strong><span>${event.asset} / ${event.tag} → ${signal}</span>${referenceLine}</div>`;
    }).join('');

    feed.innerHTML = latestEvents;

    const latest = anomalyEngine.history[0];
    pill.className = `anomaly-pill ${latest.severity === 'critical' ? 'critical' : 'warning'}`;
    pill.innerText = latest.severity === 'critical' ? 'Crítica' : 'Vigilando';

    updateAnomalyBadge();
}

function handleAnomalyConfigInput(field, rawValue) {
    if (rawValue === null || rawValue === undefined) return;
    let value = parseFloat(rawValue);
    if (Number.isNaN(value)) {
        syncAnomalyConfigControls();
        return;
    }

    switch (field) {
        case 'zScore':
            value = Math.max(1, Math.min(6, value));
            anomalyConfig.zScore = parseFloat(value.toFixed(1));
            break;
        case 'rocThreshold':
            value = Math.max(5, Math.min(120, value));
            anomalyConfig.rocThreshold = value / 100;
            break;
        case 'window':
            value = Math.round(Math.max(6, Math.min(80, value)));
            anomalyConfig.window = value;
            applyAnomalyWindowConfig();
            break;
        default:
            break;
    }

    syncAnomalyConfigControls();
    renderAnomalyMonitor();
}

function syncAnomalyConfigControls() {
    const zInput = document.getElementById('anomaly-config-z');
    if (zInput) zInput.value = (anomalyConfig.zScore || DEFAULT_ANOMALY_CONFIG.zScore).toFixed(1);

    const rocInput = document.getElementById('anomaly-config-roc');
    if (rocInput) rocInput.value = Math.round((anomalyConfig.rocThreshold || DEFAULT_ANOMALY_CONFIG.rocThreshold) * 100);

    const windowInput = document.getElementById('anomaly-config-window');
    if (windowInput) windowInput.value = anomalyConfig.window || DEFAULT_ANOMALY_CONFIG.window;
}

function applyAnomalyWindowConfig() {
    const windowSize = Math.max(6, Math.round(anomalyConfig.window || DEFAULT_ANOMALY_CONFIG.window));
    Object.keys(anomalyEngine.buffers).forEach(key => {
        const buffer = anomalyEngine.buffers[key];
        if (!Array.isArray(buffer)) return;
        while (buffer.length > windowSize) buffer.shift();
    });
}

function primeIndustry(industryKey) {
    const source = industryData[industryKey];
    if (!source || !source.uns) return;
    iterateIndustryTags(industryKey, ({ meta, tagObj }) => {
        const numeric = typeof tagObj.value === 'number' ? tagObj.value : parseFloat(tagObj.value);
        if (!Number.isFinite(numeric)) return;
        anomalyEngine.buffers[meta.key] = [numeric];
    });
}

function primeAnomalyEngine() {
    Object.keys(industryData).forEach(primeIndustry);
}

function triggerAnomalyTest() {
    const industries = Object.keys(industryData);
    if (!industries.length) {
        alert('Sin sectores industriales cargados para la prueba.');
        return;
    }

    const industryKey = industries[Math.floor(Math.random() * industries.length)];
    const source = industryData[industryKey];
    if (!source || !source.uns) {
        alert('El sector seleccionado no tiene datos para simular.');
        return;
    }

    const candidates = [];
    (function collect(node, path) {
        Object.keys(node || {}).forEach(key => {
            const value = node[key];
            if (!value) return;
            if (typeof value === 'object' && value.unit) {
                candidates.push({ path: [...path, key], tagObj: value });
            } else if (typeof value === 'object') {
                collect(value, [...path, key]);
            }
        });
    })(source.uns, []);

    if (!candidates.length) {
        appendMessage('system', 'No se encontraron tags para generar una prueba.');
        return;
    }

    const target = candidates[Math.floor(Math.random() * candidates.length)];
    const meta = ensureTagMeta(industryKey, target.path, target.tagObj);
    meta.lastAlertAt = 0;
    meta.lastSeverity = null;

    const bounds = getProcessBounds(meta, target.tagObj.value);
    let forcedValue;
    if (bounds) {
        const span = Math.max(1, Math.abs(bounds.max - bounds.min));
        if (Math.random() < 0.5) {
            forcedValue = bounds.max + span * (0.5 + Math.random());
        } else {
            forcedValue = bounds.min - span * (0.5 + Math.random());
        }
    } else {
        const baseline = meta.baseline || parseFloat(target.tagObj.value) || 1;
        forcedValue = baseline * (1.5 + Math.random());
    }

    forcedValue = parseFloat(forcedValue.toFixed(2));
    target.tagObj.value = forcedValue;
    recordMeasurement(meta, forcedValue);

    if (selectedNode && selectedNode.name === meta.asset) {
        renderDetails(selectedNode.data);
    }

    const label = INDUSTRY_LABELS[industryKey] || industryKey;
    appendMessage('system', `Prueba generada: ${label} | ${meta.asset}/${meta.tag} forzó ${forcedValue}${meta.unit || ''}.`);
}

function respondToAnomaly(event) {
    const reference = pullFailureReference(event.industry);
    event.referenceMatch = reference;
    markAnomalyUnread();
}

function describeAnomalies() {
    if (!anomalyEngine.history.length) {
        return 'Motor TPT: sin anomalías registradas en las últimas ventanas de análisis.';
    }
    const summary = anomalyEngine.history.slice(0, 6).map(event => {
        const time = new Date(event.timestamp).toLocaleTimeString('es-CL', { hour12: false });
        const industryLabel = INDUSTRY_LABELS[event.industry] || event.industry;
        const signal = event.alerts.map(a => a.label || a.type).join(' + ');
        return `• ${time} | ${industryLabel} | ${event.asset}/${event.tag} → ${signal}`;
    }).join('\n');
    return `Resumen de anomalías activas (${anomalyEngine.history.length} eventos):\n${summary}`;
}

function pullFailureReference(industry) {
    const refData = getRefData(industry);
    if (!refData || !refData.failureHistory || !refData.failureHistory.length) return null;
    const refKey = resolveReferenceKey(industry);
    const cursor = anomalyEngine.failureCursor[refKey] || 0;
    const failure = refData.failureHistory[cursor % refData.failureHistory.length];
    anomalyEngine.failureCursor[refKey] = (cursor + 1) % refData.failureHistory.length;
    return failure;
}

function getProcessBounds(meta, fallback) {
    const limits = PROCESS_LIMITS[meta.industry] || PROCESS_LIMITS[resolveReferenceKey(meta.industry)];
    if (!limits) return null;
    if (meta.unit && limits.units && limits.units[meta.unit]) {
        return limits.units[meta.unit];
    }
    if (limits.global) return limits.global;
    if (typeof fallback === 'number' && isFinite(fallback)) {
        const span = Math.max(Math.abs(fallback) * 0.4, 1);
        return { min: fallback - span, max: fallback + span };
    }
    return null;
}

function buildProcessLimits() {
    if (typeof REFERENCE_DATA === 'undefined') return {};
    const limits = {};
    const industries = new Set([...Object.keys(INDUSTRY_REFERENCE_MAP), ...Object.keys(REFERENCE_DATA)]);

    industries.forEach(industry => {
        const refKey = resolveReferenceKey(industry);
        const refData = REFERENCE_DATA[refKey];
        if (!refData || !refData.standardTags) return;

        const byUnit = {};
        refData.standardTags.forEach(tag => {
            if (!byUnit[tag.unit]) byUnit[tag.unit] = [];
            byUnit[tag.unit].push(tag.value);
        });

        const unitLimits = {};
        Object.keys(byUnit).forEach(unit => {
            const values = byUnit[unit];
            if (!values.length) return;
            const min = Math.min(...values);
            const max = Math.max(...values);
            const padding = (max - min) * 0.2 || Math.max(Math.abs(max), 1) * 0.2;
            unitLimits[unit] = { min: min - padding, max: max + padding };
        });

        const allValues = Object.values(byUnit).reduce((acc, arr) => acc.concat(arr), []);
        let global = null;
        if (allValues.length) {
            const min = Math.min(...allValues);
            const max = Math.max(...allValues);
            const padding = (max - min) * 0.2 || Math.max(Math.abs(max), 1) * 0.2;
            global = { min: min - padding, max: max + padding };
        }

        limits[industry] = { units: unitLimits, global };
    });

    return limits;
}

function resolveReferenceKey(industry) {
    return INDUSTRY_REFERENCE_MAP[industry] || industry;
}

function getRefData(industry = currentIndustry) {
    if (typeof REFERENCE_DATA === 'undefined') return null;
    const refKey = resolveReferenceKey(industry);
    return REFERENCE_DATA[refKey] || null;
}

function resetIndustryAnomalyState(industry) {
    Object.keys(anomalyEngine.meta).forEach(key => {
        if (key.startsWith(`${industry}|`)) {
            delete anomalyEngine.meta[key];
            delete anomalyEngine.buffers[key];
        }
    });
    anomalyEngine.history = anomalyEngine.history.filter(event => event.industry !== industry);
    primeIndustry(industry);
    renderAnomalyMonitor();
}

function normalizeText(text) {
    if (!text || typeof text !== 'string') return '';
    if (typeof text.normalize !== 'function') return text;
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function setDetailTab(tab) {
    const tabs = ['telemetry', 'anomalies'];
    tabs.forEach(name => {
        const panel = document.getElementById(`detail-tab-${name}`);
        const button = document.getElementById(`detail-tab-btn-${name}`);
        const isActive = name === tab;
        if (panel) panel.classList.toggle('active', isActive);
        if (button) button.classList.toggle('active', isActive);
    });
    activeDetailTab = tab;
    if (tab === 'anomalies') {
        anomalyEngine.unreadCount = 0;
    }
    updateAnomalyBadge();
}

function nodeContainsTags(node) {
    if (!node || typeof node !== 'object' || node.unit) return false;
    return Object.values(node).some(value => value && typeof value === 'object' && !!value.unit);
}

function makeSelectionId(industry, path) {
    return `${industry}:${path}`;
}

function toggleAssetSelection(pathKey, name, data, industry) {
    const id = makeSelectionId(industry, pathKey);
    const existing = selectedNodes.findIndex(item => item.id === id);
    if (existing >= 0) {
        selectedNodes.splice(existing, 1);
    } else {
        selectedNodes.push({ id, path: pathKey, name, data, industry });
    }
    renderSelectedAssets();
    syncTreeSelectionState();
}

function removeSelectedAsset(id) {
    selectedNodes = selectedNodes.filter(node => node.id !== id);
    renderSelectedAssets();
    syncTreeSelectionState();
}

function clearSelectedAssets() {
    selectedNodes = [];
    renderSelectedAssets();
    syncTreeSelectionState();
}

function renderSelectedAssets() {
    const panel = document.getElementById('selected-assets-panel');
    if (!panel) return;
    if (!selectedNodes.length) {
        panel.style.display = 'none';
        return;
    }
    panel.style.display = 'block';
    const chips = document.getElementById('selected-assets-chips');
    const summary = document.getElementById('selected-assets-summary');
    const chipsHtml = selectedNodes.map(node => {
        const industryLabel = INDUSTRY_LABELS[node.industry] || node.industry;
        return `<span class="asset-chip">${industryLabel} · ${node.name}<button onclick="removeSelectedAsset('${node.id}')">×</button></span>`;
    }).join('');
    chips.innerHTML = chipsHtml;

    const cardsHtml = selectedNodes.map(renderSelectedCard).join('');
    summary.innerHTML = cardsHtml;
}

function renderSelectedCard(node) {
    const industryLabel = INDUSTRY_LABELS[node.industry] || node.industry;
    const tags = extractTagsFromNode(node.data).slice(0, 4);
    const rows = tags.length ? tags.map(tag => `<div class="tag-row"><span>${tag.tag}</span><span>${formatTagValue(tag.value, tag.unit)}</span></div>`).join('') : '<p class="muted">Sin métricas disponibles.</p>';
    return `<div class="selected-card"><h6>${node.name}</h6><div class="meta">${industryLabel}</div>${rows}</div>`;
}

function extractTagsFromNode(node, prefix = '') {
    const tags = [];
    if (!node || typeof node !== 'object') return tags;
    Object.keys(node).forEach(key => {
        const value = node[key];
        if (!value) return;
        if (value.unit) {
            tags.push({ tag: prefix ? `${prefix} · ${key}` : key, value: value.value, unit: value.unit });
        } else if (typeof value === 'object') {
            tags.push(...extractTagsFromNode(value, prefix ? `${prefix}/${key}` : key));
        }
    });
    return tags;
}

function formatTagValue(value, unit) {
    if (value === undefined || value === null) return '-';
    return `${value}${unit ? ` ${unit}` : ''}`;
}

function syncTreeSelectionState() {
    const pins = new Set(selectedNodes.map(node => node.id));
    document.querySelectorAll('.tree-node-header').forEach(header => {
        const path = header.dataset.path;
        const industry = header.dataset.industry;
        if (!path || !industry) return;
        const id = makeSelectionId(industry, path);
        header.classList.toggle('pinned', pins.has(id));
    });
    document.querySelectorAll('.node-pin').forEach(btn => {
        const path = btn.dataset.path;
        const industry = btn.dataset.industry;
        const id = makeSelectionId(industry, path);
        const pinned = pins.has(id);
        btn.textContent = pinned ? '−' : '＋';
        btn.classList.toggle('pinned', pinned);
        btn.setAttribute('title', pinned ? 'Quitar del comparador' : 'Agregar al comparador');
    });
}

function augmentAllIndustriesWithReference() {
    Object.keys(industryData || {}).forEach(augmentIndustryWithReference);
}

function augmentIndustryWithReference(industryKey) {
    const industry = industryData[industryKey];
    if (!industry || !industry.uns) return;
    if (industry.uns.BigData_Reference) return;

    const refData = getRefData(industryKey);
    if (!refData || !Array.isArray(refData.standardTags) || !refData.standardTags.length) return;

    const referenceBranch = industry.uns['BigData_Reference'] = {};
    const customerLabel = refData.customer || 'Referencia Industrial';
    const customerNode = referenceBranch[customerLabel] = {};
    const grouped = groupTagsByAsset(refData.standardTags);
    const assets = Object.keys(grouped).slice(0, 6);

    assets.forEach(assetName => {
        customerNode[assetName] = grouped[assetName];
    });
}

function groupTagsByAsset(tags) {
    const grouped = {};
    tags.forEach(tag => {
        const asset = tag.asset || 'Activo';
        if (!grouped[asset]) grouped[asset] = {};
        const tagName = uniqueTagName(grouped[asset], tag.tag || 'Tag');
        grouped[asset][tagName] = { value: tag.value, unit: tag.unit };
    });
    return grouped;
}

function uniqueTagName(container, baseName) {
    let name = baseName;
    let counter = 2;
    while (container[name]) {
        name = `${baseName} #${counter++}`;
    }
    return name;
}

window.addEventListener('load', () => {
    initData();
    primeAnomalyEngine();
    initMQTT();
    syncAnomalyConfigControls();
    setDetailTab('telemetry');
    renderAnomalyMonitor();
    renderSelectedAssets();
    registerAnomalyListener(event => {
        respondToAnomaly(event);
        renderAnomalyMonitor();
    });
    startLiveDataLoop();
});
