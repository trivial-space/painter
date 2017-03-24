import render from './renderer';
import * as consts from './contants';
import * as stackgl from './utils/stackgl/helpers';
import * as types from './renderer-types';
export * from './renderer-types';
export declare const renderUtils: {
    geometry: {
        plane: (width: number, height: number, widthSegments?: number | undefined, heightSegments?: number | undefined) => types.GeometryData;
    };
    stackgl: typeof stackgl;
};
export declare const constants: typeof consts;
export declare const renderer: {
    create: (canvas?: HTMLCanvasElement | undefined) => types.Context;
    init: (ctx: types.Context, data: any) => types.Context;
    updateSettings: (ctx: types.Context, data?: any) => types.Context;
    updateObject: (ctx: types.Context, id: string, object: types.ObjectData) => types.Context;
    updateGeometry: (ctx: types.Context, id: string, data: types.GeometryData) => types.Context;
    updateShader: (ctx: types.Context, id: string, data: types.ShaderData) => types.Context;
    updateLayer: (ctx: types.Context, layerId: string, data: types.LayerData) => types.Context;
    updateSize: (ctx: types.Context) => types.Context;
    renderLayers: (ctx: types.Context, layerIds: string[]) => void;
    lib: {
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
                        storeType: types.GeometryStoreType;
                    };
                };
                drawType: types.GeometryDrawType;
                itemCount: number;
            };
        };
        shaders: {
            basicEffect: {
                vert: string;
                frag: string;
                attribs: {
                    [x: string]: types.ShaderAttribType;
                };
                uniforms: {
                    [x: string]: types.ShaderUniformType;
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
};
export default render;
