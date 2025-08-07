import ManageTestsPage from "@/components/ManageTest"
import { Suspense } from "react"


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ManageTestsPage />
    </Suspense>
  )
}