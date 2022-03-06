import { Vec } from 'tvs-libs/dist/math/vectors'
import { flatten } from 'tvs-libs/dist/utils/sequence'
import * as constants from '../contants'
import { FormData, FormDrawType } from '../painter-types'

export const STACK_GL_GEOMETRY_PROP_POSITION = 'positions'
export const STACK_GL_GEOMETRY_PROP_NORMAL = 'normals'
export const STACK_GL_GEOMETRY_PROP_UV = 'uvs'
export const STACK_GL_GEOMETRY_PROP_ELEMENTS = 'cells'

export function convertStackGLGeometry(stackglGeometry: {
	[id: string]: Vec[]
}): FormData {
	const geometry: FormData = {
		drawType: 'TRIANGLES' as FormDrawType,
		attribs: {},
		itemCount: 0,
	}

	for (const prop in stackglGeometry) {
		const arr = stackglGeometry[prop] as number[][]

		if (prop === STACK_GL_GEOMETRY_PROP_ELEMENTS) {
			const buffer = new (arr.length > 65535 ? Uint32Array : Uint16Array)(
				flatten(arr),
			)
			Object.assign(geometry, {
				elements: { buffer },
				itemCount: buffer.length,
			})
		} else if (prop === STACK_GL_GEOMETRY_PROP_POSITION) {
			geometry.attribs![constants.GEOMETRY_PROP_POSITION] = {
				buffer: new Float32Array(flatten(arr)),
			}
		} else if (prop === STACK_GL_GEOMETRY_PROP_NORMAL) {
			geometry.attribs![constants.GEOMETRY_PROP_NORMAL] = {
				buffer: new Float32Array(flatten(arr)),
			}
		} else if (prop === STACK_GL_GEOMETRY_PROP_UV) {
			geometry.attribs![constants.GEOMETRY_PROP_UV] = {
				buffer: new Float32Array(flatten(arr)),
			}
		} else {
			geometry.attribs![prop] = { buffer: new Float32Array(flatten(arr)) }
		}
	}

	return geometry
}
