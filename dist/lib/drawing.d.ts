import { GL } from './renderer-types';
import { Geometry } from 'geometry';
import { Shader } from 'shader';
export interface DrawingData {
    geometry: Geometry;
    shader: Shader;
    uniforms: any;
}
export declare type Uniforms = {
    [id: string]: any;
};
export declare class Drawing {
    gl: GL;
    data: DrawingData;
    constructor(gl: GL);
    update(data: DrawingData): void;
    draw(globalUniforms?: Uniforms): void;
    private drawInstance(uniforms);
}
