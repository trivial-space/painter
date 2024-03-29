export const GEOMETRY_PROP_POSITION = 'position'
export const GEOMETRY_PROP_NORMAL = 'normal'
export const GEOMETRY_PROP_UV = 'uv'

export const UNIFORM_SOURCE_TEXTURE = 'source'
export const VARYING_UV_COORDS = 'coords'

export const GL_TYPE = {
	FLOAT: 0x1406,
	FLOAT_VEC2: 0x8b50,
	FLOAT_VEC3: 0x8b51,
	FLOAT_VEC4: 0x8b52,
	INT: 0x1404,
	INT_VEC2: 0x8b53,
	INT_VEC3: 0x8b54,
	INT_VEC4: 0x8b55,
	BOOL: 0x8b56,
	BOOL_VEC2: 0x8b57,
	BOOL_VEC3: 0x8b58,
	BOOL_VEC4: 0x8b59,
	FLOAT_MAT2: 0x8b5a,
	FLOAT_MAT3: 0x8b5b,
	FLOAT_MAT4: 0x8b5c,
	SAMPLER_2D: 0x8b5e,
	SAMPLER_CUBE: 0x8b60,
	SAMPLER_3D: 0x8b5f,
	SAMPLER_2D_SHADOW: 0x8b62,
	FLOAT_MAT2X3: 0x8b65,
	FLOAT_MAT2X4: 0x8b66,
	FLOAT_MAT3X2: 0x8b67,
	FLOAT_MAT3X4: 0x8b68,
	FLOAT_MAT4X2: 0x8b69,
	FLOAT_MAT4X3: 0x8b6a,
	SAMPLER_2D_ARRAY: 0x8dc1,
	SAMPLER_2D_ARRAY_SHADOW: 0x8dc4,
	SAMPLER_CUBE_SHADOW: 0x8dc5,
	UNSIGNED_INT: 0x1405,
	UNSIGNED_INT_VEC2: 0x8dc6,
	UNSIGNED_INT_VEC3: 0x8dc7,
	UNSIGNED_INT_VEC4: 0x8dc8,
	INT_SAMPLER_2D: 0x8dca,
	INT_SAMPLER_3D: 0x8dcb,
	INT_SAMPLER_CUBE: 0x8dcc,
	INT_SAMPLER_2D_ARRAY: 0x8dcf,
	UNSIGNED_INT_SAMPLER_2D: 0x8dd2,
	UNSIGNED_INT_SAMPLER_3D: 0x8dd3,
	UNSIGNED_INT_SAMPLER_CUBE: 0x8dd4,
	UNSIGNED_INT_SAMPLER_2D_ARRAY: 0x8dd7,

	TEXTURE_2D: 0x0de1,
	TEXTURE_CUBE_MAP: 0x8513,
	TEXTURE_3D: 0x806f,
	TEXTURE_2D_ARRAY: 0x8c1a,

	BYTE: 0x1400,
	UNSIGNED_BYTE: 0x1401,
	SHORT: 0x1402,
	UNSIGNED_SHORT: 0x1403,
	UNSIGNED_SHORT_4_4_4_4: 0x8033,
	UNSIGNED_SHORT_5_5_5_1: 0x8034,
	UNSIGNED_SHORT_5_6_5: 0x8363,
	HALF_FLOAT: 0x140b,
	UNSIGNED_INT_2_10_10_10_REV: 0x8368,
	UNSIGNED_INT_10F_11F_11F_REV: 0x8c3b,
	UNSIGNED_INT_5_9_9_9_REV: 0x8c3e,
	FLOAT_32_UNSIGNED_INT_24_8_REV: 0x8dad,
	UNSIGNED_INT_24_8: 0x84fa,
} as const

export const TEXTURE_FORMAT = {
	RED: 0x1903,
	RG: 0x8227,
	RGB: 0x1907,
	RGBA: 0x1908,

	RED_INTEGER: 0x8d94,
	RG_INTEGER: 0x8228,
	RGB_INTEGER: 0x8d98,
	RGBA_INTEGER: 0x8d99,

	DEPTH_COMPONENT: 0x1902,
} as const

