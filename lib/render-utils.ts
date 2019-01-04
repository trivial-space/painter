import { GL_TYPE } from './contants'
import {
	AttribContext,
	AttribSetter,
	DrawSettings,
	GL,
	UniformSetter,
} from './painter-types'
import { Texture } from './texture'

// Attrib and Uniform Setters

function getBindPointForSamplerType(type: number) {
	return (typeMap[type] as UniformTypeInfoSampler).bindPoint
}

function floatSetter(gl: GL, location: WebGLUniformLocation) {
	return (v: number) => {
		gl.uniform1f(location, v)
	}
}

function floatArraySetter(gl: GL, location: WebGLUniformLocation) {
	return (v: any) => {
		gl.uniform1fv(location, v)
	}
}

function floatVec2Setter(gl: GL, location: WebGLUniformLocation) {
	return (v: any) => {
		gl.uniform2fv(location, v)
	}
}

function floatVec3Setter(gl: GL, location: WebGLUniformLocation) {
	return (v: any) => {
		gl.uniform3fv(location, v)
	}
}

function floatVec4Setter(gl: GL, location: WebGLUniformLocation) {
	return (v: any) => {
		gl.uniform4fv(location, v)
	}
}

function intSetter(gl: GL, location: WebGLUniformLocation) {
	return (v: any) => {
		gl.uniform1i(location, v)
	}
}

function intArraySetter(gl: GL, location: WebGLUniformLocation) {
	return (v: any) => {
		gl.uniform1iv(location, v)
	}
}

function intVec2Setter(gl: GL, location: WebGLUniformLocation) {
	return (v: any) => {
		gl.uniform2iv(location, v)
	}
}

function intVec3Setter(gl: GL, location: WebGLUniformLocation) {
	return (v: any) => {
		gl.uniform3iv(location, v)
	}
}

function intVec4Setter(gl: GL, location: WebGLUniformLocation) {
	return (v: any) => {
		gl.uniform4iv(location, v)
	}
}

function uintSetter(gl: any, location: WebGLUniformLocation) {
	return (v: any) => {
		gl.uniform1ui(location, v)
	}
}

function uintArraySetter(gl: any, location: WebGLUniformLocation) {
	return (v: any) => {
		gl.uniform1uiv(location, v)
	}
}

function uintVec2Setter(gl: any, location: WebGLUniformLocation) {
	return (v: any) => {
		gl.uniform2uiv(location, v)
	}
}

function uintVec3Setter(gl: any, location: WebGLUniformLocation) {
	return (v: any) => {
		gl.uniform3uiv(location, v)
	}
}

function uintVec4Setter(gl: any, location: WebGLUniformLocation) {
	return (v: any) => {
		gl.uniform4uiv(location, v)
	}
}

function floatMat2Setter(gl: GL, location: WebGLUniformLocation) {
	return (v: any) => {
		gl.uniformMatrix2fv(location, false, v)
	}
}

function floatMat3Setter(gl: GL, location: WebGLUniformLocation) {
	return (v: any) => {
		gl.uniformMatrix3fv(location, false, v)
	}
}

function floatMat4Setter(gl: GL, location: WebGLUniformLocation) {
	return (v: any) => {
		gl.uniformMatrix4fv(location, false, v)
	}
}

function floatMat23Setter(gl: any, location: WebGLUniformLocation) {
	return (v: any) => {
		gl.uniformMatrix2x3fv(location, false, v)
	}
}

function floatMat32Setter(gl: any, location: WebGLUniformLocation) {
	return (v: any) => {
		gl.uniformMatrix3x2fv(location, false, v)
	}
}

function floatMat24Setter(gl: any, location: WebGLUniformLocation) {
	return (v: any) => {
		gl.uniformMatrix2x4fv(location, false, v)
	}
}

function floatMat42Setter(gl: any, location: WebGLUniformLocation) {
	return (v: any) => {
		gl.uniformMatrix4x2fv(location, false, v)
	}
}

function floatMat34Setter(gl: any, location: WebGLUniformLocation) {
	return (v: any) => {
		gl.uniformMatrix3x4fv(location, false, v)
	}
}

function floatMat43Setter(gl: any, location: WebGLUniformLocation) {
	return (v: any) => {
		gl.uniformMatrix4x3fv(location, false, v)
	}
}

