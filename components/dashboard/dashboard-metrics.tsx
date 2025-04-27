import { Clock, Briefcase, GraduationCap, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardMetrics() {
  // Datos de ejemplo para el estudiante
  const studentData = {
    name: "Carlos Rodríguez",
    average: 4.2,
    weeklyHours: 18,
    isWorking: true,
    workHours: 20,
    progress: 68,
    semester: 7,
    totalSemesters: 10,
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Métricas Académicas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Promedio General */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Promedio General</CardTitle>
            <GraduationCap className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentData.average.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {studentData.average >= 4.0
                ? "Excelente rendimiento"
                : studentData.average >= 3.5
                  ? "Buen rendimiento"
                  : "Rendimiento regular"}
            </p>
            <div className="mt-3 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600 rounded-full"
                style={{ width: `${(studentData.average / 5) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Intensidad Horaria */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Intensidad Horaria</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentData.weeklyHours} hrs/semana</div>
            <p className="text-xs text-muted-foreground mt-1">
              {studentData.weeklyHours > 20
                ? "Carga académica alta"
                : studentData.weeklyHours > 15
                  ? "Carga académica media"
                  : "Carga académica baja"}
            </p>
            <div className="mt-3 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600 rounded-full"
                style={{ width: `${(studentData.weeklyHours / 30) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Condición Laboral */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Condición Laboral</CardTitle>
            <Briefcase className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {studentData.isWorking ? `${studentData.workHours} hrs/semana` : "No trabaja"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {studentData.isWorking
                ? studentData.workHours > 30
                  ? "Tiempo completo"
                  : studentData.workHours >= 20
                    ? "Medio tiempo"
                    : "Tiempo parcial"
                : "Dedicación exclusiva a estudios"}
            </p>
            {studentData.isWorking && (
              <div className="mt-3 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${(studentData.workHours / 40) * 100}%` }}
                ></div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Progreso en la Carrera */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Progreso en la Carrera</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentData.progress}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Semestre {studentData.semester} de {studentData.totalSemesters}
            </p>
            <div className="mt-3 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-600 rounded-full" style={{ width: `${studentData.progress}%` }}></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
