import { painter } from '../painter'
import base from './glsl/base.frag.glsl?raw'

const bufferSize = 256

const initTexData: number[] = []
for (let i = 0; i < bufferSize * bufferSize; i++) {
	initTexData.push(Math.round(Math.random()) * 255, 0, 0, 255)
}

const initTexture = painter.createLayer().update({
	width: bufferSize,
	height: bufferSize,
	texture: { data: new Uint8Array(initTexData) },
})

const effect = painter.createEffect().update({
	frag: base,
	uniforms: {
		size: bufferSize,
		previous: initTexture.image(),
	},
})

export const automaton = painter.createLayer().update({
	effects: effect,
	width: bufferSize,
	height: bufferSize,
	selfReferencing: true,
})

painter.compose(automaton).show(automaton)

effect.update({
	uniforms: {
		size: bufferSize,
		previous: () => '0',
	},
})

setInterval(() => painter.compose(automaton).show(automaton), 200)
