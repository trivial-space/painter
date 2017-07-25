import { FormStoreType, FormDrawType, TextureData, GL, DrawSettings } from './painter-types';
export declare const defaultTextureSettings: TextureData;
export declare function getDefaultLayerSettings(gl: GL): DrawSettings;
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
