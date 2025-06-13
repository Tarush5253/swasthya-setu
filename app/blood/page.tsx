"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { BloodBankList } from "@/components/blood-bank-list"
import { MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function BloodPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [distance, setDistance] = useState([10])
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string | null>(null)

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Find Blood Banks</h1>
            <p className="text-muted-foreground">
              Search for blood banks with available blood stock near you. Filter by blood group, distance, and more.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <Card className="md:col-span-1">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter your location"
                        className="flex-1"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button variant="outline" size="icon">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Distance (km): {distance[0]}</Label>
                    <Slider defaultValue={[10]} max={50} step={1} value={distance} onValueChange={setDistance} />
                  </div>

                  <div className="space-y-2">
                    <Label>Blood Group</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {bloodGroups.map((group) => (
                        <Badge
                          key={group}
                          variant={selectedBloodGroup === group ? "default" : "outline"}
                          className="cursor-pointer text-center"
                          onClick={() => setSelectedBloodGroup(selectedBloodGroup === group ? null : group)}
                        >
                          {group}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Blood Bank Type</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood bank type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="all">All Blood Banks</SelectItem>
                          <SelectItem value="government">Government</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                          <SelectItem value="redcross">Red Cross</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">Apply Filters</Button>
                </div>
              </CardContent>
            </Card>

            <div className="md:col-span-3 space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Showing 3 blood banks near you</p>
                <Select defaultValue="distance">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sort by</SelectLabel>
                      <SelectItem value="distance">Distance</SelectItem>
                      <SelectItem value="availability">Blood Availability</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <BloodBankList />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
