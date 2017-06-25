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
    return sketch;
}
//# sourceMappingURL=sketch.js.map