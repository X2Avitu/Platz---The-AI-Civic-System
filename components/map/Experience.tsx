// components/map/Experience.tsx
"use client";

import { useState, useEffect, useMemo, Suspense } from 'react';
import { Vector3, Texture } from 'three'; // Ensure Vector3 and Texture are imported if needed elsewhere, though Experience might not use Texture directly now
import { Html, OrbitControls, useTexture } from '@react-three/drei'; // Ensure OrbitControls is imported

import { useGeolocation } from '@/hooks/useGeolocation'; // Adjust path if needed
import { PlayerMarker } from '@/components/map/PlayerMarker'; // Adjust path if needed
import { CameraController } from '@/components/map/CameraController'; // Adjust path if needed
import { MapGroundPlane } from '@/components/map/MapGroundPlane'; // Adjust path if needed

// Simple fallback for Suspense boundary around Experience
function ExperienceLoaderFallback() {
    return <Html center><div style={{color: 'white'}}>Loading Experience...</div></Html>;
}

export function Experience() {

  // --- Geolocation Setup ---
  const geolocationOptions = useMemo(() => ({
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 0
  }), []); // Empty dependency array = stable reference

  const { position: gpsPosition, error, loading } = useGeolocation(geolocationOptions);


  // --- Origin/World Pos State ---
  const [origin, setOrigin] = useState<{lat: number, lon: number} | null>(null);
  const [worldPosition, setWorldPosition] = useState<Vector3 | null>(null); // Target world position


  // --- Effect to set origin ---
  useEffect(() => {
    if (gpsPosition && !origin) {
    //   console.log("Experience: Setting Geolocation Origin:", gpsPosition.latitude, gpsPosition.longitude);
      setOrigin({ lat: gpsPosition.latitude, lon: gpsPosition.longitude });
      setWorldPosition(new Vector3(0, 0, 0));
    }
  }, [gpsPosition]);


  // --- Effect to calculate world position ---
  useEffect(() => {
    if (gpsPosition && origin) {
       const worldScale = 0.1; // 1 world unit = 10 meters
       const METERS_PER_DEGREE_LAT = 111132;
       const METERS_PER_DEGREE_LON_AT_EQUATOR = 111320;
       const lonScaleFactor = Math.cos(origin.lat * Math.PI / 180);
       const metersPerDegreeLon = METERS_PER_DEGREE_LON_AT_EQUATOR * lonScaleFactor;
       const deltaLat = gpsPosition.latitude - origin.lat;
       const deltaLon = gpsPosition.longitude - origin.lon;
       const worldZ = -(deltaLat * METERS_PER_DEGREE_LAT * worldScale);
       const worldX = deltaLon * metersPerDegreeLon * worldScale;

       if (isNaN(worldX) || isNaN(worldZ) || !isFinite(worldX) || !isFinite(worldZ)) {
           console.error("Experience: Invalid world coordinate calculation."); return;
       }

       setWorldPosition(prevWorldPos => {
           const newWorldPos = new Vector3(worldX, 0, worldZ);
           if (prevWorldPos && prevWorldPos.equals(newWorldPos)) {
               return prevWorldPos; // Avoid update if position hasn't changed
           }
           // console.log(`Experience: Updating target world Pos: X=${newWorldPos.x.toFixed(2)}, Z=${newWorldPos.z.toFixed(2)}`);
           return newWorldPos;
       });
    }
  }, [gpsPosition, origin]);


  // --- Fallback Texture Path (Passed down) ---
  const fallbackTexturePath = '/placeholder-texture.png'; // Define the path


  return (
    // Wrap in Suspense
     <Suspense fallback={<ExperienceLoaderFallback />}>
        {/* --- TEMPORARILY RE-ENABLE ORBIT CONTROLS --- */}
        {/* Add OrbitControls back. makeDefault might help if CameraController is also active */}
        <OrbitControls makeDefault />

        {/* --- Keep CameraController BUT OrbitControls might override it --- */}
        {/* You might need to comment this out if OrbitControls aren't working */}
        <CameraController target={worldPosition} />

        {/* Basic Scene Setup */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 15, 8]} intensity={0.8} castShadow />
        <fog attach="fog" args={['#202020', 20, 150]} />

        {/* Geolocation Status UI */}
        <Html position={[0, 2, 0]} center style={{ zIndex: 1, color: 'white', background: 'rgba(0,0,0,0.5)', padding: '5px 10px', borderRadius: '5px', width: 'auto', minWidth: '200px', textAlign: 'center' }}>
          {loading && <p>Loading GPS...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error.message} (Code: {error.code})</p>}
          {gpsPosition && (
           <div>
             <p>Lat: {gpsPosition.latitude.toFixed(6)}</p>
             <p>Lon: {gpsPosition.longitude.toFixed(6)}</p>
             <p>Acc: {gpsPosition.accuracy.toFixed(1)}m</p>
           </div>
          )}
           {/* World Pos display */}
           {worldPosition && (
              <div>
                  <hr style={{margin: '4px 0', borderColor: 'rgba(255,255,255,0.3)'}}/>
                  <p>World X: {worldPosition.x.toFixed(2)}</p>
                  <p>World Z: {worldPosition.z.toFixed(2)}</p>
              </div>
           )}
        </Html>

        {/* Player Avatar */}
        <PlayerMarker targetWorldPosition={worldPosition} />

        {/* Ground Plane - Pass gpsPosition AND the fallbackTexture PATH */}
        {/* Using the version with manual TextureLoader inside MapGroundPlane */}
        <MapGroundPlane
            gpsPosition={gpsPosition}
            fallbackTexturePath={fallbackTexturePath} // Pass path string
            zoomLevel={18}
            planeSize={200}
        />

        {/* Example Static Objects */}
        <mesh position={[10, 1, -5]} castShadow> <boxGeometry args={[2,2,2]}/> <meshStandardMaterial color="blue"/> </mesh>
        <mesh position={[-5, 2.5, 15]} castShadow> <boxGeometry args={[5,5,5]}/> <meshStandardMaterial color="green"/> </mesh>
    </Suspense>
  );
}