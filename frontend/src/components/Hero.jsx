import React, { Suspense, useRef } from 'react';
import TypeWriter from './TypeWriter';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, Tube, useGLTF } from '@react-three/drei';
import CanvasLoader from './CanvasLoader';

function Model() {
  const model = useGLTF('/modern_home/scene.gltf');
  return (
    <mesh>
      <hemisphereLight intensity={0.9} />
      <primitive object={model.scene} />
    </mesh>
  );
}
function Hero() {
  return (
    <div className="bg-gradient-to-tr from-gray-700 to-gray-500 h-[80vh] w-full grid grid-cols-3">
      <TypeWriter className="top-0 col-span-2 " />
      <Canvas
        className="w-full"
        frameloop="demand"
        shadows
        camera={{ position: [3, 2, 4], rotation: [0, Math.PI, 0], fov: 20 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />
          <Model />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}

export default Hero;
