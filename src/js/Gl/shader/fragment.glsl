uniform sampler2D uTexture;
uniform float uDistortion;
varying vec2 vUv;

void main()	{

	vec4 multiplyTexture = texture2D(uTexture, vUv) * uDistortion * 0.15;
	gl_FragColor = texture2D(uTexture, vUv) + multiplyTexture;
}