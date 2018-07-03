import { SketchData, DrawSettings, UniformsData } from './painter-types';
import { Form } from './form';
import { Shade } from './shade';
export declare class Sketch {
    drawSettings?: DrawSettings;
    form: Form;
    shade: Shade;
    uniforms: UniformsData;
    update(data: SketchData): this;
    destroy(): void;
}
