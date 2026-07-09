import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { useRef } from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

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
      scale={1.3}
    >
      <meshStandardMaterial
        color="#4f8cff"
        wireframe
      />
    </Sphere>
  );
}

export default function Scene3D() {
  const { dark } = useContext(ThemeContext);
  return (
    <div
      className="fixed inset-0 z-0 opacity-30"
      style={{ pointerEvents: "none" }}
    >
        <Canvas style={{position:"absolute",top:0,left:0, pointerEvents: "none"}} gl={{alpha:true}}>
        <ambientLight color={dark?"#4f8cff":"#4f8cff"}intensity={dark?1:1}/>
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}