import { Form } from './form';
import { Layer } from './layer';
import { DrawSettings, GL, LayerData, PainterOptions } from './painter-types';
import { Shade } from './shade';
import { Effect, Sketch } from './sketch';
export declare class Painter {
    canvas: HTMLCanvasElement;
    sizeMultiplier: number;
    gl: GL;
    isWebGL2: boolean;
    maxBufferSamples: number;
    _renderQuad: Form;
    _staticEffect: Effect;
    _defaultLayer: Layer;
    constructor(canvas: HTMLCanvasElement, opts?: PainterOptions);
    resize(): this;
    destroy(): void;
    updateDrawSettings(drawSettings?: DrawSettings): this;
    createForm(id?: string): Form;
    createShade(id?: string): Shade;
    createSketch(id?: string): Sketch;
    createEffect(id?: string): Effect;
    createLayer(id?: string): Layer;
    draw(opts: LayerData): this;
    compose(...layers: Layer[]): this;
    show(layer: Layer, idx?: number): this;
}
