import {
	defaultForms,
	defaultShaders,
	getDefaultLayerSettings,
} from './asset-lib'
import { Form } from './form'
import { Frame } from './frame'
import { Layer } from './layer'
import {
	DrawSettings,
	GL,
	RenderSources,
	RenderTarget,
	Uniforms,
} from './painter-types'
import { applyDrawSettings, revertDrawSettings } from './render-utils'
import { Shade } from './shade'
import { Sketch } from './sketch'
import { resizeCanvas } from './utils/context'

export class Painter {
	_renderQuad: Form
	_staticSketch: Sketch

	constructor(public gl: GL, { multiplier = 1 } = {}) {
		this.resize({ multiplier })
		applyDrawSettings(this.gl, getDefaultLayerSettings(this.gl))
		this._renderQuad = this.createForm().update(defaultForms.renderQuad)
		this._staticSketch = this.createFlatSketch()
	}

	resize({ multiplier = 1 } = {}) {
		resizeCanvas(this.gl.canvas, multiplier)
		return this
	}

	destroy() {
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
		return new Form(this.gl, id)
	}
	createShade(id?: string) {
		return new Shade(this.gl, id)
	}
	createSketch(id?: string) {
		return new Sketch(id)
	}
	createFlatSketch(id?: string) {
		const s = this.createSketch(id)
		return s.update({
			form: this._renderQuad,
			shade: this.createShade(s.id + '_defaultShade').update(
				defaultShaders.basicEffect,
			),
		})
	}
	createFrame(id?: string) {
		return new Frame(this.gl, id)
	}
	createLayer(id?: string) {
		return new Layer(id)
	}
	createEffect(id?: string) {
		const l = this.createLayer(id)
		return l.update({
			sketches: this.createFlatSketch(l.id + '_effectSketch'),
		})
	}
	draw(sketch: Sketch, globalUniforms?: Uniforms) {
		const gl = this.gl
		gl.bindFramebuffer(gl.FRAMEBUFFER, null)
		gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
		draw(gl, sketch, globalUniforms)
		return this
	}
	compose(...frames: Frame[]) {
		for (const frame of frames) {
			renderFrame(this.gl, frame)
		}
		return this
	}
	display(frame: Frame, idx = 0) {
		return this.draw(this._staticSketch, { source: frame.image(idx) })
	}
}

function draw(
	gl: GL,
	sketch: Sketch,
	globalUniforms?: Uniforms,
	sources?: RenderSources,
) {
	const {
		shade: shade,
		form: form,
		_drawSettings: drawSettings,
		_uniforms: uniforms,
	} = sketch

	if (!(shade && form)) {
		throw Error('cannot draw, shader or geometry are not set')
	}

	gl.useProgram(shade._program)
	shadeForm(shade, form)

	if (globalUniforms) {
		shadeUniforms(shade, globalUniforms, sources)
	}

	if (drawSettings) {
		applyDrawSettings(gl, drawSettings)
	}

	for (let i = 0; i < (uniforms.length || 1); i++) {
		drawInstance(gl, sketch, uniforms[i], sources)
	}

	if (drawSettings) {
		revertDrawSettings(gl, drawSettings)
	}
}

function drawInstance(
	gl: GL,
	sketch: Sketch,
	uniforms?: Uniforms,
	sources?: RenderSources,
) {
	if (uniforms) {
		shadeUniforms(sketch.shade, uniforms, sources)
	}

	if (sketch.form._elements && sketch.form._elements.glType != null) {
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sketch.form._elements.buffer)
		gl.drawElements(
			sketch.form._drawType,
			sketch.form._itemCount,
			sketch.form._elements.glType,
			0,
		)
	} else {
		gl.drawArrays(sketch.form._drawType, 0, sketch.form._itemCount)
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

function renderLayer(
	gl: GL,
	layer: Layer,
	uniforms?: Uniforms,
	target?: RenderTarget,
	source?: RenderSources,
) {
	if (target) {
		gl.bindFramebuffer(gl.FRAMEBUFFER, target.frameBuffer)
		gl.viewport(0, 0, target.width, target.height)
	} else {
		gl.bindFramebuffer(gl.FRAMEBUFFER, null)
		gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
	}

	if (layer._data.drawSettings) {
		applyDrawSettings(gl, layer._data.drawSettings)
	}

	for (const sketch of layer.sketches) {
		draw(gl, sketch, uniforms, source)
	}

	if (layer._data.drawSettings) {
		revertDrawSettings(gl, layer._data.drawSettings)
	}
}

function renderFrame(gl: GL, frame: Frame) {
	for (let i = 0; i < frame.layers.length; i++) {
		const layer = frame.layers[i]
		const layerPasses = layer._uniforms.length || 1

		for (let j = 0; j < layerPasses; j++) {
			const target = frame._targets[0]
			const sources =
				i + j === 0 && frame._textures.length
					? frame._textures
					: frame._targets[1] && frame._targets[1].textures

			renderLayer(gl, layer, layer._uniforms[j], target, sources)

			frame._swapTargets()
		}
	}
}
