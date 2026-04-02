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
        statusText.innerText = 'Connected (Live)';
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
        statusText.innerText = 'Conn. Error';
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
    btn.innerText = '🗺️ Mapping Industrial Network...';
    btn.disabled = true;
    setTimeout(() => {
        btn.innerText = '✅ Map Complete';
        alert(`Tier Cero Dashboard ha mapeado automáticamente el UNS por Sparkplug B.`);
        btn.disabled = false;
        setTimeout(() => btn.innerText = '🔍 Scan Network (MQTT)', 3000);
    }, 2500);
}

function triggerGenAI() {
    const input = document.getElementById('genai-input').value;
    if (!input) return;
    alert(`Tier Cero GenAI Engine: Procesando "${input}"...\nCreando dashboard dinámico.`);
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

window.addEventListener('load', () => {
    initData();
    initMQTT();
});
