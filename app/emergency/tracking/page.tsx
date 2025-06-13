"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Phone, MapPin, Clock, AlertCircle, CheckCircle, Ambulance } from "lucide-react"

export default function EmergencyTrackingPage() {
  const [progress, setProgress] = useState(25)
  const [status, setStatus] = useState("Processing")
  const [eta, setEta] = useState("Calculating...")

  // Simulate progress updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 50) {
        setProgress(50)
        setStatus("Dispatched")
        setEta("8 minutes")
      } else if (progress < 75) {
        const timer2 = setTimeout(() => {
          setProgress(75)
          setStatus("En Route")
          setEta("3 minutes")
        }, 5000)
        return () => clearTimeout(timer2)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [progress])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Ambulance className="h-6 w-6 text-destructive" />
              <h1 className="text-3xl font-bold">Emergency Request Tracking</h1>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  Emergency Request Status
                </CardTitle>
                <CardDescription>Request ID: EMR-2024-001</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Status</p>
                    <p className="text-lg font-semibold">{status}</p>
                  </div>
                  <Badge
                    variant={status === "Processing" ? "outline" : status === "Dispatched" ? "default" : "destructive"}
                  >
                    {status}
                  </Badge>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <p className="text-sm text-muted-foreground">{progress}%</p>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">ETA</p>
                      <p className="font-medium">{eta}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">123 Main St, City Center</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Request Received</p>
                      <p className="text-sm text-muted-foreground">Emergency request submitted and verified</p>
                      <p className="text-xs text-muted-foreground">2:30 PM</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Ambulance Assigned</p>
                      <p className="text-sm text-muted-foreground">Ambulance AMB-001 assigned to your request</p>
                      <p className="text-xs text-muted-foreground">2:32 PM</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full border-2 border-primary bg-primary/20 mt-0.5" />
                    <div>
                      <p className="font-medium">En Route</p>
                      <p className="text-sm text-muted-foreground">Ambulance is on the way to your location</p>
                      <p className="text-xs text-muted-foreground">2:35 PM</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full border-2 border-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium text-muted-foreground">Arrival</p>
                      <p className="text-sm text-muted-foreground">Ambulance will arrive at your location</p>
                      <p className="text-xs text-muted-foreground">ETA: 3 minutes</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Ambulance Driver</p>
                    <p className="text-sm text-muted-foreground">Rajesh Kumar</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Phone className="h-4 w-4" /> Call
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Emergency Services</p>
                    <p className="text-sm text-muted-foreground">24/7 Emergency Hotline</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Phone className="h-4 w-4" /> 108
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Hospital</p>
                    <p className="text-sm text-muted-foreground">City General Hospital</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Phone className="h-4 w-4" /> Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
