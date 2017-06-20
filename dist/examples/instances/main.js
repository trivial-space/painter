import { mat4, quat } from 'gl-matrix';
import { painter } from '../painter';
import { makeClear } from '../../lib/utils/context';
var rotationX = 0.01;
var rotationZ = 0.009101;
var triangleCount = 5000;
var dimensions = [];
for (var i = 0; i < triangleCount; i++) {
    var q = quat.create();
    var scale = Math.random() * 5 + 1;
    quat.rotateX(q, q, Math.random() * Math.PI);
    quat.rotateY(q, q, Math.random() * Math.PI);
    quat.rotateZ(q, q, Math.random() * Math.PI);
    dimensions.push({
        pos: [
            Math.random() * 100 - 50,
            Math.random() * 100 - 50,
            Math.random() * 100 - 100
        ],
        scale: [scale, scale, scale],
        rot: q
    });
}
dimensions.sort(function (d1, d2) { return d1.pos[2] > d2.pos[2] ? 1 : d1.pos[2] < d2.pos[2] ? -1 : 0; });
var projection = mat4.perspective(mat4.create(), 65, 1, 0.01, 1000);
var cubes = dimensions.map(function (vals) { return ({
    transform: mat4.fromRotationTranslationScale(mat4.create(), vals.rot, vals.pos, vals.scale),
    color: new Float32Array([Math.random(), Math.random(), Math.random(), 0.8])
}); });
var form = painter.createForm().update({
    attribs: {
        position: {
            buffer: new Float32Array([
                1, 1, 1,
                0, 0, 0,
                1, 0, 0
            ])
        }
    },
    drawType: 'TRIANGLES',
    itemCount: 3
});
var shade = painter.createShade().update({
    vert: "\n\t\tattribute vec3 position;\n\t\tuniform mat4 camera;\n\t\tuniform mat4 transform;\n\n\t\tvoid main() {\n\t\t\tgl_Position = camera * transform * vec4(position, 1.0);\n\t\t}\n\t",
    frag: "precision mediump float;\n\t\tuniform vec4 color;\n\t\tvoid main() {\n\t\t\tgl_FragColor = color;\n\t\t}\n\t"
});
var sketch = painter.createSketch().update({
    shade: shade, form: form,
    uniforms: cubes,
    blend: true
});
var gl = painter.gl;
var clearBits = makeClear(gl, 'color', 'depth');
gl.enable(gl.DEPTH_TEST);
gl.clearColor(1.0, 0.5, 0.8, 1.0);
function animate() {
    cubes.forEach(function (_a, i) {
        var transform = _a.transform;
        mat4.rotateY(transform, transform, rotationX);
        mat4.rotateZ(transform, transform, rotationZ * (i / triangleCount));
        mat4.rotateX(transform, transform, 1.78 * rotationZ);
    });
    gl.clear(clearBits);
    painter.draw(sketch, { camera: projection });
    requestAnimationFrame(animate);
}
animate();
//# sourceMappingURL=main.js.map