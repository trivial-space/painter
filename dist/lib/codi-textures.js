"use strict";
var gl;
var glDB;
var bufferAttachments;
var readFramebuffer;
function init() {
    gl.getExtension('OES_texture_float');
    glDB = gl.getExtension('WEBGL_draw_buffers');
    bufferAttachments = {
        1: [
            glDB.COLOR_ATTACHMENT0_WEBGL
        ],
        2: [
            glDB.COLOR_ATTACHMENT0_WEBGL,
            glDB.COLOR_ATTACHMENT1_WEBGL
        ],
        3: [
            glDB.COLOR_ATTACHMENT0_WEBGL,
            glDB.COLOR_ATTACHMENT1_WEBGL,
            glDB.COLOR_ATTACHMENT2_WEBGL
        ],
        4: [
            glDB.COLOR_ATTACHMENT0_WEBGL,
            glDB.COLOR_ATTACHMENT1_WEBGL,
            glDB.COLOR_ATTACHMENT2_WEBGL,
            glDB.COLOR_ATTACHMENT3_WEBGL
        ]
    };
    readFramebuffer = gl.createFramebuffer();
    console.log('GPU Stats:');
    console.log('Max render targets available', gl.getParameter(glDB.MAX_DRAW_BUFFERS_WEBGL));
    console.log('Max texture size', gl.getParameter(gl.MAX_TEXTURE_SIZE));
}
function createEmptyTexture(size, type) {
    if (type === void 0) { type = 'FLOAT'; }
    var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    setTextureParams();
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size, size, 0, gl.RGBA, gl[type], undefined);
    gl.bindTexture(gl.TEXTURE_2D, null);
    return tex;
}
function setTextureParams() {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
}
function setTextureData(tex, size, data, type) {
    if (type === void 0) { type = 'FLOAT'; }
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size, size, 0, gl.RGBA, gl[type], data);
    gl.bindTexture(gl.TEXTURE_2D, null);
}
function createFramebufferWithTextures(textures) {
    var fb = gl.createFramebuffer();
    var buffs = bufferAttachments[textures.length];
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    glDB.drawBuffersWEBGL(buffs);
    textures.forEach(function (tex, i) {
        gl.framebufferTexture2D(gl.FRAMEBUFFER, buffs[i], gl.TEXTURE_2D, tex, 0);
    });
    var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status !== gl.FRAMEBUFFER_COMPLETE) {
        console.error('GL_FRAMEBUFFER_COMPLETE failed');
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return fb;
}
function readTexture(tex, buffer, x, y, width, height, type) {
    if (type === void 0) { type = 'FLOAT'; }
    gl.bindFramebuffer(gl.FRAMEBUFFER, readFramebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    var pixels = gl.readPixels(x, y, width, height, gl.RGBA, gl[type], buffer);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return pixels;
}
//# sourceMappingURL=codi-textures.js.map