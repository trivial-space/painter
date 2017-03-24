import render from './renderer';
import * as consts from './contants';
import { plane } from './utils/geometry/plane';
import * as stackgl from './utils/stackgl/helpers';
import * as types from './renderer-types';
types;
export var renderUtils = {
    geometry: {
        plane: plane
    },
    stackgl: stackgl
};
export var constants = consts;
export var renderer = render;
export default render;
//# sourceMappingURL=index.js.map