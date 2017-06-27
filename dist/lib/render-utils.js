import { GL_TYPE } from './contants';
// Attrib and Uniform Setters
function getBindPointForSamplerType(type) {
    return typeMap[type].bindPoint;
}
function floatSetter(gl, location) {
    return function (v) {
        gl.uniform1f(location, v);
    };
}
function floatArraySetter(gl, location) {
    return function (v) {
        gl.uniform1fv(location, v);
    };
}
function floatVec2Setter(gl, location) {
    return function (v) {
        gl.uniform2fv(location, v);
    };
}
function floatVec3Setter(gl, location) {
    return function (v) {
        gl.uniform3fv(location, v);
    };
}
function floatVec4Setter(gl, location) {
    return function (v) {
        gl.uniform4fv(location, v);
    };
}
function intSetter(gl, location) {
    return function (v) {
        gl.uniform1i(location, v);
    };
}
function intArraySetter(gl, location) {
    return function (v) {
        gl.uniform1iv(location, v);
    };
}
function intVec2Setter(gl, location) {
    return function (v) {
        gl.uniform2iv(location, v);
    };
}
function intVec3Setter(gl, location) {
    return function (v) {
        gl.uniform3iv(location, v);
    };
}
function intVec4Setter(gl, location) {
    return function (v) {
        gl.uniform4iv(location, v);
    };
}
function uintSetter(gl, location) {
    return function (v) {
        gl.uniform1ui(location, v);
    };
}
function uintArraySetter(gl, location) {
    return function (v) {
        gl.uniform1uiv(location, v);
    };
}
function uintVec2Setter(gl, location) {
    return function (v) {
        gl.uniform2uiv(location, v);
    };
}
function uintVec3Setter(gl, location) {
    return function (v) {
        gl.uniform3uiv(location, v);
    };
}
function uintVec4Setter(gl, location) {
    return function (v) {
        gl.uniform4uiv(location, v);
    };
}
function floatMat2Setter(gl, location) {
    return function (v) {
        gl.uniformMatrix2fv(location, false, v);
    };
}
function floatMat3Setter(gl, location) {
    return function (v) {
        gl.uniformMatrix3fv(location, false, v);
    };
}
function floatMat4Setter(gl, location) {
    return function (v) {
        gl.uniformMatrix4fv(location, false, v);
    };
}
function floatMat23Setter(gl, location) {
    return function (v) {
        gl.uniformMatrix2x3fv(location, false, v);
    };
}
function floatMat32Setter(gl, location) {
    return function (v) {
        gl.uniformMatrix3x2fv(location, false, v);
    };
}
function floatMat24Setter(gl, location) {
    return function (v) {
        gl.uniformMatrix2x4fv(location, false, v);
    };
}
function floatMat42Setter(gl, location) {
    return function (v) {
        gl.uniformMatrix4x2fv(location, false, v);
    };
}
function floatMat34Setter(gl, location) {
    return function (v) {
        gl.uniformMatrix3x4fv(location, false, v);
    };
}
function floatMat43Setter(gl, location) {
    return function (v) {
        gl.uniformMatrix4x3fv(location, false, v);
    };
}
function samplerSetter(gl, type, unit, location) {
    var bindPoint = getBindPointForSamplerType(type);
    return function (texture) {
        gl.uniform1i(location, unit);
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(bindPoint, texture);
    };
}
function samplerArraySetter(gl, type, unit, location, size) {
    var bindPoint = getBindPointForSamplerType(type);
    var units = new Int32Array(size);
    for (var i = 0; i < size; ++i) {
        units[i] = unit + i;
    }
    return function (textures) {
        gl.uniform1iv(location, units);
        for (var index in textures) {
            gl.activeTexture(gl.TEXTURE0 + units[index]);
            gl.bindTexture(bindPoint, textures[index]);
        }
    };
}
function isSamplerInfo(info) {
    return info.Type === null;
}
var typeMap = (_a = {},
    _a[GL_TYPE.FLOAT] = { Type: Float32Array, size: 4, setter: floatSetter, arraySetter: floatArraySetter },
    _a[GL_TYPE.FLOAT_VEC2] = { Type: Float32Array, size: 8, setter: floatVec2Setter },
    _a[GL_TYPE.FLOAT_VEC3] = { Type: Float32Array, size: 12, setter: floatVec3Setter },
    _a[GL_TYPE.FLOAT_VEC4] = { Type: Float32Array, size: 16, setter: floatVec4Setter },
    _a[GL_TYPE.INT] = { Type: Int32Array, size: 4, setter: intSetter, arraySetter: intArraySetter },
    _a[GL_TYPE.INT_VEC2] = { Type: Int32Array, size: 8, setter: intVec2Setter },
    _a[GL_TYPE.INT_VEC3] = { Type: Int32Array, size: 12, setter: intVec3Setter },
    _a[GL_TYPE.INT_VEC4] = { Type: Int32Array, size: 16, setter: intVec4Setter },
    _a[GL_TYPE.UNSIGNED_INT] = { Type: Uint32Array, size: 4, setter: uintSetter, arraySetter: uintArraySetter },
    _a[GL_TYPE.UNSIGNED_INT_VEC2] = { Type: Uint32Array, size: 8, setter: uintVec2Setter },
    _a[GL_TYPE.UNSIGNED_INT_VEC3] = { Type: Uint32Array, size: 12, setter: uintVec3Setter },
    _a[GL_TYPE.UNSIGNED_INT_VEC4] = { Type: Uint32Array, size: 16, setter: uintVec4Setter },
    _a[GL_TYPE.BOOL] = { Type: Uint32Array, size: 4, setter: intSetter, arraySetter: intArraySetter },
    _a[GL_TYPE.BOOL_VEC2] = { Type: Uint32Array, size: 8, setter: intVec2Setter },
    _a[GL_TYPE.BOOL_VEC3] = { Type: Uint32Array, size: 12, setter: intVec3Setter },
    _a[GL_TYPE.BOOL_VEC4] = { Type: Uint32Array, size: 16, setter: intVec4Setter },
    _a[GL_TYPE.FLOAT_MAT2] = { Type: Float32Array, size: 16, setter: floatMat2Setter },
    _a[GL_TYPE.FLOAT_MAT3] = { Type: Float32Array, size: 36, setter: floatMat3Setter },
    _a[GL_TYPE.FLOAT_MAT4] = { Type: Float32Array, size: 64, setter: floatMat4Setter },
    _a[GL_TYPE.FLOAT_MAT2X3] = { Type: Float32Array, size: 24, setter: floatMat23Setter },
    _a[GL_TYPE.FLOAT_MAT2X4] = { Type: Float32Array, size: 32, setter: floatMat24Setter },
    _a[GL_TYPE.FLOAT_MAT3X2] = { Type: Float32Array, size: 24, setter: floatMat32Setter },
    _a[GL_TYPE.FLOAT_MAT3X4] = { Type: Float32Array, size: 48, setter: floatMat34Setter },
    _a[GL_TYPE.FLOAT_MAT4X2] = { Type: Float32Array, size: 32, setter: floatMat42Setter },
    _a[GL_TYPE.FLOAT_MAT4X3] = { Type: Float32Array, size: 48, setter: floatMat43Setter },
    _a[GL_TYPE.SAMPLER_2D] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: GL_TYPE.TEXTURE_2D },
    _a[GL_TYPE.SAMPLER_CUBE] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: GL_TYPE.TEXTURE_CUBE_MAP },
    _a[GL_TYPE.SAMPLER_3D] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: GL_TYPE.TEXTURE_3D },
    _a[GL_TYPE.SAMPLER_2D_SHADOW] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: GL_TYPE.TEXTURE_2D },
    _a[GL_TYPE.SAMPLER_2D_ARRAY] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: GL_TYPE.TEXTURE_2D_ARRAY },
    _a[GL_TYPE.SAMPLER_2D_ARRAY_SHADOW] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: GL_TYPE.TEXTURE_2D_ARRAY },
    _a[GL_TYPE.SAMPLER_CUBE_SHADOW] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: GL_TYPE.TEXTURE_CUBE_MAP },
    _a[GL_TYPE.INT_SAMPLER_2D] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: GL_TYPE.TEXTURE_2D },
    _a[GL_TYPE.INT_SAMPLER_3D] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: GL_TYPE.TEXTURE_3D },
    _a[GL_TYPE.INT_SAMPLER_CUBE] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: GL_TYPE.TEXTURE_CUBE_MAP },
    _a[GL_TYPE.INT_SAMPLER_2D_ARRAY] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: GL_TYPE.TEXTURE_2D_ARRAY },
    _a[GL_TYPE.UNSIGNED_INT_SAMPLER_2D] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: GL_TYPE.TEXTURE_2D },
    _a[GL_TYPE.UNSIGNED_INT_SAMPLER_3D] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: GL_TYPE.TEXTURE_3D },
    _a[GL_TYPE.UNSIGNED_INT_SAMPLER_CUBE] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: GL_TYPE.TEXTURE_CUBE_MAP },
    _a[GL_TYPE.UNSIGNED_INT_SAMPLER_2D_ARRAY] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: GL_TYPE.TEXTURE_2D_ARRAY },
    _a);
