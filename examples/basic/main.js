import 'systemjs-hot-reloader/default-listener.js'
import * as renderer from '../../dist/tvs-renderer'
import {ctx} from '../ctx'

console.log(renderer)

const scene = {
  geometries: {
    planeGeometry: {
      attribs: {
        position: {
          buffer: new Float32Array([
            -0.5, 0.5,
            -0.5, -0.7,
            0.6, 0.5,
            0.5, -0.5
          ])
        },
        uv: {
          buffer: new Float32Array([
            0, 1,
            0, 0,
            1, 1,
            1, 0
          ])
        }
      },
      drawType: "TRIANGLE_STRIP",
      itemCount: 4
    }
  },

  shaders: {
    red: {
      vert:
        `
          attribute vec2 position;
          void main() {
              gl_Position = vec4(position, 0.0, 1.0);
          }
        `,
      frag:
        `
          void main() {
              gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
          }
        `,
      attribs: {
        position: "f 2"
      }
    },
    texture: renderer.lib.shaders.basicEffect,
    effect: {
      ...renderer.lib.shaders.basicEffect,
      frag:
        `
          uniform sampler2D source;
          varying vec2 vUv;
          void main() {
              vec4 new_color = texture2D(source, vUv);
              gl_FragColor = vec4(new_color.rgb * 0.5 + 0.3, 1.0);
          }
        `
    }
  },

  objects: {
    plane1: {
      shader: "red",
      geometry: "planeGeometry"
    },
    plane2: {
      shader: "texture",
      geometry: "planeGeometry"
    }
  },

  layers: {
    textureLayer: {
      objects: ["plane1"],
      clearColor: [1.0, 0.0, 1.0, 1.0]
    },
    planeLayer: {
      objects: ["plane2"],
      clearColor: [0.0, 0.0, 0.0, 1.0]
    },
    effectLayer: {
      shader: "effect",
    }
  }
}

renderer.init(ctx, scene)
renderer.renderLayers(ctx, ['textureLayer', 'planeLayer', 'effectLayer'])
