import * as aLib from './asset-lib';
import * as consts from './contants';
import * as context from './utils/context';
import * as plane from './utils/geometry/plane';
import * as stackgl from './utils/stackgl';
export * from './painter';
export * from './painter-types';
export const utils = {
    geometry: {
        plane,
    },
    stackgl,
    context,
};
export const lib = aLib;
export const constants = consts;
//# sourceMappingURL=index.js.map