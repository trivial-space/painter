import { GL, Uniforms, RenderTarget, Layer, DrawSettings } from './painter-types'
import { updateRenderTarget, applyDrawSettings, revertDrawSettings, destroyRenderTarget } from './render-utils'
import { resizeCanvas } from './utils/context'
import { defaultForms, defaultShaders, defaultTextureSettings, getDefaultLayerSettings } from './asset-lib'
import { Form } from './form'
import { Shade } from './shade'
import { Sketch } from './sketch'
import { StaticLayer, DrawingLayer } from './layer'


export class Painter {
	targets = [
		{} as RenderTarget,
		{} as RenderTarget
	]
	renderQuad: Form
	result: Sketch

	constructor(public gl: GL) {
		this.resize(1, true)
		this.renderQuad = this.createForm().update(defaultForms.renderQuad)
		this.result = this.createFlatSketch()
	}

	resize (multiplier = 1, forceUpdateTargets = false) {
		const canvas = this.gl.canvas
		const needUpdate = resizeCanvas(canvas, multiplier)

		if (needUpdate || forceUpdateTargets) {
			this.targets.forEach(t => {
				t.width = canvas.width
				t.height = canvas.height
				t.textureConfig = {
					count: 1,
					type: this.gl.UNSIGNED_BYTE
				}
				updateRenderTarget(this.gl, t, defaultTextureSettings)
			})
		}

		return this
	}

	destroy () {
		this.result.destroy()
		for (const target of this.targets) {
			destroyRenderTarget(this.gl, target)
		}
	}

	updateDrawSettings (drawSettings?: DrawSettings) {
		applyDrawSettings(this.gl, { ...getDefaultLayerSettings(this.gl), ...drawSettings })
		return this
	}
	createForm () { return new Form(this.gl) }
	createShade () { return new Shade(this.gl) }
	createSketch () { return new Sketch() }
	createFlatSketch () {
		return this.createSketch().update({
			form: this.renderQuad,
			shade: this.createShade().update(defaultShaders.basicEffect)
		})
	}
	createStaticLayer () { return new StaticLayer(this.gl) }
	createDrawingLayer () { return new DrawingLayer(this.gl) }
	createEffectLayer () {
		return this.createDrawingLayer().update({
			sketches: [this.createFlatSketch()]
		})
	}
	draw (sketch: Sketch, globalUniforms?: Uniforms) {
		draw(this.gl, sketch, null, globalUniforms)
		return this
	}
	compose (...layers: Layer[]) {
		composeLayers(this.gl, layers, this.targets, this.result)
		return this
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

		const render = (uniforms: Uniforms | undefined, directRender: boolean) => {
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

