import { convertStackGLGeometry } from '../../lib/utils/stackgl';
import { mat4 } from 'gl-matrix';
import createCube from 'primitive-cube';
import { painter } from '../painter';
import { makeClear } from '../../lib/utils/context';
var cubeStackgl = createCube(1);
var cubeGeometry = convertStackGLGeometry(cubeStackgl);
cubeGeometry.drawType = 'LINE_LOOP';
var rotationX = 0.01;
var rotationZ = 0.009101;
var cubeMat = mat4.fromTranslation(mat4.create(), [0, 0, -3]);
var projection = mat4.perspective(mat4.create(), 45, 1, 0.01, 10);
var form = painter.createForm().update(cubeGeometry);
var shade = painter.createShade().update({
    vert: "\n\t\tattribute vec3 position;\n\t\tattribute vec3 normal;\n\t\tuniform mat4 camera;\n\t\tuniform mat4 transform;\n\n\t\tvarying vec3 vNormal;\n\n\t\tvoid main() {\n\t\t\tvNormal = normal;\n\t\t\tgl_Position = camera * transform * vec4(position, 1.0);\n\t\t}\n\t",
    frag: "precision mediump float;\n\t\tvarying vec3 vNormal;\n\t\tvoid main() {\n\t\t\tgl_FragColor = vec4(abs(vNormal), 1.0);\n\t\t}\n\t"
});
var sketch = painter.createSketch().update({
    shade: shade, form: form,
    uniforms: {
        camera: projection,
        transform: cubeMat
    }
});
var gl = painter.gl;
var clearBits = makeClear(gl, 'color', 'depth');
gl.enable(gl.DEPTH_TEST);
gl.clearColor(1.0, 0.5, 0.8, 1.0);
function animate() {
    mat4.rotateY(cubeMat, cubeMat, rotationX);
    mat4.rotateZ(cubeMat, cubeMat, rotationZ);
    mat4.rotateX(cubeMat, cubeMat, 1.78 * rotationZ);
    gl.clear(clearBits);
    painter.draw(sketch);
    requestAnimationFrame(animate);
}
animate();
//# sourceMappingURL=main.js.map