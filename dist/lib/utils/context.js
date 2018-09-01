export function getContext(canvas) {
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl == null) {
        throw Error('Webgl context cannot be initialized');
    }
    return gl;
}
export function makeClear(gl, ...clearArray) {
    return clearArray.reduce((res, item) => res | gl[item.toUpperCase() + '_BUFFER_BIT'], 0);
}
export function setBlendFunc(gl, blendOpts) {
    gl.blendFunc.apply(gl, blendOpts.map(opt => gl[opt.toUpperCase()]));
}
/**
 * @param {HTMLCanvasElement} canvas The canvas to resize.
 * @param {number} [multiplier] optional `window.devicePixelRatio`.
 * @return {boolean} true if the canvas was resized.
 */
export function resizeCanvas(canvas, multiplier = 1) {
    multiplier = Math.max(1, multiplier);
    const width = canvas.clientWidth * multiplier | 0;
    const height = canvas.clientHeight * multiplier | 0;
    if (canvas.width !== width
        || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
    }
    return false;
}
//# sourceMappingURL=context.js.map