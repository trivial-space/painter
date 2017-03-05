import renderer from '../../lib/index.js'
import {ctx} from '../ctx.js'
import {mat4} from 'gl-matrix'

import plainVert from './plain-material.vert'
import plainFrag from './plain-material.frag'
import effectFrag from './effect.frag'


let planMat = mat4.fromTranslation(mat4.create(), [0, 0, -1]),
    rotation = 0.01,
    projection = mat4.perspective(mat4.create(), 45, 1, 0.01, 10)


function animate () {
  mat4.rotateY(planMat, planMat, rotation)
  renderer.renderLayers(ctx, ['planeLayer', 'effectLayer'])
  // renderer.renderLayers(ctx, ['textureLayer'])
  requestAnimationFrame(animate)
}


let img = new Image()
img.onload = function() {
  renderer.updateLayer(ctx, 'textureLayer', {
    asset: img
  })
  animate()
}
img.src = '../shared-assets/hepatica_256.png'


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
      vert: plainVert,
      frag: plainFrag,
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
      frag: effectFrag
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
;(window as any)['ctx'] = ctx
;(window as any)['renderer'] = renderer
