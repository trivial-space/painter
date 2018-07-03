export function getContext(canvas) {
    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl == null) {
        throw Error('Webgl context cannot be initialized');
    }
    return gl;
}
export function makeClear(gl) {
    var clearArray = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        clearArray[_i - 1] = arguments[_i];
    }
    return clearArray.reduce(function (res, item) { return res | gl[item.toUpperCase() + '_BUFFER_BIT']; }, 0);
}
export function setBlendFunc(gl, blendOpts) {
    gl.blendFunc.apply(gl, blendOpts.map(function (opt) { return gl[opt.toUpperCase()]; }));
}
/**
 * @param {HTMLCanvasElement} canvas The canvas to resize.
 * @param {number} [multiplier] optional `window.devicePixelRatio`.
 * @return {boolean} true if the canvas was resized.
 */
export function resizeCanvas(canvas, multiplier) {
    if (multiplier === void 0) { multiplier = 1; }
    multiplier = Math.max(1, multiplier);
    var width = canvas.clientWidth * multiplier | 0;
    var height = canvas.clientHeight * multiplier | 0;
    if (canvas.width !== width
        || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
    }
    return false;
}
//# sourceMappingURL=context.js.map