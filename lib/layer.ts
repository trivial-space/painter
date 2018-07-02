import { GL, Layer, LayerData, RenderTarget, Uniforms } from './painter-types'
import { setTextureParams, updateRenderTarget, destroyRenderTarget } from './render-utils'
import { Sketch } from './sketch'


export class StaticLayer implements Layer {
	gl: GL
	textures: (WebGLTexture | null)[]
	data: LayerData = {}

	constructor(gl: GL) {
		this.gl = gl
		this.textures = [gl.createTexture()]
	}

	texture () {
		return this.textures[0]
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
	textures: (WebGLTexture | null)[] = []
	data: LayerData = {}
	target?: RenderTarget
	uniforms?: Uniforms
	sketches?: Sketch[]

	constructor(private gl: GL) { }

	texture (i = 0) { return this.textures[i] }

	update (data: LayerData) {
		if (data.buffered && !this.target) {
			this.target = {
				width: data.width || this.gl.canvas.width,
				height: data.height || this.gl.canvas.height,
				frameBuffer: null, textures: [], depthBuffer: null,
				textureConfig: {
					type: (data.textureConfig && data.textureConfig.type) || this.gl.UNSIGNED_BYTE,
					count: (data.textureConfig && data.textureConfig.count) || 1
				}
			} as RenderTarget

			updateRenderTarget(this.gl, this.target, data, this.data)

			this.textures = this.target.textures

		} else if (this.target && data.width && data.height) {
			this.target.width = data.width
			this.target.height = data.height

			updateRenderTarget(this.gl, this.target, data, this.data)
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

		if (this.target) {
			destroyRenderTarget(this.gl, this.target)

		} else {
			for (const texture of this.textures) {
				this.gl.deleteTexture(texture)
			}
		}
	}
}

