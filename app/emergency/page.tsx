"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, AlertTriangle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export default function EmergencyPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    patientName: user?.name || "",
    patientAge: "",
    patientGender: "male",
    contactNumber: "",
    location: "",
    emergencyType: "medical",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Emergency request submitted",
        description: "Your emergency request has been submitted. Help is on the way.",
      })

      // Redirect to tracking page
      router.push("/emergency/tracking")
    } catch (error) {
      toast({
        title: "Request failed",
        description:
          "There was an error submitting your emergency request. Please try again or call emergency services directly.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-6 w-6" />
              <h1 className="text-3xl font-bold">Emergency Request</h1>
            </div>

            <Card className="border-destructive">
              <CardHeader className="bg-destructive/10">
                <CardTitle>Submit Emergency Request</CardTitle>
                <CardDescription>
                  Use this form for medical emergencies only. For immediate life-threatening situations, please call
                  emergency services directly.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientName">Patient Name</Label>
                      <Input
                        id="patientName"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patientAge">Patient Age</Label>
                      <Input
                        id="patientAge"
                        name="patientAge"
                        type="number"
                        value={formData.patientAge}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Patient Gender</Label>
                    <RadioGroup
                      value={formData.patientGender}
                      onValueChange={(value) => handleSelectChange("patientGender", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact Number</Label>
                    <Input
                      id="contactNumber"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="flex gap-2">
                      <Input
                        id="location"
                        name="location"
                        placeholder="Enter your current location"
                        value={formData.location}
                        onChange={handleChange}
                        className="flex-1"
                        required
                      />
                      <Button type="button" variant="outline" size="icon">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyType">Emergency Type</Label>
                    <Select
                      value={formData.emergencyType}
                      onValueChange={(value) => handleSelectChange("emergencyType", value)}
                    >
                      <SelectTrigger id="emergencyType">
                        <SelectValue placeholder="Select emergency type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medical">Medical Emergency</SelectItem>
                        <SelectItem value="accident">Accident/Trauma</SelectItem>
                        <SelectItem value="cardiac">Cardiac Emergency</SelectItem>
                        <SelectItem value="respiratory">Respiratory Distress</SelectItem>
                        <SelectItem value="neurological">Neurological Emergency</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Emergency Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe the emergency situation in detail"
                      value={formData.description}
                      onChange={handleChange}
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" variant="destructive" size="lg" disabled={isLoading}>
                      {isLoading ? "Submitting..." : "Submit Emergency Request"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
