export declare type GL = WebGLRenderingContext;
export declare type ID = string;
export declare type Color = [number, number, number, number];
export declare type TypedArray = Uint8Array | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array | Float32Array | Float64Array;
export declare type TypedArrayConstructor = Uint8ArrayConstructor | Uint16ArrayConstructor | Uint32ArrayConstructor | Int8ArrayConstructor | Int16ArrayConstructor | Int32ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor;
export declare type TypedArrayTypes = 'Uint8Array' | 'Uint16Array' | 'Uint32Array' | 'Int8Array' | 'Int16Array' | 'Int32Array' | 'Float32Array' | 'Float64Array';
export declare type MagFilter = 'LINEAR' | 'NEAREST';
export declare type MinFilter = MagFilter | 'LINEAR_MIPMAP_LINEAR' | 'LINEAR_MIPMAP_NEAREST' | 'NEAREST_MIPMAP_LINEAR' | 'NEAREST_MIPMAP_NEAREST';
export declare type Wrap = 'CLAMP_TO_EDGE' | 'REPEAT' | 'MIRRORED_REPEAT';
export declare type Asset = ImageData | HTMLCanvasElement | HTMLImageElement | HTMLVideoElement;
export declare type Cull = 'FRONT' | 'BACK' | 'FRONT_AND_BACK';
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
export interface ContextLayerBase {
    noClear: boolean;
    clearColor?: Color;
    renderTarget?: RenderTarget;
}
export interface ContextLayerStatic extends ContextLayerBase {
    type: 'static';
    texture: WebGLTexture | null;
}
export interface ContextLayerObjects extends ContextLayerBase {
    type: 'objects';
    uniforms: {
        [id: string]: any;
    };
    opaques: ID[];
    transparents: ID[];
    cull?: Cull;
}
export interface ContextLayerShader extends ContextLayerBase {
    type: 'shader';
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
    type: 'initialized';
    shader: ID;
    geometry: ID;
    uniforms: {
        [id: string]: any;
    };
    blend?: boolean;
    cull?: Cull;
}
export interface ContextObjectMissing {
    type: 'missing';
    updateLayers: {
        [id: string]: LayerData;
    };
}
export declare type ContextObject = ContextObjectMissing | ContextObjectInitialized;
