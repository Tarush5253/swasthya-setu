"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

export function BloodStockForm() {
  const [bloodStock, setBloodStock] = useState({
    "A+": 15,
    "A-": 8,
    "B+": 12,
    "B-": 5,
    "AB+": 7,
    "AB-": 3,
    "O+": 20,
    "O-": 10,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numValue = Number.parseInt(value) || 0

    setBloodStock((prev) => ({
      ...prev,
      [name]: numValue,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    toast({
      title: "Blood stock updated",
      description: "The blood stock information has been updated successfully.",
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              <div>
                <h3 className="text-lg font-medium">Blood Group Stock</h3>
                <Separator className="my-2" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(bloodStock).map(([group, count]) => (
                    <div key={group} className="space-y-2">
                      <Label htmlFor={group}>{group}</Label>
                      <Input id={group} name={group} type="number" value={count} onChange={handleInputChange} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full md:w-auto md:ml-auto">
          Update Blood Stock
        </Button>
      </div>
    </form>
  )
}
