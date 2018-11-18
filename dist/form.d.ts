import { AttribContext, FormData, GL } from './painter-types';
export declare class Form {
    private gl;
    id: string;
    drawType: number;
    itemCount: number;
    attribs: {
        [id: string]: AttribContext;
    };
    elements?: {
        buffer: WebGLBuffer | null;
        glType: number | null;
    };
    constructor(gl: GL, id?: string);
    update(data: FormData): this;
    destroy(): void;
}
