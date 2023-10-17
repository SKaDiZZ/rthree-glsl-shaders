import * as THREE from "three";
import { MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

import { useRef, useMemo, Suspense } from "react";

import morphFrag from "../shaders/morph-frag";
import morphVert from "../shaders/morph-vert";

// eslint-disable-next-line react/prop-types
export default function Morph({ rotating }) {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAlpha: { value: 0.5 },
      uMultiplier: { value: 42 },
      uColorA: { value: new THREE.Color(0xff0000) },
      uColorB: { value: new THREE.Color(0x0000ff) },
      uIntensity: { value: 0.87 },
    }),
    []
  );

  const mesh = useRef();
  const hover = useRef(false);

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.uTime.value = clock.getElapsedTime();
    mesh.current.rotation.y = clock.getElapsedTime() * 0.1;
    mesh.current.material.uniforms.uIntensity.value = MathUtils.lerp(
      mesh.current.material.uniforms.uIntensity.value,
      hover.current || rotating ? 0.85 : 0.15,
      0.02
    );
  });

  return (
    <group>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75}>
        <ambientLight intensity={0.7} />
      </PerspectiveCamera>
      <Suspense fallback={null}>
        <mesh
          ref={mesh}
          position={[0, 0, 0]}
          scale={1.5}
          onPointerOver={() => (hover.current = true)}
          onPointerOut={() => (hover.current = false)}
        >
          <icosahedronGeometry args={[2, 80]} />
          <shaderMaterial
            fragmentShader={morphFrag}
            vertexShader={morphVert}
            uniforms={uniforms}
            clearcoatRoughness={0}
            metalness={0.1}
          />
        </mesh>
      </Suspense>
    </group>
  );
}
