import { painter } from '../painter'
import shaderCode from './shader.glsl'


let strength = 14

const passes: any[] = []
while (strength >= 1) {
	console.log(strength)
	passes.push({
		direction: 0,
		strength: strength,
		source: null,
		size: [256, 256]
	})
	passes.push({
		direction: 1,
		strength: strength,
		source: null,
		size: [256, 256]
	})
	strength /= 2
}

const layer = painter.createEffectLayer().update({
	buffered: true,
	width: 256,
	height: 256,
	minFilter: 'LINEAR',
	magFilter: 'LINEAR',
	frag: shaderCode,
	uniforms: passes
})


const texture = painter.createStaticLayer().update({
	minFilter: 'LINEAR',
	magFilter: 'LINEAR'
})


const img = new Image()
img.onload = function() {
	texture.update({
		asset: img
	})
	painter.compose(texture, layer)
}

img.src = '../hepatica_256.png'
