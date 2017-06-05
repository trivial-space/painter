import { GL, SketchData, Sketch } from './render-types'


export function create (gl: GL): Sketch {

	const sketch = {} as Sketch

	sketch.drawSettings = {
		blendFns: [gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA],
		blending: false
	}

	sketch.update = (data: SketchData) => {
		if (data.blend != null) {
			if (Array.isArray(data.blend)) {
				sketch.drawSettings.blendFns = data.blend
				sketch.drawSettings.blending = true
			} else {
				sketch.drawSettings.blending = data.blend
			}
		}

		if (data.form) {
			sketch.form = data.form
		}

		if (data.shade) {
			sketch.shade = data.shade
		}

		if (data.uniforms) {
			sketch.uniforms = data.uniforms
		}

		return sketch
	}

	return sketch
}
