uniform sampler2D source;
varying vec2 vUv;
void main() {
    vec4 new_color = texture2D(source, vUv);
    gl_FragColor = vec4(new_color.rgb * 0.5 + 0.3, 1.0);
}