function samplerSetter(
	gl: GL,
	type: number,
	unit: number,
	location: WebGLUniformLocation,
) {
	const bindPoint = getBindPointForSamplerType(type)
	return (texture: Texture) => {
		gl.uniform1i(location, unit)
		gl.activeTexture(gl.TEXTURE0 + unit)
		gl.bindTexture(bindPoint, texture._texture)
	}
}

function samplerArraySetter(
	gl: GL,
	type: number,
	unit: number,
	location: WebGLUniformLocation,
	size: number,
) {
	const bindPoint = getBindPointForSamplerType(type)
	const units = new Int32Array(size)
	for (let i = 0; i < size; ++i) {
		units[i] = unit + i
	}

	return (textures: Texture[]) => {
		gl.uniform1iv(location, units)
		for (const index in textures) {
			gl.activeTexture(gl.TEXTURE0 + units[index])
			gl.bindTexture(bindPoint, textures[index]._texture)
		}
	}
}

interface UniformTypeInfoNumber {
	Type: Float32ArrayConstructor | Int32ArrayConstructor | Uint32ArrayConstructor
	size: number
	setter: (gl: GL, location: WebGLUniformLocation) => (v: number) => void
	arraySetter?: (gl: GL, location: WebGLUniformLocation) => (v: any) => void
}

interface UniformTypeInfoSampler {
	Type: null
	size: number
	setter: (
		gl: GL,
		type: number,
		unit: number,
		location: WebGLUniformLocation,
	) => (texture: Texture) => void
	arraySetter: (
		gl: GL,
		type: number,
		unit: number,
		location: WebGLUniformLocation,
		size: number,
	) => (textures: Texture[]) => void
	bindPoint: number
}

type UniformTypeInfo = UniformTypeInfoNumber | UniformTypeInfoSampler

function isSamplerInfo(info: UniformTypeInfo): info is UniformTypeInfoSampler {
	return info.Type === null
}

