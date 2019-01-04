import { Layer } from './layer';
import { Painter } from './painter';
import { FrameData } from './painter-types';
import { RenderTarget } from './render-target';
import { Texture } from './texture';
export declare class Frame {
    private _painter;
    id: string;
    width: number;
    height: number;
    layers: Layer[];
    _data: FrameData;
    _targets: RenderTarget[];
    _textures: Texture[];
    constructor(_painter: Painter, id?: string);
    image(i?: number): Texture;
    update(data: FrameData): this;
    destroy(): void;
    _destroyTargets(): void;
    _swapTargets(): void;
}
