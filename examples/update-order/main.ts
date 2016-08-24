import 'systemjs-hot-reloader/default-listener.js'
import {renderer, renderUtils} from '../../lib/index.ts'
import {ctx} from '../ctx.js'
import {mat4} from 'gl-matrix'

import planeVert from './plane-material.vert!text'
import planeFrag from './plane-material.frag!text'
import effectFrag from './effect.frag!text'


let planMat1 = mat4.fromTranslation(mat4.create(), [0, 0, -3]),
    planMat2 = mat4.fromTranslation(mat4.create(), [0, 0, -3]),
    rotation = 0.01,
    projection = mat4.perspective(mat4.create(), 45, 1, 0.01, 10)

mat4.rotateY(planMat2, planMat2, Math.PI / 2)


// ===== initialize animation =====

function animate () {
  mat4.rotateY(planMat1, planMat1, rotation)
  mat4.rotateY(planMat2, planMat2, rotation)
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


// ===== Setup Render Context =====

renderer.updateLayer(ctx, "planeLayer", {
  objects: ["plane1", "plane2"],
  clearColor: [0.0, 1.0, 0.0, 1.0]
})

renderer.updateLayer(ctx, "effectLayer", {
  shader: "effect",
})

renderer.updateGeometry(ctx, "planeGeometry", renderUtils.geometry.plane(2, 2))

renderer.updateShader(ctx, "planeMaterial", {
  vert: planeVert,
  frag: planeFrag,
  attribs: {
    "position": "f 3",
    "uv": "f 2"
  },
  uniforms: {
    "texture": "t",
    "object": "m 4",
    "projection": "m 4"
  }
})

renderer.updateShader(ctx, "effect", Object.assign({}, renderer.lib.shaders.basicEffect, {
  frag: effectFrag
}))

renderer.updateObject(ctx, "plane1", {
  shader: "planeMaterial",
  geometry: "planeGeometry",
  uniforms: {
    texture: "textureLayer",
    projection,
    object: planMat1
  }
})

renderer.updateObject(ctx, "plane2", {
  shader: "planeMaterial",
  geometry: "planeGeometry",
  uniforms: {
    texture: "textureLayer",
    projection,
    object: planMat2
  },
  blend: true
})
