import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ProgressChart() {
  // Datos de ejemplo para el progreso académico
  const progressData = {
    totalCredits: 180,
    completedCredits: 122,
    currentSemester: 7,
    totalSemesters: 10,
    semesterProgress: [
      { semester: 1, credits: 18, completed: true },
      { semester: 2, credits: 20, completed: true },
      { semester: 3, credits: 19, completed: true },
      { semester: 4, credits: 21, completed: true },
      { semester: 5, credits: 18, completed: true },
      { semester: 6, credits: 16, completed: true },
      { semester: 7, credits: 10, completed: false },
      { semester: 8, credits: 20, completed: false },
      { semester: 9, credits: 18, completed: false },
      { semester: 10, credits: 20, completed: false },
    ],
  }

  // Calcular el porcentaje de progreso
  const progressPercentage = Math.round((progressData.completedCredits / progressData.totalCredits) * 100)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progreso Académico</CardTitle>
        <CardDescription>
          Has completado {progressData.completedCredits} de {progressData.totalCredits} créditos ({progressPercentage}%)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Gráfico de progreso por semestre */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progreso por semestre</span>
            <span className="text-sm text-muted-foreground">Semestre actual: {progressData.currentSemester}</span>
          </div>

          <div className="grid grid-cols-10 gap-2 mb-4">
            {progressData.semesterProgress.map((semester, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-full bg-gray-100 rounded-md relative"
                  style={{ height: `${(semester.credits / 24) * 150}px` }}
                >
                  <div
                    className={`absolute bottom-0 w-full rounded-md ${
                      semester.completed
                        ? "bg-green-600"
                        : index === progressData.currentSemester - 1
                          ? "bg-green-400"
                          : "bg-gray-300"
                    }`}
                    style={{
                      height: semester.completed ? "100%" : index === progressData.currentSemester - 1 ? "50%" : "100%",
                    }}
                  ></div>
                </div>
                <span className="text-xs mt-1">{semester.semester}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-4 mt-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
              <span className="text-xs">Completado</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span className="text-xs">En progreso</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
              <span className="text-xs">Pendiente</span>
            </div>
          </div>
        </div>

        {/* Nivel en la carrera */}
        <div className="mt-8">
          <h3 className="text-sm font-medium mb-4">Nivel en la carrera</h3>
          <div className="relative pt-1">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-green-100 text-green-800">
                Nivel Intermedio-Avanzado
              </div>
              <div className="text-xs font-semibold inline-block text-green-600">{progressPercentage}%</div>
            </div>
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${progressPercentage}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Inicio</span>
              <span>Intermedio</span>
              <span>Avanzado</span>
              <span>Graduación</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
