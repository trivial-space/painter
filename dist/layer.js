import { RenderTarget } from './render-target';
import { Texture } from './texture';
import { times } from 'tvs-libs/dist/utils/sequence';
let layerCount = 1;
export class Layer {
    constructor(_painter, id = 'Layer' + layerCount++) {
        this._painter = _painter;
        this.id = id;
        this.sketches = [];
        this.effects = [];
        this.width = 0;
        this.height = 0;
        this._targets = [];
        this._textures = [];
        this._passCount = 0;
        this._data = {};
        this._uniforms = null;
    }
    image(i = 0) {
        return ((this._targets.length &&
            this._targets[this._targets.length - 1].textures[i]) ||
            this._textures[i]);
    }
    update(data) {
        var _a, _b, _c, _d;
        if (data.sketches) {
            this.sketches = Array.isArray(data.sketches)
                ? data.sketches
                : [data.sketches];
        }
        if (data.effects) {
            this.effects = Array.isArray(data.effects) ? data.effects : [data.effects];
        }
        if (data.uniforms) {
            this._uniforms = data.uniforms;
        }
        const selfReferencing = data.selfReferencing || this._data.selfReferencing;
        let passCount = this.effects.reduce((count, effect) => count + (effect._uniforms.length || 1), this.sketches.length ? 1 : 0);
        const targetCount = selfReferencing || passCount > 1 ? 2 : passCount;
        if (data.directRender || this._data.directRender) {
            passCount -= 1;
        }
        this._passCount = passCount;
        const gl = this._painter.gl;
        const width = data.width ||
            ((_a = data.texture) === null || _a === void 0 ? void 0 : _a.width) ||
            this._data.width ||
            ((_b = this._data.texture) === null || _b === void 0 ? void 0 : _b.width) ||
            gl.drawingBufferWidth;
        const height = data.height ||
            ((_c = data.texture) === null || _c === void 0 ? void 0 : _c.height) ||
            this._data.height ||
            ((_d = this._data.texture) === null || _d === void 0 ? void 0 : _d.height) ||
            gl.drawingBufferHeight;
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
        this.width = width;
        this.height = height;
        return this;
    }
    destroy() {
        this._destroyTargets();
        this.clear();
    }
    clear() {
        this.effects = [];
        for (const tex of this._textures) {
            tex.destroy();
        }
        this.effects = [];
        this.sketches = [];
        this.width = 0;
        this.height = 0;
        this._data = {};
        this._textures = [];
        this._uniforms = null;
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
//# sourceMappingURL=layer.js.map