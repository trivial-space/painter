!function(r, _) {
    "object" == typeof exports && "object" == typeof module ? module.exports = _() : "function" == typeof define && define.amd ? define([], _) : "object" == typeof exports ? exports.tvsRenderer = _() : r.tvsRenderer = _();
}(this, function() {
    return function(r) {
        function _(t) {
            if (e[t]) return e[t].exports;
            var n = e[t] = {
                i: t,
                l: !1,
                exports: {}
            };
            return r[t].call(n.exports, n, n.exports, _), n.l = !0, n.exports;
        }
        var e = {};
        return _.m = r, _.c = e, _.d = function(r, e, t) {
            _.o(r, e) || Object.defineProperty(r, e, {
                configurable: !1,
                enumerable: !0,
                get: t
            });
        }, _.n = function(r) {
            var e = r && r.__esModule ? function() {
                return r.default;
            } : function() {
                return r;
            };
            return _.d(e, "a", e), e;
        }, _.o = function(r, _) {
            return Object.prototype.hasOwnProperty.call(r, _);
        }, _.p = "", _(_.s = 1);
    }([ function(r, _, e) {
        "use strict";
        Object.defineProperty(_, "__esModule", {
            value: !0
        }), e.d(_, "GEOMETRY_PROP_POSITION", function() {
            return t;
        }), e.d(_, "GEOMETRY_PROP_NORMAL", function() {
            return n;
        }), e.d(_, "GEOMETRY_PROP_UV", function() {
            return o;
        }), e.d(_, "UNIFORM_SOURCE_TEXTURE", function() {
            return E;
        }), e.d(_, "VARYING_UV_COORDS", function() {
            return u;
        }), e.d(_, "GL_TYPE", function() {
            return T;
        });
        var t = "position", n = "normal", o = "uv", E = "source", u = "coords", T = {
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
    }, function(r, _, e) {
        "use strict";
        Object.defineProperty(_, "__esModule", {
            value: !0
        }), e.d(_, "renderUtils", function() {
            return E;
        }), e.d(_, "constants", function() {
            return u;
        });
        var t = e(0), n = e(2), o = e(3), E = {
            geometry: {
                plane: n
            },
            stackgl: o
        }, u = t;
    }, function(r, _, e) {
        "use strict";
        function t(r, _, e, t) {
            var n, o, E = r / 2, u = _ / 2, T = e || 1, A = t || 1, O = T + 1, f = A + 1, R = r / T, i = _ / A, N = new Float32Array(O * f * 3), a = new Float32Array(O * f * 3), c = new Float32Array(O * f * 2), S = 0, s = 0;
            for (n = 0; n < f; n++) {
                var I = n * i - u;
                for (o = 0; o < O; o++) {
                    var L = o * R - E;
                    N[S] = L, N[S + 1] = -I, a[S + 2] = 1, c[s] = o / T, c[s + 1] = 1 - n / A, S += 3, 
                    s += 2;
                }
            }
            S = 0;
            var P = new (N.length / 3 > 65535 ? Uint32Array : Uint16Array)(T * A * 6);
            for (n = 0; n < A; n++) for (o = 0; o < T; o++) {
                var l = o + O * n, M = o + O * (n + 1), U = o + 1 + O * (n + 1), G = o + 1 + O * n;
                P[S] = l, P[S + 1] = M, P[S + 2] = G, P[S + 3] = M, P[S + 4] = U, P[S + 5] = G, 
                S += 6;
            }
            return {
                attribs: {
                    position: {
                        buffer: N
                    },
                    normal: {
                        buffer: a
                    },
                    uv: {
                        buffer: c
                    }
                },
                elements: {
                    buffer: P
                },
                drawType: "TRIANGLES",
                itemCount: P.length
            };
        }
        Object.defineProperty(_, "__esModule", {
            value: !0
        }), _.plane = t;
    }, function(r, _, e) {
        "use strict";
        function t(r) {
            for (var _ = [], e = 0, t = r; e < t.length; e++) for (var n = t[e], o = 0, E = n; o < E.length; o++) {
                var u = E[o];
                _.push(u);
            }
            return _;
        }
        function n(r) {
            var _ = {
                drawType: "TRIANGLES",
                attribs: {},
                itemCount: 0
            };
            for (var e in r) {
                var n = r[e];
                if (e === A) {
                    var O = new (n.length > 65535 ? Uint32Array : Uint16Array)(t(n));
                    Object.assign(_, {
                        elements: {
                            buffer: O
                        },
                        itemCount: O.length
                    });
                } else e === E ? _.attribs[o.GEOMETRY_PROP_POSITION] = {
                    buffer: new Float32Array(t(n))
                } : e === u ? _.attribs[o.GEOMETRY_PROP_NORMAL] = {
                    buffer: new Float32Array(t(n))
                } : e === T ? _.attribs[o.GEOMETRY_PROP_UV] = {
                    buffer: new Float32Array(t(n))
                } : _.attribs[e] = {
                    buffer: new Float32Array(t(n))
                };
            }
            return _;
        }
        Object.defineProperty(_, "__esModule", {
            value: !0
        }), e.d(_, "STACK_GL_GEOMETRY_PROP_POSITION", function() {
            return E;
        }), e.d(_, "STACK_GL_GEOMETRY_PROP_NORMAL", function() {
            return u;
        }), e.d(_, "STACK_GL_GEOMETRY_PROP_UV", function() {
            return T;
        }), e.d(_, "STACK_GL_GEOMETRY_PROP_ELEMENTS", function() {
            return A;
        }), _.convertStackGLGeometry = n;
        var o = e(0), E = "positions", u = "normals", T = "uvs", A = "cells";
    } ]);
});