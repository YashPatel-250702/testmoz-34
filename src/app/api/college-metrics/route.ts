import { NextResponse } from "next/server"

export async function GET() {
  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const data = {
    totalTestsCreated: 120,
    studentsAttempted: 750,
    averageScore: 82.5,
    activeUsers: 150,
    pendingReviews: 8,
  }

  return NextResponse.json(data)
}