const typeMap: { [id: number]: UniformTypeInfo } = {
	[GL_TYPE.FLOAT]: {
		Type: Float32Array,
		size: 4,
		setter: floatSetter,
		arraySetter: floatArraySetter,
	},
	[GL_TYPE.FLOAT_VEC2]: {
		Type: Float32Array,
		size: 8,
		setter: floatVec2Setter,
	},
	[GL_TYPE.FLOAT_VEC3]: {
		Type: Float32Array,
		size: 12,
		setter: floatVec3Setter,
	},
	[GL_TYPE.FLOAT_VEC4]: {
		Type: Float32Array,
		size: 16,
		setter: floatVec4Setter,
	},
	[GL_TYPE.INT]: {
		Type: Int32Array,
		size: 4,
		setter: intSetter,
		arraySetter: intArraySetter,
	},
	[GL_TYPE.INT_VEC2]: { Type: Int32Array, size: 8, setter: intVec2Setter },
	[GL_TYPE.INT_VEC3]: { Type: Int32Array, size: 12, setter: intVec3Setter },
	[GL_TYPE.INT_VEC4]: { Type: Int32Array, size: 16, setter: intVec4Setter },
	[GL_TYPE.UNSIGNED_INT]: {
		Type: Uint32Array,
		size: 4,
		setter: uintSetter,
		arraySetter: uintArraySetter,
	},
	[GL_TYPE.UNSIGNED_INT_VEC2]: {
		Type: Uint32Array,
		size: 8,
		setter: uintVec2Setter,
	},
	[GL_TYPE.UNSIGNED_INT_VEC3]: {
		Type: Uint32Array,
		size: 12,
		setter: uintVec3Setter,
	},
	[GL_TYPE.UNSIGNED_INT_VEC4]: {
		Type: Uint32Array,
		size: 16,
		setter: uintVec4Setter,
	},
	[GL_TYPE.BOOL]: {
		Type: Uint32Array,
		size: 4,
		setter: intSetter,
		arraySetter: intArraySetter,
	},
	[GL_TYPE.BOOL_VEC2]: { Type: Uint32Array, size: 8, setter: intVec2Setter },
	[GL_TYPE.BOOL_VEC3]: { Type: Uint32Array, size: 12, setter: intVec3Setter },
	[GL_TYPE.BOOL_VEC4]: { Type: Uint32Array, size: 16, setter: intVec4Setter },
	[GL_TYPE.FLOAT_MAT2]: {
		Type: Float32Array,
		size: 16,
		setter: floatMat2Setter,
	},
	[GL_TYPE.FLOAT_MAT3]: {
		Type: Float32Array,
		size: 36,
		setter: floatMat3Setter,
	},
	[GL_TYPE.FLOAT_MAT4]: {
		Type: Float32Array,
		size: 64,
		setter: floatMat4Setter,
	},
	[GL_TYPE.FLOAT_MAT2X3]: {
		Type: Float32Array,
		size: 24,
		setter: floatMat23Setter,
	},
	[GL_TYPE.FLOAT_MAT2X4]: {
		Type: Float32Array,
		size: 32,
		setter: floatMat24Setter,
	},
	[GL_TYPE.FLOAT_MAT3X2]: {
		Type: Float32Array,
		size: 24,
		setter: floatMat32Setter,
	},
	[GL_TYPE.FLOAT_MAT3X4]: {
		Type: Float32Array,
		size: 48,
		setter: floatMat34Setter,
	},
	[GL_TYPE.FLOAT_MAT4X2]: {
		Type: Float32Array,
		size: 32,
		setter: floatMat42Setter,
	},
	[GL_TYPE.FLOAT_MAT4X3]: {
		Type: Float32Array,
		size: 48,
		setter: floatMat43Setter,
	},
	[GL_TYPE.SAMPLER_2D]: {
		Type: null,
		size: 0,
		setter: samplerSetter,
		arraySetter: samplerArraySetter,
		bindPoint: GL_TYPE.TEXTURE_2D,
	},
	[GL_TYPE.SAMPLER_CUBE]: {
		Type: null,
		size: 0,
		setter: samplerSetter,
		arraySetter: samplerArraySetter,
		bindPoint: GL_TYPE.TEXTURE_CUBE_MAP,
	},
	[GL_TYPE.SAMPLER_3D]: {
		Type: null,
		size: 0,
		setter: samplerSetter,
		arraySetter: samplerArraySetter,
		bindPoint: GL_TYPE.TEXTURE_3D,
	},
	[GL_TYPE.SAMPLER_2D_SHADOW]: {
		Type: null,
		size: 0,
		setter: samplerSetter,
		arraySetter: samplerArraySetter,
		bindPoint: GL_TYPE.TEXTURE_2D,
	},
	[GL_TYPE.SAMPLER_2D_ARRAY]: {
		Type: null,
		size: 0,
		setter: samplerSetter,
		arraySetter: samplerArraySetter,
		bindPoint: GL_TYPE.TEXTURE_2D_ARRAY,
	},
	[GL_TYPE.SAMPLER_2D_ARRAY_SHADOW]: {
		Type: null,
		size: 0,
		setter: samplerSetter,
		arraySetter: samplerArraySetter,
		bindPoint: GL_TYPE.TEXTURE_2D_ARRAY,
	},
	[GL_TYPE.SAMPLER_CUBE_SHADOW]: {
		Type: null,
		size: 0,
		setter: samplerSetter,
		arraySetter: samplerArraySetter,
		bindPoint: GL_TYPE.TEXTURE_CUBE_MAP,
	},
	[GL_TYPE.INT_SAMPLER_2D]: {
		Type: null,
		size: 0,
		setter: samplerSetter,
		arraySetter: samplerArraySetter,
		bindPoint: GL_TYPE.TEXTURE_2D,
	},
	[GL_TYPE.INT_SAMPLER_3D]: {
		Type: null,
		size: 0,
		setter: samplerSetter,
		arraySetter: samplerArraySetter,
		bindPoint: GL_TYPE.TEXTURE_3D,
	},
	[GL_TYPE.INT_SAMPLER_CUBE]: {
		Type: null,
		size: 0,
		setter: samplerSetter,
		arraySetter: samplerArraySetter,
		bindPoint: GL_TYPE.TEXTURE_CUBE_MAP,
	},
	[GL_TYPE.INT_SAMPLER_2D_ARRAY]: {
		Type: null,
		size: 0,
		setter: samplerSetter,
		arraySetter: samplerArraySetter,
		bindPoint: GL_TYPE.TEXTURE_2D_ARRAY,
	},
	[GL_TYPE.UNSIGNED_INT_SAMPLER_2D]: {
		Type: null,
		size: 0,
		setter: samplerSetter,
		arraySetter: samplerArraySetter,
		bindPoint: GL_TYPE.TEXTURE_2D,
	},
	[GL_TYPE.UNSIGNED_INT_SAMPLER_3D]: {
		Type: null,
		size: 0,
		setter: samplerSetter,
		arraySetter: samplerArraySetter,
		bindPoint: GL_TYPE.TEXTURE_3D,
	},
	[GL_TYPE.UNSIGNED_INT_SAMPLER_CUBE]: {
		Type: null,
		size: 0,
		setter: samplerSetter,
		arraySetter: samplerArraySetter,
		bindPoint: GL_TYPE.TEXTURE_CUBE_MAP,
	},
	[GL_TYPE.UNSIGNED_INT_SAMPLER_2D_ARRAY]: {
		Type: null,
		size: 0,
		setter: samplerSetter,
		arraySetter: samplerArraySetter,
		bindPoint: GL_TYPE.TEXTURE_2D_ARRAY,
	},
}

