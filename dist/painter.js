import { defaultForms, defaultShaders, getDefaultLayerSettings, } from './asset-lib';
import { Form } from './form';
import { Frame } from './frame';
import { Layer } from './layer';
import { applyDrawSettings, revertDrawSettings } from './render-utils';
import { Shade } from './shade';
import { Sketch } from './sketch';
import { resizeCanvas } from './utils/context';
export class Painter {
    constructor(canvas, opts = {}) {
        this.canvas = canvas;
        this.isWebGL2 = true;
        this.maxBufferSamples = 0;
        let gl = null;
        if (!opts.useWebGL1) {
            gl =
                canvas.getContext('webgl2', opts) ||
                    canvas.getContext('experimental-webgl2', opts);
        }
        if (gl == null) {
            this.isWebGL2 = false;
            gl =
                canvas.getContext('webgl', opts) ||
                    canvas.getContext('experimental-webgl', opts);
        }
        if (gl == null) {
            throw Error('Cannot initialize WebGL.');
        }
        this.gl = gl;
        this.sizeMultiplier = opts.sizeMultiplier || 1;
        if (this.isWebGL2) {
            this.maxBufferSamples = gl.getParameter(gl.MAX_SAMPLES);
        }
        this.resize();
        applyDrawSettings(gl, getDefaultLayerSettings(gl));
        this._renderQuad = this.createForm().update(defaultForms.renderQuad);
        this._staticSketch = this.createFlatSketch();
    }
    resize() {
        resizeCanvas(this.gl.canvas, this.sizeMultiplier);
        return this;
    }
    destroy() {
        this._staticSketch.destroy();
        this._renderQuad.destroy();
    }
    updateDrawSettings(drawSettings) {
        applyDrawSettings(this.gl, Object.assign({}, drawSettings));
        return this;
    }
    createForm(id) {
        return new Form(this, id);
    }
    createShade(id) {
        return new Shade(this, id);
    }
    createSketch(id) {
        return new Sketch(id);
    }
    createFlatSketch(id) {
        const s = this.createSketch(id);
        return s.update({
            form: this._renderQuad,
            shade: this.createShade(s.id + '_defaultShade').update(defaultShaders.basicEffect),
        });
    }
    createFrame(id) {
        return new Frame(this, id);
    }
    createLayer(id) {
        return new Layer(id);
    }
    createEffect(id) {
        const l = this.createLayer(id);
        return l.update({
            sketches: this.createFlatSketch(l.id + '_effectSketch'),
        });
    }
    draw(sketch, globalUniforms) {
        const gl = this.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        draw(gl, sketch, globalUniforms);
        return this;
    }
    compose(...frames) {
        for (const frame of frames) {
            renderFrame(this.gl, frame);
        }
        return this;
    }
    display(frame, idx = 0) {
        return this.draw(this._staticSketch, { source: frame.image(idx) });
    }
}
function draw(gl, sketch, globalUniforms, sources) {
    const { shade: shade, form: form, _drawSettings: drawSettings, _uniforms: uniforms, } = sketch;
    if (!(shade && form)) {
        throw Error('cannot draw, shader or geometry are not set');
    }
    gl.useProgram(shade._program);
    shadeForm(shade, form);
    if (globalUniforms) {
        shadeUniforms(shade, globalUniforms, sources);
    }
    if (drawSettings) {
        applyDrawSettings(gl, drawSettings);
    }
    for (let i = 0; i < (uniforms.length || 1); i++) {
        drawInstance(gl, sketch, uniforms[i], sources);
    }
    if (drawSettings) {
        revertDrawSettings(gl, drawSettings);
    }
}
function drawInstance(gl, sketch, uniforms, sources) {
    if (uniforms) {
        shadeUniforms(sketch.shade, uniforms, sources);
    }
    if (sketch.form._elements && sketch.form._elements.glType != null) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sketch.form._elements.buffer);
        gl.drawElements(sketch.form._drawType, sketch.form._itemCount, sketch.form._elements.glType, 0);
    }
    else {
        gl.drawArrays(sketch.form._drawType, 0, sketch.form._itemCount);
    }
}
function shadeForm(shade, form) {
    for (const name in form._attribs) {
        const setter = shade._attributeSetters[name];
        if (setter) {
            setter.setter(form._attribs[name]);
        }
    }
}
function shadeUniforms(shade, uniforms, sources) {
    for (const name in uniforms) {
        const setter = shade._uniformSetters[name];
        if (setter) {
            let value = uniforms[name];
            if (typeof value === 'function') {
                value = value();
            }
            if (typeof value === 'string' && sources) {
                setter.setter(sources[value]);
            }
            else {
                setter.setter(value);
            }
        }
    }
}
function renderLayer(gl, layer, uniforms, target, source) {
    if (target) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.frameBuffer);
        gl.viewport(0, 0, target.width, target.height);
    }
    else {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
    if (layer._data.drawSettings) {
        applyDrawSettings(gl, layer._data.drawSettings);
    }
    for (const sketch of layer.sketches) {
        draw(gl, sketch, uniforms, source);
    }
    if (layer._data.drawSettings) {
        revertDrawSettings(gl, layer._data.drawSettings);
    }
}
function renderFrame(gl, frame) {
    for (let i = 0; i < frame.layers.length; i++) {
        const layer = frame.layers[i];
        const layerPasses = layer._uniforms.length || 1;
        for (let j = 0; j < layerPasses; j++) {
            const target = frame._targets[0];
            const sources = i + j === 0 && frame._textures.length
                ? frame._textures
                : frame._targets[1] && frame._targets[1].textures;
            renderLayer(gl, layer, layer._uniforms[j], target, sources);
            frame._swapTargets();
        }
    }
}
//# sourceMappingURL=painter.js.map