"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Clock, Book, GraduationCap } from "lucide-react"

// Tipado para los datos del estudiante
interface StudentProgressData {
  idEstudiante: string
  añoIngreso: number
  añoActual: number
  carreraActual: string
  duraciónCarrera: number
  cambiosCarrera: { año: number; carreraAnterior: string; tiempoPerdido: number }[]
  creditos: {
    total: number
    aprobados: number
  }
}

// Datos de ejemplo
const sampleStudentData: StudentProgressData = {
  idEstudiante: "001",
  añoIngreso: 2020,
  añoActual: 2023,
  carreraActual: "Ingeniería",
  duraciónCarrera: 4,
  cambiosCarrera: [
    { año: 2021, carreraAnterior: "Medicina", tiempoPerdido: 0.5 }
  ],
  creditos: {
    total: 160,
    aprobados: 120
  }
}

// Función para calcular el progreso basado en tiempo
function calcularProgresoTiempo(
  añoIngreso: number,
  añoActual: number,
  duraciónCarrera: number,
  cambiosCarrera: { tiempoPerdido: number }[]
): number {
  const tiempoTotal = añoActual - añoIngreso
  const tiempoPerdido = cambiosCarrera.reduce((acc, cambio) => acc + cambio.tiempoPerdido, 0)
  const tiempoEfectivo = tiempoTotal - tiempoPerdido
  const progreso = (tiempoEfectivo / duraciónCarrera) * 100
  return Math.min(100, progreso) // Capar al 100%
}

// Función para calcular el progreso basado en créditos
function calcularProgresoCreditos(creditosAprobados: number, creditosTotales: number): number {
  return (creditosAprobados / creditosTotales) * 100
}

// Función para calcular el progreso híbrido
function calcularProgresoHibrido(
  progresoTiempo: number,
  progresoCreditos: number,
  pesoTiempo: number = 0.4,
  pesoCreditos: number = 0.6
): number {
  return (pesoTiempo * progresoTiempo) + (pesoCreditos * progresoCreditos)
}

// Función para determinar el nivel académico basado en el progreso
function determinarNivelAcademico(progresoHibrido: number): string {
  if (progresoHibrido < 25) return "Inicial"
  if (progresoHibrido < 50) return "Intermedio"
  if (progresoHibrido < 75) return "Avanzado"
  return "Final"
}

export function StudentProgress({ data = sampleStudentData }) {
  const [pesoTiempo, setPesoTiempo] = useState(0.4)
  const [pesoCreditos, setPesoCreditos] = useState(0.6)

  // Cálculos de progreso
  const progresoTiempo = calcularProgresoTiempo(
    data.añoIngreso,
    data.añoActual,
    data.duraciónCarrera,
    data.cambiosCarrera
  )

  const progresoCreditos = calcularProgresoCreditos(
    data.creditos.aprobados,
    data.creditos.total
  )

  const progresoHibrido = calcularProgresoHibrido(
    progresoTiempo,
    progresoCreditos,
    pesoTiempo,
    pesoCreditos
  )

  const nivelAcademico = determinarNivelAcademico(progresoHibrido)

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Progreso Académico</CardTitle>
        <CardDescription>
          Avance en la carrera de {data.carreraActual} 
          (Ingreso: {data.añoIngreso})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="hibrido" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="hibrido" className="text-sm">Progreso General</TabsTrigger>
            <TabsTrigger value="tiempo" className="text-sm">Por Tiempo</TabsTrigger>
            <TabsTrigger value="creditos" className="text-sm">Por Créditos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hibrido" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-lg text-green-700">{Math.round(progresoHibrido)}%</h4>
                <p className="text-sm text-gray-500">Progreso combinado</p>
              </div>
              <div className="bg-green-50 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                Nivel {nivelAcademico}
              </div>
            </div>
            
            <div className="space-y-1">
              <Progress value={progresoHibrido} className="h-3" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Tiempo: {Math.round(progresoTiempo)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full" 
                    style={{ width: `${progresoTiempo}%` }}
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Book className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">Créditos: {Math.round(progresoCreditos)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-purple-600 rounded-full" 
                    style={{ width: `${progresoCreditos}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="text-sm text-gray-500 mt-2">
              <p>El progreso combina tiempo ({Math.round(pesoTiempo * 100)}%) y créditos ({Math.round(pesoCreditos * 100)}%)</p>
            </div>
          </TabsContent>
          
          <TabsContent value="tiempo">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span>Progreso Temporal: {Math.round(progresoTiempo)}%</span>
                </h4>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full" 
                    style={{ width: `${progresoTiempo}%` }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500">Año de ingreso</p>
                  <p className="font-medium">{data.añoIngreso}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500">Duración total</p>
                  <p className="font-medium">{data.duraciónCarrera} años</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500">Tiempo transcurrido</p>
                  <p className="font-medium">{data.añoActual - data.añoIngreso} años</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500">Tiempo perdido</p>
                  <p className="font-medium">
                    {data.cambiosCarrera.reduce((acc, cambio) => acc + cambio.tiempoPerdido, 0)} años
                  </p>
                </div>
              </div>
              
              {data.cambiosCarrera.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-sm font-medium mb-2">Cambios de carrera</h5>
                  {data.cambiosCarrera.map((cambio, index) => (
                    <div key={index} className="flex items-center justify-between text-sm border-b pb-2 mb-2">
                      <span>{cambio.año}: {cambio.carreraAnterior}</span>
                      <span className="text-red-600">-{cambio.tiempoPerdido} años</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="creditos">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Book className="h-4 w-4 text-purple-600" />
                  <span>Progreso Académico: {Math.round(progresoCreditos)}%</span>
                </h4>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-600 rounded-full" 
                    style={{ width: `${progresoCreditos}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <span className="block text-2xl font-bold text-purple-600">
                        {data.creditos.aprobados}
                      </span>
                      <span className="text-xs text-gray-500">de {data.creditos.total}</span>
                    </div>
                  </div>
                  <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
                    <circle 
                      cx="50" cy="50" r="45" fill="none" 
                      stroke="#E2E8F0" strokeWidth="8" />
                    <circle 
                      cx="50" cy="50" r="45" fill="none" 
                      stroke="#9061F9" strokeWidth="8" 
                      strokeDasharray="283" 
                      strokeDashoffset={283 - (283 * progresoCreditos / 100)}
                      transform="rotate(-90 50 50)" />
                  </svg>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Créditos completados: <span className="font-medium">{data.creditos.aprobados}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Créditos pendientes: <span className="font-medium">{data.creditos.total - data.creditos.aprobados}</span>
                </p>
              </div>
              
              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg mt-2">
                <p className="flex items-center gap-1">
                  <GraduationCap className="h-3 w-3" />
                  <span>
                    Estimado para completar: {data.añoIngreso + data.duraciónCarrera + 
                    data.cambiosCarrera.reduce((acc, cambio) => acc + cambio.tiempoPerdido, 0)}
                  </span>
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 