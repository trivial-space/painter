import { defaultTextureSettings } from './asset-lib'
import { Painter } from './painter'
import { TextureData, Wrap } from './painter-types'

let textureCount = 1

export class Texture {
	_texture: WebGLTexture | null = null
	_data: TextureData = {}

	constructor(
		private _painter: Painter,
		public id = 'Texture' + textureCount++,
	) {}

	update(data: TextureData & { width?: number; height?: number }) {
		const gl = this._painter.gl

		if (this._texture == null) {
			this._texture = gl.createTexture()
		}

		gl.bindTexture(gl.TEXTURE_2D, this._texture)

		if (
			(data.wrap && data.wrap !== this._data.wrap) ||
			(data.wrapS && data.wrapS !== this._data.wrapS) ||
			(data.wrapT && data.wrapT !== this._data.wrapT)
		) {
			let wrapS: Wrap, wrapT: Wrap
			if (data.wrap) {
				wrapS = wrapT = data.wrap
			} else {
				wrapT = data.wrapT || defaultTextureSettings.wrap!
				wrapS = data.wrapS || defaultTextureSettings.wrap!
			}

			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl[wrapS])
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl[wrapT])
		} else if (!(this._data.wrap || this._data.wrapS || this._data.wrapT)) {
			this._data.wrap =
				this._data.wrapT =
				this._data.wrapS =
					defaultTextureSettings.wrap!
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl[this._data.wrap])
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl[this._data.wrap])
		}

		if (data.magFilter && data.magFilter !== this._data.magFilter) {
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl[data.magFilter])
		} else if (!this._data.magFilter) {
			this._data.magFilter = defaultTextureSettings.magFilter!
			gl.texParameteri(
				gl.TEXTURE_2D,
				gl.TEXTURE_MAG_FILTER,
				gl[this._data.magFilter],
			)
		}

		if (data.minFilter && data.minFilter !== this._data.minFilter) {
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl[data.minFilter])
		} else if (!this._data.minFilter) {
			this._data.minFilter = defaultTextureSettings.minFilter!
			gl.texParameteri(
				gl.TEXTURE_2D,
				gl.TEXTURE_MIN_FILTER,
				gl[this._data.minFilter],
			)
		}

		if (data.asset) {
			gl.texImage2D(
				gl.TEXTURE_2D,
				0,
				gl.RGBA,
				gl.RGBA,
				gl.UNSIGNED_BYTE,
				data.asset,
			)
		}

		if (data.data !== undefined) {
			gl.texImage2D(
				gl.TEXTURE_2D,
				0,
				data.type === 'FLOAT' ? gl.RGBA32F : gl.RGBA,
				data.width!, // width and height are required if using custom data
				data.height!,
				0,
				gl.RGBA,
				gl[data.type || 'UNSIGNED_BYTE'],
				data.data,
			)
		}

		if (data.flipY != null && data.flipY !== this._data.flipY) {
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, data.flipY as any)
		}

		if (data.minFilter && data.minFilter.indexOf('MIPMAP') > 0) {
			gl.generateMipmap(gl.TEXTURE_2D)
		}

		gl.bindTexture(gl.TEXTURE_2D, null)

		Object.assign(this._data, data)

		return this
	}

	destroy() {
		this._painter.gl.deleteTexture(this._texture)
		this._data = {}
		this._texture = null
	}
}
