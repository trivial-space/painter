import { painter } from '../painter'
import shaderCode from './shader.glsl'

// painter.draw({
// 	effects: painter.createEffect().update({
// 		frag: shaderCode,
// 	}),
// })

const main = painter.createLayer().update({
	effects: painter.createEffect().update({
		frag: shaderCode,
	}),
})

painter.compose(main).show(main)
