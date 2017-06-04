import { GL } from './renderer-types'
import { AttribContext, Geometry } from './geometry'
import { RenderObject } from './render-object'


export interface ShaderData {
	readonly vert: string
	readonly frag: string
}


export interface UniformSetter {
	location: WebGLUniformLocation
	setter: (val: any) => void
}


export interface AttribSetter {
	location: number
	setter: (ctx: AttribContext) => void
}


export class Shader extends RenderObject {

	program: WebGLProgram | null
	vert: WebGLShader | null
	frag: WebGLShader | null
	uniformSetters: { [id: string]: UniformSetter }
	attributeSetters: { [id: string]: AttribSetter }


	constructor(gl: GL | null) {
		super(gl)
		this.init()
	}

	private init () {
		const gl = this.gl
		this.program = gl.createProgram()
		this.frag = gl.createShader(gl.FRAGMENT_SHADER)
		this.vert = gl.createShader(gl.VERTEX_SHADER)
		gl.attachShader(this.program, this.vert)
		gl.attachShader(this.program, this.frag)
	}

	update (data: ShaderData) {

		const gl = this.gl

		gl.shaderSource(this.vert, data.vert.trim())
		gl.shaderSource(this.frag, data.frag.trim())
		gl.compileShader(this.vert)
		gl.compileShader(this.frag)

		if (!gl.getShaderParameter(this.vert, gl.COMPILE_STATUS)) {
			console.error(
				'Error Compiling Vertex Shader!\n',
				gl.getShaderInfoLog(this.vert),
				addLineNumbers(data.vert)
			)
		}
		if (!gl.getShaderParameter(this.frag, gl.COMPILE_STATUS)) {
			console.error(
				'Error Compiling Fragment Shader!\n',
				gl.getShaderInfoLog(this.frag),
				addLineNumbers(data.frag)
			)
		}

		gl.linkProgram(this.program)

		const linked = gl.getProgramParameter(this.program, gl.LINK_STATUS)
		if (!linked) {
			const lastError = gl.getProgramInfoLog(this.program)
			console.error('Error in program linking:', lastError)
		}

		this.uniformSetters = createUniformSetters(this.gl, this.program)
		this.attributeSetters = createAttributeSetters(this.gl, this.program)
	}

	delete () {
		this.gl.deleteProgram(this.program)
		this.gl.deleteShader(this.frag)
		this.gl.deleteShader(this.vert)
	}

	setGeometry (geometry: Geometry) {
		for (const name in geometry.attribs) {
			const setter = this.attributeSetters[name]
			if (setter) {
				setter.setter(geometry.attribs[name])
			}
		}
	}

	setUniforms (values: any) {
		for (const name in values) {
			const setter = this.uniformSetters[name]
			if (setter) {
				setter.setter(values[name])
			}
		}
	}
}


function addLineNumbers (src: string) {
	return src.trim().split('\n')
		.map((line, i) => (i + 1) + ': ' + line)
		.join('\n')
}


