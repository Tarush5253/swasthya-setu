"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HospitalDashboardHeader } from "@/components/hospital-dashboard-header"
import { BedAvailabilityForm } from "@/components/bed-availability-form"
import { PatientRequestsList } from "@/components/patient-requests-list"
import { HospitalAnalytics } from "@/components/hospital-analytics"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/context/AuthContext"

export default function HospitalDashboardPage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute allowedRoles={["hospital"]}>
      <div className="flex min-h-screen flex-col">
        <HospitalDashboardHeader />
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Welcome, {user?.name || "Hospital Admin"}</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                Settings
              </Button>
            </div>
          </div>
          <Tabs defaultValue="beds" className="space-y-4">
            <TabsList>
              <TabsTrigger value="beds">Bed Management</TabsTrigger>
              <TabsTrigger value="requests">Patient Requests</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="beds" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Update Bed Availability</CardTitle>
                  <CardDescription>Keep your bed availability information up to date</CardDescription>
                </CardHeader>
                <CardContent>
                  <BedAvailabilityForm />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="requests" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Requests</CardTitle>
                  <CardDescription>Manage incoming patient requests for beds</CardDescription>
                </CardHeader>
                <CardContent>
                  <PatientRequestsList />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Hospital Analytics</CardTitle>
                  <CardDescription>View statistics and trends for your hospital</CardDescription>
                </CardHeader>
                <CardContent>
                  <HospitalAnalytics />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  )
}
