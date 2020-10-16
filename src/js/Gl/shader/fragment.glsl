uniform sampler2D uTexture;
uniform float uDistortion;
varying vec2 vUv;

void main()	{

	float roundblend = sin(3.1415926*uDistortion);
	float stepblend = clamp( 2.*(-vUv.x + vUv.y) +3.*uDistortion - 1., 0.,1.);

	vec4 multiplyTexture = texture2D(uTexture, vUv) * stepblend * roundblend * 0.15;
	gl_FragColor = texture2D(uTexture, vUv) + multiplyTexture;
}