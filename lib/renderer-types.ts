export type GL = WebGLRenderingContext

export type ID = string
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

export type MagFilter = 'LINEAR' | 'NEAREST'

export type MinFilter = MagFilter |
                 'LINEAR_MIPMAP_LINEAR' |
                 'LINEAR_MIPMAP_NEAREST' |
                 'NEAREST_MIPMAP_LINEAR' |
                 'NEAREST_MIPMAP_NEAREST'

export type Wrap = 'CLAMP_TO_EDGE' | 'REPEAT' | 'MIRRORED_REPEAT'

export type Asset = ImageData | HTMLCanvasElement | HTMLImageElement | HTMLVideoElement

export type Cull = 'FRONT' | 'BACK' | 'FRONT_AND_BACK'

export interface RenderTarget {
  frameBuffer: WebGLFramebuffer | null
  texture: WebGLTexture | null
  depthBuffer: WebGLRenderbuffer | null
  width: number
  height: number
}


export interface Settings {
  clearColor: Color
  minFilter: MinFilter
  magFilter: MagFilter
  wrap: Wrap
  clearBits: number
  clearBuffers: string[] // default ["COLOR", "DEPTH"]
  enable: string[] // GL Properties to be enabled: ["DEPTH_TEST", "CULL_FACE"]  default 'DEPTH_TEST'
  blend: [string, string] // like ["SRC_ALPHA", "ONE_MINUS_SRC_ALPHA"]
  width: number
  height: number
  cull?: Cull
}


export interface ContextLayerBase {
  noClear: boolean
  clearColor?: Color
  renderTarget?: RenderTarget
}

export interface ContextLayerStatic extends ContextLayerBase {
  type: 'static'
  texture: WebGLTexture | null
}

export interface ContextLayerObjects extends ContextLayerBase {
  type: 'objects'
  uniforms: {[id: string]: any}
  opaques: ID[]
  transparents: ID[]
  cull?: Cull
}

export interface ContextLayerShader extends ContextLayerBase {
  type: 'shader'
  object: ContextObjectInitialized
}

export type ContextLayer = ContextLayerStatic | ContextLayerObjects | ContextLayerShader


export interface TextureData {
  readonly flipY?: boolean
  readonly wrap?: Wrap
  readonly wrapT?: Wrap
  readonly wrapS?: Wrap
  readonly minFilter?: MinFilter
  readonly magFilter?: MagFilter
}

export interface LayerData extends TextureData {

  readonly buffered?: boolean // get its own RenderTarget
  readonly width?: number // for own RenderTarget
  readonly height?: number // for own RenderTarget
  readonly noClear?: boolean
  readonly clearColor?: Color

  readonly objects?: ID[] // ObjectLayer specific
  readonly asset?: Asset // AssetLayer specific
  readonly shader?: ID // ShaderLayer specific
  readonly uniforms?: {[id: string]: any} // ShaderLayer specific
  readonly cull?: Cull
}


export interface ObjectData {
  readonly shader: ID
  readonly geometry: ID
  readonly uniforms?: {[id: string]: any}
  readonly blend?: boolean
  readonly cull?: Cull
}


export interface ContextObjectInitialized {
  type: 'initialized'
  shader: ID
  geometry: ID
  uniforms: {[id: string]: any}
  blend?: boolean
  cull?: Cull
}

export interface ContextObjectMissing {
  type: 'missing'
  updateLayers: {
    [id: string]: LayerData
  }
}

export type ContextObject = ContextObjectMissing | ContextObjectInitialized

