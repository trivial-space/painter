import { SketchData, DrawSettings, Uniforms } from './painter-types';
import { Form } from './form';
import { Shade } from './shade';
export declare class Sketch {
    drawSettings?: DrawSettings;
    form: Form;
    shade: Shade;
    uniforms: Uniforms;
    update(data: SketchData): this;
    destroy(): void;
}
