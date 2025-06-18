"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserDashboardHeader } from "@/components/user-dashboard-header"
import { HospitalList } from "@/components/hospital-list"
import { BloodBankList } from "@/components/blood-bank-list"
import { RequestHistory } from "@/components/request-history"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/context/AuthContext"
import { useHospital } from "@/context/HospitalContext"

export default function UserDashboardPage() {
  const { user } = useAuth()
  const { hospitals , bloodBanks} = useHospital()

  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <div className="flex min-h-screen flex-col">
        <UserDashboardHeader />
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Welcome, {user?.name || "User"}</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Notifications
              </Button>
              <Button variant="destructive" size="sm">
                Emergency Request
              </Button>
            </div>
          </div>
          <Tabs defaultValue="hospitals" className="space-y-4">
            <TabsList>
              <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
              <TabsTrigger value="blood-banks">Blood Banks</TabsTrigger>
              <TabsTrigger value="requests">My Requests</TabsTrigger>
            </TabsList>
            <TabsContent value="hospitals" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Find Hospitals</CardTitle>
                  <CardDescription>Search for hospitals with available ICU beds near you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <Input placeholder="Search by hospital name or location" className="flex-1" />
                    <Button>Search</Button>
                  </div>
                  <HospitalList hospitals={hospitals} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="blood-banks" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Find Blood Banks</CardTitle>
                  <CardDescription>Search for blood banks with available blood stock near you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <Input placeholder="Search by blood bank name or location" className="flex-1" />
                    <Button>Search</Button>
                  </div>
                  <BloodBankList bloodBanks={bloodBanks} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="requests" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>My Requests</CardTitle>
                  <CardDescription>View and track your previous requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <RequestHistory />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  )
}
