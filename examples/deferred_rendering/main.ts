import { mat4, vec3 } from 'gl-matrix'
import createCube from 'primitive-cube'
import { makeClear } from '../../lib/utils/context'
import { convertStackGLGeometry } from '../../lib/utils/stackgl'
import { gl, painter } from '../painter'
import geoFrag from './geo.frag'
import geoVert from './geo.vert'
import mainFrag from './main.frag'

painter.updateDrawSettings({
	// depthFunc: gl.LEQUAL,
	blendFunc: [gl.ONE, gl.ONE],
})

const geoShade = painter.createShade().update({
	vert: geoVert,
	frag: geoFrag,
})

const cubeStackgl = createCube(1)
const cubeGeometry = convertStackGLGeometry(cubeStackgl)
const geoForm = painter.createForm().update(cubeGeometry)

// CAMERA STUFF

const projMatrix = mat4.create()
mat4.perspective(
	projMatrix,
	Math.PI / 2,
	gl.canvas.width / gl.canvas.height,
	0.1,
	10.0,
)

const viewMatrix = mat4.create()
const eyePosition = vec3.fromValues(1, 1, 1)
mat4.lookAt(
	viewMatrix,
	eyePosition,
	vec3.fromValues(0, 0, 0),
	vec3.fromValues(0, 1, 0),
)

const viewProjMatrix = mat4.create()
mat4.multiply(viewProjMatrix, projMatrix, viewMatrix)

// BOX DESCRIPTIONS FOR GEO PASS

const box1 = mat4.create()
const box2 = mat4.create()

mat4.fromTranslation(box2, [0.8, 0.8, 0.4])
mat4.scale(box2, box2, [0.1, 0.1, 0.1])
mat4.rotateZ(box2, box2, Math.PI / 3)

const boxes = [
	{
		uModelMatrix: box1,
		uMVP: mat4.create(),
	},
	{
		uModelMatrix: box2,
		uMVP: mat4.create(),
	},
]

const geoSketch = painter.createSketch().update({
	form: geoForm,
	shade: geoShade,
	uniforms: boxes,
})

const geoLayer = painter.createLayer().update({
	sketches: [geoSketch],
	drawSettings: {
		enable: [gl.DEPTH_TEST],
		clearBits: makeClear(gl, 'color', 'depth'),
	},
})

const geo = painter.createFrame().update({
	bufferStructure: ['FLOAT', 'FLOAT', 'FLOAT'],
	layers: [geoLayer],
	minFilter: 'NEAREST',
	magFilter: 'NEAREST',
})

const lights = [
	{
		uLightPosition: vec3.fromValues(0, 1, 0.5),
		uLightColor: vec3.fromValues(0.8, 0.0, 0.0),
	},
	{
		uLightPosition: vec3.fromValues(1, 1, 0.5),
		uLightColor: vec3.fromValues(0.0, 0.0, 0.8),
	},
	{
		uLightPosition: vec3.fromValues(1, 0, 0.5),
		uLightColor: vec3.fromValues(0.0, 0.8, 0.0),
	},
	{
		uLightPosition: vec3.fromValues(0.5, 0, 1),
		uLightColor: vec3.fromValues(0.0, 0.8, 0.8),
	},
]

const lightLayer = painter.createEffect().update({
	frag: mainFrag,
	uniforms: {
		uEyePosition: eyePosition,
		uPositionBuffer: geo.image(0),
		uNormalBuffer: geo.image(1),
		uUVBuffer: geo.image(2),
	},
	drawSettings: {
		enable: [gl.BLEND],
		clearBits: makeClear(gl, 'color'),
	},
})

// Draw each light separately and blend results
lightLayer.sketches[0].update({
	uniforms: lights,
})

const render = painter.createFrame().update({
	layers: [lightLayer],
})

const rotationX = 0.01
const rotationY = 0.02

function animate() {
	for (const box of boxes) {
		mat4.rotateX(box.uModelMatrix, box.uModelMatrix, rotationX)
		mat4.rotateY(box.uModelMatrix, box.uModelMatrix, rotationY)
		mat4.multiply(box.uMVP, viewProjMatrix, box.uModelMatrix)
	}

	painter
		.compose(
			geo,
			render,
		)
		.display(render)

	requestAnimationFrame(animate)
}

animate()
