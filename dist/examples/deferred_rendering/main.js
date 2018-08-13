import { mat4, vec3 } from 'gl-matrix';
import { painter, gl } from '../painter';
import { convertStackGLGeometry } from '../../lib/utils/stackgl';
import { makeClear } from '../../lib/utils/context';
import createCube from 'primitive-cube';
import geoVert from './geo.vert';
import geoFrag from './geo.frag';
import mainFrag from './main.frag';
painter.updateDrawSettings({
    depthFunc: gl.LEQUAL,
    blendFunc: [gl.ONE, gl.ONE]
});
var geoShade = painter.createShade().update({
    vert: geoVert,
    frag: geoFrag
});
var cubeStackgl = createCube(1);
var cubeGeometry = convertStackGLGeometry(cubeStackgl);
var geoForm = painter.createForm().update(cubeGeometry);
// CAMERA STUFF
var projMatrix = mat4.create();
mat4.perspective(projMatrix, Math.PI / 2, gl.canvas.width / gl.canvas.height, 0.1, 10.0);
var viewMatrix = mat4.create();
var eyePosition = vec3.fromValues(1, 1, 1);
mat4.lookAt(viewMatrix, eyePosition, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 1, 0));
var viewProjMatrix = mat4.create();
mat4.multiply(viewProjMatrix, projMatrix, viewMatrix);
// BOX DESCRIPTIONS FOR GEO PASS
var box1 = mat4.create();
var box2 = mat4.create();
mat4.fromTranslation(box2, [0.8, 0.8, 0.4]);
mat4.scale(box2, box2, [0.1, 0.1, 0.1]);
mat4.rotateZ(box2, box2, Math.PI / 3);
var boxes = [
    {
        uModelMatrix: box1,
        uMVP: mat4.create()
    },
    {
        uModelMatrix: box2,
        uMVP: mat4.create()
    }
];
var geoSketch = painter.createSketch().update({
    form: geoForm,
    shade: geoShade,
    uniforms: boxes
});
var geoLayer = painter.createDrawingLayer().update({
    buffered: true,
    textureConfig: {
        count: 3,
        type: gl.FLOAT
    },
    sketches: [geoSketch],
    drawSettings: {
        clearBits: makeClear(gl, 'color', 'depth')
    },
    wrap: 'CLAMP_TO_EDGE',
    minFilter: 'NEAREST',
    magFilter: 'NEAREST'
});
var lights = [
    {
        uLightPosition: vec3.fromValues(0, 1, 0.5),
        uLightColor: vec3.fromValues(0.8, 0.0, 0.0)
    },
    {
        uLightPosition: vec3.fromValues(1, 1, 0.5),
        uLightColor: vec3.fromValues(0.0, 0.0, 0.8)
    },
    {
        uLightPosition: vec3.fromValues(1, 0, 0.5),
        uLightColor: vec3.fromValues(0.0, 0.8, 0.0)
    },
    {
        uLightPosition: vec3.fromValues(0.5, 0, 1),
        uLightColor: vec3.fromValues(0.0, 0.8, 0.8)
    }
];
var lightLayer = painter.createEffectLayer().update({
    frag: mainFrag,
    uniforms: {
        uEyePosition: eyePosition,
        uPositionBuffer: geoLayer.texture(0),
        uNormalBuffer: geoLayer.texture(1),
        uUVBuffer: geoLayer.texture(2)
    },
    drawSettings: {
        disable: [gl.DEPTH_TEST],
        enable: [gl.BLEND],
        clearBits: makeClear(gl, 'color')
    }
});
// Draw each light separately and blend results
if (lightLayer.sketches) {
    lightLayer.sketches[0].uniforms = lights;
}
var rotationX = 0.01;
var rotationY = 0.02;
function animate() {
    for (var _i = 0, boxes_1 = boxes; _i < boxes_1.length; _i++) {
        var box = boxes_1[_i];
        mat4.rotateX(box.uModelMatrix, box.uModelMatrix, rotationX);
        mat4.rotateY(box.uModelMatrix, box.uModelMatrix, rotationY);
        mat4.multiply(box.uMVP, viewProjMatrix, box.uModelMatrix);
    }
    painter.compose(geoLayer, lightLayer);
    requestAnimationFrame(animate);
}
animate();
//# sourceMappingURL=main.js.map