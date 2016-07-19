
import 'systemjs-hot-reloader/default-listener.js'
import renderer from '../../lib/renderer.ts'
import {ctx} from '../ctx.ts'
import {mat4} from 'gl-matrix'

import planeVert from './plane-material.vert!text'
import planeFrag from './plane-material.frag!text'
import effectFrag from './effect.frag!text'


let planMat = mat4.fromTranslation(mat4.create(), [0, 0, -1]),
    rotation = 0.01,
    projection = mat4.perspective(mat4.create(), 45, 1, 0.01, 10)


// ===== initialize animation =====

function animate () {
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
img.src = '../shared-assets/hepatica_256.png'


// ===== Setup Render Context =====

renderer.updateLayer(ctx, "planeLayer", {
  objects: ["plane"],
  clearColor: [0.0, 1.0, 0.0, 1.0]
})

renderer.updateLayer(ctx, "effectLayer", {
  shader: "effect",
})

renderer.updateGeometry(ctx, "planeGeometry", {
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
})

renderer.updateShader(ctx, "planeMaterial", {
  vert: planeVert,
  frag: planeFrag,
  attribs: {
    "position": "f 3",
    "uv": "f 2"
  },
  uniforms: {
    "source": "t",
    "object": "m 4",
    "projection": "m 4"
  }
})

renderer.updateShader(ctx, "effect", (Object as any).assign({}, renderer.lib.shaders.basicEffect, {
  frag: effectFrag
}))

renderer.updateObject(ctx, "plane", {
  shader: "planeMaterial",
  geometry: "planeGeometry",
  uniforms: {
    source: "textureLayer",
    projection,
    object: planMat
  },
  blend: true
})
