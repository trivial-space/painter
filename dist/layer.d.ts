import { LayerData, Uniforms } from './painter-types';
import { Effect, Sketch } from './sketch';
import { RenderTarget } from './render-target';
import { Texture } from './texture';
import { Painter } from './painter';
export declare class Layer {
    private _painter;
    id: string;
    sketches: Sketch[];
    effects: Effect[];
    width: number;
    height: number;
    _targets: RenderTarget[];
    _textures: Texture[];
    _passCount: number;
    _data: LayerData;
    _uniforms: Uniforms | null;
    constructor(_painter: Painter, id?: string);
    image(i?: number): Texture;
    update(data: LayerData): this;
    destroy(): void;
    clear(): void;
    _destroyTargets(): void;
    _swapTargets(): void;
}
