import { Painter } from './painter';
import { CustomAttribLayout, FormData } from './painter-types';
export declare class Form {
    private _painter;
    id: string;
    _drawType: number;
    _itemCount: number;
    _attribBuffers: {
        [id: string]: WebGLBuffer | null;
    } | null;
    _customLayout: {
        buffer?: WebGLBuffer | null;
        attribs: {
            [id: string]: CustomAttribLayout & {
                buffer?: WebGLBuffer | null;
            };
        };
    } | null;
    _elements?: {
        buffer: WebGLBuffer | null;
        glType: number | null;
    };
    constructor(_painter: Painter, id?: string);
    update(data: FormData): this;
    destroy(): void;
}
