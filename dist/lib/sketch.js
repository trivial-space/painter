export function create() {
    var sketch = {};
    sketch.update = function (data) {
        if (data.drawSettings) {
            sketch.drawSettings = data.drawSettings;
        }
        if (data.form) {
            sketch.form = data.form;
        }
        if (data.shade) {
            sketch.shade = data.shade;
        }
        if (data.uniforms) {
            sketch.uniforms = data.uniforms;
        }
        return sketch;
    };
    sketch.destroy = function () {
        sketch.form && sketch.form.destroy();
        sketch.shade && sketch.shade.destroy();
    };
    return sketch;
}
//# sourceMappingURL=sketch.js.map