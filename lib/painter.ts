import lib from './asset-lib'
import { GL, Uniforms, DrawSettings, Sketch, Shade, Form, Painter } from './render-types'
import * as form from './form'
import * as shade from './shade'
import * as sketch from './sketch'
import * as layer from './layer'



export function create (gl: GL | null): Painter {

	if (gl == null) {
		throw TypeError('No valid WebGL context received')
	}

	const renderQuad = form.create(gl).update(lib.geometries.renderQuad)

	const createFlatSketch = () => sketch.create(gl).update({
		form: renderQuad,
		shade: shade.create(gl).update(lib.shaders.basicEffect)
	})

	return {
		createForm: () => form.create(gl),
		createShade: () => shade.create(gl),
		createSketch: () => sketch.create(gl),
		createFlatSketch,
		createStaticLayer: () => layer.createStatic(gl),
		createDrawingLayer: () => layer.createDrawing(gl),
		createEffectLayer: () => layer.createDrawing(gl).update({
			sketches: [createFlatSketch()]
		}),
		draw: (sketch: Sketch, globalUniforms?: Uniforms, globalSettings?: DrawSettings) =>
			draw(gl, sketch, globalUniforms, globalSettings)
	}
}


function draw (gl: GL, sketch: Sketch, globalUniforms?: Uniforms, globalSettings?: DrawSettings) {

	const { shade, uniforms, form } = sketch
	const blending = sketch.drawSettings.blending || (globalSettings && globalSettings.blending)

	if (!(shade && form)) {
		throw Error('cannot draw, shader or geometry are not set')
	}

	gl.useProgram(shade.program)
	shadeForm(shade, form)

	if (globalUniforms) {
		shadeUniforms(shade, globalUniforms)
	}

	if (blending) {
		gl.enable(gl.BLEND)
		gl.blendFunc.apply(gl, sketch.drawSettings.blendFns)
	}

	if (Array.isArray(uniforms)) {
		for (const instanceUniforms of uniforms) {
			drawInstance(gl, sketch, instanceUniforms)
		}
	} else {
		drawInstance(gl, sketch, uniforms)
	}

	if (blending) {
		gl.disable(gl.BLEND)
	}
}


function drawInstance (gl: GL, sketch: Sketch, uniforms?: Uniforms) {
	if (uniforms) {
		shadeUniforms(sketch.shade, uniforms)
	}

	if (sketch.form.elements && sketch.form.elements.glType != null) {
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sketch.form.elements.buffer)
		gl.drawElements(sketch.form.drawType, sketch.form.itemCount, sketch.form.elements.glType, 0)
	} else {
		gl.drawArrays(sketch.form.drawType, 0, sketch.form.itemCount)
	}
}


function shadeForm (shade: Shade, form: Form) {
	for (const name in form.attribs) {
		const setter = shade.attributeSetters[name]
		if (setter) {
			setter.setter(form.attribs[name])
		}
	}
}


function shadeUniforms (shade: Shade, values: Uniforms) {
	for (const name in values) {
		const setter = shade.uniformSetters[name]
		if (setter) {
			setter.setter(values[name])
		}
	}
}


export function renderLayers (renderObject: any, ctx: any, layerIds: any[]) {

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
				renderObject(ctx, layer.object)
				break

			case 'objects':
				for (const id of layer.opaques) {
					renderObject(ctx, ctx.objects[id] as any, layer.uniforms)
				}
				if (layer.transparents.length) {
					gl.enable(gl.BLEND)
					for (const id of layer.transparents) {
						renderObject(ctx, ctx.objects[id] as any, layer.uniforms)
					}
					gl.disable(gl.BLEND)
				}
				break

			case 'static':
				if (directRender) {
					const object = ctx.objects['_result'] as any
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