function floatAttribSetter(gl, location, typeInfo) {
    return function (b) {
        gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer);
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, typeInfo.itemSize, GL_TYPE.FLOAT, b.normalize || false, b.stride || 0, b.offset || 0);
    };
}
function intAttribSetter(gl, location, typeInfo) {
    return function (b) {
        gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer);
        gl.enableVertexAttribArray(location);
        gl.vertexAttribIPointer(location, typeInfo.itemSize, GL_TYPE.INT, b.stride || 0, b.offset || 0);
    };
}
function matAttribSetter(gl, location, typeInfo) {
    var defaultSize = typeInfo.size;
    var count = typeInfo.count;
    return function (b) {
        gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer);
        var numComponents = defaultSize;
        var size = numComponents / count;
        var typeInfo = typeMap[GL_TYPE.FLOAT];
        var stride = typeInfo.size * numComponents;
        var normalize = b.normalize || false;
        var offset = b.offset || 0;
        var rowOffset = stride / count;
        for (var i = 0; i < count; ++i) {
            gl.enableVertexAttribArray(location + i);
            gl.vertexAttribPointer(location + i, size, GL_TYPE.FLOAT, normalize, stride, offset + rowOffset * i);
        }
    };
}
var attrTypeMap = (_b = {},
    _b[GL_TYPE.FLOAT] = { size: 4, setter: floatAttribSetter, itemSize: 1 },
    _b[GL_TYPE.FLOAT_VEC2] = { size: 8, setter: floatAttribSetter, itemSize: 2 },
    _b[GL_TYPE.FLOAT_VEC3] = { size: 12, setter: floatAttribSetter, itemSize: 3 },
    _b[GL_TYPE.FLOAT_VEC4] = { size: 16, setter: floatAttribSetter, itemSize: 4 },
    _b[GL_TYPE.INT] = { size: 4, setter: intAttribSetter, itemSize: 1 },
    _b[GL_TYPE.INT_VEC2] = { size: 8, setter: intAttribSetter, itemSize: 2 },
    _b[GL_TYPE.INT_VEC3] = { size: 12, setter: intAttribSetter, itemSize: 3 },
    _b[GL_TYPE.INT_VEC4] = { size: 16, setter: intAttribSetter, itemSize: 4 },
    _b[GL_TYPE.UNSIGNED_INT] = { size: 4, setter: intAttribSetter, itemSize: 1 },
    _b[GL_TYPE.UNSIGNED_INT_VEC2] = { size: 8, setter: intAttribSetter, itemSize: 2 },
    _b[GL_TYPE.UNSIGNED_INT_VEC3] = { size: 12, setter: intAttribSetter, itemSize: 3 },
    _b[GL_TYPE.UNSIGNED_INT_VEC4] = { size: 16, setter: intAttribSetter, itemSize: 4 },
    _b[GL_TYPE.BOOL] = { size: 4, setter: intAttribSetter, itemSize: 1 },
    _b[GL_TYPE.BOOL_VEC2] = { size: 8, setter: intAttribSetter, itemSize: 2 },
    _b[GL_TYPE.BOOL_VEC3] = { size: 12, setter: intAttribSetter, itemSize: 3 },
    _b[GL_TYPE.BOOL_VEC4] = { size: 16, setter: intAttribSetter, itemSize: 4 },
    _b[GL_TYPE.FLOAT_MAT2] = { size: 4, setter: matAttribSetter, count: 2 },
    _b[GL_TYPE.FLOAT_MAT3] = { size: 9, setter: matAttribSetter, count: 3 },
    _b[GL_TYPE.FLOAT_MAT4] = { size: 16, setter: matAttribSetter, count: 4 },
    _b);
