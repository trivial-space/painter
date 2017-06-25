import { setTextureParams, updateRenderTarget } from './render-utils';
export function createStatic(gl) {
    var layer = {};
    layer.textures = [],
        layer.data = {};
    layer.texture = function (i) {
        if (i === void 0) { i = 0; }
        return layer.textures[i];
    };
    var texture = gl.createTexture();
    if (texture) {
        layer.textures.push(texture);
    }
    layer.update = function (data) {
        gl.bindTexture(gl.TEXTURE_2D, layer.textures[0]);
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
    layer.delete = function () {
        for (var _i = 0, _a = layer.textures; _i < _a.length; _i++) {
            var texture = _a[_i];
            gl.deleteTexture(texture);
        }
        if (layer.target) {
            gl.deleteFramebuffer(layer.target.frameBuffer);
            gl.deleteRenderbuffer(layer.target.depthBuffer);
        }
        return layer;
    };
    return layer;
}
//# sourceMappingURL=layer.js.map