import * as render from './renderer';
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
export declare const renderer: typeof render;
export default render;
