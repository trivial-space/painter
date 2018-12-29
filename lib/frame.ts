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

let frameCount = 1

export class Frame {
	width = 0
	height = 0

	data: FrameData = {
		layers: [],
	}

	_targets: RenderTarget[] = []
	_texture: WebGLTexture | null = null

	constructor(private gl: GL, public id = 'Frame' + frameCount++) {}

	image(i = 0) {
		if (process.env.NODE_ENV !== 'production' && Painter.debug) {
			if (this._targets) {
				console.log(`PAINTER: Using buffer texture ${this._targets[0].id}`)
			}
		}
		return (this._targets.length && this._targets[0].textures[i]) || null
	}

	update(data: FrameData) {
		const gl = this.gl
		const layers = data.layers || this.data.layers || []
		const selfReferencing = data.selfReferencing || this.data.selfReferencing
		const layerCount = layers.length
		const targetCount = selfReferencing || layerCount > 1 ? 2 : layerCount

		const width =
			data.width ||
			(data.texture && data.texture.width) ||
			this.data.width ||
			gl.canvas.width
		const height =
			data.height ||
			(data.texture && data.texture.height) ||
			this.data.width ||
			gl.canvas.height

		if (
			targetCount !== this.data._targetCount ||
			!equalArray(this.data.bufferStructure, data.bufferStructure)
		) {
			this.destroyTargets()
			data._targetCount = targetCount
		}

		if (!this._targets && targetCount > 0) {
			this._targets = times<RenderTarget>(
				i => ({
					id: this.id + '_target' + (i + 1),
					width: data.width || gl.canvas.width,
					height: data.height || gl.canvas.height,
					frameBuffer: null,
					textures: [],
					depthBuffer: null,
					bufferStructure: data.bufferStructure || ['UNSIGNED_BYTE'],
				}),
				targetCount,
			) as [RenderTarget, RenderTarget]

			if (!(data.wrap || data.wrapS || data.wrapT)) {
				data.wrap = defaultTextureSettings.wrap
			}
			if (!data.minFilter) {
				data.minFilter = defaultTextureSettings.minFilter
			}
			if (!data.magFilter) {
				data.magFilter = defaultTextureSettings.magFilter
			}

			this._targets.forEach(t => updateRenderTarget(gl, t, data, this.data))
		} else if (
			this._targets &&
			(width !== this.width || height !== this.height)
		) {
			this._targets.forEach(t => {
				t.width = width
				t.height = height
				updateRenderTarget(gl, t, data, this.data)
			})
		}

		if (data.texture) {
			if (this._texture !== null) {
				this._texture = gl.createTexture()
			}

			gl.bindTexture(gl.TEXTURE_2D, this._texture)

			if (!(data.wrap || data.wrapS || data.wrapT)) {
				data.wrap = defaultTextureSettings.wrap
			}
			if (!data.minFilter) {
				data.minFilter = defaultTextureSettings.minFilter
			}
			if (!data.magFilter) {
				data.magFilter = defaultTextureSettings.magFilter
			}

			setTextureParams(gl, data, this.data)

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

		Object.assign(this.data, data)

		return this
	}

	destroyTargets() {
		if (this._targets) {
			this._targets.forEach(t => destroyRenderTarget(this.gl, t))
			this._targets = []
		}
	}

	destroy() {
		this.destroyTargets()
	}
}
