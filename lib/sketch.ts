import { Form } from './form'
import { DrawSettings, SketchData, Uniforms } from './painter-types'
import { Shade } from './shade'

let sketchCounter = 1

export class Sketch {
	_drawSettings?: DrawSettings
	_form!: Form
	_shade!: Shade
	_uniforms: Uniforms[] = []

	constructor(public id = 'Sketch' + sketchCounter++) {}

	update(data: SketchData) {
		if (data.drawSettings) {
			this._drawSettings = data.drawSettings
		}

		if (data.form) {
			this._form = data.form
		}

		if (data.shade) {
			this._shade = data.shade
		}

		if (data.uniforms) {
			this._uniforms = Array.isArray(data.uniforms)
				? data.uniforms
				: [data.uniforms]
		}

		return this
	}

	destroy() {
		this._form && this._form.destroy()
		this._shade && this._shade.destroy()
	}
}
