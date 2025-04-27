"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AlertTriangle, TrendingDown } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Definir el tipo Student aquí o importarlo si está en un archivo central
interface Student {
  id: number;
  name: string;
  program: string;
  semester: number;
  department?: string; // Opcional por si acaso
  stressRisk: number;
  dropoutRisk: number;
}

interface StudentRiskCardProps {
  student: Student;
}

export function StudentRiskCard({ student }: StudentRiskCardProps) {
  const getRiskColor = (risk: number): string => {
    if (risk > 70) return "bg-red-500";
    if (risk > 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getRiskBadgeVariant = (risk: number): "destructive" | "secondary" | "default" => {
    if (risk > 70) return "destructive";
    if (risk > 40) return "secondary";
    return "default";
  }

  const getRiskBadgeClasses = (risk: number): string => {
    if (risk > 70) return "";
    if (risk > 40) return "bg-yellow-100 text-yellow-800 border-yellow-300";
    return "bg-green-100 text-green-800 border-green-300";
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">{student.name}</CardTitle>
            <CardDescription>{student.program} - Semestre {student.semester}</CardDescription>
          </div>
          <Badge
            variant={getRiskBadgeVariant(Math.max(student.stressRisk, student.dropoutRisk))}
            className={`ml-auto ${getRiskBadgeClasses(Math.max(student.stressRisk, student.dropoutRisk))}`}>
            {Math.max(student.stressRisk, student.dropoutRisk) > 70 ? 'Alto Riesgo' : Math.max(student.stressRisk, student.dropoutRisk) > 40 ? 'Riesgo Moderado' : 'Bajo Riesgo'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium flex items-center">
              <AlertTriangle className={`h-4 w-4 mr-1 ${student.stressRisk > 70 ? 'text-red-600' : student.stressRisk > 40 ? 'text-yellow-600' : 'text-green-600'}`} />
              Riesgo de Estrés
            </span>
            <span className={`text-sm font-bold ${student.stressRisk > 70 ? 'text-red-600' : student.stressRisk > 40 ? 'text-yellow-600' : 'text-green-600'}`}>
              {student.stressRisk}%
            </span>
          </div>
          <Progress value={student.stressRisk} className={`h-2 [&>*]:${getRiskColor(student.stressRisk)}`} />
          {student.stressRisk > 70 && (
            <p className="text-xs text-red-600 mt-1">¡Alerta! Nivel de estrés crítico.</p>
          )}
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium flex items-center">
              <TrendingDown className={`h-4 w-4 mr-1 ${student.dropoutRisk > 70 ? 'text-red-600' : student.dropoutRisk > 40 ? 'text-yellow-600' : 'text-green-600'}`} />
              Riesgo de Deserción
            </span>
            <span className={`text-sm font-bold ${student.dropoutRisk > 70 ? 'text-red-600' : student.dropoutRisk > 40 ? 'text-yellow-600' : 'text-green-600'}`}>
              {student.dropoutRisk}%
            </span>
          </div>
          <Progress value={student.dropoutRisk} className={`h-2 [&>*]:${getRiskColor(student.dropoutRisk)}`} />
          {student.dropoutRisk > 70 && (
            <p className="text-xs text-red-600 mt-1">¡Alerta! Alto riesgo de abandono.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 