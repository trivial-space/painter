uniform sampler2D source;
varying vec2 vUv;
void main() {
    gl_FragColor = texture2D(source, vUv);
}
