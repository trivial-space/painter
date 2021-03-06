import * as constants from './contants'
import {
	DrawSettings,
	FormDrawType,
	FormStoreType,
	GL,
	TextureData,
} from './painter-types'

export const defaultTextureSettings: Readonly<TextureData> = {
	wrap: 'CLAMP_TO_EDGE',
	minFilter: 'LINEAR',
	magFilter: 'NEAREST',
}

export function getDefaultLayerSettings(gl: GL): DrawSettings {
	return {
		clearColor: [0.0, 0.0, 0.0, 1.0],
		blendFunc: [gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA],
	}
}

export const defaultForms = {
	renderQuad: {
		attribs: {
			[constants.GEOMETRY_PROP_POSITION]: {
				buffer: new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]),
				storeType: 'STATIC' as FormStoreType,
			},
			[constants.GEOMETRY_PROP_UV]: {
				buffer: new Float32Array([0, 1, 0, 0, 1, 1, 1, 0]),
				storeType: 'STATIC' as FormStoreType,
			},
		},
		drawType: 'TRIANGLE_STRIP' as FormDrawType,
		itemCount: 4,
	},
}

export const defaultShaders = {
	basicEffect: {
		vert: `
attribute vec2 ${constants.GEOMETRY_PROP_POSITION};
attribute vec2 ${constants.GEOMETRY_PROP_UV};
varying vec2 ${constants.VARYING_UV_COORDS};
void main() {
	${constants.VARYING_UV_COORDS} = ${constants.GEOMETRY_PROP_UV};
	gl_Position = vec4(${constants.GEOMETRY_PROP_POSITION}, 0.0, 1.0);
}`,

		frag: `precision mediump float;
uniform sampler2D ${constants.UNIFORM_SOURCE_TEXTURE};
varying vec2 ${constants.VARYING_UV_COORDS};
void main() {
	gl_FragColor = texture2D(${constants.UNIFORM_SOURCE_TEXTURE}, ${
			constants.VARYING_UV_COORDS
		});
}`,
	},
}
