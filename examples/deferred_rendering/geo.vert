attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 uMVP;
uniform mat4 uModelMatrix;

varying vec4 vPosition;
varying vec4 vNormal;
varying vec4 vUv;

void main() {
	vPosition = uModelMatrix * vec4(position, 1.0);
	vNormal = uModelMatrix * vec4(normal, 0.0);
	vUv = vec4(uv, 0.0, 0.0);
	gl_Position = uMVP * vec4(position, 1.0);
}
