// components/map/PlayerMarker.tsx
"use client"; // <--- Add this

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';

export function PlayerMarker({ targetWorldPosition }: { targetWorldPosition: Vector3 | null }) {
  const meshRef = useRef<Mesh>(null!);

  useFrame(() => {
    if (meshRef.current && targetWorldPosition) {
      // Smoothly move marker to target
      meshRef.current.position.lerp(targetWorldPosition, 0.1);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}> {/* Start at origin */}
      <coneGeometry args={[0.3, 0.8, 8]} /> {/* Example shape */}
      <meshStandardMaterial color="red" />
    </mesh>
  );
}