function floatAttribSetter(gl: GL, location: number, typeInfo: any) {
	return (b: AttribContext) => {
		gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer)
		gl.enableVertexAttribArray(location)
		gl.vertexAttribPointer(
			location,
			typeInfo.itemSize,
			GL_TYPE.FLOAT,
			b.normalize || false,
			b.stride || 0,
			b.offset || 0,
		)
	}
}

function intAttribSetter(gl: any, location: number, typeInfo: any) {
	return (b: AttribContext) => {
		gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer)
		gl.enableVertexAttribArray(location)
		gl.vertexAttribIPointer(
			location,
			typeInfo.itemSize,
			GL_TYPE.INT,
			b.stride || 0,
			b.offset || 0,
		)
	}
}

function matAttribSetter(gl: GL, location: number, typeInfo: any) {
	const defaultSize = typeInfo.size
	const count = typeInfo.count

	return (b: AttribContext) => {
		gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer)

		const numComponents = defaultSize
		const size = numComponents / count
		const typeInfo = typeMap[GL_TYPE.FLOAT]
		const stride = typeInfo.size * numComponents
		const normalize = b.normalize || false
		const offset = b.offset || 0
		const rowOffset = stride / count

		for (let i = 0; i < count; ++i) {
			gl.enableVertexAttribArray(location + i)
			gl.vertexAttribPointer(
				location + i,
				size,
				GL_TYPE.FLOAT,
				normalize,
				stride,
				offset + rowOffset * i,
			)
		}
	}
}

interface AttribTypeInfoNumber {
	size: number
	setter: (
		gl: GL,
		location: number,
		typeInfo: any,
	) => (b: AttribContext) => void
	itemSize: number
}

interface AttribTypeInfoMat {
	size: number
	setter: (
		gl: GL,
		location: number,
		typeInfo: any,
	) => (b: AttribContext) => void
	count: number
}

type AttribTypeInfo = AttribTypeInfoNumber | AttribTypeInfoMat

