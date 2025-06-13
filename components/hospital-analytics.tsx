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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

export function HospitalAnalytics() {
  // This would typically come from an API
  const dailyAdmissions = [
    { date: "Jun 6", icu: 4, general: 12, emergency: 8, pediatric: 3 },
    { date: "Jun 7", icu: 3, general: 15, emergency: 10, pediatric: 5 },
    { date: "Jun 8", icu: 5, general: 10, emergency: 7, pediatric: 4 },
    { date: "Jun 9", icu: 6, general: 8, emergency: 12, pediatric: 2 },
    { date: "Jun 10", icu: 4, general: 14, emergency: 9, pediatric: 6 },
    { date: "Jun 11", icu: 7, general: 11, emergency: 5, pediatric: 3 },
    { date: "Jun 12", icu: 5, general: 13, emergency: 11, pediatric: 4 },
  ]

  const occupancyRate = [
    { date: "Jun 6", icu: 75, general: 60, emergency: 40, pediatric: 30 },
    { date: "Jun 7", icu: 80, general: 65, emergency: 50, pediatric: 35 },
    { date: "Jun 8", icu: 85, general: 55, emergency: 45, pediatric: 40 },
    { date: "Jun 9", icu: 90, general: 50, emergency: 60, pediatric: 25 },
    { date: "Jun 10", icu: 80, general: 70, emergency: 55, pediatric: 45 },
    { date: "Jun 11", icu: 95, general: 60, emergency: 35, pediatric: 30 },
    { date: "Jun 12", icu: 85, general: 65, emergency: 65, pediatric: 35 },
  ]

  const averageStay = [
    { type: "ICU", days: 5.2 },
    { type: "General", days: 3.8 },
    { type: "Emergency", days: 1.2 },
    { type: "Pediatric", days: 2.9 },
  ]

  return (
    <Tabs defaultValue="admissions">
      <TabsList className="mb-4">
        <TabsTrigger value="admissions">Daily Admissions</TabsTrigger>
        <TabsTrigger value="occupancy">Occupancy Rate</TabsTrigger>
        <TabsTrigger value="stay">Average Stay</TabsTrigger>
      </TabsList>
      <TabsContent value="admissions">
        <Card>
          <CardHeader>
            <CardTitle>Daily Admissions</CardTitle>
            <CardDescription>Number of patients admitted per day by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                icu: {
                  label: "ICU",
                  color: "hsl(var(--chart-1))",
                },
                general: {
                  label: "General",
                  color: "hsl(var(--chart-2))",
                },
                emergency: {
                  label: "Emergency",
                  color: "hsl(var(--chart-3))",
                },
                pediatric: {
                  label: "Pediatric",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyAdmissions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="icu" stroke="var(--color-icu)" strokeWidth={2} />
                  <Line type="monotone" dataKey="general" stroke="var(--color-general)" strokeWidth={2} />
                  <Line type="monotone" dataKey="emergency" stroke="var(--color-emergency)" strokeWidth={2} />
                  <Line type="monotone" dataKey="pediatric" stroke="var(--color-pediatric)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="occupancy">
        <Card>
          <CardHeader>
            <CardTitle>Occupancy Rate</CardTitle>
            <CardDescription>Percentage of beds occupied per day by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                icu: {
                  label: "ICU",
                  color: "hsl(var(--chart-1))",
                },
                general: {
                  label: "General",
                  color: "hsl(var(--chart-2))",
                },
                emergency: {
                  label: "Emergency",
                  color: "hsl(var(--chart-3))",
                },
                pediatric: {
                  label: "Pediatric",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={occupancyRate}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="icu" stroke="var(--color-icu)" strokeWidth={2} />
                  <Line type="monotone" dataKey="general" stroke="var(--color-general)" strokeWidth={2} />
                  <Line type="monotone" dataKey="emergency" stroke="var(--color-emergency)" strokeWidth={2} />
                  <Line type="monotone" dataKey="pediatric" stroke="var(--color-pediatric)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="stay">
        <Card>
          <CardHeader>
            <CardTitle>Average Length of Stay</CardTitle>
            <CardDescription>Average number of days patients stay by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                days: {
                  label: "Days",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={averageStay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="days" fill="var(--color-days)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
