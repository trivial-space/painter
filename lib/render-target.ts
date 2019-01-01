import { Painter } from './painter'
import { RenderTargetData, TextureType } from './painter-types'
import { setTextureParams } from './render-utils'

let targetCount = 1

export class RenderTarget {
	frameBuffer: WebGLFramebuffer | null = null
	textures: (WebGLTexture | null)[] = []
	depthBuffer: WebGLRenderbuffer | null = null
	width: number = 0
	height: number = 0
	bufferStructure: TextureType[] = ['UNSIGNED_BYTE']

	_data?: RenderTargetData = {}

	constructor(private _painter: Painter, public id = 'Form' + targetCount++) {}

	update(data: RenderTargetData) {
		const gl = this._painter.gl
		const width = data.width || this.width
		const height = data.height || this.height
		if (!width || !height) {
			return this
		}

		if (this.frameBuffer == null) {
			this.frameBuffer = gl.createFramebuffer()
		}

		gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer)

		if (data.bufferStructure && data.bufferStructure.length) {
			this.bufferStructure = data.bufferStructure
			if (this.bufferStructure.some(t => t === 'FLOAT')) {
				gl.getExtension('EXT_color_buffer_float')
			}
		}

		const texCount = this.bufferStructure.length
		if (texCount > 1) {
			const bufferAttachments: number[] = []

			for (let i = 0; i < texCount; i++) {
				bufferAttachments.push((gl as any)[`COLOR_ATTACHMENT${i}`])
			}

			gl.drawBuffers(bufferAttachments)

			for (let i = 0; i < texCount; i++) {
				if (this.textures[i] == null) {
					this.textures[i] = gl.createTexture()
				}
				const texture = this.textures[i]

				const type = this.bufferStructure[i]

				gl.bindTexture(gl.TEXTURE_2D, texture)
				gl.texImage2D(
					gl.TEXTURE_2D,
					0,
					type === 'FLOAT' ? gl.RGBA32F : gl.RGBA,
					width,
					height,
					0,
					gl.RGBA,
					gl[type],
					null,
				)

				setTextureParams(gl, data, this._data)
				gl.framebufferTexture2D(
					gl.FRAMEBUFFER,
					bufferAttachments[i],
					gl.TEXTURE_2D,
					texture,
					0,
				)
			}
		} else {
			if (this.textures[0] == null) {
				this.textures[0] = gl.createTexture()
			}
			const texture = this.textures[0]

			gl.bindTexture(gl.TEXTURE_2D, texture)
			setTextureParams(gl, data, this._data)
			gl.texImage2D(
				gl.TEXTURE_2D,
				0,
				gl.RGBA,
				width,
				height,
				0,
				gl.RGBA,
				gl[this.bufferStructure[0]],
				null,
			)

			gl.framebufferTexture2D(
				gl.FRAMEBUFFER,
				gl.COLOR_ATTACHMENT0,
				gl.TEXTURE_2D,
				texture,
				0,
			)
		}

		if (this.depthBuffer == null) {
			this.depthBuffer = gl.createRenderbuffer()
		}

		gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthBuffer)
		gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height)
		gl.framebufferRenderbuffer(
			gl.FRAMEBUFFER,
			gl.DEPTH_ATTACHMENT,
			gl.RENDERBUFFER,
			this.depthBuffer,
		)

		const err = gl.checkFramebufferStatus(gl.FRAMEBUFFER)
		if (err !== gl.FRAMEBUFFER_COMPLETE) {
			console.error('framebuffer error', err, data)
		}

		gl.bindFramebuffer(gl.FRAMEBUFFER, null)
		gl.bindTexture(gl.TEXTURE_2D, null)
		gl.bindRenderbuffer(gl.RENDERBUFFER, null)

		Object.assign(this._data, data)
		this.width = width
		this.height = height

		return this
	}

	destroy() {
		const gl = this._painter.gl
		gl.deleteFramebuffer(this.frameBuffer)
		gl.deleteRenderbuffer(this.depthBuffer)
		for (const texture of this.textures) {
			gl.deleteTexture(texture)
		}
		this.textures = []
	}
}
