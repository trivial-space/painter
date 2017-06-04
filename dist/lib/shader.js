var Shader = (function () {
    function Shader(gl) {
        this.gl = gl;
        this.program = gl.createProgram();
        this.frag = gl.createShader(gl.FRAGMENT_SHADER);
        this.vert = gl.createShader(gl.VERTEX_SHADER);
        gl.attachShader(this.program, this.vert);
        gl.attachShader(this.program, this.frag);
    }
    Shader.prototype.update = function (data) {
        var gl = this.gl;
        gl.shaderSource(this.vert, data.vert);
        gl.shaderSource(this.frag, data.frag);
        gl.compileShader(this.vert);
        gl.compileShader(this.frag);
        if (!gl.getShaderParameter(this.vert, gl.COMPILE_STATUS)) {
            console.error('Error Compiling Vertex Shader!\n', gl.getShaderInfoLog(this.vert), addLineNumbers(data.vert));
        }
        if (!gl.getShaderParameter(this.frag, gl.COMPILE_STATUS)) {
            console.error('Error Compiling Fragment Shader!\n', gl.getShaderInfoLog(this.frag), addLineNumbers(data.frag));
        }
        gl.linkProgram(this.program);
        var linked = gl.getProgramParameter(this.program, gl.LINK_STATUS);
        if (!linked) {
            var lastError = gl.getProgramInfoLog(this.program);
            console.error('Error in program linking:', lastError);
        }
        this.uniformSetters = createUniformSetters(this.gl, this.program);
        this.attributeSetters = createAttributeSetters(this.gl, this.program);
    };
    Shader.prototype.delete = function () {
        this.gl.deleteProgram(this.program);
        this.gl.deleteShader(this.frag);
        this.gl.deleteShader(this.vert);
    };
    Shader.prototype.setGeometry = function (geometry) {
        for (var name_1 in geometry.attribs) {
            var setter = this.attributeSetters[name_1];
            if (setter) {
                setter.setter(geometry.attribs[name_1]);
            }
        }
    };
    Shader.prototype.setUniforms = function (values) {
        for (var name_2 in values) {
            var setter = this.uniformSetters[name_2];
            if (setter) {
                setter.setter(values[name_2]);
            }
        }
    };
    return Shader;
}());
export { Shader };
function addLineNumbers(src) {
    return src.split('\n')
        .map(function (line, i) { return (i + 1) + ': ' + line; })
        .join('\n');
}
/*
 * Copyright 2015, Gregg Tavares.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Gregg Tavares. nor the names of his
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var FLOAT = 0x1406;
var FLOAT_VEC2 = 0x8B50;
var FLOAT_VEC3 = 0x8B51;
var FLOAT_VEC4 = 0x8B52;
var INT = 0x1404;
var INT_VEC2 = 0x8B53;
var INT_VEC3 = 0x8B54;
var INT_VEC4 = 0x8B55;
var BOOL = 0x8B56;
var BOOL_VEC2 = 0x8B57;
var BOOL_VEC3 = 0x8B58;
var BOOL_VEC4 = 0x8B59;
var FLOAT_MAT2 = 0x8B5A;
var FLOAT_MAT3 = 0x8B5B;
var FLOAT_MAT4 = 0x8B5C;
var SAMPLER_2D = 0x8B5E;
var SAMPLER_CUBE = 0x8B60;
var SAMPLER_3D = 0x8B5F;
var SAMPLER_2D_SHADOW = 0x8B62;
var FLOAT_MAT2X3 = 0x8B65;
var FLOAT_MAT2X4 = 0x8B66;
var FLOAT_MAT3X2 = 0x8B67;
var FLOAT_MAT3X4 = 0x8B68;
var FLOAT_MAT4X2 = 0x8B69;
var FLOAT_MAT4X3 = 0x8B6A;
var SAMPLER_2D_ARRAY = 0x8DC1;
var SAMPLER_2D_ARRAY_SHADOW = 0x8DC4;
var SAMPLER_CUBE_SHADOW = 0x8DC5;
var UNSIGNED_INT = 0x1405;
var UNSIGNED_INT_VEC2 = 0x8DC6;
var UNSIGNED_INT_VEC3 = 0x8DC7;
var UNSIGNED_INT_VEC4 = 0x8DC8;
var INT_SAMPLER_2D = 0x8DCA;
var INT_SAMPLER_3D = 0x8DCB;
var INT_SAMPLER_CUBE = 0x8DCC;
var INT_SAMPLER_2D_ARRAY = 0x8DCF;
var UNSIGNED_INT_SAMPLER_2D = 0x8DD2;
var UNSIGNED_INT_SAMPLER_3D = 0x8DD3;
var UNSIGNED_INT_SAMPLER_CUBE = 0x8DD4;
var UNSIGNED_INT_SAMPLER_2D_ARRAY = 0x8DD7;
var TEXTURE_2D = 0x0DE1;
var TEXTURE_CUBE_MAP = 0x8513;
var TEXTURE_3D = 0x806F;
var TEXTURE_2D_ARRAY = 0x8C1A;
/**
 * Returns the corresponding bind point for a given sampler type
 */
