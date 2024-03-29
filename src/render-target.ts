import { equalObject } from 'tvs-libs/dist/utils/predicates'
import { Painter } from './painter'
import { RenderTargetData, TextureOptions } from './painter-types'
import { Texture } from './texture'

let targetCount = 1

export class RenderTarget {
	width: number = 0
	height: number = 0
	antialias?: boolean = false

	frameBuffer: WebGLFramebuffer | null = null
	antiAliasFrameBuffer: WebGLFramebuffer | null = null
	antiAliasRenderBuffer: WebGLFramebuffer | null = null
	textures: Texture[] = []
	depthBuffer: WebGLRenderbuffer | null = null

	bufferOptions: TextureOptions[] = []

	_data: RenderTargetData = {}

	constructor(
		private _painter: Painter,
		public id = 'Form' + targetCount++,
	) {}

	update(data: RenderTargetData) {
		const gl = this._painter.gl
		const width = data.width || this.width
		const height = data.height || this.height
		const type = data.bufferType || this._data.bufferType || 'UNSIGNED_BYTE'

		let newBufferOptions: TextureOptions[] = []
		if (data.bufferOptions) {
			newBufferOptions = Array.isArray(data.bufferOptions)
				? data.bufferOptions
				: [data.bufferOptions]
		}

		if (!(width && height)) {
			return this
		} else if (width === this.width && height === this.height) {
			if (data.bufferCount === this.textures.length) {
				return this
			}

			if (!newBufferOptions.length) {
				return this
			}

			if (
				newBufferOptions.length === this.bufferOptions.length &&
				this.bufferOptions.every((buf, i) =>
					equalObject(buf, newBufferOptions[i]),
				)
			) {
				return this
			}
		}

		if (this.frameBuffer == null) {
			this.frameBuffer = gl.createFramebuffer()
		}
		if (this.depthBuffer == null) {
			this.depthBuffer = gl.createRenderbuffer()
		}

		if (newBufferOptions.length) {
			this.bufferOptions = newBufferOptions
		}

		const texCount =
			data.bufferCount || this.bufferOptions.length || this.textures.length || 1
		const bufferAttachments: number[] = [gl.COLOR_ATTACHMENT0]

		gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer)

		if (texCount > 1) {
			const attachment = gl.COLOR_ATTACHMENT0
			for (let i = 0; i < texCount; i++) {
				bufferAttachments[i] = attachment + i
			}

			gl.drawBuffers(bufferAttachments)
		}

		for (let i = 0; i < texCount; i++) {
			if (!this.textures[i]) {
				this.textures[i] = new Texture(this._painter, this.id + '_Texture' + i)
			}
			const texture = this.textures[i]
			texture.update({
				minFilter: 'NEAREST',
				magFilter: 'NEAREST',
				type,
				...this.bufferOptions[i],
				data: null,
				width,
				height,
			})
		}

		const isFloat =
			(this.bufferOptions.length > 0 &&
				this.bufferOptions.some(b => b.type === 'FLOAT')) ||
			type === 'FLOAT'

		this.antialias = texCount === 1 && (this._data?.antialias ?? data.antialias)

		this.setupBuffers(gl, isFloat, width, height, texCount, bufferAttachments)

