import { painter } from '../painter';
import shaderCode from './shader.glsl';
// effect
var strength = 10;
var passes = [];
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
var layer = painter.createEffectLayer().update({
    buffered: true,
    width: 256,
    height: 256,
    minFilter: 'LINEAR',
    magFilter: 'LINEAR',
    frag: shaderCode,
    uniforms: passes
});
// scene
var form = painter.createForm().update({
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
var shade = painter.createShade().update({
    vert: "\n\t\tattribute vec2 position;\n\t\tattribute vec2 uv;\n\t\tvarying vec2 vUv;\n\t\tvoid main() {\n\t\t\tgl_Position = vec4(position, 0.0, 1.0);\n\t\t\tvUv = uv;\n\t\t}\n\t",
    frag: "precision mediump float;\n\t\tuniform sampler2D tex;\n\t\tvarying vec2 vUv;\n\t\tvoid main() {\n\t\t\tgl_FragColor = texture2D(tex, vUv);\n\t\t}\n\t"
});
var scene = painter.createDrawingLayer().update({
    sketches: [painter.createSketch().update({
            form: form, shade: shade, uniforms: { tex: function () { return layer.texture(); } }
        })],
    drawSettings: {
        clearColor: [1, 0.7, 0.8, 1],
        clearBits: painter.gl.COLOR_BUFFER_BIT
    }
});
var texture = painter.createStaticLayer().update({
    minFilter: 'LINEAR',
    magFilter: 'LINEAR'
});
var img = new Image();
img.onload = function () {
    texture.update({
        asset: img
    });
    painter.compose(texture, layer, scene);
};
img.src = '../hepatica_256.png';
//# sourceMappingURL=main.js.map