import { GL } from './renderer-types'
import { Geometry } from './geometry'
import { Shader } from './shader'
import { RenderObject } from './render-object'


export type Uniforms = { [id: string]: any }

export interface DrawingData {
	geometry?: Geometry,
	shader?: Shader,
	uniforms?: Uniforms,
	blending?: boolean,
	blendFns?: [number, number]
}


export class Drawing extends RenderObject {

	gl: GL
	data: DrawingData = {}
	blendFns: [number, number]

	constructor(gl: GL | null) {
		super(gl)
		this.init()
	}

	init () {
		this.blendFns = [this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA]
	}

	update (data: DrawingData) {
		if (data.blendFns) {
			this.blendFns = data.blendFns
			data.blending = true
		}
		Object.assign(this.data, data)
	}

	draw (globalUniforms?: Uniforms) {
		const {shader, uniforms, geometry} = this.data
		const gl = this.gl
		if (!(shader && geometry)) {
			throw Error('cannot draw, shader or geometry are not set')
		}

		gl.useProgram(shader.program)
		shader.setGeometry(geometry)

		if (globalUniforms) {
			shader.setUniforms(globalUniforms)
		}

		if (this.data.blending) {
			gl.enable(gl.BLEND)
  			gl.blendFunc.apply(gl, this.blendFns)
		}

		if (Array.isArray(uniforms)) {
			for (const instanceUniforms of uniforms) {
				this.drawInstance(instanceUniforms)
			}
		} else {
			this.drawInstance(uniforms)
		}

		if (this.data.blending) {
			gl.disable(gl.BLEND)
		}
	}

	private drawInstance (uniforms: Uniforms = {}) {
		const gl = this.gl
		const geometry = this.data.geometry as Geometry
		const shader = this.data.shader as Shader

		shader.setUniforms(uniforms)

		if (geometry.elements && geometry.elements.glType != null) {
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.elements.buffer)
			gl.drawElements(geometry.drawType, geometry.itemCount, geometry.elements.glType, 0)
		} else {
			gl.drawArrays(geometry.drawType, 0, geometry.itemCount)
		}
	}
}
