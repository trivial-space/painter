import { mat4 } from 'gl-matrix'
import { makeClear } from '../../src/utils/context'
import { plane } from '../../src/utils/geometry/plane'
import { painter } from '../painter'
import effectFrag from './effect.frag'
import planeFrag from './plane-material.frag'
import planeVert from './plane-material.vert'

const { gl } = painter

const planMat1 = mat4.fromTranslation(mat4.create(), [0, 0, -3])
const planMat2 = mat4.fromTranslation(mat4.create(), [0, 0, -3])
const rotation = 0.01
const projection = mat4.perspective(mat4.create(), 45, 1, 0.01, 10)

mat4.rotateY(planMat2, planMat2, Math.PI / 2)

// ===== Setup Render Context =====

const texture = painter.createLayer()

const effect = painter.createEffect().update({
	frag: effectFrag,
	uniforms: {
		source: '0',
	},
})

const form = painter.createForm().update(plane(2, 2))

const shade = painter.createShade().update({
	vert: planeVert,
	frag: planeFrag,
})

const plane1 = painter.createSketch().update({
	form,
	shade,
	uniforms: {
		transform: planMat1,
	},
	drawSettings: {
		enable: [gl.CULL_FACE],
	},
})

const plane2 = painter.createSketch().update({
	form,
	shade,
	uniforms: {
		transform: planMat2,
	},
	drawSettings: {
		enable: [gl.BLEND],
	},
})

const scene = painter.createLayer().update({
	sketches: [plane1, plane2],
	effects: effect,
	uniforms: {
		projection,
		texture: () => texture.image(),
	},
	drawSettings: {
		clearColor: [0.0, 1.0, 0.0, 1.0],
		clearBits: makeClear(gl, 'color', 'depth'),
		enable: [gl.DEPTH_TEST],
	},
	// directRender: true,
})

// ===== initialize animation =====

function animate() {
	console.log('animating')
	mat4.rotateY(planMat1, planMat1, rotation)
	mat4.rotateY(planMat2, planMat2, rotation)
	painter.compose(scene).show(scene)
	// painter.show(texture)
	requestAnimationFrame(animate)
}

const img = new Image()
img.onload = () => {
	texture.update({
		texture: {
			asset: img,
		},
	})
	animate()
}
img.src = '../hepatica_256.png'
