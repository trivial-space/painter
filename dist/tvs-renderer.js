!function(e, r) {
    "object" == typeof exports && "object" == typeof module ? module.exports = r() : "function" == typeof define && define.amd ? define([], r) : "object" == typeof exports ? exports.tvsRenderer = r() : e.tvsRenderer = r();
}(this, function() {
    return function(e) {
        function r(n) {
            if (t[n]) return t[n].exports;
            var a = t[n] = {
                exports: {},
                id: n,
                loaded: !1
            };
            return e[n].call(a.exports, a, a.exports, r), a.loaded = !0, a.exports;
        }
        var t = {};
        return r.m = e, r.c = t, r.p = "", r(0);
    }([ function(e, r, t) {
        "use strict";
        function n(e) {
            if (e && e.__esModule) return e;
            var r = {};
            if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
            return r.default = e, r;
        }
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.renderer = r.constants = r.renderUtils = void 0;
        var i = t(1), o = a(i), f = t(3), u = n(f), l = t(4), s = t(5), d = n(s), c = t(6);
        n(c), r.renderUtils = {
            geometry: {
                plane: l.plane
            },
            stackgl: d
        }, r.constants = u, r.renderer = o.default;
        r.default = o.default;
    }, function(e, r, t) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        function a(e, r, t) {
            return r in e ? Object.defineProperty(e, r, {
                value: t,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[r] = t, e;
        }
        function i(e) {
            null == e && (e = document.createElement("canvas"));
            var r = e.getContext("webgl") || e.getContext("experimental-webgl");
            if (!r) throw Error("WebGL-Context could not be initialized!");
            var t = {
                settings: Object.assign({}, S.default.defaultSettings),
                shaders: {},
                geometries: {},
                layers: {},
                objects: {},
                source: {},
                target: {},
                gl: r
            };
            return d(t, t.settings), T(t, "_renderQuad", S.default.geometries.renderQuad), E(t, "_basicEffect", S.default.shaders.basicEffect), 
            c(t, "_result", S.default.objects.resultScreen), v(t);
        }
        function o(e, r) {
            return d(e, r.settings), f(e, r.shaders), l(e, r.geometries), s(e, r.objects), u(e, r.layers), 
            v(e);
        }
        function f(e, r) {
            if (r) for (var t in r) {
                var n = r[t];
                E(e, t, n);
            }
        }
        function u(e, r) {
            if (r) for (var t in r) {
                var n = r[t];
                b(e, t, n);
            }
        }
        function l(e, r) {
            if (r) for (var t in r) {
                var n = r[t];
                T(e, t, n);
            }
        }
        function s(e, r) {
            if (r) for (var t in r) {
                var n = r[t];
                c(e, t, n);
            }
        }
        function d(e) {
            var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, t = e.gl;
            if (null != r.clearColor && (e.settings.clearColor = r.clearColor), null != r.minFilter && (e.settings.minFilter = r.minFilter), 
            null != r.magFilter && (e.settings.magFilter = r.magFilter), null != r.wrap && (e.settings.wrap = r.wrap), 
            null != r.clearBuffers && (e.settings.clearBuffers = r.clearBuffers, e.settings.clearBits = g(t, r.clearBuffers)), 
            null != r.enable) {
                var n = !0, a = !1, i = void 0;
                try {
                    for (var o, f = e.settings.enable[Symbol.iterator](); !(n = (o = f.next()).done); n = !0) {
                        var u = o.value;
                        t.disable(t[u]);
                    }
                } catch (e) {
                    a = !0, i = e;
                } finally {
                    try {
                        !n && f.return && f.return();
                    } finally {
                        if (a) throw i;
                    }
                }
                e.settings.enable = r.enable;
                var l = !0, s = !1, d = void 0;
                try {
                    for (var c, E = e.settings.enable[Symbol.iterator](); !(l = (c = E.next()).done); l = !0) {
                        var T = c.value;
                        t.enable(t[T]);
                    }
                } catch (e) {
                    s = !0, d = e;
                } finally {
                    try {
                        !l && E.return && E.return();
                    } finally {
                        if (s) throw d;
                    }
                }
            }
            return void 0 !== r.blend && (e.settings.blend = r.blend), e.settings.blend && p(t, e.settings.blend), 
            e;
        }
        function c(e, r, t) {
            var n = e.objects[r], a = Object.assign({}, t, {
                type: "initialized"
            });
            if (null == a.uniforms && (a.uniforms = {}), e.objects[r] = a, n && "missing" === n.type) for (var i in n.updateLayers) b(e, i, n.updateLayers[i]);
            return e;
        }
        function E(e, r, t) {
            var n = e.shaders[r] || {}, a = null == n.program, i = e.gl, o = "precision mediump float;\n" + t.frag;
            a && (n.program = i.createProgram()), null == n.vert && (n.vert = i.createShader(i.VERTEX_SHADER)), 
            null == n.frag && (n.frag = i.createShader(i.FRAGMENT_SHADER)), i.shaderSource(n.vert, t.vert), 
            i.shaderSource(n.frag, o), i.compileShader(n.vert), i.compileShader(n.frag), i.getShaderParameter(n.vert, i.COMPILE_STATUS) || console.error("Error Compiling Vertex Shader!\n", i.getShaderInfoLog(n.vert), t.vert), 
            i.getShaderParameter(n.frag, i.COMPILE_STATUS) || console.error("Error Compiling Fragment Shader!\n", i.getShaderInfoLog(n.frag), t.frag), 
            a && (i.attachShader(n.program, n.vert), i.attachShader(n.program, n.frag)), i.linkProgram(n.program), 
            n.attribs = {};
            for (var f in t.attribs) {
                var u = t.attribs[f], l = {
                    index: i.getAttribLocation(n.program, f),
                    type: i.FLOAT,
                    itemSize: U[u]
                };
                l.index < 0 && console.warn('attribute "' + f + '" could not be found in shader ' + r, t.vert), 
                n.attribs[f] = l;
            }
            n.uniforms = {};
            for (var s in t.uniforms) n.uniforms[s] = {
                index: i.getUniformLocation(n.program, s),
                type: t.uniforms[s]
            };
            return e.shaders[r] = n, e;
        }
        function T(e, r, t) {
            var n = e.gl, a = e.geometries[r] || {};
            a.drawType = n[t.drawType], a.itemCount = t.itemCount;
            var i = a.attribs || {};
            for (var o in t.attribs) {
                var f = t.attribs[o];
                null == i[o] && (i[o] = n.createBuffer()), n.bindBuffer(n.ARRAY_BUFFER, i[o]), n.bufferData(n.ARRAY_BUFFER, O(f), n[(f.storeType || "STATIC") + "_DRAW"]);
            }
            if (a.attribs = i, t.elements) {
                null == a.elements && (a.elements = {
                    buffer: null,
                    glType: null
                }), null == a.elements.buffer && (a.elements.buffer = n.createBuffer());
                var u = O(t.elements);
                a.elements.glType = A(u, n), n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, a.elements.buffer), 
                n.bufferData(n.ELEMENT_ARRAY_BUFFER, u, n[(t.elements.storeType || "STATIC") + "_DRAW"]);
            } else a.elements && delete a.elements;
            return e.geometries[r] = a, e;
        }
        function b(e, r, t) {
            var n = e.layers[r] || {};
            if (n.noClear = !!t.noClear, n.clearColor = t.clearColor || e.settings.clearColor, 
            t.buffered ? (n.renderTarget = {
                width: t.width || e.settings.width,
                height: t.height || e.settings.height,
                frameBuffer: null,
                texture: null,
                depthBuffer: null
            }, h(e.gl, n.renderTarget, t)) : delete n.renderTarget, t.asset) n.type = "static", 
            _(e.gl, n, t); else if (t.objects) {
                var i = n;
                i.type = "objects", i.transparents = [], i.opaques = [], i.uniforms = t.uniforms || {};
                var o = !0, f = !1, u = void 0;
                try {
                    for (var l, s = t.objects[Symbol.iterator](); !(o = (l = s.next()).done); o = !0) {
                        var d = l.value, c = e.objects[d];
                        c ? "initialized" === c.type ? c.blend ? i.transparents.push(d) : i.opaques.push(d) : c.updateLayers[r] = t : e.objects[d] = {
                            type: "missing",
                            updateLayers: a({}, r, t)
                        };
                    }
                } catch (e) {
                    f = !0, u = e;
                } finally {
                    try {
                        !o && s.return && s.return();
                    } finally {
                        if (f) throw u;
                    }
                }
            } else if (t.shader) {
                var E = n;
                E.type = "shader", E.object = {
                    type: "initialized",
                    shader: t.shader,
                    geometry: "_renderQuad",
                    uniforms: t.uniforms || {}
                };
            }
            return e.layers[r] = n, e;
        }
        function _(e, r, t) {
            var n = r.texture || e.createTexture();
            e.bindTexture(e.TEXTURE_2D, n), y(e, t), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t.asset), 
            t.minFilter && t.minFilter.indexOf("MIPMAP") > 0 && e.generateMipmap(e.TEXTURE_2D), 
            e.bindTexture(e.TEXTURE_2D, null), r.texture = n;
        }
        function v(e) {
            var r = e.gl, t = r.canvas.clientWidth || r.canvas.width, n = r.canvas.clientHeight || r.canvas.height;
            return t === e.settings.width && n === e.settings.height || (r.canvas.height = e.settings.height = n, 
            r.canvas.width = e.settings.width = t, h(e.gl, e.source, e.settings), h(e.gl, e.target, e.settings)), 
            e;
        }
        function R(e, r) {
            for (var t = e.gl, n = r.length - 1, a = 0; a < r.length; a++) {
                var i = r[a], o = e.layers[i], f = a === n, u = !f && null == o.renderTarget;
                switch (f ? (t.bindFramebuffer(t.FRAMEBUFFER, null), t.viewport(0, 0, t.drawingBufferWidth, t.drawingBufferHeight)) : u ? (t.bindFramebuffer(t.FRAMEBUFFER, e.target.frameBuffer), 
                t.viewport(0, 0, t.drawingBufferWidth, t.drawingBufferHeight)) : o.renderTarget && (t.bindFramebuffer(t.FRAMEBUFFER, o.renderTarget.frameBuffer), 
                t.viewport(0, 0, o.renderTarget.width, o.renderTarget.height)), o.noClear || (t.clearColor.apply(t, o.clearColor || e.settings.clearColor), 
                t.clear(e.settings.clearBits)), o.type) {
                  case "shader":
                    m(e, o.object);
                    break;

                  case "objects":
                    var l = !0, s = !1, d = void 0;
                    try {
                        for (var c, E = o.opaques[Symbol.iterator](); !(l = (c = E.next()).done); l = !0) {
                            var T = c.value;
                            m(e, e.objects[T], o.uniforms);
                        }
                    } catch (e) {
                        s = !0, d = e;
                    } finally {
                        try {
                            !l && E.return && E.return();
                        } finally {
                            if (s) throw d;
                        }
                    }
                    if (o.transparents.length) {
                        t.enable(t.BLEND);
                        var b = !0, _ = !1, v = void 0;
                        try {
                            for (var R, g = o.transparents[Symbol.iterator](); !(b = (R = g.next()).done); b = !0) {
                                var p = R.value;
                                m(e, e.objects[p], o.uniforms);
                            }
                        } catch (e) {
                            _ = !0, v = e;
                        } finally {
                            try {
                                !b && g.return && g.return();
                            } finally {
                                if (_) throw v;
                            }
                        }
                        t.disable(t.BLEND);
                    }
                    break;

                  case "static":
                    if (f) {
                        var y = e.objects._result;
                        m(e, y, {
                            source: i
                        });
                    }
                }
                if (u) {
                    var h = e.source;
                    e.source = e.target, e.target = h;
                }
            }
        }
        function m(e, r, t) {
            var n = 0, a = e.gl, i = e.shaders[r.shader], o = e.geometries[r.geometry];
            a.useProgram(i.program);
            for (var f in i.attribs) {
                var u = i.attribs[f];
                a.bindBuffer(a.ARRAY_BUFFER, o.attribs[f]), a.enableVertexAttribArray(u.index), 
                a.vertexAttribPointer(u.index, u.itemSize, u.type, !1, 0, 0);
            }
            for (var l in i.uniforms) {
                var s = i.uniforms[l], d = s.index, c = r.uniforms[l] || t && t[l];
                switch (s.type) {
                  case "t":
                    var E = c ? e.layers[c].texture : e.source.texture;
                    a.activeTexture(a["TEXTURE" + n]), a.bindTexture(a.TEXTURE_2D, E), a.uniform1i(d, n), 
                    n++;
                    break;

                  case "f":
                  case "f 1":
                    a.uniform1f(d, c);
                    break;

                  case "f 2":
                    a.uniform2fv(d, c);
                    break;

                  case "f 3":
                    a.uniform3fv(d, c);
                    break;

                  case "f 4":
                    a.uniform4fv(d, c);
                    break;

                  case "m 2":
                    a.uniformMatrix2fv(d, !1, c);
                    break;

                  case "m 3":
                    a.uniformMatrix3fv(d, !1, c);
                    break;

                  case "m 4":
                    a.uniformMatrix4fv(d, !1, c);
                    break;

                  case "i":
                  case "i 1":
                    a.uniform1i(d, c);
                    break;

                  case "i 2":
                    a.uniform2iv(d, c);
                    break;

                  case "i 3":
                    a.uniform3iv(d, c);
                    break;

                  case "i 4":
                    a.uniform4iv(d, c);
                    break;

                  default:
                    console.error("Uniform type " + s.type + " unknown. uniform " + l + " not set!");
                }
            }
            o.elements && null != o.elements.glType ? (a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, o.elements.buffer), 
            a.drawElements(o.drawType, o.itemCount, o.elements.glType, 0)) : a.drawArrays(o.drawType, 0, o.itemCount);
        }
        function g(e, r) {
            return r.reduce(function(r, t) {
                return r | e[t + "_BUFFER_BIT"];
            }, 0);
        }
        function p(e, r) {
            e.blendFunc.apply(e, r.map(function(r) {
                return e[r];
            }));
        }
        function y(e, r) {
            e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, r.flipY);
            var t = void 0, n = void 0;
            r.wrap ? t = n = r.wrap : (n = r.wrapT, t = r.wrapS), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e[t || "CLAMP_TO_EDGE"]), 
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e[n || "CLAMP_TO_EDGE"]), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e[r.magFilter || "LINEAR"]), 
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e[r.minFilter || "LINEAR"]);
        }
        function h(e, r, t) {
            if (null != t.width && null != t.height) {
                null == r.frameBuffer && (r.frameBuffer = e.createFramebuffer()), null == r.texture && (r.texture = e.createTexture()), 
                null == r.depthBuffer && (r.depthBuffer = e.createRenderbuffer()), e.bindTexture(e.TEXTURE_2D, r.texture), 
                e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, t.width, t.height, 0, e.RGBA, e.UNSIGNED_BYTE, void 0), 
                y(e, t), e.bindRenderbuffer(e.RENDERBUFFER, r.depthBuffer), e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_COMPONENT16, t.width, t.height), 
                e.bindFramebuffer(e.FRAMEBUFFER, r.frameBuffer), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, r.texture, 0), 
                e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.RENDERBUFFER, r.depthBuffer);
                var n = e.checkFramebufferStatus(e.FRAMEBUFFER);
                n !== e.FRAMEBUFFER_COMPLETE && console.error("framebuffer error", n, t), e.bindFramebuffer(e.FRAMEBUFFER, null), 
                e.bindTexture(e.TEXTURE_2D, null), e.bindRenderbuffer(e.RENDERBUFFER, null);
            }
        }
        function O(e) {
            if (P(e)) return e.buffer;
            var r = window[e.type];
            return new r(e.array);
        }
        function A(e, r) {
            if (e instanceof Uint8Array) return r.UNSIGNED_BYTE;
            if (e instanceof Uint16Array) return r.UNSIGNED_SHORT;
            if (e instanceof Uint32Array) return r.UNSIGNED_INT;
            throw new TypeError("invalid array type");
        }
        function P(e) {
            return null != e.buffer;
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.create = i, r.init = o, r.updateSettings = d, r.updateObject = c, r.updateShader = E, 
        r.updateGeometry = T, r.updateLayer = b, r.updateSize = v, r.renderLayers = R;
        var F = t(2), S = n(F), U = {
            f: 1,
            "f 1": 1,
            "f 2": 2,
            "f 3": 3,
            "f 4": 4,
            "m 2": 4,
            "m 3": 9,
            "m 4": 16
        };
        r.default = {
            create: i,
            init: o,
            updateSettings: d,
            updateObject: c,
            updateGeometry: T,
            updateShader: E,
            updateLayer: b,
            updateSize: v,
            renderLayers: R,
            lib: S.default
        };
    }, function(e, r, t) {
        "use strict";
        function n(e) {
            if (e && e.__esModule) return e;
            var r = {};
            if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
            return r.default = e, r;
        }
        function a(e, r, t) {
            return r in e ? Object.defineProperty(e, r, {
                value: t,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[r] = t, e;
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        });
        var i, o, f = t(3), u = n(f);
        r.default = {
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
                    attribs: (i = {}, a(i, u.GEOMETRY_PROP_POSITION, {
                        buffer: new Float32Array([ -1, 1, -1, -1, 1, 1, 1, -1 ]),
                        storeType: "STATIC"
                    }), a(i, u.GEOMETRY_PROP_UV, {
                        buffer: new Float32Array([ 0, 1, 0, 0, 1, 1, 1, 0 ]),
                        storeType: "STATIC"
                    }), i),
                    drawType: "TRIANGLE_STRIP",
                    itemCount: 4
                }
            },
            shaders: {
                basicEffect: {
                    vert: "\n        attribute vec2 " + u.GEOMETRY_PROP_POSITION + ";\n        attribute vec2 " + u.GEOMETRY_PROP_UV + ";\n        varying vec2 vUv;\n        void main() {\n          vUv = " + u.GEOMETRY_PROP_UV + ";\n          gl_Position = vec4(" + u.GEOMETRY_PROP_POSITION + ", 0.0, 1.0);\n        }",
                    frag: "\n        uniform sampler2D " + u.UNIFORM_SOURCE_TEXTURE + ";\n        varying vec2 vUv;\n        void main() {\n          gl_FragColor = texture2D(" + u.UNIFORM_SOURCE_TEXTURE + ", vUv);\n        }",
                    attribs: (o = {}, a(o, u.GEOMETRY_PROP_POSITION, "f 2"), a(o, u.GEOMETRY_PROP_UV, "f 2"), 
                    o),
                    uniforms: a({}, u.UNIFORM_SOURCE_TEXTURE, "t")
                }
            },
            objects: {
                resultScreen: {
                    shader: "_basicEffect",
                    geometry: "_renderQuad"
                }
            }
        };
    }, function(e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        });
        r.GEOMETRY_PROP_POSITION = "position", r.GEOMETRY_PROP_NORMAL = "normal", r.GEOMETRY_PROP_UV = "uv", 
        r.UNIFORM_SOURCE_TEXTURE = "source";
    }, function(e, r) {
        "use strict";
        function t(e, r, t, n) {
            var a = e / 2, i = r / 2, o = t || 1, f = n || 1, u = o + 1, l = f + 1, s = e / o, d = r / f, c = new Float32Array(u * l * 3), E = new Float32Array(u * l * 3), T = new Float32Array(u * l * 2), b = void 0, _ = void 0, v = 0, R = 0;
            for (b = 0; b < l; b++) {
                var m = b * d - i;
                for (_ = 0; _ < u; _++) {
                    var g = _ * s - a;
                    c[v] = g, c[v + 1] = -m, E[v + 2] = 1, T[R] = _ / o, T[R + 1] = 1 - b / f, v += 3, 
                    R += 2;
                }
            }
            v = 0;
            var p = new (c.length / 3 > 65535 ? Uint32Array : Uint16Array)(o * f * 6);
            for (b = 0; b < f; b++) for (_ = 0; _ < o; _++) {
                var y = _ + u * b, h = _ + u * (b + 1), O = _ + 1 + u * (b + 1), A = _ + 1 + u * b;
                p[v] = y, p[v + 1] = h, p[v + 2] = A, p[v + 3] = h, p[v + 4] = O, p[v + 5] = A, 
                v += 6;
            }
            return {
                attribs: {
                    position: {
                        buffer: c,
                        storeType: "STATIC"
                    },
                    normal: {
                        buffer: E,
                        storeType: "STATIC"
                    },
                    uv: {
                        buffer: T,
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
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.plane = t;
    }, function(e, r, t) {
        "use strict";
        function n(e) {
            if (e && e.__esModule) return e;
            var r = {};
            if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
            return r.default = e, r;
        }
        function a(e) {
            for (var r = [], t = 0; t < e.length; t++) for (var n = e[t], a = 0; a < n.length; a++) r.push(n[a]);
            return r;
        }
        function i(e) {
            var r = {
                drawType: "TRIANGLES",
                attribs: {},
                itemCount: 0
            };
            for (var t in e) {
                var n = e[t];
                if (t === d) {
                    var i = new (n.length > 65535 ? Uint32Array : Uint16Array)(a(n));
                    r = Object.assign(r, {
                        elements: {
                            buffer: i
                        },
                        itemCount: i.length
                    });
                } else t === u ? r.attribs[f.GEOMETRY_PROP_POSITION] = {
                    buffer: new Float32Array(a(n))
                } : t === l ? r.attribs[f.GEOMETRY_PROP_NORMAL] = {
                    buffer: new Float32Array(a(n))
                } : t === s ? r.attribs[f.GEOMETRY_PROP_UV] = {
                    buffer: new Float32Array(a(n))
                } : r.attribs[t] = {
                    buffer: new Float32Array(a(n))
                };
            }
            return r;
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.STACK_GL_GEOMETRY_PROP_ELEMENTS = r.STACK_GL_GEOMETRY_PROP_UV = r.STACK_GL_GEOMETRY_PROP_NORMAL = r.STACK_GL_GEOMETRY_PROP_POSITION = void 0, 
        r.convertStackGLGeometry = i;
        var o = t(3), f = n(o), u = r.STACK_GL_GEOMETRY_PROP_POSITION = "positions", l = r.STACK_GL_GEOMETRY_PROP_NORMAL = "normals", s = r.STACK_GL_GEOMETRY_PROP_UV = "normals", d = r.STACK_GL_GEOMETRY_PROP_ELEMENTS = "cells";
    }, function(e, r) {
        "use strict";
    } ]);
});