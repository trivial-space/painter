import { mat4 } from 'gl-matrix'
import { adjustHue, hslToRGB } from 'tvs-libs/dist/graphics/colors'
import { makeClear } from '../../lib/utils/context'
import { plane } from '../../lib/utils/geometry/plane'
import { gl, painter } from '../painter'
import planeFrag from './plane-material.frag'
import planeVert from './plane-material.vert'

painter.resize({ multiplier: window.devicePixelRatio })

const planMat = mat4.fromTranslation(mat4.create(), [0, 0, -3])
const rotation = 0.01
const projection = mat4.perspective(mat4.create(), 45, 1, 0.01, 10)
const colorHSL = { h: 0, s: 0.5, l: 0.5 }

// ===== Setup Render Context =====

const form = painter.createForm().update(plane(2, 2))

const shade = painter.createShade().update({
	vert: planeVert,
	frag: planeFrag,
})

const sketch = painter.createSketch().update({
	form,
	shade,
	uniforms: {
		transform: () => mat4.rotateY(planMat, planMat, rotation),
	},
})

const planeLayer = painter.createLayer().update({
	sketches: [sketch],
	uniforms: {
		color: () => {
			colorHSL.h = adjustHue(colorHSL.h + 0.001)
			return hslToRGB(colorHSL)
		},
		projection,
	},
	drawSettings: {
		clearColor: [0.0, 1.0, 0.0, 1.0],
		clearBits: makeClear(gl, 'color', 'depth'),
	},
})

const main = painter.createFrame().update({
	layers: planeLayer,
})

// ===== initialize animation =====

function animate() {
	painter.compose(main).display(main)
	requestAnimationFrame(animate)
}

animate()
