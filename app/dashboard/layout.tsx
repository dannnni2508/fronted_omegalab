"use client"

import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import Loading from "./loading"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </div>
  )
} 