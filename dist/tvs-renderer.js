!function(e, r) {
    "object" == typeof exports && "object" == typeof module ? module.exports = r() : "function" == typeof define && define.amd ? define([], r) : "object" == typeof exports ? exports.tvsRenderer = r() : e.tvsRenderer = r();
}(this, function() {
    return function(e) {
        function r(a) {
            if (t[a]) return t[a].exports;
            var n = t[a] = {
                exports: {},
                id: a,
                loaded: !1
            };
            return e[a].call(n.exports, n, n.exports, r), n.loaded = !0, n.exports;
        }
        var t = {};
        return r.m = e, r.c = t, r.p = "", r(0);
    }([ function(e, r, t) {
        "use strict";
        var a = t(1), n = t(5), i = t(6);
        r.renderUtils = {
            geometry: {
                plane: n.plane
            },
            stackgl: i
        }, r.renderer = a["default"], Object.defineProperty(r, "__esModule", {
            value: !0
        }), r["default"] = a["default"];
    }, function(e, r, t) {
        "use strict";
        function a(e) {
            null == e && (e = document.createElement("canvas"));
            var r = e.getContext("webgl") || e.getContext("experimental-webgl");
            if (!r) throw Error("WebGL-Context could not be initialized!");
            var t = {
                settings: {
                    clearColor: [ 0, 0, 0, 1 ],
                    minFilter: "LINEAR",
                    magFilter: "NEAREST",
                    wrap: "CLAMP_TO_EDGE",
                    clearBuffers: [ "DEPTH", "COLOR" ],
                    clearBits: 0,
                    enable: [ "DEPTH_TEST" ],
                    blend: [ "SRC_ALPHA", "ONE_MINUS_SRC_ALPHA" ],
                    width: e.width,
                    height: e.height
                },
                shaders: {},
                geometries: {},
                layers: {},
                objects: {},
                source: {},
                target: {},
                gl: r
            };
            return u(t, t.settings), d(t, "_renderQuad", F["default"].geometries.renderQuad), 
            E(t, "_basicEffect", F["default"].shaders.basicEffect), l(t, "_result", F["default"].objects.resultScreen), 
            R(t);
        }
        function n(e, r) {
            return u(e, r.settings), i(e, r.shaders), s(e, r.geometries), o(e, r.objects), f(e, r.layers), 
            R(e);
        }
        function i(e, r) {
            if (r) for (var t in r) {
                var a = r[t];
                E(e, t, a);
            }
        }
        function f(e, r) {
            if (r) for (var t in r) {
                var a = r[t];
                c(e, t, a);
            }
        }
        function s(e, r) {
            if (r) for (var t in r) {
                var a = r[t];
                d(e, t, a);
            }
        }
        function o(e, r) {
            if (r) for (var t in r) {
                var a = r[t];
                l(e, t, a);
            }
        }
        function u(e, r) {
            void 0 === r && (r = {});
            var t = e.gl;
            if (null != r.clearColor && (e.settings.clearColor = r.clearColor), null != r.minFilter && (e.settings.minFilter = r.minFilter), 
            null != r.magFilter && (e.settings.magFilter = r.magFilter), null != r.wrap && (e.settings.wrap = r.wrap), 
            null != r.clearBuffers && (e.settings.clearBuffers = r.clearBuffers, e.settings.clearBits = b(t, r.clearBuffers)), 
            null != r.enable) {
                for (var a = 0, n = e.settings.enable; a < n.length; a++) {
                    var i = n[a];
                    t.disable(t[i]);
                }
                e.settings.enable = r.enable;
                for (var f = 0, s = e.settings.enable; f < s.length; f++) {
                    var i = s[f];
                    t.enable(t[i]);
                }
            }
            return void 0 !== r.blend && (e.settings.blend = r.blend), e.settings.blend && _(t, e.settings.blend), 
            e;
        }
        function l(e, r, t) {
            var a = e.objects[r], n = Object.assign({}, t, {
                type: "initialized"
            });
            if (null == n.uniforms && (n.uniforms = {}), e.objects[r] = n, a && "missing" === a.type) for (var i in a.updateLayers) c(e, i, a.updateLayers[i]);
            return e;
        }
        function E(e, r, t) {
            var a = e.shaders[r] || {}, n = null == a.program, i = e.gl, f = "precision mediump float;\n" + t.frag;
            n && (a.program = i.createProgram()), null == a.vert && (a.vert = i.createShader(i.VERTEX_SHADER)), 
            null == a.frag && (a.frag = i.createShader(i.FRAGMENT_SHADER)), i.shaderSource(a.vert, t.vert), 
            i.shaderSource(a.frag, f), i.compileShader(a.vert), i.compileShader(a.frag), i.getShaderParameter(a.vert, i.COMPILE_STATUS) || console.error("Error Compiling Vertex Shader!\n", i.getShaderInfoLog(a.vert), t.vert), 
            i.getShaderParameter(a.frag, i.COMPILE_STATUS) || console.error("Error Compiling Fragment Shader!\n", i.getShaderInfoLog(a.frag), t.frag), 
            n && (i.attachShader(a.program, a.vert), i.attachShader(a.program, a.frag)), i.linkProgram(a.program), 
            a.attribs = {};
            for (var s in t.attribs) {
                var o = t.attribs[s], u = {
                    index: i.getAttribLocation(a.program, s),
                    type: i.FLOAT,
                    itemSize: y[o]
                };
                u.index < 0 && console.error('attribute "' + s + '" could not be found in shader', t.vert), 
                a.attribs[s] = u;
            }
            a.uniforms = {};
            for (var l in t.uniforms) a.uniforms[l] = {
                index: i.getUniformLocation(a.program, l),
                type: t.uniforms[l]
            };
            return e.shaders[r] = a, e;
        }
        function d(e, r, t) {
            var a = e.gl, n = e.geometries[r] || {};
            n.drawType = a[t.drawType], n.itemCount = t.itemCount;
            var i = n.attribs || {};
            for (var f in t.attribs) {
                var s = t.attribs[f];
                null == i[f] && (i[f] = a.createBuffer()), a.bindBuffer(a.ARRAY_BUFFER, i[f]), a.bufferData(a.ARRAY_BUFFER, h(s), a[(s.storeType || "STATIC") + "_DRAW"]);
            }
            if (n.attribs = i, t.elements) {
                null == n.elements && (n.elements = {
                    buffer: null,
                    glType: null
                }), null == n.elements.buffer && (n.elements.buffer = a.createBuffer());
                var o = h(t.elements);
                n.elements.glType = O(o, a), a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, n.elements.buffer), 
                a.bufferData(a.ELEMENT_ARRAY_BUFFER, o, a[(t.elements.storeType || "STATIC") + "_DRAW"]);
            } else n.elements && delete n.elements;
            return e.geometries[r] = n, e;
        }
        function c(e, r, t) {
            var a = e.layers[r] || {};
            if (a.noClear = t.noClear, a.clearColor = t.clearColor || e.settings.clearColor, 
            t.buffered ? (a.renderTarget = {
                width: t.width || e.settings.width,
                height: t.height || e.settings.height,
                frameBuffer: null,
                texture: null,
                depthBuffer: null
            }, p(e.gl, a.renderTarget, t)) : delete a.renderTarget, t.asset) a.type = "static", 
            T(e.gl, a, t); else if (t.objects) {
                var n = a;
                n.type = "objects", n.transparents = [], n.opaques = [];
                for (var i = 0, f = t.objects; i < f.length; i++) {
                    var s = f[i], o = e.objects[s];
                    o ? "initialized" === o.type ? o.blend ? n.transparents.push(s) : n.opaques.push(s) : o.updateLayers[r] = t : e.objects[s] = {
                        type: "missing",
                        updateLayers: (u = {}, u[r] = t, u)
                    };
                }
            } else if (t.shader) {
                var n = a;
                n.type = "shader", n.object = {
                    type: "initialized",
                    shader: t.shader,
                    geometry: "_renderQuad",
                    uniforms: t.uniforms || {}
                };
            }
            return e.layers[r] = a, e;
            var u;
        }
        function T(e, r, t) {
            var a = r.texture || e.createTexture();
            e.bindTexture(e.TEXTURE_2D, a), v(e, t), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t.asset), 
            e.generateMipmap(e.TEXTURE_2D), e.bindTexture(e.TEXTURE_2D, null), r.texture = a;
        }
        function R(e, r, t) {
            var a = e.gl;
            return r && (e.settings.width = r), t && (e.settings.height = t), a.canvas.width === e.settings.width && a.canvas.height === e.settings.height || (a.canvas.height = e.settings.height, 
            a.canvas.width = e.settings.width), p(e.gl, e.source, e.settings), p(e.gl, e.target, e.settings), 
            e;
        }
        function g(e, r) {
            for (var t = e.gl, a = r.length - 1, n = 0; n < r.length; n++) {
                var i = r[n], f = e.layers[i], s = n === a, o = !s && null == f.renderTarget;
                switch (s ? (t.bindFramebuffer(t.FRAMEBUFFER, null), t.viewport(0, 0, t.drawingBufferWidth, t.drawingBufferHeight)) : o ? (t.bindFramebuffer(t.FRAMEBUFFER, e.target.frameBuffer), 
                t.viewport(0, 0, t.drawingBufferWidth, t.drawingBufferHeight)) : (t.bindFramebuffer(t.FRAMEBUFFER, f.renderTarget.frameBuffer), 
                t.viewport(0, 0, f.renderTarget.width, f.renderTarget.height)), f.noClear || (t.clearColor.apply(t, f.clearColor || e.settings.clearColor), 
                t.clear(e.settings.clearBits)), f.type) {
                  case "shader":
                    m(e, f.object);
                    break;

                  case "objects":
                    for (var u = 0, l = f.opaques; u < l.length; u++) {
                        var E = l[u];
                        m(e, e.objects[E]);
                    }
                    if (f.transparents.length) {
                        t.enable(t.BLEND);
                        for (var d = 0, c = f.transparents; d < c.length; d++) {
                            var E = c[d];
                            m(e, e.objects[E]);
                        }
                        t.disable(t.BLEND);
                    }
                    break;

                  case "static":
                    if (s) {
                        var T = Object.assign({}, e.objects._result, {
                            uniforms: {
                                source: i
                            }
                        });
                        m(e, T);
                    }
                }
                if (o) {
                    var R = e.source;
                    e.source = e.target, e.target = R;
                }
            }
        }
        function m(e, r) {
            var t = 0, a = e.gl, n = e.shaders[r.shader], i = e.geometries[r.geometry];
            a.useProgram(n.program);
            for (var f in n.attribs) {
                var s = n.attribs[f];
                a.bindBuffer(a.ARRAY_BUFFER, i.attribs[f]), a.enableVertexAttribArray(s.index), 
                a.vertexAttribPointer(s.index, s.itemSize, s.type, !1, 0, 0);
            }
            for (var f in n.uniforms) {
                var o = n.uniforms[f], u = o.index, l = r.uniforms[f];
                switch (o.type) {
                  case "t":
                    var E = l ? e.layers[l].texture : e.source.texture;
                    a.activeTexture(a["TEXTURE" + t]), a.bindTexture(a.TEXTURE_2D, E), a.uniform1i(u, t), 
                    t++;
                    break;

                  case "f":
                  case "f 1":
                    a.uniform1f(u, l);
                    break;

                  case "f 2":
                    a.uniform2fv(u, l);
                    break;

                  case "f 3":
                    a.uniform3fv(u, l);
                    break;

                  case "f 4":
                    a.uniform4fv(u, l);
                    break;

                  case "m 2":
                    a.uniformMatrix2fv(u, !1, l);
                    break;

                  case "m 3":
                    a.uniformMatrix3fv(u, !1, l);
                    break;

                  case "m 4":
                    a.uniformMatrix4fv(u, !1, l);
                    break;

                  case "i":
                  case "i 1":
                    a.uniform1i(u, l);
                    break;

                  case "i 2":
                    a.uniform2iv(u, l);
                    break;

                  case "i 3":
                    a.uniform3iv(u, l);
                    break;

                  case "i 4":
                    a.uniform4iv(u, l);
                    break;

                  default:
                    console.error("Uniform type " + o.type + " unknown. uniform " + f + " not set!");
                }
            }
            i.elements ? (a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, i.elements.buffer), a.drawElements(i.drawType, i.itemCount, i.elements.glType, 0)) : a.drawArrays(i.drawType, 0, i.itemCount);
        }
        function b(e, r) {
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
            var t, a;
            r.wrap ? t = a = r.wrap : (a = r.wrapT, t = r.wrapS), t && e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e[t]), 
            a && e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e[a]), r.magFilter && e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e[r.magFilter]), 
            r.minFilter && e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e[r.minFilter]);
        }
        function p(e, r, t) {
            null == r.frameBuffer && (r.frameBuffer = e.createFramebuffer()), null == r.texture && (r.texture = r.texture || e.createTexture()), 
            null == r.depthBuffer && (r.depthBuffer = e.createRenderbuffer()), e.bindTexture(e.TEXTURE_2D, r.texture), 
            e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, t.width, t.height, 0, e.RGBA, e.UNSIGNED_BYTE, null), 
            v(e, t), e.bindRenderbuffer(e.RENDERBUFFER, r.depthBuffer), e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_COMPONENT16, t.width, t.height), 
            e.bindFramebuffer(e.FRAMEBUFFER, r.frameBuffer), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, r.texture, 0), 
            e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.RENDERBUFFER, r.depthBuffer);
            var a = e.checkFramebufferStatus(e.FRAMEBUFFER);
            a !== e.FRAMEBUFFER_COMPLETE && console.error("framebuffer error", a, t), e.bindFramebuffer(e.FRAMEBUFFER, null), 
            e.bindTexture(e.TEXTURE_2D, null), e.bindRenderbuffer(e.RENDERBUFFER, null);
        }
        function h(e) {
            if (A(e)) return e.buffer;
            var r = window[e.type];
            return new r(e.array);
        }
        function O(e, r) {
            if (e instanceof Uint8Array) return r.UNSIGNED_BYTE;
            if (e instanceof Uint16Array) return r.UNSIGNED_SHORT;
            if (e instanceof Uint32Array) return r.UNSIGNED_INT;
            throw new TypeError("invalid array type");
        }
        function A(e) {
            return null != e.buffer;
        }
        var F = t(2);
        t(4), r.create = a, r.init = n, r.updateSettings = u, r.updateObject = l, r.updateShader = E, 
        r.updateGeometry = d, r.updateLayer = c, r.updateSize = R, r.renderLayers = g;
        var y = {
            f: 1,
            "f 1": 1,
            "f 2": 2,
            "f 3": 3,
            "f 4": 4,
            "m 2": 4,
            "m 3": 9,
            "m 4": 16
        };
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r["default"] = {
            create: a,
            init: n,
            updateSettings: u,
            updateObject: l,
            updateGeometry: d,
            updateShader: E,
            updateLayer: c,
            updateSize: R,
            renderLayers: g,
            lib: F["default"]
        };
    }, function(e, r, t) {
        "use strict";
        var a = t(3);
        t(4), Object.defineProperty(r, "__esModule", {
            value: !0
        }), r["default"] = {
            geometries: {
                renderQuad: {
                    attribs: (n = {}, n[a.GEOMETRY_PROP_POSITION] = {
                        buffer: new Float32Array([ -1, 1, -1, -1, 1, 1, 1, -1 ]),
                        storeType: "STATIC"
                    }, n[a.GEOMETRY_PROP_UV] = {
                        buffer: new Float32Array([ 0, 1, 0, 0, 1, 1, 1, 0 ]),
                        storeType: "STATIC"
                    }, n),
                    drawType: "TRIANGLE_STRIP",
                    itemCount: 4
                }
            },
            shaders: {
                basicEffect: {
                    vert: "\n        attribute vec2 " + a.GEOMETRY_PROP_POSITION + ";\n        attribute vec2 " + a.GEOMETRY_PROP_UV + ";\n        varying vec2 vUv;\n        void main() {\n          vUv = " + a.GEOMETRY_PROP_UV + ";\n          gl_Position = vec4(" + a.GEOMETRY_PROP_POSITION + ", 0.0, 1.0);\n        }",
                    frag: "\n        uniform sampler2D " + a.UNIFORM_SOURCE_TEXTURE + ";\n        varying vec2 vUv;\n        void main() {\n          gl_FragColor = texture2D(" + a.UNIFORM_SOURCE_TEXTURE + ", vUv);\n        }",
                    attribs: (i = {}, i[a.GEOMETRY_PROP_POSITION] = "f 2", i[a.GEOMETRY_PROP_UV] = "f 2", 
                    i),
                    uniforms: (f = {}, f[a.UNIFORM_SOURCE_TEXTURE] = "t", f)
                }
            },
            objects: {
                resultScreen: {
                    shader: "_basicEffect",
                    geometry: "_renderQuad"
                }
            }
        };
        var n, i, f;
    }, function(e, r) {
        "use strict";
        r.GEOMETRY_PROP_POSITION = "position", r.GEOMETRY_PROP_NORMAL = "normal", r.GEOMETRY_PROP_UV = "uv", 
        r.UNIFORM_SOURCE_TEXTURE = "source";
    }, function(e, r) {}, function(e, r) {
        "use strict";
        function t(e, r, t, a) {
            var n, i, f = e / 2, s = r / 2, o = t || 1, u = a || 1, l = o + 1, E = u + 1, d = e / o, c = r / u, T = new Float32Array(l * E * 3), R = new Float32Array(l * E * 3), g = new Float32Array(l * E * 2), m = 0, b = 0;
            for (n = 0; n < E; n++) {
                var _ = n * c - s;
                for (i = 0; i < l; i++) {
                    var v = i * d - f;
                    T[m] = v, T[m + 1] = -_, R[m + 2] = 1, g[b] = i / o, g[b + 1] = 1 - n / u, m += 3, 
                    b += 2;
                }
            }
            m = 0;
            var p = new (T.length / 3 > 65535 ? Uint32Array : Uint16Array)(o * u * 6);
            for (n = 0; n < u; n++) for (i = 0; i < o; i++) {
                var h = i + l * n, O = i + l * (n + 1), A = i + 1 + l * (n + 1), F = i + 1 + l * n;
                p[m] = h, p[m + 1] = O, p[m + 2] = F, p[m + 3] = O, p[m + 4] = A, p[m + 5] = F, 
                m += 6;
            }
            return {
                attribs: {
                    position: {
                        buffer: T,
                        storeType: "STATIC"
                    },
                    normal: {
                        buffer: R,
                        storeType: "STATIC"
                    },
                    uv: {
                        buffer: g,
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
        r.plane = t;
    }, function(e, r, t) {
        "use strict";
        function a(e) {
            for (var r = [], t = 0; t < e.length; t++) for (var a = e[t], n = 0; n < a.length; n++) r.push(a[n]);
            return r;
        }
        function n(e) {
            var t = {
                drawType: "TRIANGLES",
                attribs: {},
                elements: {
                    buffer: null
                },
                itemCount: 0
            };
            for (var n in e) {
                var f = e[n];
                n === r.STACK_GL_GEOMETRY_PROP_ELEMENTS ? (t.elements.buffer = new (f.length > 65535 ? Uint32Array : Uint16Array)(a(f)), 
                t.itemCount = t.elements.buffer.length) : n === r.STACK_GL_GEOMETRY_PROP_POSITION ? t.attribs[i.GEOMETRY_PROP_POSITION] = {
                    buffer: new Float32Array(a(f))
                } : n === r.STACK_GL_GEOMETRY_PROP_NORMAL ? t.attribs[i.GEOMETRY_PROP_NORMAL] = {
                    buffer: new Float32Array(a(f))
                } : n === r.STACK_GL_GEOMETRY_PROP_UV ? t.attribs[i.GEOMETRY_PROP_UV] = {
                    buffer: new Float32Array(a(f))
                } : t.attribs[n] = {
                    buffer: new Float32Array(a(f))
                };
            }
            return t;
        }
        var i = t(3);
        r.STACK_GL_GEOMETRY_PROP_POSITION = "positions", r.STACK_GL_GEOMETRY_PROP_NORMAL = "normals", 
        r.STACK_GL_GEOMETRY_PROP_UV = "normals", r.STACK_GL_GEOMETRY_PROP_ELEMENTS = "cells", 
        r.fromGLStackGeometry = n;
    } ]);
});