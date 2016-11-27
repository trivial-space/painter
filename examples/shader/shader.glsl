varying vec2 vUv;

void main(void)
{
    float x = vUv.x - 0.5;
    float y = vUv.y - 1.0;
    float col = x * x * 2.0 + y * y * 2.0;
    col = 1.0 - col;
    col = max(0.0, col);
    col = col * col;

    x = vUv.x - 1.0;
    y = vUv.y - 0.5;
    float col2 = x * x * 2.0 + y * y * 2.0;
    col2 = 1.0 - col2;
    col2 = max(0.0, col2);
    col2 *= col2;

    x = vUv.x - 0.5;
    y = vUv.y - 0.0;
    float col3 = x * x * 2.0 + y * y * 2.0;
    col3 = 1.0 - col3;
    col3 = max(0.0, col3);
    col3 *= col3;

	gl_FragColor = vec4(vec3(col + col2 + col3), 1.0);
}
