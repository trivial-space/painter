import { mat4 } from 'gl-matrix'
import createCube from 'primitive-cube'
import createSphere from 'primitive-sphere'
import { makeClear } from '../../src/utils/context'
import { convertStackGLGeometry } from '../../src/utils/stackgl'
import { painter } from '../painter'

const cubeStackgl = createCube()
const cubeGeometry = convertStackGLGeometry(cubeStackgl)

const sphereStackgl = createSphere()
const sphereGeometry = convertStackGLGeometry(sphereStackgl)

//cubeGeometry.drawType = 'LINE_LOOP'

const rotationX = 0.01
const rotationZ = 0.009101
const cubeMat = mat4.fromTranslation(mat4.create(), [1, 0, -3])
const sphereMat = mat4.fromTranslation(mat4.create(), [-1, 0, -3])
const projection = mat4.perspective(mat4.create(), 45, 1, 0.01, 10)

const cube = painter.createForm().update(cubeGeometry)
const sphere = painter.createForm().update(sphereGeometry)

const shade = painter.createShade().update({
	vert: `
		attribute vec3 position;
		attribute vec3 normal;
		uniform mat4 camera;
		uniform mat4 transform;

		varying vec3 vNormal;

		void main() {
			vNormal = normal;
			gl_Position = camera * transform * vec4(position, 1.0);
		}
	`,
	frag: `precision mediump float;
		varying vec3 vNormal;
		void main() {
			gl_FragColor = vec4(abs(vNormal), 1.0);
		}
	`,
})

const cubeSketch = painter.createSketch().update({
	shade,
	form: cube,
	uniforms: {
		camera: projection,
		transform: cubeMat,
	},
	drawSettings: {
		clearBits: makeClear(painter.gl, 'color', 'depth'),
	},
})

const sphereSketch = painter.createSketch().update({
	shade,
	form: sphere,
	uniforms: {
		camera: projection,
		transform: sphereMat,
	},
})

painter.updateDrawSettings({
	clearColor: [1.0, 0.5, 0.8, 1.0],
	enable: [painter.gl.DEPTH_TEST],
})

function animate() {
	mat4.rotateY(cubeMat, cubeMat, rotationX)
	mat4.rotateZ(cubeMat, cubeMat, rotationZ)
	mat4.rotateX(cubeMat, cubeMat, 1.78 * rotationZ)
	mat4.rotateY(sphereMat, sphereMat, rotationX)
	mat4.rotateZ(sphereMat, sphereMat, rotationZ)
	mat4.rotateX(sphereMat, sphereMat, 1.78 * rotationZ)
	painter.draw(cubeSketch)
	painter.draw(sphereSketch)
	requestAnimationFrame(animate)
}

animate()
