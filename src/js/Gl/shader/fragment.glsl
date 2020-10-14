uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uTime;
uniform vec2 uResolution;
uniform float uState;
varying vec2 vUv;

void main()	{

		vec2 p = 7.68 * (gl_FragCoord.xy / uResolution - vec2(0.5, 1.)) - vec2(-uMouse.x, -15.);
		vec2 i = p;

		float c = 1.;

		for(int n = 0; n < 4; n++) {

			float t = uTime / 5.;
			float ix = i.x + -uMouse.x;
			float iy = i.y + uMouse.y;

			i = vec2(cos(t - ix) + sin(t + iy), sin(t - iy) + cos(t + ix)) + p;

			c+= float(n)/length(vec2(p.x / sin(t + ix)/3.1, p.y / cos(t + iy)/3.1));
		}

			c/= 1.;

			c = 1.8 - sqrt(c);

	vec2 offset;
	offset.x = vUv.x + cos(c) * -uMouse.x * 0.01 * uState;
	offset.y = vUv.y + cos(c) * uMouse.y * 0.01 * uState;

	vec4 dImg = texture2D(uTexture, offset);
	vec4 img = texture2D(uTexture, vUv) * dImg * 1.3;

	gl_FragColor = img;
}