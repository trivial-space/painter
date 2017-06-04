import { GL, TypedArray } from './renderer-types'
import { RenderObject } from './render-object'


export type GeometryDrawType =
	'TRIANGLES' |
	'TRIANGLE_STRIP' |
	'TRIANGLE_FAN' |
	'POINTS' |
	'LINES' |
	'LINE_LOOP' |
	'LINE_STRIP'


export type GeometryStoreType = 'DYNAMIC' | 'STATIC'


export interface GeometryBufferStore {
	readonly buffer: TypedArray
	readonly storeType?: GeometryStoreType
}


export interface GeometryData {
	readonly drawType: GeometryDrawType
	readonly itemCount: number
	readonly attribs: { [id: string]: GeometryBufferStore }
	readonly elements?: GeometryBufferStore
}


export interface AttribContext {
	buffer: WebGLBuffer | null
	stride?: number,
	offset?: number,
	normalize?: boolean
}


export class Geometry extends RenderObject {

	gl: GL
	drawType: number
	itemCount: number
	attribs: { [id: string]: AttribContext }
	elements?: {
		buffer: WebGLBuffer | null
		glType: number | null
	}

	update (data: GeometryData) {

		const gl = this.gl
		this.drawType = gl[data.drawType]
		this.itemCount = data.itemCount

		const attribs = this.attribs || {}

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

		this.attribs = attribs

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
	}

	delete () {
		for (const id in this.attribs) {
			this.gl.deleteBuffer(this.attribs[id])
		}
		if (this.elements) {
			this.gl.deleteBuffer(this.elements.buffer)
		}
	}

}


const BYTE = 0x1400
const UNSIGNED_BYTE = 0x1401
const SHORT = 0x1402
const UNSIGNED_SHORT = 0x1403
const INT = 0x1404
const UNSIGNED_INT = 0x1405
const FLOAT = 0x1406
const UNSIGNED_SHORT_4_4_4_4 = 0x8033
const UNSIGNED_SHORT_5_5_5_1 = 0x8034
const UNSIGNED_SHORT_5_6_5 = 0x8363
const HALF_FLOAT = 0x140B
const UNSIGNED_INT_2_10_10_10_REV = 0x8368
const UNSIGNED_INT_10F_11F_11F_REV = 0x8C3B
const UNSIGNED_INT_5_9_9_9_REV = 0x8C3E
const FLOAT_32_UNSIGNED_INT_24_8_REV = 0x8DAD
const UNSIGNED_INT_24_8 = 0x84FA


export const glTypeToTypedArray = {
	[BYTE]: Int8Array,
	[UNSIGNED_BYTE]: Uint8Array,
	[SHORT]: Int16Array,
	[UNSIGNED_SHORT]: Uint16Array,
	[INT]: Int32Array,
	[UNSIGNED_INT]: Uint32Array,
	[FLOAT]: Float32Array,
	[UNSIGNED_SHORT_4_4_4_4]: Uint16Array,
	[UNSIGNED_SHORT_5_5_5_1]: Uint16Array,
	[UNSIGNED_SHORT_5_6_5]: Uint16Array,
	[HALF_FLOAT]: Uint16Array,
	[UNSIGNED_INT_2_10_10_10_REV]: Uint32Array,
	[UNSIGNED_INT_10F_11F_11F_REV]: Uint32Array,
	[UNSIGNED_INT_5_9_9_9_REV]: Uint32Array,
	[FLOAT_32_UNSIGNED_INT_24_8_REV]: Uint32Array,
	[UNSIGNED_INT_24_8]: Uint32Array
}


export function getGLTypeForTypedArray (typedArray: any) {
	if (typedArray instanceof Int8Array) { return BYTE }
	if (typedArray instanceof Uint8Array) { return UNSIGNED_BYTE }
	if (typedArray instanceof Uint8ClampedArray) { return UNSIGNED_BYTE }
	if (typedArray instanceof Int16Array) { return SHORT }
	if (typedArray instanceof Uint16Array) { return UNSIGNED_SHORT }
	if (typedArray instanceof Int32Array) { return INT }
	if (typedArray instanceof Uint32Array) { return UNSIGNED_INT }
	if (typedArray instanceof Float32Array) { return FLOAT }
	throw 'unsupported typed array type'
}


export function getGLTypeForTypedArrayType (typedArrayType: any) {
	if (typedArrayType === Int8Array) { return BYTE }
	if (typedArrayType === Uint8Array) { return UNSIGNED_BYTE }
	if (typedArrayType === Uint8ClampedArray) { return UNSIGNED_BYTE }
	if (typedArrayType === Int16Array) { return SHORT }
	if (typedArrayType === Uint16Array) { return UNSIGNED_SHORT }
	if (typedArrayType === Int32Array) { return INT }
	if (typedArrayType === Uint32Array) { return UNSIGNED_INT }
	if (typedArrayType === Float32Array) { return FLOAT }
	throw 'unsupported typed array type'
}
