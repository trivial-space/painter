var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import renderer from '../../lib/index';
import { ctx } from '../ctx';
import shaderCode from './shader.glsl';
// ===== Setup Render Context =====
renderer.updateLayer(ctx, 'shaderLayer', {
    shader: 'shader',
});
renderer.updateShader(ctx, 'shader', __assign({}, renderer.lib.shaders.basicEffect, { frag: shaderCode }));
renderer.renderLayers(ctx, ['shaderLayer']);
//# sourceMappingURL=main.js.map