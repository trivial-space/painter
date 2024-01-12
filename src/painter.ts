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
	maxBufferSamples = 0
	_renderQuad: Form
	_staticEffect: Effect
	_defaultLayer: Layer
	_opts: PainterOptions

	constructor(
		public canvas: HTMLCanvasElement,
		opts: PainterOptions = {},
	) {
		let gl: GL | null = null
		gl =
			(canvas.getContext('webgl2', opts) as GL) ||
			canvas.getContext('experimental-webgl2', opts as GL)

		if (gl == null) {
			throw Error('Cannot initialize WebGL2.')
		}

		this.gl = gl
		this.sizeMultiplier = opts.sizeMultiplier || 1

		this.maxBufferSamples = gl.getParameter(gl.MAX_SAMPLES)

		this.resize()
		applyDrawSettings(gl, getDefaultLayerSettings(gl))

		this._renderQuad = this.createForm().update(defaultForms.renderQuad)
		this._staticEffect = this.createEffect()
		this._defaultLayer = this.createLayer()

		this._opts = opts
	}

	resize() {
		resizeCanvas(this.gl.canvas as HTMLCanvasElement, this.sizeMultiplier)
		return this
	}

	destroy() {
		this._defaultLayer.destroy()
		this._staticEffect.destroy()
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
	show(layer: Layer, idx?: number) {
		return this.draw({
			effects: this._staticEffect,
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
	shadeForm(gl, shade, form)

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

function shadeForm(gl: GL, shade: Shade, form: Form) {
	if (form._customLayout) {
		const buffer = form._customLayout.buffer
		if (buffer != null) {
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
		}
		for (const name in form._customLayout.attribs) {
			const shaderAttrib = shade._attributes[name]
			const attribLayout = form._customLayout.attribs[name]
			if (shaderAttrib) {
				if (attribLayout.buffer != null) {
					gl.bindBuffer(gl.ARRAY_BUFFER, attribLayout.buffer)
				}
				gl.vertexAttribPointer(
					shaderAttrib.location,
					attribLayout.size,
					attribLayout.type,
					attribLayout.normalize,
					attribLayout.stride,
					attribLayout.offset,
				)
				gl.enableVertexAttribArray(shaderAttrib.location)
			}
		}
	} else {
		for (const name in form._attribBuffers) {
			const shaderAttrib = shade._attributes[name]
			if (shaderAttrib) {
				shaderAttrib.setter(form._attribBuffers[name])
			}
		}
	}
}

function shadeUniforms(
	shade: Shade,
	uniforms: Uniforms,
	sources?: RenderSources,
) {
	for (const name in uniforms) {
		const setter = shade._uniforms[name]
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

function prepareTargetBuffer(
	gl: GL,
	target: RenderTarget | undefined,
	antialias: boolean,
) {
	if (target) {
		gl.bindFramebuffer(
			gl.FRAMEBUFFER,
			target.antialias && antialias
				? target.antiAliasFrameBuffer
				: target.frameBuffer,
		)
		gl.viewport(0, 0, target.width, target.height)
	} else {
		gl.bindFramebuffer(gl.FRAMEBUFFER, null)
		gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
	}
}

function antialiasTargetBuffer(gl: GL, target?: RenderTarget) {
	if (target && target.antialias) {
		// "blit" the cube into the color buffer, which adds antialiasing
		gl.bindFramebuffer(gl.READ_FRAMEBUFFER, target.antiAliasFrameBuffer)
		gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, target.frameBuffer)
		gl.clearBufferfv(gl.COLOR, 0, [1.0, 1.0, 1.0, 1.0])
		gl.blitFramebuffer(
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
	uniforms?: Uniforms | null,
	source?: RenderSources,
) {
	for (const sketch of sketches) {
		if (!(sketch.form && sketch.shade)) {
			throw Error('cannot render incomplete sketch')
		}
		if (sketch._drawSettings) {
			applyDrawSettings(gl, sketch._drawSettings)
		}
		if (Array.isArray(sketch._uniforms) && sketch._uniforms.length) {
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
}

function renderLayer(gl: GL, layer: Layer) {
	let remainingPasses = layer._passCount

	if (layer.sketches.length) {
		const target = remainingPasses > 0 ? layer._targets[0] : undefined
		const sources = layer._textures.length
			? layer._textures
			: layer._targets[1] && layer._targets[1].textures

		prepareTargetBuffer(gl, target, true)

		if (layer._data.drawSettings) {
			applyDrawSettings(gl, layer._data.drawSettings)
		}

		renderSketches(gl, layer.sketches, layer._uniforms, sources)

		antialiasTargetBuffer(gl, target)

		layer._swapTargets()
		remainingPasses--
	}

	if (layer.effects.length) {
		for (let j = 0; j < layer.effects.length; j++) {
			const effect = layer.effects[j]
			if (!(effect.form && effect.shade)) {
				throw Error('cannot render incomplete effect')
			}

			if (effect._uniforms.length) {
				for (let i = 0; i < effect._uniforms.length; i++) {
					const target = remainingPasses > 0 ? layer._targets[0] : undefined
					const sources =
						i + j === 0 && layer._textures.length && !layer.sketches.length
							? layer._textures
							: layer._targets[1] && layer._targets[1].textures

					prepareTargetBuffer(gl, target, false)

					if (layer._data.drawSettings) {
						applyDrawSettings(gl, layer._data.drawSettings)
					}
					if (effect._drawSettings) {
						applyDrawSettings(gl, effect._drawSettings)
					}

					uniformsArray.length = 0
					layer._uniforms && uniformsArray.push(layer._uniforms)
					uniformsArray.push(effect._uniforms[i])
					render(gl, effect.shade, effect.form, uniformsArray, sources)

					layer._swapTargets()
					remainingPasses--
				}
			} else {
				const target = remainingPasses > 0 ? layer._targets[0] : undefined
				const sources =
					j === 0 && layer._textures.length && !layer.sketches.length
						? layer._textures
						: layer._targets[1] && layer._targets[1].textures

				prepareTargetBuffer(gl, target, false)

				if (layer._data.drawSettings) {
					applyDrawSettings(gl, layer._data.drawSettings)
				}
				if (effect._drawSettings) {
					applyDrawSettings(gl, effect._drawSettings)
				}

				uniformsArray.length = 0
				layer._uniforms && uniformsArray.push(layer._uniforms)
				render(gl, effect.shade, effect.form, uniformsArray, sources)

				layer._swapTargets()
				remainingPasses--
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
