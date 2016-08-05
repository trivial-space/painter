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
            return o(t, t.settings), c(t, "_renderQuad", y["default"].geometries.renderQuad), 
            d(t, "_basicEffect", y["default"].shaders.basicEffect), l(t, "_result", y["default"].objects.resultScreen), 
            m(t);
        }
        function n(e, r) {
            return o(e, r.settings), i(e, r.shaders), f(e, r.geometries), u(e, r.objects), s(e, r.layers), 
            m(e);
        }
        function i(e, r) {
            if (r) for (var t in r) {
                var a = r[t];
                d(e, t, a);
            }
        }
        function s(e, r) {
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
        function u(e, r) {
            if (r) for (var t in r) {
                var a = r[t];
                l(e, t, a);
            }
        }
        function o(e, r) {
            void 0 === r && (r = {});
            var t = e.gl;
            if (null != r.clearColor && (e.settings.clearColor = r.clearColor), null != r.minFilter && (e.settings.minFilter = r.minFilter), 
            null != r.magFilter && (e.settings.magFilter = r.magFilter), null != r.wrap && (e.settings.wrap = r.wrap), 
            null != r.clearBuffers && (e.settings.clearBuffers = r.clearBuffers, e.settings.clearBits = R(t, r.clearBuffers)), 
            null != r.enable) {
                for (var a = 0, n = e.settings.enable; a < n.length; a++) {
                    var i = n[a];
                    t.disable(t[i]);
                }
                e.settings.enable = r.enable;
                for (var s = 0, f = e.settings.enable; s < f.length; s++) {
                    var i = f[s];
                    t.enable(t[i]);
                }
            }
            return void 0 !== r.blend && (e.settings.blend = r.blend), e.settings.blend && p(t, e.settings.blend), 
            e;
        }
        function l(e, r, t) {
            var a = e.objects[r], n = Object.assign({}, t, {
                type: "initialized"
            });
            if (null == n.uniforms && (n.uniforms = {}), e.objects[r] = n, a && "missing" === a.type) for (var i in a.updateLayers) E(e, i, a.updateLayers[i]);
            return e;
        }
        function d(e, r, t) {
            var a = e.shaders[r] || {}, n = null == a.program, i = e.gl, s = "precision mediump float;\n" + t.frag;
            n && (a.program = i.createProgram()), null == a.vert && (a.vert = i.createShader(i.VERTEX_SHADER)), 
            null == a.frag && (a.frag = i.createShader(i.FRAGMENT_SHADER)), i.shaderSource(a.vert, t.vert), 
            i.shaderSource(a.frag, s), i.compileShader(a.vert), i.compileShader(a.frag), i.getShaderParameter(a.vert, i.COMPILE_STATUS) || console.error("Error Compiling Vertex Shader!\n", i.getShaderInfoLog(a.vert), t.vert), 
            i.getShaderParameter(a.frag, i.COMPILE_STATUS) || console.error("Error Compiling Fragment Shader!\n", i.getShaderInfoLog(a.frag), t.frag), 
            n && (i.attachShader(a.program, a.vert), i.attachShader(a.program, a.frag)), i.linkProgram(a.program), 
            a.attribs = {};
            for (var f in t.attribs) {
                var u = t.attribs[f], o = {
                    index: i.getAttribLocation(a.program, f),
                    type: i.FLOAT,
                    itemSize: A[u]
                };
                o.index < 0 && console.error('attribute "' + f + '" could not be found in shader', t.vert), 
                a.attribs[f] = o;
            }
            a.uniforms = {};
            for (var l in t.uniforms) a.uniforms[l] = {
                index: i.getUniformLocation(a.program, l),
                type: t.uniforms[l]
            };
            return e.shaders[r] = a, e;
        }
        function c(e, r, t) {
            var a = e.gl, n = e.geometries[r] || {};
            n.drawType = a[t.drawType], n.itemCount = t.itemCount;
            var i = n.attribs || {};
            for (var s in t.attribs) {
                var f = t.attribs[s];
                null == i[s] && (i[s] = a.createBuffer()), a.bindBuffer(a.ARRAY_BUFFER, i[s]), a.bufferData(a.ARRAY_BUFFER, h(f), a[(f.storeType || "STATIC") + "_DRAW"]);
            }
            if (n.attribs = i, t.elements) {
                null == n.elements && (n.elements = {
                    buffer: null,
                    glType: null
                }), null == n.elements.buffer && (n.elements.buffer = a.createBuffer());
                var u = h(t.elements);
                n.elements.glType = F(u, a), a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, n.elements.buffer), 
                a.bufferData(a.ELEMENT_ARRAY_BUFFER, u, a[(t.elements.storeType || "STATIC") + "_DRAW"]);
            } else n.elements && delete n.elements;
            return e.geometries[r] = n, e;
        }
        function E(e, r, t) {
            var a = e.layers[r] || {};
            if (a.noClear = t.noClear, a.clearColor = t.clearColor || e.settings.clearColor, 
            t.buffered ? (a.renderTarget = {
                width: t.width || e.settings.width,
                height: t.height || e.settings.height,
                frameBuffer: null,
                texture: null,
                depthBuffer: null
            }, _(e.gl, a.renderTarget, t)) : delete a.renderTarget, t.asset) a.type = "static", 
            g(e.gl, a, t); else if (t.objects) {
                var n = a;
                n.type = "objects", n.transparents = [], n.opaques = [];
                for (var i = 0, s = t.objects; i < s.length; i++) {
                    var f = s[i], u = e.objects[f];
                    u ? "initialized" === u.type ? u.blend ? n.transparents.push(f) : n.opaques.push(f) : u.updateLayers[r] = t : e.objects[f] = {
                        type: "missing",
                        updateLayers: (o = {}, o[r] = t, o)
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
            var o;
        }
        function g(e, r, t) {
            var a = r.texture || e.createTexture();
            e.bindTexture(e.TEXTURE_2D, a), v(e, t), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t.asset), 
            e.generateMipmap(e.TEXTURE_2D), e.bindTexture(e.TEXTURE_2D, null), r.texture = a;
        }
        function m(e, r, t) {
            var a = e.gl;
            return r && (e.settings.width = r), t && (e.settings.height = t), a.canvas.width === e.settings.width && a.canvas.height === e.settings.height || (a.canvas.height = e.settings.height, 
            a.canvas.width = e.settings.width), _(e.gl, e.source, e.settings), _(e.gl, e.target, e.settings), 
            e;
        }
        function T(e, r) {
            for (var t = e.gl, a = r.length - 1, n = 0; n < r.length; n++) {
                var i = r[n], s = e.layers[i], f = n === a, u = !f && null == s.renderTarget;
                switch (f ? (t.bindFramebuffer(t.FRAMEBUFFER, null), t.viewport(0, 0, t.drawingBufferWidth, t.drawingBufferHeight)) : u ? (t.bindFramebuffer(t.FRAMEBUFFER, e.target.frameBuffer), 
                t.viewport(0, 0, t.drawingBufferWidth, t.drawingBufferHeight)) : (t.bindFramebuffer(t.FRAMEBUFFER, s.renderTarget.frameBuffer), 
                t.viewport(0, 0, s.renderTarget.width, s.renderTarget.height)), s.noClear || (t.clearColor.apply(t, s.clearColor || e.settings.clearColor), 
                t.clear(e.settings.clearBits)), s.type) {
                  case "shader":
                    b(e, s.object);
                    break;

                  case "objects":
                    for (var o = 0, l = s.opaques; o < l.length; o++) {
                        var d = l[o];
                        b(e, e.objects[d]);
                    }
                    if (s.transparents.length) {
                        t.enable(t.BLEND);
                        for (var c = 0, E = s.transparents; c < E.length; c++) {
                            var d = E[c];
                            b(e, e.objects[d]);
                        }
                        t.disable(t.BLEND);
                    }
                    break;

                  case "static":
                    if (f) {
                        var g = Object.assign({}, e.objects._result, {
                            uniforms: {
                                source: i
                            }
                        });
                        b(e, g);
                    }
                }
                if (u) {
                    var m = e.source;
                    e.source = e.target, e.target = m;
                }
            }
        }
        function b(e, r) {
            var t = 0, a = e.gl, n = e.shaders[r.shader], i = e.geometries[r.geometry];
            a.useProgram(n.program);
            for (var s in n.attribs) {
                var f = n.attribs[s];
                a.bindBuffer(a.ARRAY_BUFFER, i.attribs[s]), a.enableVertexAttribArray(f.index), 
                a.vertexAttribPointer(f.index, f.itemSize, f.type, !1, 0, 0);
            }
            for (var s in n.uniforms) {
                var u = n.uniforms[s], o = u.index, l = r.uniforms[s];
                switch (u.type) {
                  case "t":
                    var d = l ? e.layers[l].texture : e.source.texture;
                    a.activeTexture(a["TEXTURE" + t]), a.bindTexture(a.TEXTURE_2D, d), a.uniform1i(o, t), 
                    t++;
                    break;

                  case "f":
                  case "f 1":
                    a.uniform1f(o, l);
                    break;

                  case "f 2":
                    a.uniform2fv(o, l);
                    break;

                  case "f 3":
                    a.uniform3fv(o, l);
                    break;

                  case "f 4":
                    a.uniform4fv(o, l);
                    break;

                  case "m 2":
                    a.uniformMatrix2fv(o, !1, l);
                    break;

                  case "m 3":
                    a.uniformMatrix3fv(o, !1, l);
                    break;

                  case "m 4":
                    a.uniformMatrix4fv(o, !1, l);
                    break;

                  case "i":
                  case "i 1":
                    a.uniform1i(o, l);
                    break;

                  case "i 2":
                    a.uniform2iv(o, l);
                    break;

                  case "i 3":
                    a.uniform3iv(o, l);
                    break;

                  case "i 4":
                    a.uniform4iv(o, l);
                    break;

                  default:
                    console.error("Uniform type " + u.type + " unknown. uniform " + s + " not set!");
                }
            }
            i.elements ? (a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, i.elements.buffer), a.drawElements(i.drawType, i.itemCount, i.elements.glType, 0)) : a.drawArrays(i.drawType, 0, i.itemCount);
        }
        function R(e, r) {
            return r.reduce(function(r, t) {
                return r | e[t + "_BUFFER_BIT"];
            }, 0);
        }
        function p(e, r) {
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
        function _(e, r, t) {
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
            if (U(e)) return e.buffer;
            var r = window[e.type];
            return new r(e.array);
        }
        function F(e, r) {
            if (e instanceof Uint8Array) return r.UNSIGNED_BYTE;
            if (e instanceof Uint16Array) return r.UNSIGNED_SHORT;
            if (e instanceof Uint32Array) return r.UNSIGNED_INT;
            throw new TypeError("invalid array type");
        }
        function U(e) {
            return null != e.buffer;
        }
        var y = t(1);
        t(3), r.create = a, r.init = n, r.updateSettings = o, r.updateObject = l, r.updateShader = d, 
        r.updateGeometry = c, r.updateLayer = E, r.updateSize = m, r.renderLayers = T;
        var A = {
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
            updateSettings: o,
            updateObject: l,
            updateGeometry: c,
            updateShader: d,
            updateLayer: E,
            updateSize: m,
            renderLayers: T,
            lib: y["default"]
        };
    }, function(e, r, t) {
        "use strict";
        var a = t(2);
        t(3), Object.defineProperty(r, "__esModule", {
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
                    uniforms: (s = {}, s[a.UNIFORM_SOURCE_TEXTURE] = "t", s)
                }
            },
            objects: {
                resultScreen: {
                    shader: "_basicEffect",
                    geometry: "_renderQuad"
                }
            }
        };
        var n, i, s;
    }, function(e, r) {
        "use strict";
        r.GEOMETRY_PROP_POSITION = "position", r.GEOMETRY_PROP_NORMAL = "normal", r.GEOMETRY_PROP_UV = "uv", 
        r.UNIFORM_SOURCE_TEXTURE = "source";
    }, function(e, r) {} ]);
});