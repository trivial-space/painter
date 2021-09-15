import { Form } from './form'
import { DrawSettings, EffectData, SketchData, Uniforms } from './painter-types'
import { Shade } from './shade'

let sketchCounter = 1

export class Sketch {
	form!: Form | null
	shade!: Shade | null

	_drawSettings?: DrawSettings
	_uniforms: Uniforms[] = []

	constructor(public id = 'Sketch' + sketchCounter++) {}

	update(data: SketchData) {
		if (data.drawSettings) {
			this._drawSettings = data.drawSettings
		}

		if (data.form) {
			this.form = data.form
		}

		if (data.shade) {
			this.shade = data.shade
		}

		if (data.uniforms) {
			this._uniforms = Array.isArray(data.uniforms)
				? data.uniforms
				: [data.uniforms]
		}

		return this
	}

	destroy() {
		this.form = null
		this.shade = null
		this._drawSettings = undefined
		this._uniforms = []
	}
}

let effectCounter = 1

export class Effect extends Sketch {
	constructor(
		_form: Form,
		_shade: Shade,
		public id = 'Effect' + effectCounter++,
	) {
		super(id)
		this.form = _form
		this.shade = _shade
	}

	update(data: EffectData) {
		if (data.frag) {
			this.shade?.update({ frag: data.frag })
		}

		if (data.drawSettings) {
			this._drawSettings = data.drawSettings
		}

		if (data.uniforms) {
			this._uniforms = Array.isArray(data.uniforms)
				? data.uniforms
				: [data.uniforms]
		}

		return this
	}
}
