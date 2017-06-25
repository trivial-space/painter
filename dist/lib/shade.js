import { createUniformSetters, createAttributeSetters } from './render-utils';
export function create(gl) {
    var shade = {
        program: gl.createProgram(),
        frag: gl.createShader(gl.FRAGMENT_SHADER),
        vert: gl.createShader(gl.VERTEX_SHADER)
    };
    gl.attachShader(shade.program, shade.vert);
    gl.attachShader(shade.program, shade.frag);
    shade.update = function (data) {
        var frag = (data.frag && data.frag.trim()) || shade.fragSource;
        var vert = (data.vert && data.vert.trim()) || shade.vertSource;
        if (!(frag && vert)) {
            return shade;
        }
        if (frag.indexOf('GL_EXT_draw_buffers') >= 0) {
            gl.getExtension('WEBGL_draw_buffers');
        }
        gl.shaderSource(shade.vert, vert);
        gl.shaderSource(shade.frag, frag);
        gl.compileShader(shade.vert);
        gl.compileShader(shade.frag);
        if (!gl.getShaderParameter(shade.vert, gl.COMPILE_STATUS)) {
            console.error('Error Compiling Vertex Shader!\n', gl.getShaderInfoLog(shade.vert), addLineNumbers(vert));
        }
        if (!gl.getShaderParameter(shade.frag, gl.COMPILE_STATUS)) {
            console.error('Error Compiling Fragment Shader!\n', gl.getShaderInfoLog(shade.frag), addLineNumbers(frag));
        }
        gl.linkProgram(shade.program);
        var linked = gl.getProgramParameter(shade.program, gl.LINK_STATUS);
        if (!linked) {
            var lastError = gl.getProgramInfoLog(shade.program);
            console.error('Error in program linking:', lastError);
        }
        shade.uniformSetters = createUniformSetters(gl, shade.program);
        shade.attributeSetters = createAttributeSetters(gl, shade.program);
        shade.fragSource = frag;
        shade.vertSource = vert;
        return shade;
    };
    shade.delete = function () {
        gl.deleteProgram(shade.program);
        gl.deleteShader(shade.frag);
        gl.deleteShader(shade.vert);
        return shade;
    };
    return shade;
}
function addLineNumbers(src) {
    return src.trim().split('\n')
        .map(function (line, i) { return (i + 1) + ': ' + line; })
        .join('\n');
}
//# sourceMappingURL=shade.js.map