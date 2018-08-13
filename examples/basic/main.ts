import { painter, gl } from '../painter'
import { defaultTextureSettings } from '../../lib/asset-lib'


const plane = painter.createForm().update({
	attribs: {
		position: {
			buffer: new Float32Array([
				-0.7, 0.7,
				-0.5, -0.4,
				0.6, 0.5,
				0.5, -0.5
			])
		},
		uv: {
			buffer: new Float32Array([
				0, 1,
				0, 0,
				1, 1,
				1, 0
			])
		}
	},
	drawType: 'TRIANGLE_STRIP',
	itemCount: 4
})


const red = painter.createShade().update({
	vert: `
		attribute vec2 position;
		void main() {
			gl_Position = vec4(position, 0.0, 1.0);
		}
	`,
	frag: `precision mediump float;
		void main() {
			gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
		}
	`
})


const textureLayer = painter.createDrawingLayer().update({
	buffered: true,
	sketches: [painter.createSketch().update({
		form: plane,
		shade: red
	})],
	drawSettings: {
		clearColor: [1.0, 0.0, 1.0, 1.0],
		clearBits: gl.COLOR_BUFFER_BIT
	},
	...defaultTextureSettings
})


const paintTexture = painter.createShade().update({
	vert: `
		attribute vec2 position;
		attribute vec2 uv;
		varying vec2 coords;

		void main() {
			coords = uv;
			gl_Position = vec4(position, 0.0, 1.0);
		}
	`,
	frag: `precision mediump float;
		uniform sampler2D fufu;
		varying vec2 coords;
		void main() {
			vec4 new_color = texture2D(fufu, coords);
			gl_FragColor = vec4(new_color.g + 0.2, new_color.r + 0.2, new_color.b + 0.2, 1.0);
		}
	`
})

const planeLayer = painter.createDrawingLayer().update({
	sketches: [painter.createSketch().update({
		form: plane,
		shade: paintTexture,
		uniforms: {
			fufu: () => textureLayer.texture()
		}
	})],
	drawSettings: {
		clearColor: [0.0, 0.0, 0.0, 1.0],
		clearBits: gl.COLOR_BUFFER_BIT
	}
})


const effect = painter.createEffectLayer().update({
	frag: `precision mediump float;
		uniform sampler2D source;
		varying vec2 coords;
		void main() {
			vec4 new_color = texture2D(source, coords);
			gl_FragColor = vec4(new_color.rgb * 0.5 + 0.3, 1.0);
		}
	`,
	uniforms: {
		source: null
	}
})


painter.compose(textureLayer, planeLayer, effect)

if (module.hot) {
	module.hot.accept()
}
