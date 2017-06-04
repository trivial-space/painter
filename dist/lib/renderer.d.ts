import { Context, ID, LayerData } from './renderer-types';
export declare function create(canvas?: HTMLCanvasElement): Context;
export declare function init(ctx: Context, data: any): Context;
export declare function updateSettings(ctx: Context, data?: any): Context;
export declare function updateLayer(ctx: Context, layerId: ID, data: LayerData): Context;
export declare function updateSize(ctx: Context): Context;
export declare function renderLayers(ctx: Context, layerIds: ID[]): void;
declare var _default: {
    create: (canvas?: HTMLCanvasElement | undefined) => any;
    init: (ctx: any, data: any) => any;
    updateSettings: (ctx: any, data?: any) => any;
    updateObject: any;
    updateLayer: (ctx: any, layerId: string, data: LayerData) => any;
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
export default _default;
