import { GL, TypedArray } from './renderer-types';
export declare type GeometryDrawType = 'TRIANGLES' | 'TRIANGLE_STRIP' | 'TRIANGLE_FAN' | 'POINTS' | 'LINES' | 'LINE_LOOP' | 'LINE_STRIP';
export declare type GeometryStoreType = 'DYNAMIC' | 'STATIC';
export interface GeometryBufferStore {
    readonly buffer: TypedArray;
    readonly storeType?: GeometryStoreType;
}
export interface GeometryData {
    readonly drawType: GeometryDrawType;
    readonly itemCount: number;
    readonly attribs: {
        [id: string]: GeometryBufferStore;
    };
    readonly elements?: GeometryBufferStore;
}
export interface AttribContext {
    buffer: WebGLBuffer | null;
    stride?: number;
    offset?: number;
    normalize?: boolean;
}
export declare class Geometry {
    gl: GL;
    drawType: number;
    itemCount: number;
    attribs: {
        [id: string]: AttribContext;
    };
    elements?: {
        buffer: WebGLBuffer | null;
        glType: number | null;
    };
    constructor(gl: GL);
    update(data: GeometryData): void;
    delete(): void;
}
export declare const glTypeToTypedArray: {
    [x: number]: Int8ArrayConstructor | Uint8ArrayConstructor | Int16ArrayConstructor | Uint16ArrayConstructor | Int32ArrayConstructor | Uint32ArrayConstructor | Float32ArrayConstructor;
};
export declare function getGLTypeForTypedArray(typedArray: any): 5120 | 5121 | 5122 | 5123 | 5124 | 5125 | 5126;
export declare function getGLTypeForTypedArrayType(typedArrayType: any): 5120 | 5121 | 5122 | 5123 | 5124 | 5125 | 5126;
