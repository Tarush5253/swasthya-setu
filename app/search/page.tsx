"use client"

import { useState, useMemo } from "react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { HospitalList } from "@/components/hospital-list"
import { MapPin } from "lucide-react"
import { useHospital } from "@/context/HospitalContext"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [distance, setDistance] = useState([10])
  const [hospitalType, setHospitalType] = useState("all")
  const [filters, setFilters] = useState({
    icuAvailable: false,
    normalBedsAvailable: false,
    emergencyAvailable: false,
    pediatricAvailable: false,
  })

  const { hospitals } = useHospital()

  const filteredHospitals = useMemo(() => {
    return hospitals.filter((hospital) => {
      // Filter by search query (name or location)
      const matchesSearch =
        searchQuery === "" ||
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.location.toLowerCase().includes(searchQuery.toLowerCase())

      // Filter by bed availability
      const matchesBeds =
        (!filters.icuAvailable || hospital.beds.icu.available > 0) &&
        (!filters.normalBedsAvailable || hospital.beds.general.available > 0) &&
        (!filters.emergencyAvailable || hospital.beds.emergency.available > 0) &&
        (!filters.pediatricAvailable || hospital.beds.pediatric.available > 0)

      // Filter by hospital type
      const matchesType =
        hospitalType === "all" ||
        (hospitalType === "government" ) ||
        (hospitalType === "private" ) ||
        (hospitalType === "charity")

      return matchesSearch && matchesBeds && matchesType
    })
  }, [hospitals, searchQuery, filters, hospitalType])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Find Hospitals</h1>
            <p className="text-muted-foreground">
              Search for hospitals with available beds near you. Filter by distance, bed type, and more.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <Card className="md:col-span-1">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Search By Name & Location</Label>
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
                    <Label>Hospital Type</Label>
                    <Select value={hospitalType} onValueChange={setHospitalType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select hospital type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="all">All Hospitals</SelectItem>
                          <SelectItem value="government">Government</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                          <SelectItem value="charity">Charity/Trust</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Bed Availability</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="icu"
                          checked={filters.icuAvailable}
                          onCheckedChange={(checked) => setFilters({ ...filters, icuAvailable: checked as boolean })}
                        />
                        <label
                          htmlFor="icu"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          ICU Beds Available
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="normal"
                          checked={filters.normalBedsAvailable}
                          onCheckedChange={(checked) =>
                            setFilters({ ...filters, normalBedsAvailable: checked as boolean })
                          }
                        />
                        <label
                          htmlFor="normal"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Normal Beds Available
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="emergency"
                          checked={filters.emergencyAvailable}
                          onCheckedChange={(checked) =>
                            setFilters({ ...filters, emergencyAvailable: checked as boolean })
                          }
                        />
                        <label
                          htmlFor="emergency"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Emergency Beds Available
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="pediatric"
                          checked={filters.pediatricAvailable}
                          onCheckedChange={(checked) =>
                            setFilters({ ...filters, pediatricAvailable: checked as boolean })
                          }
                        />
                        <label
                          htmlFor="pediatric"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Pediatric Beds Available
                        </label>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">Apply Filters</Button>
                </div>
              </CardContent>
            </Card>

            <div className="md:col-span-3 space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Showing {filteredHospitals.length} hospitals near you</p>
                <Select defaultValue="distance">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sort by</SelectLabel>
                      <SelectItem value="distance">Distance</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="beds">Available Beds</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <HospitalList hospitals={filteredHospitals} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}