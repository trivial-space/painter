import { AttribContext, FormData, GL } from './painter-types';
export declare class Form {
    private _gl;
    id: string;
    _drawType: number;
    _itemCount: number;
    _attribs: {
        [id: string]: AttribContext;
    };
    _elements?: {
        buffer: WebGLBuffer | null;
        glType: number | null;
    };
    constructor(_gl: GL, id?: string);
    update(data: FormData): this;
    destroy(): void;
}
