import { mat4, vec3 } from 'gl-matrix'
import createCube from 'primitive-cube'
import { Painter } from '../../src'
import { makeClear } from '../../src/utils/context'
import { convertStackGLGeometry } from '../../src/utils/stackgl'
import geoFrag from './geo.frag?raw'
import geoVert from './geo.vert?raw'
import mainFrag from './main.frag?raw'

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const painter = new Painter(canvas)
const { gl } = painter

painter.updateDrawSettings({
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
	bufferCount: 3
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

const lightEffect = painter.createEffect().update({
	frag: mainFrag,
	uniforms: lights,
})

const render = painter.createLayer().update({
	// treat effect as sketch with instances here,
	// because we don't want a swapping framebuffer compositing stack,
	// but instead all lights drawn into the same framebuffer.
	sketches: lightEffect,
	uniforms: {
		uEyePosition: eyePosition,
		uPositionBuffer: geoLayer.image(0),
		uNormalBuffer: geoLayer.image(1),
		uUVBuffer: geoLayer.image(2),
	},
	drawSettings: {
		enable: [gl.BLEND],
		clearBits: makeClear(gl, 'color'),
	},
	directRender: true,
})

const rotationX = 0.01
const rotationY = 0.02

function animate() {
	for (const box of boxes) {
		mat4.rotateX(box.uModelMatrix, box.uModelMatrix, rotationX)
		mat4.rotateY(box.uModelMatrix, box.uModelMatrix, rotationY)
		mat4.multiply(box.uMVP, viewProjMatrix, box.uModelMatrix)
	}

	painter.compose(geoLayer, render)

	requestAnimationFrame(animate)
}

animate()
