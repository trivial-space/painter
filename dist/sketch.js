let sketchCounter = 1;
export class Sketch {
    constructor(id = 'Sketch' + sketchCounter++) {
        this.id = id;
    }
    update(data) {
        if (data.drawSettings) {
            this.drawSettings = data.drawSettings;
        }
        if (data.form) {
            this.form = data.form;
        }
        if (data.shade) {
            this.shade = data.shade;
        }
        if (data.uniforms) {
            this.uniforms = data.uniforms;
        }
        return this;
    }
    destroy() {
        this.form && this.form.destroy();
        this.shade && this.shade.destroy();
    }
}
//# sourceMappingURL=sketch.js.map