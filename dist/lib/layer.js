import { setTextureParams, updateRenderTarget, destroyRenderTarget } from './render-utils';
export function createStatic(gl) {
    var layer = {};
    var texture = gl.createTexture();
    layer.textures = [texture],
        layer.data = {};
    layer.texture = function () { return texture; };
    layer.update = function (data) {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        setTextureParams(gl, data, layer.data);
        if (data.asset) {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data.asset);
        }
        if (data.minFilter && data.minFilter.indexOf('MIPMAP') > 0) {
            gl.generateMipmap(gl.TEXTURE_2D);
        }
        gl.bindTexture(gl.TEXTURE_2D, null);
        Object.assign(layer.data, data);
        return layer;
    };
    layer.destroy = function () {
        gl.deleteTexture(texture);
    };
    return layer;
}
export function createDrawing(gl) {
    var layer = {};
    layer.textures = [],
        layer.data = {};
    layer.texture = function (i) {
        if (i === void 0) { i = 0; }
        return layer.textures[i];
    };
    layer.update = function (data) {
        if (data.buffered && !layer.target) {
            layer.target = {
                width: data.width || gl.canvas.width,
                height: data.height || gl.canvas.height,
                frameBuffer: null, textures: [], depthBuffer: null,
                textureConfig: {
                    type: (data.textureConfig && data.textureConfig.type) || gl.UNSIGNED_BYTE,
                    count: (data.textureConfig && data.textureConfig.count) || 1
                }
            };
            updateRenderTarget(gl, layer.target, data, layer.data);
            layer.textures = layer.target.textures;
        }
        else if (layer.target && data.width && data.height) {
            layer.target.width = data.width;
            layer.target.height = data.height;
            updateRenderTarget(gl, layer.target, data, layer.data);
        }
        if (data.sketches) {
            layer.sketches = data.sketches;
        }
        if (data.frag) {
            var sketch = layer.sketches && layer.sketches[0];
            if (sketch) {
                sketch.shade.update({ frag: data.frag });
            }
        }
        if (data.uniforms) {
            layer.uniforms = data.uniforms;
        }
        Object.assign(layer.data, data);
        return layer;
    };
    layer.destroy = function () {
        if (layer.target) {
            destroyRenderTarget(gl, layer.target);
        }
        else {
            for (var _i = 0, _a = layer.textures; _i < _a.length; _i++) {
                var texture = _a[_i];
                gl.deleteTexture(texture);
            }
        }
    };
    return layer;
}
//# sourceMappingURL=layer.js.map