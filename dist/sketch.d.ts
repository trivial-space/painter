import { Form } from './form';
import { DrawSettings, SketchData, Uniforms } from './painter-types';
import { Shade } from './shade';
export declare class Sketch {
    id: string;
    _drawSettings?: DrawSettings;
    _form: Form;
    _shade: Shade;
    _uniforms: Uniforms[];
    constructor(id?: string);
    update(data: SketchData): this;
    destroy(): void;
}
