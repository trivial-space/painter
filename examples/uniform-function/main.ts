import { painter, gl } from '../painter'
import { mat4 } from 'gl-matrix'
import planeVert from './plane-material.vert'
import planeFrag from './plane-material.frag'
import { plane } from '../../lib/utils/geometry/plane'
import { makeClear } from '../../lib/utils/context'
import { adjustHue, hslToRGB } from 'tvs-libs/dist/lib/graphics/colors'


painter.resize(window.devicePixelRatio)


const planMat = mat4.fromTranslation(mat4.create(), [0, 0, -3])
const rotation = 0.01
const projection = mat4.perspective(mat4.create(), 45, 1, 0.01, 10)
const colorHSL = {h: 0, s: 0.5, l: 0.5}


// ===== Setup Render Context =====

const form = painter.createForm().update(plane(2, 2))

const shade = painter.createShade().update({
	vert: planeVert,
	frag: planeFrag
})

const sketch = painter.createSketch().update({
	form, shade,
	uniforms: () => ({
		transform: mat4.rotateY(planMat, planMat, rotation)
	})
})


const planeLayer = painter.createDrawingLayer().update({
	sketches: [sketch],
	uniforms: () => {
		colorHSL.h = adjustHue(colorHSL.h + 0.001)
		return {
			color: hslToRGB(colorHSL),
			projection
		}
	},
	drawSettings: {
		clearColor: [0.0, 1.0, 0.0, 1.0],
		clearBits: makeClear(gl, 'color', 'depth')
	}
})


// ===== initialize animation =====

function animate () {
	painter.compose(planeLayer)
	requestAnimationFrame(animate)
}


animate()