function getBindPointForSamplerType(type) {
    return typeMap[type].bindPoint;
}
// This kind of sucks! If you could compose functions as in `var fn = gl[name];`
// this code could be a lot smaller but that is sadly really slow (T_T)
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
    for (var ii = 0; ii < size; ++ii) {
        units[ii] = unit + ii;
    }
    return function (textures) {
        gl.uniform1iv(location, units);
        textures.forEach(function (texture, index) {
            gl.activeTexture(gl.TEXTURE0 + units[index]);
            gl.bindTexture(bindPoint, texture);
        });
    };
}
var typeMap = (_a = {},
    _a[FLOAT] = { Type: Float32Array, size: 4, setter: floatSetter, arraySetter: floatArraySetter, },
    _a[FLOAT_VEC2] = { Type: Float32Array, size: 8, setter: floatVec2Setter, },
    _a[FLOAT_VEC3] = { Type: Float32Array, size: 12, setter: floatVec3Setter, },
    _a[FLOAT_VEC4] = { Type: Float32Array, size: 16, setter: floatVec4Setter, },
    _a[INT] = { Type: Int32Array, size: 4, setter: intSetter, arraySetter: intArraySetter, },
    _a[INT_VEC2] = { Type: Int32Array, size: 8, setter: intVec2Setter, },
    _a[INT_VEC3] = { Type: Int32Array, size: 12, setter: intVec3Setter, },
    _a[INT_VEC4] = { Type: Int32Array, size: 16, setter: intVec4Setter, },
    _a[UNSIGNED_INT] = { Type: Uint32Array, size: 4, setter: uintSetter, arraySetter: uintArraySetter, },
    _a[UNSIGNED_INT_VEC2] = { Type: Uint32Array, size: 8, setter: uintVec2Setter, },
    _a[UNSIGNED_INT_VEC3] = { Type: Uint32Array, size: 12, setter: uintVec3Setter, },
    _a[UNSIGNED_INT_VEC4] = { Type: Uint32Array, size: 16, setter: uintVec4Setter, },
    _a[BOOL] = { Type: Uint32Array, size: 4, setter: intSetter, arraySetter: intArraySetter, },
    _a[BOOL_VEC2] = { Type: Uint32Array, size: 8, setter: intVec2Setter, },
    _a[BOOL_VEC3] = { Type: Uint32Array, size: 12, setter: intVec3Setter, },
    _a[BOOL_VEC4] = { Type: Uint32Array, size: 16, setter: intVec4Setter, },
    _a[FLOAT_MAT2] = { Type: Float32Array, size: 16, setter: floatMat2Setter, },
    _a[FLOAT_MAT3] = { Type: Float32Array, size: 36, setter: floatMat3Setter, },
    _a[FLOAT_MAT4] = { Type: Float32Array, size: 64, setter: floatMat4Setter, },
    _a[FLOAT_MAT2X3] = { Type: Float32Array, size: 24, setter: floatMat23Setter, },
    _a[FLOAT_MAT2X4] = { Type: Float32Array, size: 32, setter: floatMat24Setter, },
    _a[FLOAT_MAT3X2] = { Type: Float32Array, size: 24, setter: floatMat32Setter, },
    _a[FLOAT_MAT3X4] = { Type: Float32Array, size: 48, setter: floatMat34Setter, },
    _a[FLOAT_MAT4X2] = { Type: Float32Array, size: 32, setter: floatMat42Setter, },
    _a[FLOAT_MAT4X3] = { Type: Float32Array, size: 48, setter: floatMat43Setter, },
    _a[SAMPLER_2D] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D, },
    _a[SAMPLER_CUBE] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP, },
    _a[SAMPLER_3D] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D, },
    _a[SAMPLER_2D_SHADOW] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D, },
    _a[SAMPLER_2D_ARRAY] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY, },
    _a[SAMPLER_2D_ARRAY_SHADOW] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY, },
    _a[SAMPLER_CUBE_SHADOW] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP, },
    _a[INT_SAMPLER_2D] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D, },
    _a[INT_SAMPLER_3D] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D, },
    _a[INT_SAMPLER_CUBE] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP, },
    _a[INT_SAMPLER_2D_ARRAY] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY, },
    _a[UNSIGNED_INT_SAMPLER_2D] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D, },
    _a[UNSIGNED_INT_SAMPLER_3D] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D, },
    _a[UNSIGNED_INT_SAMPLER_CUBE] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP, },
    _a[UNSIGNED_INT_SAMPLER_2D_ARRAY] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY, },
    _a);
