// hooks/useGeolocation.ts
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

// --- Interfaces ---
interface LocationState {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
  timestamp: number;
}

interface GeolocationError {
  code: number;
  message: string;
}

interface GeolocationOptions extends PositionOptions {}

// --- Hook Implementation ---
export function useGeolocation(options?: GeolocationOptions) {
  const [position, setPosition] = useState<LocationState | null>(null);
  const [error, setError] = useState<GeolocationError | null>(null);
  const [loading, setLoading] = useState(true);
  const watcherIdRef = useRef<number | null>(null);

  // --- Stable Callback References (Empty Dependencies) ---
  const successCallback = useCallback((pos: GeolocationPosition) => {
    // console.log("--- Success Callback Triggered ---", pos.coords);

    const newPosData: LocationState = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      accuracy: pos.coords.accuracy,
      altitude: pos.coords.altitude,
      altitudeAccuracy: pos.coords.altitudeAccuracy,
      heading: pos.coords.heading,
      speed: pos.coords.speed,
      timestamp: pos.timestamp,
    };

    setPosition(prevPosition => {
        if (!prevPosition ||
            prevPosition.latitude !== newPosData.latitude ||
            prevPosition.longitude !== newPosData.longitude ||
            prevPosition.accuracy !== newPosData.accuracy
           ) {
            // console.log('Success: Updating position state.');
            setError(null);
            setLoading(false);
            return newPosData;
        }
        setLoading(currentLoading => currentLoading ? false : currentLoading);
        setError(null);
        return prevPosition;
    });
  }, []); // Empty dependency array - stable reference

  const errorCallback = useCallback((err: GeolocationPositionError) => {
    // console.log("--- Error Callback Triggered ---", err.code, err.message);
    console.error("Geolocation Error:", err.code, err.message);

    const newError = { code: err.code, message: err.message };
    setError(prevError => {
        if (!prevError || prevError.code !== newError.code || prevError.message !== newError.message) {
        //    console.log('Error: Updating error state.');
           setLoading(false);
           return newError;
        }
        setLoading(currentLoading => currentLoading ? false : currentLoading);
        return prevError;
    });
  }, []); // Empty dependency array - stable reference


  useEffect(() => {
    if (!navigator.geolocation) {
        setError({ code: -1, message: 'Geolocation is not supported.' });
        setLoading(false);
        return;
    }

    if (watcherIdRef.current !== null) {
        // console.log("useGeolocation Effect: Clearing previous watcher ID:", watcherIdRef.current);
        navigator.geolocation.clearWatch(watcherIdRef.current);
        watcherIdRef.current = null;
    }

    // console.log("useGeolocation Effect: Starting watch...");
    setLoading(true);

    // Callbacks are now stable references
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
    watcherIdRef.current = navigator.geolocation.watchPosition(
      successCallback,
      errorCallback,
      options
    );
    // console.log("useGeolocation Effect: Watch started with ID:", watcherIdRef.current);

    return () => {
      if (watcherIdRef.current !== null) {
        // console.log("useGeolocation Effect: Cleaning up watcher ID:", watcherIdRef.current);
        navigator.geolocation.clearWatch(watcherIdRef.current);
        watcherIdRef.current = null;
      } else {
        // console.log("useGeolocation Effect: Cleanup called, but no watcher ID found.");
      }
    };
  // Effect now only re-runs if options object reference changes
  }, [options, successCallback, errorCallback]); // Keep stable callbacks as dependencies

  return { position, error, loading };
}