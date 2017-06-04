import { GL } from './renderer-types';
import { AttribContext, Geometry } from './geometry';
export interface ShaderData {
    readonly vert: string;
    readonly frag: string;
}
export interface UniformSetter {
    location: number;
    setter: (val: any) => void;
}
export interface AttribSetter {
    location: number;
    setter: (ctx: AttribContext) => void;
}
export declare class Shader {
    gl: GL;
    program: WebGLProgram | null;
    vert: WebGLShader | null;
    frag: WebGLShader | null;
    uniformSetters: {
        [id: string]: UniformSetter;
    };
    attributeSetters: {
        [id: string]: AttribSetter;
    };
    constructor(gl: GL);
    update(data: ShaderData): void;
    delete(): void;
    setGeometry(geometry: Geometry): void;
    setUniforms(values: any): void;
}
