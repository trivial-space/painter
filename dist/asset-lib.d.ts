import { DrawSettings, FormDrawType, FormStoreType, GL, TextureData } from './painter-types';
export declare const defaultTextureSettings: Readonly<TextureData>;
export declare function getDefaultLayerSettings(gl: GL): DrawSettings;
export declare const defaultForms: {
    renderQuad: {
        attribs: {
            [constants.GEOMETRY_PROP_POSITION]: {
                buffer: Float32Array;
                storeType: FormStoreType;
            };
            [constants.GEOMETRY_PROP_UV]: {
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