export const TEXTURE_FORMAT_INTERNAL = {
	R8: 0x8229,
	RG8: 0x822b,
	RGB8: 0x8051,
	RGBA8: 0x8058,
	R16F: 0x822d,
	RG16F: 0x822f,
	RGB16F: 0x881b,
	RGBA16F: 0x881a,
	R32F: 0x822e,
	RG32F: 0x8230,
	RGB32F: 0x8815,
	RGBA32F: 0x8814,
	R8I: 0x8231,
	RG8I: 0x8237,
	RGB8I: 0x8d8f,
	RGBA8I: 0x8d8e,
	R8UI: 0x8232,
	RG8UI: 0x8238,
	RGB8UI: 0x8d7d,
	RGBA8UI: 0x8d7c,
	R16I: 0x8233,
	RG16I: 0x8239,
	RGB16I: 0x8d89,
	RGBA16I: 0x8d88,
	R16UI: 0x8234,
	RG16UI: 0x823a,
	RGB16UI: 0x8d77,
	RGBA16UI: 0x8d76,
	R32I: 0x8235,
	RG32I: 0x823b,
	RGB32I: 0x8d83,
	RGBA32I: 0x8d82,
	R32UI: 0x8236,
	RG32UI: 0x823c,
	RGB32UI: 0x8d71,
	RGBA32UI: 0x8d70,
	RGB10_A2: 0x8059,
	RGB10_A2UI: 0x906f,
	SRGB: 0x8c40,
	SRGB8: 0x8c41,
	SRGB8_ALPHA8: 0x8c43,
	R8_SNORM: 0x8f94,
	RG8_SNORM: 0x8f95,
	RGB8_SNORM: 0x8f96,
	RGBA8_SNORM: 0x8f97,

	DEPTH_COMPONENT16: 0x81a5,
	DEPTH_COMPONENT24: 0x81a6,
	DEPTH_COMPONENT32F: 0x8cac,
} as const

export const TEXTURE_FORMAT_DEFAULTS = {
	[GL_TYPE.UNSIGNED_BYTE]: {
		[TEXTURE_FORMAT.RED]: TEXTURE_FORMAT_INTERNAL.R8,
		[TEXTURE_FORMAT.RG]: TEXTURE_FORMAT_INTERNAL.RG8,
		[TEXTURE_FORMAT.RGB]: TEXTURE_FORMAT_INTERNAL.RGB8,
		[TEXTURE_FORMAT.RGBA]: TEXTURE_FORMAT_INTERNAL.RGBA8,
	},

	[GL_TYPE.UNSIGNED_SHORT]: {
		[TEXTURE_FORMAT.DEPTH_COMPONENT]: TEXTURE_FORMAT_INTERNAL.DEPTH_COMPONENT16,
		[TEXTURE_FORMAT.RED]: TEXTURE_FORMAT_INTERNAL.R16UI,
		[TEXTURE_FORMAT.RG]: TEXTURE_FORMAT_INTERNAL.RG16UI,
		[TEXTURE_FORMAT.RGB]: TEXTURE_FORMAT_INTERNAL.RGB16UI,
		[TEXTURE_FORMAT.RGBA]: TEXTURE_FORMAT_INTERNAL.RGBA16UI,
	},

	[GL_TYPE.UNSIGNED_INT]: {
		[TEXTURE_FORMAT.DEPTH_COMPONENT]: TEXTURE_FORMAT_INTERNAL.DEPTH_COMPONENT24,
		[TEXTURE_FORMAT.RED]: TEXTURE_FORMAT_INTERNAL.R32UI,
		[TEXTURE_FORMAT.RG]: TEXTURE_FORMAT_INTERNAL.RG32UI,
		[TEXTURE_FORMAT.RGB]: TEXTURE_FORMAT_INTERNAL.RGB32UI,
		[TEXTURE_FORMAT.RGBA]: TEXTURE_FORMAT_INTERNAL.RGBA32UI,
	},

	[GL_TYPE.FLOAT]: {
		[TEXTURE_FORMAT.RED]: TEXTURE_FORMAT_INTERNAL.R32F,
		[TEXTURE_FORMAT.RG]: TEXTURE_FORMAT_INTERNAL.RG32F,
		[TEXTURE_FORMAT.RGB]: TEXTURE_FORMAT_INTERNAL.RGB32F,
		[TEXTURE_FORMAT.RGBA]: TEXTURE_FORMAT_INTERNAL.RGBA32F,
		[TEXTURE_FORMAT.DEPTH_COMPONENT]:
			TEXTURE_FORMAT_INTERNAL.DEPTH_COMPONENT32F,
	},

	COMPRESSED_TYPES: {},
} as const
