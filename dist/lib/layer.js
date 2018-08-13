import { setTextureParams, updateRenderTarget, destroyRenderTarget } from './render-utils';
import { times } from 'tvs-libs/dist/lib/utils/sequence';
var StaticLayer = /** @class */ (function () {
    function StaticLayer(gl) {
        this.data = {};
        this.gl = gl;
        this._texture = gl.createTexture();
    }
    StaticLayer.prototype.texture = function () {
        return this._texture;
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
        this.data = {};
    }
    DrawingLayer.prototype.texture = function (i) {
        if (i === void 0) { i = 0; }
        return (this.targets && this.targets[0].textures[i]) || null;
    };
    DrawingLayer.prototype.update = function (data) {
        var _this = this;
        if (data.buffered && !this.targets) {
            this.targets = times(function () { return ({
                width: data.width || _this.gl.canvas.width,
                height: data.height || _this.gl.canvas.height,
                frameBuffer: null, textures: [], depthBuffer: null,
                textureConfig: {
                    type: (data.textureConfig && data.textureConfig.type) || _this.gl.UNSIGNED_BYTE,
                    count: (data.textureConfig && data.textureConfig.count) || 1
                }
            }); }, 2);
            this.targets.forEach(function (t) { return updateRenderTarget(_this.gl, t, data, _this.data); });
        }
        else if (this.targets && data.width && data.height) {
            this.targets.forEach(function (t) {
                t.width = data.width;
                t.height = data.height;
                updateRenderTarget(_this.gl, t, data, _this.data);
            });
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
        var _this = this;
        if (this.sketches) {
            for (var _i = 0, _a = this.sketches; _i < _a.length; _i++) {
                var sketch = _a[_i];
                sketch.destroy();
            }
        }
        if (this.targets) {
            this.targets.forEach(function (t) { return destroyRenderTarget(_this.gl, t); });
            this.targets = undefined;
        }
    };
    return DrawingLayer;
}());
export { DrawingLayer };
//# sourceMappingURL=layer.js.map