import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";

import { useRef } from "react";

const TestShaderMaterial = shaderMaterial(
  {
    uAlpha: 0.5,
    uMultiplier: 42,
    uColorA: new THREE.Color(0xff0000),
    uColorB: new THREE.Color(0x0000ff),
    uTime: 0,
  },
  // vertex shader
  /*glsl*/ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  /*glsl*/ `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;

    uniform float uMultiplier;
    uniform float uAlpha;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform float uTime;

    void main() {
      vec2 mulvUv = mod(vUv * uMultiplier, 1.0);
      float strength = step(0.5, mod(mulvUv.x + uTime, 1.0));
      vec3 mixColor = mix(uColorA, uColorB, step(0.5, mod(vUv.y * uMultiplier / 2.0, 1.0)));
      float alpha = uAlpha;
      gl_FragColor.rgba = vec4(mixColor, min(strength, alpha));
    }
  `
);

extend({ TestShaderMaterial });

export default function Discoball() {
  const controls = useControls("stripes", {
    alpha: {
      min: 0,
      max: 1,
      value: 0.5,
    },
    multiplier: {
      min: 1,
      max: 142,
      value: 42,
    },
    colorA: "#ff0000",
    colorB: "#0000ff",
  });

  const ref = useRef();

  useFrame((state) => {
    ref.current.uTime = state.clock.elapsedTime;
  });

  return (
    <group>
      <mesh>
        <sphereGeometry size={[1, 1, 1]} />
        <testShaderMaterial
          ref={ref}
          uAlpha={controls.alpha}
          uMultiplier={controls.multiplier}
          uColorA={controls.colorA}
          uColorB={controls.colorB}
        />
      </mesh>
    </group>
  );
}
