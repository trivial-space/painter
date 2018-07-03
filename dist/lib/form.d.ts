import { GL, FormData, AttribContext } from './painter-types';
export declare class Form {
    private gl;
    drawType: number;
    itemCount: number;
    attribs: {
        [id: string]: AttribContext;
    };
    elements?: {
        buffer: WebGLBuffer | null;
        glType: number | null;
    };
    constructor(gl: GL);
    update(data: FormData): this;
    destroy(): void;
}
