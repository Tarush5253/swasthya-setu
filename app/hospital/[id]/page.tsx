"use client"

import { useEffect, useState } from "react"
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
// import { toast } from "@/components/ui/use-toast"
import { useHospital } from '@/context/HospitalContext'
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface BedData {
  icu: {
    total: number
    available: number
    occupied: number
  }
  general: {
    total: number
    available: number
    occupied: number
  }
  emergency: {
    total: number
    available: number
    occupied: number
  }
  pediatric: {
    total: number
    available: number
    occupied: number
  }
}

export interface Hospital {
  _id: string;
  name: string;
  location: string;
  contact: string;
  beds: BedData;
  facilities: string[];
  admin: string;
  __v?: number;
}

export default function HospitalDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const { hospitals, fetchBedData, loading } = useHospital();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [showRequestForm, setShowRequestForm] = useState(false);

  const { toast } = useToast()
  const router = useRouter();

  useEffect(() => {
    fetchBedData();
  }, [fetchBedData])

  useEffect(() => {
    const foundHospital = hospitals.find((hospital) => hospital._id === params.id)
    if (foundHospital) setHospital(foundHospital);
  }, [hospitals, params.id])

  const doctors = [
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
  ]



  const handleRequestBed = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to request a bed.",
        variant: "destructive",
      });
      router.push('/login');
      return;
    }

    if (user.role !== 'user') {
      toast({
        title: "Access Denied",
        description: "Only regular users can request beds.",
        variant: "destructive",
      });
      return;
    }

    setShowRequestForm(true);
  };


  if (loading || !hospital) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 justify-center items-center">
          <div>Loading...</div>
        </div>
        <Footer />
      </div>
    )
  }

  const calculateOccupancyPercentage = (available: number, occupied: number) => {
    const total = available + occupied;
    return total > 0 ? (occupied / total) * 100 : 0;
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
                <span>{hospital.location}</span>
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
                  {user && user.role === 'user' ? (
                    <BedRequestForm
                      hospitalId={hospital._id}
                      hospitalName={hospital.name}
                      onClose={() => setShowRequestForm(false)}
                    />
                  ) : (
                    <div className="p-4 text-center">
                      <p>
                        {!user
                          ? "Please login as a user to request a bed."
                          : "Only regular users can request beds."}
                      </p>
                      {!user && (
                        <Button
                          onClick={() => router.push('/login')}
                          className="mt-4"
                        >
                          Go to Login
                        </Button>
                      )}
                    </div>
                  )}
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
                        <p className="text-sm text-muted-foreground">24 Hours</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <Star className="h-5 w-5 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">Rating</p>
                        <p className="text-sm text-muted-foreground">4.5/5</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <Info className="h-5 w-5 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">Type</p>
                        <p className="text-sm text-muted-foreground">Government</p>
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
                      <p>"City General Hospital is a multi-specialty hospital providing comprehensive healthcare services. The hospital is equipped with modern facilities and experienced medical professionals."</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Facilities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "ICU",
                          "Emergency Services",
                          "Pediatric Care",
                          "Cardiology",
                          "Neurology",
                          "Orthopedics",
                          "Radiology",
                          "Laboratory",
                          "Pharmacy",
                        ].map((facility) => (
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
                        {hospital.beds.icu.available} out of {hospital.beds.icu.available + hospital.beds.icu.occupied} beds available
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Progress
                        value={calculateOccupancyPercentage(hospital.beds.icu.available, hospital.beds.icu.occupied)}
                        className="h-2"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>General Beds</CardTitle>
                      <CardDescription>
                        {hospital.beds.general.available} out of {hospital.beds.general.available + hospital.beds.general.occupied} beds available
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Progress
                        value={calculateOccupancyPercentage(hospital.beds.general.available, hospital.beds.general.occupied)}
                        className="h-2"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Emergency Beds</CardTitle>
                      <CardDescription>
                        {hospital.beds.emergency.available} out of {hospital.beds.emergency.available + hospital.beds.emergency.occupied} beds available
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Progress
                        value={calculateOccupancyPercentage(hospital.beds.emergency.available, hospital.beds.emergency.occupied)}
                        className="h-2"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Pediatric Beds</CardTitle>
                      <CardDescription>
                        {hospital.beds.pediatric.available} out of {hospital.beds.pediatric.available + hospital.beds.pediatric.occupied} beds available
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Progress
                        value={calculateOccupancyPercentage(hospital.beds.pediatric.available, hospital.beds.pediatric.occupied)}
                        className="h-2"
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="doctors" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {doctors.map((doctor) => (
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
                    <span>{hospital.contact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{hospital.location}</span>
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