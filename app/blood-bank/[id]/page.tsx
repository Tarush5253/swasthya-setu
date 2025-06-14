"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, Info } from "lucide-react"
import { BloodRequestForm } from "@/components/blood-request-form"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useAuth } from "@/context/AuthContext"
import { toast } from "@/components/ui/use-toast"
import { useHospital } from '@/context/HospitalContext'
import { useRouter } from "next/navigation"

export interface BloodBank {
  _id: string;
  admin: string;
  name: string;
  location: string;
  contact: string;
  stock: {
    AB_neg: number;
    AB_pos: number;
    A_neg: number;
    A_pos: number;
    B_neg: number;
    B_pos: number;
    O_neg: number;
    O_pos: number;
  };
  __v?: number;
}

export default function BloodBankDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const { bloodBanks, fetchBloodData, loading } = useHospital()
  const [bloodBank, setBloodBank] = useState<BloodBank>();
  const [showRequestForm, setShowRequestForm] = useState(false)


  const router = useRouter();

  useEffect(() => {
    fetchBloodData();
  }, [fetchBloodData])

  useEffect(() => {
    const foundHospital = bloodBanks.find((hospital) => hospital._id === params.id)
    if (foundHospital) setBloodBank(foundHospital);
  }, [bloodBanks, params.id])

  const handleRequestBlood = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to request a blood.",
        variant: "destructive",
      });
      router.push('/login');
      return;
    }

    if (user.role !== 'user') {
      toast({
        title: "Access Denied",
        description: "Only regular users can request blood.",
        variant: "destructive",
      });
      return;
    }

    setShowRequestForm(true);
  }

  if (loading || !bloodBank) {
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


  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{bloodBank!.name}</h1>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{bloodBank!.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Phone className="h-4 w-4" /> Call
              </Button>
              <Dialog open={showRequestForm} onOpenChange={setShowRequestForm}>
                <DialogTrigger asChild>
                  <Button onClick={handleRequestBlood}>Request Bed</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  {user && user.role === 'user' ? (
                    <BloodRequestForm
                      bloodBankId={bloodBank!._id}
                      bloodBankName={bloodBank!.name}
                      onClose={() => setShowRequestForm(false)}
                    />
                  ) : (
                    <div className="p-4 text-center">
                      <p>
                        {!user
                          ? "Please login as a user to request a blood."
                          : "Only regular users can request bloods."}
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
                  <TabsTrigger value="blood-stock">Blood Stock</TabsTrigger>
                  <TabsTrigger value="donation">Donation Info</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <Clock className="h-5 w-5 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">Hours</p>
                        <p className="text-sm text-muted-foreground">8:00 AM - 8:00 PM</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <Info className="h-5 w-5 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">Type</p>
                        <p className="text-sm text-muted-foreground">Red Cross</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <Phone className="h-5 w-5 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">Contact</p>
                        <p className="text-sm text-muted-foreground">{bloodBank!.contact}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>About</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>LifeSource Blood Bank is dedicated to providing safe blood products to hospitals and patients in need. We follow strict quality control measures to ensure the safety of our blood products.</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Facilities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Blood Collection",
                          "Component Separation",
                          "Blood Testing",
                          "Blood Storage",
                          "Blood Distribution",
                          "Donor Counseling",
                        ].map((facility) => (
                          <Badge key={facility} variant="outline">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="blood-stock" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Available Blood Stock</CardTitle>
                      <CardDescription>Current blood units available by blood group</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(bloodBank!.stock).map(([group, count]) => (
                          <Card key={group}>
                            <CardContent className="p-4 flex flex-col items-center justify-center">
                              <p className="text-2xl font-bold text-primary">{group}</p>
                              <p className="text-sm text-muted-foreground">{count} units</p>
                              <Badge
                                variant={count > 5 ? "outline" : count > 0 ? "default" : "destructive"}
                                className="mt-2"
                              >
                                {count > 5 ? "Sufficient" : count > 0 ? "Limited" : "Critical"}
                              </Badge>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="donation" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Blood Donation Requirements</CardTitle>
                      <CardDescription>Eligibility criteria for blood donation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {[
                          "Age between 18-65 years",
                          "Weight above 45 kg",
                          "Hemoglobin level of at least 12.5 g/dL",
                          "No major surgery in the last 6 months",
                          "No tattoo or piercing in the last 6 months",
                          "No major illness or medication",
                        ].map((requirement) => (
                          <li key={requirement}>{requirement}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Donation Process</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">1. Registration</h3>
                        <p className="text-sm text-muted-foreground">
                          Fill out a donor registration form and provide identification.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">2. Health Screening</h3>
                        <p className="text-sm text-muted-foreground">
                          A brief health check including blood pressure, pulse, and hemoglobin level.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">3. Blood Collection</h3>
                        <p className="text-sm text-muted-foreground">
                          The actual donation takes about 8-10 minutes, during which about 450ml of blood is collected.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">4. Refreshments</h3>
                        <p className="text-sm text-muted-foreground">
                          Rest and have some refreshments before leaving the donation center.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
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
                    <span>{bloodBank?.contact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{bloodBank?.location}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Blood Request</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">Need blood urgently? Submit an emergency blood request.</p>
                  <Button className="w-full" variant="destructive">
                    Emergency Blood Request
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Donate Blood</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">Schedule a blood donation appointment.</p>
                  <Button className="w-full" variant="outline">
                    Schedule Donation
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
