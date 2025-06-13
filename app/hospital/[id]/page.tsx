"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Phone, Clock, Star, Info, Calendar } from "lucide-react"
import { BedRequestForm } from "@/components/bed-request-form"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useAuth } from "@/context/AuthContext"
import { toast } from "@/components/ui/use-toast"

export default function HospitalDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const [showRequestForm, setShowRequestForm] = useState(false)

  // This would typically come from an API based on the ID
  const hospital = {
    id: params.id,
    name: "City General Hospital",
    address: "123 Main St, City Center",
    phone: "+91 98765 43210",
    distance: "2.5 km",
    rating: 4.5,
    openingHours: "24 hours",
    type: "Government",
    description:
      "City General Hospital is a multi-specialty hospital providing comprehensive healthcare services. The hospital is equipped with modern facilities and experienced medical professionals.",
    beds: {
      icu: {
        total: 20,
        available: 5,
        occupied: 15,
      },
      normal: {
        total: 100,
        available: 12,
        occupied: 88,
      },
      emergency: {
        total: 10,
        available: 3,
        occupied: 7,
      },
      pediatric: {
        total: 15,
        available: 8,
        occupied: 7,
      },
    },
    facilities: [
      "ICU",
      "Emergency Services",
      "Pediatric Care",
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "Radiology",
      "Laboratory",
      "Pharmacy",
    ],
    doctors: [
      {
        name: "Dr. Rajesh Kumar",
        specialty: "Cardiology",
        available: true,
      },
      {
        name: "Dr. Priya Sharma",
        specialty: "Neurology",
        available: true,
      },
      {
        name: "Dr. Amit Patel",
        specialty: "Orthopedics",
        available: false,
      },
      {
        name: "Dr. Neha Singh",
        specialty: "Pediatrics",
        available: true,
      },
    ],
  }

  const handleRequestBed = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to request a bed.",
        variant: "destructive",
      })
      return
    }
    setShowRequestForm(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{hospital.name}</h1>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{hospital.address}</span>
                <span className="text-sm">({hospital.distance})</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Phone className="h-4 w-4" /> Call
              </Button>
              <Dialog open={showRequestForm} onOpenChange={setShowRequestForm}>
                <DialogTrigger asChild>
                  <Button onClick={handleRequestBed}>Request Bed</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <BedRequestForm
                    hospitalId={hospital.id}
                    hospitalName={hospital.name}
                    onClose={() => setShowRequestForm(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="beds">Bed Availability</TabsTrigger>
                  <TabsTrigger value="doctors">Doctors</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <Clock className="h-5 w-5 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">Hours</p>
                        <p className="text-sm text-muted-foreground">{hospital.openingHours}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <Star className="h-5 w-5 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">Rating</p>
                        <p className="text-sm text-muted-foreground">{hospital.rating}/5</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <Info className="h-5 w-5 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">Type</p>
                        <p className="text-sm text-muted-foreground">{hospital.type}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <Calendar className="h-5 w-5 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">Appointments</p>
                        <p className="text-sm text-muted-foreground">Available</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>About</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{hospital.description}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Facilities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {hospital.facilities.map((facility) => (
                          <Badge key={facility} variant="outline">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="beds" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>ICU Beds</CardTitle>
                      <CardDescription>
                        {hospital.beds.icu.available} out of {hospital.beds.icu.total} beds available
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Progress value={(hospital.beds.icu.occupied / hospital.beds.icu.total) * 100} className="h-2" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Normal Beds</CardTitle>
                      <CardDescription>
                        {hospital.beds.normal.available} out of {hospital.beds.normal.total} beds available
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Progress
                        value={(hospital.beds.normal.occupied / hospital.beds.normal.total) * 100}
                        className="h-2"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Emergency Beds</CardTitle>
                      <CardDescription>
                        {hospital.beds.emergency.available} out of {hospital.beds.emergency.total} beds available
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Progress
                        value={(hospital.beds.emergency.occupied / hospital.beds.emergency.total) * 100}
                        className="h-2"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Pediatric Beds</CardTitle>
                      <CardDescription>
                        {hospital.beds.pediatric.available} out of {hospital.beds.pediatric.total} beds available
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Progress
                        value={(hospital.beds.pediatric.occupied / hospital.beds.pediatric.total) * 100}
                        className="h-2"
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="doctors" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {hospital.doctors.map((doctor) => (
                      <Card key={doctor.name}>
                        <CardContent className="p-4 flex justify-between items-center">
                          <div>
                            <p className="font-medium">{doctor.name}</p>
                            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                          </div>
                          <Badge variant={doctor.available ? "outline" : "secondary"}>
                            {doctor.available ? "Available" : "Unavailable"}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{hospital.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{hospital.address}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">Need immediate medical attention? Contact our emergency services.</p>
                  <Button className="w-full" variant="destructive">
                    Emergency Request
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Book an Appointment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">Schedule a consultation with our specialists.</p>
                  <Button className="w-full" variant="outline">
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
