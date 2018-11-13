import { painter } from '../painter'
import shaderCode from './shader.glsl'

const layer = painter.createEffectLayer().update({
	frag: shaderCode
})

painter.compose(layer)
