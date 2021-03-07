import { times } from 'tvs-libs/dist/utils/sequence';
import { RenderTarget } from './render-target';
import { Texture } from './texture';
let frameCount = 1;
export class Frame {
    constructor(_painter, id = 'Frame' + frameCount++) {
        this._painter = _painter;
        this.id = id;
        this.width = 0;
        this.height = 0;
        this.layers = [];
        this._data = {};
        this._targets = [];
        this._textures = [];
    }
    image(i = 0) {
        return ((this._targets.length &&
            this._targets[this._targets.length - 1].textures[i]) ||
            this._textures[i]);
    }
    update(data = {}) {
        var _a, _b, _c, _d;
        const gl = this._painter.gl;
        const layers = Array.isArray(data.layers)
            ? data.layers
            : data.layers
                ? [data.layers]
                : this.layers;
        const selfReferencing = data.selfReferencing || this._data.selfReferencing;
        const layerCount = layers.reduce((count, layer) => count + (layer._uniforms.length || 1), 0);
        const targetCount = selfReferencing || layerCount > 1 ? 2 : layerCount;
        const width = data.width ||
            ((_a = data.texture) === null || _a === void 0 ? void 0 : _a.width) ||
            this._data.width ||
            ((_b = this._data.texture) === null || _b === void 0 ? void 0 : _b.width) ||
            gl.canvas.width;
        const height = data.height ||
            ((_c = data.texture) === null || _c === void 0 ? void 0 : _c.height) ||
            this._data.height ||
            ((_d = this._data.texture) === null || _d === void 0 ? void 0 : _d.height) ||
            gl.canvas.height;
        const antialias = data.antialias || this._data.antialias || true;
        if (targetCount !== this._targets.length) {
            this._destroyTargets();
        }
        const targetData = Object.assign(Object.assign({}, data), { width, height, antialias });
        if (!this._targets.length && targetCount > 0) {
            this._targets = times(i => new RenderTarget(this._painter, this.id + '_target' + (i + 1)).update(targetData), targetCount);
        }
        else if (this._targets.length) {
            this._targets.forEach(t => {
                t.update(targetData);
            });
        }
        if (data.texture) {
            // Hardcode to one static texture for now
            if (!this._textures[0]) {
                this._textures[0] = new Texture(this._painter, this.id + '_Texture0');
            }
            data.texture.width = width;
            data.texture.height = height;
            this._textures[0].update(data.texture);
        }
        Object.assign(this._data, data);
        this.layers = layers;
        this.width = width;
        this.height = height;
        return this;
    }
    destroy() {
        this._destroyTargets();
        this._textures.forEach(tex => tex.destroy());
        this._textures = [];
        this._data = {};
        this.layers = [];
        this.width = 0;
        this.height = 0;
    }
    _destroyTargets() {
        this._targets.forEach(t => t.destroy());
        this._targets = [];
    }
    _swapTargets() {
        if (this._targets.length > 1) {
            const tmp = this._targets[0];
            this._targets[0] = this._targets[1];
            this._targets[1] = tmp;
        }
    }
}
//# sourceMappingURL=frame.js.map