function floatAttribSetter(gl, location, typeInfo) {
    return function (b) {
        gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer);
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, typeInfo.itemSize, FLOAT, b.normalize || false, b.stride || 0, b.offset || 0);
    };
}
function intAttribSetter(gl, location, typeInfo) {
    return function (b) {
        gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer);
        gl.enableVertexAttribArray(location);
        gl.vertexAttribIPointer(location, typeInfo.itemSize, INT, b.stride || 0, b.offset || 0);
    };
}
function matAttribSetter(gl, location, typeInfo) {
    var defaultSize = typeInfo.size;
    var count = typeInfo.count;
    return function (b) {
        gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer);
        var numComponents = defaultSize;
        var size = numComponents / count;
        var typeInfo = typeMap[FLOAT];
        var stride = typeInfo.size * numComponents;
        var normalize = b.normalize || false;
        var offset = b.offset || 0;
        var rowOffset = stride / count;
        for (var i = 0; i < count; ++i) {
            gl.enableVertexAttribArray(location + i);
            gl.vertexAttribPointer(location + i, size, FLOAT, normalize, stride, offset + rowOffset * i);
        }
    };
}
var attrTypeMap = (_b = {},
    _b[FLOAT] = { size: 4, setter: floatAttribSetter, itemSize: 1 },
    _b[FLOAT_VEC2] = { size: 8, setter: floatAttribSetter, itemSize: 2 },
    _b[FLOAT_VEC3] = { size: 12, setter: floatAttribSetter, itemSize: 3 },
    _b[FLOAT_VEC4] = { size: 16, setter: floatAttribSetter, itemSize: 4 },
    _b[INT] = { size: 4, setter: intAttribSetter, itemSize: 1 },
    _b[INT_VEC2] = { size: 8, setter: intAttribSetter, itemSize: 2 },
    _b[INT_VEC3] = { size: 12, setter: intAttribSetter, itemSize: 3 },
    _b[INT_VEC4] = { size: 16, setter: intAttribSetter, itemSize: 4 },
    _b[UNSIGNED_INT] = { size: 4, setter: intAttribSetter, itemSize: 1 },
    _b[UNSIGNED_INT_VEC2] = { size: 8, setter: intAttribSetter, itemSize: 2 },
    _b[UNSIGNED_INT_VEC3] = { size: 12, setter: intAttribSetter, itemSize: 3 },
    _b[UNSIGNED_INT_VEC4] = { size: 16, setter: intAttribSetter, itemSize: 4 },
    _b[BOOL] = { size: 4, setter: intAttribSetter, itemSize: 1 },
    _b[BOOL_VEC2] = { size: 8, setter: intAttribSetter, itemSize: 2 },
    _b[BOOL_VEC3] = { size: 12, setter: intAttribSetter, itemSize: 3 },
    _b[BOOL_VEC4] = { size: 16, setter: intAttribSetter, itemSize: 4 },
    _b[FLOAT_MAT2] = { size: 4, setter: matAttribSetter, count: 2 },
    _b[FLOAT_MAT3] = { size: 9, setter: matAttribSetter, count: 3 },
    _b[FLOAT_MAT4] = { size: 16, setter: matAttribSetter, count: 4 },
    _b);
function createUniformSetters(gl, program) {
    var textureUnit = 0;
    function createUniformSetter(program, uniformInfo) {
        var location = gl.getUniformLocation(program, uniformInfo.name);
        var isArray = (uniformInfo.size > 1 && uniformInfo.name.substr(-3) === '[0]');
        var type = uniformInfo.type;
        var typeInfo = typeMap[type];
        if (!typeInfo) {
            throw ('unknown type: 0x' + type.toString(16)); // we should never get here.
        }
        var setter;
        if (typeInfo.bindPoint) {
            // it's a sampler
            var unit = textureUnit;
            textureUnit += uniformInfo.size;
            if (isArray) {
                setter = typeInfo.arraySetter(gl, type, unit, location, uniformInfo.size);
            }
            else {
                setter = typeInfo.setter(gl, type, unit, location, uniformInfo.size);
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
        setter.location = location;
        return setter;
    }
    var uniformSetters = {};
    var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (var i = 0; i < numUniforms; ++i) {
        var uniformInfo = gl.getActiveUniform(program, i);
        if (!uniformInfo) {
            break;
        }
        var name_3 = uniformInfo.name;
        // remove the array suffix.
        if (name_3.substr(-3) === '[0]') {
            name_3 = name_3.substr(0, name_3.length - 3);
        }
        if (program) {
            uniformSetters[name_3] = createUniformSetter(program, uniformInfo);
        }
    }
    return uniformSetters;
}
function createAttributeSetters(gl, program) {
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
var _a, _b;
//# sourceMappingURL=shader.js.map