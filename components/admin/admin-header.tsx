"use client"

import Link from "next/link"
import { ShieldCheck, Users, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AdminHeader() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/admin/dashboard" className="flex items-center space-x-2">
            <ShieldCheck className="h-7 w-7" />
            <span className="text-xl font-bold">Admin Portal</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link href="/admin/estudiantes" className="flex items-center space-x-1 hover:text-blue-200 transition-colors">
              <Users className="h-5 w-5" />
              <span>Estudiantes</span>
            </Link>
            {/* Aquí se pueden añadir más enlaces de admin si es necesario */}
            <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700">
              <LogOut className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
} 