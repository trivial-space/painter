import * as constants from '../contants';
import { flatten } from 'tvs-libs/dist/lib/utils/sequence';
export var STACK_GL_GEOMETRY_PROP_POSITION = 'positions';
export var STACK_GL_GEOMETRY_PROP_NORMAL = 'normals';
export var STACK_GL_GEOMETRY_PROP_UV = 'uvs';
export var STACK_GL_GEOMETRY_PROP_ELEMENTS = 'cells';
export function convertStackGLGeometry(stackglGeometry) {
    var geometry = {
        drawType: 'TRIANGLES',
        attribs: {},
        itemCount: 0
    };
    for (var prop in stackglGeometry) {
        var arr = stackglGeometry[prop];
        if (prop === STACK_GL_GEOMETRY_PROP_ELEMENTS) {
            var buffer = new (arr.length > 65535 ? Uint32Array : Uint16Array)(flatten(arr));
            Object.assign(geometry, {
                elements: { buffer: buffer },
                itemCount: buffer.length
            });
        }
        else if (prop === STACK_GL_GEOMETRY_PROP_POSITION) {
            geometry.attribs[constants.GEOMETRY_PROP_POSITION] = {
                buffer: new Float32Array(flatten(arr))
            };
        }
        else if (prop === STACK_GL_GEOMETRY_PROP_NORMAL) {
            geometry.attribs[constants.GEOMETRY_PROP_NORMAL] = {
                buffer: new Float32Array(flatten(arr))
            };
        }
        else if (prop === STACK_GL_GEOMETRY_PROP_UV) {
            geometry.attribs[constants.GEOMETRY_PROP_UV] = {
                buffer: new Float32Array(flatten(arr))
            };
        }
        else {
            geometry.attribs[prop] = { buffer: new Float32Array(flatten(arr)) };
        }
    }
    return geometry;
}
//# sourceMappingURL=stackgl.js.map