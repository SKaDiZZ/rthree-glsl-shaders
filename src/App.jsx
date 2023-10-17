import "./App.css";

import { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Stats,
  Environment,
  PositionalAudio,
} from "@react-three/drei";

import MorphScene from "./components/MorphScene";

function App() {
  const [muted, setMuted] = useState(true);
  const audio = useRef();

  const handleMute = () => {
    setMuted(!muted);
    muted ? audio.current.play() : audio.current.pause();
  };

  return (
    <>
      <Canvas camera={{ position: [0.0, 0.0, 8.0] }}>
        <color attach="background" args={["#050505"]} />
        <fog color="#161616" attach="fog" near={8} far={30} />
        <ambientLight />
        <OrbitControls
          autoRotate={false}
          autoRotateSpeed={-0.1}
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Environment preset="warehouse" />
        <MorphScene muted={muted} />
        <PositionalAudio ref={audio} url="/ambient.mp3" distance={1} loop />
        <Stats />
      </Canvas>
      <button id="audio-ctrl-btn" onClick={handleMute}>
        {muted && (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>
          </>
        )}
        {!muted && (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>
          </>
        )}
      </button>
    </>
  );
}

export default App;
