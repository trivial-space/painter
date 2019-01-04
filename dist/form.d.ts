import { Painter } from './painter';
import { AttribContext, FormData } from './painter-types';
export declare class Form {
    private _painter;
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
    constructor(_painter: Painter, id?: string);
    update(data: FormData): this;
    destroy(): void;
}
