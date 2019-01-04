import { equalObject } from 'tvs-libs/dist/utils/predicates'
import { Painter } from './painter'
import { GL2, RenderTargetData, TextureOptions } from './painter-types'
import { Texture } from './texture'

let targetCount = 1

export class RenderTarget {
	width: number = 0
	height: number = 0

	frameBuffer: WebGLFramebuffer | null = null
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

		gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer)

		if (data.bufferStructure && data.bufferStructure.length) {
			this.bufferStructure = data.bufferStructure
			if (this.bufferStructure.some(t => t.type === 'FLOAT')) {
				if (this._painter.isWebGL2) {
					gl.getExtension('EXT_color_buffer_float')
				} else {
					gl.getExtension('OES_texture_float')
				}
			}
		}

		const texCount = this.bufferStructure.length || 1
		const bufferAttachments = [gl.COLOR_ATTACHMENT0]

		if (texCount > 1) {
			let glx!: WEBGL_draw_buffers
			if (!this._painter.isWebGL2) {
				glx = gl.getExtension('WEBGL_draw_buffers')!
			}

			const attachment = this._painter.isWebGL2
				? gl.COLOR_ATTACHMENT0
				: glx.COLOR_ATTACHMENT0_WEBGL
			for (let i = 0; i < texCount; i++) {
				bufferAttachments[i] = attachment + i
			}

			this._painter.isWebGL2
				? (gl as GL2).drawBuffers(bufferAttachments)
				: glx.drawBuffersWEBGL(bufferAttachments)
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
		this.frameBuffer = null
		this.depthBuffer = null
		this._data = {}
		this.bufferStructure = []
		this.width = 0
		this.height = 0
	}
}
