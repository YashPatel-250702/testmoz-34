
import CreateTestPage from "@/components/CreateTestpage"
import { Suspense } from "react"


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateTestPage />
    </Suspense>
  )
}