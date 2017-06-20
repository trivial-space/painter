import { FormStoreType, FormDrawType, TextureData } from './render-types';
export declare const defaultTextureSettings: TextureData;
export declare const defaultLayerSettings: {
    clearColor: number[];
    clearBuffers: string[];
    clearBits: number;
    enable: string[];
    blend: string[];
    width: number;
    height: number;
};
export declare const defaultForms: {
    renderQuad: {
        attribs: {
            [x: string]: {
                buffer: Float32Array;
                storeType: FormStoreType;
            };
        };
        drawType: FormDrawType;
        itemCount: number;
    };
};
export declare const defaultShaders: {
    basicEffect: {
        vert: string;
        frag: string;
    };
};
