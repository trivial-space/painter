import { GL, FormData, Form } from './render-types'
import { getGLTypeForTypedArray } from './render-utils'


export function create (gl: GL): Form {

	const form = {} as Form

	form.update = (data: FormData) => {

		if (data.drawType) {
			form.drawType = gl[data.drawType]
		}

		if (data.itemCount) {
			form.itemCount = data.itemCount
		}

		const attribs = form.attribs || {}

		for (const id in data.attribs) {
			const attribData = data.attribs[id]

			if (attribs[id] == null) {
				attribs[id] = {
					buffer: gl.createBuffer()
				}
			}

			gl.bindBuffer(gl.ARRAY_BUFFER, attribs[id].buffer)
			gl.bufferData(gl.ARRAY_BUFFER, attribData.buffer,
				(gl as any)[(attribData.storeType || 'STATIC') + '_DRAW'])
		}

		form.attribs = attribs

		if (data.elements) {
			const buffer = data.elements.buffer

			if (form.elements == null) {
				form.elements = {
					buffer: gl.createBuffer(),
					glType: null
				}
			}

			form.elements.glType = getGLTypeForTypedArray(buffer)

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, form.elements.buffer)
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, buffer,
				(gl as any)[(data.elements.storeType || 'STATIC') + '_DRAW'])
		}

		return form
	}


	form.destroy = () => {
		for (const id in form.attribs) {
			gl.deleteBuffer(form.attribs[id].buffer)
		}
		if (form.elements) {
			gl.deleteBuffer(form.elements.buffer)
		}

		return form
	}


	return form
}
