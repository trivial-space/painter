var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { painter, gl } from '../painter';
import { defaultTextureSettings } from '../../lib/asset-lib';
var plane = painter.createForm().update({
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
var red = painter.createShade().update({
    vert: "\n\t\tattribute vec2 position;\n\t\tvoid main() {\n\t\t\tgl_Position = vec4(position, 0.0, 1.0);\n\t\t}\n\t",
    frag: "precision mediump float;\n\t\tvoid main() {\n\t\t\tgl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n\t\t}\n\t"
});
var textureLayer = painter.createDrawingLayer().update(__assign({ buffered: true, sketches: [painter.createSketch().update({
            form: plane,
            shade: red
        })], clearColor: [1.0, 0.0, 1.0, 1.0], clearBits: gl.COLOR_BUFFER_BIT }, defaultTextureSettings));
var paintTexture = painter.createShade().update({
    vert: "\n\t\tattribute vec2 position;\n\t\tattribute vec2 uv;\n\t\tvarying vec2 coords;\n\n\t\tvoid main() {\n\t\t\tcoords = uv;\n\t\t\tgl_Position = vec4(position, 0.0, 1.0);\n\t\t}\n\t",
    frag: "precision mediump float;\n\t\tuniform sampler2D fufu;\n\t\tvarying vec2 coords;\n\t\tvoid main() {\n\t\t\tvec4 new_color = texture2D(fufu, coords);\n\t\t\tgl_FragColor = vec4(new_color.g + 0.2, new_color.r + 0.2, new_color.b + 0.2, 1.0);\n\t\t}\n\t"
});
var planeLayer = painter.createDrawingLayer().update({
    sketches: [painter.createSketch().update({
            form: plane,
            shade: paintTexture,
            uniforms: {
                fufu: textureLayer.texture()
            }
        })],
    clearColor: [0.0, 0.0, 0.0, 1.0],
    clearBits: gl.COLOR_BUFFER_BIT
});
var effect = painter.createEffectLayer().update({
    frag: "precision mediump float;\n\t\tuniform sampler2D source;\n\t\tvarying vec2 coords;\n\t\tvoid main() {\n\t\t\tvec4 new_color = texture2D(source, coords);\n\t\t\tgl_FragColor = vec4(new_color.rgb * 0.5 + 0.3, 1.0);\n\t\t}\n\t",
    uniforms: {
        source: null
    }
});
painter.compose(textureLayer, planeLayer, effect);
//# sourceMappingURL=main.js.map