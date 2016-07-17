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
                    clearBits: p(r, [ "DEPTH", "COLOR" ]),
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
            return u(t, t.settings), c(t, "_renderQuad", y["default"].geometries.renderQuad), 
            d(t, "_renderResult", y["default"].shaders.basicEffect), l(t, "_result", y["default"].objects.resultScreen), 
            E(t);
        }
        function n(e, r) {
            return u(e, r.settings), i(e, r.shaders), f(e, r.geometries), o(e, r.objects), s(e, r.layers), 
            E(e);
        }
        function i(e, r) {
            if (r) for (var t in r) {
                var a = r[t];
                d(e, t, a);
            }
            return e;
        }
        function s(e, r) {
            if (r) for (var t in r) {
                var a = r[t];
                g(e, t, a);
            }
            return e;
        }
        function f(e, r) {
            if (r) for (var t in r) {
                var a = r[t];
                c(e, t, a);
            }
            return e;
        }
        function o(e, r) {
            if (r) for (var t in r) {
                var a = r[t];
                l(e, t, a);
            }
            return e;
        }
        function u(e, r) {
            void 0 === r && (r = {});
            var t = e.gl;
            if (null != r.clearColor && (e.settings.clearColor = r.clearColor), null != r.minFilter && (e.settings.minFilter = r.minFilter), 
            null != r.magFilter && (e.settings.magFilter = r.magFilter), null != r.wrap && (e.settings.wrap = r.wrap), 
            null != r.clearBuffers && (e.settings.clearBits = p(t, r.clearBuffers)), null != r.enable) {
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
            return void 0 !== r.blend && (e.settings.blend = r.blend), e.settings.blend && v(t, e.settings.blend), 
            e;
        }
        function l(e, r, t) {
            return null == t.uniforms && (t.uniforms = {}), e.objects[r] = t, e;
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
                var o = t.attribs[f];
                a.attribs[f] = {
                    index: i.getAttribLocation(a.program, f),
                    type: i.FLOAT,
                    itemSize: U[o]
                };
            }
            a.uniforms = {};
            for (var u in t.uniforms) a.uniforms[u] = {
                index: i.getUniformLocation(a.program, u),
                type: t.uniforms[u]
            };
            return e.shaders[r] = a, e;
        }
        function c(e, r, t) {
            var a = e.gl, n = e.geometries[r] || {};
            n.drawType = a[t.drawType], n.itemCount = t.itemCount;
            var i = n.attribs || {};
            for (var s in t.attribs) {
                var f = t.attribs[s];
                null == i[s] && (i[s] = a.createBuffer()), a.bindBuffer(a.ARRAY_BUFFER, i[s]), a.bufferData(a.ARRAY_BUFFER, F(f), a[(f.storeType || "STATIC") + "_DRAW"]);
            }
            if (n.attribs = i, t.elements) {
                null == n.elements && (n.elements = {}), null == n.elements.buffer && (n.elements.buffer = a.createBuffer());
                var o = F(t.elements);
                n.elements.glType = _(o, a), a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, n.elements.buffer), 
                a.bufferData(a.ELEMENT_ARRAY_BUFFER, o, a[(t.elements.storeType || "STATIC") + "_DRAW"]);
            } else n.elements && delete n.elements;
            return e.geometries[r] = n, e;
        }
        function g(e, r, t) {
            var a = e.layers[r] || {};
            if (a.noClear = t.noClear, a.clearColor = t.clearColor || e.settings.clearColor, 
            t.buffered ? (a.renderTarget = {
                width: t.width || e.settings.width,
                height: t.height || e.settings.height
            }, h(e.gl, a.renderTarget, t)) : delete a.renderTarget, t.asset) {
                var n = a;
                n.type = "static", m(e.gl, n, t);
            } else if (t.objects) {
                var n = a;
                n.type = "objects", n.transparents = [], n.opaques = [];
                for (var i = 0, s = t.objects; i < s.length; i++) {
                    var f = s[i];
                    e.objects[f].blend ? n.transparents.push(f) : n.opaques.push(f);
                }
            } else if (t.shader) {
                var n = a;
                n.type = "shader", n.object = {
                    shader: t.shader,
                    geometry: "_renderQuad",
                    uniforms: t.uniforms || {}
                };
            }
            return e.layers[r] = a, e;
        }
        function m(e, r, t) {
            var a = r.texture || e.createTexture();
            e.bindTexture(e.TEXTURE_2D, a), R(e, t), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t.asset), 
            e.generateMipmap(e.TEXTURE_2D), e.bindTexture(e.TEXTURE_2D, null), r.texture = a;
        }
        function E(e, r, t) {
            var a = e.gl;
            return r && (e.settings.width = r), t && (e.settings.height = t), a.canvas.width === e.settings.width && a.canvas.height === e.settings.height || (a.canvas.height = e.settings.height, 
            a.canvas.width = e.settings.width), h(e.gl, e.source, e.settings), h(e.gl, e.target, e.settings), 
            e;
        }
        function b(e, r) {
            for (var t = e.gl, a = r.length - 1, n = 0; n < r.length; n++) {
                var i = r[n], s = e.layers[i], f = n === a, o = !f && null == s.renderTarget;
                switch (f ? (t.bindFramebuffer(t.FRAMEBUFFER, null), t.viewport(0, 0, t.drawingBufferWidth, t.drawingBufferHeight)) : o ? (t.bindFramebuffer(t.FRAMEBUFFER, e.target.frameBuffer), 
                t.viewport(0, 0, t.drawingBufferWidth, t.drawingBufferHeight)) : (t.bindFramebuffer(t.FRAMEBUFFER, s.renderTarget.frameBuffer), 
                t.viewport(0, 0, s.renderTarget.width, s.renderTarget.height)), s.noClear || (t.clearColor.apply(t, s.clearColor || e.settings.clearColor), 
                t.clear(e.settings.clearBits)), s.type) {
                  case "shader":
                    T(e, s.object);
                    break;

                  case "objects":
                    for (var u = s, l = 0, d = u.opaques; l < d.length; l++) {
                        var c = d[l];
                        T(e, e.objects[c]);
                    }
                    if (u.transparents.length) {
                        t.enable(t.BLEND);
                        for (var g = 0, m = u.transparents; g < m.length; g++) {
                            var c = m[g];
                            T(e, e.objects[c]);
                        }
                        t.disable(t.BLEND);
                    }
                    break;

                  case "static":                }
                if (o) {
                    var E = e.source;
                    e.source = e.target, e.target = E;
                }
            }
        }
        function T(e, r) {
            var t = 0, a = e.gl, n = e.shaders[r.shader], i = e.geometries[r.geometry];
            a.useProgram(n.program);
            for (var s in n.attribs) {
                var f = n.attribs[s];
                a.bindBuffer(a.ARRAY_BUFFER, i.attribs[s]), a.enableVertexAttribArray(f.index), 
                a.vertexAttribPointer(f.index, f.itemSize, f.type, !1, 0, 0);
            }
            for (var s in n.uniforms) {
                var o = n.uniforms[s], u = o.index, l = r.uniforms[s];
                switch (o.type) {
                  case "t":
                    var d = l ? e.layers[l].texture : e.source.texture;
                    a.activeTexture(a["TEXTURE" + t]), a.bindTexture(a.TEXTURE_2D, d), a.uniform1i(u, t), 
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
                    console.error("Uniform type " + o.type + " unknown. uniform " + s + " not set!");
                }
            }
            i.elements ? (a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, i.elements.buffer), a.drawElements(i.drawType, i.itemCount, i.elements.glType, 0)) : a.drawArrays(i.drawType, 0, i.itemCount);
        }
        function p(e, r) {
            return r.reduce(function(r, t) {
                return r | e[t + "_BUFFER_BIT"];
            }, 0);
        }
        function v(e, r) {
            e.blendFunc.apply(e, r.map(function(r) {
                return e[r];
            }));
        }
        function R(e, r) {
            e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, r.flipY), r.wrap && (r.wrapS = r.wrapT = r.wrap), 
            r.wrapS && e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e[r.wrapS]), r.wrapT && e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e[r.wrapT]), 
            r.magFilter && e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e[r.magFilter]), 
            r.minFilter && e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e[r.minFilter]);
        }
        function h(e, r, t) {
            null == r.frameBuffer && (r.frameBuffer = e.createFramebuffer()), null == r.texture && (r.texture = r.texture || e.createTexture()), 
            null == r.depthBuffer && (r.depthBuffer = e.createRenderbuffer()), e.bindTexture(e.TEXTURE_2D, r.texture), 
            e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, t.width, t.height, 0, e.RGBA, e.UNSIGNED_BYTE, null), 
            R(e, t), e.bindRenderbuffer(e.RENDERBUFFER, r.depthBuffer), e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_COMPONENT16, t.width, t.height), 
            e.bindFramebuffer(e.FRAMEBUFFER, r.frameBuffer), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, r.texture, 0), 
            e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.RENDERBUFFER, r.depthBuffer);
            var a = e.checkFramebufferStatus(e.FRAMEBUFFER);
            a !== e.FRAMEBUFFER_COMPLETE && console.error("framebuffer error", a, t), e.bindFramebuffer(e.FRAMEBUFFER, null), 
            e.bindTexture(e.TEXTURE_2D, null), e.bindRenderbuffer(e.RENDERBUFFER, null);
        }
        function F(e) {
            if (A(e)) return e.buffer;
            var r = window[e.type];
            return new r(e.array);
        }
        function _(e, r) {
            if (e instanceof Uint8Array) return r.UNSIGNED_BYTE;
            if (e instanceof Uint16Array) return r.UNSIGNED_SHORT;
            if (e instanceof Uint32Array) return r.UNSIGNED_INT;
            throw new TypeError("invalid array type");
        }
        function A(e) {
            return null != e.buffer;
        }
        var y = t(1);
        t(2), r.create = a, r.init = n, r.updateSettings = u, r.updateObject = l, r.updateShader = d, 
        r.updateGeometry = c, r.updateLayer = g, r.updateSize = E, r.renderLayers = b;
        var U = {
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
            updateGeometry: c,
            updateShader: d,
            updateLayer: g,
            updateSize: E,
            renderLayers: b,
            lib: y["default"]
        };
    }, function(e, r, t) {
        "use strict";
        t(2), Object.defineProperty(r, "__esModule", {
            value: !0
        }), r["default"] = {
            geometries: {
                renderQuad: {
                    attribs: {
                        position: {
                            buffer: new Float32Array([ -1, 1, -1, -1, 1, 1, 1, -1 ]),
                            storeType: "STATIC"
                        },
                        uv: {
                            buffer: new Float32Array([ 0, 1, 0, 0, 1, 1, 1, 0 ]),
                            storeType: "STATIC"
                        }
                    },
                    drawType: "TRIANGLE_STRIP",
                    itemCount: 4
                }
            },
            shaders: {
                basicEffect: {
                    vert: "\n        attribute vec2 position;\n        attribute vec2 uv;\n        varying vec2 vUv;\n        void main() {\n          vUv = uv;\n          gl_Position = vec4(position, 0.0, 1.0);\n        }",
                    frag: "\n        uniform sampler2D source;\n        varying vec2 vUv;\n        void main() {\n          gl_FragColor = texture2D(source, vUv);\n        }",
                    attribs: {
                        position: "f 2",
                        uv: "f 2"
                    },
                    uniforms: {
                        source: "t"
                    }
                }
            },
            objects: {
                resultScreen: {
                    shader: "basicEffect",
                    geometry: "renderQuad"
                }
            }
        };
    }, function(e, r) {} ]);
});