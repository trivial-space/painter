import * as consts from './contants';
import * as plane from './utils/geometry/plane';
import * as stackgl from './utils/stackgl';
import * as context from './utils/context';
import * as aLib from './asset-lib';
import * as Painter from './painter';
export var utils = {
    geometry: {
        plane: plane
    },
    stackgl: stackgl,
    context: context
};
export var lib = aLib;
export var constants = consts;
export var painter = Painter;
export default painter;
//# sourceMappingURL=index.js.map