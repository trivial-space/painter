import { Form } from './form'
import { Shade } from './shade'
import { Sketch } from './sketch'

export type GL = WebGLRenderingContext
export type Color = [number, number, number, number]

export type TypedArray = Uint8Array |
					Uint16Array |
					Uint32Array |
					Int8Array |
					Int16Array |
					Int32Array |
					Float32Array |
					Float64Array

export type TypedArrayConstructor = Uint8ArrayConstructor |
								Uint16ArrayConstructor |
								Uint32ArrayConstructor |
								Int8ArrayConstructor |
								Int16ArrayConstructor |
								Int32ArrayConstructor |
								Float32ArrayConstructor |
								Float64ArrayConstructor

export type TypedArrayTypes = 'Uint8Array' |
							'Uint16Array' |
							'Uint32Array' |
							'Int8Array' |
							'Int16Array' |
							'Int32Array' |
							'Float32Array' |
							'Float64Array'

export interface RenderTarget {
	id: string
	frameBuffer: WebGLFramebuffer | null
	textures: (WebGLTexture | null)[]
	depthBuffer: WebGLRenderbuffer | null
	width: number
	height: number
	textureConfig: {
		type: number
		count: number
	}
}


// Form

export type FormDrawType =
	'TRIANGLES' |
	'TRIANGLE_STRIP' |
	'TRIANGLE_FAN' |
	'POINTS' |
	'LINES' |
	'LINE_LOOP' |
	'LINE_STRIP'

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

export interface AttribContext {
	buffer: WebGLBuffer | null
	stride?: number,
	offset?: number,
	normalize?: boolean
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

export interface AttribSetter {
	location: number
	setter: (ctx: AttribContext) => void
}


// Sketch

export type Uniforms = { [id: string]: any }

export interface DrawSettings {
	clearColor?: Color
	clearDepth?: number
	clearBits?: number
	depthMask?: boolean
	colorMask?: [boolean, boolean, boolean, boolean]
	depthFunc?: number
	blendFunc?: [number, number],
	enable?: number[]
	disable?: number[]
	cullFace?: number
	frontFace?: number
	lineWidth?: number
}

export interface SketchData {
	form?: Form,
	shade?: Shade,
	uniforms?: Uniforms | Uniforms[]
	drawSettings?: DrawSettings
}


// Layer

export type MagFilter = 'LINEAR' | 'NEAREST'

export type MinFilter = MagFilter |
	'LINEAR_MIPMAP_LINEAR' |
	'LINEAR_MIPMAP_NEAREST' |
	'NEAREST_MIPMAP_LINEAR' |
	'NEAREST_MIPMAP_NEAREST'

export type Wrap = 'CLAMP_TO_EDGE' | 'REPEAT' | 'MIRRORED_REPEAT'

export type Cull = 'FRONT' | 'BACK' | 'FRONT_AND_BACK'

export type Asset = ImageData | HTMLCanvasElement | HTMLImageElement | HTMLVideoElement

export interface TextureData {
	flipY?: boolean
	wrap?: Wrap
	wrapT?: Wrap
	wrapS?: Wrap
	minFilter?: MinFilter
	magFilter?: MagFilter
}

export interface LayerData extends TextureData {
	drawSettings?: DrawSettings
	buffered?: boolean // get its own RenderTarget
	doubleBuffered?: boolean // create 2 RenderTargets for ping pong filtering
	width?: number // for own RenderTarget
	height?: number // for own RenderTarget
	textureConfig?: {
		type?: number
		count?: number
	}

	asset?: Asset // AssetLayer specific
	sketches?: Sketch[]
	uniforms?: Uniforms | Uniforms[] // ShaderLayer specific
	frag?: string
}

export interface Layer {
	id: string
	data: LayerData
	targets?: RenderTarget[]
	looping?: boolean
	uniforms?: Uniforms | Uniforms[]
	sketches?: Sketch[]

	texture: (index?: number) => WebGLTexture | null
	update: (data: LayerData) => Layer
	destroy: () => void
}
