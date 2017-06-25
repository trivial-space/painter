import { mat4, vec3 } from 'gl-matrix'
import { painter, gl } from '../painter'
import { convertStackGLGeometry } from '../../lib/utils/stackgl'
import { makeClear } from '../../lib/utils/context'
import createCube from 'primitive-cube'
import geoVert from './geo.vert'
import geoFrag from './geo.frag'
import mainFrag from './main.frag'


painter.updateDrawSettings({
	depthFunc: gl.LEQUAL,
	blendFunc: [gl.ONE, gl.ONE]
})

const geoShade = painter.createShade().update({
	vert: geoVert,
	frag: geoFrag
})

const cubeStackgl = createCube(1)
const cubeGeometry = convertStackGLGeometry(cubeStackgl)
const geoForm = painter.createForm().update(cubeGeometry)


// CAMERA STUFF
const projMatrix = mat4.create()
mat4.perspective(projMatrix, Math.PI / 2, gl.canvas.width / gl.canvas.height, 0.1, 10.0)

const viewMatrix = mat4.create()
const eyePosition = vec3.fromValues(1, 1, 1)
mat4.lookAt(viewMatrix, eyePosition, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 1, 0))

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
		uMVP: mat4.create()
	},
	{
		uModelMatrix: box2,
		uMVP: mat4.create()
	}
]

const geoSketch = painter.createSketch().update({
	form: geoForm,
	shade: geoShade,
	uniforms: boxes
})

const geoLayer = painter.createDrawingLayer().update({
	buffered: true,
	textureConfig: {
		count: 3,
		type: gl.FLOAT
	},
	sketches: [geoSketch],
	drawSettings: {
		clearBits: makeClear(gl, 'color', 'depth')
	},
	wrap: 'CLAMP_TO_EDGE',
	minFilter: 'NEAREST',
	magFilter: 'NEAREST'
})


const lights = [
	{
		uLightPosition: vec3.fromValues(0, 1, 0.5),
		uLightColor: vec3.fromValues(0.8, 0.0, 0.0)
	},
	{
		uLightPosition: vec3.fromValues(1, 1, 0.5),
		uLightColor: vec3.fromValues(0.0, 0.0, 0.8)
	},
	{
		uLightPosition: vec3.fromValues(1, 0, 0.5),
		uLightColor: vec3.fromValues(0.0, 0.8, 0.0)
	},
	{
		uLightPosition: vec3.fromValues(0.5, 0, 1),
		uLightColor: vec3.fromValues(0.0, 0.8, 0.8)
	}
]


const texture = painter.createStaticLayer().update({
	minFilter: 'LINEAR',
	magfilter: 'LINEAR'
})


const lightLayer = painter.createEffectLayer().update({
	frag: mainFrag,
	uniforms: {
		uEyePosition: eyePosition,
		uTextureMap: texture.texture(),
		uPositionBuffer: geoLayer.texture(0),
		uNormalBuffer: geoLayer.texture(1),
		uUVBuffer: geoLayer.texture(2)
	},
	drawSettings: {
		disable: [gl.DEPTH_TEST],
		enable: [gl.BLEND],
		clearBits: makeClear(gl, 'color')
	}
})

// Draw each light separately and blend results
if (lightLayer.sketches) {
	lightLayer.sketches[0].uniforms = lights
}

const rotationX = 0.01
const rotationY = 0.02

function animate () {

	for (let i = 0, len = boxes.length; i < len; ++i) {
		mat4.rotateX(boxes[i].uModelMatrix, boxes[i].uModelMatrix, rotationX)
		mat4.rotateY(boxes[i].uModelMatrix, boxes[i].uModelMatrix, rotationY)
		mat4.multiply(boxes[i].uMVP, viewProjMatrix, boxes[i].uModelMatrix)
	}

	painter.compose(geoLayer, lightLayer)

	requestAnimationFrame(animate)
}

animate()

