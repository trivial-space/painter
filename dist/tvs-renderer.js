!function(e, r) {
    "object" == typeof exports && "object" == typeof module ? module.exports = r() : "function" == typeof define && define.amd ? define([], r) : "object" == typeof exports ? exports.tvsRenderer = r() : e.tvsRenderer = r();
}(this, function() {
    return function(e) {
        function r(n) {
            if (t[n]) return t[n].exports;
            var a = t[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(a.exports, a, a.exports, r), a.l = !0, a.exports;
        }
        var t = {};
        return r.m = e, r.c = t, r.i = function(e) {
            return e;
        }, r.d = function(e, t, n) {
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
        }, r.p = "", r(r.s = 6);
    }([ function(e, r, t) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), t.d(r, "GEOMETRY_PROP_POSITION", function() {
            return n;
        }), t.d(r, "GEOMETRY_PROP_NORMAL", function() {
            return a;
        }), t.d(r, "GEOMETRY_PROP_UV", function() {
            return i;
        }), t.d(r, "UNIFORM_SOURCE_TEXTURE", function() {
            return f;
        });
        var n = "position", a = "normal", i = "uv", f = "source";
    }, function(e, r) {}, function(e, r, t) {
        "use strict";
        function n(e) {
            null == e && (e = document.createElement("canvas"));
            var r = e.getContext("webgl") || e.getContext("experimental-webgl");
            if (!r) throw Error("WebGL-Context could not be initialized!");
            var t = {
                settings: Object.assign({}, y.a.defaultSettings),
                shaders: {},
                geometries: {},
                layers: {},
                objects: {},
                source: {},
                target: {},
                gl: r
            };
            return s(t, t.settings), E(t, "_renderQuad", y.a.geometries.renderQuad), c(t, "_basicEffect", y.a.shaders.basicEffect), 
            l(t, "_result", y.a.objects.resultScreen), g(t);
        }
        function a(e, r) {
            return s(e, r.settings), i(e, r.shaders), u(e, r.geometries), o(e, r.objects), f(e, r.layers), 
            g(e);
        }
        function i(e, r) {
            if (r) for (var t in r) {
                var n = r[t];
                c(e, t, n);
            }
        }
        function f(e, r) {
            if (r) for (var t in r) {
                var n = r[t];
                d(e, t, n);
            }
        }
        function u(e, r) {
            if (r) for (var t in r) {
                var n = r[t];
                E(e, t, n);
            }
        }
        function o(e, r) {
            if (r) for (var t in r) {
                var n = r[t];
                l(e, t, n);
            }
        }
        function s(e, r) {
            void 0 === r && (r = {});
            var t = e.gl;
            if (null != r.clearColor && (e.settings.clearColor = r.clearColor), null != r.minFilter && (e.settings.minFilter = r.minFilter), 
            null != r.magFilter && (e.settings.magFilter = r.magFilter), null != r.wrap && (e.settings.wrap = r.wrap), 
            null != r.clearBuffers && (e.settings.clearBuffers = r.clearBuffers, e.settings.clearBits = R(t, r.clearBuffers)), 
            null != r.enable) {
                for (var n = 0, a = e.settings.enable; n < a.length; n++) {
                    var i = a[n];
                    t.disable(t[i]);
                }
                e.settings.enable = r.enable;
                for (var f = 0, u = e.settings.enable; f < u.length; f++) {
                    var i = u[f];
                    t.enable(t[i]);
                }
            }
            return void 0 !== r.blend && (e.settings.blend = r.blend), e.settings.blend && _(t, e.settings.blend), 
            e;
        }
        function l(e, r, t) {
            var n = e.objects[r], a = Object.assign({}, t, {
                type: "initialized"
            });
            if (null == a.uniforms && (a.uniforms = {}), e.objects[r] = a, n && "missing" === n.type) for (var i in n.updateLayers) d(e, i, n.updateLayers[i]);
            return e;
        }
        function c(e, r, t) {
            var n = e.shaders[r] || {}, a = null == n.program, i = e.gl, f = "precision mediump float;\n" + t.frag;
            a && (n.program = i.createProgram()), null == n.vert && (n.vert = i.createShader(i.VERTEX_SHADER)), 
            null == n.frag && (n.frag = i.createShader(i.FRAGMENT_SHADER)), i.shaderSource(n.vert, t.vert), 
            i.shaderSource(n.frag, f), i.compileShader(n.vert), i.compileShader(n.frag), i.getShaderParameter(n.vert, i.COMPILE_STATUS) || console.error("Error Compiling Vertex Shader!\n", i.getShaderInfoLog(n.vert), t.vert), 
            i.getShaderParameter(n.frag, i.COMPILE_STATUS) || console.error("Error Compiling Fragment Shader!\n", i.getShaderInfoLog(n.frag), t.frag), 
            a && (i.attachShader(n.program, n.vert), i.attachShader(n.program, n.frag)), i.linkProgram(n.program), 
            n.attribs = {};
            for (var u in t.attribs) {
                var o = t.attribs[u], s = {
                    index: i.getAttribLocation(n.program, u),
                    type: i.FLOAT,
                    itemSize: O[o]
                };
                s.index < 0 && console.warn('attribute "' + u + '" could not be found in shader ' + r, t.vert), 
                n.attribs[u] = s;
            }
            n.uniforms = {};
            for (var l in t.uniforms) n.uniforms[l] = {
                index: i.getUniformLocation(n.program, l),
                type: t.uniforms[l]
            };
            return e.shaders[r] = n, e;
        }
        function E(e, r, t) {
            var n = e.gl, a = e.geometries[r] || {};
            a.drawType = n[t.drawType], a.itemCount = t.itemCount;
            var i = a.attribs || {};
            for (var f in t.attribs) {
                var u = t.attribs[f];
                null == i[f] && (i[f] = n.createBuffer()), n.bindBuffer(n.ARRAY_BUFFER, i[f]), n.bufferData(n.ARRAY_BUFFER, h(u), n[(u.storeType || "STATIC") + "_DRAW"]);
            }
            if (a.attribs = i, t.elements) {
                null == a.elements && (a.elements = {
                    buffer: null,
                    glType: null
                }), null == a.elements.buffer && (a.elements.buffer = n.createBuffer());
                var o = h(t.elements);
                a.elements.glType = A(o, n), n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, a.elements.buffer), 
                n.bufferData(n.ELEMENT_ARRAY_BUFFER, o, n[(t.elements.storeType || "STATIC") + "_DRAW"]);
            } else a.elements && delete a.elements;
            return e.geometries[r] = a, e;
        }
        function d(e, r, t) {
            var n = e.layers[r] || {};
            if (n.noClear = !!t.noClear, n.clearColor = t.clearColor, t.buffered ? (n.renderTarget = {
                width: t.width || e.settings.width,
                height: t.height || e.settings.height,
                frameBuffer: null,
                texture: null,
                depthBuffer: null
            }, p(e.gl, n.renderTarget, t)) : delete n.renderTarget, t.asset) n.type = "static", 
            T(e.gl, n, t); else if (t.objects) {
                var a = n;
                a.type = "objects", a.transparents = [], a.opaques = [], a.uniforms = t.uniforms || {};
                for (var i = 0, f = t.objects; i < f.length; i++) {
                    var u = f[i], o = e.objects[u];
                    o ? "initialized" === o.type ? o.blend ? a.transparents.push(u) : a.opaques.push(u) : o.updateLayers[r] = t : e.objects[u] = {
                        type: "missing",
                        updateLayers: (s = {}, s[r] = t, s)
                    };
                }
            } else if (t.shader) {
                var a = n;
                a.type = "shader", a.object = {
                    type: "initialized",
                    shader: t.shader,
                    geometry: "_renderQuad",
                    uniforms: t.uniforms || {}
                };
            }
            return e.layers[r] = n, e;
            var s;
        }
        function T(e, r, t) {
            var n = r.texture || e.createTexture();
            e.bindTexture(e.TEXTURE_2D, n), v(e, t), t.asset && e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t.asset), 
            t.minFilter && t.minFilter.indexOf("MIPMAP") > 0 && e.generateMipmap(e.TEXTURE_2D), 
            e.bindTexture(e.TEXTURE_2D, null), r.texture = n;
        }
        function g(e) {
            var r = e.gl, t = r.canvas.clientWidth || r.canvas.width, n = r.canvas.clientHeight || r.canvas.height;
            return t === e.settings.width && n === e.settings.height || (r.canvas.height = e.settings.height = n, 
            r.canvas.width = e.settings.width = t, p(e.gl, e.source, e.settings), p(e.gl, e.target, e.settings)), 
            e;
        }
        function m(e, r) {
            for (var t = e.gl, n = r.length - 1, a = 0; a < r.length; a++) {
                var i = r[a], f = e.layers[i], u = a === n, o = !u && null == f.renderTarget;
                switch (u ? (t.bindFramebuffer(t.FRAMEBUFFER, null), t.viewport(0, 0, t.drawingBufferWidth, t.drawingBufferHeight)) : o ? (t.bindFramebuffer(t.FRAMEBUFFER, e.target.frameBuffer), 
                t.viewport(0, 0, t.drawingBufferWidth, t.drawingBufferHeight)) : f.renderTarget && (t.bindFramebuffer(t.FRAMEBUFFER, f.renderTarget.frameBuffer), 
                t.viewport(0, 0, f.renderTarget.width, f.renderTarget.height)), f.noClear || (t.clearColor.apply(t, f.clearColor || e.settings.clearColor), 
                t.clear(e.settings.clearBits)), f.type) {
                  case "shader":
                    b(e, f.object);
                    break;

                  case "objects":
                    for (var s = 0, l = f.opaques; s < l.length; s++) {
                        var c = l[s];
                        b(e, e.objects[c], f.uniforms);
                    }
                    if (f.transparents.length) {
                        t.enable(t.BLEND);
                        for (var E = 0, d = f.transparents; E < d.length; E++) {
                            var c = d[E];
                            b(e, e.objects[c], f.uniforms);
                        }
                        t.disable(t.BLEND);
                    }
                    break;

                  case "static":
                    if (u) {
                        b(e, e.objects._result, {
                            source: i
                        });
                    }
                }
                if (o) {
                    var T = e.source;
                    e.source = e.target, e.target = T;
                }
            }
        }
        function b(e, r, t) {
            var n = 0, a = e.gl, i = e.shaders[r.shader], f = e.geometries[r.geometry];
            a.useProgram(i.program);
            for (var u in i.attribs) {
                var o = i.attribs[u];
                a.bindBuffer(a.ARRAY_BUFFER, f.attribs[u]), a.enableVertexAttribArray(o.index), 
                a.vertexAttribPointer(o.index, o.itemSize, o.type, !1, 0, 0);
            }
            for (var u in i.uniforms) {
                var s = i.uniforms[u], l = s.index, c = r.uniforms[u] || t && t[u];
                switch (s.type) {
                  case "t":
                    var E = c ? e.layers[c].texture : e.source.texture;
                    a.activeTexture(a["TEXTURE" + n]), a.bindTexture(a.TEXTURE_2D, E), a.uniform1i(l, n), 
                    n++;
                    break;

                  case "f":
                  case "f 1":
                    a.uniform1f(l, c);
                    break;

                  case "f 2":
                    a.uniform2fv(l, c);
                    break;

                  case "f 3":
                    a.uniform3fv(l, c);
                    break;

                  case "f 4":
                    a.uniform4fv(l, c);
                    break;

                  case "m 2":
                    a.uniformMatrix2fv(l, !1, c);
                    break;

                  case "m 3":
                    a.uniformMatrix3fv(l, !1, c);
                    break;

                  case "m 4":
                    a.uniformMatrix4fv(l, !1, c);
                    break;

                  case "i":
                  case "i 1":
                    a.uniform1i(l, c);
                    break;

                  case "i 2":
                    a.uniform2iv(l, c);
                    break;

                  case "i 3":
                    a.uniform3iv(l, c);
                    break;

                  case "i 4":
                    a.uniform4iv(l, c);
                    break;

                  default:
                    console.error("Uniform type " + s.type + " unknown. uniform " + u + " not set!");
                }
            }
            f.elements && null != f.elements.glType ? (a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, f.elements.buffer), 
            a.drawElements(f.drawType, f.itemCount, f.elements.glType, 0)) : a.drawArrays(f.drawType, 0, f.itemCount);
        }
        function R(e, r) {
            return r.reduce(function(r, t) {
                return r | e[t + "_BUFFER_BIT"];
            }, 0);
        }
        function _(e, r) {
            e.blendFunc.apply(e, r.map(function(r) {
                return e[r];
            }));
        }
        function v(e, r) {
            e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, r.flipY);
            var t, n;
            r.wrap ? t = n = r.wrap : (n = r.wrapT, t = r.wrapS), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e[t || "CLAMP_TO_EDGE"]), 
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e[n || "CLAMP_TO_EDGE"]), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e[r.magFilter || "LINEAR"]), 
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e[r.minFilter || "LINEAR"]);
        }
        function p(e, r, t) {
            if (null != t.width && null != t.height) {
                null == r.frameBuffer && (r.frameBuffer = e.createFramebuffer()), null == r.texture && (r.texture = e.createTexture()), 
                null == r.depthBuffer && (r.depthBuffer = e.createRenderbuffer()), e.bindTexture(e.TEXTURE_2D, r.texture), 
                e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, t.width, t.height, 0, e.RGBA, e.UNSIGNED_BYTE, null), 
                v(e, t), e.bindRenderbuffer(e.RENDERBUFFER, r.depthBuffer), e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_COMPONENT16, t.width, t.height), 
                e.bindFramebuffer(e.FRAMEBUFFER, r.frameBuffer), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, r.texture, 0), 
                e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.RENDERBUFFER, r.depthBuffer);
                var n = e.checkFramebufferStatus(e.FRAMEBUFFER);
                n !== e.FRAMEBUFFER_COMPLETE && console.error("framebuffer error", n, t), e.bindFramebuffer(e.FRAMEBUFFER, null), 
                e.bindTexture(e.TEXTURE_2D, null), e.bindRenderbuffer(e.RENDERBUFFER, null);
            }
        }
        function h(e) {
            return F(e) ? e.buffer : new (0, window[e.type])(e.array);
        }
        function A(e, r) {
            if (e instanceof Uint8Array) return r.UNSIGNED_BYTE;
            if (e instanceof Uint16Array) return r.UNSIGNED_SHORT;
            if (e instanceof Uint32Array) return r.UNSIGNED_INT;
            throw new TypeError("invalid array type");
        }
        function F(e) {
            return null != e.buffer;
        }
        var y = t(5), O = {
            f: 1,
            "f 1": 1,
            "f 2": 2,
            "f 3": 3,
            "f 4": 4,
            "m 2": 4,
            "m 3": 9,
            "m 4": 16
        };
        r.a = {
            create: n,
            init: a,
            updateSettings: s,
            updateObject: l,
            updateGeometry: E,
            updateShader: c,
            updateLayer: d,
            updateSize: g,
            renderLayers: m,
            lib: y.a
        };
    }, function(e, r, t) {
        "use strict";
        function n(e, r, t, n) {
            var a, i, f = e / 2, u = r / 2, o = t || 1, s = n || 1, l = o + 1, c = s + 1, E = e / o, d = r / s, T = new Float32Array(l * c * 3), g = new Float32Array(l * c * 3), m = new Float32Array(l * c * 2), b = 0, R = 0;
            for (a = 0; a < c; a++) {
                var _ = a * d - u;
                for (i = 0; i < l; i++) {
                    var v = i * E - f;
                    T[b] = v, T[b + 1] = -_, g[b + 2] = 1, m[R] = i / o, m[R + 1] = 1 - a / s, b += 3, 
                    R += 2;
                }
            }
            b = 0;
            var p = new (T.length / 3 > 65535 ? Uint32Array : Uint16Array)(o * s * 6);
            for (a = 0; a < s; a++) for (i = 0; i < o; i++) {
                var h = i + l * a, A = i + l * (a + 1), F = i + 1 + l * (a + 1), y = i + 1 + l * a;
                p[b] = h, p[b + 1] = A, p[b + 2] = y, p[b + 3] = A, p[b + 4] = F, p[b + 5] = y, 
                b += 6;
            }
            return {
                attribs: {
                    position: {
                        buffer: T,
                        storeType: "STATIC"
                    },
                    normal: {
                        buffer: g,
                        storeType: "STATIC"
                    },
                    uv: {
                        buffer: m,
                        storeType: "STATIC"
                    }
                },
                elements: {
                    buffer: p
                },
                drawType: "TRIANGLES",
                itemCount: p.length
            };
        }
        r.a = n;
    }, function(e, r, t) {
        "use strict";
        function n(e) {
            for (var r = [], t = 0; t < e.length; t++) for (var n = e[t], a = 0; a < n.length; a++) r.push(n[a]);
            return r;
        }
        function a(e) {
            var r = {
                drawType: "TRIANGLES",
                attribs: {},
                itemCount: 0
            };
            for (var t in e) {
                var a = e[t];
                if (t === s) {
                    var l = new (a.length > 65535 ? Uint32Array : Uint16Array)(n(a));
                    Object.assign(r, {
                        elements: {
                            buffer: l
                        },
                        itemCount: l.length
                    });
                } else t === f ? r.attribs[i.GEOMETRY_PROP_POSITION] = {
                    buffer: new Float32Array(n(a))
                } : t === u ? r.attribs[i.GEOMETRY_PROP_NORMAL] = {
                    buffer: new Float32Array(n(a))
                } : t === o ? r.attribs[i.GEOMETRY_PROP_UV] = {
                    buffer: new Float32Array(n(a))
                } : r.attribs[t] = {
                    buffer: new Float32Array(n(a))
                };
            }
            return r;
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), t.d(r, "STACK_GL_GEOMETRY_PROP_POSITION", function() {
            return f;
        }), t.d(r, "STACK_GL_GEOMETRY_PROP_NORMAL", function() {
            return u;
        }), t.d(r, "STACK_GL_GEOMETRY_PROP_UV", function() {
            return o;
        }), t.d(r, "STACK_GL_GEOMETRY_PROP_ELEMENTS", function() {
            return s;
        }), r.convertStackGLGeometry = a;
        var i = t(0), f = "positions", u = "normals", o = "normals", s = "cells";
    }, function(e, r, t) {
        "use strict";
        var n = t(0);
        r.a = {
            defaultSettings: {
                clearColor: [ 0, 0, 0, 1 ],
                minFilter: "LINEAR",
                magFilter: "NEAREST",
                wrap: "CLAMP_TO_EDGE",
                clearBuffers: [ "DEPTH", "COLOR" ],
                clearBits: 0,
                enable: [ "DEPTH_TEST" ],
                blend: [ "SRC_ALPHA", "ONE_MINUS_SRC_ALPHA" ],
                width: 0,
                height: 0
            },
            geometries: {
                renderQuad: {
                    attribs: (a = {}, a[n.GEOMETRY_PROP_POSITION] = {
                        buffer: new Float32Array([ -1, 1, -1, -1, 1, 1, 1, -1 ]),
                        storeType: "STATIC"
                    }, a[n.GEOMETRY_PROP_UV] = {
                        buffer: new Float32Array([ 0, 1, 0, 0, 1, 1, 1, 0 ]),
                        storeType: "STATIC"
                    }, a),
                    drawType: "TRIANGLE_STRIP",
                    itemCount: 4
                }
            },
            shaders: {
                basicEffect: {
                    vert: "\n        attribute vec2 " + n.GEOMETRY_PROP_POSITION + ";\n        attribute vec2 " + n.GEOMETRY_PROP_UV + ";\n        varying vec2 vUv;\n        void main() {\n          vUv = " + n.GEOMETRY_PROP_UV + ";\n          gl_Position = vec4(" + n.GEOMETRY_PROP_POSITION + ", 0.0, 1.0);\n        }",
                    frag: "\n        uniform sampler2D " + n.UNIFORM_SOURCE_TEXTURE + ";\n        varying vec2 vUv;\n        void main() {\n          gl_FragColor = texture2D(" + n.UNIFORM_SOURCE_TEXTURE + ", vUv);\n        }",
                    attribs: (i = {}, i[n.GEOMETRY_PROP_POSITION] = "f 2", i[n.GEOMETRY_PROP_UV] = "f 2", 
                    i),
                    uniforms: (f = {}, f[n.UNIFORM_SOURCE_TEXTURE] = "t", f)
                }
            },
            objects: {
                resultScreen: {
                    shader: "_basicEffect",
                    geometry: "_renderQuad"
                }
            }
        };
        var a, i, f;
    }, function(e, r, t) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), t.d(r, "renderUtils", function() {
            return o;
        }), t.d(r, "constants", function() {
            return s;
        }), t.d(r, "renderer", function() {
            return l;
        });
        var n = t(2), a = t(0), i = t(3), f = t(4), u = t(1), o = (t.n(u), {
            geometry: {
                plane: i.a
            },
            stackgl: f
        }), s = a, l = n.a;
        r.default = n.a;
    } ]);
});