"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AlertTriangle, TrendingDown, Users, AreaChart } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface DepartmentSummaryProps {
  departmentName: string;
  studentCount: number;
  avgStressRisk: number;
  avgDropoutRisk: number;
}

export function DepartmentSummaryCard({ 
  departmentName,
  studentCount,
  avgStressRisk,
  avgDropoutRisk 
}: DepartmentSummaryProps) {

  const getRiskColor = (risk: number): string => {
    if (risk > 70) return "bg-red-500";
    if (risk > 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <Card className="mb-6 bg-white shadow-sm border border-blue-100">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-blue-800 flex items-center">
          <AreaChart className="h-5 w-5 mr-2" />
          Resumen: {departmentName}
        </CardTitle>
        <CardDescription className="flex items-center">
          <Users className="h-4 w-4 mr-1 text-gray-500"/> {studentCount} Estudiantes Analizados
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Promedio Estrés */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium flex items-center text-gray-700">
              <AlertTriangle className={`h-4 w-4 mr-1 ${avgStressRisk > 70 ? 'text-red-600' : avgStressRisk > 40 ? 'text-yellow-600' : 'text-green-600'}`} />
              Estrés Promedio
            </span>
            <span className={`text-lg font-bold ${avgStressRisk > 70 ? 'text-red-600' : avgStressRisk > 40 ? 'text-yellow-600' : 'text-green-600'}`}>
              {avgStressRisk.toFixed(1)}%
            </span>
          </div>
          <Progress value={avgStressRisk} className={`h-2 [&>*]:${getRiskColor(avgStressRisk)}`} />
        </div>
        {/* Promedio Deserción */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium flex items-center text-gray-700">
              <TrendingDown className={`h-4 w-4 mr-1 ${avgDropoutRisk > 70 ? 'text-red-600' : avgDropoutRisk > 40 ? 'text-yellow-600' : 'text-green-600'}`} />
              Deserción Promedio
            </span>
            <span className={`text-lg font-bold ${avgDropoutRisk > 70 ? 'text-red-600' : avgDropoutRisk > 40 ? 'text-yellow-600' : 'text-green-600'}`}>
              {avgDropoutRisk.toFixed(1)}%
            </span>
          </div>
          <Progress value={avgDropoutRisk} className={`h-2 [&>*]:${getRiskColor(avgDropoutRisk)}`} />
        </div>
      </CardContent>
    </Card>
  );
} 