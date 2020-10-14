uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uVelo;
uniform vec2 uResolution;
varying vec2 vUv;

float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
	uv -= disc_center;
	uv*=uResolution;
	float dist = sqrt(dot(uv, uv));
	return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
}

void main()	{

		vec2 newUV = vUv;
		vec4 color = vec4(1.,0.,0.,1.);

		float c = circle(newUV, uMouse, 0.0, 0.1+uVelo*5.)*40.*uVelo;
		vec2 warpedUV = mix(vUv, uMouse, c * 0.8); //power
		color = texture2D(uTexture,warpedUV) + texture2D(uTexture,warpedUV)*vec4(vec3(c),10.);

	gl_FragColor = color;
}