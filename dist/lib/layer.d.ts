import { GL, Layer, LayerData, RenderTarget, Uniforms } from './painter-types';
import { Sketch } from './sketch';
export declare class StaticLayer implements Layer {
    private gl;
    id: string;
    _texture: WebGLTexture | null;
    data: LayerData;
    constructor(gl: GL, id?: string);
    texture(): WebGLTexture | null;
    update(data: LayerData): this;
    destroy(): void;
}
export declare class DrawingLayer implements Layer {
    private gl;
    id: string;
    data: LayerData;
    targets?: [RenderTarget, RenderTarget];
    uniforms?: Uniforms;
    sketches?: Sketch[];
    constructor(gl: GL, id?: string);
    texture(i?: number): WebGLTexture | null;
    update(data: LayerData): this;
    destroy(): void;
}
