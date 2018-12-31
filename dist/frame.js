import { equalArray } from 'tvs-libs/dist/utils/predicates';
import { times } from 'tvs-libs/dist/utils/sequence';
import { defaultTextureSettings } from './asset-lib';
import { destroyRenderTarget, setTextureParams, updateRenderTarget, } from './render-utils';
let frameCount = 1;
export class Frame {
    constructor(_gl, id = 'Frame' + frameCount++) {
        this._gl = _gl;
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
    update(data) {
        const gl = this._gl;
        const layers = Array.isArray(data.layers)
            ? data.layers
            : data.layers
                ? [data.layers]
                : this.layers;
        const selfReferencing = data.selfReferencing || this._data.selfReferencing;
        const layerCount = layers.reduce((count, layer) => count + (layer._uniforms.length || 1), 0);
        const targetCount = selfReferencing || layerCount > 1 ? 2 : layerCount;
        const width = data.width || this._data.width || gl.drawingBufferWidth;
        const height = data.height || this._data.width || gl.drawingBufferHeight;
        if (targetCount !== this._targets.length ||
            !equalArray(this._data.bufferStructure, data.bufferStructure)) {
            this._destroyTargets();
        }
        if (!this._targets.length && targetCount > 0) {
            this._targets = times(i => ({
                id: this.id + '_target' + (i + 1),
                width,
                height,
                frameBuffer: null,
                textures: [],
                depthBuffer: null,
                bufferStructure: data.bufferStructure || ['UNSIGNED_BYTE'],
            }), targetCount);
            if (!(data.wrap || data.wrapS || data.wrapT)) {
                data.wrap = defaultTextureSettings.wrap;
            }
            if (!data.minFilter) {
                data.minFilter = defaultTextureSettings.minFilter;
            }
            if (!data.magFilter) {
                data.magFilter = defaultTextureSettings.magFilter;
            }
            this._targets.forEach(t => updateRenderTarget(gl, t, data, this._data));
        }
        else if (this._targets.length &&
            (width !== this.width || height !== this.height)) {
            this._targets.forEach(t => {
                t.width = width;
                t.height = height;
                updateRenderTarget(gl, t, data, this._data);
            });
        }
        if (data.asset) {
            // Hardcode to one static texture for now
            if (this._textures[0] == null) {
                this._textures[0] = gl.createTexture();
            }
            gl.bindTexture(gl.TEXTURE_2D, this._textures[0]);
            if (!(data.wrap || data.wrapS || data.wrapT)) {
                data.wrap = defaultTextureSettings.wrap;
            }
            if (!data.minFilter) {
                data.minFilter = defaultTextureSettings.minFilter;
            }
            if (!data.magFilter) {
                data.magFilter = defaultTextureSettings.magFilter;
            }
            setTextureParams(gl, data);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data.asset);
            if (data.minFilter && data.minFilter.indexOf('MIPMAP') > 0) {
                gl.generateMipmap(gl.TEXTURE_2D);
            }
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
        Object.assign(this._data, data);
        this.layers = layers;
        this.width = width;
        this.height = height;
        return this;
    }
    destroy() {
        this._destroyTargets();
        this._textures.forEach(tex => {
            if (tex != null)
                this._gl.deleteTexture(tex);
        });
        this._textures = [];
        this._data = {};
        this.layers = [];
        this.width = 0;
        this.height = 0;
    }
    _destroyTargets() {
        this._targets.forEach(t => destroyRenderTarget(this._gl, t));
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