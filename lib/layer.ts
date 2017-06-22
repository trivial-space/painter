import { GL, Layer, LayerData, RenderTarget } from './render-types'
import { setTextureParams, updateRenderTarget } from './render-utils'


export function createStatic (gl: GL) {

	const layer = {} as Layer

	layer.textures = [],
	layer.data = {}

	layer.texture = (i = 0) => layer.textures[i]

	const texture = gl.createTexture()

	if (texture) {
		layer.textures.push(texture)
	}

	layer.update = (data: LayerData) => {
		gl.bindTexture(gl.TEXTURE_2D, layer.textures[0])

		setTextureParams(gl, data, layer.data)

		if (data.asset) {
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data.asset)
		}

		if (data.minFilter && data.minFilter.indexOf('MIPMAP') > 0) {
			gl.generateMipmap(gl.TEXTURE_2D)
		}

		gl.bindTexture(gl.TEXTURE_2D, null)

		Object.assign(layer.data, data)

		return layer
	}

	return layer
}


export function createDrawing (gl: GL) {


	const layer = {} as Layer

	layer.textures = [],
	layer.data = {}

	layer.texture = (i = 0) => layer.textures[i]

	layer.update = (data: LayerData) => {
		if (data.buffered && !layer.target) {
			layer.target = {
				width: data.width || gl.canvas.width,
				height: data.height || gl.canvas.height,
				frameBuffer: null, textures: [], depthBuffer: null,
				textureConfig: {
					type: gl.UNSIGNED_BYTE,
					count: 1
				}
			} as RenderTarget

			updateRenderTarget(gl, layer.target, data, layer.data)

			layer.textures = layer.target.textures

		} else if (layer.target && data.width && data.height) {
			layer.target.width = data.width
			layer.target.height = data.height

			updateRenderTarget(gl, layer.target, data, layer.data)
		}

		if (data.sketches) {
			layer.sketches = data.sketches
		}

		if (data.frag) {
			const sketch = layer.sketches && layer.sketches[0]
			if (sketch) {
				sketch.shade.update({ frag: data.frag })
			}
		}

		if (data.uniforms) {
			layer.uniforms = data.uniforms
		}

		Object.assign(layer.data, data)

		return layer
	}

	layer.delete = () => {
		for (const texture of layer.textures) {
			gl.deleteTexture(texture)
		}

		if (layer.target) {
			gl.deleteFramebuffer(layer.target.frameBuffer)
			gl.deleteRenderbuffer(layer.target.depthBuffer)
		}

		return layer
	}

	return layer
}

