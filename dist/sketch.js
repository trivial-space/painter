let sketchCounter = 1;
export class Sketch {
    constructor(id = 'Sketch' + sketchCounter++) {
        this.id = id;
        this._uniforms = [];
    }
    update(data) {
        if (data.drawSettings) {
            this._drawSettings = data.drawSettings;
        }
        if (data.form) {
            this._form = data.form;
        }
        if (data.shade) {
            this._shade = data.shade;
        }
        if (data.uniforms) {
            this._uniforms = Array.isArray(data.uniforms)
                ? data.uniforms
                : [data.uniforms];
        }
        return this;
    }
    destroy() {
        this._form && this._form.destroy();
        this._shade && this._shade.destroy();
    }
}
//# sourceMappingURL=sketch.js.map