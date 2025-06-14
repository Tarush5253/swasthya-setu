import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone } from "lucide-react"
import Link from "next/link"
import {useHospital} from '@/context/HospitalContext'


export function BloodBankList() {

const {bloodBanks } = useHospital();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {bloodBanks.map((bloodBank) => (
        <Card key={bloodBank._id}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{bloodBank.name}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {bloodBank.location}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground mb-2">Blood Availability</p>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(bloodBank.stock).map(([group, count]) => (
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
              <span className="text-muted-foreground">Location:</span> {bloodBank.location}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" className="gap-1">
              <Phone className="h-4 w-4" /> Call
            </Button>
            <Link href={`/blood-bank/${bloodBank._id}`}>
              <Button size="sm">View Details</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
