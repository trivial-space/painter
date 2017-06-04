var Drawing = (function () {
    function Drawing(gl) {
        this.gl = gl;
    }
    Drawing.prototype.update = function (data) {
        this.data = data;
    };
    Drawing.prototype.draw = function (globalUniforms) {
        this.gl.useProgram(this.data.shader.program);
        this.data.shader.setGeometry(this.data.geometry);
        if (globalUniforms) {
            this.data.shader.setUniforms(globalUniforms);
        }
        if (Array.isArray(this.data.uniforms)) {
            for (var _i = 0, _a = this.data.uniforms; _i < _a.length; _i++) {
                var uniforms = _a[_i];
                this.drawInstance(uniforms);
            }
        }
        else {
            this.drawInstance(this.data.uniforms);
        }
    };
    Drawing.prototype.drawInstance = function (uniforms) {
        var gl = this.gl;
        var geometry = this.data.geometry;
        this.data.shader.setUniforms(uniforms);
        if (geometry.elements && geometry.elements.glType != null) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.elements.buffer);
            gl.drawElements(geometry.drawType, geometry.itemCount, geometry.elements.glType, 0);
        }
        else {
            gl.drawArrays(geometry.drawType, 0, geometry.itemCount);
        }
    };
    return Drawing;
}());
export { Drawing };
//# sourceMappingURL=drawing.js.map