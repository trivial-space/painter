import { painter, gl } from '../painter';
import shaderCode from './shader.glsl';
var strength = 14;
var passes = [];
while (strength >= 1) {
    console.log(strength);
    passes.push({
        direction: 0,
        strength: strength,
        source: null,
        size: [gl.canvas.width, gl.canvas.height]
    });
    passes.push({
        direction: 1,
        strength: strength,
        source: null,
        size: [gl.canvas.width, gl.canvas.height]
    });
    strength /= 2;
}
var layer = painter.createEffectLayer().update({
    frag: shaderCode,
    uniforms: passes
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
    painter.compose(texture, layer);
};
img.src = '../hepatica_256.png';
//# sourceMappingURL=main.js.map