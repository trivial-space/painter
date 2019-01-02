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

	update(data: TextureData) {
		const gl = this._painter.gl
		if (data.flipY != null && data.flipY !== this._data.flipY) {
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, data.flipY as any)
		}

		if (
			(data.wrap && data.wrap !== this._data.wrap) ||
			(data.wrapS && data.wrapS !== this._data.wrapS) ||
			(data.wrapT && data.wrapT !== this._data.wrapT)
		) {
			let wrapS: Wrap, wrapT: Wrap
			if (data.wrap) {
				wrapS = wrapT = data.wrap
			} else {
				wrapT = data.wrapT || 'CLAMP_TO_EDGE'
				wrapS = data.wrapS || 'CLAMP_TO_EDGE'
			}

			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl[wrapS])
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl[wrapT])
		}

		if (data.magFilter && data.magFilter !== this._data.magFilter) {
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl[data.magFilter])
		}

		if (data.minFilter && data.minFilter !== this._data.minFilter) {
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl[data.minFilter])
		}
	}
}
