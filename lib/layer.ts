import { LayerData, Uniforms } from './painter-types'
import { Sketch } from './sketch'

let layerCount = 1

export class Layer {
	data: LayerData = {}
	uniforms?: Uniforms
	sketches?: Sketch[]

	constructor(public id = 'DrawingLayer' + layerCount++) {}

	update(data: LayerData) {
		if (data.sketches) {
			this.sketches = data.sketches
		}

		if (data.frag) {
			const sketch = this.sketches && this.sketches[0]
			if (sketch) {
				sketch.shade.update({ frag: data.frag })
			}
		}

		if (data.uniforms) {
			this.uniforms = data.uniforms
		}

		Object.assign(this.data, data)

		return this
	}

	destroy() {
		if (this.sketches) {
			for (const sketch of this.sketches) {
				sketch.destroy()
			}
		}
	}
}
