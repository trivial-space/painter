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
let effectCounter = 1;
export class Effect extends Sketch {
    constructor(_form, _shade, id = 'Effect' + effectCounter++) {
        super(id);
        this.id = id;
        this.form = _form;
        this.shade = _shade;
    }
    update(data) {
        if (data.frag) {
            this.shade.update({ frag: data.frag });
        }
        if (data.uniforms) {
            this._uniforms = Array.isArray(data.uniforms)
                ? data.uniforms
                : [data.uniforms];
        }
        return this;
    }
}
//# sourceMappingURL=sketch.js.map