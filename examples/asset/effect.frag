precision mediump float;

uniform sampler2D source;
varying vec2 coords;
void main() {
    vec4 new_color = texture2D(source, coords);
    gl_FragColor = vec4(new_color.rg, new_color.b * 0.5 + 0.3, 1.0);
}
