varying vec2 vUv;
uniform float uTime;
uniform float uState;
uniform float uDistortion;


void main() {
  vUv = uv;
  vec3 pos = position;

  vec2 dXY = vec2(pos.x + uDistortion, pos.y + uDistortion);
  pos.z = sin(uState + uDistortion + (dXY.y + dXY.x) * 5.) * 0.08 * uDistortion;
  
  float distance = uState / 8.;

  vec2 posXY = vec2(position.x, position.y);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(posXY, pos.z + distance, 1.0);
}


