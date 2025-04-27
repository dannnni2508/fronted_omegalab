"use client"

import React from "react"
import { AdminHeader } from "@/components/admin/admin-header" // Crearemos este componente después

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <main className="p-4 md:p-8">
        {children}
      </main>
    </div>
  )
} 