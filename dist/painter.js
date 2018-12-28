import { defaultForms, defaultShaders, defaultTextureSettings, getDefaultLayerSettings, } from './asset-lib';
import { Form } from './form';
import { DrawingLayer, StaticLayer } from './layer';
import { applyDrawSettings, destroyRenderTarget, revertDrawSettings, updateRenderTarget, } from './render-utils';
import { Shade } from './shade';
import { Sketch } from './sketch';
import { resizeCanvas } from './utils/context';
export class Painter {
    constructor(gl) {
        this.gl = gl;
        this.targets = [
            { id: 'MainTarget_1' },
            { id: 'MainTarget_2' },
        ];
        this.resize({
            forceUpdateTargets: true,
            keepCurrentSize: !!(gl.canvas.width && gl.canvas.height),
        });
        this.renderQuad = this.createForm().update(defaultForms.renderQuad);
        this.result = this.createFlatSketch();
    }
    resize({ multiplier = 1, forceUpdateTargets = false, keepCurrentSize = false, } = {}) {
        const canvas = this.gl.canvas;
        const needUpdate = keepCurrentSize || resizeCanvas(canvas, multiplier);
        if (needUpdate || forceUpdateTargets) {
            this.targets.forEach(t => {
                if (t.width !== canvas.width || t.height !== canvas.height) {
                    t.width = canvas.width;
                    t.height = canvas.height;
                    t.textureConfig = {
                        count: 1,
                        type: this.gl.UNSIGNED_BYTE,
                    };
                    updateRenderTarget(this.gl, t, defaultTextureSettings);
                }
            });
        }
        return this;
    }
    destroy() {
        this.result.destroy();
        for (const target of this.targets) {
            destroyRenderTarget(this.gl, target);
        }
    }
    updateDrawSettings(drawSettings) {
        applyDrawSettings(this.gl, Object.assign({}, getDefaultLayerSettings(this.gl), drawSettings));
        return this;
    }
    createForm(id) {
        return new Form(this.gl, id);
    }
    createShade(id) {
        return new Shade(this.gl, id);
    }
    createSketch(id) {
        return new Sketch(id);
    }
    createFlatSketch(id) {
        const s = this.createSketch(id);
        return s.update({
            form: this.renderQuad,
            shade: this.createShade(s.id + '_defaultShade').update(defaultShaders.basicEffect),
        });
    }
    createStaticLayer(id) {
        return new StaticLayer(this.gl, id);
    }
    createDrawingLayer(id) {
        return new DrawingLayer(this.gl, id);
    }
    createEffectLayer(id) {
        const l = this.createDrawingLayer(id);
        return l.update({
            sketches: [this.createFlatSketch(l.id + '_effectSketch')],
        });
    }
    draw(sketch, globalUniforms) {
        draw(this.gl, sketch, null, globalUniforms);
        return this;
    }
    compose(...layers) {
        composeLayers(this.gl, layers, this.targets, this.result);
        return this;
    }
}
Painter.debug = false;
function draw(gl, sketch, defaultTexture, globalUniforms) {
    const { shade, form, drawSettings, uniforms } = sketch;
    if (!(shade && form)) {
        throw Error('cannot draw, shader or geometry are not set');
    }
    gl.useProgram(shade.program);
    shadeForm(shade, form);
    if (globalUniforms) {
        shadeUniforms(shade, globalUniforms, defaultTexture);
    }
    if (drawSettings) {
        applyDrawSettings(gl, drawSettings);
    }
    if (Array.isArray(uniforms)) {
        for (const instanceUniforms of uniforms) {
            drawInstance(gl, sketch, defaultTexture, instanceUniforms);
        }
    }
    else {
        drawInstance(gl, sketch, defaultTexture, uniforms);
    }
    if (drawSettings) {
        revertDrawSettings(gl, drawSettings);
    }
}
function drawInstance(gl, sketch, defaultTexture, uniforms) {
    if (uniforms) {
        shadeUniforms(sketch.shade, uniforms, defaultTexture);
    }
    if (sketch.form.elements && sketch.form.elements.glType != null) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sketch.form.elements.buffer);
        gl.drawElements(sketch.form.drawType, sketch.form.itemCount, sketch.form.elements.glType, 0);
    }
    else {
        gl.drawArrays(sketch.form.drawType, 0, sketch.form.itemCount);
    }
}
function shadeForm(shade, form) {
    for (const name in form.attribs) {
        const setter = shade.attributeSetters[name];
        if (setter) {
            setter.setter(form.attribs[name]);
        }
    }
}
function shadeUniforms(shade, uniforms, defaultTexture) {
    for (const name in uniforms) {
        const setter = shade.uniformSetters[name];
        if (setter) {
            let value = uniforms[name];
            if (typeof value === 'function') {
                value = value();
            }
            if (value === null || typeof value === 'string') {
                setter.setter(defaultTexture);
            }
            else {
                setter.setter(value);
            }
        }
    }
}
function renderLayer(gl, layer, targets, uniforms, resultSketch, directRender) {
    const source = targets[0];
    const target = targets[1];
    if (directRender) {
        if (process.env.NODE_ENV !== 'production' && Painter.debug) {
            console.log(`PAINTER: Rendering directly to viewport`);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
    else if (layer.targets) {
        const i = layer.targets.length - 1;
        if (process.env.NODE_ENV !== 'production' && Painter.debug) {
            console.log(`PAINTER: Rendering to layer target ${layer.targets[i].id}`);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, layer.targets[i].frameBuffer);
        gl.viewport(0, 0, layer.targets[i].width, layer.targets[i].height);
    }
    else {
        if (process.env.NODE_ENV !== 'production' && Painter.debug) {
            console.log(`PAINTER: Rendering to target ${target.id}`);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.frameBuffer);
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
    if (layer.data.drawSettings) {
        applyDrawSettings(gl, layer.data.drawSettings);
    }
    if (layer.sketches) {
        for (const sketch of layer.sketches) {
            draw(gl, sketch, (layer.looping && layer.texture()) || source.textures[0], uniforms);
        }
    }
    else {
        // Display static texture
        draw(gl, resultSketch, null, { source: layer.texture() });
    }
    if (process.env.NODE_ENV !== 'production' && Painter.debug) {
        console.log(`PAINTER: Render success!`);
    }
    if (layer.data.drawSettings) {
        revertDrawSettings(gl, layer.data.drawSettings);
    }
    if (!directRender) {
        if (!layer.targets) {
            targets[0] = target;
            targets[1] = source;
        }
        else if (layer.targets.length === 2) {
            const tmp = layer.targets[0];
            layer.targets[0] = layer.targets[1];
            layer.targets[1] = tmp;
            layer.looping = true;
        }
    }
}
function composeLayers(gl, layers, targets, result) {
    const last = layers.length - 1;
    for (let i = 0; i < layers.length; i++) {
        const layer = layers[i];
        if (process.env.NODE_ENV !== 'production' && Painter.debug) {
            console.log(`PAINTER: Rendering layer ${layer.id}`);
        }
        if (Array.isArray(layer.uniforms)) {
            const newLast = last + layer.uniforms.length - 1;
            layer.looping = false;
            for (let j = 0; j < layer.uniforms.length; j++) {
                if (process.env.NODE_ENV !== 'production' && Painter.debug) {
                    console.log(`PAINTER: Layer pass ${j + 1}`);
                }
                const directRender = i + j === newLast;
                renderLayer(gl, layer, targets, layer.uniforms[j], result, directRender);
            }
        }
        else {
            const directRender = i === last;
            renderLayer(gl, layer, targets, layer.uniforms, result, directRender);
        }
    }
}
//# sourceMappingURL=painter.js.map