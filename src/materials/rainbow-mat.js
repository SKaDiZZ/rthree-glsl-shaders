import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

import rainbowVert from "../shaders/rainbow-vert";
import rainbowFrag from "../shaders/rainbow-frag";

const RainbowMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector2(),
    pointer: new THREE.Vector2(),
  },
  rainbowVert,
  rainbowFrag
);

extend({ RainbowMaterial });

export { RainbowMaterial };
