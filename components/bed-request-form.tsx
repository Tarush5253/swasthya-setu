"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useAuth } from "@/context/AuthContext"
import { toast } from "@/components/ui/use-toast"

interface BedRequestFormProps {
  hospitalId: string
  hospitalName: string
  onClose: () => void
}

export function BedRequestForm({ hospitalId, hospitalName, onClose }: BedRequestFormProps) {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    patientName: user?.name || "",
    patientAge: "",
    patientGender: "male",
    contactNumber: "",
    bedType: "normal",
    priority: "medium",
    medicalCondition: "",
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
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Bed request submitted",
        description: `Your bed request at ${hospitalName} has been submitted successfully.`,
      })
      onClose()
    } catch (error) {
      toast({
        title: "Request failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Request Bed at {hospitalName}</DialogTitle>
        <DialogDescription>Fill out the form below to request a bed.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="patientName">Patient Name</Label>
            <Input id="patientName" name="patientName" value={formData.patientName} onChange={handleChange} required />
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
          <Label htmlFor="bedType">Bed Type</Label>
          <Select value={formData.bedType} onValueChange={(value) => handleSelectChange("bedType", value)}>
            <SelectTrigger id="bedType">
              <SelectValue placeholder="Select bed type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="icu">ICU Bed</SelectItem>
              <SelectItem value="normal">Normal Bed</SelectItem>
              <SelectItem value="emergency">Emergency Bed</SelectItem>
              <SelectItem value="pediatric">Pediatric Bed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select value={formData.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
            <SelectTrigger id="priority">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="critical">Critical (Life-threatening)</SelectItem>
              <SelectItem value="high">High (Urgent medical attention)</SelectItem>
              <SelectItem value="medium">Medium (Non-life-threatening)</SelectItem>
              <SelectItem value="low">Low (Scheduled admission)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="medicalCondition">Medical Condition</Label>
          <Textarea
            id="medicalCondition"
            name="medicalCondition"
            placeholder="Briefly describe the patient's medical condition"
            value={formData.medicalCondition}
            onChange={handleChange}
            className="min-h-[100px]"
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Request"}
        </Button>
      </div>
    </form>
  )
}
