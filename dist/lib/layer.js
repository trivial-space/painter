import { setTextureParams, updateRenderTarget, destroyRenderTarget } from './render-utils';
var StaticLayer = /** @class */ (function () {
    function StaticLayer(gl) {
        this.data = {};
        this.gl = gl;
        this.textures = [gl.createTexture()];
    }
    StaticLayer.prototype.texture = function () {
        return this.textures[0];
    };
    StaticLayer.prototype.update = function (data) {
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture());
        setTextureParams(this.gl, data, this.data);
        if (data.asset) {
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data.asset);
        }
        if (data.minFilter && data.minFilter.indexOf('MIPMAP') > 0) {
            this.gl.generateMipmap(this.gl.TEXTURE_2D);
        }
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        Object.assign(this.data, data);
        return this;
    };
    StaticLayer.prototype.destroy = function () {
        this.gl.deleteTexture(this.texture());
    };
    return StaticLayer;
}());
export { StaticLayer };
var DrawingLayer = /** @class */ (function () {
    function DrawingLayer(gl) {
        this.gl = gl;
        this.textures = [];
        this.data = {};
    }
    DrawingLayer.prototype.texture = function (i) {
        if (i === void 0) { i = 0; }
        return this.textures[i];
    };
    DrawingLayer.prototype.update = function (data) {
        if (data.buffered && !this.target) {
            this.target = {
                width: data.width || this.gl.canvas.width,
                height: data.height || this.gl.canvas.height,
                frameBuffer: null, textures: [], depthBuffer: null,
                textureConfig: {
                    type: (data.textureConfig && data.textureConfig.type) || this.gl.UNSIGNED_BYTE,
                    count: (data.textureConfig && data.textureConfig.count) || 1
                }
            };
            updateRenderTarget(this.gl, this.target, data, this.data);
            this.textures = this.target.textures;
        }
        else if (this.target && data.width && data.height) {
            this.target.width = data.width;
            this.target.height = data.height;
            updateRenderTarget(this.gl, this.target, data, this.data);
        }
        if (data.sketches) {
            this.sketches = data.sketches;
        }
        if (data.frag) {
            var sketch = this.sketches && this.sketches[0];
            if (sketch) {
                sketch.shade.update({ frag: data.frag });
            }
        }
        if (data.uniforms) {
            this.uniforms = data.uniforms;
        }
        Object.assign(this.data, data);
        return this;
    };
    DrawingLayer.prototype.destroy = function () {
        if (this.sketches) {
            for (var _i = 0, _a = this.sketches; _i < _a.length; _i++) {
                var sketch = _a[_i];
                sketch.destroy();
            }
        }
        if (this.target) {
            destroyRenderTarget(this.gl, this.target);
        }
        else {
            for (var _b = 0, _c = this.textures; _b < _c.length; _b++) {
                var texture = _c[_b];
                this.gl.deleteTexture(texture);
            }
        }
    };
    return DrawingLayer;
}());
export { DrawingLayer };
//# sourceMappingURL=layer.js.map