/*
 * Copyright 2015, Gregg Tavares.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Gregg Tavares. nor the names of his
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


const FLOAT = 0x1406
const FLOAT_VEC2 = 0x8B50
const FLOAT_VEC3 = 0x8B51
const FLOAT_VEC4 = 0x8B52
const INT = 0x1404
const INT_VEC2 = 0x8B53
const INT_VEC3 = 0x8B54
const INT_VEC4 = 0x8B55
const BOOL = 0x8B56
const BOOL_VEC2 = 0x8B57
const BOOL_VEC3 = 0x8B58
const BOOL_VEC4 = 0x8B59
const FLOAT_MAT2 = 0x8B5A
const FLOAT_MAT3 = 0x8B5B
const FLOAT_MAT4 = 0x8B5C
const SAMPLER_2D = 0x8B5E
const SAMPLER_CUBE = 0x8B60
const SAMPLER_3D = 0x8B5F
const SAMPLER_2D_SHADOW = 0x8B62
const FLOAT_MAT2X3 = 0x8B65
const FLOAT_MAT2X4 = 0x8B66
const FLOAT_MAT3X2 = 0x8B67
const FLOAT_MAT3X4 = 0x8B68
const FLOAT_MAT4X2 = 0x8B69
const FLOAT_MAT4X3 = 0x8B6A
const SAMPLER_2D_ARRAY = 0x8DC1
const SAMPLER_2D_ARRAY_SHADOW = 0x8DC4
const SAMPLER_CUBE_SHADOW = 0x8DC5
const UNSIGNED_INT = 0x1405
const UNSIGNED_INT_VEC2 = 0x8DC6
const UNSIGNED_INT_VEC3 = 0x8DC7
const UNSIGNED_INT_VEC4 = 0x8DC8
const INT_SAMPLER_2D = 0x8DCA
const INT_SAMPLER_3D = 0x8DCB
const INT_SAMPLER_CUBE = 0x8DCC
const INT_SAMPLER_2D_ARRAY = 0x8DCF
const UNSIGNED_INT_SAMPLER_2D = 0x8DD2
const UNSIGNED_INT_SAMPLER_3D = 0x8DD3
const UNSIGNED_INT_SAMPLER_CUBE = 0x8DD4
const UNSIGNED_INT_SAMPLER_2D_ARRAY = 0x8DD7

const TEXTURE_2D = 0x0DE1
const TEXTURE_CUBE_MAP = 0x8513
const TEXTURE_3D = 0x806F
const TEXTURE_2D_ARRAY = 0x8C1A

/**
 * Returns the corresponding bind point for a given sampler type
 */
function getBindPointForSamplerType (type: number){
	return (typeMap[type] as UniformTypeInfoSampler).bindPoint
}

// This kind of sucks! If you could compose functions as in `var fn = gl[name];`
// this code could be a lot smaller but that is sadly really slow (T_T)

function floatSetter (gl: GL, location: WebGLUniformLocation) {
	return function(v: number) {
		gl.uniform1f(location, v)
	}
}

function floatArraySetter (gl: GL, location: WebGLUniformLocation) {
	return function(v: any) {
		gl.uniform1fv(location, v)
	}
}

function floatVec2Setter (gl: GL, location: WebGLUniformLocation) {
	return function(v: any) {
		gl.uniform2fv(location, v)
	}
}

function floatVec3Setter (gl: GL, location: WebGLUniformLocation) {
	return function(v: any) {
		gl.uniform3fv(location, v)
	}
}

function floatVec4Setter (gl: GL, location: WebGLUniformLocation) {
	return function(v: any) {
		gl.uniform4fv(location, v)
	}
}

function intSetter (gl: GL, location: WebGLUniformLocation) {
	return function(v: any) {
		gl.uniform1i(location, v)
	}
}

function intArraySetter (gl: GL, location: WebGLUniformLocation) {
	return function(v: any) {
		gl.uniform1iv(location, v)
	}
}

function intVec2Setter (gl: GL, location: WebGLUniformLocation) {
	return function(v: any) {
		gl.uniform2iv(location, v)
	}
}

function intVec3Setter (gl: GL, location: WebGLUniformLocation) {
	return function(v: any) {
		gl.uniform3iv(location, v)
	}
}

function intVec4Setter (gl: GL, location: WebGLUniformLocation) {
	return function(v: any) {
		gl.uniform4iv(location, v)
	}
}

function uintSetter (gl: any, location: WebGLUniformLocation) {
	return function(v: any) {
		gl.uniform1ui(location, v)
	}
}

function uintArraySetter (gl: any, location: WebGLUniformLocation) {
	return function(v: any) {
		gl.uniform1uiv(location, v)
	}
}

function uintVec2Setter (gl: any, location: WebGLUniformLocation) {
	return function(v: any) {
		gl.uniform2uiv(location, v)
	}
}

function uintVec3Setter (gl: any, location: WebGLUniformLocation) {
	return function(v: any) {
		gl.uniform3uiv(location, v)
	}
}

function uintVec4Setter (gl: any, location: WebGLUniformLocation) {
	return function(v: any) {
		gl.uniform4uiv(location, v)
	}
}

