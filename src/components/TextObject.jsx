import { Text3D, MeshTransmissionMaterial } from "@react-three/drei";

// eslint-disable-next-line react/prop-types
const TextObject = ({ text, position, rotation }) => {
  const font = "/Inter_Medium_Regular.json";

  const textConfig = {
    color: "#ff9cf5",
    gColor: "#ff7eb3",
    shadow: "#750d57",
    backside: false,
    backsideThickness: 0.3,
    resolution: 1024,
    transmission: 1,
    clearcoat: 0,
    clearcoatROughness: 0,
    thickness: 0.3,
    chromaticAberration: 5,
    anisotropy: 0.3,
    roughness: 0.1,
    distortion: 0.5,
    temporalDistortion: 0,
    samples: 16,
    ior: 1.5,
  };

  return (
    <group position={position} rotation={rotation}>
      <Text3D
        castShadow
        bevelEnabled
        font={font}
        scale={0.5}
        letterSpacing={-0.03}
        height={0.25}
        bevelSize={0.01}
        bevelSegments={10}
        curveSegments={128}
        bevelThickness={0.1}
      >
        {text}
        <MeshTransmissionMaterial {...textConfig} />
      </Text3D>
    </group>
  );
};

export default TextObject;
