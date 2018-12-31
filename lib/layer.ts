import { LayerData, Uniforms } from './painter-types'
import { Sketch } from './sketch'

let layerCount = 1

export class Layer {
	sketches: Sketch[] = []

	_data: LayerData = {}
	_uniforms: Uniforms[] = []

	constructor(public id = 'DrawingLayer' + layerCount++) {}

	update(data: LayerData) {
		if (data.sketches) {
			this.sketches = Array.isArray(data.sketches)
				? data.sketches
				: [data.sketches]
		}

		if (data.frag) {
			const sketch = this.sketches && this.sketches[0]
			if (sketch) {
				sketch.shade.update({ frag: data.frag })
			}
		}

		if (data.uniforms) {
			this._uniforms = Array.isArray(data.uniforms)
				? data.uniforms
				: [data.uniforms]
		}

		Object.assign(this._data, data)

		return this
	}

	destroy() {
		for (const sketch of this.sketches) {
			sketch.destroy()
		}
	}
}
