"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Bell, Menu, User, LogOut, Settings, GraduationCap, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigationLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/asignaturas", label: "Asignaturas" },
  { href: "/dashboard/ai-chat", label: "Asistente AI" }
]

export function DashboardHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Prefetch todas las rutas principales en el cliente
  useEffect(() => {
    const prefetchRoutes = () => {
      navigationLinks.forEach(link => {
        router.prefetch(link.href)
      })
      // Prefetch perfil y configuración también
      router.prefetch("/dashboard/perfil")
      router.prefetch("/dashboard/configuracion")
    }
    prefetchRoutes()
  }, [router]) // Ejecutar solo una vez cuando el router esté disponible

  // Datos de ejemplo para las notificaciones - En una aplicación real vendrían de una base de datos
  const notificaciones = [
    {
      id: 1,
      asignatura: "Cálculo Diferencial",
      tipo: "Parcial 1",
      nota: 4.5,
      fecha: "2024-03-10",
      leida: false
    },
    {
      id: 2,
      asignatura: "Programación Orientada a Objetos",
      tipo: "Proyecto Final",
      nota: 4.8,
      fecha: "2024-03-09",
      leida: false
    },
    {
      id: 3,
      asignatura: "Física Mecánica",
      tipo: "Quiz 2",
      nota: 3.9,
      fecha: "2024-03-08",
      leida: true
    }
  ]

  const notificacionesSinLeer = notificaciones.filter(n => !n.leida).length

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo y navegación */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center" prefetch={true}>
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xl mr-2">
                U
              </div>
              <span className="text-xl font-semibold text-gray-900">UniPortal</span>
            </Link>

            {/* Navegación de escritorio */}
            <nav className="hidden md:ml-10 md:flex space-x-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className={`font-medium ${
                    pathname === link.href
                      ? "text-green-600"
                      : "text-gray-500 hover:text-green-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Acciones de usuario */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5 text-gray-500" />
                  {notificacionesSinLeer > 0 && (
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center">
                  <Bell className="h-4 w-4 text-green-600 mr-2" />
                  Actualizaciones de Notas
                  {notificacionesSinLeer > 0 && (
                    <span className="ml-auto text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                      {notificacionesSinLeer} nuevas
                    </span>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notificaciones.map((notificacion) => (
                  <DropdownMenuItem key={notificacion.id} className="flex flex-col items-start py-2 cursor-pointer">
                    <div className="flex items-start justify-between w-full">
                      <div className="flex items-center">
                        <GraduationCap className={`h-4 w-4 mr-2 ${notificacion.leida ? 'text-gray-400' : 'text-green-600'}`} />
                        <div>
                          <p className={`text-sm font-medium ${notificacion.leida ? 'text-gray-600' : 'text-gray-900'}`}>
                            {notificacion.asignatura}
                          </p>
                          <p className="text-xs text-gray-500">
                            {notificacion.tipo} - Nota: {notificacion.nota}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(notificacion.fecha).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {!notificacion.leida && (
                        <span className="h-2 w-2 rounded-full bg-green-600"></span>
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center text-sm text-green-600 cursor-pointer">
                  Ver todas las notificaciones
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/dashboard/perfil" prefetch={true}>
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/dashboard/configuracion" prefetch={true}>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6 text-gray-500" />
            </Button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className={`font-medium ${
                    pathname === link.href
                      ? "text-green-600"
                      : "text-gray-500 hover:text-green-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
