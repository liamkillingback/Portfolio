import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Laptop = () => {
  const laptop = useGLTF("./computer/scene.gltf");

  return (
    <primitive
      object={laptop.scene}
      scale={10}
      position-y={-5}
      rotation-y={0}
      position-z={1}
      rotation-x={0}
      
    />
  );
};

const LaptopCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        position: [5, 5, 60],
      }}
    >
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
        
          autoRotate={true}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotateSpeed={2}
        />
        <Laptop />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default LaptopCanvas;
