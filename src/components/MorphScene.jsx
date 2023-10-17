import { useEffect, useState, useRef } from "react";
import { a } from "@react-spring/three";
import { useSpring } from "@react-spring/core";
import { Stars, PositionalAudio } from "@react-three/drei";

import Morph from "./Morph";
import TextObject from "./TextObject";

const MorphScene = ({ muted }) => {
  const woosh = useRef();
  const rotating = useRef(false);
  const [current, setCurrent] = useState(0);

  const rotations = [
    [0, 0, 0],
    [0, -Math.PI / 2, 0],
    [0, Math.PI, 0],
    [0, Math.PI / 2, 0],
  ];

  const [{ rotation }, ref] = useSpring(() => ({
    rotation: [0, 0, 0],
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((current) => (current + 1) % rotations.length);
      !muted && woosh.current.play();
      ref.current[0].start({
        rotation: rotations[current],
      });
      rotating.current = !rotating.current;
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <group>
      <PositionalAudio ref={woosh} url="/woosh.mp3" distance={1} loop={false} />
      <Stars count={500} fade />
      <Morph rotating={rotating.current} />
      <a.group rotation={rotation}>
        <TextObject text="WeOwn" position={[-1.4, 0, 5]} rotation={[0, 0, 0]} />
        <TextObject
          text="Shaders"
          position={[5, 0, 1.5]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <TextObject
          text="ThreeJS"
          position={[1.5, 0, -5]}
          rotation={[0, Math.PI, 0]}
        />
        <TextObject
          text="Blockchain"
          position={[-5, 0, -1.8]}
          rotation={[0, -Math.PI / 2, 0]}
        />
      </a.group>
    </group>
  );
};

export default MorphScene;
