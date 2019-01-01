#version 300 es
in vec3 position;
in vec3 normal;
in vec2 uv;

uniform mat4 uMVP;
uniform mat4 uModelMatrix;

out vec4 vPosition;
out vec4 vNormal;
out vec4 vUv;

void main() {
	vPosition = uModelMatrix * vec4(position, 1.0);
	vNormal = uModelMatrix * vec4(normal, 0.0);
	vUv = vec4(uv, 0.0, 0.0);
	gl_Position = uMVP * vec4(position, 1.0);
}
