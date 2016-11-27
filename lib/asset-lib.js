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
        blend: ["SRC_ALPHA", "ONE_MINUS_SRC_ALPHA"],
        width: 0,
        height: 0
    },
    geometries: {
        renderQuad: {
            attribs: {
                [constants.GEOMETRY_PROP_POSITION]: {
                    buffer: new Float32Array([
                        -1, 1,
                        -1, -1,
                        1, 1,
                        1, -1
                    ]),
                    storeType: "STATIC"
                },
                [constants.GEOMETRY_PROP_UV]: {
                    buffer: new Float32Array([
                        0, 1,
                        0, 0,
                        1, 1,
                        1, 0
                    ]),
                    storeType: "STATIC"
                }
            },
            drawType: "TRIANGLE_STRIP",
            itemCount: 4
        }
    },
    shaders: {
        basicEffect: {
            vert: `
        attribute vec2 ${constants.GEOMETRY_PROP_POSITION};
        attribute vec2 ${constants.GEOMETRY_PROP_UV};
        varying vec2 vUv;
        void main() {
          vUv = ${constants.GEOMETRY_PROP_UV};
          gl_Position = vec4(${constants.GEOMETRY_PROP_POSITION}, 0.0, 1.0);
        }`,
            frag: `
        uniform sampler2D ${constants.UNIFORM_SOURCE_TEXTURE};
        varying vec2 vUv;
        void main() {
          gl_FragColor = texture2D(${constants.UNIFORM_SOURCE_TEXTURE}, vUv);
        }`,
            attribs: {
                [constants.GEOMETRY_PROP_POSITION]: "f 2",
                [constants.GEOMETRY_PROP_UV]: "f 2"
            },
            uniforms: {
                [constants.UNIFORM_SOURCE_TEXTURE]: "t"
            }
        }
    },
    objects: {
        resultScreen: {
            shader: '_basicEffect',
            geometry: '_renderQuad'
        }
    }
};
//# sourceMappingURL=asset-lib.js.map