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
            this.form = data.form;
        }
        if (data.shade) {
            this.shade = data.shade;
        }
        if (data.uniforms) {
            this._uniforms = Array.isArray(data.uniforms)
                ? data.uniforms
                : [data.uniforms];
        }
        return this;
    }
    destroy() {
        this.form && this.form.destroy();
        this.shade && this.shade.destroy();
        this._drawSettings = undefined;
        this._uniforms = [];
    }
}
//# sourceMappingURL=sketch.js.map