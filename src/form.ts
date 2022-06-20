import { Painter } from './painter'
import { CustomAttribLayout, FormData } from './painter-types'
import { getGLTypeForTypedArray } from './render-utils'

let formCounter = 1

export class Form {
	_drawType!: number
	_itemCount!: number
	_attribBuffers: {
		[id: string]: WebGLBuffer | null
	} | null = null
	_customLayout: {
		buffer?: WebGLBuffer | null
		attribs: {
			[id: string]: CustomAttribLayout & { buffer?: WebGLBuffer | null }
		}
	} | null = null
	_elements?: {
		buffer: WebGLBuffer | null
		glType: number | null
	}

	constructor(private _painter: Painter, public id = 'Form' + formCounter++) {}

	update(data: FormData) {
		const gl = this._painter.gl

		if (data.drawType != null) {
			this._drawType =
				typeof data.drawType === 'number' ? data.drawType : gl[data.drawType]
		}

		if (data.itemCount) {
			this._itemCount = data.itemCount
		}

		if (data.customLayout) {
			this._customLayout = this._customLayout || { attribs: {} }

			const buffer = data.customLayout.data
			if (buffer) {
				if (this._customLayout.buffer == null) {
					this._customLayout.buffer = gl.createBuffer()
				}
				gl.bindBuffer(gl.ARRAY_BUFFER, this._customLayout.buffer)
				gl.bufferData(
					gl.ARRAY_BUFFER,
					buffer.buffer,
					(gl as any)[(buffer.storeType || 'STATIC') + '_DRAW'],
				)
			}

			let attribs = this._customLayout.attribs
			for (let attribName in data.customLayout.layout) {
				let layout = data.customLayout.layout[attribName]
				if (!attribs[attribName]) {
					attribs[attribName] = { ...layout }
				} else {
					Object.assign(attribs[attribName], layout)
				}

				if (!buffer && layout.data) {
					let attrib = attribs[attribName]
					if (attrib.buffer == null) {
						attrib.buffer = gl.createBuffer()
					}
					gl.bindBuffer(gl.ARRAY_BUFFER, attrib.buffer)
					gl.bufferData(
						gl.ARRAY_BUFFER,
						layout.data.buffer,
						(gl as any)[(layout.data.storeType || 'STATIC') + '_DRAW'],
					)
				}
			}
		}

		if (data.attribs) {
			this._attribBuffers = this._attribBuffers || {}

			for (const id in data.attribs) {
				const attribData = data.attribs[id]

				if (this._attribBuffers[id] == null) {
					this._attribBuffers[id] = gl.createBuffer()
				}

				gl.bindBuffer(gl.ARRAY_BUFFER, this._attribBuffers[id])
				gl.bufferData(
					gl.ARRAY_BUFFER,
					attribData.buffer,
					(gl as any)[(attribData.storeType || 'STATIC') + '_DRAW'],
				)
			}
		}

		if (data.elements) {
			const buffer = data.elements.buffer

			if (this._elements == null) {
				this._elements = {
					buffer: gl.createBuffer(),
					glType: null,
				}
			}

			this._elements.glType = getGLTypeForTypedArray(buffer)

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._elements.buffer)
			gl.bufferData(
				gl.ELEMENT_ARRAY_BUFFER,
				buffer,
				(gl as any)[(data.elements.storeType || 'STATIC') + '_DRAW'],
			)
		} else if (data.elements === null && this._elements) {
			gl.deleteBuffer(this._elements.buffer)
			this._elements = undefined
		}

		return this
	}

	destroy() {
		const gl = this._painter.gl

		if (this._attribBuffers) {
			for (const id in this._attribBuffers) {
				gl.deleteBuffer(this._attribBuffers[id])
			}
		}
		if (this._customLayout) {
			if (this._customLayout.buffer != null) {
				gl.deleteBuffer(this._customLayout.buffer)
			}
			for (const id in this._customLayout.attribs) {
				if (this._customLayout.attribs[id].buffer != null) {
					gl.deleteBuffer(this._customLayout.attribs[id].buffer!)
				}
			}
		}
		this._attribBuffers = null
		this._customLayout = null

		if (this._elements) {
			gl.deleteBuffer(this._elements.buffer)
			this._elements = undefined
		}
	}
}
