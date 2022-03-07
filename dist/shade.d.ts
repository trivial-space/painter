import { Painter } from './painter';
import { AttribSetter, ShadeData, UniformSetter } from './painter-types';
export declare class Shade {
    private _painter;
    id: string;
    vertSource?: string;
    fragSource?: string;
    _program: WebGLProgram | null;
    _vert: WebGLShader | null;
    _frag: WebGLShader | null;
    _uniforms: {
        [id: string]: UniformSetter;
    };
    _attributes: {
        [id: string]: AttribSetter;
    };
    constructor(_painter: Painter, id?: string);
    update(data: ShadeData): this;
    destroy(): void;
}
