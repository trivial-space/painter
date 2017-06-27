var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as form from './form';
import * as shade from './shade';
import * as sketch from './sketch';
import * as layer from './layer';
import { updateRenderTarget, applyDrawSettings, revertDrawSettings, destroyRenderTarget } from './render-utils';
import { resizeCanvas } from './utils/context';
import { defaultForms, defaultShaders, defaultTextureSettings, getDefaultLayerSettings } from './asset-lib';
export function create(gl) {
    var targets = [
        {},
        {}
    ];
    var defaultSettings = getDefaultLayerSettings(gl);
    var renderQuad = form.create(gl).update(defaultForms.renderQuad);
    var createFlatSketch = function () { return sketch.create().update({
        form: renderQuad,
        shade: shade.create(gl).update(defaultShaders.basicEffect)
    }); };
    var result = createFlatSketch();
    var resize = function (multiplier, forceUpdateTargets) {
        if (multiplier === void 0) { multiplier = 1; }
        if (forceUpdateTargets === void 0) { forceUpdateTargets = false; }
        var canvas = gl.canvas;
        var needUpdate = resizeCanvas(canvas, multiplier);
        if (needUpdate || forceUpdateTargets) {
            targets.forEach(function (t) {
                t.width = canvas.width;
                t.height = canvas.height;
                t.textureConfig = {
                    count: 1,
                    type: gl.UNSIGNED_BYTE
                };
                updateRenderTarget(gl, t, defaultTextureSettings);
            });
        }
        return painter;
    };
    resize(1, true);
    var destroy = function () {
        result.destroy();
        for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
            var target = targets_1[_i];
            destroyRenderTarget(gl, target);
        }
    };
    var painter = {
        gl: gl,
        updateDrawSettings: function (drawSettings) {
            applyDrawSettings(gl, __assign({}, defaultSettings, drawSettings));
            return painter;
        },
        createForm: function () { return form.create(gl); },
        createShade: function () { return shade.create(gl); },
        createSketch: function () { return sketch.create(); },
        createFlatSketch: createFlatSketch,
        createStaticLayer: function () { return layer.createStatic(gl); },
        createDrawingLayer: function () { return layer.createDrawing(gl); },
        createEffectLayer: function () { return layer.createDrawing(gl).update({
            sketches: [createFlatSketch()]
        }); },
        draw: function (sketch, globalUniforms) {
            draw(gl, sketch, null, globalUniforms);
            return painter;
        },
        compose: function () {
            var layers = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                layers[_i] = arguments[_i];
            }
            composeLayers(gl, layers, targets, result);
            return painter;
        },
        resize: resize, destroy: destroy
    };
    return painter;
}
function draw(gl, sketch, defaultTexture, globalUniforms) {
    var shade = sketch.shade, uniforms = sketch.uniforms, form = sketch.form, drawSettings = sketch.drawSettings;
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
        var layer_1 = layers[i];
        var render = function (uniforms, directRender) {
            var source = targets[0];
            var target = targets[1];
            var renderToStack = !directRender && layer_1.target == null;
            if (directRender) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            }
            else if (layer_1.target) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, layer_1.target.frameBuffer);
                gl.viewport(0, 0, layer_1.target.width, layer_1.target.height);
            }
            else {
                gl.bindFramebuffer(gl.FRAMEBUFFER, target.frameBuffer);
                gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            }
            if (layer_1.data.drawSettings) {
                applyDrawSettings(gl, layer_1.data.drawSettings);
            }
            if (layer_1.sketches) {
                for (var _i = 0, _a = layer_1.sketches; _i < _a.length; _i++) {
                    var sketch_1 = _a[_i];
                    draw(gl, sketch_1, source.textures[0], uniforms);
                }
            }
            else {
                // Display static texture
                draw(gl, result, null, { source: layer_1.texture() });
            }
            if (layer_1.data.drawSettings) {
                revertDrawSettings(gl, layer_1.data.drawSettings);
            }
            if (renderToStack) {
                targets[0] = target;
                targets[1] = source;
            }
        };
        if (Array.isArray(layer_1.uniforms)) {
            var newLast = last + layer_1.uniforms.length - 1;
            for (var j = 0; j < layer_1.uniforms.length; j++) {
                var directRender = i + j === newLast;
                render(layer_1.uniforms[j], directRender);
            }
        }
        else {
            var directRender = i === last;
            render(layer_1.uniforms, directRender);
        }
    };
    for (var i = 0; i < layers.length; i++) {
        _loop_1(i);
    }
}
//# sourceMappingURL=painter.js.map