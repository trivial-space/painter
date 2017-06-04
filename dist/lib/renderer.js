import lib from './asset-lib';
export function create(canvas) {
    if (canvas == null) {
        canvas = document.createElement('canvas');
    }
    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
        throw Error('WebGL-Context could not be initialized!');
    }
    var ctx = {
        settings: Object.assign({}, lib.defaultSettings),
        shaders: {},
        geometries: {},
        layers: {},
        objects: {},
        source: {},
        target: {},
        gl: gl
    };
    updateSettings(ctx, ctx.settings);
    return updateSize(ctx);
}
export function init(ctx, data) {
    updateSettings(ctx, data.settings);
    return updateSize(ctx);
}
export function updateSettings(ctx, data) {
    if (data === void 0) { data = {}; }
    var gl = ctx.gl;
    if (data.clearColor != null) {
        ctx.settings.clearColor = data.clearColor;
    }
    if (data.minFilter != null) {
        ctx.settings.minFilter = data.minFilter;
    }
    if (data.magFilter != null) {
        ctx.settings.magFilter = data.magFilter;
    }
    if (data.wrap != null) {
        ctx.settings.wrap = data.wrap;
    }
    if (data.clearBuffers != null) {
        ctx.settings.clearBuffers = data.clearBuffers;
        ctx.settings.clearBits = makeClear(gl, data.clearBuffers);
    }
    if (data.enable != null) {
        for (var _i = 0, _a = ctx.settings.enable; _i < _a.length; _i++) {
            var param = _a[_i];
            gl.disable(gl[param]);
        }
        ctx.settings.enable = data.enable;
        for (var _b = 0, _c = ctx.settings.enable; _b < _c.length; _b++) {
            var param = _c[_b];
            gl.enable(gl[param]);
        }
    }
    if (data.blend !== undefined) {
        ctx.settings.blend = data.blend;
    }
    if (ctx.settings.blend) {
        setBlendFunc(gl, ctx.settings.blend);
    }
    return ctx;
}
export function updateLayer(ctx, layerId, data) {
    var layer = ctx.layers[layerId] || {};
    layer.noClear = !!data.noClear;
    layer.clearColor = data.clearColor;
    if (data.buffered) {
        layer.renderTarget = {
            width: data.width || ctx.settings.width,
            height: data.height || ctx.settings.height,
            frameBuffer: null, texture: null, depthBuffer: null
        };
        updateRenderTarget(ctx.gl, layer.renderTarget, data);
    }
    else {
        delete layer.renderTarget;
    }
    if (data.asset) {
        layer.type = 'static';
        updateStaticLayer(ctx.gl, layer, data);
    }
    else if (data.objects) {
        var l = layer;
        l.type = 'objects';
        l.transparents = [];
        l.opaques = [];
        l.uniforms = data.uniforms || {};
        for (var _i = 0, _a = data.objects; _i < _a.length; _i++) {
            var id = _a[_i];
            var o = ctx.objects[id];
            if (o) {
                if (o.type === 'initialized') {
                    if (o.blend) {
                        l.transparents.push(id);
                    }
                    else {
                        l.opaques.push(id);
                    }
                }
                else {
                    o.updateLayers[layerId] = data;
                }
            }
            else {
                ctx.objects[id] = {
                    type: 'missing',
                    updateLayers: (_b = {},
                        _b[layerId] = data,
                        _b)
                };
            }
        }
    }
    else if (data.shader) {
        var l = layer;
        l.type = 'shader';
        l.object = {
            type: 'initialized',
            shader: data.shader,
            geometry: '_renderQuad',
            uniforms: data.uniforms || {},
        };
    }
    ctx.layers[layerId] = layer;
    return ctx;
    var _b;
}
function updateStaticLayer(gl, layer, data) {
    var texture = layer.texture || gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    setTextureParams(gl, data);
    if (data.asset) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data.asset);
    }
    if (data.minFilter && data.minFilter.indexOf('MIPMAP') > 0) {
        gl.generateMipmap(gl.TEXTURE_2D);
    }
    gl.bindTexture(gl.TEXTURE_2D, null);
    layer.texture = texture;
}
export function updateSize(ctx) {
    var gl = ctx.gl;
    var width = gl.canvas.clientWidth || gl.canvas.width;
    var height = gl.canvas.clientHeight || gl.canvas.height;
    if (width !== ctx.settings.width || height !== ctx.settings.height) {
        gl.canvas.height = ctx.settings.height = height;
        gl.canvas.width = ctx.settings.width = width;
        updateRenderTarget(ctx.gl, ctx.source, ctx.settings);
        updateRenderTarget(ctx.gl, ctx.target, ctx.settings);
    }
    return ctx;
}
export function renderLayers(ctx, layerIds) {
    var gl = ctx.gl;
    var last = layerIds.length - 1;
    for (var i = 0; i < layerIds.length; i++) {
        var layerId = layerIds[i];
        var layer = ctx.layers[layerId];
        var directRender = i === last;
        var renderToStack = !directRender && layer.renderTarget == null;
        if (directRender) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        }
        else if (renderToStack) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, ctx.target.frameBuffer);
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        }
        else if (layer.renderTarget) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, layer.renderTarget.frameBuffer);
            gl.viewport(0, 0, layer.renderTarget.width, layer.renderTarget.height);
        }
        if (!layer.noClear) {
            gl.clearColor.apply(gl, layer.clearColor || ctx.settings.clearColor);
            gl.clear(ctx.settings.clearBits);
        }
        switch (layer.type) {
            case 'shader':
                renderObject(ctx, layer.object);
                break;
            case 'objects':
                for (var _i = 0, _a = layer.opaques; _i < _a.length; _i++) {
                    var id = _a[_i];
                    renderObject(ctx, ctx.objects[id], layer.uniforms);
                }
                if (layer.transparents.length) {
                    gl.enable(gl.BLEND);
                    for (var _b = 0, _c = layer.transparents; _b < _c.length; _b++) {
                        var id = _c[_b];
                        renderObject(ctx, ctx.objects[id], layer.uniforms);
                    }
                    gl.disable(gl.BLEND);
                }
                break;
            case 'static':
                if (directRender) {
                    var object = ctx.objects['_result'];
                    renderObject(ctx, object, { source: layerId });
                }
                break;
        }
        if (renderToStack) {
            var tmp = ctx.source;
            ctx.source = ctx.target;
            ctx.target = tmp;
        }
    }
}
function renderObject(ctx, object, globalUniforms) {
}
function makeClear(gl, clearArray) {
    return clearArray.reduce(function (res, item) { return res | gl[item + '_BUFFER_BIT']; }, 0);
}
function setBlendFunc(gl, blendOpts) {
    gl.blendFunc.apply(gl, blendOpts.map(function (opt) { return gl[opt]; }));
}
function setTextureParams(gl, data) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, data.flipY);
    var wrapS, wrapT;
    if (data.wrap) {
        wrapS = wrapT = data.wrap;
    }
    else {
        wrapT = data.wrapT;
        wrapS = data.wrapS;
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl[wrapS || 'CLAMP_TO_EDGE']);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl[wrapT || 'CLAMP_TO_EDGE']);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl[data.magFilter || 'LINEAR']);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl[data.minFilter || 'LINEAR']);
}
function updateRenderTarget(gl, target, data) {
    if (data.width == null || data.height == null) {
        return;
    }
    if (target.frameBuffer == null) {
        target.frameBuffer = gl.createFramebuffer();
    }
    if (target.texture == null) {
        target.texture = gl.createTexture();
    }
    if (target.depthBuffer == null) {
        target.depthBuffer = gl.createRenderbuffer();
    }
    gl.bindTexture(gl.TEXTURE_2D, target.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, data.width, data.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    setTextureParams(gl, data);
    gl.bindRenderbuffer(gl.RENDERBUFFER, target.depthBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, data.width, data.height);
    gl.bindFramebuffer(gl.FRAMEBUFFER, target.frameBuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, target.texture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, target.depthBuffer);
    var err = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (err !== gl.FRAMEBUFFER_COMPLETE) {
        console.error('framebuffer error', err, data);
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
}
export default {
    create: create,
    init: init,
    updateSettings: updateSettings,
    updateObject: updateObject,
    updateLayer: updateLayer,
    updateSize: updateSize,
    renderLayers: renderLayers,
    lib: lib
};
//# sourceMappingURL=renderer.js.map