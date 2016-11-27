import { GeometryStoreType, GeometryDrawType, ShaderAttribType, ShaderUniformType } from './renderer-types';
declare var _default: {
    defaultSettings: {
        clearColor: number[];
        minFilter: string;
        magFilter: string;
        wrap: string;
        clearBuffers: string[];
        clearBits: number;
        enable: string[];
        blend: string[];
        width: number;
        height: number;
    };
    geometries: {
        renderQuad: {
            attribs: {
                [x: string]: {
                    buffer: Float32Array;
                    storeType: GeometryStoreType;
                };
            };
            drawType: GeometryDrawType;
            itemCount: number;
        };
    };
    shaders: {
        basicEffect: {
            vert: string;
            frag: string;
            attribs: {
                [x: string]: ShaderAttribType;
            };
            uniforms: {
                [x: string]: ShaderUniformType;
            };
        };
    };
    objects: {
        resultScreen: {
            shader: string;
            geometry: string;
        };
    };
};
export default _default;
