let layerCount = 1;
export class Layer {
    constructor(id = 'DrawingLayer' + layerCount++) {
        this.id = id;
        this.sketches = [];
        this._data = {};
        this._uniforms = [];
    }
    update(data) {
        if (data.sketches) {
            this.sketches = Array.isArray(data.sketches)
                ? data.sketches
                : [data.sketches];
        }
        if (data.frag) {
            const sketch = this.sketches && this.sketches[0];
            if (sketch) {
                sketch.shade.update({ frag: data.frag });
            }
        }
        if (data.uniforms) {
            this._uniforms = Array.isArray(data.uniforms)
                ? data.uniforms
                : [data.uniforms];
        }
        Object.assign(this._data, data);
        return this;
    }
    destroy() {
        for (const sketch of this.sketches) {
            sketch.destroy();
        }
        this._data.sketches = [];
        this._data = {};
        this._uniforms = [];
    }
}
//# sourceMappingURL=layer.js.map