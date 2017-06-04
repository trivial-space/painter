const ctx: any = {}
const renderer: any = {}

import shaderCode from './shader.glsl'


// ===== Setup Render Context =====

renderer.updateLayer(ctx, 'shaderLayer', {
  shader: 'shader'
})

renderer.updateShader(ctx, 'shader', {
  ...renderer.lib.shaders.basicEffect,
  frag: shaderCode
})

renderer.renderLayers(ctx, ['shaderLayer'])
