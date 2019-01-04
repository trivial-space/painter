import { Painter } from './painter';
import { TextureData } from './painter-types';
export declare class Texture {
    private _painter;
    id: string;
    _texture: WebGLTexture | null;
    _data: TextureData;
    constructor(_painter: Painter, id?: string);
    update(data: TextureData & {
        width?: number;
        height?: number;
    }): this;
    destroy(): void;
}