function floatMat2Setter (gl: GL, location: WebGLUniformLocation) {
	return function(v: any) {
		gl.uniformMatrix2fv(location, false, v)
	}
}

function floatMat3Setter (gl: GL, location: WebGLUniformLocation) {
	return function(v: any) {
		gl.uniformMatrix3fv(location, false, v)
	}
}

function floatMat4Setter (gl: GL, location: WebGLUniformLocation) {
	return function(v: any) {
		gl.uniformMatrix4fv(location, false, v)
	}
}

function floatMat23Setter (gl: any, location: WebGLUniformLocation) {
	return function(v: any) {
		gl.uniformMatrix2x3fv(location, false, v)
	}
}

function floatMat32Setter (gl: any, location: WebGLUniformLocation) {
	return function(v: any) {
		gl.uniformMatrix3x2fv(location, false, v)
	}
}

function floatMat24Setter (gl: any, location: WebGLUniformLocation) {
	return function(v: any) {
		gl.uniformMatrix2x4fv(location, false, v)
	}
}

function floatMat42Setter (gl: any, location: WebGLUniformLocation) {
	return function(v: any) {
		gl.uniformMatrix4x2fv(location, false, v)
	}
}

function floatMat34Setter (gl: any, location: WebGLUniformLocation) {
	return function(v: any) {
		gl.uniformMatrix3x4fv(location, false, v)
	}
}


function floatMat43Setter (gl: any, location: WebGLUniformLocation) {
	return function(v: any) {
		gl.uniformMatrix4x3fv(location, false, v)
	}
}


function samplerSetter (gl: GL, type: number, unit: number, location: WebGLUniformLocation) {
	const bindPoint = getBindPointForSamplerType(type)
	return function(texture: WebGLTexture) {
		gl.uniform1i(location, unit)
		gl.activeTexture(gl.TEXTURE0 + unit)
		gl.bindTexture(bindPoint, texture)
	}
}


function samplerArraySetter (gl: GL, type: number, unit: number, location: WebGLUniformLocation, size: number) {
	const bindPoint = getBindPointForSamplerType(type)
	const units = new Int32Array(size)
	for (let i = 0; i < size; ++i) {
		units[i] = unit + i
	}

	return function(textures: WebGLTexture[]) {
		gl.uniform1iv(location, units)
		for (const index in textures) {
			gl.activeTexture(gl.TEXTURE0 + units[index])
			gl.bindTexture(bindPoint, textures[index])
		}
	}
}


interface UniformTypeInfoNumber {
	Type: Float32ArrayConstructor | Int32ArrayConstructor | Uint32ArrayConstructor
	size: number
	setter: (gl: WebGLRenderingContext, location: WebGLUniformLocation) => (v: number) => void
	arraySetter?: (gl: WebGLRenderingContext, location: WebGLUniformLocation) => (v: any) => void
}

interface UniformTypeInfoSampler {
	Type: null
	size: number
	setter: (gl: WebGLRenderingContext, type: number, unit: number, location: WebGLUniformLocation) => (texture: WebGLTexture) => void
	arraySetter: (gl: WebGLRenderingContext, type: number, unit: number, location: WebGLUniformLocation, size: number) => (textures: WebGLTexture[]) => void
	bindPoint: number
}

type UniformTypeInfo = UniformTypeInfoNumber | UniformTypeInfoSampler

function isSamplerInfo (info: UniformTypeInfo): info is UniformTypeInfoSampler {
	return info.Type === null
}

