function showModule(moduleId) {
    // Hide all modules
    const modules = document.querySelectorAll('.module');
    modules.forEach(m => m.classList.remove('active'));

    // Show selected module
    const target = document.getElementById(`module-${moduleId}`);
    if (target) {
        target.classList.add('active');
    }

    // Update Nav
    const navButtons = document.querySelectorAll('.side-nav button');
    navButtons.forEach(btn => btn.classList.remove('active'));

    // Find the button that corresponds to the module
    const activeBtn = Array.from(navButtons).find(btn => {
        const onclickAttr = btn.getAttribute('onclick');
        return onclickAttr && onclickAttr.includes(`'${moduleId}'`);
    });
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// Simple Accordion Toggle for Playbook
document.querySelectorAll('.accordion-item h3').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const content = item.querySelector('.content');
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
    });
});

// Initial Setup
window.addEventListener('load', () => {
    // Default hiding accordion content
    document.querySelectorAll('.accordion-item .content').forEach(c => {
        if (c) c.style.display = 'none';
    });
});

// Mercado e Inflación (Data Base 2009)
const IPC_FACTOR_2009_2026 = 1.985; // ~98.5% de inflación acumulada
const MKT_2009_EMERSON = 5200000; // USD 5.2M en 2009

const marketProjections = [
    { year: 2026, label: "Arranque I4.0", trend: "UCS & Software-Defined", target: "USD 12M" },
    { year: 2030, label: "Liderazgo Global", trend: "AI-Native & H2V", target: "USD 25M" },
    { year: 2040, label: "Autonomía Total", trend: "Autonomous Plant & Net-Zero", target: "USD 50M+" }
];

function calculateInflationAdjustment() {
    const value2009 = parseFloat(document.getElementById('ipc-input-2009').value) || 0;
    const adjusted = value2009 * IPC_FACTOR_2009_2026;
    document.getElementById('ipc-result-2026').innerText = `USD ${Math.round(adjusted).toLocaleString()}`;
}

function calculateTCO() {
    const qty = parseFloat(document.getElementById('tco-qty').value) || 0;
    const compPrice = parseFloat(document.getElementById('tco-comp-price').value) || 0;
    const downtimeCost = 15000; // USD/hora promedio en minería chilena
    
    // SUPCON es 35% más barato en repuestos
    const supconPrice = compPrice * 0.65;
    const annualFailRateComp = 1.0; 
    const annualFailRateSupcon = 0.6; // Reducción por diagnósticos predictivos
    
    // Tiempo de reparación (Horas)
    const mttrComp = 6; 
    const mttrSupcon = 5; // Reducción leve sin VAC (solo diagnósticos remotos)
    
    // Si VAC estuviera activo, mttrSupcon sería 2-3
    const isVACEnabled = false; // "Meta a corto plazo"

    // Costo Anual Competencia
    const opexComp = qty * compPrice * annualFailRateComp;
    const downtimeComp = qty * mttrComp * annualFailRateComp * downtimeCost * 0.1;
    
    // Costo Anual SUPCON
    const opexSupcon = qty * supconPrice * annualFailRateSupcon;
    const downtimeSupcon = qty * mttrSupcon * annualFailRateSupcon * downtimeCost * 0.1;
    
    const savingAnnual = (opexComp + downtimeComp) - (opexSupcon + downtimeSupcon);
    const saving5y = savingAnnual * 5;
    
    const investment = qty * (compPrice * 1.5);
    const roiMonths = (investment / savingAnnual) * 12;

    document.getElementById('save-5y').innerText = `USD ${Math.round(saving5y).toLocaleString()}`;
    document.getElementById('roi-months').innerText = `${Math.max(1, Math.round(roiMonths))} meses`;
}
