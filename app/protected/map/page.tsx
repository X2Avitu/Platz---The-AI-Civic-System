"use client";

import { useState, useEffect } from "react";
import { PartyMap } from "@/components/party-map";
import { CreatePartyModal } from "@/components/create-party-modal";
import { PartySidebar } from "@/components/party-sidebar";
import type { Party } from "@/types/party";
import { getParties } from '@/app/actions';

export default function MapPage() {
  // Move hooks inside the component function
  const [fetchedParties, setFetchedParties] = useState<Party[]>([]);
  const [parties, setParties] = useState<Party[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartyId, setSelectedPartyId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch from server
    const fetchParties = async () => {
      const parties = await getParties() || [];
      setFetchedParties(parties);
      console.log("Fetched parties:", parties);
    };

    fetchParties();

    // Local storage and location setup

    
    // Set default location
    setUserLocation({ lat: 40.7128, lng: -74.006 });
  }, []);

  const addParty = (newParty: Party) => {
    const updatedParties = [...parties, newParty];
    setParties(updatedParties);
    setIsModalOpen(false);
  };

  const joinParty = (partyId: string) => {
    const updatedParties = parties.map((party) =>
      party.id === partyId ? { ...party, attendees: party.attendees + 1 } : party,
    );
    setParties(updatedParties);
  };

  const selectParty = (partyId: string) => {
    setSelectedPartyId(partyId === selectedPartyId ? null : partyId);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <PartySidebar
        parties={fetchedParties}
        joinParty={joinParty}
        openModal={() => setIsModalOpen(true)}
        selectedPartyId={selectedPartyId}
        onPartySelect={selectParty}
      />

      {/* Main content */}
      <main className="flex-1">
        {userLocation && (
          <PartyMap
            userLocation={userLocation}
            parties={fetchedParties}
            joinParty={joinParty}
            selectedPartyId={selectedPartyId}
            onPartySelect={selectParty}
          />
        )}
      </main>

      {/* Create Party Modal */}
      <CreatePartyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addParty={addParty}
        userLocation={userLocation}
        defaultLocation={true}
      />
    </div>
  );
}