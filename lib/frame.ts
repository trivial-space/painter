import { equalArray } from 'tvs-libs/dist/utils/predicates'
import { times } from 'tvs-libs/dist/utils/sequence'
import { defaultTextureSettings } from './asset-lib'
import { Layer } from './layer'
import { Painter } from './painter'
import { FrameData } from './painter-types'
import { RenderTarget } from './render-target'
import { setTextureParams } from './render-utils'

let frameCount = 1

export class Frame {
	width = 0
	height = 0
	layers: Layer[] = []

	_data: FrameData = {}
	_targets: RenderTarget[] = []
	_textures: Array<WebGLTexture | null> = []

	constructor(private _painter: Painter, public id = 'Frame' + frameCount++) {}

	image(i = 0) {
		return (
			(this._targets.length &&
				this._targets[this._targets.length - 1].textures[i]) ||
			this._textures[i]
		)
	}

	update(data: FrameData) {
		const gl = this._painter.gl
		const layers = Array.isArray(data.layers)
			? data.layers
			: data.layers
			? [data.layers]
			: this.layers
		const selfReferencing = data.selfReferencing || this._data.selfReferencing
		const layerCount = layers.reduce(
			(count, layer) => count + (layer._uniforms.length || 1),
			0,
		)
		const targetCount = selfReferencing || layerCount > 1 ? 2 : layerCount

		data.width = data.width || this.width || gl.drawingBufferWidth
		data.height = data.height || this.width || gl.drawingBufferHeight

		if (
			targetCount !== this._targets.length ||
			!equalArray(this._data.bufferStructure, data.bufferStructure)
		) {
			this._destroyTargets()
		}

		if (!this._targets.length && targetCount > 0) {
			this._targets = times(
				i => new RenderTarget(this._painter, this.id + '_target' + (i + 1)),
				targetCount,
			)

			if (!(data.wrap || data.wrapS || data.wrapT)) {
				data.wrap = defaultTextureSettings.wrap
			}
			if (!data.minFilter) {
				data.minFilter = defaultTextureSettings.minFilter
			}
			if (!data.magFilter) {
				data.magFilter = defaultTextureSettings.magFilter
			}

			this._targets.forEach(t => t.update(data))
		} else if (
			this._targets.length &&
			(data.width !== this.width || data.height !== this.height)
		) {
			this._targets.forEach(t => {
				t.update(data)
			})
		}

		if (data.asset) {
			// Hardcode to one static texture for now
			if (this._textures[0] == null) {
				this._textures[0] = gl.createTexture()
			}

			gl.bindTexture(gl.TEXTURE_2D, this._textures[0])

			if (!(data.wrap || data.wrapS || data.wrapT)) {
				data.wrap = defaultTextureSettings.wrap
			}
			if (!data.minFilter) {
				data.minFilter = defaultTextureSettings.minFilter
			}
			if (!data.magFilter) {
				data.magFilter = defaultTextureSettings.magFilter
			}

			setTextureParams(gl, data)

			gl.texImage2D(
				gl.TEXTURE_2D,
				0,
				gl.RGBA,
				gl.RGBA,
				gl.UNSIGNED_BYTE,
				data.asset,
			)

			if (data.minFilter && data.minFilter.indexOf('MIPMAP') > 0) {
				gl.generateMipmap(gl.TEXTURE_2D)
			}

			gl.bindTexture(gl.TEXTURE_2D, null)
		}

		Object.assign(this._data, data)
		this.layers = layers
		this.width = data.width
		this.height = data.height

		return this
	}

	destroy() {
		this._destroyTargets()
		this._textures.forEach(tex => {
			if (tex != null) this._painter.deleteTexture(tex)
		})
		this._textures = []
		this._data = {}
		this.layers = []
		this.width = 0
		this.height = 0
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
