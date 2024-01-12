import { LayerData, Uniforms } from './painter-types'
import { Effect, Sketch } from './sketch'
import { RenderTarget } from './render-target'
import { Texture } from './texture'
import { Painter } from './painter'
import { times } from 'tvs-libs/dist/utils/sequence'

let layerCount = 1

export class Layer {
	sketches: Sketch[] = []
	effects: Effect[] = []
	width = 0
	height = 0

	_targets: RenderTarget[] = []
	_textures: Texture[] = []
	_passCount = 0

	_data: LayerData = {}
	_uniforms: Uniforms | null = null

	constructor(
		private _painter: Painter,
		public id = 'Layer' + layerCount++,
	) {}

	image(i = 0) {
		return (
			(this._targets.length &&
				this._targets[this._targets.length - 1].textures[i]) ||
			this._textures[i]
		)
	}

	update(data: LayerData = {}) {
		if (data.sketches) {
			this.sketches = Array.isArray(data.sketches)
				? data.sketches
				: [data.sketches]
		}

		if (data.effects) {
			this.effects = Array.isArray(data.effects) ? data.effects : [data.effects]
		}

		if (data.uniforms) {
			this._uniforms = data.uniforms
		}

		const gl = this._painter.gl

		const width =
			data.width ||
			data.texture?.width ||
			this._data.width ||
			this._data.texture?.width ||
			gl.drawingBufferWidth
		const height =
			data.height ||
			data.texture?.height ||
			this._data.height ||
			this._data.texture?.height ||
			gl.drawingBufferHeight

		if (data.texture) {
			// Hardcode to one static texture per layer for now
			if (!this._textures[0]) {
				this._textures[0] = new Texture(this._painter, this.id + '_Texture0')
			}
			data.texture.width = width
			data.texture.height = height
			this._textures[0].update(data.texture)
		}

		const selfReferencing = data.selfReferencing || this._data.selfReferencing

		let passCount = this.effects.reduce(
			(count, effect) => count + (effect._uniforms.length || 1),
			this.sketches.length ? 1 : 0,
		)

		const directRender = data.directRender || this._data.directRender

		const targetCount =
			selfReferencing || passCount > 1
				? 2
				: directRender || this._textures.length
					? 0
					: 1

		if (directRender) {
			passCount -= 1
		}
		this._passCount = passCount

		const antialias =
			data.antialias ?? this._data.antialias ?? this._painter._opts.antialias

		if (targetCount !== this._targets.length) {
			this._destroyTargets()
		}
		const targetData = { ...data, width, height, antialias }
		if (!this._targets.length && targetCount > 0) {
			this._targets = times(
				i =>
					new RenderTarget(this._painter, this.id + '_target' + (i + 1)).update(
						targetData,
					),
				targetCount,
			)
		} else if (this._targets.length) {
			this._targets.forEach(t => {
				t.update(targetData)
			})
		}

		Object.assign(this._data, data)
		this.width = width
		this.height = height

		return this
	}

	destroy() {
		this._destroyTargets()
		this.clear()
	}

	clear() {
		this.effects = []
		for (const tex of this._textures) {
			tex.destroy()
		}
		this.effects = []
		this.sketches = []
		this.width = 0
		this.height = 0
		this._data = {}
		this._textures = []
		this._uniforms = null
	}

	_destroyTargets() {
		this._targets.forEach(t => t.destroy())
		this._targets = []
	}

	_swapTargets() {
		if (this._targets.length > 1) {
			const tmp = this._targets[0]
			this._targets[0] = this._targets[1]
			this._targets[1] = tmp
		}
	}
}
