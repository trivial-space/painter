import { convertStackGLGeometry } from '../../lib/utils/stackgl';
import { mat4 } from 'gl-matrix';
import createCube from 'primitive-cube';
import createSphere from 'primitive-sphere';
import { painter } from '../painter';
import { makeClear } from '../../lib/utils/context';
var cubeStackgl = createCube();
var cubeGeometry = convertStackGLGeometry(cubeStackgl);
var sphereStackgl = createSphere();
var sphereGeometry = convertStackGLGeometry(sphereStackgl);
//cubeGeometry.drawType = 'LINE_LOOP'
var rotationX = 0.01;
var rotationZ = 0.009101;
var cubeMat = mat4.fromTranslation(mat4.create(), [1, 0, -3]);
var sphereMat = mat4.fromTranslation(mat4.create(), [-1, 0, -3]);
var projection = mat4.perspective(mat4.create(), 45, 1, 0.01, 10);
var cube = painter.createForm().update(cubeGeometry);
var sphere = painter.createForm().update(sphereGeometry);
var shade = painter.createShade().update({
    vert: "\n\t\tattribute vec3 position;\n\t\tattribute vec3 normal;\n\t\tuniform mat4 camera;\n\t\tuniform mat4 transform;\n\n\t\tvarying vec3 vNormal;\n\n\t\tvoid main() {\n\t\t\tvNormal = normal;\n\t\t\tgl_Position = camera * transform * vec4(position, 1.0);\n\t\t}\n\t",
    frag: "precision mediump float;\n\t\tvarying vec3 vNormal;\n\t\tvoid main() {\n\t\t\tgl_FragColor = vec4(abs(vNormal), 1.0);\n\t\t}\n\t"
});
var cubeSketch = painter.createSketch().update({
    shade: shade,
    form: cube,
    uniforms: {
        camera: projection,
        transform: cubeMat
    },
    drawSettings: {
        clearBits: makeClear(painter.gl, 'color', 'depth')
    }
});
var sphereSketch = painter.createSketch().update({
    shade: shade,
    form: sphere,
    uniforms: {
        camera: projection,
        transform: sphereMat
    }
});
painter.updateDrawSettings({
    clearColor: [1.0, 0.5, 0.8, 1.0]
});
function animate() {
    mat4.rotateY(cubeMat, cubeMat, rotationX);
    mat4.rotateZ(cubeMat, cubeMat, rotationZ);
    mat4.rotateX(cubeMat, cubeMat, 1.78 * rotationZ);
    mat4.rotateY(sphereMat, sphereMat, rotationX);
    mat4.rotateZ(sphereMat, sphereMat, rotationZ);
    mat4.rotateX(sphereMat, sphereMat, 1.78 * rotationZ);
    painter.draw(cubeSketch);
    painter.draw(sphereSketch);
    requestAnimationFrame(animate);
}
animate();
//# sourceMappingURL=main.js.map