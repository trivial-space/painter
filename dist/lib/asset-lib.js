import * as constants from './contants';
export default {
    defaultSettings: {
        clearColor: [0.0, 0.0, 0.0, 1.0],
        minFilter: 'LINEAR',
        magFilter: 'NEAREST',
        wrap: 'CLAMP_TO_EDGE',
        clearBuffers: ['DEPTH', 'COLOR'],
        clearBits: 0,
        enable: ['DEPTH_TEST'],
        blend: ['SRC_ALPHA', 'ONE_MINUS_SRC_ALPHA'],
        width: 0,
        height: 0
    },
    geometries: {
        renderQuad: {
            attribs: (_a = {},
                _a[constants.GEOMETRY_PROP_POSITION] = {
                    buffer: new Float32Array([
                        -1, 1,
                        -1, -1,
                        1, 1,
                        1, -1
                    ]),
                    storeType: 'STATIC'
                },
                _a[constants.GEOMETRY_PROP_UV] = {
                    buffer: new Float32Array([
                        0, 1,
                        0, 0,
                        1, 1,
                        1, 0
                    ]),
                    storeType: 'STATIC'
                },
                _a),
            drawType: 'TRIANGLE_STRIP',
            itemCount: 4
        }
    },
    shaders: {
        basicEffect: {
            vert: "\n        attribute vec2 " + constants.GEOMETRY_PROP_POSITION + ";\n        attribute vec2 " + constants.GEOMETRY_PROP_UV + ";\n        varying vec2 vUv;\n        void main() {\n          vUv = " + constants.GEOMETRY_PROP_UV + ";\n          gl_Position = vec4(" + constants.GEOMETRY_PROP_POSITION + ", 0.0, 1.0);\n        }",
            frag: "\n        uniform sampler2D " + constants.UNIFORM_SOURCE_TEXTURE + ";\n        varying vec2 vUv;\n        void main() {\n          gl_FragColor = texture2D(" + constants.UNIFORM_SOURCE_TEXTURE + ", vUv);\n        }"
        }
    }
};
var _a;
//# sourceMappingURL=asset-lib.js.map