		if (this.antialias) {
			gl.bindFramebuffer(gl.FRAMEBUFFER, this.antiAliasFrameBuffer)
			const err = gl.checkFramebufferStatus(gl.FRAMEBUFFER)
			if (err !== gl.FRAMEBUFFER_COMPLETE) {
				console.error('antialias framebuffer error', err, data, this)

				if (isFloat) {
					this.antialias = false
					data.antialias = false

					this.setupBuffers(
						gl,
						isFloat,
						width,
						height,
						texCount,
						bufferAttachments,
					)
				}
			}
			gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer)
		}

		const err = gl.checkFramebufferStatus(gl.FRAMEBUFFER)
		if (err !== gl.FRAMEBUFFER_COMPLETE) {
			console.error('framebuffer error', err, data, this)
		}

		gl.bindFramebuffer(gl.FRAMEBUFFER, null)
		gl.bindTexture(gl.TEXTURE_2D, null)
		gl.bindRenderbuffer(gl.RENDERBUFFER, null)

		Object.assign(this._data, data)
		this.width = width
		this.height = height

		return this
	}

	private setupBuffers(
		gl: WebGL2RenderingContext,
		isFloat: boolean,
		width: number,
		height: number,
		texCount: number,
		bufferAttachments: number[],
	) {
		if (this.antialias) {
			if (this.antiAliasFrameBuffer == null) {
				this.antiAliasFrameBuffer = gl.createFramebuffer()
			}
			if (this.antiAliasRenderBuffer == null) {
				this.antiAliasRenderBuffer = gl.createRenderbuffer()
			}

			gl.bindFramebuffer(gl.FRAMEBUFFER, this.antiAliasFrameBuffer)
			gl.bindRenderbuffer(gl.RENDERBUFFER, this.antiAliasRenderBuffer)
			gl.renderbufferStorageMultisample(
				gl.RENDERBUFFER,
				Math.min(4, gl.getParameter(gl.MAX_SAMPLES)),
				isFloat ? gl.RGBA32F : gl.RGBA8, // Currently isFloat is always false here
				width,
				height,
			)
			gl.framebufferRenderbuffer(
				gl.FRAMEBUFFER,
				gl.COLOR_ATTACHMENT0,
				gl.RENDERBUFFER,
				this.antiAliasRenderBuffer,
			)

			gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthBuffer)
			gl.renderbufferStorageMultisample(
				gl.RENDERBUFFER,
				Math.min(4, gl.getParameter(gl.MAX_SAMPLES)),
				gl.DEPTH_COMPONENT24,
				width,
				height,
			)
			gl.framebufferRenderbuffer(
				gl.FRAMEBUFFER,
				gl.DEPTH_ATTACHMENT,
				gl.RENDERBUFFER,
				this.depthBuffer,
			)

			gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer)
		} else {
			if (this.antiAliasFrameBuffer) {
				gl.deleteFramebuffer(this.antiAliasFrameBuffer)
				this.antiAliasFrameBuffer = null
			}
			if (this.antiAliasRenderBuffer) {
				gl.deleteRenderbuffer(this.antiAliasRenderBuffer)
				this.antiAliasRenderBuffer = null
			}

			gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer)

			gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthBuffer)
			gl.renderbufferStorage(
				gl.RENDERBUFFER,
				gl.DEPTH_COMPONENT24,
				width,
				height,
			)

			gl.framebufferRenderbuffer(
				gl.FRAMEBUFFER,
				gl.DEPTH_ATTACHMENT,
				gl.RENDERBUFFER,
				this.depthBuffer,
			)
		}

		for (let i = 0; i < texCount; i++) {
			gl.framebufferTexture2D(
				gl.FRAMEBUFFER,
				bufferAttachments[i],
				gl.TEXTURE_2D,
				this.textures[i]._texture,
				0,
			)
		}
	}

	destroy() {
		const gl = this._painter.gl
		gl.deleteFramebuffer(this.frameBuffer)
		gl.deleteRenderbuffer(this.depthBuffer)
		for (const texture of this.textures) {
			texture.destroy()
		}
		if (this.antiAliasFrameBuffer) {
			gl.deleteFramebuffer(this.antiAliasFrameBuffer)
		}
		if (this.antiAliasRenderBuffer) {
			gl.deleteRenderbuffer(this.antiAliasRenderBuffer)
		}
		this.textures = []
		this.frameBuffer = null
		this.depthBuffer = null
		this._data = {}
		this.bufferOptions = []
		this.width = 0
		this.height = 0
	}
}
