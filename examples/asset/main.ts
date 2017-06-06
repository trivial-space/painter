import { painter, gl } from '../painter'
import { mat4 } from 'gl-matrix'
import planeVert from './plane-material.vert'
import planeFrag from './plane-material.frag'
import effectFrag from './effect.frag'
import { plane } from '../../lib/utils/geometry/plane'


painter.resize(window.devicePixelRatio)

const planMat1 = mat4.fromTranslation(mat4.create(), [0, 0, -3])
const planMat2 = mat4.fromTranslation(mat4.create(), [0, 0, -3])
const rotation = 0.01
const projection = mat4.perspective(mat4.create(), 45, 1, 0.01, 10)

mat4.rotateY(planMat2, planMat2, Math.PI / 2)


// ===== Setup Render Context =====

const texture = painter.createStaticLayer().update({
	minFilter: 'LINEAR',
	magfilter: 'LINEAR'
})

const effect = painter.createEffectLayer().update({
	frag: effectFrag,
	uniforms: {
		source: null
	}
})

const form = painter.createForm().update(plane(2, 2))

const shade = painter.createShade().update({
	vert: planeVert,
	frag: planeFrag
})

console.log(texture)

const plane1 = painter.createSketch().update({
	form, shade,
	uniforms: {
		transform: planMat1
	}
})

const plane2 = painter.createSketch().update({
	form, shade,
	uniforms: {
		transform: planMat2
	},
	blend: true
})

const planeLayer = painter.createDrawingLayer().update({
	sketches: [plane1, plane2],
	uniforms: {
		texture: texture.texture(),
		projection
	},
	clearColor: [0.0, 1.0, 0.0, 1.0],
	clearBits: gl.COLOR_BUFFER_BIT
})


// ===== initialize animation =====

function animate () {
	mat4.rotateY(planMat1, planMat1, rotation)
	mat4.rotateY(planMat2, planMat2, rotation)
	painter.compose(planeLayer, effect)
	requestAnimationFrame(animate)
}


const img = new Image()
img.onload = function() {
	texture.update({
		asset: img
	})
	animate()
}
img.src = '../shared-assets/hepatica_256.png'