export function createUniformSetters(gl, program) {
    var textureUnit = 0;
    function createUniformSetter(program, uniformInfo) {
        var location = gl.getUniformLocation(program, uniformInfo.name);
        var isArray = (uniformInfo.size > 1 && uniformInfo.name.substr(-3) === '[0]');
        var type = uniformInfo.type;
        var typeInfo = typeMap[type];
        if (!typeInfo) {
            throw ('unknown type: 0x' + type.toString(16)); // we should never get here.
        }
        if (location == null) {
            return;
        }
        var setter;
        if (isSamplerInfo(typeInfo)) {
            // it's a sampler
            var unit = textureUnit;
            textureUnit += uniformInfo.size;
            if (isArray) {
                setter = typeInfo.arraySetter(gl, type, unit, location, uniformInfo.size);
            }
            else {
                setter = typeInfo.setter(gl, type, unit, location);
            }
        }
        else {
            if (typeInfo.arraySetter && isArray) {
                setter = typeInfo.arraySetter(gl, location);
            }
            else {
                setter = typeInfo.setter(gl, location);
            }
        }
        return { setter: setter, location: location };
    }
    var uniformSetters = {};
    var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (var i = 0; i < numUniforms; ++i) {
        var uniformInfo = gl.getActiveUniform(program, i);
        if (!uniformInfo) {
            break;
        }
        var name_1 = uniformInfo.name;
        // remove the array suffix.
        if (name_1.substr(-3) === '[0]') {
            name_1 = name_1.substr(0, name_1.length - 3);
        }
        if (program) {
            var setter = createUniformSetter(program, uniformInfo);
            if (setter) {
                uniformSetters[name_1] = setter;
            }
        }
    }
    return uniformSetters;
}
export function createAttributeSetters(gl, program) {
    var attribSetters = {};
    var numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (var i = 0; i < numAttribs; i++) {
        var attribInfo = gl.getActiveAttrib(program, i);
        if (!attribInfo) {
            break;
        }
        var location_1 = gl.getAttribLocation(program, attribInfo.name);
        var typeInfo = attrTypeMap[attribInfo.type];
        var setter = typeInfo.setter(gl, location_1, typeInfo);
        attribSetters[attribInfo.name] = { setter: setter, location: location_1 };
    }
    return attribSetters;
}
// Type helpers
export var glTypeToTypedArray = (_c = {},
    _c[GL_TYPE.BYTE] = Int8Array,
    _c[GL_TYPE.UNSIGNED_BYTE] = Uint8Array,
    _c[GL_TYPE.SHORT] = Int16Array,
    _c[GL_TYPE.UNSIGNED_SHORT] = Uint16Array,
    _c[GL_TYPE.INT] = Int32Array,
    _c[GL_TYPE.UNSIGNED_INT] = Uint32Array,
    _c[GL_TYPE.FLOAT] = Float32Array,
    _c[GL_TYPE.UNSIGNED_SHORT_4_4_4_4] = Uint16Array,
    _c[GL_TYPE.UNSIGNED_SHORT_5_5_5_1] = Uint16Array,
    _c[GL_TYPE.UNSIGNED_SHORT_5_6_5] = Uint16Array,
    _c[GL_TYPE.HALF_FLOAT] = Uint16Array,
    _c[GL_TYPE.UNSIGNED_INT_2_10_10_10_REV] = Uint32Array,
    _c[GL_TYPE.UNSIGNED_INT_10F_11F_11F_REV] = Uint32Array,
    _c[GL_TYPE.UNSIGNED_INT_5_9_9_9_REV] = Uint32Array,
    _c[GL_TYPE.FLOAT_32_UNSIGNED_INT_24_8_REV] = Uint32Array,
    _c[GL_TYPE.UNSIGNED_INT_24_8] = Uint32Array,
    _c);