const attrTypeMap: { [id: number]: AttribTypeInfo } = {
	[GL_TYPE.FLOAT]: { size: 4, setter: floatAttribSetter, itemSize: 1 },
	[GL_TYPE.FLOAT_VEC2]: { size: 8, setter: floatAttribSetter, itemSize: 2 },
	[GL_TYPE.FLOAT_VEC3]: { size: 12, setter: floatAttribSetter, itemSize: 3 },
	[GL_TYPE.FLOAT_VEC4]: { size: 16, setter: floatAttribSetter, itemSize: 4 },
	[GL_TYPE.INT]: { size: 4, setter: intAttribSetter, itemSize: 1 },
	[GL_TYPE.INT_VEC2]: { size: 8, setter: intAttribSetter, itemSize: 2 },
	[GL_TYPE.INT_VEC3]: { size: 12, setter: intAttribSetter, itemSize: 3 },
	[GL_TYPE.INT_VEC4]: { size: 16, setter: intAttribSetter, itemSize: 4 },
	[GL_TYPE.UNSIGNED_INT]: { size: 4, setter: intAttribSetter, itemSize: 1 },
	[GL_TYPE.UNSIGNED_INT_VEC2]: {
		size: 8,
		setter: intAttribSetter,
		itemSize: 2,
	},
	[GL_TYPE.UNSIGNED_INT_VEC3]: {
		size: 12,
		setter: intAttribSetter,
		itemSize: 3,
	},
	[GL_TYPE.UNSIGNED_INT_VEC4]: {
		size: 16,
		setter: intAttribSetter,
		itemSize: 4,
	},
	[GL_TYPE.BOOL]: { size: 4, setter: intAttribSetter, itemSize: 1 },
	[GL_TYPE.BOOL_VEC2]: { size: 8, setter: intAttribSetter, itemSize: 2 },
	[GL_TYPE.BOOL_VEC3]: { size: 12, setter: intAttribSetter, itemSize: 3 },
	[GL_TYPE.BOOL_VEC4]: { size: 16, setter: intAttribSetter, itemSize: 4 },
	[GL_TYPE.FLOAT_MAT2]: { size: 4, setter: matAttribSetter, count: 2 },
	[GL_TYPE.FLOAT_MAT3]: { size: 9, setter: matAttribSetter, count: 3 },
	[GL_TYPE.FLOAT_MAT4]: { size: 16, setter: matAttribSetter, count: 4 },
}

export function createUniformSetters(gl: GL, program: WebGLProgram) {
	let textureUnit = 0

	function createUniformSetter(
		program: WebGLProgram,
		uniformInfo: WebGLActiveInfo,
	) {
		const location = gl.getUniformLocation(program, uniformInfo.name)
		const isArray =
			uniformInfo.size > 1 && uniformInfo.name.substr(-3) === '[0]'
		const type = uniformInfo.type
		const typeInfo = typeMap[type]

		if (!typeInfo) {
			throw new Error('unknown type: 0x' + type.toString(16)) // we should never get here.
		}
		if (location == null) {
			return
		}

		let setter: (val: any) => void

		if (isSamplerInfo(typeInfo)) {
			// it's a sampler
			const unit = textureUnit
			textureUnit += uniformInfo.size
			if (isArray) {
				setter = typeInfo.arraySetter(
					gl,
					type,
					unit,
					location,
					uniformInfo.size,
				)
			} else {
				setter = typeInfo.setter(gl, type, unit, location)
			}
		} else {
			if (typeInfo.arraySetter && isArray) {
				setter = typeInfo.arraySetter(gl, location)
			} else {
				setter = typeInfo.setter(gl, location)
			}
		}

		return { setter, location }
	}

	const uniformSetters: { [id: string]: UniformSetter } = {}
	const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)

	for (let i = 0; i < numUniforms; ++i) {
		const uniformInfo = gl.getActiveUniform(program, i)
		if (!uniformInfo) {
			continue
		}
		let name = uniformInfo.name
		// remove the array suffix.
		if (name.substr(-3) === '[0]') {
			name = name.substr(0, name.length - 3)
		}
		if (program) {
			const setter = createUniformSetter(program, uniformInfo)
			if (setter) {
				uniformSetters[name] = setter
			}
		}
	}

	return uniformSetters
}

export function createAttributeSetters(gl: GL, program: WebGLProgram) {
	const attribSetters: { [id: string]: AttribSetter } = {}

	const numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES)
	for (let i = 0; i < numAttribs; i++) {
		const attribInfo = gl.getActiveAttrib(program, i)
		if (!attribInfo) {
			break
		}
		const location = gl.getAttribLocation(program, attribInfo.name)
		const typeInfo = attrTypeMap[attribInfo.type]
		const setter = typeInfo.setter(gl, location, typeInfo)
		attribSetters[attribInfo.name] = { setter, location }
	}

	return attribSetters
}

// Type helpers

