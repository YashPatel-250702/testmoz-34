"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ListChecks, Users, BarChart } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface PlacementMetrics {
  totalTestsCreated: number | null
  studentsAttempted: number | null
  averageScore: number | null
  activeUsers: number | null
  pendingReviews: number | null
}

export function PlacementMetricsCards() {
  const [metrics, setMetrics] = useState<PlacementMetrics>({
    totalTestsCreated: null,
    studentsAttempted: null,
    averageScore: null,
    activeUsers: null,
    pendingReviews: null,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const response = await fetch("/api/placement-metrics")
        if (!response.ok) {
          throw new Error("Failed to fetch placement metrics")
        }
        const data = await response.json()
        setMetrics(data)
      } catch (error) {
        console.error("Error fetching placement metrics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tests Created</CardTitle>
          <ListChecks className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-7 w-24" />
          ) : (
            <div className="text-2xl font-bold">{metrics.totalTestsCreated}</div>
          )}
          <p className="text-xs text-muted-foreground">+10.2% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Students Attempted</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-7 w-24" />
          ) : (
            <div className="text-2xl font-bold">+{metrics.studentsAttempted}</div>
          )}
          <p className="text-xs text-muted-foreground">+150.5% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-7 w-24" />
          ) : (
            <div className="text-2xl font-bold">{metrics.averageScore}%</div>
          )}
          <p className="text-xs text-muted-foreground">+4.8% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-7 w-24" />
          ) : (
            <div className="text-2xl font-bold">{metrics.activeUsers}</div>
          )}
          <p className="text-xs text-muted-foreground">Currently online</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
          <ListChecks className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-7 w-24" />
          ) : (
            <div className="text-2xl font-bold">{metrics.pendingReviews}</div>
          )}
          <p className="text-xs text-muted-foreground">Tests awaiting review</p>
        </CardContent>
      </Card>
    </>
  )
}