const typeMap: {[id: number]: UniformTypeInfo} = {
	[FLOAT]: { Type: Float32Array, size: 4, setter: floatSetter, arraySetter: floatArraySetter },
	[FLOAT_VEC2]: { Type: Float32Array, size: 8, setter: floatVec2Setter },
	[FLOAT_VEC3]: { Type: Float32Array, size: 12, setter: floatVec3Setter },
	[FLOAT_VEC4]: { Type: Float32Array, size: 16, setter: floatVec4Setter },
	[INT]: { Type: Int32Array, size: 4, setter: intSetter, arraySetter: intArraySetter },
	[INT_VEC2]: { Type: Int32Array, size: 8, setter: intVec2Setter },
	[INT_VEC3]: { Type: Int32Array, size: 12, setter: intVec3Setter },
	[INT_VEC4]: { Type: Int32Array, size: 16, setter: intVec4Setter },
	[UNSIGNED_INT]: { Type: Uint32Array, size: 4, setter: uintSetter, arraySetter: uintArraySetter },
	[UNSIGNED_INT_VEC2]: { Type: Uint32Array, size: 8, setter: uintVec2Setter },
	[UNSIGNED_INT_VEC3]: { Type: Uint32Array, size: 12, setter: uintVec3Setter },
	[UNSIGNED_INT_VEC4]: { Type: Uint32Array, size: 16, setter: uintVec4Setter },
	[BOOL]: { Type: Uint32Array, size: 4, setter: intSetter, arraySetter: intArraySetter },
	[BOOL_VEC2]: { Type: Uint32Array, size: 8, setter: intVec2Setter },
	[BOOL_VEC3]: { Type: Uint32Array, size: 12, setter: intVec3Setter },
	[BOOL_VEC4]: { Type: Uint32Array, size: 16, setter: intVec4Setter },
	[FLOAT_MAT2]: { Type: Float32Array, size: 16, setter: floatMat2Setter },
	[FLOAT_MAT3]: { Type: Float32Array, size: 36, setter: floatMat3Setter },
	[FLOAT_MAT4]: { Type: Float32Array, size: 64, setter: floatMat4Setter },
	[FLOAT_MAT2X3]: { Type: Float32Array, size: 24, setter: floatMat23Setter },
	[FLOAT_MAT2X4]: { Type: Float32Array, size: 32, setter: floatMat24Setter },
	[FLOAT_MAT3X2]: { Type: Float32Array, size: 24, setter: floatMat32Setter },
	[FLOAT_MAT3X4]: { Type: Float32Array, size: 48, setter: floatMat34Setter },
	[FLOAT_MAT4X2]: { Type: Float32Array, size: 32, setter: floatMat42Setter },
	[FLOAT_MAT4X3]: { Type: Float32Array, size: 48, setter: floatMat43Setter },
	[SAMPLER_2D]: { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D },
	[SAMPLER_CUBE]: { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP },
	[SAMPLER_3D]: { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D },
	[SAMPLER_2D_SHADOW]: { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D },
	[SAMPLER_2D_ARRAY]: { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY },
	[SAMPLER_2D_ARRAY_SHADOW]: { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY },
	[SAMPLER_CUBE_SHADOW]: { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP },
	[INT_SAMPLER_2D]: { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D },
	[INT_SAMPLER_3D]: { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D },
	[INT_SAMPLER_CUBE]: { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP },
	[INT_SAMPLER_2D_ARRAY]: { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY },
	[UNSIGNED_INT_SAMPLER_2D]: { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D },
	[UNSIGNED_INT_SAMPLER_3D]: { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D },
	[UNSIGNED_INT_SAMPLER_CUBE]: { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP },
	[UNSIGNED_INT_SAMPLER_2D_ARRAY]: { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY }
}


function floatAttribSetter (gl: GL, location: number, typeInfo: any) {
	return function(b: AttribContext) {
		gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer)
		gl.enableVertexAttribArray(location)
		gl.vertexAttribPointer(
			location, typeInfo.itemSize, FLOAT, b.normalize || false, b.stride || 0, b.offset || 0
		)
	}
}


function intAttribSetter (gl: any, location: number, typeInfo: any) {
	return function(b: AttribContext) {
		gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer)
		gl.enableVertexAttribArray(location)
		gl.vertexAttribIPointer(
			location, typeInfo.itemSize, INT, b.stride || 0, b.offset || 0
		)
	}
}


