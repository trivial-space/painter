import { ShadeData, GL, UniformSetter, AttribSetter } from './painter-types';
export declare class Shade {
    private gl;
    id: string;
    program: WebGLProgram;
    vert: WebGLShader;
    frag: WebGLShader;
    vertSource?: string;
    fragSource?: string;
    uniformSetters: {
        [id: string]: UniformSetter;
    };
    attributeSetters: {
        [id: string]: AttribSetter;
    };
    constructor(gl: GL, id?: string);
    update(data: ShadeData): this;
    destroy(): void;
}
