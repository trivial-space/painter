import { GL, Layer, LayerData, RenderTarget, Uniforms } from './painter-types'
import { setTextureParams, updateRenderTarget, destroyRenderTarget } from './render-utils'
import { Sketch } from './sketch'
import { times } from 'tvs-libs/dist/lib/utils/sequence'
import { Painter } from './painter'
import { defaultTextureSettings, defaultShaders } from './asset-lib'

let staticLayerCount = 1

export class StaticLayer implements Layer {
	_texture: WebGLTexture | null
	data: LayerData = {}

	constructor(private gl: GL, public id = 'StaticLayer' + staticLayerCount++ ) {
		this._texture = gl.createTexture()
	}

	texture () {
		return this._texture
	}

	update (data: LayerData) {
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture())

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

		setTextureParams(this.gl, data, this.data)

		if (data.asset) {
			this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data.asset)
		}

		if (data.minFilter && data.minFilter.indexOf('MIPMAP') > 0) {
			this.gl.generateMipmap(this.gl.TEXTURE_2D)
		}

		this.gl.bindTexture(this.gl.TEXTURE_2D, null)

		Object.assign(this.data, data)

		return this
	}

	destroy () {
		this.gl.deleteTexture(this.texture())
	}
}

let drawingLayerCount = 1

export class DrawingLayer implements Layer {
	data: LayerData = {}
	targets?: RenderTarget[]
	uniforms?: Uniforms
	sketches?: Sketch[]

	constructor(private gl: GL, public id = 'DrawingLayer' + drawingLayerCount++) { }

	texture (i = 0) {
		if (process.env.NODE_ENV !== 'production' && Painter.debug) {
			if (this.targets) {
				console.log(`PAINTER: Using buffer texture ${this.targets[0].id}`)
			}
		}
		return (this.targets && this.targets[0].textures[i]) || null
	}

	update (data: LayerData) {
		if (data.buffered && !this.targets) {
			this.targets = times<RenderTarget>(i => ({
				id: this.id + '_target' + (i + 1),
				width: data.width || this.gl.canvas.width,
				height: data.height || this.gl.canvas.height,
				frameBuffer: null, textures: [], depthBuffer: null,
				textureConfig: {
					type: (data.textureConfig && data.textureConfig.type) || this.gl.UNSIGNED_BYTE,
					count: (data.textureConfig && data.textureConfig.count) || 1
				}
			}), data.doubleBuffered ? 2 : 1) as [RenderTarget, RenderTarget]

			if (!(data.wrap || data.wrapS || data.wrapT)) {
				data.wrap = defaultTextureSettings.wrap
			}
			if (!data.minFilter) {
				data.minFilter = defaultTextureSettings.minFilter
			}
			if (!data.magFilter) {
				data.magFilter = defaultTextureSettings.magFilter
			}

			this.targets.forEach(t => updateRenderTarget(this.gl, t, data, this.data))

		} else if (this.targets && data.width && data.height) {
			this.targets.forEach(t => {
				t.width = data.width as number
				t.height = data.height as number
				updateRenderTarget(this.gl, t, data, this.data)
			})
		}

		if (data.sketches) {
			this.sketches = data.sketches
		}

		if (data.frag) {
			const sketch = this.sketches && this.sketches[0]
			if (sketch) {
				sketch.shade.update({ frag: data.frag, vert: defaultShaders.basicEffect.vert })
			}
		}

		if (data.uniforms) {
			this.uniforms = data.uniforms
		}

		Object.assign(this.data, data)

		return this
	}

	destroy () {
		if (this.sketches) {
			for (const sketch of this.sketches) {
				sketch.destroy()
			}
		}

		if (this.targets) {
			this.targets.forEach(t => destroyRenderTarget(this.gl, t))
			this.targets = undefined
		}
	}
}

