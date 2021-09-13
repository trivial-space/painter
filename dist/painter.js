import { defaultForms, defaultShaders, getDefaultLayerSettings, } from './asset-lib';
import { Form } from './form';
import { Layer } from './layer';
import { applyDrawSettings, revertDrawSettings } from './render-utils';
import { Shade } from './shade';
import { Effect, Sketch } from './sketch';
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
        this._staticEffect = this.createEffect();
        this._defaultLayer = this.createLayer();
    }
    resize() {
        resizeCanvas(this.gl.canvas, this.sizeMultiplier);
        return this;
    }
    destroy() {
        this._defaultLayer.destroy();
        this._staticEffect.destroy();
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
    createEffect(id) {
        return new Effect(this._renderQuad, this.createShade(id && id + '_effectShade').update(defaultShaders.basicEffect), id);
    }
    createLayer(id) {
        return new Layer(this, id);
    }
    draw(opts) {
        this._defaultLayer.update(Object.assign(Object.assign({}, opts), { directRender: true }));
        this.compose(this._defaultLayer);
        this._defaultLayer.clear();
        return this;
    }
    compose(...layers) {
        for (const layer of layers) {
            renderLayer(this.gl, layer);
        }
        return this;
    }
    show(layer, idx) {
        return this.draw({
            effects: this._staticEffect,
            uniforms: { source: layer.image(idx) },
        });
    }
}
function render(gl, shade, form, uniforms, sources) {
    gl.useProgram(shade._program);
    shadeForm(shade, form);
    if (Array.isArray(uniforms)) {
        for (const uniform of uniforms) {
            shadeUniforms(shade, uniform, sources);
        }
    }
    else if (uniforms) {
        shadeUniforms(shade, uniforms, sources);
    }
    if (form._elements && form._elements.glType != null) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, form._elements.buffer);
        gl.drawElements(form._drawType, form._itemCount, form._elements.glType, 0);
    }
    else {
        gl.drawArrays(form._drawType, 0, form._itemCount);
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
const uniformsArray = [];
function prepareTargetBuffer(gl, target) {
    if (target) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.antialias ? target.antiAliasFrameBuffer : target.frameBuffer);
        gl.viewport(0, 0, target.width, target.height);
    }
    else {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
}
function antialiasTargetBuffer(gl, target) {
    if (target && target.antialias) {
        const gl2 = gl;
        // "blit" the cube into the color buffer, which adds antialiasing
        gl.bindFramebuffer(gl2.READ_FRAMEBUFFER, target.antiAliasFrameBuffer);
        gl.bindFramebuffer(gl2.DRAW_FRAMEBUFFER, target.frameBuffer);
        gl2.clearBufferfv(gl2.COLOR, 0, [1.0, 1.0, 1.0, 1.0]);
        gl2.blitFramebuffer(0, 0, target.width, target.height, 0, 0, target.width, target.height, gl.COLOR_BUFFER_BIT, gl.LINEAR);
    }
}
function renderSketches(gl, sketches, uniforms, source) {
    for (const sketch of sketches) {
        if (sketch._drawSettings) {
            applyDrawSettings(gl, sketch._drawSettings);
        }
        if (Array.isArray(sketch._uniforms) && sketch._uniforms.length) {
            for (const uniform of sketch._uniforms) {
                uniformsArray.length = 0;
                uniforms && uniformsArray.push(uniforms);
                uniformsArray.push(uniform);
                render(gl, sketch.shade, sketch.form, uniformsArray, source);
            }
        }
        else {
            uniformsArray.length = 0;
            uniforms && uniformsArray.push(uniforms);
            sketch._uniforms && uniformsArray.push(sketch._uniforms);
            render(gl, sketch.shade, sketch.form, uniformsArray, source);
        }
        if (sketch._drawSettings) {
            revertDrawSettings(gl, sketch._drawSettings);
        }
    }
}
function renderLayer(gl, layer) {
    let remainingPasses = layer._passCount;
    if (layer.sketches.length) {
        const target = remainingPasses > 0 ? layer._targets[0] : undefined;
        const sources = layer._textures.length
            ? layer._textures
            : layer._targets[1] && layer._targets[1].textures;
        prepareTargetBuffer(gl, target);
        if (layer._data.drawSettings) {
            applyDrawSettings(gl, layer._data.drawSettings);
        }
        renderSketches(gl, layer.sketches, layer._uniforms, sources);
        antialiasTargetBuffer(gl, target);
        layer._swapTargets();
        remainingPasses--;
    }
    if (layer.effects.length) {
        for (let j = 0; j < layer.effects.length; j++) {
            const effect = layer.effects[j];
            if (effect._uniforms.length) {
                for (let i = 0; i < effect._uniforms.length; i++) {
                    const target = remainingPasses > 0 ? layer._targets[0] : undefined;
                    const sources = i + j === 0 && layer._textures.length && !layer.sketches.length
                        ? layer._textures
                        : layer._targets[1] && layer._targets[1].textures;
                    prepareTargetBuffer(gl, target);
                    if (layer._data.drawSettings) {
                        applyDrawSettings(gl, layer._data.drawSettings);
                    }
                    if (effect._drawSettings) {
                        applyDrawSettings(gl, effect._drawSettings);
                    }
                    uniformsArray.length = 0;
                    layer._uniforms && uniformsArray.push(layer._uniforms);
                    uniformsArray.push(effect._uniforms[i]);
                    render(gl, effect.shade, effect.form, uniformsArray, sources);
                    antialiasTargetBuffer(gl, target);
                    layer._swapTargets();
                    remainingPasses--;
                }
            }
            else {
                const target = remainingPasses > 0 ? layer._targets[0] : undefined;
                const sources = j === 0 && layer._textures.length && !layer.sketches.length
                    ? layer._textures
                    : layer._targets[1] && layer._targets[1].textures;
                prepareTargetBuffer(gl, target);
                if (layer._data.drawSettings) {
                    applyDrawSettings(gl, layer._data.drawSettings);
                }
                if (effect._drawSettings) {
                    applyDrawSettings(gl, effect._drawSettings);
                }
                uniformsArray.length = 0;
                layer._uniforms && uniformsArray.push(layer._uniforms);
                render(gl, effect.shade, effect.form, uniformsArray, sources);
                antialiasTargetBuffer(gl, target);
                layer._swapTargets();
                remainingPasses--;
            }
            if (effect._drawSettings) {
                revertDrawSettings(gl, effect._drawSettings);
            }
        }
    }
    if (layer._data.drawSettings) {
        revertDrawSettings(gl, layer._data.drawSettings);
    }
}
//# sourceMappingURL=painter.js.map