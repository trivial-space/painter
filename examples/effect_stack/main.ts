import { painter } from '../painter'
import shaderCode from './shader.glsl'

painter.sizeMultiplier = window.devicePixelRatio
painter.resize()

// effect

let strength = 10
const size = 256

const passes: any[] = []
while (strength >= 1) {
	console.log(strength)
	passes.push({
		direction: 0,
		strength,
		source: '0',
		size: [size, size],
	})
	passes.push({
		direction: 1,
		strength,
		source: '0',
		size: [size, size],
	})
	strength /= 2
}

const effect = painter.createEffect().update({
	frag: shaderCode,
	uniforms: passes,
})

const image = painter.createLayer().update({
	width: size,
	height: size,
	effects: effect,
	bufferStructure: [
		{
			minFilter: 'NEAREST',
			magFilter: 'NEAREST',
		},
	],
	directRender: true,
})

// scene

const form = painter.createForm().update({
	attribs: {
		position: {
			buffer: new Float32Array([-0.9, 0.9, -0.7, -0.6, 0.8, 0.7, 0.7, -0.7]),
		},
		uv: {
			buffer: new Float32Array([0, 1, 0, 0, 1, 1, 1, 0]),
		},
	},
	drawType: 'TRIANGLE_STRIP',
	itemCount: 4,
})

const shade = painter.createShade().update({
	vert: `
		attribute vec2 position;
		attribute vec2 uv;
		varying vec2 vUv;
		void main() {
			gl_Position = vec4(position, 0.0, 1.0);
			vUv = uv;
		}
	`,
	frag: `precision mediump float;
		uniform sampler2D tex;
		varying vec2 vUv;
		void main() {
			gl_FragColor = texture2D(tex, vUv);
		}
	`,
})

const scene = painter.createLayer().update({
	sketches: painter.createSketch().update({
		form,
		shade,
		uniforms: { tex: () => image.image() },
	}),
	drawSettings: {
		clearColor: [1, 0.7, 0.8, 1],
		clearBits: painter.gl.COLOR_BUFFER_BIT,
	},
})

const img = new Image()

img.onload = () => {
	image.update({
		texture: {
			asset: img,
			minFilter: 'LINEAR',
			magFilter: 'LINEAR',
		},
	})
	painter.compose(image) //.show(image)
}

img.src = '../hepatica_256.png'
