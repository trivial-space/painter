uniform sampler2D textrue;
varying vec2 vUv;
void main() {
    gl_FragColor = texture2D(textrue, vUv);
}
