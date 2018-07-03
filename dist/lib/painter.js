var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { updateRenderTarget, applyDrawSettings, revertDrawSettings, destroyRenderTarget } from './render-utils';
import { resizeCanvas } from './utils/context';
import { defaultForms, defaultShaders, defaultTextureSettings, getDefaultLayerSettings } from './asset-lib';
import { Form } from './form';
import { Shade } from './shade';
import { Sketch } from './sketch';
import { StaticLayer, DrawingLayer } from './layer';
var Painter = /** @class */ (function () {
    function Painter(gl) {
        this.gl = gl;
        this.targets = [
            {},
            {}
        ];
        this.resize(1, true);
        this.renderQuad = this.createForm().update(defaultForms.renderQuad);
        this.result = this.createFlatSketch();
    }
    Painter.prototype.resize = function (multiplier, forceUpdateTargets) {
        var _this = this;
        if (multiplier === void 0) { multiplier = 1; }
        if (forceUpdateTargets === void 0) { forceUpdateTargets = false; }
        var canvas = this.gl.canvas;
        var needUpdate = resizeCanvas(canvas, multiplier);
        if (needUpdate || forceUpdateTargets) {
            this.targets.forEach(function (t) {
                t.width = canvas.width;
                t.height = canvas.height;
                t.textureConfig = {
                    count: 1,
                    type: _this.gl.UNSIGNED_BYTE
                };
                updateRenderTarget(_this.gl, t, defaultTextureSettings);
            });
        }
        return this;
    };
    Painter.prototype.destroy = function () {
        this.result.destroy();
        for (var _i = 0, _a = this.targets; _i < _a.length; _i++) {
            var target = _a[_i];
            destroyRenderTarget(this.gl, target);
        }
    };
    Painter.prototype.updateDrawSettings = function (drawSettings) {
        applyDrawSettings(this.gl, __assign({}, getDefaultLayerSettings(this.gl), drawSettings));
        return this;
    };
    Painter.prototype.createForm = function () { return new Form(this.gl); };
    Painter.prototype.createShade = function () { return new Shade(this.gl); };
    Painter.prototype.createSketch = function () { return new Sketch(); };
    Painter.prototype.createFlatSketch = function () {
        return this.createSketch().update({
            form: this.renderQuad,
            shade: this.createShade().update(defaultShaders.basicEffect)
        });
    };
    Painter.prototype.createStaticLayer = function () { return new StaticLayer(this.gl); };
    Painter.prototype.createDrawingLayer = function () { return new DrawingLayer(this.gl); };
    Painter.prototype.createEffectLayer = function () {
        return this.createDrawingLayer().update({
            sketches: [this.createFlatSketch()]
        });
    };
    Painter.prototype.draw = function (sketch, globalUniforms) {
        if (typeof globalUniforms === 'function') {
            globalUniforms = globalUniforms();
        }
        draw(this.gl, sketch, null, globalUniforms);
        return this;
    };
    Painter.prototype.compose = function () {
        var layers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            layers[_i] = arguments[_i];
        }
        composeLayers(this.gl, layers, this.targets, this.result);
        return this;
    };
    return Painter;
}());
export { Painter };
function draw(gl, sketch, defaultTexture, globalUniforms) {
    var shade = sketch.shade, form = sketch.form, drawSettings = sketch.drawSettings;
    var uniforms = sketch.uniforms;
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
    if (typeof uniforms === 'function') {
        uniforms = uniforms();
    }
    if (Array.isArray(uniforms)) {
        for (var _i = 0, uniforms_1 = uniforms; _i < uniforms_1.length; _i++) {
            var instanceUniforms = uniforms_1[_i];
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
    for (var name_1 in form.attribs) {
        var setter = shade.attributeSetters[name_1];
        if (setter) {
            setter.setter(form.attribs[name_1]);
        }
    }
}
function shadeUniforms(shade, uniforms, defaultTexture) {
    for (var name_2 in uniforms) {
        var setter = shade.uniformSetters[name_2];
        if (setter) {
            var value = uniforms[name_2];
            if (value === null || typeof value === 'string') {
                setter.setter(defaultTexture);
            }
            else {
                setter.setter(value);
            }
        }
    }
}
function composeLayers(gl, layers, targets, result) {
    var last = layers.length - 1;
    var _loop_1 = function (i) {
        var layer = layers[i];
        var render = function (uniforms, directRender) {
            var source = targets[0];
            var target = targets[1];
            var renderToStack = !directRender && layer.target == null;
            if (directRender) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            }
            else if (layer.target) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, layer.target.frameBuffer);
                gl.viewport(0, 0, layer.target.width, layer.target.height);
            }
            else {
                gl.bindFramebuffer(gl.FRAMEBUFFER, target.frameBuffer);
                gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            }
            if (layer.data.drawSettings) {
                applyDrawSettings(gl, layer.data.drawSettings);
            }
            if (layer.sketches) {
                for (var _i = 0, _a = layer.sketches; _i < _a.length; _i++) {
                    var sketch = _a[_i];
                    draw(gl, sketch, source.textures[0], uniforms);
                }
            }
            else {
                // Display static texture
                draw(gl, result, null, { source: layer.texture() });
            }
            if (layer.data.drawSettings) {
                revertDrawSettings(gl, layer.data.drawSettings);
            }
            if (renderToStack) {
                targets[0] = target;
                targets[1] = source;
            }
        };
        var uniforms = layer.uniforms;
        if (typeof uniforms === 'function') {
            uniforms = uniforms();
        }
        if (Array.isArray(uniforms)) {
            var newLast = last + uniforms.length - 1;
            for (var j = 0; j < uniforms.length; j++) {
                var directRender = i + j === newLast;
                render(uniforms[j], directRender);
            }
        }
        else {
            var directRender = i === last;
            render(uniforms, directRender);
        }
    };
    for (var i = 0; i < layers.length; i++) {
        _loop_1(i);
    }
}
//# sourceMappingURL=painter.js.map