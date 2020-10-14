varying vec2 vUv;
uniform vec2 uMouse;
uniform float uState;
uniform float uTime;
uniform vec2 uResolution;

void main() {
  vUv = uv;
  vec2 pos;
  pos.x = position.x * uResolution.x;
  pos.y = position.y * uResolution.y;

  lowp float vWave = sin(uTime / 8. + (pos.x + pos.y) * 0.5)*uState * 0.00625; // *5

  gl_Position = projectionMatrix * modelViewMatrix * 
  vec4(position.x + uMouse.x * uState * 0.01, position.y + uMouse.y * uState * 0.01, vWave, 1.0 );
}


