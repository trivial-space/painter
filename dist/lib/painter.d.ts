import { Form } from './form';
import { DrawingLayer, StaticLayer } from './layer';
import { DrawSettings, GL, Layer, RenderTarget, Uniforms } from './painter-types';
import { Shade } from './shade';
import { Sketch } from './sketch';
export declare class Painter {
    gl: GL;
    static debug: boolean;
    targets: RenderTarget[];
    renderQuad: Form;
    result: Sketch;
    constructor(gl: GL);
    resize({ multiplier, forceUpdateTargets, keepCurrentSize }?: {
        multiplier?: number | undefined;
        forceUpdateTargets?: boolean | undefined;
        keepCurrentSize?: boolean | undefined;
    }): this;
    destroy(): void;
    updateDrawSettings(drawSettings?: DrawSettings): this;
    createForm(id?: string): Form;
    createShade(id?: string): Shade;
    createSketch(id?: string): Sketch;
    createFlatSketch(id?: string): Sketch;
    createStaticLayer(id?: string): StaticLayer;
    createDrawingLayer(id?: string): DrawingLayer;
    createEffectLayer(id?: string): DrawingLayer;
    draw(sketch: Sketch, globalUniforms?: Uniforms): this;
    compose(...layers: Layer[]): this;
}
