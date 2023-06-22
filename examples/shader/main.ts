import { painter } from '../painter'
import shaderCode from './shader.glsl?raw'

painter.draw({
	effects: painter.createEffect().update({
		frag: shaderCode,
	}),
})
