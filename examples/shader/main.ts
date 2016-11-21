import 'systemjs-hot-reloader/default-listener.js'
import {renderer} from '../../lib/index'
import {ctx} from '../ctx'

import shaderCode from './shader.glsl!text'


// ===== Setup Render Context =====

renderer.updateLayer(ctx, "shaderLayer", {
  shader: "shader",
})

renderer.updateShader(ctx, "shader", Object.assign({}, renderer.lib.shaders.basicEffect, {
  frag: shaderCode
}))

renderer.renderLayers(ctx, ['shaderLayer'])