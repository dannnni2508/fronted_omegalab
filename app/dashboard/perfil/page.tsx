"use client"

// Eliminar importación
// import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Calendar, GraduationCap, Bus, History } from "lucide-react"

export default function PerfilPage() {
  // Datos de ejemplo del estudiante - En una aplicación real, estos datos vendrían de una base de datos
  const studentData = {
    nombre: "Carlos Rodríguez",
    edad: 22,
    fechaNacimiento: "15/03/2002",
    añoInscripcion: 2020,
    carrera: "Ingeniería en Sistemas",
    semestre: 7,
    medioTransporte: "Bus público",
    historialAcademico: [
      {
        fecha: "2020-1",
        evento: "Inicio de carrera",
        detalles: "Ingeniería en Sistemas"
      },
      {
        fecha: "2021-2",
        evento: "Cambio de énfasis",
        detalles: "De desarrollo web a inteligencia artificial"
      }
    ],
    contacto: {
      email: "carlos.rodriguez@universidad.edu",
      telefono: "+57 300 123 4567",
      direccion: "Calle 123 #45-67, Ciudad"
    }
  }

  return (
    // Eliminar div y DashboardHeader
    // <div className="min-h-screen bg-gray-50">
    //   <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mr-4">
              <User className="h-10 w-10 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{studentData.nombre}</h1>
              <p className="text-gray-600">{studentData.carrera} - {studentData.semestre}° semestre</p>
            </div>
          </div>

          <Tabs defaultValue="informacion" className="space-y-4">
            <TabsList>
              <TabsTrigger value="informacion">Información Personal</TabsTrigger>
              <TabsTrigger value="academico">Historial Académico</TabsTrigger>
              <TabsTrigger value="contacto">Información de Contacto</TabsTrigger>
            </TabsList>

            <TabsContent value="informacion">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 text-green-600 mr-2" />
                    Información Personal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Edad</p>
                      <p className="font-medium">{studentData.edad} años</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Fecha de Nacimiento</p>
                      <p className="font-medium">{studentData.fechaNacimiento}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Año de Inscripción</p>
                      <p className="font-medium">{studentData.añoInscripcion}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Medio de Transporte</p>
                      <div className="flex items-center">
                        <Bus className="h-4 w-4 text-green-600 mr-2" />
                        <p className="font-medium">{studentData.medioTransporte}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="academico">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="h-5 w-5 text-green-600 mr-2" />
                    Historial Académico
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {studentData.historialAcademico.map((evento, index) => (
                      <div key={index} className="flex">
                        <div className="mr-4 relative">
                          <div className="h-3 w-3 rounded-full bg-green-600"></div>
                          {index !== studentData.historialAcademico.length - 1 && (
                            <div className="absolute top-3 bottom-0 left-1.5 w-0.5 bg-green-200"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <p className="text-sm text-gray-500">{evento.fecha}</p>
                          <p className="font-medium">{evento.evento}</p>
                          <p className="text-gray-600">{evento.detalles}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contacto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 text-green-600 mr-2" />
                    Información de Contacto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{studentData.contacto.email}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Teléfono</p>
                      <p className="font-medium">{studentData.contacto.telefono}</p>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <p className="text-sm text-gray-500">Dirección</p>
                      <p className="font-medium">{studentData.contacto.direccion}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    // </div>
  )
} 