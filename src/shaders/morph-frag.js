export default /*glsl*/ `
uniform float time;
uniform vec3 color;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying float vDisplacement;

uniform float uMultiplier;
uniform float uAlpha;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uTime;
uniform float uIntensity;

void main() {
    float distort = 0.1 * vDisplacement * uIntensity;
    vec3 color = vec3(abs(vUv - 0.5) * 2.0  * (1.0 - distort), 1.0);
    gl_FragColor = vec4(color ,1.0);
}`;