export function getGLTypeForTypedArray(typedArray) {
    if (typedArray instanceof Int8Array) {
        return GL_TYPE.BYTE;
    }
    if (typedArray instanceof Uint8Array) {
        return GL_TYPE.UNSIGNED_BYTE;
    }
    if (typedArray instanceof Uint8ClampedArray) {
        return GL_TYPE.UNSIGNED_BYTE;
    }
    if (typedArray instanceof Int16Array) {
        return GL_TYPE.SHORT;
    }
    if (typedArray instanceof Uint16Array) {
        return GL_TYPE.UNSIGNED_SHORT;
    }
    if (typedArray instanceof Int32Array) {
        return GL_TYPE.INT;
    }
    if (typedArray instanceof Uint32Array) {
        return GL_TYPE.UNSIGNED_INT;
    }
    if (typedArray instanceof Float32Array) {
        return GL_TYPE.FLOAT;
    }
    throw 'unsupported typed array type';
}
export function getGLTypeForTypedArrayType(typedArrayType) {
    if (typedArrayType === Int8Array) {
        return GL_TYPE.BYTE;
    }
    if (typedArrayType === Uint8Array) {
        return GL_TYPE.UNSIGNED_BYTE;
    }
    if (typedArrayType === Uint8ClampedArray) {
        return GL_TYPE.UNSIGNED_BYTE;
    }
    if (typedArrayType === Int16Array) {
        return GL_TYPE.SHORT;
    }
    if (typedArrayType === Uint16Array) {
        return GL_TYPE.UNSIGNED_SHORT;
    }
    if (typedArrayType === Int32Array) {
        return GL_TYPE.INT;
    }
    if (typedArrayType === Uint32Array) {
        return GL_TYPE.UNSIGNED_INT;
    }
    if (typedArrayType === Float32Array) {
        return GL_TYPE.FLOAT;
    }
    throw 'unsupported typed array type';
}
// Texture helper
export function setTextureParams(gl, data, oldData) {
    if (data === void 0) { data = {}; }
    if (oldData === void 0) { oldData = {}; }
    if (data.flipY != null && data.flipY !== oldData.flipY) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, data.flipY);
    }
    if ((data.wrap && data.wrap !== oldData.wrap)
        || (data.wrapS && data.wrapS !== oldData.wrapS)
        || (data.wrapT && data.wrapT !== oldData.wrapT)) {
        var wrapS = void 0, wrapT = void 0;
        if (data.wrap) {
            wrapS = wrapT = data.wrap;
        }
        else {
            wrapT = data.wrapT || 'CLAMP_TO_EDGE';
            wrapS = data.wrapS || 'CLAMP_TO_EDGE';
        }
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl[wrapS]);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl[wrapT]);
    }
    if (data.magFilter && data.magFilter !== oldData.magFilter) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl[data.magFilter]);
    }
    if (data.minFilter && data.minFilter !== oldData.minFilter) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl[data.minFilter]);
    }
}
// Framebuffers
export function updateRenderTarget(gl, target, data, oldData) {
    if (target.width == null || target.height == null) {
        return;
    }
    if (target.frameBuffer == null) {
        target.frameBuffer = gl.createFramebuffer();
    }
    if (!target.textures) {
        target.textures = [];
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, target.frameBuffer);
    if (target.textureConfig.type === gl.FLOAT) {
        gl.getExtension('OES_texture_float');
    }
    var texCount = target.textureConfig.count;
    if (texCount > 1) {
        var glDB = gl.getExtension('WEBGL_draw_buffers');
        var bufferAttachments = [];
        for (var i = 0; i < texCount; i++) {
            bufferAttachments.push(glDB["COLOR_ATTACHMENT" + i + "_WEBGL"]);
        }
        glDB.drawBuffersWEBGL(bufferAttachments);
        for (var i = 0; i < texCount; i++) {
            if (target.textures[i] == null) {
                target.textures[i] = gl.createTexture();
            }
            var texture = target.textures[i];
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, target.width, target.height, 0, gl.RGBA, target.textureConfig.type, null);
            setTextureParams(gl, data, oldData);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, bufferAttachments[i], gl.TEXTURE_2D, texture, 0);
        }
    }
    else {
        if (target.textures[0] == null) {
            target.textures[0] = gl.createTexture();
        }
        var texture = target.textures[0];
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, target.width, target.height, 0, gl.RGBA, target.textureConfig.type, null);
        setTextureParams(gl, data, oldData);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    }
    if (target.depthBuffer == null) {
        target.depthBuffer = gl.createRenderbuffer();
    }
    gl.bindRenderbuffer(gl.RENDERBUFFER, target.depthBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, target.width, target.height);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, target.depthBuffer);
    var err = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (err !== gl.FRAMEBUFFER_COMPLETE) {
        console.error('framebuffer error', err, data);
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
}
export function destroyRenderTarget(gl, target) {
    gl.deleteFramebuffer(target.frameBuffer);
    gl.deleteRenderbuffer(target.depthBuffer);
    for (var _i = 0, _a = target.textures; _i < _a.length; _i++) {
        var texture = _a[_i];
        gl.deleteTexture(texture);
    }
}
// Settings
export function applyDrawSettings(gl, settings) {
    if (settings.enable) {
        for (var _i = 0, _a = settings.enable; _i < _a.length; _i++) {
            var setting = _a[_i];
            gl.enable(setting);
        }
    }
    if (settings.disable) {
        for (var _b = 0, _c = settings.disable; _b < _c.length; _b++) {
            var setting = _c[_b];
            gl.disable(setting);
        }
    }
    if (settings.blendFunc) {
        gl.blendFunc.apply(gl, settings.blendFunc);
    }
    if (settings.depthFunc != null) {
        gl.depthFunc(settings.depthFunc);
    }
    if (settings.cullFace != null) {
        gl.cullFace(settings.cullFace);
    }
    if (settings.frontFace != null) {
        gl.frontFace(settings.frontFace);
    }
    if (settings.lineWidth != null) {
        gl.lineWidth(settings.lineWidth);
    }
    if (settings.colorMask) {
        gl.colorMask.apply(gl, settings.colorMask);
    }
    if (settings.depthMask != null) {
        gl.depthMask(settings.depthMask);
    }
    if (settings.clearColor) {
        gl.clearColor.apply(gl, settings.clearColor);
    }
    if (settings.clearDepth != null) {
        gl.clearDepth(settings.clearDepth);
    }
    if (settings.clearBits != null) {
        gl.clear(settings.clearBits);
    }
}
export function revertDrawSettings(gl, settings) {
    if (settings.enable) {
        for (var _i = 0, _a = settings.enable; _i < _a.length; _i++) {
            var setting = _a[_i];
            gl.disable(setting);
        }
    }
    if (settings.disable) {
        for (var _b = 0, _c = settings.disable; _b < _c.length; _b++) {
            var setting = _c[_b];
            gl.enable(setting);
        }
    }
}
var _a, _b, _c;
//# sourceMappingURL=render-utils.js.map