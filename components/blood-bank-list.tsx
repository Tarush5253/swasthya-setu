import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone } from "lucide-react"
import Link from "next/link"

const bloodGroupMap = {
  A_pos: "A+",
  A_neg: "A-",
  B_pos: "B+",
  B_neg: "B-",
  AB_pos: "AB+",
  AB_neg: "AB-",
  O_pos: "O+",
  O_neg: "O-"
} as const

interface BloodBank {
  _id: string
  name: string
  location: string
  contact?: string
  type?: 'government' | 'private' | 'redcross' | string
  stock?: {
    A_pos?: number
    A_neg?: number
    B_pos?: number
    B_neg?: number
    AB_pos?: number
    AB_neg?: number
    O_pos?: number
    O_neg?: number
    [key: string]: number | undefined
  }
}

interface BloodBankListProps {
  bloodBanks: BloodBank[]
}

export function BloodBankList({ bloodBanks }: BloodBankListProps) {
  if (!bloodBanks || bloodBanks.length === 0) {
    return <div className="text-center text-muted-foreground py-8">No blood banks found</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {bloodBanks.map((bloodBank: BloodBank) => {
        // Safely process stock data
        const stockEntries = bloodBank.stock 
          ? Object.entries(bloodBank.stock)
              .filter(([group, count]) => {
                const validGroup = group as keyof typeof bloodGroupMap
                return typeof count === 'number' && bloodGroupMap[validGroup]
              })
              .map(([group, count]) => [
                bloodGroupMap[group as keyof typeof bloodGroupMap], 
                count as number
              ])
          : []

        return (
          <Card key={bloodBank._id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{bloodBank.name}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {bloodBank.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground mb-2">Blood Availability</p>
              {stockEntries.length > 0 ? (
                <div className="grid grid-cols-4 gap-2">
                  {stockEntries.map(([group, count]) => {
                    const numericCount = Number(count)
                    return (
                      <Badge
                        key={group}
                        variant={numericCount > 0 ? "outline" : "secondary"}
                        className={`text-center ${numericCount > 0 ? "border-primary text-primary" : ""}`}
                      >
                        {group}: {numericCount}
                      </Badge>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No stock information available</p>
              )}
              <p className="text-sm mt-2">
                <span className="text-muted-foreground">Location:</span> {bloodBank.location}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" className="gap-1" asChild>
                <a href={`tel:${bloodBank.contact || ''}`}>
                  <Phone className="h-4 w-4" /> Call
                </a>
              </Button>
              <Link href={`/blood-bank/${bloodBank._id}`}>
                <Button size="sm">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}