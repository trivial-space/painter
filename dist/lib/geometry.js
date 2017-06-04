var Geometry = (function () {
    function Geometry(gl) {
        this.gl = gl;
    }
    Geometry.prototype.update = function (data) {
        var gl = this.gl;
        this.drawType = gl[data.drawType];
        this.itemCount = data.itemCount;
        var attribs = this.attribs || {};
        for (var id in data.attribs) {
            var attribData = data.attribs[id];
            if (attribs[id] == null) {
                attribs[id] = {
                    buffer: gl.createBuffer()
                };
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, attribs[id].buffer);
            gl.bufferData(gl.ARRAY_BUFFER, attribData.buffer, gl[(attribData.storeType || 'STATIC') + '_DRAW']);
        }
        this.attribs = attribs;
        if (data.elements) {
            var buffer = data.elements.buffer;
            if (this.elements == null) {
                this.elements = {
                    buffer: gl.createBuffer(),
                    glType: null
                };
            }
            this.elements.glType = getGLTypeForTypedArray(buffer);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elements.buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, buffer, gl[(data.elements.storeType || 'STATIC') + '_DRAW']);
        }
    };
    Geometry.prototype.delete = function () {
        for (var id in this.attribs) {
            this.gl.deleteBuffer(this.attribs[id]);
        }
        if (this.elements) {
            this.gl.deleteBuffer(this.elements.buffer);
        }
    };
    return Geometry;
}());
export { Geometry };
var BYTE = 0x1400;
var UNSIGNED_BYTE = 0x1401;
var SHORT = 0x1402;
var UNSIGNED_SHORT = 0x1403;
var INT = 0x1404;
var UNSIGNED_INT = 0x1405;
var FLOAT = 0x1406;
var UNSIGNED_SHORT_4_4_4_4 = 0x8033;
var UNSIGNED_SHORT_5_5_5_1 = 0x8034;
var UNSIGNED_SHORT_5_6_5 = 0x8363;
var HALF_FLOAT = 0x140B;
var UNSIGNED_INT_2_10_10_10_REV = 0x8368;
var UNSIGNED_INT_10F_11F_11F_REV = 0x8C3B;
var UNSIGNED_INT_5_9_9_9_REV = 0x8C3E;
var FLOAT_32_UNSIGNED_INT_24_8_REV = 0x8DAD;
var UNSIGNED_INT_24_8 = 0x84FA;
export var glTypeToTypedArray = (_a = {},
    _a[BYTE] = Int8Array,
    _a[UNSIGNED_BYTE] = Uint8Array,
    _a[SHORT] = Int16Array,
    _a[UNSIGNED_SHORT] = Uint16Array,
    _a[INT] = Int32Array,
    _a[UNSIGNED_INT] = Uint32Array,
    _a[FLOAT] = Float32Array,
    _a[UNSIGNED_SHORT_4_4_4_4] = Uint16Array,
    _a[UNSIGNED_SHORT_5_5_5_1] = Uint16Array,
    _a[UNSIGNED_SHORT_5_6_5] = Uint16Array,
    _a[HALF_FLOAT] = Uint16Array,
    _a[UNSIGNED_INT_2_10_10_10_REV] = Uint32Array,
    _a[UNSIGNED_INT_10F_11F_11F_REV] = Uint32Array,
    _a[UNSIGNED_INT_5_9_9_9_REV] = Uint32Array,
    _a[FLOAT_32_UNSIGNED_INT_24_8_REV] = Uint32Array,
    _a[UNSIGNED_INT_24_8] = Uint32Array,
    _a);
export function getGLTypeForTypedArray(typedArray) {
    if (typedArray instanceof Int8Array) {
        return BYTE;
    }
    if (typedArray instanceof Uint8Array) {
        return UNSIGNED_BYTE;
    }
    if (typedArray instanceof Uint8ClampedArray) {
        return UNSIGNED_BYTE;
    }
    if (typedArray instanceof Int16Array) {
        return SHORT;
    }
    if (typedArray instanceof Uint16Array) {
        return UNSIGNED_SHORT;
    }
    if (typedArray instanceof Int32Array) {
        return INT;
    }
    if (typedArray instanceof Uint32Array) {
        return UNSIGNED_INT;
    }
    if (typedArray instanceof Float32Array) {
        return FLOAT;
    }
    throw 'unsupported typed array type';
}
export function getGLTypeForTypedArrayType(typedArrayType) {
    if (typedArrayType === Int8Array) {
        return BYTE;
    }
    if (typedArrayType === Uint8Array) {
        return UNSIGNED_BYTE;
    }
    if (typedArrayType === Uint8ClampedArray) {
        return UNSIGNED_BYTE;
    }
    if (typedArrayType === Int16Array) {
        return SHORT;
    }
    if (typedArrayType === Uint16Array) {
        return UNSIGNED_SHORT;
    }
    if (typedArrayType === Int32Array) {
        return INT;
    }
    if (typedArrayType === Uint32Array) {
        return UNSIGNED_INT;
    }
    if (typedArrayType === Float32Array) {
        return FLOAT;
    }
    throw 'unsupported typed array type';
}
var _a;
//# sourceMappingURL=geometry.js.map