function matAttribSetter (gl: GL, location: number, typeInfo: any) {
	const defaultSize = typeInfo.size
	const count = typeInfo.count

	return function(b: AttribContext) {
		gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer)

		const numComponents = defaultSize
		const size = numComponents / count
		const typeInfo = typeMap[FLOAT]
		const stride = typeInfo.size * numComponents
		const normalize = b.normalize || false
		const offset = b.offset || 0
		const rowOffset = stride / count

		for (let i = 0; i < count; ++i) {
			gl.enableVertexAttribArray(location + i)
			gl.vertexAttribPointer(
				location + i, size, FLOAT, normalize, stride, offset + rowOffset * i
			)
		}
	}
}


interface AttribTypeInfoNumber {
	size: number
	setter: (gl: WebGLRenderingContext, location: number, typeInfo: any) => (b: AttribContext) => void
	itemSize: number
}

interface AttribTypeInfoMat {
	size: number
	setter: (gl: WebGLRenderingContext, location: number, typeInfo: any) => (b: AttribContext) => void
	count: number
}

type AttribTypeInfo = AttribTypeInfoNumber | AttribTypeInfoMat


const attrTypeMap: {[id: number]: AttribTypeInfo} = {
	[FLOAT]: { size: 4, setter: floatAttribSetter, itemSize: 1 },
	[FLOAT_VEC2]: { size: 8, setter: floatAttribSetter, itemSize: 2 },
	[FLOAT_VEC3]: { size: 12, setter: floatAttribSetter, itemSize: 3 },
	[FLOAT_VEC4]: { size: 16, setter: floatAttribSetter, itemSize: 4 },
	[INT]: { size: 4, setter: intAttribSetter, itemSize: 1 },
	[INT_VEC2]: { size: 8, setter: intAttribSetter, itemSize: 2 },
	[INT_VEC3]: { size: 12, setter: intAttribSetter, itemSize: 3 },
	[INT_VEC4]: { size: 16, setter: intAttribSetter, itemSize: 4 },
	[UNSIGNED_INT]: { size: 4, setter: intAttribSetter, itemSize: 1 },
	[UNSIGNED_INT_VEC2]: { size: 8, setter: intAttribSetter, itemSize: 2 },
	[UNSIGNED_INT_VEC3]: { size: 12, setter: intAttribSetter, itemSize: 3 },
	[UNSIGNED_INT_VEC4]: { size: 16, setter: intAttribSetter, itemSize: 4 },
	[BOOL]: { size: 4, setter: intAttribSetter, itemSize: 1 },
	[BOOL_VEC2]: { size: 8, setter: intAttribSetter, itemSize: 2 },
	[BOOL_VEC3]: { size: 12, setter: intAttribSetter, itemSize: 3 },
	[BOOL_VEC4]: { size: 16, setter: intAttribSetter, itemSize: 4 },
	[FLOAT_MAT2]: { size: 4, setter: matAttribSetter, count: 2 },
	[FLOAT_MAT3]: { size: 9, setter: matAttribSetter, count: 3 },
	[FLOAT_MAT4]: { size: 16, setter: matAttribSetter, count: 4 }
}



function createUniformSetters (gl: GL, program: WebGLProgram | null) {
	let textureUnit = 0

	function createUniformSetter (program: WebGLProgram, uniformInfo: WebGLActiveInfo) {
		const location = gl.getUniformLocation(program, uniformInfo.name)
		const isArray = (uniformInfo.size > 1 && uniformInfo.name.substr(-3) === '[0]')
		const type = uniformInfo.type
		const typeInfo = typeMap[type]

		if (!typeInfo) {
			throw ('unknown type: 0x' + type.toString(16)) // we should never get here.
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
				setter = typeInfo.arraySetter(gl, type, unit, location, uniformInfo.size)
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

	const uniformSetters: {[id: string]: UniformSetter} = {}
	const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)

	for (let i = 0; i < numUniforms; ++i) {
		const uniformInfo = gl.getActiveUniform(program, i)
		if (!uniformInfo) {
			break
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


function createAttributeSetters (gl: GL, program: WebGLProgram | null) {
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
