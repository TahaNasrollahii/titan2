'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Stars, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

import GamingCore from './GamingCore';
import EnergyParticles from './EnergyParticles';

// A component to smoothly move the camera based on mouse position for parallax
function CameraRig() {
  const cameraGroup = useRef<THREE.Group>(null);
  const pointer = new THREE.Vector2();
  
  useFrame((state, delta) => {
    // Damp the camera group rotation towards the mouse pointer
    if (cameraGroup.current) {
      const targetX = (state.pointer.x * Math.PI) / 10;
      const targetY = (state.pointer.y * Math.PI) / 10;
      
      cameraGroup.current.rotation.x += (targetY - cameraGroup.current.rotation.x) * 2 * delta;
      cameraGroup.current.rotation.y += (targetX - cameraGroup.current.rotation.y) * 2 * delta;
    }
  });

  return (
    <group ref={cameraGroup}>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} near={0.1} far={1000} />
    </group>
  );
}

export default function ThreeScene() {
  return (
    <Canvas 
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }} 
      dpr={[1, 2]}
    >
      <color attach="background" args={['#050508']} />
      
      <CameraRig />

      {/* Lighting */}
      <ambientLight intensity={0.2} color="#4a2574" />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#8a2be2" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#ff3366" />
      
      {/* Deep Space Background */}
      <Stars 
        radius={100} 
        depth={50} 
        count={3000} 
        factor={4} 
        saturation={0.5} 
        fade 
        speed={0.5} 
      />

      {/* Main 3D Objects */}
      {/* Offset to the right to leave space for UI on the left */}
      <group position={[3, 0, 0]}>
        <GamingCore />
        <EnergyParticles count={1500} />
      </group>

      {/* Post Processing */}
      <EffectComposer multisampling={4}>
        <Bloom 
          luminanceThreshold={0.5} 
          luminanceSmoothing={0.9} 
          intensity={1.5} 
          mipmapBlur 
        />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </Canvas>
  );
}
