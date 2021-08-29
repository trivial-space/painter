import { isArray } from 'util'
import {
	defaultForms,
	defaultShaders,
	getDefaultLayerSettings,
} from './asset-lib'
import { Form } from './form'
import { Layer } from './layer'
import {
	DrawSettings,
	GL,
	GL1,
	GL2,
	LayerData,
	PainterOptions,
	RenderSources,
	Uniforms,
} from './painter-types'
import { RenderTarget } from './render-target'
import { applyDrawSettings, revertDrawSettings } from './render-utils'
import { Shade } from './shade'
import { Effect, Sketch } from './sketch'
import { resizeCanvas } from './utils/context'

export class Painter {
	sizeMultiplier: number
	gl: GL
	isWebGL2: boolean = true
	maxBufferSamples = 0
	_renderQuad: Form
	_staticSketch: Sketch
	_defaultLayer: Layer

	constructor(public canvas: HTMLCanvasElement, opts: PainterOptions = {}) {
		let gl: GL | null = null
		if (!opts.useWebGL1) {
			gl =
				(canvas.getContext('webgl2', opts) as GL2) ||
				canvas.getContext('experimental-webgl2', opts as GL2)
		}
		if (gl == null) {
			this.isWebGL2 = false
			gl =
				(canvas.getContext('webgl', opts) as GL1) ||
				(canvas.getContext('experimental-webgl', opts) as GL1)
		}

		if (gl == null) {
			throw Error('Cannot initialize WebGL.')
		}

		this.gl = gl
		this.sizeMultiplier = opts.sizeMultiplier || 1

		if (this.isWebGL2) {
			this.maxBufferSamples = gl.getParameter((gl as GL2).MAX_SAMPLES)
		}

		this.resize()
		applyDrawSettings(gl, getDefaultLayerSettings(gl))

		this._renderQuad = this.createForm().update(defaultForms.renderQuad)
		this._staticSketch = this.createEffect()
		this._defaultLayer = this.createLayer()
	}

	resize() {
		resizeCanvas(this.gl.canvas, this.sizeMultiplier)
		return this
	}

	destroy() {
		this._defaultLayer.destroy()
		this._staticSketch.destroy()
		this._renderQuad.destroy()
	}

	updateDrawSettings(drawSettings?: DrawSettings) {
		applyDrawSettings(this.gl, {
			...drawSettings,
		})
		return this
	}
	createForm(id?: string) {
		return new Form(this, id)
	}
	createShade(id?: string) {
		return new Shade(this, id)
	}
	createSketch(id?: string) {
		return new Sketch(id)
	}
	createEffect(id?: string) {
		return new Effect(
			this._renderQuad,
			this.createShade(id && id + '_effectShade').update(
				defaultShaders.basicEffect,
			),
			id,
		)
	}
	createLayer(id?: string) {
		return new Layer(this, id)
	}
	draw(opts: LayerData) {
		this._defaultLayer.update({ ...opts, directRender: true })
		this.compose(this._defaultLayer)
		this._defaultLayer.clear()
		return this
	}
	compose(...layers: Layer[]) {
		for (const layer of layers) {
			renderLayer(this.gl, layer)
		}
		return this
	}
	show(layer: Layer, idx = 0) {
		return this.draw({
			sketches: this._staticSketch,
			uniforms: { source: layer.image(idx) },
		})
	}
}

function render(
	gl: GL,
	shade: Shade,
	form: Form,
	uniforms: Uniforms | Uniforms[],
	sources?: RenderSources,
) {
	gl.useProgram(shade._program)
	shadeForm(shade, form)

	if (Array.isArray(uniforms)) {
		for (const uniform of uniforms) {
			shadeUniforms(shade, uniform, sources)
		}
	} else if (uniforms) {
		shadeUniforms(shade, uniforms, sources)
	}

	if (form._elements && form._elements.glType != null) {
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, form._elements.buffer)
		gl.drawElements(form._drawType, form._itemCount, form._elements.glType, 0)
	} else {
		gl.drawArrays(form._drawType, 0, form._itemCount)
	}
}

function shadeForm(shade: Shade, form: Form) {
	for (const name in form._attribs) {
		const setter = shade._attributeSetters[name]
		if (setter) {
			setter.setter(form._attribs[name])
		}
	}
}

function shadeUniforms(
	shade: Shade,
	uniforms: Uniforms,
	sources?: RenderSources,
) {
	for (const name in uniforms) {
		const setter = shade._uniformSetters[name]
		if (setter) {
			let value = uniforms[name]
			if (typeof value === 'function') {
				value = value()
			}
			if (typeof value === 'string' && sources) {
				setter.setter(sources[value as any])
			} else {
				setter.setter(value)
			}
		}
	}
}

