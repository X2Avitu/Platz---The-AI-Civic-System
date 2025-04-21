export interface Party {
    id: string
    name: string
    description: string
    lat: number
    lng: number
    attendees: number
    color: string
    createdAt: string
    user: string | null // Add the user property
  }

  export interface Location {
    lat: number
    lng: number
  }
  
  export interface Attendee {
    id: string
    name: string
    joinedAt: string
    avatar: string
  }
  
export interface User {
  id: string
  name: string
  email: string
  avatar: string
  createdParties: string[]
  joinedParties: string[]
}
