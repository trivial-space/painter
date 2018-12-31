import { Layer } from './layer';
import { FrameData, GL, RenderTarget } from './painter-types';
export declare class Frame {
    private _gl;
    id: string;
    width: number;
    height: number;
    layers: Layer[];
    _data: FrameData;
    _targets: RenderTarget[];
    _textures: Array<WebGLTexture | null>;
    constructor(_gl: GL, id?: string);
    image(i?: number): WebGLTexture | null;
    update(data: FrameData): this;
    destroy(): void;
    _destroyTargets(): void;
    _swapTargets(): void;
}
