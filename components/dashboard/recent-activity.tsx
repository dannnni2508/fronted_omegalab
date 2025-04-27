import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Calendar, FileText, Clock } from "lucide-react"

export function RecentActivity() {
  // Datos de ejemplo para actividades recientes
  const activities = [
    {
      id: 1,
      type: "assignment",
      title: "Entrega de Proyecto Final",
      course: "Programación Avanzada",
      date: "2023-05-15",
      status: "pending",
      icon: FileText,
    },
    {
      id: 2,
      type: "exam",
      title: "Examen Parcial",
      course: "Cálculo Multivariable",
      date: "2023-05-10",
      status: "completed",
      icon: BookOpen,
    },
    {
      id: 3,
      type: "class",
      title: "Clase Magistral",
      course: "Inteligencia Artificial",
      date: "2023-05-08",
      status: "upcoming",
      icon: Calendar,
    },
    {
      id: 4,
      type: "deadline",
      title: "Entrega de Ensayo",
      course: "Ética Profesional",
      date: "2023-05-05",
      status: "completed",
      icon: Clock,
    },
  ]

  // Próximas clases
  const upcomingClasses = [
    {
      id: 1,
      course: "Programación Avanzada",
      day: "Lunes",
      time: "10:00 - 12:00",
      room: "Lab 302",
    },
    {
      id: 2,
      course: "Cálculo Multivariable",
      day: "Martes",
      time: "08:00 - 10:00",
      room: "Aula 201",
    },
    {
      id: 3,
      course: "Inteligencia Artificial",
      day: "Miércoles",
      time: "14:00 - 16:00",
      room: "Lab 405",
    },
  ]

  return (
    <>
      {/* Actividades Recientes */}
      <Card>
        <CardHeader>
          <CardTitle>Actividades Recientes</CardTitle>
          <CardDescription>Tus últimas actividades académicas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div
                  className={`mt-0.5 p-1.5 rounded-full ${
                    activity.status === "completed"
                      ? "bg-green-100 text-green-600"
                      : activity.status === "pending"
                        ? "bg-amber-100 text-amber-600"
                        : "bg-blue-100 text-blue-600"
                  }`}
                >
                  <activity.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.course}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(activity.date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Próximas Clases */}
      <Card>
        <CardHeader>
          <CardTitle>Próximas Clases</CardTitle>
          <CardDescription>Tu horario para esta semana</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingClasses.map((classItem) => (
              <div key={classItem.id} className="border-l-2 border-green-600 pl-3">
                <p className="text-sm font-medium">{classItem.course}</p>
                <p className="text-xs text-muted-foreground">
                  {classItem.day}, {classItem.time}
                </p>
                <p className="text-xs text-muted-foreground">Aula: {classItem.room}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
