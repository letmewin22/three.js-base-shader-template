varying vec2 vUv;
uniform float uTime;
uniform float uState;
uniform float uDistortion;

float M_PI = 3.1415926535897932384626433832795;

void main() {
  vUv = uv;
  vec3 pos = position;

  float roundblend = sin(M_PI*uDistortion);
	float stepblend = clamp((-pos.x + pos.y) +3.*uDistortion - 1., 0.,1.);

  // pos.z = roundblend*0.05*sin(stepblend*10. + uTime/30.);
  pos.z = 0.1 * stepblend + roundblend*0.05*sin((-pos.x + pos.y)*10. + uTime/5.);
  
  float distance = uState / 22.*0.;

  vec2 posXY = vec2(position.x, position.y);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(posXY, pos.z + distance, 1.0);
}


