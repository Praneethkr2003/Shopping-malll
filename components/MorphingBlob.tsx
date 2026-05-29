'use client';

import { useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useIsMobile } from '@/lib/useIsMobile';

function BlobGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();
  const isMobile = useIsMobile();

  // Create icosahedron geometry that we'll deform
  const geometry = useRef(new THREE.IcosahedronGeometry(2, 6));

  useEffect(() => {
    if (!meshRef.current) return;

    // Store original positions
    const positionAttribute = geometry.current.getAttribute('position');
    const originalPositions = new Float32Array(
      positionAttribute.array as ArrayLike<number>
    );

    let time = 0;

    const animate = () => {
      time += 0.01;

      // Deform vertices based on noise
      const positions = geometry.current.getAttribute('position') as THREE.BufferAttribute;
      const posArray = positions.array as Float32Array;

      for (let i = 0; i < posArray.length; i += 3) {
        const x = originalPositions[i];
        const y = originalPositions[i + 1];
        const z = originalPositions[i + 2];

        // Simple sine wave deformation
        const scale =
          1 +
          0.3 *
            Math.sin(x * 2 + time) *
            Math.cos(y * 2 + time) *
            Math.sin(z * 2 + time);

        posArray[i] = x * scale;
        posArray[i + 1] = y * scale;
        posArray[i + 2] = z * scale;
      }

      positions.needsUpdate = true;
    };

    const animationId = setInterval(animate, 16);
    return () => clearInterval(animationId);
  }, []);

  return (
    <mesh ref={meshRef} geometry={geometry.current}>
      <meshPhongMaterial
        color="#00d9ff"
        emissive="#00d9ff"
        emissiveIntensity={0.2}
        wireframe={false}
      />
    </mesh>
  );
}

export function MorphingBlob() {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      camera={{ position: [0, 0, 5], fov: 75 }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#ff006e" />
      <BlobGeometry />
    </Canvas>
  );
}
