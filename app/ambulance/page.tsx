import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from "@/components/navbar"
import { AmbulanceIllustration } from "@/components/ambulance-illustration"

export default function AmbulancePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col md:flex-row p-4 md:p-8 gap-8">
        <div className="flex-1 flex flex-col justify-center">
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Emergency Ambulance Request</h1>
            <p className="mt-4 text-lg text-gray-500">
              Request an ambulance for emergency medical transportation. Our network of ambulance services ensures quick
              response times in critical situations.
            </p>
            <div className="mt-8 hidden md:block">
              <AmbulanceIllustration className="max-w-md" />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Request an Ambulance</CardTitle>
              <CardDescription>Fill out the form below to request an ambulance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+91 98765 43210" required type="tel" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Pickup Location</Label>
                <Input id="location" placeholder="123 Main St, City" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination (if known)</Label>
                <Input id="destination" placeholder="City General Hospital" />
              </div>
              <div className="space-y-2">
                <Label>Emergency Priority</Label>
                <RadioGroup defaultValue="medium">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="critical" id="critical" />
                    <Label htmlFor="critical" className="text-red-500 font-medium">
                      Critical (Life-threatening)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high" className="text-orange-500 font-medium">
                      High (Urgent medical attention)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Medium (Non-life-threatening)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low">Low (Scheduled transport)</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Any medical conditions, special requirements, etc." />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-primary">Request Ambulance</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
