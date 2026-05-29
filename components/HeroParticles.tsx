'use client';

import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleSystem() {
  const pointsRef = useRef<THREE.Points>(null);
  const { size } = useThree();

  // Create particles
  const particleCount = 1000;
  const geometry = useRef(new THREE.BufferGeometry());

  useEffect(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;

      velocities[i] = (Math.random() - 0.5) * 0.05;
      velocities[i + 1] = (Math.random() - 0.5) * 0.05;
      velocities[i + 2] = (Math.random() - 0.5) * 0.05;
    }

    geometry.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.current.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;

    const positions = geometry.current.getAttribute('position') as THREE.BufferAttribute;
    const posArray = positions.array as Float32Array;
    const velocity = geometry.current.getAttribute('velocity') as THREE.BufferAttribute;
    const velArray = velocity.array as Float32Array;

    for (let i = 0; i < posArray.length; i += 3) {
      posArray[i] += velArray[i];
      posArray[i + 1] += velArray[i + 1];
      posArray[i + 2] += velArray[i + 2];

      // Wrap particles around
      if (posArray[i] > 10) posArray[i] = -10;
      if (posArray[i] < -10) posArray[i] = 10;
      if (posArray[i + 1] > 10) posArray[i + 1] = -10;
      if (posArray[i + 1] < -10) posArray[i + 1] = 10;
      if (posArray[i + 2] > 10) posArray[i + 2] = -10;
      if (posArray[i + 2] < -10) posArray[i + 2] = 10;
    }

    positions.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry.current}>
      <pointsMaterial
        size={0.08}
        color="#00d9ff"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
      />
    </points>
  );
}

export function HeroParticles() {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, zIndex: 1 }}
      camera={{ position: [0, 0, 15], fov: 50 }}
    >
      <ambientLight intensity={0.3} />
      <ParticleSystem />
    </Canvas>
  );
}
