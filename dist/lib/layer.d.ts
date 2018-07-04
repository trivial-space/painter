import { GL, Layer, LayerData, RenderTarget, Uniforms } from './painter-types';
import { Sketch } from './sketch';
export declare class StaticLayer implements Layer {
    gl: GL;
    textures: (WebGLTexture | null)[];
    data: LayerData;
    constructor(gl: GL);
    texture(): WebGLTexture | null;
    update(data: LayerData): this;
    destroy(): void;
}
export declare class DrawingLayer implements Layer {
    private gl;
    textures: (WebGLTexture | null)[];
    data: LayerData;
    target?: RenderTarget;
    uniforms?: Uniforms;
    sketches?: Sketch[];
    constructor(gl: GL);
    texture(i?: number): WebGLTexture | null;
    update(data: LayerData): this;
    destroy(): void;
}
