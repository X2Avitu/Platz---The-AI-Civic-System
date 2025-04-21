// components/map/MapGroundPlane.tsx
"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import { Plane, Html } from '@react-three/drei';
// Import TextureLoader directly from three
import { RepeatWrapping, Texture, LinearFilter, MeshStandardMaterial, TextureLoader } from 'three';
import { worldCoordToTileCoord } from '@/lib/mapUtils';

interface MapGroundPlaneProps {
  gpsPosition: { latitude: number; longitude: number } | null;
  fallbackTexturePath: string; // Expect path string
  zoomLevel?: number;
  planeSize?: number;
}

const OSM_TILE_SERVER_TEMPLATE = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

export function MapGroundPlane({
  gpsPosition,
  fallbackTexturePath, // Receive path string
  zoomLevel = 18,
  planeSize = 200,
}: MapGroundPlaneProps) {

  const [currentTileCoords, setCurrentTileCoords] = useState<{ x: number; y: number } | null>(null);
  const [mapTextureUrl, setMapTextureUrl] = useState<string | null>(null);
  // State to hold the manually loaded texture
  const [loadedTexture, setLoadedTexture] = useState<Texture | null>(null);
  const materialRef = useRef<MeshStandardMaterial>(null); // Ref for the material

  // --- Effects to calculate coords and set mapTextureUrl (No changes needed) ---
  useEffect(() => {
    if (!gpsPosition) return;
    const newCoords = worldCoordToTileCoord(gpsPosition.latitude, gpsPosition.longitude, zoomLevel);
    if (!currentTileCoords || newCoords.x !== currentTileCoords.x || newCoords.y !== currentTileCoords.y) {
       setCurrentTileCoords(newCoords);
    }
  }, [gpsPosition, zoomLevel, currentTileCoords]);

  useEffect(() => {
    if (!currentTileCoords) {
        setMapTextureUrl(null); return;
    }
    const url = OSM_TILE_SERVER_TEMPLATE
      .replace('{z}', String(zoomLevel))
      .replace('{x}', String(currentTileCoords.x))
      .replace('{y}', String(currentTileCoords.y));
    setMapTextureUrl(url);
  }, [currentTileCoords, zoomLevel]);


  // --- MANUAL Texture Loading Effect ---
  useEffect(() => {
    const texturePath = mapTextureUrl || fallbackTexturePath;
    // console.log("MapGroundPlane: Manual load effect attempting for:", texturePath);

    if (!texturePath) {
        // console.log("MapGroundPlane: No valid texture path, clearing texture.");
        setLoadedTexture(null);
        // --- Ensure material map is also cleared ---
        if (materialRef.current) {
            materialRef.current.map = null;
            materialRef.current.needsUpdate = true;
        }
        // --- End Ensure material map is also cleared ---
        return;
    }

    let isCancelled = false;
    const loader = new TextureLoader();

    loader.load(
      texturePath,
      // onLoad callback
      (texture) => {
        if (isCancelled) return;
        console.log("MapGroundPlane: Manual load SUCCESS for:", texturePath);
        // Configure texture properties
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.minFilter = LinearFilter;
        texture.magFilter = LinearFilter;
        texture.anisotropy = 16;
        texture.needsUpdate = true; // Flag texture itself for update

        setLoadedTexture(texture); // Update state with the loaded texture

        // --- Explicitly update material ---
        if (materialRef.current) {
            materialRef.current.map = texture; // Assign texture to map
            materialRef.current.needsUpdate = true; // Flag material for update
            materialRef.current.color.set(0xffffff); // Set color to white (no tint)
        }
        // --- End Explicitly update material ---
      },
      // onProgress callback (optional)
      undefined,
      // onError callback
      (errorEvent) => {
        if (isCancelled) return;
        console.error("MapGroundPlane: Manual load FAILED for:", texturePath, errorEvent);
        setLoadedTexture(null); // Clear texture state on error
        // --- Ensure material map is also cleared on error ---
         if (materialRef.current) {
            materialRef.current.map = null;
            materialRef.current.needsUpdate = true;
            materialRef.current.color.set(0x333333); // Set back to grey on error
        }
         // --- End Ensure material map is also cleared on error ---
      }
    );

    // Cleanup function for the effect
    return () => { isCancelled = true; };

  }, [mapTextureUrl, fallbackTexturePath]); // Effect depends on the URL to load


  // --- Render JSX ---
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]} receiveShadow>
        <planeGeometry args={[planeSize, planeSize]} />
        {/* Assign the ref to the material */}
        {/* We don't need to pass map/color props directly anymore, as the effect handles it */}
        <meshStandardMaterial
            ref={materialRef}
            // Start with base color, effect will apply map and change color
            color={0x333333}
        />
      </mesh>
      <Html /* ... attribution ... */ >
         {/* ... */}
      </Html>
    </>
  );
}