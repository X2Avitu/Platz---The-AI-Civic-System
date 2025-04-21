"use client"

import { useEffect, useRef, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import type { JSX } from "react"
import { Party } from "@/types/party"

type PartyMapProps = {
  userLocation: { lat: number; lng: number };
  parties: Party[];
  joinParty: (partyId: string) => void;
  selectedPartyId: string | null;
  onPartySelect: (partyId: string) => void;
};

export function PartyMap({
  userLocation,
  parties,
  joinParty,
  selectedPartyId: propsSelectedPartyId,
  onPartySelect,
}: PartyMapProps): JSX.Element {
  const [selectedPartyId, setSelectedPartyId] = useState<string | null>(propsSelectedPartyId);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const lastUrlRef = useRef(typeof window !== 'undefined' ? window.location.href : '');
  const [mapsLoaded, setMapsLoaded] = useState(false);

  // Track selectedPartyId from URL with polling fallback
  useEffect(() => {
    const updateSelectedPartyId = () => {
      const params = new URLSearchParams(window.location.search);
      const newPartyId = params.get("selectedPartyId");
      console.log("URL checked, partyId:", newPartyId);
      setSelectedPartyId(newPartyId);
    };
    
    updateSelectedPartyId(); // Initial check
    window.addEventListener("popstate", updateSelectedPartyId);
    
    // Add URL polling as a fallback (will detect all URL changes)
    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && lastUrlRef.current !== window.location.href) {
        lastUrlRef.current = window.location.href;
        updateSelectedPartyId();
      }
    }, 200); // Check every 200ms
    
    return () => {
      window.removeEventListener("popstate", updateSelectedPartyId);
      clearInterval(interval);
    };
  }, []);

  // Sync props.selectedPartyId -> local state
  useEffect(() => {
    if (propsSelectedPartyId !== selectedPartyId) {
      setSelectedPartyId(propsSelectedPartyId);
    }
  }, [propsSelectedPartyId]);

  // Initialize map once
  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyBR9R06eZuZHKXCoP6sDamTtUjpBKMauWY",
      version: "weekly",
    });
    
    loader.load().then(async () => {
      try {
        const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
        const { InfoWindow } = (await google.maps.importLibrary("maps")) as any;
        
        const mapEl = document.getElementById("map");
        if (!mapEl) return;
        
        if (!mapRef.current) {
          mapRef.current = new Map(mapEl, {
            center: userLocation,
            zoom: 15,
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false
          });
          
          // Create a shared info window
          infoWindowRef.current = new InfoWindow();
          
          console.log("Map initialized");
          setMapsLoaded(true);
        }
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    });
    
    return () => {
      // Clean up markers on unmount
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
      }
    };
  }, []); // Empty dependency array - initialize map only once

  // Handle markers when parties or map changes
  useEffect(() => {
    if (!mapsLoaded || !mapRef.current) return;

    const setupMarkers = async () => {
      try {
        // Clear existing markers
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
        
        const { Marker } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;
        
        // Add new markers
        parties.forEach((party, index) => {
          if (party.lat && party.lng) {
            const marker = new Marker({
              position: { lat: party.lat, lng: party.lng },
              map: mapRef.current!,
              title: party.name,
              animation: google.maps.Animation.DROP,
              label: {
                text: `${index + 1}`,
                color: "#ffffff",
                fontWeight: "bold",
              },
            });
            
            marker.addListener("click", () => {
              // Set up info window content
              if (infoWindowRef.current) {
                const contentString = `
                  <div class="p-3">
                    <h3 class="font-bold text-lg mb-1">${party.name}</h3>
                    <p class="text-sm mb-2">${party.description || 'No description available'}</p>
                    <button id="join-party-${party.id}" class="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                      Join Party
                    </button>
                  </div>
                `;
                
                infoWindowRef.current.setContent(contentString);
                infoWindowRef.current.open(mapRef.current, marker);
                
                // Need to wait for the DOM to update
                setTimeout(() => {
                  const joinButton = document.getElementById(`join-party-${party.id}`);
                  if (joinButton) {
                    joinButton.addEventListener('click', () => {
                      joinParty(party.id);
                    });
                  }
                }, 10);
              }
              
              setSelectedPartyId(party.id);
              onPartySelect(party.id);
            });
            
            // Store marker reference for later cleanup
            markersRef.current.push(marker);
          }
        });
        
        console.log(`Added ${markersRef.current.length} markers`);
      } catch (error) {
        console.error("Error setting up markers:", error);
      }
    };
    
    setupMarkers();
  }, [mapsLoaded, parties, onPartySelect, joinParty]); // Run when map is loaded or parties change

  // Recenter map when selectedPartyId changes
  useEffect(() => {
    if (!mapRef.current || !mapsLoaded) return;
    
    console.log("selectedPartyId changed to:", selectedPartyId);
    let currentLocation = userLocation;
    
    if (selectedPartyId) {
      const selectedParty = parties.find(p => p.id === selectedPartyId);
      if (selectedParty && selectedParty.lat && selectedParty.lng) {
        currentLocation = { lat: selectedParty.lat, lng: selectedParty.lng };
        console.log("Centering map on:", currentLocation);
      }
    }
    
    mapRef.current.setCenter(currentLocation);
    mapRef.current.setZoom(15); // Optional: zoom in a bit when selecting a party
  }, [selectedPartyId, userLocation, parties, mapsLoaded]);

  return (
    <div className="flex flex-col w-screen h-screen">
      <h1 className="text-2xl font-bold p-4">Map</h1>
      <div
        id="map"
        className="w-full flex-1 relative"
      />
    </div>
  );
}