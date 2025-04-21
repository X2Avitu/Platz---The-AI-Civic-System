"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Users, Calendar } from "lucide-react"
import type { Party } from "../types/party"

interface PartySidebarProps {
  parties: Party[]
  joinParty: (partyId: string) => void
  openModal: () => void
  selectedPartyId: string | null
  selectedPartyCoordinates?: { lat: number; lng: number } | null
  onPartySelect: (partyId: string) => void
}

export function PartySidebar({ parties, joinParty, openModal, selectedPartyId, selectedPartyCoordinates, onPartySelect }: PartySidebarProps) {
  // Sort parties by creation date (newest first)
  const sortedParties = [...parties].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div className="w-80 border-r bg-background flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <h1 className="text-xl font-bold">Party Finder</h1>
        <Button size="sm" onClick={openModal}>
          <Plus className="h-4 w-4 mr-1" />
          New Party
        </Button>
      </div>

      <ScrollArea className="flex-1">
        {sortedParties.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <p>No parties found.</p>
            <p>Create one to get started!</p>
          </div>
        ) : (
          <div className="divide-y">
            {sortedParties.map((party) => (
              <div
                key={party.id}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedPartyId === party.id ? "bg-muted" : "hover:bg-muted/50"
                }`}
                onClick={() => {
                // Removed misplaced console.log
                console.log(selectedPartyId, party.id)
                const params = new URLSearchParams(window.location.search);
                params.set("selectedPartyId", party.id);
                window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
              
              }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: party.color }} />
                      <h3 className="font-medium">{party.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{party.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users size={14} className="mr-1" />
                        {party.attendees}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar size={14} className="mr-1" />
                        {new Date(party.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      joinParty(party.id)
                      
                    }}
                  >
                    Join
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <div className="p-4 border-t text-xs text-muted-foreground">
        <p>Using New York City as the default location.</p>
      </div>
    </div>
  )
}
