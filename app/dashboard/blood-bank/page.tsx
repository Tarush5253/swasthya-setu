"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BloodBankDashboardHeader } from "@/components/blood-bank-dashboard-header"
import { BloodStockForm } from "@/components/blood-stock-form"
import { BloodRequestsList } from "@/components/blood-requests-list"
import { BloodBankAnalytics } from "@/components/blood-bank-analytics"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/context/AuthContext"

export default function BloodBankDashboardPage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute allowedRoles={["bloodbank_admin"]}>
      <div className="flex min-h-screen flex-col">
        <BloodBankDashboardHeader />
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Welcome, {user?.name || "Blood Bank Admin"}</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                Settings
              </Button>
            </div>
          </div>
          <Tabs defaultValue="stock" className="space-y-4">
            <TabsList>
              <TabsTrigger value="stock">Blood Stock</TabsTrigger>
              <TabsTrigger value="requests">Blood Requests</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="stock" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Update Blood Stock</CardTitle>
                  <CardDescription>Keep your blood stock information up to date</CardDescription>
                </CardHeader>
                <CardContent>
                  <BloodStockForm />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="requests" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Blood Requests</CardTitle>
                  <CardDescription>Manage incoming blood requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <BloodRequestsList />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Blood Bank Analytics</CardTitle>
                  <CardDescription>View statistics and trends for your blood bank</CardDescription>
                </CardHeader>
                <CardContent>
                  <BloodBankAnalytics />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  )
}
