import { Layer } from './layer';
import { FrameData, GL } from './painter-types';
import { RenderTarget } from './render-target';
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
