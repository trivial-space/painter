import { painter } from '../painter';
import shaderCode from './shader.glsl';
import { Painter } from '../../lib/painter';
Painter.debug = true;
// effect
let strength = 10;
const passes = [];
while (strength >= 1) {
    console.log(strength);
    passes.push({
        direction: 0,
        strength: strength,
        source: null,
        size: [256, 256]
    });
    passes.push({
        direction: 1,
        strength: strength,
        source: null,
        size: [256, 256]
    });
    strength /= 2;
}
const layer = painter.createEffectLayer().update({
    buffered: true,
    doubleBuffered: true,
    width: 256,
    height: 256,
    minFilter: 'LINEAR',
    magFilter: 'LINEAR',
    frag: shaderCode,
    uniforms: passes
});
// scene
const form = painter.createForm().update({
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
    drawType: 'TRIANGLE_STRIP',
    itemCount: 4
});
const shade = painter.createShade().update({
    vert: `
		attribute vec2 position;
		attribute vec2 uv;
		varying vec2 vUv;
		void main() {
			gl_Position = vec4(position, 0.0, 1.0);
			vUv = uv;
		}
	`,
    frag: `precision mediump float;
		uniform sampler2D tex;
		varying vec2 vUv;
		void main() {
			gl_FragColor = texture2D(tex, vUv);
		}
	`
});
const scene = painter.createDrawingLayer().update({
    sketches: [painter.createSketch().update({
            form, shade, uniforms: { tex: () => layer.texture() }
        })],
    drawSettings: {
        clearColor: [1, 0.7, 0.8, 1],
        clearBits: painter.gl.COLOR_BUFFER_BIT
    }
});
const texture = painter.createStaticLayer().update({
    minFilter: 'LINEAR',
    magFilter: 'LINEAR'
});
const img = new Image();
img.onload = function () {
    texture.update({
        asset: img
    });
    painter.compose(texture, layer, scene);
};
img.src = '../hepatica_256.png';
//# sourceMappingURL=main.js.map