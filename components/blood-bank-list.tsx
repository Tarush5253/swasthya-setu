import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone } from "lucide-react"
import Link from "next/link"

export function BloodBankList() {
  // This would typically come from an API
  const bloodBanks = [
    {
      id: 1,
      name: "LifeSource Blood Bank",
      address: "123 Health St, Medical District",
      phone: "+91 98765 43210",
      distance: "3.2 km",
      bloodGroups: {
        "A+": 15,
        "A-": 8,
        "B+": 12,
        "B-": 5,
        "AB+": 7,
        "AB-": 3,
        "O+": 20,
        "O-": 10,
      },
    },
    {
      id: 2,
      name: "Red Cross Blood Center",
      address: "456 Care Avenue, Central City",
      phone: "+91 98765 12345",
      distance: "5.1 km",
      bloodGroups: {
        "A+": 8,
        "A-": 4,
        "B+": 10,
        "B-": 2,
        "AB+": 5,
        "AB-": 1,
        "O+": 15,
        "O-": 6,
      },
    },
    {
      id: 3,
      name: "City Blood Services",
      address: "789 Donor Road, East District",
      phone: "+91 98765 67890",
      distance: "7.5 km",
      bloodGroups: {
        "A+": 12,
        "A-": 6,
        "B+": 9,
        "B-": 3,
        "AB+": 4,
        "AB-": 2,
        "O+": 18,
        "O-": 8,
      },
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {bloodBanks.map((bloodBank) => (
        <Card key={bloodBank.id}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{bloodBank.name}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {bloodBank.address}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground mb-2">Blood Availability</p>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(bloodBank.bloodGroups).map(([group, count]) => (
                <Badge
                  key={group}
                  variant={count > 0 ? "outline" : "secondary"}
                  className={`text-center ${count > 0 ? "border-primary text-primary" : ""}`}
                >
                  {group}: {count}
                </Badge>
              ))}
            </div>
            <p className="text-sm mt-2">
              <span className="text-muted-foreground">Distance:</span> {bloodBank.distance}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" className="gap-1">
              <Phone className="h-4 w-4" /> Call
            </Button>
            <Link href={`/blood-bank/${bloodBank.id}`}>
              <Button size="sm">View Details</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
