import { AttribSetter, DrawSettings, GL, UniformSetter } from './painter-types';
export declare function createUniformSetters(gl: GL, program: WebGLProgram): {
    [id: string]: UniformSetter;
};
export declare function createAttributeSetters(gl: GL, program: WebGLProgram): {
    [id: string]: AttribSetter;
};
export declare const glTypeToTypedArray: {
    5120: Int8ArrayConstructor;
    5121: Uint8ArrayConstructor;
    5122: Int16ArrayConstructor;
    5123: Uint16ArrayConstructor;
    5124: Int32ArrayConstructor;
    5125: Uint32ArrayConstructor;
    5126: Float32ArrayConstructor;
    32819: Uint16ArrayConstructor;
    32820: Uint16ArrayConstructor;
    33635: Uint16ArrayConstructor;
    5131: Uint16ArrayConstructor;
    33640: Uint32ArrayConstructor;
    35899: Uint32ArrayConstructor;
    35902: Uint32ArrayConstructor;
    36269: Uint32ArrayConstructor;
    34042: Uint32ArrayConstructor;
};
export declare function getGLTypeForTypedArray(typedArray: any): 5120 | 5121 | 5122 | 5123 | 5124 | 5125 | 5126;
export declare function getGLTypeForTypedArrayType(typedArrayType: any): 5120 | 5121 | 5122 | 5123 | 5124 | 5125 | 5126;
export declare function applyDrawSettings(gl: GL, settings: DrawSettings): void;
export declare function revertDrawSettings(gl: GL, settings: DrawSettings): void;
