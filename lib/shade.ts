import { ShadeData, Shade, GL } from './painter-types'
import { createUniformSetters, createAttributeSetters } from './render-utils'


export function create (gl: GL): Shade {

	const shade = {
		program: gl.createProgram(),
		frag: gl.createShader(gl.FRAGMENT_SHADER),
		vert: gl.createShader(gl.VERTEX_SHADER)
	} as Shade

	gl.attachShader(shade.program, shade.vert)
	gl.attachShader(shade.program, shade.frag)


	shade.update = (data: ShadeData) => {
		const frag = (data.frag && data.frag.trim()) || shade.fragSource
		const vert = (data.vert && data.vert.trim()) || shade.vertSource

		if (!(frag && vert)) { return shade }

		if (frag.indexOf('GL_EXT_draw_buffers') >= 0) {
			gl.getExtension('WEBGL_draw_buffers')
		}

		gl.shaderSource(shade.vert, vert)
		gl.shaderSource(shade.frag, frag)
		gl.compileShader(shade.vert)
		gl.compileShader(shade.frag)

		if (!gl.getShaderParameter(shade.vert, gl.COMPILE_STATUS)) {
			console.error(
				'Error Compiling Vertex Shader!\n',
				gl.getShaderInfoLog(shade.vert),
				addLineNumbers(vert)
			)
		}
		if (!gl.getShaderParameter(shade.frag, gl.COMPILE_STATUS)) {
			console.error(
				'Error Compiling Fragment Shader!\n',
				gl.getShaderInfoLog(shade.frag),
				addLineNumbers(frag)
			)
		}

		gl.linkProgram(shade.program)

		const linked = gl.getProgramParameter(shade.program, gl.LINK_STATUS)
		if (!linked) {
			const lastError = gl.getProgramInfoLog(shade.program)
			console.error('Error in program linking:', lastError)
		}

		shade.uniformSetters = createUniformSetters(gl, shade.program)
		shade.attributeSetters = createAttributeSetters(gl, shade.program)

		shade.fragSource = frag
		shade.vertSource = vert

		return shade
	}


	shade.destroy = () => {
		gl.deleteProgram(shade.program)
		gl.deleteShader(shade.frag)
		gl.deleteShader(shade.vert)
	}

	return shade
}


function addLineNumbers (src: string) {
	return src.trim().split('\n')
		.map((line, i) => (i + 1) + ': ' + line)
		.join('\n')
}
