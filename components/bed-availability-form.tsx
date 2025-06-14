"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/AuthContext"
import { getLocalStorage } from "@/lib/local-storage"
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
})


const updateBedAvailability = async (hospitalId: any, bedData: {
  icu: { available: number, occupied: number },
  general: { available: number, occupied: number },
  emergency: { available: number, occupied: number },
  pediatric: { available: number, occupied: number }
}) => {
  const token = getLocalStorage("swasthyasetu_token")
  try {

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const { data } = await api.put(`/hospitals/${hospitalId}/beds`, { beds: bedData })

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to update bed availability');
    }
    console.log(error)
    throw new Error('An unexpected error occurred');
  }
};

export function BedAvailabilityForm() {
  const { user, loading, error } = useAuth();
  const [bedData, setBedData] = useState({
    icuTotal: user?.hospitalInfo?.beds?.icu?.available || 0,
    icuAvailable: user?.hospitalInfo?.beds?.icu?.available || 0,
    icuOccupied: user?.hospitalInfo?.beds?.icu?.occupied || 0,
    generalTotal: user?.hospitalInfo?.beds?.general?.available || 0,
    generalAvailable: user?.hospitalInfo?.beds?.general?.available || 0,
    generalOccupied: user?.hospitalInfo?.beds?.general?.occupied || 0,
    emergencyTotal: user?.hospitalInfo?.beds?.emergency?.available || 0,
    emergencyAvailable: user?.hospitalInfo?.beds?.emergency?.available || 0,
    emergencyOccupied: user?.hospitalInfo?.beds?.emergency?.occupied || 0,
    pediatricTotal: user?.hospitalInfo?.beds?.pediatric?.available || 0,
    pediatricAvailable: user?.hospitalInfo?.beds?.pediatric?.available || 0,
    pediatricOccupied: user?.hospitalInfo?.beds?.pediatric?.occupied || 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numValue = Number.parseInt(value) || 0

    setBedData((prev) => {
      const newData = { ...prev, [name]: numValue }

      // Update occupied beds based on total and available
      if (name.includes("Occupied") || name.includes("Available")) {
        const bedType = name.replace("Occupied", "").replace("Available", "")
        const Occupied = name.includes("Occupied") ? numValue : prev[`${bedType}Occupied` as keyof typeof prev]
        const available = name.includes("Available") ? numValue : prev[`${bedType}Available` as keyof typeof prev]

        return {
          ...newData,
          [`${bedType}Total`]: Math.max(0, (Occupied as number) + (available as number)),
        }
      }

      return newData
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedData = await updateBedAvailability(user?.id, {
        icu: {
          available: bedData.icuAvailable,
          occupied: bedData.icuOccupied
        },
        general: {
          available: bedData.generalAvailable,
          occupied: bedData.generalOccupied
        },
        emergency: {
          available: bedData.emergencyAvailable,
          occupied: bedData.emergencyOccupied
        },
        pediatric: {
          available: bedData.pediatricAvailable,
          occupied: bedData.pediatricOccupied
        }
      });

      toast({
        title: 'Success',
        description: 'Bed availability updated successfully',
        variant: 'default'
      });

      // Update local state if needed
      setBedData(updatedData.hospital.beds);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };


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
                    <Input id="icuTotal" type="number" value={bedData.icuTotal} disabled />
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
                    <Input
                      id="icuOccupied"
                      name="icuOccupied"
                      type="number"
                      value={bedData.icuOccupied}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">General Beds</h3>
                <Separator className="my-2" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="generalOccupied">Total</Label>
                    <Input id="generalTotal" type="number" value={bedData.generalTotal} disabled />
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
                    <Label htmlFor="generalTotal">Occupied</Label>
                    <Input
                      id="generalOccupied"
                      name="generalOccupied"
                      type="number"
                      value={bedData.generalOccupied}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">Emergency Beds</h3>
                <Separator className="my-2" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyOccupied">Total</Label>
                    <Input id="emergencyTotal" type="number" value={bedData.emergencyTotal} disabled />
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
                    <Label htmlFor="emergencyTotal">Occupied</Label>
                    <Input
                      id="emergencyOccupied"
                      name="emergencyOccupied"
                      type="number"
                      value={bedData.emergencyOccupied}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">Pediatric Beds</h3>
                <Separator className="my-2" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pediatricTotal">Total</Label>
                    <Input id="pediatricTotal" type="number" value={bedData.pediatricTotal} disabled />
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
                    <Input
                      id="pediatricOccupied"
                      name="pediatricOccupied"
                      type="number"
                      value={bedData.pediatricOccupied}
                      onChange={handleInputChange}
                    />
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
