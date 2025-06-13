import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone } from "lucide-react"
import Link from "next/link"

export function HospitalList() {
  // This would typically come from an API
  const hospitals = [
    {
      id: 1,
      name: "City General Hospital",
      address: "123 Main St, City Center",
      phone: "+91 98765 43210",
      distance: "2.5 km",
      icuAvailable: 5,
      normalBedsAvailable: 12,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Metro Medical Center",
      address: "456 Park Avenue, Downtown",
      phone: "+91 98765 12345",
      distance: "4.2 km",
      icuAvailable: 2,
      normalBedsAvailable: 8,
      rating: 4.2,
    },
    {
      id: 3,
      name: "Sunshine Hospital",
      address: "789 Garden Road, Suburb Area",
      phone: "+91 98765 67890",
      distance: "6.8 km",
      icuAvailable: 0,
      normalBedsAvailable: 5,
      rating: 4.7,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {hospitals.map((hospital) => (
        <Card key={hospital.id} className={hospital.icuAvailable === 0 ? "border-red-200" : ""}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{hospital.name}</CardTitle>
              <Badge variant={hospital.icuAvailable > 0 ? "outline" : "destructive"}>
                {hospital.icuAvailable > 0 ? "ICU Available" : "No ICU"}
              </Badge>
            </div>
            <CardDescription className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {hospital.address}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">ICU Beds</p>
                <p className="font-medium">{hospital.icuAvailable}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Normal Beds</p>
                <p className="font-medium">{hospital.normalBedsAvailable}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Distance</p>
                <p className="font-medium">{hospital.distance}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Rating</p>
                <p className="font-medium">{hospital.rating}/5</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" className="gap-1">
              <Phone className="h-4 w-4" /> Call
            </Button>
            <Link href={`/hospital/${hospital.id}`}>
              <Button size="sm">View Details</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
