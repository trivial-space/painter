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

type Asset = HTMLCanvasElement | HTMLImageElement | HTMLVideoElement

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
  enable: string[]
  blend: [string, string]
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
  object: ContextObject
}

type ContextLayer = ContextLayerStatic | ContextLayerObjects | ContextLayerShader


interface TextureData {
  flipY?: boolean
  wrap?: Wrap
  wrapT?: Wrap
  wrapS?: Wrap
  minFilter?: MinFilter
  magFilter?: MagFilter
}

interface LayerData extends TextureData {

  buffered?: boolean // get its own RenderTarget
  width?: number // for own RenderTarget
  height?: number // for own RenderTarget
  noClear?: boolean
  clearColor?: Color

  objects?: ID[] // ObjectLayer specific
  asset?: Asset // AssetLayer specific
  shader?: ID // ShaderLayer specific
  uniforms?: {[id: string]: any} // ShaderLayer specific
}


interface ObjectData {
  shader: ID
  geometry: ID
  uniforms?: {[id: string]: any}
  blend?: boolean
}


interface ContextObject {
  shader: ID
  geometry: ID
  uniforms: {[id: string]: any}
  blend?: boolean
}


interface GeometryArray {
  array: number[]
  type: TypedArrayTypes
}

interface GeometryBuffer  {
  buffer: TypedArray
}

type GeometryBufferStore = (GeometryBuffer | GeometryArray) & {
  storeType?: GeometryStoreType
}


interface GeometryData {
  drawType: GeometryDrawType
  itemCount: number
  attribs: {[id: string]: GeometryBufferStore}
  elements?: GeometryBufferStore
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
  vert: string
  frag: string
  attribs: {[id: string]: ShaderAttribType}
  uniforms: {[id: string]: ShaderUniformType}
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
