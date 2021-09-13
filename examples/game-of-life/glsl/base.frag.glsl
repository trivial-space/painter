precision mediump float;

uniform sampler2D previous;
uniform float size;
varying vec2 coords;

int getCell(vec2 uv) {
	vec4 prevTex = texture2D(previous, uv);
	if (prevTex.r > 0.0) {
		return 1;
	} else {
		return 0;
	}
}

void main() {
	float one = 1.0 / size;
	vec2 uvR = vec2(coords.x + one, coords.y);
	vec2 uvL = vec2(coords.x - one, coords.y);
	vec2 uvRT = vec2(coords.x + one, coords.y - one);
	vec2 uvLT = vec2(coords.x - one, coords.y - one);
	vec2 uvRB = vec2(coords.x + one, coords.y + one);
	vec2 uvLB = vec2(coords.x - one, coords.y + one);
	vec2 uvT = vec2(coords.x, coords.y - one);
	vec2 uvB = vec2(coords.x, coords.y + one);

	vec4 prevTex = texture2D(previous, coords);

	int cellL = getCell(uvL);
	int cellR = getCell(uvR);
	int cellT = getCell(uvT);
	int cellB = getCell(uvB);
	int cellTL = getCell(uvLT);
	int cellTR = getCell(uvRT);
	int cellBL = getCell(uvLB);
	int cellBR = getCell(uvRB);

	int neighbours = cellL + cellR + cellT + cellB + cellTL + cellTR + cellBL + cellBR;

	vec4 color = vec4(vec3(0.0), 1.0);
	if (neighbours == 3 || (neighbours == 2 && prevTex.r > 0.0)) {
		color = vec4(1.0, 0.0, 0.0, 1.0);
	}

	gl_FragColor = color;
}
