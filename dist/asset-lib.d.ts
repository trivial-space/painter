import { DrawSettings, FormDrawType, FormStoreType, GL, TextureData } from './painter-types';
export declare const defaultTextureSettings: Readonly<TextureData>;
export declare function getDefaultLayerSettings(gl: GL): DrawSettings;
export declare const defaultForms: {
    renderQuad: {
        attribs: {
            position: {
                buffer: Float32Array;
                storeType: FormStoreType;
            };
            uv: {
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
