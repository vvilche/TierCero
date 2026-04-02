// Tier 0 Core Engine - Real Demo (SUPCON Chile)
// Using MQTT.js for Real-Time Industrial Data Foundation

const brokerUrl = 'wss://broker.emqx.io:8084/mqtt';
const clientId = 'supcon_chile_demo_' + Math.random().toString(16).substring(2, 8);
const baseTopic = 'supcon/chile/uns/';

let client = null;
let currentIndustry = 'mining';
let selectedNode = null;

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

function initData() {
    const saved = localStorage.getItem('supcon_tier0_data');
    if (saved) {
        industryData = JSON.parse(saved);
    } else {
        industryData = JSON.parse(JSON.stringify(FACTORY_DATA));
    }
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
    buildTreeNodes(data, root);
}

function buildTreeNodes(obj, parentElement) {
    for (const key in obj) {
        const node = document.createElement('div');
        node.className = 'tree-node';
        const header = document.createElement('div');
        header.className = 'tree-node-header';
        const isLeaf = !Object.values(obj[key]).some(v => typeof v === 'object' && v !== null && !v.unit);
        header.innerHTML = `<span class="folder-icon">${isLeaf ? '📊' : '📁'}</span><span class="node-name">${key}</span>`;
        header.onclick = (e) => {
            e.stopPropagation();
            selectNode(key, obj[key], header);
            const children = node.querySelector('.tree-children');
            if (children) children.style.display = children.style.display === 'none' ? 'block' : 'none';
        };
        node.appendChild(header);
        if (!isLeaf) {
            const childrenContainer = document.createElement('div');
            childrenContainer.className = 'tree-children';
            buildTreeNodes(obj[key], childrenContainer);
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
    
    renderTree();
    if (selectedNode) renderDetails(selectedNode.data);
    closeSettings();
    alert('Configuración guardada. La demo ahora refleja tus cambios.');
}

function resetToFactorySettings() {
    if (confirm('¿Seguro que quieres borrar todos los cambios y volver a los datos originales de SUPCON?')) {
        industryData = JSON.parse(JSON.stringify(FACTORY_DATA));
        localStorage.removeItem('supcon_tier0_data');
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

function getAIResponse(query) {
    const q = query.toLowerCase();
    const nodeName = selectedNode ? selectedNode.name : "Desconocido";
    const nodeData = selectedNode ? selectedNode.data : null;

    if (q.includes('dashboard') || q.includes('tablero') || q.includes('vista')) {
        setTimeout(() => generateDynamicUI('dashboard'), 500);
        return `Comprendido. Sintetizando Dashboard Industrial para ${nodeName} basado en el UNS. Configurando widgets de telemetría y OEE dinámico...`;
    }

    if (q.includes('grafico') || q.includes('tendencia') || q.includes('trend')) {
        setTimeout(() => generateDynamicUI('trends'), 500);
        return `Generando análisis de tendencias para ${nodeName}. Correlacionando variables históricas con el modelo TPT...`;
    }

    if (q.includes('reporte') || q.includes('ahorro') || q.includes('tco')) {
        const tco = REFERENCE_DATA[currentIndustry].tcoBenchmark;
        setTimeout(() => generateDynamicUI('tco'), 500);
        return `Generando Reporte de Valor para ${currentIndustry.toUpperCase()}. Comparativa con ${tco.legacyBrand}: Ahorro proyectado del ${tco.supconSavingPercent}% en OPEX.`;
    }

    if (q.includes('analiza') || q.includes('status')) {
        if (!nodeData) return `Analizando entorno global... Detecto una eficiencia del 94.2% en el UNS. Selecciona un activo específico para un diagnóstico TPT profundo.`;
        
        let report = `Análisis TPT para ${nodeName}: `;
        if (nodeData.Pressure && nodeData.Pressure.value > 15) {
            report += `⚠️ Alerta de Sobrepresión detectada (${nodeData.Pressure.value} ${nodeData.Pressure.unit}). Se recomienda reducir apertura de válvula un 15% para evitar cavitación.`;
        } else {
            report += `Estado Nominal. Telemetría estable. El Digital Twin no reporta anomalías predictivas para las próximas 48h.`;
        }
        return report;
    }

    if (q.includes('script') || q.includes('plc') || q.includes('codigo')) {
        return `Generando Bloque de Función SCL para ${nodeName}:
        
FUNCTION_BLOCK "Control_${nodeName}"
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
            detailTitle.innerText = `Dashboard Generado: ${selectedNode ? selectedNode.name : "Industrial Overview"}`;
            detailContent.innerHTML = `
                <div class="dynamic-dashboard">
                    <div class="widget"><h4>OEE Automático</h4><div class="big-value">94.2%</div><div class="trend up">↑ 0.5%</div></div>
                    <div class="widget"><h4>Presión Media</h4><div class="big-value">12.4 bar</div></div>
                    <div class="widget"><h4>Salud del Activo</h4><div class="ioi-bar"><div class="fill" style="width: 85%;"></div></div><span>Excelente</span></div>
                    <div class="widget full"><h4>Tendencia TPT (Real-time)</h4><div class="mock-chart"></div></div>
                </div>
            `;
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

// Live simulation
setInterval(() => {
    if (!selectedNode || !selectedNode.data) return;
    for (const tag in selectedNode.data) {
        if (selectedNode.data[tag].unit) {
            const change = (Math.random() - 0.5) * 0.2;
            selectedNode.data[tag].value = parseFloat((selectedNode.data[tag].value + change).toFixed(2));
        }
    }
    renderDetails(selectedNode.data);
}, 2000);

// --- Reference Data Integration ---
function updateDataInspector(node) {
    const inspectorEl = document.getElementById('db-inspector');
    if (!node || !REFERENCE_DATA[currentIndustry]) return;

    const industryData = REFERENCE_DATA[currentIndustry];
    const assetRef = industryData.standardTags.find(t => t.asset === node.name);
    const failures = industryData.failureHistory.filter(f => f.asset === node.name);

    let html = `<h6>Referencia: ${industryData.customer}</h6>`;
    
    if (failures.length > 0) {
        html += `<ul class="ref-list">`;
        failures.forEach(f => {
            html += `<li><strong>${f.date}</strong>: ${f.issue} (${f.resolution}) - <span>Downtime: ${f.downtime}</span></li>`;
        });
        html += `</ul>`;
    } else {
        html += `<p class="muted">Sin fallas críticas en el historial de referencia para este activo.</p>`;
    }
    
    html += `<div class="tco-mini-badge">
        Benchmark ${industryData.tcoBenchmark.legacyBrand}: $${industryData.tcoBenchmark.maintenanceCostYear.toLocaleString()}/año 
        <strong style="color:#3FB950;">(Ahorro SUPCON: ${industryData.tcoBenchmark.supconSavingPercent}%)</strong>
    </div>`;

    inspectorEl.innerHTML = html;
}

function downloadReferenceCSV() {
    const data = REFERENCE_DATA[currentIndustry];
    let csv = "Category,Asset,Tag,Value,Unit,Status\n";
    data.standardTags.forEach(t => {
        csv += `${t.category},${t.asset},${t.tag},${t.value},${t.unit},${t.status}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `SUPCON_Reference_${currentIndustry}.csv`);
    a.click();
    
    appendMessage('system', `[Exportación] Dataset industrial de ${data.customer} generado y descargado exitosamente. Demostrando Soberanía de Datos.`);
}

window.addEventListener('load', () => {
    initData();
    initMQTT();
});
