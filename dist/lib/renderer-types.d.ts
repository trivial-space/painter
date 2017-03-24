export declare type GL = WebGLRenderingContext;
export declare type ID = string;
export declare type Color = [number, number, number, number];
export declare type TypedArray = Uint8Array | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array | Float32Array | Float64Array;
export declare type TypedArrayConstructor = Uint8ArrayConstructor | Uint16ArrayConstructor | Uint32ArrayConstructor | Int8ArrayConstructor | Int16ArrayConstructor | Int32ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor;
export declare type TypedArrayTypes = "Uint8Array" | "Uint16Array" | "Uint32Array" | "Int8Array" | "Int16Array" | "Int32Array" | "Float32Array" | "Float64Array";
export declare type MagFilter = "LINEAR" | "NEAREST";
export declare type MinFilter = MagFilter | "LINEAR_MIPMAP_LINEAR" | "LINEAR_MIPMAP_NEAREST" | "NEAREST_MIPMAP_LINEAR" | "NEAREST_MIPMAP_NEAREST";
export declare type Wrap = "CLAMP_TO_EDGE" | "REPEAT" | "MIRRORED_REPEAT";
export declare type Asset = ImageData | HTMLCanvasElement | HTMLImageElement | HTMLVideoElement;
export declare type GeometryDrawType = "TRIANGLES" | "TRIANGLE_STRIP" | "TRIANGLE_FAN" | "POINTS" | "LINES" | "LINE_LOOP" | "LINE_STRIP";
export declare type GeometryStoreType = "DYNAMIC" | "STATIC";
export declare type ShaderAttribType = "f" | "f 1" | "f 2" | "f 3" | "f 4" | "m 2" | "m 3" | "m 4";
export declare type ShaderUniformType = ShaderAttribType | "i" | "i 1" | "i 2" | "i 3" | "i 4" | "t";
export declare type Cull = "FRONT" | "BACK" | "FRONT_AND_BACK";
export interface RenderTarget {
    frameBuffer: WebGLFramebuffer | null;
    texture: WebGLTexture | null;
    depthBuffer: WebGLRenderbuffer | null;
    width: number;
    height: number;
}
export interface Settings {
    clearColor: Color;
    minFilter: MinFilter;
    magFilter: MagFilter;
    wrap: Wrap;
    clearBits: number;
    clearBuffers: string[];
    enable: string[];
    blend: [string, string];
    width: number;
    height: number;
    cull?: Cull;
}
export interface Context {
    settings: Settings;
    shaders: {
        [id: string]: ContextShader;
    };
    geometries: {
        [id: string]: ContextGeometry;
    };
    layers: {
        [id: string]: ContextLayer;
    };
    objects: {
        [id: string]: ContextObject;
    };
    source: RenderTarget;
    target: RenderTarget;
    gl: GL;
}
export interface ContextLayerBase {
    noClear: boolean;
    clearColor?: Color;
    renderTarget?: RenderTarget;
}
export interface ContextLayerStatic extends ContextLayerBase {
    type: "static";
    texture: WebGLTexture | null;
}
export interface ContextLayerObjects extends ContextLayerBase {
    type: "objects";
    uniforms: {
        [id: string]: any;
    };
    opaques: ID[];
    transparents: ID[];
    cull?: Cull;
}
export interface ContextLayerShader extends ContextLayerBase {
    type: "shader";
    object: ContextObjectInitialized;
}
export declare type ContextLayer = ContextLayerStatic | ContextLayerObjects | ContextLayerShader;
export interface TextureData {
    readonly flipY?: boolean;
    readonly wrap?: Wrap;
    readonly wrapT?: Wrap;
    readonly wrapS?: Wrap;
    readonly minFilter?: MinFilter;
    readonly magFilter?: MagFilter;
}
export interface LayerData extends TextureData {
    readonly buffered?: boolean;
    readonly width?: number;
    readonly height?: number;
    readonly noClear?: boolean;
    readonly clearColor?: Color;
    readonly objects?: ID[];
    readonly asset?: Asset;
    readonly shader?: ID;
    readonly uniforms?: {
        [id: string]: any;
    };
    readonly cull?: Cull;
}
export interface ObjectData {
    readonly shader: ID;
    readonly geometry: ID;
    readonly uniforms?: {
        [id: string]: any;
    };
    readonly blend?: boolean;
    readonly cull?: Cull;
}
export interface ContextObjectInitialized {
    type: "initialized";
    shader: ID;
    geometry: ID;
    uniforms: {
        [id: string]: any;
    };
    blend?: boolean;
    cull?: Cull;
}
export interface ContextObjectMissing {
    type: "missing";
    updateLayers: {
        [id: string]: LayerData;
    };
}
export declare type ContextObject = ContextObjectMissing | ContextObjectInitialized;
export interface GeometryArray {
    readonly array: number[];
    readonly type: TypedArrayTypes;
}
export interface GeometryBuffer {
    readonly buffer: TypedArray;
}
export declare type GeometryBufferStore = (GeometryBuffer | GeometryArray) & {
    readonly storeType?: GeometryStoreType;
};
export interface GeometryData {
    readonly drawType: GeometryDrawType;
    readonly itemCount: number;
    readonly attribs: {
        [id: string]: GeometryBufferStore;
    };
    readonly elements?: GeometryBufferStore;
}
export interface ContextGeometry {
    drawType: number;
    itemCount: number;
    attribs: {
        [id: string]: WebGLBuffer | null;
    };
    elements?: {
        buffer: WebGLBuffer | null;
        glType: number | null;
    };
}
export interface ShaderData {
    readonly vert: string;
    readonly frag: string;
    readonly attribs: {
        [id: string]: ShaderAttribType;
    };
    readonly uniforms: {
        [id: string]: ShaderUniformType;
    };
}
export interface ContextShaderAttribute {
    index: number;
    type: number;
    itemSize: number;
}
export interface ContextShaderUniform {
    index: WebGLUniformLocation | null;
    type: ShaderUniformType;
}
export interface ContextShader {
    program: WebGLProgram | null;
    vert: WebGLShader | null;
    frag: WebGLShader | null;
    attribs: {
        [name: string]: ContextShaderAttribute;
    };
    uniforms: {
        [name: string]: ContextShaderUniform;
    };
}
