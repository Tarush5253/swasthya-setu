"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer } from "@/components/ui/chart"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

export function BloodBankAnalytics() {
  // This would typically come from an API
  const dailyDonations = [
    { date: "Jun 6", "A+": 5, "A-": 2, "B+": 4, "B-": 1, "AB+": 3, "AB-": 1, "O+": 7, "O-": 3 },
    { date: "Jun 7", "A+": 7, "A-": 3, "B+": 5, "B-": 2, "AB+": 2, "AB-": 0, "O+": 8, "O-": 4 },
    { date: "Jun 8", "A+": 6, "A-": 1, "B+": 3, "B-": 1, "AB+": 4, "AB-": 2, "O+": 6, "O-": 2 },
    { date: "Jun 9", "A+": 8, "A-": 2, "B+": 6, "B-": 3, "AB+": 1, "AB-": 1, "O+": 9, "O-": 3 },
    { date: "Jun 10", "A+": 9, "A-": 4, "B+": 5, "B-": 2, "AB+": 3, "AB-": 0, "O+": 10, "O-": 5 },
    { date: "Jun 11", "A+": 7, "A-": 3, "B+": 7, "B-": 1, "AB+": 2, "AB-": 1, "O+": 8, "O-": 4 },
    { date: "Jun 12", "A+": 10, "A-": 2, "B+": 6, "B-": 2, "AB+": 4, "AB-": 2, "O+": 11, "O-": 3 },
  ]

  const currentStock = [
    { name: "A+", value: 15 },
    { name: "A-", value: 8 },
    { name: "B+", value: 12 },
    { name: "B-", value: 5 },
    { name: "AB+", value: 7 },
    { name: "AB-", value: 3 },
    { name: "O+", value: 20 },
    { name: "O-", value: 10 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658", "#8dd1e1"]

  return (
    <Tabs defaultValue="donations">
      <TabsList className="mb-4">
        <TabsTrigger value="donations">Daily Donations</TabsTrigger>
        <TabsTrigger value="stock">Current Stock</TabsTrigger>
      </TabsList>
      <TabsContent value="donations">
        <Card>
          <CardHeader>
            <CardTitle>Daily Blood Donations</CardTitle>
            <CardDescription>Number of units donated per day by blood group</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                "A+": {
                  label: "A+",
                  color: "hsl(var(--chart-1))",
                },
                "O+": {
                  label: "O+",
                  color: "hsl(var(--chart-2))",
                },
                "B+": {
                  label: "B+",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyDonations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="A+" stroke="var(--color-A+)" strokeWidth={2} />
                  <Line type="monotone" dataKey="O+" stroke="var(--color-O+)" strokeWidth={2} />
                  <Line type="monotone" dataKey="B+" stroke="var(--color-B+)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="stock">
        <Card>
          <CardHeader>
            <CardTitle>Current Blood Stock</CardTitle>
            <CardDescription>Available units by blood group</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <ChartContainer className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={currentStock}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {currentStock.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <div className="w-full md:w-1/2">
                <ChartContainer className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={currentStock}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#1976D2" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
