import { AttribSetter, GL, ShadeData, UniformSetter } from './painter-types'
import { createAttributeSetters, createUniformSetters } from './render-utils'

let shadeCounter = 1

export class Shade {
	program!: WebGLProgram | null
	vert!: WebGLShader | null
	frag!: WebGLShader | null
	vertSource?: string
	fragSource?: string
	uniformSetters!: { [id: string]: UniformSetter }
	attributeSetters!: { [id: string]: AttribSetter }

	constructor(private gl: GL, public id = 'Shade' + shadeCounter++) {}

	update(data: ShadeData) {
		const gl = this.gl
		const fragSource = (data.frag && data.frag.trim()) || this.fragSource
		const vertSource = (data.vert && data.vert.trim()) || this.vertSource

		if (
			!(
				fragSource &&
				vertSource &&
				(fragSource !== this.fragSource || vertSource !== this.vertSource)
			)
		) {
			return this
		}

		this.destroy()

		if (fragSource.indexOf('GL_EXT_draw_buffers') >= 0) {
			gl.getExtension('WEBGL_draw_buffers')
		}

		const program = gl.createProgram()
		const frag = gl.createShader(gl.FRAGMENT_SHADER)
		const vert = gl.createShader(gl.VERTEX_SHADER)

		// if (!(program && frag && vert)) {
		// 	throw TypeError('Could not initialize Shade')
		// }

		this.program = program
		this.frag = frag
		this.vert = vert

		if (!(program && vert && frag)) return
		gl.attachShader(program, vert)
		gl.attachShader(program, frag)

		gl.shaderSource(vert, vertSource)
		gl.shaderSource(frag, fragSource)
		gl.compileShader(vert)
		gl.compileShader(frag)

		if (!gl.getShaderParameter(vert, gl.COMPILE_STATUS)) {
			console.error(
				'Error Compiling Vertex Shader!\n',
				gl.getShaderInfoLog(vert),
				addLineNumbers(vertSource)
			)
		}
		if (!gl.getShaderParameter(frag, gl.COMPILE_STATUS)) {
			console.error(
				'Error Compiling Fragment Shader!\n',
				gl.getShaderInfoLog(frag),
				addLineNumbers(fragSource)
			)
		}

		gl.linkProgram(program)

		const linked = gl.getProgramParameter(program, gl.LINK_STATUS)
		if (!linked) {
			const lastError = gl.getProgramInfoLog(program)
			console.error('Error in program linking:', lastError)
		}

		this.uniformSetters = createUniformSetters(gl, program)
		this.attributeSetters = createAttributeSetters(gl, program)

		this.fragSource = fragSource
		this.vertSource = vertSource

		return this
	}

	destroy() {
		this.gl.deleteProgram(this.program)
		this.gl.deleteShader(this.frag)
		this.gl.deleteShader(this.vert)
	}
}

function addLineNumbers(src: string) {
	return src
		.trim()
		.split('\n')
		.map((line, i) => i + 1 + ': ' + line)
		.join('\n')
}
