import { GL, Uniforms, Sketch, Shade, Form, Painter, RenderTarget, Layer, DrawSettings } from './render-types'
import * as form from './form'
import * as shade from './shade'
import * as sketch from './sketch'
import * as layer from './layer'
import { updateRenderTarget, applyDrawSettings, revertDrawSettings } from './render-utils'
import { resizeCanvas } from './utils/context'
import { defaultForms, defaultShaders, defaultTextureSettings, getDefaultLayerSettings } from './asset-lib'



export function create (gl: WebGLRenderingContext): Painter {

	const targets = [
		{ } as RenderTarget,
		{ } as RenderTarget
	]

	const defaultSettings = getDefaultLayerSettings(gl)

	const renderQuad = form.create(gl).update(defaultForms.renderQuad)

	const createFlatSketch = () => sketch.create().update({
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
				t.textureConfig = {
					count: 1,
					type: gl.UNSIGNED_BYTE
				}
				updateRenderTarget(gl, t, defaultTextureSettings)
			})
		}

		return needUpdate
	}

	resize(1, true)

	return {
		gl,
		updateDrawSettings: (drawSettings?: DrawSettings) => applyDrawSettings(gl, {
			...defaultSettings,
			...drawSettings
		}),
		createForm: () => form.create(gl),
		createShade: () => shade.create(gl),
		createSketch: () => sketch.create(),
		createFlatSketch,
		createStaticLayer: () => layer.createStatic(gl),
		createDrawingLayer: () => layer.createDrawing(gl),
		createEffectLayer: () => layer.createDrawing(gl).update({
			sketches: [createFlatSketch()]
		}),
		draw: (sketch: Sketch, globalUniforms?: Uniforms) =>
			draw(gl, sketch, null, globalUniforms),
		compose: (...layers: Layer[]) => composeLayers(gl, layers, targets, result),
		resize
	}
}


function draw (
	gl: GL,
	sketch: Sketch,
	defaultTexture: WebGLTexture | null,
	globalUniforms?: Uniforms
) {

	const { shade, uniforms, form, drawSettings } = sketch

	if (!(shade && form)) {
		throw Error('cannot draw, shader or geometry are not set')
	}

	gl.useProgram(shade.program)
	shadeForm(shade, form)

	if (globalUniforms) {
		shadeUniforms(shade, globalUniforms, defaultTexture)
	}

	if (drawSettings) {
		applyDrawSettings(gl, drawSettings)
	}

	if (Array.isArray(uniforms)) {
		for (const instanceUniforms of uniforms) {
			drawInstance(gl, sketch, defaultTexture, instanceUniforms)
		}
	} else {
		drawInstance(gl, sketch, defaultTexture, uniforms)
	}

	if (drawSettings) {
		revertDrawSettings(gl, drawSettings)
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


function shadeUniforms (shade: Shade, uniforms: Uniforms, defaultTexture: WebGLTexture | null) {
	for (const name in uniforms) {
		const setter = shade.uniformSetters[name]
		if (setter) {
			const value = uniforms[name]
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

		const render = (uniforms, directRender: boolean) => {
			const source = targets[0]
			const target = targets[1]
			const renderToStack = !directRender && layer.target == null

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

			if (layer.data.drawSettings) {
				applyDrawSettings(gl, layer.data.drawSettings)
			}

			if (layer.sketches) {
				for (const sketch of layer.sketches) {
					draw(gl, sketch, source.textures[0], uniforms)
				}
			} else {
				// Display static texture
				draw(gl, result, null, { source: layer.texture() })
			}

			if (layer.data.drawSettings) {
				revertDrawSettings(gl, layer.data.drawSettings)
			}

			if (renderToStack) {
				targets[0] = target
				targets[1] = source
			}
		}

		if (Array.isArray(layer.uniforms)) {
			const newLast = last + layer.uniforms.length - 1

			for (let j = 0; j < layer.uniforms.length; j++) {
				const directRender = i + j === newLast
				render(layer.uniforms[j], directRender)
			}

		} else {
			const directRender = i === last
			render(layer.uniforms, directRender)
		}

	}
}

