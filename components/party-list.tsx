"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { Party } from "../types/party"
import { Users, Calendar } from "lucide-react"
import { joinPartyWithID } from "@/app/actions";

interface PartyListProps {
  parties: Party[]
  joinParty: (partyId: string) => void
}


export function PartyList({ parties, joinParty }: PartyListProps) {
  // Sort parties by creation date (newest first)
  const sortedParties = [...parties].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  if (sortedParties.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Nearby Parties</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-6">No parties found. Create one to get started!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nearby Parties</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {sortedParties.map((party) => (
            <div key={party.id} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{party.name}</h3>
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
                  onClick={() => {
                    console.log("JOINING PARTY:", party);
                    joinPartyWithID(party.id);
                  }}
                >
                  Join
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
