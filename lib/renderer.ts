import lib from './asset-lib'
import {
	RenderTarget,
	ID,
	GL,
	Wrap,
	LayerData,
	TextureData,
	ContextObjectInitialized,
	ContextLayerObjects,
	ContextLayerStatic,
	ContextLayerShader,
	ContextLayer
} from './renderer-types'


export function updateLayer (
	ctx: any,
	layerId: ID,
	data: LayerData
) {

	const layer = ctx.layers[layerId] || {} as ContextLayer
	layer.noClear = !!data.noClear
	layer.clearColor = data.clearColor

	if (data.buffered) {
		layer.renderTarget = {
			width: data.width || ctx.settings.width,
			height: data.height || ctx.settings.height,
			frameBuffer: null, texture: null, depthBuffer: null
		}
		updateRenderTarget(ctx.gl, layer.renderTarget, data)
	} else {
		delete layer.renderTarget
	}

	if (data.asset) {
		layer.type = 'static'
		updateStaticLayer(ctx.gl, layer as ContextLayerStatic, data)

	} else if (data.objects) {
		const l = layer as ContextLayerObjects
		l.type = 'objects'
		l.transparents = []
		l.opaques = []
		l.uniforms = data.uniforms || {}
		for (const id of data.objects) {
			const o = ctx.objects[id]
			if (o) {
				if (o.type === 'initialized') {
					if (o.blend) {
						l.transparents.push(id)
					} else {
						l.opaques.push(id)
					}
				} else {
					o.updateLayers[layerId] = data
				}
			} else {
				ctx.objects[id] = {
					type: 'missing',
					updateLayers: {
						[layerId]: data
					}
				}
			}
		}

	} else if (data.shader) {
		const l = layer as ContextLayerShader
		l.type = 'shader'
		l.object = {
			type: 'initialized',
			shader: data.shader,
			geometry: '_renderQuad',
			uniforms: data.uniforms || {}
		}
	}

	ctx.layers[layerId] = layer
	return ctx
}


function updateStaticLayer (gl: GL, layer: ContextLayerStatic, data: LayerData) {
	const texture = layer.texture || gl.createTexture()
	gl.bindTexture(gl.TEXTURE_2D, texture)
	setTextureParams(gl, data)
	if (data.asset) {
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data.asset)
	}
	if (data.minFilter && data.minFilter.indexOf('MIPMAP') > 0) {
		gl.generateMipmap(gl.TEXTURE_2D)
	}
	gl.bindTexture(gl.TEXTURE_2D, null)
	layer.texture = texture
}


export function renderLayers (renderObject: any, ctx: any, layerIds: ID[]) {

	const gl = ctx.gl
	const last = layerIds.length - 1

	for (let i = 0; i < layerIds.length; i++) {
		const layerId = layerIds[i]
		const layer = ctx.layers[layerId]
		const directRender = i === last
		const renderToStack = !directRender && layer.renderTarget == null

		if (directRender) {
			gl.bindFramebuffer(gl.FRAMEBUFFER, null)
			gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)

		} else if (renderToStack) {
			gl.bindFramebuffer(gl.FRAMEBUFFER, ctx.target.frameBuffer)
			gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)

		} else if (layer.renderTarget) {
			gl.bindFramebuffer(gl.FRAMEBUFFER, layer.renderTarget.frameBuffer)
			gl.viewport(0, 0, layer.renderTarget.width, layer.renderTarget.height)
		}

		if (!layer.noClear) {
			gl.clearColor.apply(gl, layer.clearColor || ctx.settings.clearColor)
			gl.clear(ctx.settings.clearBits)
		}

		switch (layer.type) {
			case 'shader':
				//renderObject(ctx, layer.object)
				break

			case 'objects':
				for (const id of layer.opaques) {
					renderObject(ctx, ctx.objects[id] as ContextObjectInitialized, layer.uniforms)
				}
				if (layer.transparents.length) {
					gl.enable(gl.BLEND)
					for (const id of layer.transparents) {
						renderObject(ctx, ctx.objects[id] as ContextObjectInitialized, layer.uniforms)
					}
					gl.disable(gl.BLEND)
				}
				break

			case 'static':
				if (directRender) {
					const object = ctx.objects['_result'] as ContextObjectInitialized
					renderObject(ctx, object, { source: layerId })
				}
				break
		}

		if (renderToStack) {
			const tmp = ctx.source
			ctx.source = ctx.target
			ctx.target = tmp
		}
	}
}


function setTextureParams (gl: GL, data: TextureData) {

	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, data.flipY as any)

	let wrapS: Wrap | undefined, wrapT: Wrap | undefined

	if (data.wrap) {
		wrapS = wrapT = data.wrap
	} else {
		wrapT = data.wrapT
		wrapS = data.wrapS
	}

	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl[wrapS || 'CLAMP_TO_EDGE'])
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl[wrapT || 'CLAMP_TO_EDGE'])

	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl[data.magFilter || 'LINEAR'])
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl[data.minFilter || 'LINEAR'])
}


function updateRenderTarget (gl: GL, target: RenderTarget, data: LayerData) {
	if (data.width == null || data.height == null) {
		return
	}
	if (target.frameBuffer == null) {
		target.frameBuffer = gl.createFramebuffer()
	}
	if (target.texture == null) {
		target.texture = gl.createTexture()
	}
	if (target.depthBuffer == null) {
		target.depthBuffer = gl.createRenderbuffer()
	}
	gl.bindTexture(gl.TEXTURE_2D, target.texture)
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, data.width, data.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
	setTextureParams(gl, data)
	gl.bindRenderbuffer(gl.RENDERBUFFER, target.depthBuffer)
	gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, data.width, data.height)
	gl.bindFramebuffer(gl.FRAMEBUFFER, target.frameBuffer)
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, target.texture, 0)
	gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, target.depthBuffer)

	const err = gl.checkFramebufferStatus(gl.FRAMEBUFFER)
	if (err !== gl.FRAMEBUFFER_COMPLETE) {
		console.error('framebuffer error', err, data)
	}

	gl.bindFramebuffer(gl.FRAMEBUFFER, null)
	gl.bindTexture(gl.TEXTURE_2D, null)
	gl.bindRenderbuffer(gl.RENDERBUFFER, null)
}


export default {
	updateLayer,
	renderLayers,
	lib
}
