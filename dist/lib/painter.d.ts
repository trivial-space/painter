import { GL, Uniforms, RenderTarget, Layer, DrawSettings } from './painter-types';
import { Form } from './form';
import { Shade } from './shade';
import { Sketch } from './sketch';
import { StaticLayer, DrawingLayer } from './layer';
export declare class Painter {
    gl: GL;
    static debug: boolean;
    targets: RenderTarget[];
    renderQuad: Form;
    result: Sketch;
    constructor(gl: GL);
    resize(multiplier?: number, forceUpdateTargets?: boolean): this;
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
