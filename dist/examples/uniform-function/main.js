import { painter, gl } from '../painter';
import { mat4 } from 'gl-matrix';
import planeVert from './plane-material.vert';
import planeFrag from './plane-material.frag';
import { plane } from '../../lib/utils/geometry/plane';
import { makeClear } from '../../lib/utils/context';
import { adjustHue, hslToRGB } from 'tvs-libs/dist/lib/graphics/colors';
painter.resize(window.devicePixelRatio);
var planMat = mat4.fromTranslation(mat4.create(), [0, 0, -3]);
var rotation = 0.01;
var projection = mat4.perspective(mat4.create(), 45, 1, 0.01, 10);
var colorHSL = { h: 0, s: 0.5, l: 0.5 };
// ===== Setup Render Context =====
var form = painter.createForm().update(plane(2, 2));
var shade = painter.createShade().update({
    vert: planeVert,
    frag: planeFrag
});
var sketch = painter.createSketch().update({
    form: form, shade: shade,
    uniforms: {
        transform: function () { return mat4.rotateY(planMat, planMat, rotation); }
    }
});
var planeLayer = painter.createDrawingLayer().update({
    sketches: [sketch],
    uniforms: {
        color: function () {
            colorHSL.h = adjustHue(colorHSL.h + 0.001);
            return hslToRGB(colorHSL);
        },
        projection: projection
    },
    drawSettings: {
        clearColor: [0.0, 1.0, 0.0, 1.0],
        clearBits: makeClear(gl, 'color', 'depth')
    }
});
// ===== initialize animation =====
function animate() {
    painter.compose(planeLayer);
    requestAnimationFrame(animate);
}
animate();
//# sourceMappingURL=main.js.map