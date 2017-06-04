import * as constants from '../../contants';
export var STACK_GL_GEOMETRY_PROP_POSITION = 'positions';
export var STACK_GL_GEOMETRY_PROP_NORMAL = 'normals';
export var STACK_GL_GEOMETRY_PROP_UV = 'uvs';
export var STACK_GL_GEOMETRY_PROP_ELEMENTS = 'cells';
function _flatten(array) {
    var results = [];
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var subarray = array_1[_i];
        for (var _a = 0, subarray_1 = subarray; _a < subarray_1.length; _a++) {
            var el = subarray_1[_a];
            results.push(el);
        }
    }
    return results;
}
export function convertStackGLGeometry(stackglGeometry) {
    var geometry = {
        drawType: 'TRIANGLES',
        attribs: {},
        itemCount: 0
    };
    for (var prop in stackglGeometry) {
        var arr = stackglGeometry[prop];
        if (prop === STACK_GL_GEOMETRY_PROP_ELEMENTS) {
            var buffer = new (arr.length > 65535 ? Uint32Array : Uint16Array)(_flatten(arr));
            Object.assign(geometry, {
                elements: { buffer: buffer },
                itemCount: buffer.length
            });
        }
        else if (prop === STACK_GL_GEOMETRY_PROP_POSITION) {
            geometry.attribs[constants.GEOMETRY_PROP_POSITION] = {
                buffer: new Float32Array(_flatten(arr))
            };
        }
        else if (prop === STACK_GL_GEOMETRY_PROP_NORMAL) {
            geometry.attribs[constants.GEOMETRY_PROP_NORMAL] = {
                buffer: new Float32Array(_flatten(arr))
            };
        }
        else if (prop === STACK_GL_GEOMETRY_PROP_UV) {
            geometry.attribs[constants.GEOMETRY_PROP_UV] = {
                buffer: new Float32Array(_flatten(arr))
            };
        }
        else {
            geometry.attribs[prop] = { buffer: new Float32Array(_flatten(arr)) };
        }
    }
    return geometry;
}
//# sourceMappingURL=helpers.js.map