const uniformsArray: Uniforms[] = []

function prepareTargetBuffer(gl: GL, target?: RenderTarget | undefined) {
	if (target) {
		gl.bindFramebuffer(
			gl.FRAMEBUFFER,
			target.antialias ? target.antiAliasFrameBuffer : target.frameBuffer,
		)
		gl.viewport(0, 0, target.width, target.height)
	} else {
		gl.bindFramebuffer(gl.FRAMEBUFFER, null)
		gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
	}
}

function antialiasTargetBuffer(gl: GL, target?: RenderTarget) {
	if (target && target.antialias) {
		const gl2 = gl as GL2
		// "blit" the cube into the color buffer, which adds antialiasing
		gl.bindFramebuffer(gl2.READ_FRAMEBUFFER, target.antiAliasFrameBuffer)
		gl.bindFramebuffer(gl2.DRAW_FRAMEBUFFER, target.frameBuffer)
		gl2.clearBufferfv(gl2.COLOR, 0, [1.0, 1.0, 1.0, 1.0])
		gl2.blitFramebuffer(
			0,
			0,
			target.width,
			target.height,
			0,
			0,
			target.width,
			target.height,
			gl.COLOR_BUFFER_BIT,
			gl.LINEAR,
		)
	}
}

function renderSketches(
	gl: GL,
	sketches: Sketch[],
	uniforms?: Uniforms,
	target?: RenderTarget,
	source?: RenderSources,
) {
	prepareTargetBuffer(gl, target)

	for (const sketch of sketches) {
		if (sketch._drawSettings) {
			applyDrawSettings(gl, sketch._drawSettings)
		}
		if (Array.isArray(sketch._uniforms)) {
			for (const uniform of sketch._uniforms) {
				uniformsArray.length = 0
				uniforms && uniformsArray.push(uniforms)
				uniformsArray.push(uniform)
				render(gl, sketch.shade, sketch.form, uniformsArray, source)
			}
		} else {
			uniformsArray.length = 0
			uniforms && uniformsArray.push(uniforms)
			sketch._uniforms && uniformsArray.push(sketch._uniforms)
			render(gl, sketch.shade, sketch.form, uniformsArray, source)
		}
		if (sketch._drawSettings) {
			revertDrawSettings(gl, sketch._drawSettings)
		}
	}

	antialiasTargetBuffer(gl, target)
}

function renderLayer(gl: GL, layer: Layer) {
	if (layer._data.drawSettings) {
		applyDrawSettings(gl, layer._data.drawSettings)
	}

	if (layer.sketches) {
		const target = layer._targets[0]
		const sources = layer._textures.length
			? layer._textures
			: layer._targets[1] && layer._targets[1].textures

		renderSketches(gl, layer.sketches, layer._uniforms, target, sources)
		layer._swapTargets()
	}

	if (layer.effects) {
		let remainingPasses = layer._passCount
		for (let j = 0; j < layer.effects.length; j++) {
			const effect = layer.effects[j]
			if (effect._drawSettings) {
				applyDrawSettings(gl, effect._drawSettings)
			}
			if (Array.isArray(effect._uniforms)) {
				for (let i = 0; i < effect._uniforms.length; i++) {
					remainingPasses--
					const target = remainingPasses > 0 ? layer._targets[0] : undefined
					const sources =
						i + j === 0 && layer._textures.length && !layer.sketches
							? layer._textures
							: layer._targets[1] && layer._targets[1].textures

					prepareTargetBuffer(gl, target)

					uniformsArray.length = 0
					layer._uniforms && uniformsArray.push(layer._uniforms)
					uniformsArray.push(effect._uniforms[i])
					render(gl, effect.shade, effect.form, uniformsArray, sources)

					layer._swapTargets()
				}
			} else {
				const target = remainingPasses > 0 ? layer._targets[0] : undefined
				const sources =
					j === 0 && layer._textures.length && !layer.sketches
						? layer._textures
						: layer._targets[1] && layer._targets[1].textures

				prepareTargetBuffer(gl, target)

				uniformsArray.length = 0
				layer._uniforms && uniformsArray.push(layer._uniforms)
				effect._uniforms && uniformsArray.push(effect._uniforms)
				render(gl, effect.shade, effect.form, uniformsArray, sources)

				layer._swapTargets()
			}

			if (effect._drawSettings) {
				revertDrawSettings(gl, effect._drawSettings)
			}
		}
	}

	if (layer._data.drawSettings) {
		revertDrawSettings(gl, layer._data.drawSettings)
	}
}