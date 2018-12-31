import { Form } from './form';
import { DrawSettings, SketchData, Uniforms } from './painter-types';
import { Shade } from './shade';
export declare class Sketch {
    id: string;
    form: Form;
    shade: Shade;
    _drawSettings?: DrawSettings;
    _uniforms: Uniforms[];
    constructor(id?: string);
    update(data: SketchData): this;
    destroy(): void;
}
