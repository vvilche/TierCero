(function bootstrapReference(globalScope) {
    const globalGenerator = globalScope && globalScope.generateBigData;
    let generator = globalGenerator;

    if (!generator && typeof require === 'function') {
        try {
            generator = require('./generate_big_data.js');
        } catch (err) {
            generator = null;
        }
    }

    const data = generator ? generator(false) : (globalScope && globalScope.__SUPCON_BIG_DATA__) || {};
    const REFERENCE_DATA = data;

    if (globalScope) {
        globalScope.REFERENCE_DATA = REFERENCE_DATA;
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = REFERENCE_DATA;
    }
})(typeof globalThis !== 'undefined' ? globalThis : window);
