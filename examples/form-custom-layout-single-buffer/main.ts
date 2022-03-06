import { painter } from '../painter'

const { gl } = painter

const vertices = [
	{ position: [-0.7, 0.7], uv: [0, 0], color: [0x3f, 0xaa, 0xff] },
	{ position: [-0.5, -0.4], uv: [0, 1], color: [0x1f, 0x00, 0xf0] },
	{ position: [0.6, 0.5], uv: [1, 0], color: [0xf, 0xfa, 0x8f] },
	{ position: [0.5, -0.5], uv: [1, 1], color: [0x3f, 0x1a, 0x1f] },
]
const size = 4 + 4 + 2 + 2 + 4
//Create array buffer
const buffer = new ArrayBuffer(size * vertices.length)
//Fill array buffer
const dv = new DataView(buffer)
for (let i = 0; i < vertices.length; i++) {
	dv.setFloat32(size * i, vertices[i].position[0], true)
	dv.setFloat32(size * i + 4, vertices[i].position[1], true)
	dv.setUint16(size * i + 8, vertices[i].uv[0] * 0xffff)
	dv.setUint16(size * i + 10, vertices[i].uv[1] * 0xffff)
	dv.setUint8(size * i + 12, vertices[i].color[0])
	dv.setUint8(size * i + 13, vertices[i].color[1])
	dv.setUint8(size * i + 14, vertices[i].color[2])
	dv.setUint8(size * i + 15, 0)
}

const plane = painter.createForm().update({
	customLayout: {
		data: { buffer },
		layout: {
			position: {
				normalize: false,
				offset: 0,
				size: 2,
				stride: size,
				type: gl.FLOAT,
			},
			uv: {
				normalize: true,
				offset: 8,
				size: 2,
				stride: size,
				type: gl.UNSIGNED_SHORT,
			},
			color: {
				normalize: true,
				offset: 12,
				size: 4,
				stride: size,
				type: gl.UNSIGNED_BYTE,
			},
		},
	},
	drawType: 'TRIANGLE_STRIP',
	itemCount: 4,
})

const paintTexture = painter.createShade().update({
	vert: `
		attribute vec2 position;
		attribute vec3 color;
		attribute vec2 uv;
		varying vec2 vUv;
		varying vec3 vColor;

		void main() {
			vUv = uv;
			vColor = color;
			gl_Position = vec4(position, 0.0, 1.0);
		}
	`,
	frag: `precision mediump float;
		varying vec2 vUv;
		varying vec3 vColor;
		void main() {
			vec3 color = vColor;
			vec2 grid = fract(vUv * 10.0);
			if (grid.x < 0.2 || grid.y < 0.2) {
				color += vec3(0.2);
			}
			gl_FragColor = vec4(color, 1.0);
		}
	`,
})

const planeLayer = painter.createLayer().update({
	sketches: painter.createSketch().update({
		form: plane,
		shade: paintTexture,
	}),
	drawSettings: {
		clearColor: [0.0, 0.0, 0.0, 1.0],
		clearBits: gl.COLOR_BUFFER_BIT,
	},
	directRender: true,
})

painter.compose(planeLayer)
