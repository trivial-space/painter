var Sketch = /** @class */ (function () {
    function Sketch() {
    }
    Sketch.prototype.update = function (data) {
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
    };
    Sketch.prototype.destroy = function () {
        this.form && this.form.destroy();
        this.shade && this.shade.destroy();
    };
    return Sketch;
}());
export { Sketch };
//# sourceMappingURL=sketch.js.map