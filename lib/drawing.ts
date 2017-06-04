import { GL } from './renderer-types'
import { Geometry } from './geometry'
import { Shader } from './shader'
import { RenderObject } from './render-object'


export interface DrawingData {
	geometry: Geometry,
	shader: Shader,
	uniforms: any
}

export type Uniforms = { [id: string]: any }


export class Drawing extends RenderObject {

	gl: GL
	data: DrawingData

	update (data: DrawingData) {
		this.data = data
	}

	draw (globalUniforms?: Uniforms) {
		this.gl.useProgram(this.data.shader.program)
		this.data.shader.setGeometry(this.data.geometry)

		if (globalUniforms) {
			this.data.shader.setUniforms(globalUniforms)
		}

		if (Array.isArray(this.data.uniforms)) {
			for (const uniforms of this.data.uniforms) {
				this.drawInstance(uniforms)
			}
		} else {
			this.drawInstance(this.data.uniforms)
		}
	}

	private drawInstance (uniforms: Uniforms) {
		const gl = this.gl
		const geometry = this.data.geometry

		this.data.shader.setUniforms(uniforms)

		if (geometry.elements && geometry.elements.glType != null) {
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.elements.buffer)
			gl.drawElements(geometry.drawType, geometry.itemCount, geometry.elements.glType, 0)
		} else {
			gl.drawArrays(geometry.drawType, 0, geometry.itemCount)
		}
	}
}
