import * as constants from './contants.ts'
import './renderer-types.ts'

export default {

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
          storeType: "STATIC" as GeometryStoreType
        },
        [constants.GEOMETRY_PROP_UV]: {
          buffer: new Float32Array([
            0, 1,
            0, 0,
            1, 1,
            1, 0
          ]),
          storeType: "STATIC" as GeometryStoreType
        }
      },
      drawType: "TRIANGLE_STRIP" as GeometryDrawType,
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
        [constants.GEOMETRY_PROP_POSITION]: "f 2" as ShaderAttribType,
        [constants.GEOMETRY_PROP_UV]: "f 2" as ShaderAttribType
      },
      uniforms: {
        [constants.UNIFORM_SOURCE_TEXTURE]: "t" as ShaderUniformType
      }
    }
  },

  objects: {

    resultScreen: {
      shader: '_basicEffect',
      geometry: '_renderQuad'
    }
  }
}
