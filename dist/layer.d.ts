import { LayerData, Uniforms } from './painter-types';
import { Sketch } from './sketch';
export declare class Layer {
    id: string;
    sketches: Sketch[];
    _data: LayerData;
    _uniforms: Uniforms[];
    constructor(id?: string);
    update(data: LayerData): this;
    destroy(): void;
}
