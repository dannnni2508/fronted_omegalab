// import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardMetrics } from "@/components/dashboard/dashboard-metrics"
import { ProgressChart } from "@/components/dashboard/progress-chart"
import { StudentGreeting } from "@/components/dashboard/student-greeting"
import { StudentProgress } from "@/components/dashboard/student-progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Moon, Sun } from "lucide-react"

export default function DashboardPage() {
  // Datos de ejemplo para el estudiante
  const studentData = {
    name: "Carlos Rodríguez",
    scheduleType: "Diurno", // o "Nocturno"
    scheduleHours: "7:00 AM - 3:00 PM",
  }

  return (
    // Eliminar div y DashboardHeader
    // <div className="min-h-screen bg-gray-50">
    //   <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        {/* Saludo personalizado */}
        <StudentGreeting name={studentData.name.split(" ")[0]} />

        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Académico</h1>

        <div className="space-y-6">
          {/* Información de horario */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl font-medium">Información de Horario</CardTitle>
              <Clock className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center mt-2">
                {studentData.scheduleType === "Diurno" ? (
                  <Sun className="h-5 w-5 text-amber-500 mr-2" />
                ) : (
                  <Moon className="h-5 w-5 text-indigo-500 mr-2" />
                )}
                <div>
                  <p className="font-medium">Horario {studentData.scheduleType}</p>
                  <p className="text-sm text-muted-foreground">{studentData.scheduleHours}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Avance en la carrera (nuevo componente) */}
          <StudentProgress />
          
          {/* Métricas */}
          <DashboardMetrics />

          {/* Gráfico de progreso */}
          <ProgressChart />
        </div>
      </main>
    // </div>
  )
}
