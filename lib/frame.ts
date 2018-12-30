import { equalArray } from 'tvs-libs/dist/utils/predicates'
import { times } from 'tvs-libs/dist/utils/sequence'
import { defaultTextureSettings } from './asset-lib'
import { Painter } from './painter'
import { FrameData, GL, RenderTarget } from './painter-types'
import {
	destroyRenderTarget,
	updateRenderTarget,
	setTextureParams,
} from './render-utils'
import { Layer } from './layer'

let frameCount = 1

export class Frame {
	width = 0
	height = 0

	_layers: Layer[] = []
	_data: FrameData = {}
	_targets: RenderTarget[] = []
	_textures: Array<WebGLTexture | null> = []

	constructor(private _gl: GL, public id = 'Frame' + frameCount++) {}

	image(i = 0) {
		if (process.env.NODE_ENV !== 'production' && Painter.debug) {
			if (this._targets) {
				console.log(`PAINTER: Using buffer texture ${this._targets[0].id}`)
			}
		}

		return (
			(this._targets.length && this._targets[0].textures[i]) ||
			this._textures[i]
		)
	}

	update(data: FrameData) {
		const gl = this._gl
		const layers = data.layers || this._layers
		const selfReferencing = data.selfReferencing || this._data.selfReferencing
		const layerCount = layers.reduce(
			(count, layer) => count + (layer._uniforms.length || 1),
			0,
		)
		const targetCount = selfReferencing || layerCount > 1 ? 2 : layerCount

		const width = data.width || this._data.width || gl.drawingBufferWidth
		const height = data.height || this._data.width || gl.drawingBufferHeight

		if (
			targetCount !== this._targets.length ||
			!equalArray(this._data.bufferStructure, data.bufferStructure)
		) {
			this._destroyTargets()
		}

		if (!this._targets.length && targetCount > 0) {
			this._targets = times<RenderTarget>(
				i => ({
					id: this.id + '_target' + (i + 1),
					width,
					height,
					frameBuffer: null,
					textures: [],
					depthBuffer: null,
					bufferStructure: data.bufferStructure || ['UNSIGNED_BYTE'],
				}),
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

			this._targets.forEach(t => updateRenderTarget(gl, t, data, this._data))
		} else if (
			this._targets.length &&
			(width !== this.width || height !== this.height)
		) {
			this._targets.forEach(t => {
				t.width = width
				t.height = height
				updateRenderTarget(gl, t, data, this._data)
			})
		}

		if (data.texture) {
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

			setTextureParams(gl, data, this._data)

			gl.texImage2D(
				gl.TEXTURE_2D,
				0,
				gl.RGBA,
				gl.RGBA,
				gl.UNSIGNED_BYTE,
				data.texture,
			)

			if (data.minFilter && data.minFilter.indexOf('MIPMAP') > 0) {
				gl.generateMipmap(gl.TEXTURE_2D)
			}

			gl.bindTexture(gl.TEXTURE_2D, null)
		}

		Object.assign(this._data, data)
		this._layers = layers
		this.width = width
		this.height = height

		return this
	}

	destroy() {
		this._destroyTargets()
		this._textures.forEach(tex => {
			if (tex != null) this._gl.deleteTexture(tex)
		})
		this._textures = []
		this._layers = []
		this.width = 0
		this.height = 0
		this._data = {}
	}

	_destroyTargets() {
		this._targets.forEach(t => destroyRenderTarget(this._gl, t))
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
