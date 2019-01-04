import { Form } from './form';
import { Frame } from './frame';
import { Layer } from './layer';
import { DrawSettings, GL, PainterOptions, Uniforms } from './painter-types';
import { Shade } from './shade';
import { Sketch } from './sketch';
export declare class Painter {
    canvas: HTMLCanvasElement;
    sizeMultiplier: number;
    gl: GL;
    isWebGL2: boolean;
    maxBufferSamples: number;
    _renderQuad: Form;
    _staticSketch: Sketch;
    constructor(canvas: HTMLCanvasElement, opts?: PainterOptions);
    resize(): this;
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
