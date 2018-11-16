import { times } from 'tvs-libs/dist/lib/utils/sequence'
import { defaultTextureSettings } from './asset-lib'
import { Painter } from './painter'
import {
	DrawingLayerData,
	GL,
	Layer,
	RenderTarget,
	StaticLayerData,
	Uniforms
} from './painter-types'
import {
	destroyRenderTarget,
	setTextureParams,
	updateRenderTarget
} from './render-utils'
import { Sketch } from './sketch'

let staticLayerCount = 1

export class StaticLayer implements Layer {
	_texture: WebGLTexture | null
	data: StaticLayerData = {}

	constructor(private gl: GL, public id = 'StaticLayer' + staticLayerCount++) {
		this._texture = gl.createTexture()
	}

	texture() {
		return this._texture
	}

	update(data: StaticLayerData) {
		const gl = this.gl
		gl.bindTexture(gl.TEXTURE_2D, this.texture())

		if (data.asset) {
			if (!(data.wrap || data.wrapS || data.wrapT)) {
				data.wrap = defaultTextureSettings.wrap
			}
			if (!data.minFilter) {
				data.minFilter = defaultTextureSettings.minFilter
			}
			if (!data.magFilter) {
				data.magFilter = defaultTextureSettings.magFilter
			}
		}

		setTextureParams(gl, data, this.data)

		if (data.asset) {
			gl.texImage2D(
				gl.TEXTURE_2D,
				0,
				gl.RGBA,
				gl.RGBA,
				gl.UNSIGNED_BYTE,
				data.asset
			)
		}

		if (data.minFilter && data.minFilter.indexOf('MIPMAP') > 0) {
			gl.generateMipmap(gl.TEXTURE_2D)
		}

		gl.bindTexture(gl.TEXTURE_2D, null)

		Object.assign(this.data, data)

		return this
	}

	destroy() {
		this.gl.deleteTexture(this.texture())
	}
}

let drawingLayerCount = 1

export class DrawingLayer implements Layer {
	data: DrawingLayerData = {}
	uniforms?: Uniforms
	sketches?: Sketch[]

	constructor(
		private gl: GL,
		public id = 'DrawingLayer' + drawingLayerCount++
	) {}

	update(data: DrawingLayerData) {
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
