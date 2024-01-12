import { Painter } from './painter';
import { RenderTargetData, TextureOptions } from './painter-types';
import { Texture } from './texture';
export declare class RenderTarget {
    private _painter;
    id: string;
    width: number;
    height: number;
    antialias?: boolean;
    frameBuffer: WebGLFramebuffer | null;
    antiAliasFrameBuffer: WebGLFramebuffer | null;
    antiAliasRenderBuffer: WebGLFramebuffer | null;
    textures: Texture[];
    depthBuffer: WebGLRenderbuffer | null;
    bufferOptions: TextureOptions[];
    _data: RenderTargetData;
    constructor(_painter: Painter, id?: string);
    update(data: RenderTargetData): this;
    private setupBuffers;
    destroy(): void;
}
