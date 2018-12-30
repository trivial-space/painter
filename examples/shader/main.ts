import { painter } from '../painter'
import shaderCode from './shader.glsl'

const main = painter.createFrame().update({
	layers: painter.createEffect().update({
		frag: shaderCode,
	}),
})

painter.compose(main).display(main)
