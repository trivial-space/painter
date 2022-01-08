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

	bufferStructure: TextureOptions[] = []

	_data?: RenderTargetData = {}

	constructor(private _painter: Painter, public id = 'Form' + targetCount++) {}

	update(data: RenderTargetData) {
		const gl = this._painter.gl
		const width = data.width || this.width
		const height = data.height || this.height
		if (!(width && height)) {
			return this
		} else if (width === this.width && height === this.height) {
			if (!data.bufferStructure) return this
			if (
				data.bufferStructure.length === this.bufferStructure.length &&
				this.bufferStructure.every((buf, i) =>
					equalObject(buf, data.bufferStructure![i]),
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

		if (data.bufferStructure && data.bufferStructure.length) {
			this.bufferStructure = data.bufferStructure
			if (this.bufferStructure.some(t => t.type === 'FLOAT')) {
				gl.getExtension('EXT_color_buffer_float')
			}
		}

		const texCount = this.bufferStructure.length || 1
		const bufferAttachments = [gl.COLOR_ATTACHMENT0]

		gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer)

		if (texCount > 1) {
			const attachment = gl.COLOR_ATTACHMENT0
			for (let i = 0; i < texCount; i++) {
				bufferAttachments[i] = attachment + i
			}

			gl.drawBuffers(bufferAttachments)
		}

		this.antialias = texCount === 1 && (data.antialias || this._data?.antialias)

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
				gl.RGBA8,
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
				gl.DEPTH_COMPONENT16,
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
			gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthBuffer)
			gl.renderbufferStorage(
				gl.RENDERBUFFER,
				gl.DEPTH_COMPONENT16,
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
			if (!this.textures[i]) {
				this.textures[i] = new Texture(this._painter, this.id + '_Texture' + i)
			}
			const texture = this.textures[i]
			texture.update({
				minFilter: 'NEAREST',
				magFilter: 'NEAREST',
				...this.bufferStructure[i],
				data: null,
				width,
				height,
			})

			gl.framebufferTexture2D(
				gl.FRAMEBUFFER,
				bufferAttachments[i],
				gl.TEXTURE_2D,
				texture._texture,
				0,
			)
		}

		if (this.antialias) {
			gl.bindFramebuffer(gl.FRAMEBUFFER, this.antiAliasFrameBuffer)
			const err = gl.checkFramebufferStatus(gl.FRAMEBUFFER)
			if (err !== gl.FRAMEBUFFER_COMPLETE) {
				console.error('antialias framebuffer error', err, data)
			}
			gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer)
		}

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
		this.bufferStructure = []
		this.width = 0
		this.height = 0
	}
}
