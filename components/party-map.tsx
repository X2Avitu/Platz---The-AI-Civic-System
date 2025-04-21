"use client"

import { useEffect } from "react"
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
  onPartySelect,
}: PartyMapProps): JSX.Element {
  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyBR9R06eZuZHKXCoP6sDamTtUjpBKMauWY",
      version: "weekly",
    })
    const currentLocation = userLocation 

    loader
      .load()
      .then(async () => {
        const { Map } = (await google.maps.importLibrary(
          "maps"
        )) as google.maps.MapsLibrary

        const { Marker, InfoWindow } = (await google.maps.importLibrary(
          "marker"
        )) as google.maps.MarkerLibrary & { InfoWindow: typeof google.maps.InfoWindow }

        const mapEl = document.getElementById("map")!
        const map = new Map(mapEl, {
          center: currentLocation,
          zoom: 15,
        });

        parties.forEach((party, index) => {
          if (party.lat && party.lng) {
            const marker = new Marker({
              position: { lat: party.lat, lng: party.lng },
              map,
              title: party.name,
              animation: google.maps.Animation.DROP,
              label: {
                text: `${index + 1}`,
                color: "#ffffff",
                fontWeight: "bold",
              },
            });

            // const infoWindow = new google.maps.InfoWindow({
            //   content: `
            //     <div>
            //       <h2 style="margin:0;font-size:1.1em;">${party.name}</h2>
            //       <p style="margin:0;">${party.description || ""}</p>
            //       <p style="margin:0;font-size:0.9em;">Attendees: ${party.attendees ?? 1}</p>
            //     </div>
            //   `,
            // });

            marker.addListener("click", () => {
                console.log("Marker clicked:", party.name);
           
            });
          }
        });
      })
      .catch(console.error)
  }, [userLocation, parties, onPartySelect])

  return (
    <div className="flex flex-col w-screen h-screen">
      <h1 className="text-2xl font-bold p-4">Map</h1>
      <div
        id="map"
        className="w-full flex-1"
      />
    </div>
  )
}