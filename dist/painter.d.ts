import { Form } from './form';
import { Frame } from './frame';
import { Layer } from './layer';
import { DrawSettings, GL, Uniforms } from './painter-types';
import { Shade } from './shade';
import { Sketch } from './sketch';
export declare class Painter {
    gl: GL;
    _renderQuad: Form;
    _staticSketch: Sketch;
    constructor(gl: GL, { multiplier }?: {
        multiplier?: number | undefined;
    });
    resize({ multiplier }?: {
        multiplier?: number | undefined;
    }): this;
    destroy(): void;
    updateDrawSettings(drawSettings?: DrawSettings): this;
    createForm(id?: string): Form;
    createShade(id?: string): Shade;
    createSketch(id?: string): Sketch;
    createFlatSketch(id?: string): Sketch;
    createFrame(id?: string): Frame;
    createLayer(id?: string): Layer;
    createEffect(id?: string): Layer;
    draw(sketch: Sketch, globalUniforms?: Uniforms): this;
    compose(...frames: Frame[]): this;
    display(frame: Frame, idx?: number): this;
}
