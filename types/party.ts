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
