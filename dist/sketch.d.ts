import { Form } from './form';
import { DrawSettings, EffectData, SketchData, Uniforms } from './painter-types';
import { Shade } from './shade';
export declare class Sketch {
    id: string;
    form: Form | null;
    shade: Shade | null;
    _drawSettings?: DrawSettings;
    _uniforms: Uniforms[];
    constructor(id?: string);
    update(data: SketchData): this;
    destroy(): void;
}
export declare class Effect extends Sketch {
    id: string;
    constructor(_form: Form, _shade: Shade, id?: string);
    update(data: EffectData): this;
}
