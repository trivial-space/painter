type GL = WebGLRenderingContext

type ID = string
type Color = [number, number, number, number]

type TypedArray = Uint8Array |
                  Uint16Array |
                  Uint32Array |
                  Int8Array |
                  Int16Array |
                  Int32Array |
                  Float32Array |
                  Float64Array

type TypedArrayConstructor = Uint8ArrayConstructor |
                             Uint16ArrayConstructor |
                             Uint32ArrayConstructor |
                             Int8ArrayConstructor |
                             Int16ArrayConstructor |
                             Int32ArrayConstructor |
                             Float32ArrayConstructor |
                             Float64ArrayConstructor

type TypedArrayTypes = "Uint8Array" |
                       "Uint16Array" |
                       "Uint32Array" |
                       "Int8Array" |
                       "Int16Array" |
                       "Int32Array" |
                       "Float32Array" |
                       "Float64Array"

type MagFilter = "LINEAR" | "NEAREST"

type MinFilter = MagFilter |
                 "LINEAR_MIPMAP_LINEAR" |
                 "LINEAR_MIPMAP_NEAREST" |
                 "NEAREST_MIPMAP_LINEAR" |
                 "NEAREST_MIPMAP_NEAREST"

type Wrap = "CLAMP_TO_EDGE" | "REPEAT" | "MIRRORED_REPEAT"

type Asset = ImageData | HTMLCanvasElement | HTMLImageElement | HTMLVideoElement

type GeometryDrawType = "TRIANGLES" |
                        "TRIANGLE_STRIP" |
                        "TRIANGLE_FAN" |
                        "POINTS" |
                        "LINES" |
                        "LINE_LOOP" |
                        "LINE_STRIP"

type GeometryStoreType = "DYNAMIC" | "STATIC"

type ShaderAttribType = "f" | "f 1" | "f 2" | "f 3" | "f 4" | "m 2" | "m 3" | "m 4"

type ShaderUniformType = ShaderAttribType | "i" | "i 1" | "i 2" | "i 3" | "i 4" | "t"


interface RenderTarget {
  frameBuffer: WebGLFramebuffer
  texture: WebGLTexture
  depthBuffer: WebGLRenderbuffer
  width: number
  height: number
}


interface Settings {
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
}


interface Context {
  settings: Settings

  shaders: {[id: string]: ContextShader}
  geometries: {[id: string]: ContextGeometry}
  layers: {[id: string]: ContextLayer}
  objects: {[id: string]: ContextObject}

  source: RenderTarget,
  target: RenderTarget
  gl: GL
}


interface ContextLayerBase {
  noClear: boolean
  clearColor: Color
  renderTarget?: RenderTarget
}

interface ContextLayerStatic extends ContextLayerBase {
  type: "static"
  texture: WebGLTexture
}

interface ContextLayerObjects extends ContextLayerBase {
  type: "objects"
  opaques: ID[]
  transparents: ID[]
}

interface ContextLayerShader extends ContextLayerBase {
  type: "shader"
  object: ContextObjectInitialized
}

type ContextLayer = ContextLayerStatic | ContextLayerObjects | ContextLayerShader


interface TextureData {
  readonly flipY?: boolean
  readonly wrap?: Wrap
  readonly wrapT?: Wrap
  readonly wrapS?: Wrap
  readonly minFilter?: MinFilter
  readonly magFilter?: MagFilter
}

interface LayerData extends TextureData {

  readonly buffered?: boolean // get its own RenderTarget
  readonly width?: number // for own RenderTarget
  readonly height?: number // for own RenderTarget
  readonly noClear?: boolean
  readonly clearColor?: Color

  readonly objects?: ID[] // ObjectLayer specific
  readonly asset?: Asset // AssetLayer specific
  readonly shader?: ID // ShaderLayer specific
  readonly uniforms?: {[id: string]: any} // ShaderLayer specific
}


interface ObjectData {
  readonly shader: ID
  readonly geometry: ID
  readonly uniforms?: {[id: string]: any}
  readonly blend?: boolean
}


interface ContextObjectInitialized {
  type: "initialized"
  shader: ID
  geometry: ID
  uniforms: {[id: string]: any}
  blend?: boolean
}

interface ContextObjectMissing {
  type: "missing"
  updateLayers: {
    [id: string]: LayerData
  }
}

type ContextObject = ContextObjectMissing | ContextObjectInitialized


interface GeometryArray {
  readonly array: number[]
  readonly type: TypedArrayTypes
}

interface GeometryBuffer  {
  readonly buffer: TypedArray
}

type GeometryBufferStore = (GeometryBuffer | GeometryArray) & {
  readonly storeType?: GeometryStoreType
}


interface GeometryData {
  readonly drawType: GeometryDrawType
  readonly itemCount: number
  readonly attribs: {[id: string]: GeometryBufferStore}
  readonly elements?: GeometryBufferStore
}


interface ContextGeometry {
  drawType: number
  itemCount: number
  attribs: {[id: string]: WebGLBuffer}
  elements?: {
    buffer: WebGLBuffer
    glType: number
  }
}


interface ShaderData {
  readonly vert: string
  readonly frag: string
  readonly attribs: {[id: string]: ShaderAttribType}
  readonly uniforms: {[id: string]: ShaderUniformType}
}


interface ContextShaderAttribute {
  index: number
  type: number
  itemSize: number
}


interface ContextShaderUniform {
  index: WebGLUniformLocation
  type: ShaderUniformType
}


interface ContextShader {
  program: WebGLProgram
  vert: WebGLShader
  frag: WebGLShader
  attribs: {[name: string]: ContextShaderAttribute}
  uniforms: {[name: string]: ContextShaderUniform}
}
