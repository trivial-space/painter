import * as form from './form';
import * as shade from './shade';
import * as sketch from './sketch';
import * as layer from './layer';
import { updateRenderTarget } from './render-utils';
import { resizeCanvas } from './utils/context';
import { defaultForms, defaultShaders, defaultTextureSettings } from './asset-lib';
export function create(gl) {
    var targets = [
        {},
        {}
    ];
    var renderQuad = form.create(gl).update(defaultForms.renderQuad);
    var createFlatSketch = function () { return sketch.create(gl).update({
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
                updateRenderTarget(gl, t, defaultTextureSettings);
            });
        }
        return needUpdate;
    };
    resize(1, true);
    return {
        gl: gl,
        createForm: function () { return form.create(gl); },
        createShade: function () { return shade.create(gl); },
        createSketch: function () { return sketch.create(gl); },
        createFlatSketch: createFlatSketch,
        createStaticLayer: function () { return layer.createStatic(gl); },
        createDrawingLayer: function () { return layer.createDrawing(gl); },
        createEffectLayer: function () { return layer.createDrawing(gl).update({
            sketches: [createFlatSketch()]
        }); },
        draw: function (sketch, globalUniforms, globalSettings) {
            return draw(gl, sketch, null, globalUniforms, globalSettings);
        },
        compose: function () {
            var layers = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                layers[_i] = arguments[_i];
            }
            return composeLayers(gl, layers, targets, result);
        },
        resize: resize
    };
}
function draw(gl, sketch, defaultTexture, globalUniforms, globalSettings) {
    var shade = sketch.shade, uniforms = sketch.uniforms, form = sketch.form;
    var blending = sketch.drawSettings.blending || (globalSettings && globalSettings.blending);
    if (!(shade && form)) {
        throw Error('cannot draw, shader or geometry are not set');
    }
    gl.useProgram(shade.program);
    shadeForm(shade, form);
    if (globalUniforms) {
        shadeUniforms(shade, globalUniforms, defaultTexture);
    }
    if (blending) {
        gl.enable(gl.BLEND);
        gl.blendFunc.apply(gl, sketch.drawSettings.blendFns);
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
    if (blending) {
        gl.disable(gl.BLEND);
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
function shadeUniforms(shade, values, defaultTexture) {
    for (var name_2 in values) {
        var setter = shade.uniformSetters[name_2];
        if (setter) {
            var value = values[name_2];
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
    for (var i = 0; i < layers.length; i++) {
        var layer_1 = layers[i];
        var directRender = i === last;
        var renderToStack = !directRender && layer_1.target == null;
        var source = targets[0];
        var target = targets[1];
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
        if (layer_1.data.clearColor) {
            gl.clearColor.apply(gl, layer_1.data.clearColor);
        }
        if (layer_1.data.clearBits) {
            gl.clear(layer_1.data.clearBits);
        }
        if (layer_1.sketches) {
            for (var _i = 0, _a = layer_1.sketches; _i < _a.length; _i++) {
                var sketch_1 = _a[_i];
                draw(gl, sketch_1, source.textures[0], layer_1.uniforms, layer_1.data);
            }
        }
        else if (directRender) {
            // Display static texture
            draw(gl, result, null, { source: layer_1.texture() });
        }
        if (renderToStack) {
            targets[0] = target;
            targets[1] = source;
        }
    }
}
//# sourceMappingURL=painter.js.map