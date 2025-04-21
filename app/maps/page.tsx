// app/maps/page.tsx
"use client"; // <--- Add this

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

// Import the main experience component
import { Experience } from '@/components/map/Experience'; // <--- Adjust path if needed

// Loading fallback
function Loader() {
  return <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', color: 'white' }}>Loading Map Experience...</div>;
}

// The Page component
export default function MapPage() {
  return (
    // This container div is crucial for sizing the Canvas
    // Adjust height based on your app's layout (e.g., account for header/footer)
    // bg-neutral-900 sets a dark background for the map area
    <div className="relative w-full h-screen overflow-hidden bg-neutral-900"> {/* Or h-[calc(100vh-YOUR_HEADER_HEIGHT)] */}
      <Suspense fallback={<Loader />}>
        <Canvas
           camera={{ fov: 60 }} // Initial FOV, CameraController handles position/lookAt
           shadows // Enable shadows for directionalLight and objects
           className="w-full h-full" // Make canvas fill the container
        >
          <Experience />
        </Canvas>
      </Suspense>
    </div>
  );
}