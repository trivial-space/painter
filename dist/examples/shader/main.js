import { painter } from '../painter';
import shaderCode from './shader.glsl';
var layer = painter.createEffectLayer().update({
    frag: shaderCode
});
painter.compose(layer);
//# sourceMappingURL=main.js.map