import { Form } from './form';
import { Shade } from './shade';
import { Sketch } from './sketch';
export declare type GL = WebGLRenderingContext;
export declare type Color = [number, number, number, number];
export declare type TypedArray = Uint8Array | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array | Float32Array | Float64Array;
export declare type TypedArrayConstructor = Uint8ArrayConstructor | Uint16ArrayConstructor | Uint32ArrayConstructor | Int8ArrayConstructor | Int16ArrayConstructor | Int32ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor;
export declare type TypedArrayTypes = 'Uint8Array' | 'Uint16Array' | 'Uint32Array' | 'Int8Array' | 'Int16Array' | 'Int32Array' | 'Float32Array' | 'Float64Array';
export interface RenderTarget {
    frameBuffer: WebGLFramebuffer | null;
    textures: (WebGLTexture | null)[];
    depthBuffer: WebGLRenderbuffer | null;
    width: number;
    height: number;
    textureConfig: {
        type: number;
        count: number;
    };
}
export declare type FormDrawType = 'TRIANGLES' | 'TRIANGLE_STRIP' | 'TRIANGLE_FAN' | 'POINTS' | 'LINES' | 'LINE_LOOP' | 'LINE_STRIP';
export declare type FormStoreType = 'DYNAMIC' | 'STATIC';
export interface FormBufferStore {
    buffer: TypedArray;
    storeType?: FormStoreType;
}
export interface FormData {
    drawType?: FormDrawType;
    itemCount?: number;
    attribs: {
        [id: string]: FormBufferStore;
    };
    elements?: FormBufferStore;
}
export interface AttribContext {
    buffer: WebGLBuffer | null;
    stride?: number;
    offset?: number;
    normalize?: boolean;
}
export interface ShadeData {
    vert?: string;
    frag?: string;
}
export interface UniformSetter {
    location: WebGLUniformLocation;
    setter: (val: any) => void;
}
export interface AttribSetter {
    location: number;
    setter: (ctx: AttribContext) => void;
}
export declare type Uniforms = {
    [id: string]: any;
};
export interface DrawSettings {
    clearColor?: Color;
    clearDepth?: number;
    clearBits?: number;
    depthMask?: boolean;
    colorMask?: [boolean, boolean, boolean, boolean];
    depthFunc?: number;
    blendFunc?: [number, number];
    enable?: number[];
    disable?: number[];
    cullFace?: number;
    frontFace?: number;
    lineWidth?: number;
}
export interface SketchData {
    form?: Form;
    shade?: Shade;
    uniforms?: Uniforms | Uniforms[];
    drawSettings?: DrawSettings;
}
export declare type MagFilter = 'LINEAR' | 'NEAREST';
export declare type MinFilter = MagFilter | 'LINEAR_MIPMAP_LINEAR' | 'LINEAR_MIPMAP_NEAREST' | 'NEAREST_MIPMAP_LINEAR' | 'NEAREST_MIPMAP_NEAREST';
export declare type Wrap = 'CLAMP_TO_EDGE' | 'REPEAT' | 'MIRRORED_REPEAT';
export declare type Cull = 'FRONT' | 'BACK' | 'FRONT_AND_BACK';
export declare type Asset = ImageData | HTMLCanvasElement | HTMLImageElement | HTMLVideoElement;
export interface TextureData {
    flipY?: boolean;
    wrap?: Wrap;
    wrapT?: Wrap;
    wrapS?: Wrap;
    minFilter?: MinFilter;
    magFilter?: MagFilter;
}
export interface LayerData extends TextureData {
    drawSettings?: DrawSettings;
    buffered?: boolean;
    width?: number;
    height?: number;
    textureConfig?: {
        type?: number;
        count?: number;
    };
    asset?: Asset;
    sketches?: Sketch[];
    uniforms?: Uniforms | Uniforms[];
    frag?: string;
}
export interface Layer {
    data: LayerData;
    targets?: [RenderTarget, RenderTarget];
    looping?: boolean;
    uniforms?: Uniforms | Uniforms[];
    sketches?: Sketch[];
    texture: (index?: number) => WebGLTexture | null;
    update: (data: LayerData) => Layer;
    destroy: () => void;
}
