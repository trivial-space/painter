import { GL, RenderTarget, Layer, DrawSettings, UniformsData } from './painter-types';
import { Form } from './form';
import { Shade } from './shade';
import { Sketch } from './sketch';
import { StaticLayer, DrawingLayer } from './layer';
export declare class Painter {
    gl: GL;
    targets: RenderTarget[];
    renderQuad: Form;
    result: Sketch;
    constructor(gl: GL);
    resize(multiplier?: number, forceUpdateTargets?: boolean): this;
    destroy(): void;
    updateDrawSettings(drawSettings?: DrawSettings): this;
    createForm(): Form;
    createShade(): Shade;
    createSketch(): Sketch;
    createFlatSketch(): Sketch;
    createStaticLayer(): StaticLayer;
    createDrawingLayer(): DrawingLayer;
    createEffectLayer(): DrawingLayer;
    draw(sketch: Sketch, globalUniforms?: UniformsData): this;
    compose(...layers: Layer[]): this;
}
