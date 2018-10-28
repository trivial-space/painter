import { createUniformSetters, createAttributeSetters } from './render-utils';
let shadeCounter = 1;
export class Shade {
    constructor(gl, id = 'Shade' + shadeCounter++) {
        this.gl = gl;
        this.id = id;
        const program = gl.createProgram();
        const frag = gl.createShader(gl.FRAGMENT_SHADER);
        const vert = gl.createShader(gl.VERTEX_SHADER);
        if (!(program && frag && vert)) {
            throw TypeError('Could not initialize Shade');
        }
        this.program = program;
        this.frag = frag;
        this.vert = vert;
        gl.attachShader(this.program, this.vert);
        gl.attachShader(this.program, this.frag);
    }
    update(data) {
        const gl = this.gl;
        const frag = (data.frag && data.frag.trim()) || this.fragSource;
        const vert = (data.vert && data.vert.trim()) || this.vertSource;
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
        const linked = gl.getProgramParameter(this.program, gl.LINK_STATUS);
        if (!linked) {
            const lastError = gl.getProgramInfoLog(this.program);
            console.error('Error in program linking:', lastError);
        }
        this.uniformSetters = createUniformSetters(gl, this.program);
        this.attributeSetters = createAttributeSetters(gl, this.program);
        this.fragSource = frag;
        this.vertSource = vert;
        return this;
    }
    destroy() {
        this.gl.deleteProgram(this.program);
        this.gl.deleteShader(this.frag);
        this.gl.deleteShader(this.vert);
    }
}
function addLineNumbers(src) {
    return src.trim().split('\n')
        .map((line, i) => (i + 1) + ': ' + line)
        .join('\n');
}
//# sourceMappingURL=shade.js.map