"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

export function BedAvailabilityForm() {
  const [bedData, setBedData] = useState({
    icuTotal: 20,
    icuAvailable: 5,
    icuOccupied: 15,
    generalTotal: 100,
    generalAvailable: 25,
    generalOccupied: 75,
    emergencyTotal: 10,
    emergencyAvailable: 3,
    emergencyOccupied: 7,
    pediatricTotal: 15,
    pediatricAvailable: 8,
    pediatricOccupied: 7,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numValue = Number.parseInt(value) || 0

    setBedData((prev) => {
      const newData = { ...prev, [name]: numValue }

      // Update occupied beds based on total and available
      if (name.includes("Total") || name.includes("Available")) {
        const bedType = name.replace("Total", "").replace("Available", "")
        const total = name.includes("Total") ? numValue : prev[`${bedType}Total` as keyof typeof prev]
        const available = name.includes("Available") ? numValue : prev[`${bedType}Available` as keyof typeof prev]

        return {
          ...newData,
          [`${bedType}Occupied`]: Math.max(0, (total as number) - (available as number)),
        }
      }

      return newData
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    toast({
      title: "Bed availability updated",
      description: "The bed availability information has been updated successfully.",
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              <div>
                <h3 className="text-lg font-medium">ICU Beds</h3>
                <Separator className="my-2" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="icuTotal">Total</Label>
                    <Input
                      id="icuTotal"
                      name="icuTotal"
                      type="number"
                      value={bedData.icuTotal}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="icuAvailable">Available</Label>
                    <Input
                      id="icuAvailable"
                      name="icuAvailable"
                      type="number"
                      value={bedData.icuAvailable}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="icuOccupied">Occupied</Label>
                    <Input id="icuOccupied" type="number" value={bedData.icuOccupied} disabled />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">General Beds</h3>
                <Separator className="my-2" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="generalTotal">Total</Label>
                    <Input
                      id="generalTotal"
                      name="generalTotal"
                      type="number"
                      value={bedData.generalTotal}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="generalAvailable">Available</Label>
                    <Input
                      id="generalAvailable"
                      name="generalAvailable"
                      type="number"
                      value={bedData.generalAvailable}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="generalOccupied">Occupied</Label>
                    <Input id="generalOccupied" type="number" value={bedData.generalOccupied} disabled />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">Emergency Beds</h3>
                <Separator className="my-2" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyTotal">Total</Label>
                    <Input
                      id="emergencyTotal"
                      name="emergencyTotal"
                      type="number"
                      value={bedData.emergencyTotal}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyAvailable">Available</Label>
                    <Input
                      id="emergencyAvailable"
                      name="emergencyAvailable"
                      type="number"
                      value={bedData.emergencyAvailable}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyOccupied">Occupied</Label>
                    <Input id="emergencyOccupied" type="number" value={bedData.emergencyOccupied} disabled />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">Pediatric Beds</h3>
                <Separator className="my-2" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pediatricTotal">Total</Label>
                    <Input
                      id="pediatricTotal"
                      name="pediatricTotal"
                      type="number"
                      value={bedData.pediatricTotal}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pediatricAvailable">Available</Label>
                    <Input
                      id="pediatricAvailable"
                      name="pediatricAvailable"
                      type="number"
                      value={bedData.pediatricAvailable}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pediatricOccupied">Occupied</Label>
                    <Input id="pediatricOccupied" type="number" value={bedData.pediatricOccupied} disabled />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full md:w-auto md:ml-auto">
          Update Bed Availability
        </Button>
      </div>
    </form>
  )
}
