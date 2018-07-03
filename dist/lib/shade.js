import { createUniformSetters, createAttributeSetters } from './render-utils';
var Shade = /** @class */ (function () {
    function Shade(gl) {
        this.gl = gl;
        this.program = gl.createProgram(),
            this.frag = gl.createShader(gl.FRAGMENT_SHADER),
            this.vert = gl.createShader(gl.VERTEX_SHADER);
        gl.attachShader(this.program, this.vert);
        gl.attachShader(this.program, this.frag);
    }
    Shade.prototype.update = function (data) {
        var gl = this.gl;
        var frag = (data.frag && data.frag.trim()) || this.fragSource;
        var vert = (data.vert && data.vert.trim()) || this.vertSource;
        if (!(frag && vert)) {
            return this;
        }
        if (frag.indexOf('GL_EXT_draw_buffers') >= 0) {
            gl.getExtension('WEBGL_draw_buffers');
        }
        gl.shaderSource(this.vert, vert);
        gl.shaderSource(this.frag, frag);
        gl.compileShader(this.vert);
        gl.compileShader(this.frag);
        if (!gl.getShaderParameter(this.vert, gl.COMPILE_STATUS)) {
            console.error('Error Compiling Vertex Shader!\n', gl.getShaderInfoLog(this.vert), addLineNumbers(vert));
        }
        if (!gl.getShaderParameter(this.frag, gl.COMPILE_STATUS)) {
            console.error('Error Compiling Fragment Shader!\n', gl.getShaderInfoLog(this.frag), addLineNumbers(frag));
        }
        gl.linkProgram(this.program);
        var linked = gl.getProgramParameter(this.program, gl.LINK_STATUS);
        if (!linked) {
            var lastError = gl.getProgramInfoLog(this.program);
            console.error('Error in program linking:', lastError);
        }
        this.uniformSetters = createUniformSetters(gl, this.program);
        this.attributeSetters = createAttributeSetters(gl, this.program);
        this.fragSource = frag;
        this.vertSource = vert;
        return this;
    };
    Shade.prototype.destroy = function () {
        this.gl.deleteProgram(this.program);
        this.gl.deleteShader(this.frag);
        this.gl.deleteShader(this.vert);
    };
    return Shade;
}());
export { Shade };
function addLineNumbers(src) {
    return src.trim().split('\n')
        .map(function (line, i) { return (i + 1) + ': ' + line; })
        .join('\n');
}
//# sourceMappingURL=shade.js.map