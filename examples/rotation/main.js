import 'systemjs-hot-reloader/default-listener.js'
import renderer from '../../dist/tvs-renderer.js'
import {ctx} from '../ctx.js'
import {mat4} from 'gl-matrix'


let planMat = mat4.fromTranslation(mat4.create(), [0, 0, -1]),
    rotation = 0.01,
    projection = mat4.perspective(mat4.create(), 45, 1, 0.01, 10)


function animate () {
  //rotation += 0.01
  mat4.rotateY(planMat, planMat, rotation)
  renderer.renderLayers(ctx, ['planeLayer', 'effectLayer'])
  requestAnimationFrame(animate)
}


let img = new Image()
img.onload = function() {
  renderer.updateLayer(ctx, 'textureLayer', {
    asset: img
  })
  animate()
}
img.src = '../hepatica_256.png'


const scene = {
  geometries: {
    planeGeometry: {
      attribs: {
        position: {
          buffer: new Float32Array([
            -0.5, 0.5, 0.0,
            -0.5, -0.7, 0.0,
            0.6, 0.5, 0.0,
            0.5, -0.5, 0.0
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
    planeMaterial: {
      vert:
        `
          attribute vec3 position;
          attribute vec2 uv;
          uniform mat4 projection;
          uniform mat4 object;

          varying vec2 vUv;

          void main() {
              vUv = uv;
              gl_Position = projection * object * vec4(position, 1.0);
          }
        `,
      frag:
        `
          uniform sampler2D source;
          varying vec2 vUv;
          void main() {
              gl_FragColor = texture2D(source, vUv);
          }
        `,
      attribs: {
        "position": "f 3",
        "uv": "f 2"
      },
      uniforms: {
        "source": "t",
        "object": "m 4",
        "projection": "m 4"

      }
    },
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
    plane: {
      shader: "planeMaterial",
      geometry: "planeGeometry",
      uniforms: {
        source: "textureLayer",
        projection,
        object: planMat
      },
      blend: true
    }
  },

  layers: {
    planeLayer: {
      objects: ["plane"],
      clearColor: [0.0, 1.0, 0.0, 1.0]
    },
    effectLayer: {
      shader: "effect",
    }
  }
}


renderer.init(ctx, scene)
