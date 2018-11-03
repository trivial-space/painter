import { Form } from './form';
import { DrawSettings, SketchData, Uniforms } from './painter-types';
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
