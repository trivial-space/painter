import { TEXTURE_FORMAT, TEXTURE_FORMAT_INTERNAL } from './contants'
import { Form } from './form'
import { Shade } from './shade'
import { Effect, Sketch } from './sketch'

export type GL = WebGL2RenderingContext

export type ColorRG = [number, number]
export type ColorRGB = [number, number, number]
export type ColorRGBA = [number, number, number, number]

export type TypedArray =
	| Uint8Array
	| Uint16Array
	| Uint32Array
	| Int8Array
	| Int16Array
	| Int32Array
	| Float32Array
	| Float64Array

export type TypedArrayConstructor =
	| Uint8ArrayConstructor
	| Uint16ArrayConstructor
	| Uint32ArrayConstructor
	| Int8ArrayConstructor
	| Int16ArrayConstructor
	| Int32ArrayConstructor
	| Float32ArrayConstructor
	| Float64ArrayConstructor

export type TypedArrayTypes =
	| 'Uint8Array'
	| 'Uint16Array'
	| 'Uint32Array'
	| 'Int8Array'
	| 'Int16Array'
	| 'Int32Array'
	| 'Float32Array'
	| 'Float64Array'

// Texture

export type TextureType =
	| 'UNSIGNED_BYTE'
	| 'UNSIGNED_SHORT'
	| 'UNSIGNED_INT'
	| 'FLOAT'

export type TextureFormat = keyof typeof TEXTURE_FORMAT
export type TextureInternalFormat = keyof typeof TEXTURE_FORMAT_INTERNAL

export type TextureAsset =
	| ImageData
	| HTMLCanvasElement
	| HTMLImageElement
	| HTMLVideoElement

export interface TextureOptions {
	wrap?: Wrap
	wrapT?: Wrap
	wrapS?: Wrap
	minFilter?: MinFilter
	magFilter?: MagFilter

	type?: TextureType
	format?: TextureFormat
	internalFormat?: TextureInternalFormat

	flipY?: boolean
	premultiplyAlpha?: boolean
	compareMode?: number
	compareFunc?: number
}

export interface TextureData extends TextureOptions {
	asset?: TextureAsset // Static asset
	data?: TypedArray | null
	width?: number
	height?: number
}

// Render target

export interface RenderTargetData {
	width?: number
	height?: number
	bufferStructure?: TextureOptions[]
	antialias?: boolean
}

// Form

export type FormDrawType =
	| 'TRIANGLES'
	| 'TRIANGLE_STRIP'
	| 'TRIANGLE_FAN'
	| 'POINTS'
	| 'LINES'
	| 'LINE_LOOP'
	| 'LINE_STRIP'

export type FormStoreType = 'DYNAMIC' | 'STATIC'

export interface FormBufferStore {
	buffer: TypedArray
	storeType?: FormStoreType
}

export interface FormData {
	drawType?: FormDrawType
	itemCount?: number
	attribs: { [id: string]: FormBufferStore }
	elements?: FormBufferStore
}

// Shade

export interface ShadeData {
	vert?: string
	frag?: string
}

export interface UniformSetter {
	location: WebGLUniformLocation
	setter: (val: any) => void
}

export interface AttribContext {
	buffer: WebGLBuffer | null
	stride?: number
	offset?: number
	normalize?: boolean
}

export interface AttribSetter {
	location: number
	setter: (ctx: AttribContext) => void
}

// Sketch

export interface Uniforms {
	[id: string]: any
}

export interface DrawSettings {
	clearColor?: ColorRGBA
	clearDepth?: number
	clearBits?: number
	depthMask?: boolean
	colorMask?: [boolean, boolean, boolean, boolean]
	depthFunc?: number
	blendFunc?: [number, number]
	blendFuncSeparate?: [number, number, number, number]
	enable?: number[]
	disable?: number[]
	cullFace?: number
	frontFace?: number
	lineWidth?: number
}

export interface EffectData {
	frag?: string
	drawSettings?: DrawSettings
	uniforms?: Uniforms | Uniforms[]
}

export interface SketchData {
	form?: Form
	shade?: Shade
	drawSettings?: DrawSettings
	uniforms?: Uniforms | Uniforms[]
}

// Layer

export type MagFilter = 'LINEAR' | 'NEAREST'

export type MinFilter =
	| MagFilter
	| 'LINEAR_MIPMAP_LINEAR'
	| 'LINEAR_MIPMAP_NEAREST'
	| 'NEAREST_MIPMAP_LINEAR'
	| 'NEAREST_MIPMAP_NEAREST'

export type Wrap = 'CLAMP_TO_EDGE' | 'REPEAT' | 'MIRRORED_REPEAT'

export type Cull = 'FRONT' | 'BACK' | 'FRONT_AND_BACK'

export interface LayerData extends RenderTargetData {
	texture?: TextureData
	sketches?: Sketch | Sketch[]
	effects?: Effect | Effect[]
	uniforms?: Uniforms
	drawSettings?: DrawSettings
	selfReferencing?: boolean
	directRender?: boolean
}

export type RenderSources = Array<WebGLTexture | null>

// Painter

export type PainterOptions = WebGLContextAttributes & {
	sizeMultiplier?: number
}
