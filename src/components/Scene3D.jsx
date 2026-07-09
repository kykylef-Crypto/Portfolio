import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { useRef } from "react";

function AnimatedSphere() {
  const mesh = useRef();

  useFrame((state) => {
  if (mesh.current) {
    const elapsed = state.clock.elapsedTime;

    mesh.current.rotation.x = elapsed * 0.2;
    mesh.current.rotation.y = elapsed * 0.3;
  }
});

  return (
    <Sphere
      ref={mesh}
      args={[2, 64, 64]}
      position={[0, 0, -3]}
      scale={1.2}
    >
      <meshStandardMaterial
        color="#4f8cff"
        wireframe
      />
    </Sphere>
  );
}

export default function Scene3D() {
  return (
    <div
      className="fixed inset-0 z-0 opacity-30"
      style={{ pointerEvents: "none" }}
    >
        <Canvas
          style={{
            pointerEvents: "none"
          }}
        >
        <ambientLight intensity={1} />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}