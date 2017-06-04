import render from './renderer';
import * as consts from './contants';
import * as stackgl from './utils/stackgl/helpers';
import * as types from './renderer-types';
export * from './renderer-types';
export declare const renderUtils: {
    geometry: {
        plane: (width: number, height: number, widthSegments?: number | undefined, heightSegments?: number | undefined) => any;
    };
    stackgl: typeof stackgl;
};
export declare const constants: typeof consts;
export declare const renderer: {
    create: (canvas?: HTMLCanvasElement | undefined) => any;
    init: (ctx: any, data: any) => any;
    updateSettings: (ctx: any, data?: any) => any;
    updateObject: any;
    updateLayer: (ctx: any, layerId: string, data: types.LayerData) => any;
    updateSize: (ctx: any) => any;
    renderLayers: (ctx: any, layerIds: string[]) => void;
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
                        storeType: any;
                    };
                };
                drawType: any;
                itemCount: number;
            };
        };
        shaders: {
            basicEffect: {
                vert: string;
                frag: string;
            };
        };
    };
};
export default render;
