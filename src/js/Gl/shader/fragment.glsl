uniform sampler2D uTexture;
uniform float uDistortion;
varying vec2 vUv;

float M_PI = 3.1415926535897932384626433832795;

void main()	{

	float roundblend = sin(M_PI*uDistortion);
	float stepblend = clamp( 2.*(-vUv.x + vUv.y) +3.*uDistortion - 1., 0.,1.);

	vec4 tuxture = texture2D(uTexture, vUv);
	vec4 multiplyTexture = texture2D(uTexture, vUv) * stepblend * roundblend * 0.15;

	tuxture.a = 1.;
	multiplyTexture.a = 1.;

	gl_FragColor = tuxture + multiplyTexture;
}