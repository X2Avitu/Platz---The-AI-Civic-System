// components/map/CameraController.tsx
"use client"; // <--- Add this

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

export function CameraController({ target }: { target: Vector3 | null }) {
  const { camera } = useThree();
  const cameraOffset = useRef(new Vector3(0, 10, 15)); // Adjust offset as needed
  const targetPosition = useRef(new Vector3());

  useFrame(() => {
    if (target) {
        // Smooth target and camera position
        targetPosition.current.lerp(target, 0.1);
        const desiredPosition = new Vector3().addVectors(targetPosition.current, cameraOffset.current);
        camera.position.lerp(desiredPosition, 0.1);

        // Look at smoothed target (slightly above ground)
        camera.lookAt(targetPosition.current.x, targetPosition.current.y + 1, targetPosition.current.z);

        // Optional: Update matrices if needed, R3F often handles it
        // camera.updateProjectionMatrix();
    }
  });

  return null; // No visual output
}