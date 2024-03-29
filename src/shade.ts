import { Painter } from './painter'
import { AttribSetter, ShadeData, UniformSetter } from './painter-types'
import { createAttributeSetters, createUniformSetters } from './render-utils'

let shadeCounter = 1

export class Shade {
	vertSource?: string
	fragSource?: string

	_program!: WebGLProgram | null
	_vert!: WebGLShader | null
	_frag!: WebGLShader | null

	_uniforms!: { [id: string]: UniformSetter }
	_attributes!: { [id: string]: AttribSetter }

	constructor(
		private _painter: Painter,
		public id = 'Shade' + shadeCounter++,
	) {}

	update(data: ShadeData) {
		const gl = this._painter.gl
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

		if (!(program && vert && frag)) return this

		this._program = program
		this._frag = frag
		this._vert = vert

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
				addLineNumbers(vertSource),
			)
		}
		if (!gl.getShaderParameter(frag, gl.COMPILE_STATUS)) {
			console.error(
				'Error Compiling Fragment Shader!\n',
				gl.getShaderInfoLog(frag),
				addLineNumbers(fragSource),
			)
		}

		gl.linkProgram(program)

		const linked = gl.getProgramParameter(program, gl.LINK_STATUS)
		if (!linked) {
			const lastError = gl.getProgramInfoLog(program)
			console.error('Error in program linking:', lastError)
		}

		this._uniforms = createUniformSetters(gl, program)
		this._attributes = createAttributeSetters(gl, program)

		this.fragSource = fragSource
		this.vertSource = vertSource

		return this
	}

	destroy() {
		const gl = this._painter.gl

		gl.deleteProgram(this._program)
		gl.deleteShader(this._frag)
		gl.deleteShader(this._vert)

		this.vertSource = undefined
		this.fragSource = undefined
		this._attributes = {}
		this._uniforms = {}
	}
}

function addLineNumbers(src: string) {
	return src
		.trim()
		.split('\n')
		.map((line, i) => i + 1 + ': ' + line)
		.join('\n')
}
