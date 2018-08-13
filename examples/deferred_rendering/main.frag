precision highp float;


uniform mat4 uLightMatrix;
uniform vec3 uLightPosition;
uniform vec3 uLightColor;

uniform vec3 uEyePosition;

uniform sampler2D uPositionBuffer;
uniform sampler2D uNormalBuffer;
uniform sampler2D uUVBuffer;

varying vec2 coords;

void main() {
	vec3 position = texture2D(uPositionBuffer, coords).xyz;
	vec3 normal = normalize(texture2D(uNormalBuffer, coords).xyz);
	vec2 uv = texture2D(uUVBuffer, coords).xy;

	vec4 baseColor = vec4(1.0, 1.0, 1.0, 1.0);


	vec3 eyeDirection = normalize(uEyePosition - position);
	vec3 lightVec = uLightPosition.xyz - position;
	float attenuation = 1.0 - length(lightVec);
	vec3 lightDirection = normalize(lightVec);
	vec3 reflectionDirection = reflect(-lightDirection, normal);
	float nDotL = max(dot(lightDirection, normal), 0.0);
	vec3 diffuse = nDotL * uLightColor.rgb;
	float ambient = 0.1;
	vec3 specular = pow(max(dot(reflectionDirection, eyeDirection), 0.0), 20.0) * uLightColor.rgb;

	gl_FragColor = vec4(attenuation * (ambient + diffuse + specular) * baseColor.rgb, baseColor.a);
}
