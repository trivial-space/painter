import { GeometryData } from '../../renderer-types';
export declare const STACK_GL_GEOMETRY_PROP_POSITION = "positions";
export declare const STACK_GL_GEOMETRY_PROP_NORMAL = "normals";
export declare const STACK_GL_GEOMETRY_PROP_UV = "normals";
export declare const STACK_GL_GEOMETRY_PROP_ELEMENTS = "cells";
export declare function convertStackGLGeometry(stackglGeometry: {
    [id: string]: number[][];
}): GeometryData;