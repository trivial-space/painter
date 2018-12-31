import { AttribSetter, GL, ShadeData, UniformSetter } from './painter-types';
export declare class Shade {
    private gl;
    id: string;
    vertSource?: string;
    fragSource?: string;
    _program: WebGLProgram | null;
    _vert: WebGLShader | null;
    _frag: WebGLShader | null;
    _uniformSetters: {
        [id: string]: UniformSetter;
    };
    _attributeSetters: {
        [id: string]: AttribSetter;
    };
    constructor(gl: GL, id?: string);
    update(data: ShadeData): this | undefined;
    destroy(): void;
}
