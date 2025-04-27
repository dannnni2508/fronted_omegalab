// import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock, User } from "lucide-react"

export default function AsignaturasPage() {
  // Datos de ejemplo para las asignaturas
  const asignaturas = [
    {
      id: 1,
      nombre: "Cálculo Diferencial",
      nota: 4.2,
      docente: "Dra. María González",
      horario: "Lunes y Miércoles, 8:00 - 10:00",
    },
    {
      id: 2,
      nombre: "Física Mecánica",
      nota: 3.8,
      docente: "Dr. Alejandro Ramírez",
      horario: "Martes y Jueves, 10:00 - 12:00",
    },
    {
      id: 3,
      nombre: "Programación Orientada a Objetos",
      nota: 4.5,
      docente: "Ing. Carlos Mendoza",
      horario: "Lunes y Viernes, 14:00 - 16:00",
    },
    {
      id: 4,
      nombre: "Álgebra Lineal",
      nota: 3.9,
      docente: "Dr. Fernando Torres",
      horario: "Miércoles, 16:00 - 19:00",
    },
    {
      id: 5,
      nombre: "Inglés Técnico",
      nota: 4.7,
      docente: "Lic. Ana Martínez",
      horario: "Martes, 14:00 - 17:00",
    },
    {
      id: 6,
      nombre: "Ética Profesional",
      nota: 4.0,
      docente: "Dra. Laura Sánchez",
      horario: "Jueves, 7:00 - 10:00",
    },
  ]

  return (
    // Eliminar div y DashboardHeader
    // <div className="min-h-screen bg-gray-50">
    //   <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Mis Asignaturas</h1>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 text-green-600 mr-2" />
              Asignaturas del Semestre Actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {asignaturas.map((asignatura) => (
                <div key={asignatura.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-lg">{asignatura.nombre}</span>
                    <span
                      className={`font-bold ${
                        asignatura.nota >= 4.0
                          ? "text-green-600"
                          : asignatura.nota >= 3.5
                            ? "text-amber-600"
                            : "text-red-600"
                      }`}
                    >
                      {asignatura.nota.toFixed(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-green-600 mr-2" />
                      <span>{asignatura.docente}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-green-600 mr-2" />
                      <span>{asignatura.horario}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    // </div>
  )
}
