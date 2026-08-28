'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EnergyParticlesProps {
  count?: number;
}

export default function EnergyParticles({ count = 2000 }: EnergyParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Setup instances data
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      // Create a swirling field structure
      const radius = 2 + Math.random() * 8;
      // Orbit paths
      const theta = Math.random() * Math.PI * 2;
      // Concentrate around the equator, but allow some spread
      const phi = (Math.random() - 0.5) * (Math.random() > 0.8 ? 2 : 0.5);
      
      const x = radius * Math.cos(theta) * Math.cos(phi);
      const y = radius * Math.sin(phi);
      const z = radius * Math.sin(theta) * Math.cos(phi);

      const speed = 0.2 + Math.random() * 0.8;
      const angleOffset = Math.random() * Math.PI * 2;
      
      data.push({ x, y, z, radius, speed, angleOffset, phi });
    }
    return data;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      // Calculate new position based on orbit
      const currentTheta = time * particle.speed + particle.angleOffset;
      
      // Add slight vertical wave motion
      const yWave = Math.sin(time * 2 + particle.angleOffset) * 0.2;

      dummy.position.set(
        particle.radius * Math.cos(currentTheta) * Math.cos(particle.phi),
        particle.radius * Math.sin(particle.phi) + yWave,
        particle.radius * Math.sin(currentTheta) * Math.cos(particle.phi)
      );

      // Rotate the particle itself
      dummy.rotation.x = time * particle.speed;
      dummy.rotation.y = time * particle.speed * 2;

      // Scale pulse
      const scale = 0.02 + Math.sin(time * 3 + particle.angleOffset) * 0.01;
      dummy.scale.set(scale, scale, scale);

      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {/* Octahedron looks like a tiny crystal/energy shard */}
      <octahedronGeometry args={[1, 0]} />
      {/* Basic material is emissive by default */}
      <meshBasicMaterial color="#d4a5ff" transparent opacity={0.8} />
    </instancedMesh>
  );
}
