!function(e, r) {
    "object" == typeof exports && "object" == typeof module ? module.exports = r() : "function" == typeof define && define.amd ? define([], r) : "object" == typeof exports ? exports.tvsRenderer = r() : e.tvsRenderer = r();
}(this, function() {
    return function(e) {
        function r(n) {
            if (t[n]) return t[n].exports;
            var i = t[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(i.exports, i, i.exports, r), i.l = !0, i.exports;
        }
        var t = {};
        return r.m = e, r.c = t, r.d = function(e, t, n) {
            r.o(e, t) || Object.defineProperty(e, t, {
                configurable: !1,
                enumerable: !0,
                get: n
            });
        }, r.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default;
            } : function() {
                return e;
            };
            return r.d(t, "a", t), t;
        }, r.o = function(e, r) {
            return Object.prototype.hasOwnProperty.call(e, r);
        }, r.p = "", r(r.s = 3);
    }([ function(e, r, t) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), t.d(r, "GEOMETRY_PROP_POSITION", function() {
            return n;
        }), t.d(r, "GEOMETRY_PROP_NORMAL", function() {
            return i;
        }), t.d(r, "GEOMETRY_PROP_UV", function() {
            return a;
        }), t.d(r, "UNIFORM_SOURCE_TEXTURE", function() {
            return u;
        }), t.d(r, "VARYING_UV_COORDS", function() {
            return f;
        }), t.d(r, "GL_TYPE", function() {
            return _;
        });
        var n = "position", i = "normal", a = "uv", u = "source", f = "coords", _ = {
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
    }, function(e, r, t) {
        "use strict";
        function n(e) {
            return k[e].bindPoint;
        }
        function i(e, r) {
            return function(t) {
                e.uniform1f(r, t);
            };
        }
        function a(e, r) {
            return function(t) {
                e.uniform1fv(r, t);
            };
        }
        function u(e, r) {
            return function(t) {
                e.uniform2fv(r, t);
            };
        }
        function f(e, r) {
            return function(t) {
                e.uniform3fv(r, t);
            };
        }
        function _(e, r) {
            return function(t) {
                e.uniform4fv(r, t);
            };
        }
        function o(e, r) {
            return function(t) {
                e.uniform1i(r, t);
            };
        }
        function T(e, r) {
            return function(t) {
                e.uniform1iv(r, t);
            };
        }
        function E(e, r) {
            return function(t) {
                e.uniform2iv(r, t);
            };
        }
        function s(e, r) {
            return function(t) {
                e.uniform3iv(r, t);
            };
        }
        function l(e, r) {
            return function(t) {
                e.uniform4iv(r, t);
            };
        }
        function c(e, r) {
            return function(t) {
                e.uniform1ui(r, t);
            };
        }
        function A(e, r) {
            return function(t) {
                e.uniform1uiv(r, t);
            };
        }
        function R(e, r) {
            return function(t) {
                e.uniform2uiv(r, t);
            };
        }
        function d(e, r) {
            return function(t) {
                e.uniform3uiv(r, t);
            };
        }
        function P(e, r) {
            return function(t) {
                e.uniform4uiv(r, t);
            };
        }
        function L(e, r) {
            return function(t) {
                e.uniformMatrix2fv(r, !1, t);
            };
        }
        function S(e, r) {
            return function(t) {
                e.uniformMatrix3fv(r, !1, t);
            };
        }
        function m(e, r) {
            return function(t) {
                e.uniformMatrix4fv(r, !1, t);
            };
        }
        function G(e, r) {
            return function(t) {
                e.uniformMatrix2x3fv(r, !1, t);
            };
        }
        function N(e, r) {
            return function(t) {
                e.uniformMatrix3x2fv(r, !1, t);
            };
        }
        function y(e, r) {
            return function(t) {
                e.uniformMatrix2x4fv(r, !1, t);
            };
        }
        function p(e, r) {
            return function(t) {
                e.uniformMatrix4x2fv(r, !1, t);
            };
        }
        function O(e, r) {
            return function(t) {
                e.uniformMatrix3x4fv(r, !1, t);
            };
        }
        function U(e, r) {
            return function(t) {
                e.uniformMatrix4x3fv(r, !1, t);
            };
        }
        function g(e, r, t, i) {
            var a = n(r);
            return function(r) {
                e.uniform1i(i, t), e.activeTexture(e.TEXTURE0 + t), e.bindTexture(a, r);
            };
        }
        function F(e, r, t, i, a) {
            for (var u = n(r), f = new Int32Array(a), _ = 0; _ < a; ++_) f[_] = t + _;
            return function(r) {
                e.uniform1iv(i, f);
                for (var t in r) e.activeTexture(e.TEXTURE0 + f[t]), e.bindTexture(u, r[t]);
            };
        }
        function v(e) {
            return null === e.Type;
        }
        function I(e, r, t) {
            return function(n) {
                e.bindBuffer(e.ARRAY_BUFFER, n.buffer), e.enableVertexAttribArray(r), e.vertexAttribPointer(r, t.itemSize, H.GL_TYPE.FLOAT, n.normalize || !1, n.stride || 0, n.offset || 0);
            };
        }
        function b(e, r, t) {
            return function(n) {
                e.bindBuffer(e.ARRAY_BUFFER, n.buffer), e.enableVertexAttribArray(r), e.vertexAttribIPointer(r, t.itemSize, H.GL_TYPE.INT, n.stride || 0, n.offset || 0);
            };
        }
        function Y(e, r, t) {
            var n = t.size, i = t.count;
            return function(t) {
                e.bindBuffer(e.ARRAY_BUFFER, t.buffer);
                for (var a = n, u = a / i, f = k[H.GL_TYPE.FLOAT], _ = f.size * a, o = t.normalize || !1, T = t.offset || 0, E = _ / i, s = 0; s < i; ++s) e.enableVertexAttribArray(r + s), 
                e.vertexAttribPointer(r + s, u, H.GL_TYPE.FLOAT, o, _, T + E * s);
            };
        }
        function h(e, r) {
            for (var t = 0, n = {}, i = e.getProgramParameter(r, e.ACTIVE_UNIFORMS), a = 0; a < i; ++a) {
                var u = e.getActiveUniform(r, a);
                if (!u) break;
                var f = u.name;
                if ("[0]" === f.substr(-3) && (f = f.substr(0, f.length - 3)), r) {
                    var _ = function(r, n) {
                        var i = e.getUniformLocation(r, n.name), a = n.size > 1 && "[0]" === n.name.substr(-3), u = n.type, f = k[u];
                        if (!f) throw "unknown type: 0x" + u.toString(16);
                        if (null != i) {
                            var _;
                            if (v(f)) {
                                var o = t;
                                t += n.size, _ = a ? f.arraySetter(e, u, o, i, n.size) : f.setter(e, u, o, i);
                            } else _ = f.arraySetter && a ? f.arraySetter(e, i) : f.setter(e, i);
                            return {
                                setter: _,
                                location: i
                            };
                        }
                    }(r, u);
                    _ && (n[f] = _);
                }
            }
            return n;
        }
        function D(e, r) {
            for (var t = {}, n = e.getProgramParameter(r, e.ACTIVE_ATTRIBUTES), i = 0; i < n; i++) {
                var a = e.getActiveAttrib(r, i);
                if (!a) break;
                var u = e.getAttribLocation(r, a.name), f = W[a.type], _ = f.setter(e, u, f);
                t[a.name] = {
                    setter: _,
                    location: u
                };
            }
            return t;
        }
        function M(e) {
            if (e instanceof Int8Array) return H.GL_TYPE.BYTE;
            if (e instanceof Uint8Array) return H.GL_TYPE.UNSIGNED_BYTE;
            if (e instanceof Uint8ClampedArray) return H.GL_TYPE.UNSIGNED_BYTE;
            if (e instanceof Int16Array) return H.GL_TYPE.SHORT;
            if (e instanceof Uint16Array) return H.GL_TYPE.UNSIGNED_SHORT;
            if (e instanceof Int32Array) return H.GL_TYPE.INT;
            if (e instanceof Uint32Array) return H.GL_TYPE.UNSIGNED_INT;
            if (e instanceof Float32Array) return H.GL_TYPE.FLOAT;
            throw "unsupported typed array type";
        }
        function C(e, r, t) {
            if (void 0 === r && (r = {}), void 0 === t && (t = {}), null != r.flipY && r.flipY !== t.flipY && e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, r.flipY), 
            r.wrap && r.wrap !== t.wrap || r.wrapS && r.wrapS !== t.wrapS || r.wrapT && r.wrapT !== t.wrapT) {
                var n = void 0, i = void 0;
                r.wrap ? n = i = r.wrap : (i = r.wrapT || "CLAMP_TO_EDGE", n = r.wrapS || "CLAMP_TO_EDGE"), 
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e[n]), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e[i]);
            }
            r.magFilter && r.magFilter !== t.magFilter && e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e[r.magFilter]), 
            r.minFilter && r.minFilter !== t.minFilter && e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e[r.minFilter]);
        }
        function B(e, r, t, n) {
            if (null != r.width && null != r.height) {
                null == r.frameBuffer && (r.frameBuffer = e.createFramebuffer()), r.textures || (r.textures = []), 
                e.bindFramebuffer(e.FRAMEBUFFER, r.frameBuffer), r.textureConfig.type === e.FLOAT && e.getExtension("OES_texture_float");
                var i = r.textureConfig.count;
                if (i > 1) {
                    for (var a = e.getExtension("WEBGL_draw_buffers"), u = [], f = 0; f < i; f++) u.push(a["COLOR_ATTACHMENT" + f + "_WEBGL"]);
                    a.drawBuffersWEBGL(u);
                    for (var f = 0; f < i; f++) {
                        null == r.textures[f] && (r.textures[f] = e.createTexture());
                        var _ = r.textures[f];
                        e.bindTexture(e.TEXTURE_2D, _), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, r.width, r.height, 0, e.RGBA, r.textureConfig.type, null), 
                        C(e, t, n), e.framebufferTexture2D(e.FRAMEBUFFER, u[f], e.TEXTURE_2D, _, 0);
                    }
                } else {
                    null == r.textures[0] && (r.textures[0] = e.createTexture());
                    var _ = r.textures[0];
                    e.bindTexture(e.TEXTURE_2D, _), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, r.width, r.height, 0, e.RGBA, r.textureConfig.type, null), 
                    C(e, t, n), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, _, 0);
                }
                null == r.depthBuffer && (r.depthBuffer = e.createRenderbuffer()), e.bindRenderbuffer(e.RENDERBUFFER, r.depthBuffer), 
                e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_COMPONENT16, r.width, r.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.RENDERBUFFER, r.depthBuffer);
                var o = e.checkFramebufferStatus(e.FRAMEBUFFER);
                o !== e.FRAMEBUFFER_COMPLETE && console.error("framebuffer error", o, t), e.bindFramebuffer(e.FRAMEBUFFER, null), 
                e.bindTexture(e.TEXTURE_2D, null), e.bindRenderbuffer(e.RENDERBUFFER, null);
            }
        }
        function x(e, r) {
            if (r.enable) for (var t = 0, n = r.enable; t < n.length; t++) {
                var i = n[t];
                e.enable(i);
            }
            if (r.disable) for (var a = 0, u = r.disable; a < u.length; a++) {
                var i = u[a];
                e.disable(i);
            }
            r.blendFunc && e.blendFunc.apply(e, r.blendFunc), null != r.depthFunc && e.depthFunc(r.depthFunc), 
            null != r.cullFace && e.cullFace(r.cullFace), null != r.frontFace && e.frontFace(r.frontFace), 
            null != r.lineWidth && e.lineWidth(r.lineWidth), r.colorMask && e.colorMask.apply(e, r.colorMask), 
            null != r.depthMask && e.depthMask(r.depthMask), r.clearColor && e.clearColor.apply(e, r.clearColor), 
            null != r.clearDepth && e.clearDepth(r.clearDepth), null != r.clearBits && e.clear(r.clearBits);
        }
        function z(e, r) {
            if (r.enable) for (var t = 0, n = r.enable; t < n.length; t++) {
                var i = n[t];
                e.disable(i);
            }
            if (r.disable) for (var a = 0, u = r.disable; a < u.length; a++) {
                var i = u[a];
                e.enable(i);
            }
        }
        r.c = h, r.b = D, r.d = M, r.f = C, r.g = B, r.a = x, r.e = z;
        var w, V, X, H = t(0), k = (w = {}, w[H.GL_TYPE.FLOAT] = {
            Type: Float32Array,
            size: 4,
            setter: i,
            arraySetter: a
        }, w[H.GL_TYPE.FLOAT_VEC2] = {
            Type: Float32Array,
            size: 8,
            setter: u
        }, w[H.GL_TYPE.FLOAT_VEC3] = {
            Type: Float32Array,
            size: 12,
            setter: f
        }, w[H.GL_TYPE.FLOAT_VEC4] = {
            Type: Float32Array,
            size: 16,
            setter: _
        }, w[H.GL_TYPE.INT] = {
            Type: Int32Array,
            size: 4,
            setter: o,
            arraySetter: T
        }, w[H.GL_TYPE.INT_VEC2] = {
            Type: Int32Array,
            size: 8,
            setter: E
        }, w[H.GL_TYPE.INT_VEC3] = {
            Type: Int32Array,
            size: 12,
            setter: s
        }, w[H.GL_TYPE.INT_VEC4] = {
            Type: Int32Array,
            size: 16,
            setter: l
        }, w[H.GL_TYPE.UNSIGNED_INT] = {
            Type: Uint32Array,
            size: 4,
            setter: c,
            arraySetter: A
        }, w[H.GL_TYPE.UNSIGNED_INT_VEC2] = {
            Type: Uint32Array,
            size: 8,
            setter: R
        }, w[H.GL_TYPE.UNSIGNED_INT_VEC3] = {
            Type: Uint32Array,
            size: 12,
            setter: d
        }, w[H.GL_TYPE.UNSIGNED_INT_VEC4] = {
            Type: Uint32Array,
            size: 16,
            setter: P
        }, w[H.GL_TYPE.BOOL] = {
            Type: Uint32Array,
            size: 4,
            setter: o,
            arraySetter: T
        }, w[H.GL_TYPE.BOOL_VEC2] = {
            Type: Uint32Array,
            size: 8,
            setter: E
        }, w[H.GL_TYPE.BOOL_VEC3] = {
            Type: Uint32Array,
            size: 12,
            setter: s
        }, w[H.GL_TYPE.BOOL_VEC4] = {
            Type: Uint32Array,
            size: 16,
            setter: l
        }, w[H.GL_TYPE.FLOAT_MAT2] = {
            Type: Float32Array,
            size: 16,
            setter: L
        }, w[H.GL_TYPE.FLOAT_MAT3] = {
            Type: Float32Array,
            size: 36,
            setter: S
        }, w[H.GL_TYPE.FLOAT_MAT4] = {
            Type: Float32Array,
            size: 64,
            setter: m
        }, w[H.GL_TYPE.FLOAT_MAT2X3] = {
            Type: Float32Array,
            size: 24,
            setter: G
        }, w[H.GL_TYPE.FLOAT_MAT2X4] = {
            Type: Float32Array,
            size: 32,
            setter: y
        }, w[H.GL_TYPE.FLOAT_MAT3X2] = {
            Type: Float32Array,
            size: 24,
            setter: N
        }, w[H.GL_TYPE.FLOAT_MAT3X4] = {
            Type: Float32Array,
            size: 48,
            setter: O
        }, w[H.GL_TYPE.FLOAT_MAT4X2] = {
            Type: Float32Array,
            size: 32,
            setter: p
        }, w[H.GL_TYPE.FLOAT_MAT4X3] = {
            Type: Float32Array,
            size: 48,
            setter: U
        }, w[H.GL_TYPE.SAMPLER_2D] = {
            Type: null,
            size: 0,
            setter: g,
            arraySetter: F,
            bindPoint: H.GL_TYPE.TEXTURE_2D
        }, w[H.GL_TYPE.SAMPLER_CUBE] = {
            Type: null,
            size: 0,
            setter: g,
            arraySetter: F,
            bindPoint: H.GL_TYPE.TEXTURE_CUBE_MAP
        }, w[H.GL_TYPE.SAMPLER_3D] = {
            Type: null,
            size: 0,
            setter: g,
            arraySetter: F,
            bindPoint: H.GL_TYPE.TEXTURE_3D
        }, w[H.GL_TYPE.SAMPLER_2D_SHADOW] = {
            Type: null,
            size: 0,
            setter: g,
            arraySetter: F,
            bindPoint: H.GL_TYPE.TEXTURE_2D
        }, w[H.GL_TYPE.SAMPLER_2D_ARRAY] = {
            Type: null,
            size: 0,
            setter: g,
            arraySetter: F,
            bindPoint: H.GL_TYPE.TEXTURE_2D_ARRAY
        }, w[H.GL_TYPE.SAMPLER_2D_ARRAY_SHADOW] = {
            Type: null,
            size: 0,
            setter: g,
            arraySetter: F,
            bindPoint: H.GL_TYPE.TEXTURE_2D_ARRAY
        }, w[H.GL_TYPE.SAMPLER_CUBE_SHADOW] = {
            Type: null,
            size: 0,
            setter: g,
            arraySetter: F,
            bindPoint: H.GL_TYPE.TEXTURE_CUBE_MAP
        }, w[H.GL_TYPE.INT_SAMPLER_2D] = {
            Type: null,
            size: 0,
            setter: g,
            arraySetter: F,
            bindPoint: H.GL_TYPE.TEXTURE_2D
        }, w[H.GL_TYPE.INT_SAMPLER_3D] = {
            Type: null,
            size: 0,
            setter: g,
            arraySetter: F,
            bindPoint: H.GL_TYPE.TEXTURE_3D
        }, w[H.GL_TYPE.INT_SAMPLER_CUBE] = {
            Type: null,
            size: 0,
            setter: g,
            arraySetter: F,
            bindPoint: H.GL_TYPE.TEXTURE_CUBE_MAP
        }, w[H.GL_TYPE.INT_SAMPLER_2D_ARRAY] = {
            Type: null,
            size: 0,
            setter: g,
            arraySetter: F,
            bindPoint: H.GL_TYPE.TEXTURE_2D_ARRAY
        }, w[H.GL_TYPE.UNSIGNED_INT_SAMPLER_2D] = {
            Type: null,
            size: 0,
            setter: g,
            arraySetter: F,
            bindPoint: H.GL_TYPE.TEXTURE_2D
        }, w[H.GL_TYPE.UNSIGNED_INT_SAMPLER_3D] = {
            Type: null,
            size: 0,
            setter: g,
            arraySetter: F,
            bindPoint: H.GL_TYPE.TEXTURE_3D
        }, w[H.GL_TYPE.UNSIGNED_INT_SAMPLER_CUBE] = {
            Type: null,
            size: 0,
            setter: g,
            arraySetter: F,
            bindPoint: H.GL_TYPE.TEXTURE_CUBE_MAP
        }, w[H.GL_TYPE.UNSIGNED_INT_SAMPLER_2D_ARRAY] = {
            Type: null,
            size: 0,
            setter: g,
            arraySetter: F,
            bindPoint: H.GL_TYPE.TEXTURE_2D_ARRAY
        }, w), W = (V = {}, V[H.GL_TYPE.FLOAT] = {
            size: 4,
            setter: I,
            itemSize: 1
        }, V[H.GL_TYPE.FLOAT_VEC2] = {
            size: 8,
            setter: I,
            itemSize: 2
        }, V[H.GL_TYPE.FLOAT_VEC3] = {
            size: 12,
            setter: I,
            itemSize: 3
        }, V[H.GL_TYPE.FLOAT_VEC4] = {
            size: 16,
            setter: I,
            itemSize: 4
        }, V[H.GL_TYPE.INT] = {
            size: 4,
            setter: b,
            itemSize: 1
        }, V[H.GL_TYPE.INT_VEC2] = {
            size: 8,
            setter: b,
            itemSize: 2
        }, V[H.GL_TYPE.INT_VEC3] = {
            size: 12,
            setter: b,
            itemSize: 3
        }, V[H.GL_TYPE.INT_VEC4] = {
            size: 16,
            setter: b,
            itemSize: 4
        }, V[H.GL_TYPE.UNSIGNED_INT] = {
            size: 4,
            setter: b,
            itemSize: 1
        }, V[H.GL_TYPE.UNSIGNED_INT_VEC2] = {
            size: 8,
            setter: b,
            itemSize: 2
        }, V[H.GL_TYPE.UNSIGNED_INT_VEC3] = {
            size: 12,
            setter: b,
            itemSize: 3
        }, V[H.GL_TYPE.UNSIGNED_INT_VEC4] = {
            size: 16,
            setter: b,
            itemSize: 4
        }, V[H.GL_TYPE.BOOL] = {
            size: 4,
            setter: b,
            itemSize: 1
        }, V[H.GL_TYPE.BOOL_VEC2] = {
            size: 8,
            setter: b,
            itemSize: 2
        }, V[H.GL_TYPE.BOOL_VEC3] = {
            size: 12,
            setter: b,
            itemSize: 3
        }, V[H.GL_TYPE.BOOL_VEC4] = {
            size: 16,
            setter: b,
            itemSize: 4
        }, V[H.GL_TYPE.FLOAT_MAT2] = {
            size: 4,
            setter: Y,
            count: 2
        }, V[H.GL_TYPE.FLOAT_MAT3] = {
            size: 9,
            setter: Y,
            count: 3
        }, V[H.GL_TYPE.FLOAT_MAT4] = {
            size: 16,
            setter: Y,
            count: 4
        }, V);
        X = {}, X[H.GL_TYPE.BYTE] = Int8Array, X[H.GL_TYPE.UNSIGNED_BYTE] = Uint8Array, 
        X[H.GL_TYPE.SHORT] = Int16Array, X[H.GL_TYPE.UNSIGNED_SHORT] = Uint16Array, X[H.GL_TYPE.INT] = Int32Array, 
        X[H.GL_TYPE.UNSIGNED_INT] = Uint32Array, X[H.GL_TYPE.FLOAT] = Float32Array, X[H.GL_TYPE.UNSIGNED_SHORT_4_4_4_4] = Uint16Array, 
        X[H.GL_TYPE.UNSIGNED_SHORT_5_5_5_1] = Uint16Array, X[H.GL_TYPE.UNSIGNED_SHORT_5_6_5] = Uint16Array, 
        X[H.GL_TYPE.HALF_FLOAT] = Uint16Array, X[H.GL_TYPE.UNSIGNED_INT_2_10_10_10_REV] = Uint32Array, 
        X[H.GL_TYPE.UNSIGNED_INT_10F_11F_11F_REV] = Uint32Array, X[H.GL_TYPE.UNSIGNED_INT_5_9_9_9_REV] = Uint32Array, 
        X[H.GL_TYPE.FLOAT_32_UNSIGNED_INT_24_8_REV] = Uint32Array, X[H.GL_TYPE.UNSIGNED_INT_24_8] = Uint32Array;
    }, function(e, r, t) {
        "use strict";
        function n(e) {
            return {
                clearColor: [ 0, 0, 0, 1 ],
                enable: [ e.DEPTH_TEST ],
                blendFunc: [ e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA ]
            };
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), t.d(r, "defaultTextureSettings", function() {
            return u;
        }), r.getDefaultLayerSettings = n, t.d(r, "defaultForms", function() {
            return f;
        }), t.d(r, "defaultShaders", function() {
            return _;
        });
        var i, a = t(0), u = {
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
        }, _ = {
            basicEffect: {
                vert: "\n\t\t\tattribute vec2 " + a.GEOMETRY_PROP_POSITION + ";\n\t\t\tattribute vec2 " + a.GEOMETRY_PROP_UV + ";\n\t\t\tvarying vec2 " + a.VARYING_UV_COORDS + ";\n\t\t\tvoid main() {\n\t\t\t\t" + a.VARYING_UV_COORDS + " = " + a.GEOMETRY_PROP_UV + ";\n\t\t\t\tgl_Position = vec4(" + a.GEOMETRY_PROP_POSITION + ", 0.0, 1.0);\n\t\t\t}",
                frag: "precision mediump float;\n\t\t\tuniform sampler2D " + a.UNIFORM_SOURCE_TEXTURE + ";\n\t\t\tvarying vec2 " + a.VARYING_UV_COORDS + ";\n\t\t\tvoid main() {\n\t\t\t\tgl_FragColor = texture2D(" + a.UNIFORM_SOURCE_TEXTURE + ", " + a.VARYING_UV_COORDS + ");\n\t\t\t}"
            }
        };
    }, function(e, r, t) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), t.d(r, "utils", function() {
            return _;
        }), t.d(r, "lib", function() {
            return o;
        }), t.d(r, "constants", function() {
            return T;
        }), t.d(r, "painter", function() {
            return E;
        });
        var n = t(0), i = t(4), a = t(5), u = t(2), f = t(6), _ = {
            geometry: {
                plane: i
            },
            stackgl: a
        }, o = u, T = n, E = f;
        r.default = E;
    }, function(e, r, t) {
        "use strict";
        function n(e, r, t, n) {
            var i, a, u = e / 2, f = r / 2, _ = t || 1, o = n || 1, T = _ + 1, E = o + 1, s = e / _, l = r / o, c = new Float32Array(T * E * 3), A = new Float32Array(T * E * 3), R = new Float32Array(T * E * 2), d = 0, P = 0;
            for (i = 0; i < E; i++) {
                var L = i * l - f;
                for (a = 0; a < T; a++) {
                    var S = a * s - u;
                    c[d] = S, c[d + 1] = -L, A[d + 2] = 1, R[P] = a / _, R[P + 1] = 1 - i / o, d += 3, 
                    P += 2;
                }
            }
            d = 0;
            var m = new (c.length / 3 > 65535 ? Uint32Array : Uint16Array)(_ * o * 6);
            for (i = 0; i < o; i++) for (a = 0; a < _; a++) {
                var G = a + T * i, N = a + T * (i + 1), y = a + 1 + T * (i + 1), p = a + 1 + T * i;
                m[d] = G, m[d + 1] = N, m[d + 2] = p, m[d + 3] = N, m[d + 4] = y, m[d + 5] = p, 
                d += 6;
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
                        buffer: R
                    }
                },
                elements: {
                    buffer: m
                },
                drawType: "TRIANGLES",
                itemCount: m.length
            };
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.plane = n;
    }, function(e, r, t) {
        "use strict";
        function n(e) {
            for (var r = [], t = 0, n = e; t < n.length; t++) for (var i = n[t], a = 0, u = i; a < u.length; a++) {
                var f = u[a];
                r.push(f);
            }
            return r;
        }
        function i(e) {
            var r = {
                drawType: "TRIANGLES",
                attribs: {},
                itemCount: 0
            };
            for (var t in e) {
                var i = e[t];
                if (t === o) {
                    var T = new (i.length > 65535 ? Uint32Array : Uint16Array)(n(i));
                    Object.assign(r, {
                        elements: {
                            buffer: T
                        },
                        itemCount: T.length
                    });
                } else t === u ? r.attribs[a.GEOMETRY_PROP_POSITION] = {
                    buffer: new Float32Array(n(i))
                } : t === f ? r.attribs[a.GEOMETRY_PROP_NORMAL] = {
                    buffer: new Float32Array(n(i))
                } : t === _ ? r.attribs[a.GEOMETRY_PROP_UV] = {
                    buffer: new Float32Array(n(i))
                } : r.attribs[t] = {
                    buffer: new Float32Array(n(i))
                };
            }
            return r;
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), t.d(r, "STACK_GL_GEOMETRY_PROP_POSITION", function() {
            return u;
        }), t.d(r, "STACK_GL_GEOMETRY_PROP_NORMAL", function() {
            return f;
        }), t.d(r, "STACK_GL_GEOMETRY_PROP_UV", function() {
            return _;
        }), t.d(r, "STACK_GL_GEOMETRY_PROP_ELEMENTS", function() {
            return o;
        }), r.convertStackGLGeometry = i;
        var a = t(0), u = "positions", f = "normals", _ = "uvs", o = "cells";
    }, function(e, r, t) {
        "use strict";
        function n(e) {
            var r = [ {}, {} ], t = A.getDefaultLayerSettings(e), n = o.a(e).update(A.defaultForms.renderQuad), a = function() {
                return E.a().update({
                    form: n,
                    shade: T.a(e).update(A.defaultShaders.basicEffect)
                });
            }, u = a(), f = function(t, n) {
                void 0 === t && (t = 1), void 0 === n && (n = !1);
                var i = e.canvas, a = c.a(i, t);
                return (a || n) && r.forEach(function(r) {
                    r.width = i.width, r.height = i.height, r.textureConfig = {
                        count: 1,
                        type: e.UNSIGNED_BYTE
                    }, l.g(e, r, A.defaultTextureSettings);
                }), a;
            };
            return f(1, !0), {
                gl: e,
                updateDrawSettings: function(r) {
                    return l.a(e, R({}, t, r));
                },
                createForm: function() {
                    return o.a(e);
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
                draw: function(r, t) {
                    return i(e, r, null, t);
                },
                compose: function() {
                    for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                    return _(e, t, r, u);
                },
                resize: f
            };
        }
        function i(e, r, t, n) {
            var i = r.shade, _ = r.uniforms, o = r.form, T = r.drawSettings;
            if (!i || !o) throw Error("cannot draw, shader or geometry are not set");
            if (e.useProgram(i.program), u(i, o), n && f(i, n, t), T && l.a(e, T), Array.isArray(_)) for (var E = 0, s = _; E < s.length; E++) {
                var c = s[E];
                a(e, r, t, c);
            } else a(e, r, t, _);
            T && l.e(e, T);
        }
        function a(e, r, t, n) {
            n && f(r.shade, n, t), r.form.elements && null != r.form.elements.glType ? (e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, r.form.elements.buffer), 
            e.drawElements(r.form.drawType, r.form.itemCount, r.form.elements.glType, 0)) : e.drawArrays(r.form.drawType, 0, r.form.itemCount);
        }
        function u(e, r) {
            for (var t in r.attribs) {
                var n = e.attributeSetters[t];
                n && n.setter(r.attribs[t]);
            }
        }
        function f(e, r, t) {
            for (var n in r) {
                var i = e.uniformSetters[n];
                if (i) {
                    var a = r[n];
                    null === a || "string" == typeof a ? i.setter(t) : i.setter(a);
                }
            }
        }
        function _(e, r, t, n) {
            for (var a = r.length - 1, u = 0; u < r.length; u++) !function(u) {
                var f = r[u], _ = function(r, a) {
                    var u = t[0], _ = t[1], o = !a && null == f.target;
                    if (a ? (e.bindFramebuffer(e.FRAMEBUFFER, null), e.viewport(0, 0, e.drawingBufferWidth, e.drawingBufferHeight)) : f.target ? (e.bindFramebuffer(e.FRAMEBUFFER, f.target.frameBuffer), 
                    e.viewport(0, 0, f.target.width, f.target.height)) : (e.bindFramebuffer(e.FRAMEBUFFER, _.frameBuffer), 
                    e.viewport(0, 0, e.drawingBufferWidth, e.drawingBufferHeight)), f.data.drawSettings && l.a(e, f.data.drawSettings), 
                    f.sketches) for (var T = 0, E = f.sketches; T < E.length; T++) {
                        var s = E[T];
                        i(e, s, u.textures[0], r);
                    } else i(e, n, null, {
                        source: f.texture()
                    });
                    f.data.drawSettings && l.e(e, f.data.drawSettings), o && (t[0] = _, t[1] = u);
                };
                if (Array.isArray(f.uniforms)) for (var o = a + f.uniforms.length - 1, T = 0; T < f.uniforms.length; T++) {
                    var E = u + T === o;
                    _(f.uniforms[T], E);
                } else {
                    var E = u === a;
                    _(f.uniforms, E);
                }
            }(u);
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.create = n;
        var o = t(7), T = t(8), E = t(9), s = t(10), l = t(1), c = t(11), A = t(2), R = this && this.__assign || Object.assign || function(e) {
            for (var r, t = 1, n = arguments.length; t < n; t++) {
                r = arguments[t];
                for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (e[i] = r[i]);
            }
            return e;
        };
    }, function(e, r, t) {
        "use strict";
        function n(e) {
            var r = {};
            return r.update = function(t) {
                t.drawType && (r.drawType = e[t.drawType]), t.itemCount && (r.itemCount = t.itemCount);
                var n = r.attribs || {};
                for (var a in t.attribs) {
                    var u = t.attribs[a];
                    null == n[a] && (n[a] = {
                        buffer: e.createBuffer()
                    }), e.bindBuffer(e.ARRAY_BUFFER, n[a].buffer), e.bufferData(e.ARRAY_BUFFER, u.buffer, e[(u.storeType || "STATIC") + "_DRAW"]);
                }
                if (r.attribs = n, t.elements) {
                    var f = t.elements.buffer;
                    null == r.elements && (r.elements = {
                        buffer: e.createBuffer(),
                        glType: null
                    }), r.elements.glType = i.d(f), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, r.elements.buffer), 
                    e.bufferData(e.ELEMENT_ARRAY_BUFFER, f, e[(t.elements.storeType || "STATIC") + "_DRAW"]);
                }
                return r;
            }, r.delete = function() {
                for (var t in r.attribs) e.deleteBuffer(r.attribs[t].buffer);
                return r.elements && e.deleteBuffer(r.elements.buffer), r;
            }, r;
        }
        r.a = n;
        var i = t(1);
    }, function(e, r, t) {
        "use strict";
        function n(e) {
            var r = {
                program: e.createProgram(),
                frag: e.createShader(e.FRAGMENT_SHADER),
                vert: e.createShader(e.VERTEX_SHADER)
            };
            return e.attachShader(r.program, r.vert), e.attachShader(r.program, r.frag), r.update = function(t) {
                var n = t.frag && t.frag.trim() || r.fragSource, u = t.vert && t.vert.trim() || r.vertSource;
                if (!n || !u) return r;
                if (n.indexOf("GL_EXT_draw_buffers") >= 0 && e.getExtension("WEBGL_draw_buffers"), 
                e.shaderSource(r.vert, u), e.shaderSource(r.frag, n), e.compileShader(r.vert), e.compileShader(r.frag), 
                e.getShaderParameter(r.vert, e.COMPILE_STATUS) || console.error("Error Compiling Vertex Shader!\n", e.getShaderInfoLog(r.vert), i(u)), 
                e.getShaderParameter(r.frag, e.COMPILE_STATUS) || console.error("Error Compiling Fragment Shader!\n", e.getShaderInfoLog(r.frag), i(n)), 
                e.linkProgram(r.program), !e.getProgramParameter(r.program, e.LINK_STATUS)) {
                    var f = e.getProgramInfoLog(r.program);
                    console.error("Error in program linking:", f);
                }
                return r.uniformSetters = a.c(e, r.program), r.attributeSetters = a.b(e, r.program), 
                r.fragSource = n, r.vertSource = u, r;
            }, r.delete = function() {
                return e.deleteProgram(r.program), e.deleteShader(r.frag), e.deleteShader(r.vert), 
                r;
            }, r;
        }
        function i(e) {
            return e.trim().split("\n").map(function(e, r) {
                return r + 1 + ": " + e;
            }).join("\n");
        }
        r.a = n;
        var a = t(1);
    }, function(e, r, t) {
        "use strict";
        function n() {
            var e = {};
            return e.update = function(r) {
                return r.drawSettings && (e.drawSettings = r.drawSettings), r.form && (e.form = r.form), 
                r.shade && (e.shade = r.shade), r.uniforms && (e.uniforms = r.uniforms), e;
            }, e;
        }
        r.a = n;
    }, function(e, r, t) {
        "use strict";
        function n(e) {
            var r = {};
            r.textures = [], r.data = {}, r.texture = function(e) {
                return void 0 === e && (e = 0), r.textures[e];
            };
            var t = e.createTexture();
            return t && r.textures.push(t), r.update = function(t) {
                return e.bindTexture(e.TEXTURE_2D, r.textures[0]), a.f(e, t, r.data), t.asset && e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t.asset), 
                t.minFilter && t.minFilter.indexOf("MIPMAP") > 0 && e.generateMipmap(e.TEXTURE_2D), 
                e.bindTexture(e.TEXTURE_2D, null), Object.assign(r.data, t), r;
            }, r;
        }
        function i(e) {
            var r = {};
            return r.textures = [], r.data = {}, r.texture = function(e) {
                return void 0 === e && (e = 0), r.textures[e];
            }, r.update = function(t) {
                if (t.buffered && !r.target ? (r.target = {
                    width: t.width || e.canvas.width,
                    height: t.height || e.canvas.height,
                    frameBuffer: null,
                    textures: [],
                    depthBuffer: null,
                    textureConfig: {
                        type: t.textureConfig && t.textureConfig.type || e.UNSIGNED_BYTE,
                        count: t.textureConfig && t.textureConfig.count || 1
                    }
                }, a.g(e, r.target, t, r.data), r.textures = r.target.textures) : r.target && t.width && t.height && (r.target.width = t.width, 
                r.target.height = t.height, a.g(e, r.target, t, r.data)), t.sketches && (r.sketches = t.sketches), 
                t.frag) {
                    var n = r.sketches && r.sketches[0];
                    n && n.shade.update({
                        frag: t.frag
                    });
                }
                return t.uniforms && (r.uniforms = t.uniforms), Object.assign(r.data, t), r;
            }, r.delete = function() {
                for (var t = 0, n = r.textures; t < n.length; t++) {
                    var i = n[t];
                    e.deleteTexture(i);
                }
                return r.target && (e.deleteFramebuffer(r.target.frameBuffer), e.deleteRenderbuffer(r.target.depthBuffer)), 
                r;
            }, r;
        }
        r.b = n, r.a = i;
        var a = t(1);
    }, function(e, r, t) {
        "use strict";
        function n(e, r) {
            void 0 === r && (r = 1), r = Math.max(1, r);
            var t = e.clientWidth * r | 0, n = e.clientHeight * r | 0;
            return (e.width !== t || e.height !== n) && (e.width = t, e.height = n, !0);
        }
        r.a = n;
    } ]);
});