'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GamingCore() {
  const coreRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const fragmentsRef = useRef<THREE.Group>(null);

  // Generate random floating fragments
  const fragments = useMemo(() => {
    const frags = [];
    for (let i = 0; i < 40; i++) {
      const radius = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      const scale = 0.1 + Math.random() * 0.3;
      
      frags.push({
        position: new THREE.Vector3(x, y, z),
        rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
        scale: new THREE.Vector3(scale, scale, scale),
        speed: 0.2 + Math.random() * 0.5,
      });
    }
    return frags;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Rotate core slowly
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.1;
      coreRef.current.rotation.x = time * 0.05;
      // Subtle hovering
      coreRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    }

    // Rotate rings in opposite directions
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(time * 0.2) * 0.1;
      ring1Ref.current.rotation.y = time * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -Math.PI / 4 + Math.cos(time * 0.15) * 0.1;
      ring2Ref.current.rotation.y = -time * 0.2;
    }

    // Rotate the whole fragment group
    if (fragmentsRef.current) {
      fragmentsRef.current.rotation.y = time * 0.08;
      fragmentsRef.current.rotation.z = time * 0.04;
    }
  });

  return (
    <group>
      {/* Central Core Object */}
      <group ref={coreRef}>
        {/* Main geometric mass */}
        <mesh>
          <icosahedronGeometry args={[2, 1]} />
          <meshStandardMaterial 
            color="#111115"
            roughness={0.2}
            metalness={0.9}
            flatShading
          />
        </mesh>
        
        {/* Glowing wireframe overlay for energy seams */}
        <mesh scale={1.01}>
          <icosahedronGeometry args={[2, 1]} />
          <meshBasicMaterial 
            color="#8a2be2"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
        
        {/* Inner energy core */}
        <mesh scale={0.9}>
          <icosahedronGeometry args={[2, 2]} />
          <meshBasicMaterial color="#b200ff" />
        </mesh>
      </group>

      {/* Orbiting Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[3.2, 0.05, 16, 100]} />
        <meshStandardMaterial 
          color="#111115" 
          metalness={1} 
          roughness={0.2}
        />
        {/* Energy nodes on ring */}
        <mesh position={[3.2, 0, 0]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshBasicMaterial color="#ff3366" />
        </mesh>
        <mesh position={[-3.2, 0, 0]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshBasicMaterial color="#8a2be2" />
        </mesh>
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[4.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#4a2574" transparent opacity={0.5} />
        {/* Glowing segments */}
        <mesh>
          <torusGeometry args={[4.5, 0.06, 16, 30, Math.PI / 2]} />
          <meshBasicMaterial color="#00ffcc" />
        </mesh>
      </mesh>

      {/* Floating Fragments */}
      <group ref={fragmentsRef}>
        {fragments.map((frag, idx) => (
          <mesh 
            key={idx} 
            position={frag.position} 
            rotation={frag.rotation}
            scale={frag.scale}
          >
            {/* Mix of box and tetrahedron shapes */}
            {idx % 2 === 0 ? (
              <boxGeometry args={[1, 1, 1]} />
            ) : (
              <tetrahedronGeometry args={[1, 0]} />
            )}
            <meshStandardMaterial 
              color="#1a1a24"
              metalness={0.8}
              roughness={0.4}
              flatShading
            />
            {/* Occasional glowing fragment */}
            {idx % 7 === 0 && (
              <meshBasicMaterial color={idx % 2 === 0 ? "#8a2be2" : "#ff3366"} />
            )}
          </mesh>
        ))}
      </group>
    </group>
  );
}
