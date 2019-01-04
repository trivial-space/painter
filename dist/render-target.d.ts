import { Painter } from './painter';
import { RenderTargetData, TextureOptions } from './painter-types';
import { Texture } from './texture';
export declare class RenderTarget {
    private _painter;
    id: string;
    width: number;
    height: number;
    frameBuffer: WebGLFramebuffer | null;
    textures: Texture[];
    depthBuffer: WebGLRenderbuffer | null;
    bufferStructure: TextureOptions[];
    _data?: RenderTargetData;
    constructor(_painter: Painter, id?: string);
    update(data: RenderTargetData): this;
    destroy(): void;
}
