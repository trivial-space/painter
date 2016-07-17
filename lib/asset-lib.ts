import './renderer-types'

export default {

  geometries: {

    renderQuad: {
      attribs: {
        "position": {
          buffer: new Float32Array([
            -1, 1,
            -1, -1,
            1, 1,
            1, -1
          ]),
          storeType: "STATIC" as GeometryStoreType
        },
        "uv": {
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
        attribute vec2 position;
        attribute vec2 uv;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 0.0, 1.0);
        }`,
      frag: `
        uniform sampler2D source;
        varying vec2 vUv;
        void main() {
          gl_FragColor = texture2D(source, vUv);
        }`,
      attribs: {
        "position": "f 2" as ShaderAttribType,
        "uv": "f 2" as ShaderAttribType
      },
      uniforms: {
        "source": "t" as ShaderUniformType
      }
    }
  },

  objects: {

    resultScreen: {
      shader: 'basicEffect',
      geometry: 'renderQuad'
    }
  }
}
