import { LayerData, Uniforms } from './painter-types'
import { Sketch } from './sketch'

let layerCount = 1

export class Layer {
	_data: LayerData = {}
	_uniforms: Uniforms[] = []
	_sketches: Sketch[] = []

	constructor(public id = 'DrawingLayer' + layerCount++) {}

	update(data: LayerData) {
		if (data.sketches) {
			this._sketches = data.sketches
		}

		if (data.frag) {
			const sketch = this._sketches && this._sketches[0]
			if (sketch) {
				sketch._shade.update({ frag: data.frag })
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
		for (const sketch of this._sketches) {
			sketch.destroy()
		}
	}
}
