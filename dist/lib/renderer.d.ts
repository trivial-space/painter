import { Context, ID, ObjectData, ShaderData, GeometryData, LayerData } from './renderer-types';
export declare function create(canvas?: HTMLCanvasElement): Context;
export declare function init(ctx: Context, data: any): Context;
export declare function updateSettings(ctx: Context, data?: any): Context;
export declare function updateObject(ctx: Context, id: ID, object: ObjectData): Context;
export declare function updateShader(ctx: Context, id: ID, data: ShaderData): Context;
export declare function updateGeometry(ctx: Context, id: ID, data: GeometryData): Context;
export declare function updateLayer(ctx: Context, layerId: ID, data: LayerData): Context;
export declare function updateSize(ctx: Context): Context;
export declare function renderLayers(ctx: Context, layerIds: ID[]): void;
declare var _default: {
    create: (canvas?: HTMLCanvasElement | undefined) => Context;
    init: (ctx: Context, data: any) => Context;
    updateSettings: (ctx: Context, data?: any) => Context;
    updateObject: (ctx: Context, id: string, object: ObjectData) => Context;
    updateGeometry: (ctx: Context, id: string, data: GeometryData) => Context;
    updateShader: (ctx: Context, id: string, data: ShaderData) => Context;
    updateLayer: (ctx: Context, layerId: string, data: LayerData) => Context;
    updateSize: (ctx: Context) => Context;
    renderLayers: (ctx: Context, layerIds: string[]) => void;
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
                        storeType: "DYNAMIC" | "STATIC";
                    };
                };
                drawType: "TRIANGLES" | "TRIANGLE_STRIP" | "TRIANGLE_FAN" | "POINTS" | "LINES" | "LINE_LOOP" | "LINE_STRIP";
                itemCount: number;
            };
        };
        shaders: {
            basicEffect: {
                vert: string;
                frag: string;
                attribs: {
                    [x: string]: "f" | "f 1" | "f 2" | "f 3" | "f 4" | "m 2" | "m 3" | "m 4";
                };
                uniforms: {
                    [x: string]: "i" | "f" | "f 1" | "f 2" | "f 3" | "f 4" | "m 2" | "m 3" | "m 4" | "i 1" | "i 2" | "i 3" | "i 4" | "t";
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
export default _default;
