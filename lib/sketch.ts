import { Form } from './form'
import { DrawSettings, SketchData, Uniforms } from './painter-types'
import { Shade } from './shade'

let sketchCounter = 1

export class Sketch {
	drawSettings?: DrawSettings
	form!: Form
	shade!: Shade
	uniforms!: Uniforms

	constructor(public id = 'Sketch' + sketchCounter++) {}

	update(data: SketchData) {
		if (data.drawSettings) {
			this.drawSettings = data.drawSettings
		}

		if (data.form) {
			this.form = data.form
		}

		if (data.shade) {
			this.shade = data.shade
		}

		if (data.uniforms) {
			this.uniforms = data.uniforms
		}

		return this
	}

	destroy() {
		this.form && this.form.destroy()
		this.shade && this.shade.destroy()
	}
}
