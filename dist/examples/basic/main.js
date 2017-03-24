var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import renderer from 'index';
import { ctx } from '../ctx';
var scene = {
    geometries: {
        planeGeometry: {
            attribs: {
                position: {
                    buffer: new Float32Array([
                        -0.7, 0.7,
                        -0.5, -0.4,
                        0.6, 0.5,
                        0.5, -0.5
                    ])
                },
                uv: {
                    buffer: new Float32Array([
                        0, 1,
                        0, 0,
                        1, 1,
                        1, 0
                    ])
                }
            },
            drawType: "TRIANGLE_STRIP",
            itemCount: 4
        }
    },
    shaders: {
        red: {
            vert: "\n          attribute vec2 position;\n          void main() {\n              gl_Position = vec4(position, 0.0, 1.0);\n          }\n        ",
            frag: "\n          void main() {\n              gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n          }\n        ",
            attribs: {
                position: "f 2"
            }
        },
        texture: renderer.lib.shaders.basicEffect,
        effect: __assign({}, renderer.lib.shaders.basicEffect, { frag: "\n          uniform sampler2D source;\n          varying vec2 vUv;\n          void main() {\n              vec4 new_color = texture2D(source, vUv);\n              gl_FragColor = vec4(new_color.rgb * 0.5 + 0.3, 1.0);\n          }\n        " })
    },
    objects: {
        plane1: {
            shader: "red",
            geometry: "planeGeometry"
        },
        plane2: {
            shader: "texture",
            geometry: "planeGeometry"
        }
    },
    layers: {
        textureLayer: {
            objects: ["plane1"],
            clearColor: [1.0, 0.0, 1.0, 1.0]
        },
        planeLayer: {
            objects: ["plane2"],
            clearColor: [0.0, 0.0, 0.0, 1.0]
        },
        effectLayer: {
            shader: "effect",
        }
    }
};
renderer.init(ctx, scene);
renderer.renderLayers(ctx, ['textureLayer', 'planeLayer', 'effectLayer']);
//# sourceMappingURL=main.js.map