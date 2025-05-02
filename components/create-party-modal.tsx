"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { MapPin } from "lucide-react"
import type { Party } from "@/types/party"
import { createParty } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

interface CreatePartyModalProps {
  isOpen: boolean
  onClose: () => void
  addParty: (party: Party) => void
  userLocation: { lat: number; lng: number } | null
  defaultLocation?: boolean
}

export function CreatePartyModal({
  isOpen,
  onClose,
  addParty,
  userLocation,
  defaultLocation = false,
}: CreatePartyModalProps) {
  const [useCurrentLocation, setUseCurrentLocation] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      customLat: "",
      customLng: "",
    },
  })

  const onSubmit = async (data: any) => {
    if (!userLocation && useCurrentLocation) return
  
    const location = useCurrentLocation
      ? userLocation!
      : { lat: Number.parseFloat(data.customLat), lng: Number.parseFloat(data.customLng) }
  
    // Generate a random color for the party marker
    const colors = ["#f43f5e", "#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
  
    // Create a client-side party object for immediate UI update
    const clientParty: Party = {
      id: uuidv4(), // Temporary ID that will be replaced by the server
      name: data.name,
      description: data.description,
      lat: location.lat,
      lng: location.lng,
      attendees: 1, // Creator is the first attendee
      color: randomColor,
      createdAt: new Date().toISOString(),
      user: null, // This will be set by the server
    }
  
    try {
      setIsSubmitting(true)
      
      // Update client state immediately for responsive UI
      addParty(clientParty)
      
      // Create the party on the server
      const serverParty = await createParty({
        name: data.name,
        description: data.description,
        lat: location.lat,
        lng: location.lng,
      })
      
      // If server creation was successful, show success message
      toast({
        title: "Party Created Successfully",
        description: `Your party "${data.name}" has been created!`,
        duration: 3000,
        action: (
          <ToastAction altText="Dismiss notification">Dismiss</ToastAction>
        ),
      })
      
      // Close modal and reset form
      reset()
      onClose()
      
    } catch (error) {
      console.error("Error creating party:", error)
      
      toast({
        title: "Error Creating Party",
        description: "There was a problem creating your party. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Party</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Party Name</Label>
            <Input
              id="name"
              placeholder="Beach Bonfire"
              {...register("name", { required: "Party name is required" })}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message as string}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Join us for a fun beach bonfire with music and snacks!"
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message as string}</p>}
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant={useCurrentLocation ? "default" : "outline"}
                className="flex-1"
                onClick={() => setUseCurrentLocation(true)}
              >
                <MapPin className="mr-2 h-4 w-4" />
                {defaultLocation ? "Default Location" : "Current Location"}
              </Button>
              <Button
                type="button"
                variant={!useCurrentLocation ? "default" : "outline"}
                className="flex-1"
                onClick={() => setUseCurrentLocation(false)}
              >
                Custom Location
              </Button>
            </div>
            {defaultLocation && useCurrentLocation && (
              <p className="text-xs text-muted-foreground mt-1">Using New York City as the default location.</p>
            )}
          </div>

          {!useCurrentLocation && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customLat">Latitude</Label>
                <Input
                  id="customLat"
                  placeholder="40.7128"
                  {...register("customLat", {
                    required: !useCurrentLocation ? "Latitude is required" : false,
                    pattern: {
                      value: /^-?\d+(\.\d+)?$/,
                      message: "Please enter a valid number",
                    },
                  })}
                />
                {errors.customLat && <p className="text-sm text-red-500">{errors.customLat.message as string}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="customLng">Longitude</Label>
                <Input
                  id="customLng"
                  placeholder="-74.0060"
                  {...register("customLng", {
                    required: !useCurrentLocation ? "Longitude is required" : false,
                    pattern: {
                      value: /^-?\d+(\.\d+)?$/,
                      message: "Please enter a valid number",
                    },
                  })}
                />
                {errors.customLng && <p className="text-sm text-red-500">{errors.customLng.message as string}</p>}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Party"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}