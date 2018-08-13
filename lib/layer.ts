import { GL, Layer, LayerData, RenderTarget, Uniforms } from './painter-types'
import { setTextureParams, updateRenderTarget, destroyRenderTarget } from './render-utils'
import { Sketch } from './sketch'
import { times } from 'tvs-libs/dist/lib/utils/sequence'


export class StaticLayer implements Layer {
	gl: GL
	_texture: WebGLTexture | null
	data: LayerData = {}

	constructor(gl: GL) {
		this.gl = gl
		this._texture = gl.createTexture()
	}

	texture () {
		return this._texture
	}

	update (data: LayerData) {
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture())

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


export class DrawingLayer implements Layer {
	data: LayerData = {}
	targets?: [RenderTarget, RenderTarget]
	uniforms?: Uniforms
	sketches?: Sketch[]

	constructor(private gl: GL) { }

	texture (i = 0) { return (this.targets && this.targets[0].textures[i]) || null }

	update (data: LayerData) {
		if (data.buffered && !this.targets) {
			this.targets = times<RenderTarget>(() => ({
				width: data.width || this.gl.canvas.width,
				height: data.height || this.gl.canvas.height,
				frameBuffer: null, textures: [], depthBuffer: null,
				textureConfig: {
					type: (data.textureConfig && data.textureConfig.type) || this.gl.UNSIGNED_BYTE,
					count: (data.textureConfig && data.textureConfig.count) || 1
				}
			}), 2) as [RenderTarget, RenderTarget]

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
				sketch.shade.update({ frag: data.frag })
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

