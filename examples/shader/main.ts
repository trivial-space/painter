import { painter } from '../painter'
import shaderCode from './shader.glsl'

painter.draw({
	effects: painter.createEffect().update({
		frag: shaderCode,
	}),
})
