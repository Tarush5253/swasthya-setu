import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone } from "lucide-react"
import Link from "next/link"

interface Hospital {
  _id: string
  name: string
  location: string
  contact: string
  beds: {
    icu: {
      available: number
    }
    general: {
      available: number
    }
    emergency?: {
      available: number
    }
    pediatric?: {
      available: number
    }
  }
  type?: string
}

interface HospitalListProps {
  hospitals: Hospital[]
}

export function HospitalList({ hospitals }: HospitalListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {hospitals.map((hospital) => (
        <Card key={hospital._id} className={hospital.beds.icu.available === 0 ? "border-red-200" : ""}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{hospital.name}</CardTitle>
              <Badge variant={hospital.beds.icu.available > 0 ? "outline" : "destructive"}>
                {hospital.beds.icu.available > 0 ? "ICU Available" : "No ICU"}
              </Badge>
            </div>
            <CardDescription className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {hospital.location}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">ICU Beds</p>
                <p className="font-medium">{hospital.beds.icu.available}</p>
              </div>
              <div>
                <p className="text-muted-foreground">General Beds</p>
                <p className="font-medium">{hospital.beds.general.available}</p>
              </div>
              {hospital.beds.emergency && (
                <div>
                  <p className="text-muted-foreground">Emergency Beds</p>
                  <p className="font-medium">{hospital.beds.emergency.available}</p>
                </div>
              )}
              {hospital.beds.pediatric && (
                <div>
                  <p className="text-muted-foreground">Pediatric Beds</p>
                  <p className="font-medium">{hospital.beds.pediatric.available}</p>
                </div>
              )}
              <div>
                <p className="text-muted-foreground">Contact</p>
                <p className="font-medium">{hospital.contact}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" className="gap-1">
              <Phone className="h-4 w-4" /> Call
            </Button>
            <Link href={`/hospital/${hospital._id}`}>
              <Button size="sm">View Details</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}