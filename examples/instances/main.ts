import { mat4, quat } from 'gl-matrix'
import { painter, gl } from '../painter'
import { makeClear } from '../../lib/utils/context'

const rotationX = 0.01
const rotationZ = 0.009101

const triangleCount = 5000

painter.updateDrawSettings({
	clearColor: [1.0, 0.5, 0.8, 1.0]
})

interface Dimension {
	pos: number[]
	scale: number[]
	rot: quat
}

const dimensions: Dimension[] = []
for (let i = 0; i < triangleCount; i++) {
	const q = quat.create()
	const scale = Math.random() * 5 + 1
	quat.rotateX(q, q, Math.random() * Math.PI)
	quat.rotateY(q, q, Math.random() * Math.PI)
	quat.rotateZ(q, q, Math.random() * Math.PI)
	dimensions.push({
		pos: [
			Math.random() * 100 - 50,
			Math.random() * 100 - 50,
			Math.random() * 100 - 100
		],
		scale: [scale, scale, scale],
		rot: q
	})
}

dimensions.sort((d1, d2) =>
	d1.pos[2] > d2.pos[2] ? 1 : d1.pos[2] < d2.pos[2] ? -1 : 0
)

const projection = mat4.perspective(mat4.create(), 65, 1, 0.01, 1000)

const cubes = dimensions.map(vals => ({
	transform: mat4.fromRotationTranslationScale(
		mat4.create(),
		vals.rot,
		vals.pos,
		vals.scale
	),
	color: new Float32Array([Math.random(), Math.random(), Math.random(), 0.8])
}))

const form = painter.createForm().update({
	attribs: {
		position: {
			buffer: new Float32Array([1, 1, 1, 0, 0, 0, 1, 0, 0])
		}
	},
	drawType: 'TRIANGLES',
	itemCount: 3
})

const shade = painter.createShade().update({
	vert: `
		attribute vec3 position;
		uniform mat4 camera;
		uniform mat4 transform;

		void main() {
			gl_Position = camera * transform * vec4(position, 1.0);
		}
	`,
	frag: `precision mediump float;
		uniform vec4 color;
		void main() {
			gl_FragColor = color;
		}
	`
})

const sketch = painter.createSketch().update({
	shade,
	form,
	uniforms: cubes,
	drawSettings: {
		enable: [gl.BLEND],
		clearBits: makeClear(gl, 'color', 'depth')
	}
})

function animate() {
	cubes.forEach(({ transform }, i) => {
		mat4.rotateY(transform, transform, rotationX)
		mat4.rotateZ(transform, transform, rotationZ * (i / triangleCount))
		mat4.rotateX(transform, transform, 1.78 * rotationZ)
	})
	painter.draw(sketch, { camera: projection })
	requestAnimationFrame(animate)
}

animate()
;(window as any)['gl'] = gl
