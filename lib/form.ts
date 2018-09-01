import { GL, FormData, AttribContext } from './painter-types'
import { getGLTypeForTypedArray } from './render-utils'

let formCounter = 1

export class Form {
	drawType!: number
	itemCount!: number
	attribs!: { [id: string]: AttribContext }
	elements?: {
		buffer: WebGLBuffer | null
		glType: number | null
	}

	constructor (private gl: GL, public id = 'Form' + formCounter++) {}

	update (data: FormData) {
		const gl = this.gl
		if (data.drawType) {
			this.drawType = gl[data.drawType]
		}

		if (data.itemCount) {
			this.itemCount = data.itemCount
		}

		this.attribs = this.attribs || {}

		for (const id in data.attribs) {
			const attribData = data.attribs[id]

			if (this.attribs[id] == null) {
				this.attribs[id] = {
					buffer: gl.createBuffer()
				}
			}

			gl.bindBuffer(gl.ARRAY_BUFFER, this.attribs[id].buffer)
			gl.bufferData(gl.ARRAY_BUFFER, attribData.buffer,
				(gl as any)[(attribData.storeType || 'STATIC') + '_DRAW'])
		}

		if (data.elements) {
			const buffer = data.elements.buffer

			if (this.elements == null) {
				this.elements = {
					buffer: gl.createBuffer(),
					glType: null
				}
			}

			this.elements.glType = getGLTypeForTypedArray(buffer)

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elements.buffer)
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, buffer,
				(gl as any)[(data.elements.storeType || 'STATIC') + '_DRAW'])
		}

		return this
	}

	destroy () {
		for (const id in this.attribs) {
			this.gl.deleteBuffer(this.attribs[id].buffer)
		}
		if (this.elements) {
			this.gl.deleteBuffer(this.elements.buffer)
		}
	}
}
