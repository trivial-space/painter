precision mediump float;
#pragma glslify: blur = require('glsl-fast-gaussian-blur')

uniform sampler2D source;
uniform vec2 size;
uniform int direction;
uniform float strength;

varying vec2 coords;

void main() {
	if (direction == 0) {
		gl_FragColor = vec4(blur(source, coords, size, vec2(strength, 0)));
	} else {
		gl_FragColor = vec4(blur(source, coords, size, vec2(0, strength)));
	}
}
