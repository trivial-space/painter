import * as consts from './contants';
import * as plane from './utils/geometry/plane';
import * as stackgl from './utils/stackgl';
import * as context from './utils/context';
import * as aLib from './asset-lib';
import * as Painter from './painter';
export * from './painter-types';
export declare const utils: {
    geometry: {
        plane: typeof plane;
    };
    stackgl: typeof stackgl;
    context: typeof context;
};
export declare const lib: typeof aLib;
export declare const constants: typeof consts;
export declare const painter: typeof Painter;
export default painter;
