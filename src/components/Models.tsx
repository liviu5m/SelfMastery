import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Dumbbell = () => {
  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 5, 32]} />
        <meshStandardMaterial color="silver" />
      </mesh>

      <mesh rotation={[0, 0, Math.PI / 2]} position={[-2.05, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.3, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[-1.7, 0, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.3, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[-1.35, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.3, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>

      <mesh rotation={[0, 0, Math.PI / 2]} position={[2.05, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.3, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[1.7, 0, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.3, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[1.35, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.3, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
};

const DumbbellScene = () => {
  return (
    <Canvas shadows>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
      <pointLight position={[-10, -10, -10]} />

      <Dumbbell />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

export default DumbbellScene;
