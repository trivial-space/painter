attribute vec3 position;
attribute vec2 uv;
uniform mat4 projection;
uniform mat4 transform;

varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projection * transform * vec4(position, 1.0);
}
