!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.tvsRenderer = t() : e.tvsRenderer = t();
}(this, function() {
    return function(e) {
        function t(n) {
            if (r[n]) return r[n].exports;
            var i = r[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(i.exports, i, i.exports, t), i.l = !0, i.exports;
        }
        var r = {};
        return t.m = e, t.c = r, t.d = function(e, r, n) {
            t.o(e, r) || Object.defineProperty(e, r, {
                configurable: !1,
                enumerable: !0,
                get: n
            });
        }, t.n = function(e) {
            var r = e && e.__esModule ? function() {
                return e.default;
            } : function() {
                return e;
            };
            return t.d(r, "a", r), r;
        }, t.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }, t.p = "", t(t.s = 4);
    }([ function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), r.d(t, "GEOMETRY_PROP_POSITION", function() {
            return n;
        }), r.d(t, "GEOMETRY_PROP_NORMAL", function() {
            return i;
        }), r.d(t, "GEOMETRY_PROP_UV", function() {
            return a;
        }), r.d(t, "UNIFORM_SOURCE_TEXTURE", function() {
            return u;
        }), r.d(t, "VARYING_UV_COORDS", function() {
            return f;
        }), r.d(t, "GL_TYPE", function() {
            return o;
        });
        var n = "position", i = "normal", a = "uv", u = "source", f = "coords", o = {
            FLOAT: 5126,
            FLOAT_VEC2: 35664,
            FLOAT_VEC3: 35665,
            FLOAT_VEC4: 35666,
            INT: 5124,
            INT_VEC2: 35667,
            INT_VEC3: 35668,
            INT_VEC4: 35669,
            BOOL: 35670,
            BOOL_VEC2: 35671,
            BOOL_VEC3: 35672,
            BOOL_VEC4: 35673,
            FLOAT_MAT2: 35674,
            FLOAT_MAT3: 35675,
            FLOAT_MAT4: 35676,
            SAMPLER_2D: 35678,
            SAMPLER_CUBE: 35680,
            SAMPLER_3D: 35679,
            SAMPLER_2D_SHADOW: 35682,
            FLOAT_MAT2X3: 35685,
            FLOAT_MAT2X4: 35686,
            FLOAT_MAT3X2: 35687,
            FLOAT_MAT3X4: 35688,
            FLOAT_MAT4X2: 35689,
            FLOAT_MAT4X3: 35690,
            SAMPLER_2D_ARRAY: 36289,
            SAMPLER_2D_ARRAY_SHADOW: 36292,
            SAMPLER_CUBE_SHADOW: 36293,
            UNSIGNED_INT: 5125,
            UNSIGNED_INT_VEC2: 36294,
            UNSIGNED_INT_VEC3: 36295,
            UNSIGNED_INT_VEC4: 36296,
            INT_SAMPLER_2D: 36298,
            INT_SAMPLER_3D: 36299,
            INT_SAMPLER_CUBE: 36300,
            INT_SAMPLER_2D_ARRAY: 36303,
            UNSIGNED_INT_SAMPLER_2D: 36306,
            UNSIGNED_INT_SAMPLER_3D: 36307,
            UNSIGNED_INT_SAMPLER_CUBE: 36308,
            UNSIGNED_INT_SAMPLER_2D_ARRAY: 36311,
            TEXTURE_2D: 3553,
            TEXTURE_CUBE_MAP: 34067,
            TEXTURE_3D: 32879,
            TEXTURE_2D_ARRAY: 35866,
            BYTE: 5120,
            UNSIGNED_BYTE: 5121,
            SHORT: 5122,
            UNSIGNED_SHORT: 5123,
            UNSIGNED_SHORT_4_4_4_4: 32819,
            UNSIGNED_SHORT_5_5_5_1: 32820,
            UNSIGNED_SHORT_5_6_5: 33635,
            HALF_FLOAT: 5131,
            UNSIGNED_INT_2_10_10_10_REV: 33640,
            UNSIGNED_INT_10F_11F_11F_REV: 35899,
            UNSIGNED_INT_5_9_9_9_REV: 35902,
            FLOAT_32_UNSIGNED_INT_24_8_REV: 36269,
            UNSIGNED_INT_24_8: 34042
        };
    }, function(e, t, r) {
        "use strict";
        function n(e) {
            return W[e].bindPoint;
        }
        function i(e, t) {
            return function(r) {
                e.uniform1f(t, r);
            };
        }
        function a(e, t) {
            return function(r) {
                e.uniform1fv(t, r);
            };
        }
        function u(e, t) {
            return function(r) {
                e.uniform2fv(t, r);
            };
        }
        function f(e, t) {
            return function(r) {
                e.uniform3fv(t, r);
            };
        }
        function o(e, t) {
            return function(r) {
                e.uniform4fv(t, r);
            };
        }
        function _(e, t) {
            return function(r) {
                e.uniform1i(t, r);
            };
        }
        function T(e, t) {
            return function(r) {
                e.uniform1iv(t, r);
            };
        }
        function E(e, t) {
            return function(r) {
                e.uniform2iv(t, r);
            };
        }
        function s(e, t) {
            return function(r) {
                e.uniform3iv(t, r);
            };
        }
        function l(e, t) {
            return function(r) {
                e.uniform4iv(t, r);
            };
        }
        function c(e, t) {
            return function(r) {
                e.uniform1ui(t, r);
            };
        }
        function A(e, t) {
            return function(r) {
                e.uniform1uiv(t, r);
            };
        }
        function d(e, t) {
            return function(r) {
                e.uniform2uiv(t, r);
            };
        }
        function R(e, t) {
            return function(r) {
                e.uniform3uiv(t, r);
            };
        }
        function P(e, t) {
            return function(r) {
                e.uniform4uiv(t, r);
            };
        }
        function L(e, t) {
            return function(r) {
                e.uniformMatrix2fv(t, !1, r);
            };
        }
        function S(e, t) {
            return function(r) {
                e.uniformMatrix3fv(t, !1, r);
            };
        }
        function m(e, t) {
            return function(r) {
                e.uniformMatrix4fv(t, !1, r);
            };
        }
        function y(e, t) {
            return function(r) {
                e.uniformMatrix2x3fv(t, !1, r);
            };
        }
        function G(e, t) {
            return function(r) {
                e.uniformMatrix3x2fv(t, !1, r);
            };
        }
        function p(e, t) {
            return function(r) {
                e.uniformMatrix2x4fv(t, !1, r);
            };
        }
        function N(e, t) {
            return function(r) {
                e.uniformMatrix4x2fv(t, !1, r);
            };
        }
        function g(e, t) {
            return function(r) {
                e.uniformMatrix3x4fv(t, !1, r);
            };
        }
        function U(e, t) {
            return function(r) {
                e.uniformMatrix4x3fv(t, !1, r);
            };
        }
        function O(e, t, r, i) {
            var a = n(t);
            return function(t) {
                e.uniform1i(i, r), e.activeTexture(e.TEXTURE0 + r), e.bindTexture(a, t);
            };
        }
        function F(e, t, r, i, a) {
            for (var u = n(t), f = new Int32Array(a), o = 0; o < a; ++o) f[o] = r + o;
            return function(t) {
                e.uniform1iv(i, f);
                for (var r in t) e.activeTexture(e.TEXTURE0 + f[r]), e.bindTexture(u, t[r]);
            };
        }
        function v(e) {
            return null === e.Type;
        }
        function b(e, t, r) {
            return function(n) {
                e.bindBuffer(e.ARRAY_BUFFER, n.buffer), e.enableVertexAttribArray(t), e.vertexAttribPointer(t, r.itemSize, k.GL_TYPE.FLOAT, n.normalize || !1, n.stride || 0, n.offset || 0);
            };
        }
        function I(e, t, r) {
            return function(n) {
                e.bindBuffer(e.ARRAY_BUFFER, n.buffer), e.enableVertexAttribArray(t), e.vertexAttribIPointer(t, r.itemSize, k.GL_TYPE.INT, n.stride || 0, n.offset || 0);
            };
        }
        function Y(e, t, r) {
            var n = r.size, i = r.count;
            return function(r) {
                e.bindBuffer(e.ARRAY_BUFFER, r.buffer);
                for (var a = n, u = a / i, f = W[k.GL_TYPE.FLOAT], o = f.size * a, _ = r.normalize || !1, T = r.offset || 0, E = o / i, s = 0; s < i; ++s) e.enableVertexAttribArray(t + s), 
                e.vertexAttribPointer(t + s, u, k.GL_TYPE.FLOAT, _, o, T + E * s);
            };
        }
        function h(e, t) {
            for (var r = 0, n = {}, i = e.getProgramParameter(t, e.ACTIVE_UNIFORMS), a = 0; a < i; ++a) {
                var u = e.getActiveUniform(t, a);
                if (!u) break;
                var f = u.name;
                if ("[0]" === f.substr(-3) && (f = f.substr(0, f.length - 3)), t) {
                    var o = function(t, n) {
                        var i = e.getUniformLocation(t, n.name), a = n.size > 1 && "[0]" === n.name.substr(-3), u = n.type, f = W[u];
                        if (!f) throw "unknown type: 0x" + u.toString(16);
                        if (null != i) {
                            var o;
                            if (v(f)) {
                                var _ = r;
                                r += n.size, o = a ? f.arraySetter(e, u, _, i, n.size) : f.setter(e, u, _, i);
                            } else o = f.arraySetter && a ? f.arraySetter(e, i) : f.setter(e, i);
                            return {
                                setter: o,
                                location: i
                            };
                        }
                    }(t, u);
                    o && (n[f] = o);
                }
            }
            return n;
        }
        function D(e, t) {
            for (var r = {}, n = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES), i = 0; i < n; i++) {
                var a = e.getActiveAttrib(t, i);
                if (!a) break;
                var u = e.getAttribLocation(t, a.name), f = j[a.type], o = f.setter(e, u, f);
                r[a.name] = {
                    setter: o,
                    location: u
                };
            }
            return r;
        }
        function M(e) {
            if (e instanceof Int8Array) return k.GL_TYPE.BYTE;
            if (e instanceof Uint8Array) return k.GL_TYPE.UNSIGNED_BYTE;
            if (e instanceof Uint8ClampedArray) return k.GL_TYPE.UNSIGNED_BYTE;
            if (e instanceof Int16Array) return k.GL_TYPE.SHORT;
            if (e instanceof Uint16Array) return k.GL_TYPE.UNSIGNED_SHORT;
            if (e instanceof Int32Array) return k.GL_TYPE.INT;
            if (e instanceof Uint32Array) return k.GL_TYPE.UNSIGNED_INT;
            if (e instanceof Float32Array) return k.GL_TYPE.FLOAT;
            throw "unsupported typed array type";
        }
        function C(e, t, r) {
            if (void 0 === t && (t = {}), void 0 === r && (r = {}), null != t.flipY && t.flipY !== r.flipY && e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, t.flipY), 
            t.wrap && t.wrap !== r.wrap || t.wrapS && t.wrapS !== r.wrapS || t.wrapT && t.wrapT !== r.wrapT) {
                var n = void 0, i = void 0;
                t.wrap ? n = i = t.wrap : (i = t.wrapT || "CLAMP_TO_EDGE", n = t.wrapS || "CLAMP_TO_EDGE"), 
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e[n]), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e[i]);
            }
            t.magFilter && t.magFilter !== r.magFilter && e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e[t.magFilter]), 
            t.minFilter && t.minFilter !== r.minFilter && e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e[t.minFilter]);
        }
        function x(e, t, r, n) {
            if (null != t.width && null != t.height) {
                null == t.frameBuffer && (t.frameBuffer = e.createFramebuffer()), t.textures || (t.textures = []), 
                e.bindFramebuffer(e.FRAMEBUFFER, t.frameBuffer), t.textureConfig.type === e.FLOAT && e.getExtension("OES_texture_float");
                var i = t.textureConfig.count;
                if (i > 1) {
                    for (var a = e.getExtension("WEBGL_draw_buffers"), u = [], f = 0; f < i; f++) u.push(a["COLOR_ATTACHMENT" + f + "_WEBGL"]);
                    a.drawBuffersWEBGL(u);
                    for (var f = 0; f < i; f++) {
                        null == t.textures[f] && (t.textures[f] = e.createTexture());
                        var o = t.textures[f];
                        e.bindTexture(e.TEXTURE_2D, o), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, t.width, t.height, 0, e.RGBA, t.textureConfig.type, null), 
                        C(e, r, n), e.framebufferTexture2D(e.FRAMEBUFFER, u[f], e.TEXTURE_2D, o, 0);
                    }
                } else {
                    null == t.textures[0] && (t.textures[0] = e.createTexture());
                    var o = t.textures[0];
                    e.bindTexture(e.TEXTURE_2D, o), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, t.width, t.height, 0, e.RGBA, t.textureConfig.type, null), 
                    C(e, r, n), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, o, 0);
                }
                null == t.depthBuffer && (t.depthBuffer = e.createRenderbuffer()), e.bindRenderbuffer(e.RENDERBUFFER, t.depthBuffer), 
                e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_COMPONENT16, t.width, t.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.RENDERBUFFER, t.depthBuffer);
                var _ = e.checkFramebufferStatus(e.FRAMEBUFFER);
                _ !== e.FRAMEBUFFER_COMPLETE && console.error("framebuffer error", _, r), e.bindFramebuffer(e.FRAMEBUFFER, null), 
                e.bindTexture(e.TEXTURE_2D, null), e.bindRenderbuffer(e.RENDERBUFFER, null);
            }
        }
        function B(e, t) {
            e.deleteFramebuffer(t.frameBuffer), e.deleteRenderbuffer(t.depthBuffer);
            for (var r = 0, n = t.textures; r < n.length; r++) {
                var i = n[r];
                e.deleteTexture(i);
            }
        }
        function z(e, t) {
            if (t.enable) for (var r = 0, n = t.enable; r < n.length; r++) {
                var i = n[r];
                e.enable(i);
            }
            if (t.disable) for (var a = 0, u = t.disable; a < u.length; a++) {
                var i = u[a];
                e.disable(i);
            }
            t.blendFunc && e.blendFunc.apply(e, t.blendFunc), null != t.depthFunc && e.depthFunc(t.depthFunc), 
            null != t.cullFace && e.cullFace(t.cullFace), null != t.frontFace && e.frontFace(t.frontFace), 
            null != t.lineWidth && e.lineWidth(t.lineWidth), t.colorMask && e.colorMask.apply(e, t.colorMask), 
            null != t.depthMask && e.depthMask(t.depthMask), t.clearColor && e.clearColor.apply(e, t.clearColor), 
            null != t.clearDepth && e.clearDepth(t.clearDepth), null != t.clearBits && e.clear(t.clearBits);
        }
        function w(e, t) {
            if (t.enable) for (var r = 0, n = t.enable; r < n.length; r++) {
                var i = n[r];
                e.disable(i);
            }
            if (t.disable) for (var a = 0, u = t.disable; a < u.length; a++) {
                var i = u[a];
                e.enable(i);
            }
        }
        t.c = h, t.b = D, t.e = M, t.g = C, t.h = x, t.d = B, t.a = z, t.f = w;
        var V, X, H, k = r(0), W = (V = {}, V[k.GL_TYPE.FLOAT] = {
            Type: Float32Array,
            size: 4,
            setter: i,
            arraySetter: a
        }, V[k.GL_TYPE.FLOAT_VEC2] = {
            Type: Float32Array,
            size: 8,
            setter: u
        }, V[k.GL_TYPE.FLOAT_VEC3] = {
            Type: Float32Array,
            size: 12,
            setter: f
        }, V[k.GL_TYPE.FLOAT_VEC4] = {
            Type: Float32Array,
            size: 16,
            setter: o
        }, V[k.GL_TYPE.INT] = {
            Type: Int32Array,
            size: 4,
            setter: _,
            arraySetter: T
        }, V[k.GL_TYPE.INT_VEC2] = {
            Type: Int32Array,
            size: 8,
            setter: E
        }, V[k.GL_TYPE.INT_VEC3] = {
            Type: Int32Array,
            size: 12,
            setter: s
        }, V[k.GL_TYPE.INT_VEC4] = {
            Type: Int32Array,
            size: 16,
            setter: l
        }, V[k.GL_TYPE.UNSIGNED_INT] = {
            Type: Uint32Array,
            size: 4,
            setter: c,
            arraySetter: A
        }, V[k.GL_TYPE.UNSIGNED_INT_VEC2] = {
            Type: Uint32Array,
            size: 8,
            setter: d
        }, V[k.GL_TYPE.UNSIGNED_INT_VEC3] = {
            Type: Uint32Array,
            size: 12,
            setter: R
        }, V[k.GL_TYPE.UNSIGNED_INT_VEC4] = {
            Type: Uint32Array,
            size: 16,
            setter: P
        }, V[k.GL_TYPE.BOOL] = {
            Type: Uint32Array,
            size: 4,
            setter: _,
            arraySetter: T
        }, V[k.GL_TYPE.BOOL_VEC2] = {
            Type: Uint32Array,
            size: 8,
            setter: E
        }, V[k.GL_TYPE.BOOL_VEC3] = {
            Type: Uint32Array,
            size: 12,
            setter: s
        }, V[k.GL_TYPE.BOOL_VEC4] = {
            Type: Uint32Array,
            size: 16,
            setter: l
        }, V[k.GL_TYPE.FLOAT_MAT2] = {
            Type: Float32Array,
            size: 16,
            setter: L
        }, V[k.GL_TYPE.FLOAT_MAT3] = {
            Type: Float32Array,
            size: 36,
            setter: S
        }, V[k.GL_TYPE.FLOAT_MAT4] = {
            Type: Float32Array,
            size: 64,
            setter: m
        }, V[k.GL_TYPE.FLOAT_MAT2X3] = {
            Type: Float32Array,
            size: 24,
            setter: y
        }, V[k.GL_TYPE.FLOAT_MAT2X4] = {
            Type: Float32Array,
            size: 32,
            setter: p
        }, V[k.GL_TYPE.FLOAT_MAT3X2] = {
            Type: Float32Array,
            size: 24,
            setter: G
        }, V[k.GL_TYPE.FLOAT_MAT3X4] = {
            Type: Float32Array,
            size: 48,
            setter: g
        }, V[k.GL_TYPE.FLOAT_MAT4X2] = {
            Type: Float32Array,
            size: 32,
            setter: N
        }, V[k.GL_TYPE.FLOAT_MAT4X3] = {
            Type: Float32Array,
            size: 48,
            setter: U
        }, V[k.GL_TYPE.SAMPLER_2D] = {
            Type: null,
            size: 0,
            setter: O,
            arraySetter: F,
            bindPoint: k.GL_TYPE.TEXTURE_2D
        }, V[k.GL_TYPE.SAMPLER_CUBE] = {
            Type: null,
            size: 0,
            setter: O,
            arraySetter: F,
            bindPoint: k.GL_TYPE.TEXTURE_CUBE_MAP
        }, V[k.GL_TYPE.SAMPLER_3D] = {
            Type: null,
            size: 0,
            setter: O,
            arraySetter: F,
            bindPoint: k.GL_TYPE.TEXTURE_3D
        }, V[k.GL_TYPE.SAMPLER_2D_SHADOW] = {
            Type: null,
            size: 0,
            setter: O,
            arraySetter: F,
            bindPoint: k.GL_TYPE.TEXTURE_2D
        }, V[k.GL_TYPE.SAMPLER_2D_ARRAY] = {
            Type: null,
            size: 0,
            setter: O,
            arraySetter: F,
            bindPoint: k.GL_TYPE.TEXTURE_2D_ARRAY
        }, V[k.GL_TYPE.SAMPLER_2D_ARRAY_SHADOW] = {
            Type: null,
            size: 0,
            setter: O,
            arraySetter: F,
            bindPoint: k.GL_TYPE.TEXTURE_2D_ARRAY
        }, V[k.GL_TYPE.SAMPLER_CUBE_SHADOW] = {
            Type: null,
            size: 0,
            setter: O,
            arraySetter: F,
            bindPoint: k.GL_TYPE.TEXTURE_CUBE_MAP
        }, V[k.GL_TYPE.INT_SAMPLER_2D] = {
            Type: null,
            size: 0,
            setter: O,
            arraySetter: F,
            bindPoint: k.GL_TYPE.TEXTURE_2D
        }, V[k.GL_TYPE.INT_SAMPLER_3D] = {
            Type: null,
            size: 0,
            setter: O,
            arraySetter: F,
            bindPoint: k.GL_TYPE.TEXTURE_3D
        }, V[k.GL_TYPE.INT_SAMPLER_CUBE] = {
            Type: null,
            size: 0,
            setter: O,
            arraySetter: F,
            bindPoint: k.GL_TYPE.TEXTURE_CUBE_MAP
        }, V[k.GL_TYPE.INT_SAMPLER_2D_ARRAY] = {
            Type: null,
            size: 0,
            setter: O,
            arraySetter: F,
            bindPoint: k.GL_TYPE.TEXTURE_2D_ARRAY
        }, V[k.GL_TYPE.UNSIGNED_INT_SAMPLER_2D] = {
            Type: null,
            size: 0,
            setter: O,
            arraySetter: F,
            bindPoint: k.GL_TYPE.TEXTURE_2D
        }, V[k.GL_TYPE.UNSIGNED_INT_SAMPLER_3D] = {
            Type: null,
            size: 0,
            setter: O,
            arraySetter: F,
            bindPoint: k.GL_TYPE.TEXTURE_3D
        }, V[k.GL_TYPE.UNSIGNED_INT_SAMPLER_CUBE] = {
            Type: null,
            size: 0,
            setter: O,
            arraySetter: F,
            bindPoint: k.GL_TYPE.TEXTURE_CUBE_MAP
        }, V[k.GL_TYPE.UNSIGNED_INT_SAMPLER_2D_ARRAY] = {
            Type: null,
            size: 0,
            setter: O,
            arraySetter: F,
            bindPoint: k.GL_TYPE.TEXTURE_2D_ARRAY
        }, V), j = (X = {}, X[k.GL_TYPE.FLOAT] = {
            size: 4,
            setter: b,
            itemSize: 1
        }, X[k.GL_TYPE.FLOAT_VEC2] = {
            size: 8,
            setter: b,
            itemSize: 2
        }, X[k.GL_TYPE.FLOAT_VEC3] = {
            size: 12,
            setter: b,
            itemSize: 3
        }, X[k.GL_TYPE.FLOAT_VEC4] = {
            size: 16,
            setter: b,
            itemSize: 4
        }, X[k.GL_TYPE.INT] = {
            size: 4,
            setter: I,
            itemSize: 1
        }, X[k.GL_TYPE.INT_VEC2] = {
            size: 8,
            setter: I,
            itemSize: 2
        }, X[k.GL_TYPE.INT_VEC3] = {
            size: 12,
            setter: I,
            itemSize: 3
        }, X[k.GL_TYPE.INT_VEC4] = {
            size: 16,
            setter: I,
            itemSize: 4
        }, X[k.GL_TYPE.UNSIGNED_INT] = {
            size: 4,
            setter: I,
            itemSize: 1
        }, X[k.GL_TYPE.UNSIGNED_INT_VEC2] = {
            size: 8,
            setter: I,
            itemSize: 2
        }, X[k.GL_TYPE.UNSIGNED_INT_VEC3] = {
            size: 12,
            setter: I,
            itemSize: 3
        }, X[k.GL_TYPE.UNSIGNED_INT_VEC4] = {
            size: 16,
            setter: I,
            itemSize: 4
        }, X[k.GL_TYPE.BOOL] = {
            size: 4,
            setter: I,
            itemSize: 1
        }, X[k.GL_TYPE.BOOL_VEC2] = {
            size: 8,
            setter: I,
            itemSize: 2
        }, X[k.GL_TYPE.BOOL_VEC3] = {
            size: 12,
            setter: I,
            itemSize: 3
        }, X[k.GL_TYPE.BOOL_VEC4] = {
            size: 16,
            setter: I,
            itemSize: 4
        }, X[k.GL_TYPE.FLOAT_MAT2] = {
            size: 4,
            setter: Y,
            count: 2
        }, X[k.GL_TYPE.FLOAT_MAT3] = {
            size: 9,
            setter: Y,
            count: 3
        }, X[k.GL_TYPE.FLOAT_MAT4] = {
            size: 16,
            setter: Y,
            count: 4
        }, X);
        H = {}, H[k.GL_TYPE.BYTE] = Int8Array, H[k.GL_TYPE.UNSIGNED_BYTE] = Uint8Array, 
        H[k.GL_TYPE.SHORT] = Int16Array, H[k.GL_TYPE.UNSIGNED_SHORT] = Uint16Array, H[k.GL_TYPE.INT] = Int32Array, 
        H[k.GL_TYPE.UNSIGNED_INT] = Uint32Array, H[k.GL_TYPE.FLOAT] = Float32Array, H[k.GL_TYPE.UNSIGNED_SHORT_4_4_4_4] = Uint16Array, 
        H[k.GL_TYPE.UNSIGNED_SHORT_5_5_5_1] = Uint16Array, H[k.GL_TYPE.UNSIGNED_SHORT_5_6_5] = Uint16Array, 
        H[k.GL_TYPE.HALF_FLOAT] = Uint16Array, H[k.GL_TYPE.UNSIGNED_INT_2_10_10_10_REV] = Uint32Array, 
        H[k.GL_TYPE.UNSIGNED_INT_10F_11F_11F_REV] = Uint32Array, H[k.GL_TYPE.UNSIGNED_INT_5_9_9_9_REV] = Uint32Array, 
        H[k.GL_TYPE.FLOAT_32_UNSIGNED_INT_24_8_REV] = Uint32Array, H[k.GL_TYPE.UNSIGNED_INT_24_8] = Uint32Array;
    }, function(e, t, r) {
        "use strict";
        function n(e) {
            var t = e.getContext("webgl") || e.getContext("experimental-webgl");
            if (null == t) throw Error("Webgl context cannot be initialized");
            return t;
        }
        function i(e) {
            for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
            return t.reduce(function(t, r) {
                return t | e[r.toUpperCase() + "_BUFFER_BIT"];
            }, 0);
        }
        function a(e, t) {
            e.blendFunc.apply(e, t.map(function(t) {
                return e[t.toUpperCase()];
            }));
        }
        function u(e, t) {
            void 0 === t && (t = 1), t = Math.max(1, t);
            var r = e.clientWidth * t | 0, n = e.clientHeight * t | 0;
            return (e.width !== r || e.height !== n) && (e.width = r, e.height = n, !0);
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.getContext = n, t.makeClear = i, t.setBlendFunc = a, t.resizeCanvas = u;
    }, function(e, t, r) {
        "use strict";
        function n(e) {
            return {
                clearColor: [ 0, 0, 0, 1 ],
                enable: [ e.DEPTH_TEST ],
                blendFunc: [ e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA ]
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), r.d(t, "defaultTextureSettings", function() {
            return u;
        }), t.getDefaultLayerSettings = n, r.d(t, "defaultForms", function() {
            return f;
        }), r.d(t, "defaultShaders", function() {
            return o;
        });
        var i, a = r(0), u = {
            wrap: "CLAMP_TO_EDGE",
            minFilter: "LINEAR",
            magFilter: "NEAREST"
        }, f = {
            renderQuad: {
                attribs: (i = {}, i[a.GEOMETRY_PROP_POSITION] = {
                    buffer: new Float32Array([ -1, 1, -1, -1, 1, 1, 1, -1 ]),
                    storeType: "STATIC"
                }, i[a.GEOMETRY_PROP_UV] = {
                    buffer: new Float32Array([ 0, 1, 0, 0, 1, 1, 1, 0 ]),
                    storeType: "STATIC"
                }, i),
                drawType: "TRIANGLE_STRIP",
                itemCount: 4
            }
        }, o = {
            basicEffect: {
                vert: "\n\t\t\tattribute vec2 " + a.GEOMETRY_PROP_POSITION + ";\n\t\t\tattribute vec2 " + a.GEOMETRY_PROP_UV + ";\n\t\t\tvarying vec2 " + a.VARYING_UV_COORDS + ";\n\t\t\tvoid main() {\n\t\t\t\t" + a.VARYING_UV_COORDS + " = " + a.GEOMETRY_PROP_UV + ";\n\t\t\t\tgl_Position = vec4(" + a.GEOMETRY_PROP_POSITION + ", 0.0, 1.0);\n\t\t\t}",
                frag: "precision mediump float;\n\t\t\tuniform sampler2D " + a.UNIFORM_SOURCE_TEXTURE + ";\n\t\t\tvarying vec2 " + a.VARYING_UV_COORDS + ";\n\t\t\tvoid main() {\n\t\t\t\tgl_FragColor = texture2D(" + a.UNIFORM_SOURCE_TEXTURE + ", " + a.VARYING_UV_COORDS + ");\n\t\t\t}"
            }
        };
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), r.d(t, "utils", function() {
            return _;
        }), r.d(t, "lib", function() {
            return T;
        }), r.d(t, "constants", function() {
            return E;
        }), r.d(t, "painter", function() {
            return s;
        });
        var n = r(0), i = r(5), a = r(6), u = r(2), f = r(3), o = r(7), _ = {
            geometry: {
                plane: i
            },
            stackgl: a,
            context: u
        }, T = f, E = n, s = o;
        t.default = s;
    }, function(e, t, r) {
        "use strict";
        function n(e, t, r, n) {
            var i, a, u = e / 2, f = t / 2, o = r || 1, _ = n || 1, T = o + 1, E = _ + 1, s = e / o, l = t / _, c = new Float32Array(T * E * 3), A = new Float32Array(T * E * 3), d = new Float32Array(T * E * 2), R = 0, P = 0;
            for (i = 0; i < E; i++) {
                var L = i * l - f;
                for (a = 0; a < T; a++) {
                    var S = a * s - u;
                    c[R] = S, c[R + 1] = -L, A[R + 2] = 1, d[P] = a / o, d[P + 1] = 1 - i / _, R += 3, 
                    P += 2;
                }
            }
            R = 0;
            var m = new (c.length / 3 > 65535 ? Uint32Array : Uint16Array)(o * _ * 6);
            for (i = 0; i < _; i++) for (a = 0; a < o; a++) {
                var y = a + T * i, G = a + T * (i + 1), p = a + 1 + T * (i + 1), N = a + 1 + T * i;
                m[R] = y, m[R + 1] = G, m[R + 2] = N, m[R + 3] = G, m[R + 4] = p, m[R + 5] = N, 
                R += 6;
            }
            return {
                attribs: {
                    position: {
                        buffer: c
                    },
                    normal: {
                        buffer: A
                    },
                    uv: {
                        buffer: d
                    }
                },
                elements: {
                    buffer: m
                },
                drawType: "TRIANGLES",
                itemCount: m.length
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.plane = n;
    }, function(e, t, r) {
        "use strict";
        function n(e) {
            for (var t = [], r = 0, n = e; r < n.length; r++) for (var i = n[r], a = 0, u = i; a < u.length; a++) {
                var f = u[a];
                t.push(f);
            }
            return t;
        }
        function i(e) {
            var t = {
                drawType: "TRIANGLES",
                attribs: {},
                itemCount: 0
            };
            for (var r in e) {
                var i = e[r];
                if (r === _) {
                    var T = new (i.length > 65535 ? Uint32Array : Uint16Array)(n(i));
                    Object.assign(t, {
                        elements: {
                            buffer: T
                        },
                        itemCount: T.length
                    });
                } else r === u ? t.attribs[a.GEOMETRY_PROP_POSITION] = {
                    buffer: new Float32Array(n(i))
                } : r === f ? t.attribs[a.GEOMETRY_PROP_NORMAL] = {
                    buffer: new Float32Array(n(i))
                } : r === o ? t.attribs[a.GEOMETRY_PROP_UV] = {
                    buffer: new Float32Array(n(i))
                } : t.attribs[r] = {
                    buffer: new Float32Array(n(i))
                };
            }
            return t;
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), r.d(t, "STACK_GL_GEOMETRY_PROP_POSITION", function() {
            return u;
        }), r.d(t, "STACK_GL_GEOMETRY_PROP_NORMAL", function() {
            return f;
        }), r.d(t, "STACK_GL_GEOMETRY_PROP_UV", function() {
            return o;
        }), r.d(t, "STACK_GL_GEOMETRY_PROP_ELEMENTS", function() {
            return _;
        }), t.convertStackGLGeometry = i;
        var a = r(0), u = "positions", f = "normals", o = "uvs", _ = "cells";
    }, function(e, t, r) {
        "use strict";
        function n(e) {
            var t = [ {}, {} ], r = A.getDefaultLayerSettings(e), n = _.a(e).update(A.defaultForms.renderQuad), a = function() {
                return E.a().update({
                    form: n,
                    shade: T.a(e).update(A.defaultShaders.basicEffect)
                });
            }, u = a(), f = function(r, n) {
                void 0 === r && (r = 1), void 0 === n && (n = !1);
                var i = e.canvas, a = c.resizeCanvas(i, r);
                return (a || n) && t.forEach(function(t) {
                    t.width = i.width, t.height = i.height, t.textureConfig = {
                        count: 1,
                        type: e.UNSIGNED_BYTE
                    }, l.h(e, t, A.defaultTextureSettings);
                }), a;
            };
            f(1, !0);
            var R = function() {
                u.destroy();
                for (var r = 0, n = t; r < n.length; r++) {
                    var i = n[r];
                    l.d(e, i);
                }
            };
            return {
                gl: e,
                updateDrawSettings: function(t) {
                    return l.a(e, d({}, r, t));
                },
                createForm: function() {
                    return _.a(e);
                },
                createShade: function() {
                    return T.a(e);
                },
                createSketch: function() {
                    return E.a();
                },
                createFlatSketch: a,
                createStaticLayer: function() {
                    return s.b(e);
                },
                createDrawingLayer: function() {
                    return s.a(e);
                },
                createEffectLayer: function() {
                    return s.a(e).update({
                        sketches: [ a() ]
                    });
                },
                draw: function(t, r) {
                    return i(e, t, null, r);
                },
                compose: function() {
                    for (var r = [], n = 0; n < arguments.length; n++) r[n] = arguments[n];
                    return o(e, r, t, u);
                },
                resize: f,
                destroy: R
            };
        }
        function i(e, t, r, n) {
            var i = t.shade, o = t.uniforms, _ = t.form, T = t.drawSettings;
            if (!i || !_) throw Error("cannot draw, shader or geometry are not set");
            if (e.useProgram(i.program), u(i, _), n && f(i, n, r), T && l.a(e, T), Array.isArray(o)) for (var E = 0, s = o; E < s.length; E++) {
                var c = s[E];
                a(e, t, r, c);
            } else a(e, t, r, o);
            T && l.f(e, T);
        }
        function a(e, t, r, n) {
            n && f(t.shade, n, r), t.form.elements && null != t.form.elements.glType ? (e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t.form.elements.buffer), 
            e.drawElements(t.form.drawType, t.form.itemCount, t.form.elements.glType, 0)) : e.drawArrays(t.form.drawType, 0, t.form.itemCount);
        }
        function u(e, t) {
            for (var r in t.attribs) {
                var n = e.attributeSetters[r];
                n && n.setter(t.attribs[r]);
            }
        }
        function f(e, t, r) {
            for (var n in t) {
                var i = e.uniformSetters[n];
                if (i) {
                    var a = t[n];
                    null === a || "string" == typeof a ? i.setter(r) : i.setter(a);
                }
            }
        }
        function o(e, t, r, n) {
            for (var a = t.length - 1, u = 0; u < t.length; u++) !function(u) {
                var f = t[u], o = function(t, a) {
                    var u = r[0], o = r[1], _ = !a && null == f.target;
                    if (a ? (e.bindFramebuffer(e.FRAMEBUFFER, null), e.viewport(0, 0, e.drawingBufferWidth, e.drawingBufferHeight)) : f.target ? (e.bindFramebuffer(e.FRAMEBUFFER, f.target.frameBuffer), 
                    e.viewport(0, 0, f.target.width, f.target.height)) : (e.bindFramebuffer(e.FRAMEBUFFER, o.frameBuffer), 
                    e.viewport(0, 0, e.drawingBufferWidth, e.drawingBufferHeight)), f.data.drawSettings && l.a(e, f.data.drawSettings), 
                    f.sketches) for (var T = 0, E = f.sketches; T < E.length; T++) {
                        var s = E[T];
                        i(e, s, u.textures[0], t);
                    } else i(e, n, null, {
                        source: f.texture()
                    });
                    f.data.drawSettings && l.f(e, f.data.drawSettings), _ && (r[0] = o, r[1] = u);
                };
                if (Array.isArray(f.uniforms)) for (var _ = a + f.uniforms.length - 1, T = 0; T < f.uniforms.length; T++) {
                    var E = u + T === _;
                    o(f.uniforms[T], E);
                } else {
                    var E = u === a;
                    o(f.uniforms, E);
                }
            }(u);
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.create = n;
        var _ = r(8), T = r(9), E = r(10), s = r(11), l = r(1), c = r(2), A = r(3), d = this && this.__assign || Object.assign || function(e) {
            for (var t, r = 1, n = arguments.length; r < n; r++) {
                t = arguments[r];
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
        };
    }, function(e, t, r) {
        "use strict";
        function n(e) {
            var t = {};
            return t.update = function(r) {
                r.drawType && (t.drawType = e[r.drawType]), r.itemCount && (t.itemCount = r.itemCount);
                var n = t.attribs || {};
                for (var a in r.attribs) {
                    var u = r.attribs[a];
                    null == n[a] && (n[a] = {
                        buffer: e.createBuffer()
                    }), e.bindBuffer(e.ARRAY_BUFFER, n[a].buffer), e.bufferData(e.ARRAY_BUFFER, u.buffer, e[(u.storeType || "STATIC") + "_DRAW"]);
                }
                if (t.attribs = n, r.elements) {
                    var f = r.elements.buffer;
                    null == t.elements && (t.elements = {
                        buffer: e.createBuffer(),
                        glType: null
                    }), t.elements.glType = i.e(f), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t.elements.buffer), 
                    e.bufferData(e.ELEMENT_ARRAY_BUFFER, f, e[(r.elements.storeType || "STATIC") + "_DRAW"]);
                }
                return t;
            }, t.destroy = function() {
                for (var r in t.attribs) e.deleteBuffer(t.attribs[r].buffer);
                return t.elements && e.deleteBuffer(t.elements.buffer), t;
            }, t;
        }
        t.a = n;
        var i = r(1);
    }, function(e, t, r) {
        "use strict";
        function n(e) {
            var t = {
                program: e.createProgram(),
                frag: e.createShader(e.FRAGMENT_SHADER),
                vert: e.createShader(e.VERTEX_SHADER)
            };
            return e.attachShader(t.program, t.vert), e.attachShader(t.program, t.frag), t.update = function(r) {
                var n = r.frag && r.frag.trim() || t.fragSource, u = r.vert && r.vert.trim() || t.vertSource;
                if (!n || !u) return t;
                if (n.indexOf("GL_EXT_draw_buffers") >= 0 && e.getExtension("WEBGL_draw_buffers"), 
                e.shaderSource(t.vert, u), e.shaderSource(t.frag, n), e.compileShader(t.vert), e.compileShader(t.frag), 
                e.getShaderParameter(t.vert, e.COMPILE_STATUS) || console.error("Error Compiling Vertex Shader!\n", e.getShaderInfoLog(t.vert), i(u)), 
                e.getShaderParameter(t.frag, e.COMPILE_STATUS) || console.error("Error Compiling Fragment Shader!\n", e.getShaderInfoLog(t.frag), i(n)), 
                e.linkProgram(t.program), !e.getProgramParameter(t.program, e.LINK_STATUS)) {
                    var f = e.getProgramInfoLog(t.program);
                    console.error("Error in program linking:", f);
                }
                return t.uniformSetters = a.c(e, t.program), t.attributeSetters = a.b(e, t.program), 
                t.fragSource = n, t.vertSource = u, t;
            }, t.destroy = function() {
                e.deleteProgram(t.program), e.deleteShader(t.frag), e.deleteShader(t.vert);
            }, t;
        }
        function i(e) {
            return e.trim().split("\n").map(function(e, t) {
                return t + 1 + ": " + e;
            }).join("\n");
        }
        t.a = n;
        var a = r(1);
    }, function(e, t, r) {
        "use strict";
        function n() {
            var e = {};
            return e.update = function(t) {
                return t.drawSettings && (e.drawSettings = t.drawSettings), t.form && (e.form = t.form), 
                t.shade && (e.shade = t.shade), t.uniforms && (e.uniforms = t.uniforms), e;
            }, e.destroy = function() {
                e.form.destroy(), e.shade.destroy();
            }, e;
        }
        t.a = n;
    }, function(e, t, r) {
        "use strict";
        function n(e) {
            var t = {}, r = e.createTexture();
            return t.textures = [ r ], t.data = {}, t.texture = function() {
                return r;
            }, t.update = function(n) {
                return e.bindTexture(e.TEXTURE_2D, r), a.g(e, n, t.data), n.asset && e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, n.asset), 
                n.minFilter && n.minFilter.indexOf("MIPMAP") > 0 && e.generateMipmap(e.TEXTURE_2D), 
                e.bindTexture(e.TEXTURE_2D, null), Object.assign(t.data, n), t;
            }, t.destroy = function() {
                e.deleteTexture(r);
            }, t;
        }
        function i(e) {
            var t = {};
            return t.textures = [], t.data = {}, t.texture = function(e) {
                return void 0 === e && (e = 0), t.textures[e];
            }, t.update = function(r) {
                if (r.buffered && !t.target ? (t.target = {
                    width: r.width || e.canvas.width,
                    height: r.height || e.canvas.height,
                    frameBuffer: null,
                    textures: [],
                    depthBuffer: null,
                    textureConfig: {
                        type: r.textureConfig && r.textureConfig.type || e.UNSIGNED_BYTE,
                        count: r.textureConfig && r.textureConfig.count || 1
                    }
                }, a.h(e, t.target, r, t.data), t.textures = t.target.textures) : t.target && r.width && r.height && (t.target.width = r.width, 
                t.target.height = r.height, a.h(e, t.target, r, t.data)), r.sketches && (t.sketches = r.sketches), 
                r.frag) {
                    var n = t.sketches && t.sketches[0];
                    n && n.shade.update({
                        frag: r.frag
                    });
                }
                return r.uniforms && (t.uniforms = r.uniforms), Object.assign(t.data, r), t;
            }, t.destroy = function() {
                if (t.sketches) for (var r = 0, n = t.sketches; r < n.length; r++) {
                    var i = n[r];
                    i.destroy();
                }
                if (t.target) a.d(e, t.target); else for (var u = 0, f = t.textures; u < f.length; u++) {
                    var o = f[u];
                    e.deleteTexture(o);
                }
            }, t;
        }
        t.b = n, t.a = i;
        var a = r(1);
    } ]);
});