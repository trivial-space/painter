var _a;
import * as constants from './contants';
export var defaultTextureSettings = {
    wrap: 'CLAMP_TO_EDGE',
    minFilter: 'LINEAR',
    magFilter: 'NEAREST'
};
export function getDefaultLayerSettings(gl) {
    return {
        clearColor: [0.0, 0.0, 0.0, 1.0],
        enable: [gl.DEPTH_TEST],
        blendFunc: [gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA]
    };
}
export var defaultForms = {
    renderQuad: {
        attribs: (_a = {},
            _a[constants.GEOMETRY_PROP_POSITION] = {
                buffer: new Float32Array([
                    -1, 1,
                    -1, -1,
                    1, 1,
                    1, -1
                ]),
                storeType: 'STATIC'
            },
            _a[constants.GEOMETRY_PROP_UV] = {
                buffer: new Float32Array([
                    0, 1,
                    0, 0,
                    1, 1,
                    1, 0
                ]),
                storeType: 'STATIC'
            },
            _a),
        drawType: 'TRIANGLE_STRIP',
        itemCount: 4
    }
};
export var defaultShaders = {
    basicEffect: {
        vert: "\n\t\t\tattribute vec2 " + constants.GEOMETRY_PROP_POSITION + ";\n\t\t\tattribute vec2 " + constants.GEOMETRY_PROP_UV + ";\n\t\t\tvarying vec2 " + constants.VARYING_UV_COORDS + ";\n\t\t\tvoid main() {\n\t\t\t\t" + constants.VARYING_UV_COORDS + " = " + constants.GEOMETRY_PROP_UV + ";\n\t\t\t\tgl_Position = vec4(" + constants.GEOMETRY_PROP_POSITION + ", 0.0, 1.0);\n\t\t\t}",
        frag: "precision mediump float;\n\t\t\tuniform sampler2D " + constants.UNIFORM_SOURCE_TEXTURE + ";\n\t\t\tvarying vec2 " + constants.VARYING_UV_COORDS + ";\n\t\t\tvoid main() {\n\t\t\t\tgl_FragColor = texture2D(" + constants.UNIFORM_SOURCE_TEXTURE + ", " + constants.VARYING_UV_COORDS + ");\n\t\t\t}"
    }
};
//# sourceMappingURL=asset-lib.js.map