export const glTypeToTypedArray = {
	[GL_TYPE.BYTE]: Int8Array,
	[GL_TYPE.UNSIGNED_BYTE]: Uint8Array,
	[GL_TYPE.SHORT]: Int16Array,
	[GL_TYPE.UNSIGNED_SHORT]: Uint16Array,
	[GL_TYPE.INT]: Int32Array,
	[GL_TYPE.UNSIGNED_INT]: Uint32Array,
	[GL_TYPE.FLOAT]: Float32Array,
	[GL_TYPE.UNSIGNED_SHORT_4_4_4_4]: Uint16Array,
	[GL_TYPE.UNSIGNED_SHORT_5_5_5_1]: Uint16Array,
	[GL_TYPE.UNSIGNED_SHORT_5_6_5]: Uint16Array,
	[GL_TYPE.HALF_FLOAT]: Uint16Array,
	[GL_TYPE.UNSIGNED_INT_2_10_10_10_REV]: Uint32Array,
	[GL_TYPE.UNSIGNED_INT_10F_11F_11F_REV]: Uint32Array,
	[GL_TYPE.UNSIGNED_INT_5_9_9_9_REV]: Uint32Array,
	[GL_TYPE.FLOAT_32_UNSIGNED_INT_24_8_REV]: Uint32Array,
	[GL_TYPE.UNSIGNED_INT_24_8]: Uint32Array,
}

export function getGLTypeForTypedArray(typedArray: any) {
	if (typedArray instanceof Int8Array) {
		return GL_TYPE.BYTE
	}
	if (typedArray instanceof Uint8Array) {
		return GL_TYPE.UNSIGNED_BYTE
	}
	if (typedArray instanceof Uint8ClampedArray) {
		return GL_TYPE.UNSIGNED_BYTE
	}
	if (typedArray instanceof Int16Array) {
		return GL_TYPE.SHORT
	}
	if (typedArray instanceof Uint16Array) {
		return GL_TYPE.UNSIGNED_SHORT
	}
	if (typedArray instanceof Int32Array) {
		return GL_TYPE.INT
	}
	if (typedArray instanceof Uint32Array) {
		return GL_TYPE.UNSIGNED_INT
	}
	if (typedArray instanceof Float32Array) {
		return GL_TYPE.FLOAT
	}
	throw new Error('unsupported typed array type')
}

export function getGLTypeForTypedArrayType(typedArrayType: any) {
	if (typedArrayType === Int8Array) {
		return GL_TYPE.BYTE
	}
	if (typedArrayType === Uint8Array) {
		return GL_TYPE.UNSIGNED_BYTE
	}
	if (typedArrayType === Uint8ClampedArray) {
		return GL_TYPE.UNSIGNED_BYTE
	}
	if (typedArrayType === Int16Array) {
		return GL_TYPE.SHORT
	}
	if (typedArrayType === Uint16Array) {
		return GL_TYPE.UNSIGNED_SHORT
	}
	if (typedArrayType === Int32Array) {
		return GL_TYPE.INT
	}
	if (typedArrayType === Uint32Array) {
		return GL_TYPE.UNSIGNED_INT
	}
	if (typedArrayType === Float32Array) {
		return GL_TYPE.FLOAT
	}
	throw new Error('unsupported typed array type')
}

// Settings

export function applyDrawSettings(gl: GL, settings: DrawSettings) {
	if (settings.enable) {
		for (const setting of settings.enable) {
			gl.enable(setting)
		}
	}

	if (settings.disable) {
		for (const setting of settings.disable) {
			gl.disable(setting)
		}
	}

	if (settings.blendFunc) {
		gl.blendFunc.apply(gl, settings.blendFunc)
	}

	if (settings.depthFunc != null) {
		gl.depthFunc(settings.depthFunc)
	}

	if (settings.cullFace != null) {
		gl.cullFace(settings.cullFace)
	}

	if (settings.frontFace != null) {
		gl.frontFace(settings.frontFace)
	}

	if (settings.lineWidth != null) {
		gl.lineWidth(settings.lineWidth)
	}

	if (settings.colorMask) {
		gl.colorMask.apply(gl, settings.colorMask)
	}

	if (settings.depthMask != null) {
		gl.depthMask(settings.depthMask)
	}

	if (settings.clearColor) {
		gl.clearColor.apply(gl, settings.clearColor)
	}

	if (settings.clearDepth != null) {
		gl.clearDepth(settings.clearDepth)
	}

	if (settings.clearBits != null) {
		gl.clear(settings.clearBits)
	}
}

export function revertDrawSettings(gl: GL, settings: DrawSettings) {
	if (settings.enable) {
		for (const setting of settings.enable) {
			gl.disable(setting)
		}
	}

	if (settings.disable) {
		for (const setting of settings.disable) {
			gl.enable(setting)
		}
	}
}
