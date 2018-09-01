import { SketchData, DrawSettings, Uniforms } from './painter-types';
import { Form } from './form';
import { Shade } from './shade';
export declare class Sketch {
    id: string;
    drawSettings?: DrawSettings;
    form: Form;
    shade: Shade;
    uniforms: Uniforms;
    constructor(id?: string);
    update(data: SketchData): this;
    destroy(): void;
}
