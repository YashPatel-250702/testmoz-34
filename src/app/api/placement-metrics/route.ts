import { NextResponse } from "next/server"

export async function GET() {
  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const data = {
    totalTestsCreated: 115,
    studentsAttempted: 484,
    averageScore: 75.0,
    activeUsers: 350,
    pendingReviews: 7,
  }

  return NextResponse.json(data)
}
