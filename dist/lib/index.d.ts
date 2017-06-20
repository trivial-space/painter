import * as consts from './contants';
import * as plane from './utils/geometry/plane';
import * as stackgl from './utils/stackgl';
export * from './render-types';
export declare const renderUtils: {
    geometry: {
        plane: typeof plane;
    };
    stackgl: typeof stackgl;
};
export declare const constants: typeof consts;
