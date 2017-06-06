import { GL, Uniforms, DrawSettings, Sketch, Shade, Form, Painter, RenderTarget, Layer } from './render-types'
import * as form from './form'
import * as shade from './shade'
import * as sketch from './sketch'
import * as layer from './layer'
import { updateRenderTarget } from './render-utils'
import { resizeCanvas } from './utils/context'
import { defaultForms, defaultShaders, defaultTextureSettings } from './asset-lib'



export function create (gl: WebGLRenderingContext): Painter {

	const targets = [
		{ } as RenderTarget,
		{ } as RenderTarget
	]

	const renderQuad = form.create(gl).update(defaultForms.renderQuad)

	const createFlatSketch = () => sketch.create(gl).update({
		form: renderQuad,
		shade: shade.create(gl).update(defaultShaders.basicEffect)
	})

	const result = createFlatSketch()

	const resize = (multiplier = 1, forceUpdateTargets = false) => {
		const canvas = gl.canvas
		const needUpdate = resizeCanvas(canvas, multiplier)

		if (needUpdate || forceUpdateTargets) {
			targets.forEach(t => {
				t.width = canvas.width
				t.height = canvas.height
				updateRenderTarget(gl, t, defaultTextureSettings)
			})
		}

		return needUpdate
	}

	resize(1, true)

	return {
		gl,
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
			draw(gl, sketch, null, globalUniforms, globalSettings),
		compose: (...layers: Layer[]) => composeLayers(gl, layers, targets, result),
		resize
	}
}


function draw (
	gl: GL,
	sketch: Sketch,
	defaultTexture: WebGLTexture | null,
	globalUniforms?: Uniforms,
	globalSettings?: DrawSettings
) {

	const { shade, uniforms, form } = sketch
	const blending = sketch.drawSettings.blending || (globalSettings && globalSettings.blending)

	if (!(shade && form)) {
		throw Error('cannot draw, shader or geometry are not set')
	}

	gl.useProgram(shade.program)
	shadeForm(shade, form)

	if (globalUniforms) {
		shadeUniforms(shade, globalUniforms, defaultTexture)
	}

	if (blending) {
		gl.enable(gl.BLEND)
		gl.blendFunc.apply(gl, sketch.drawSettings.blendFns)
	}

	if (Array.isArray(uniforms)) {
		for (const instanceUniforms of uniforms) {
			drawInstance(gl, sketch, defaultTexture, instanceUniforms)
		}
	} else {
		drawInstance(gl, sketch, defaultTexture, uniforms)
	}

	if (blending) {
		gl.disable(gl.BLEND)
	}
}


function drawInstance (
	gl: GL,
	sketch: Sketch,
	defaultTexture: WebGLTexture | null,
	uniforms?: Uniforms
) {
	if (uniforms) {
		shadeUniforms(sketch.shade, uniforms, defaultTexture)
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


function shadeUniforms (shade: Shade, values: Uniforms, defaultTexture: WebGLTexture | null) {
	for (const name in values) {
		const setter = shade.uniformSetters[name]
		if (setter) {
			const value = values[name]
			if (value === null || typeof value === 'string') {
				setter.setter(defaultTexture)
			} else {
				setter.setter(value)
			}
		}
	}
}


function composeLayers (gl: GL, layers: Layer[], targets: RenderTarget[], result: Sketch) {

	const last = layers.length - 1

	for (let i = 0; i < layers.length; i++) {
		const layer = layers[i]
		const directRender = i === last
		const renderToStack = !directRender && layer.target == null
		const source = targets[0]
		const target = targets[1]

		if (directRender) {
			gl.bindFramebuffer(gl.FRAMEBUFFER, null)
			gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)

		} else if (layer.target) {
			gl.bindFramebuffer(gl.FRAMEBUFFER, layer.target.frameBuffer)
			gl.viewport(0, 0, layer.target.width, layer.target.height)

		} else {
			gl.bindFramebuffer(gl.FRAMEBUFFER, target.frameBuffer)
			gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
		}

		if (layer.data.clearColor) {
			gl.clearColor.apply(gl, layer.data.clearColor)
		}

		if (layer.data.clearBits) {
			gl.clear(layer.data.clearBits)
		}

		if (layer.sketches) {
			for (const sketch of layer.sketches) {
				draw(gl, sketch, source.textures[0], layer.uniforms, layer.data)
			}
		} else if (directRender) {
			// Display static texture
			draw(gl, result, null, { source: layer.texture() })
		}

		if (renderToStack) {
			targets[0] = target
			targets[1] = source
		}
	}
}

