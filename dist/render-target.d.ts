import { BufferType, GL, RenderTargetData } from './painter-types';
export declare class RenderTarget {
    private gl;
    id: string;
    frameBuffer: WebGLFramebuffer | null;
    textures: (WebGLTexture | null)[];
    depthBuffer: WebGLRenderbuffer | null;
    width: number;
    height: number;
    bufferStructure: BufferType[];
    _data?: RenderTargetData;
    constructor(gl: GL, id?: string);
    update(data: RenderTargetData): this;
    destroy(): void;
}
