"use client"

import React from 'react';
import { Building, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DepartmentSummaryCard } from "@/components/admin/department-summary-card"
import Link from 'next/link'
import { studentsData, Student, normalizeAndSlugify } from "@/lib/data"; // Importar desde lib

export default function AdminDashboardPage() {
  // Agrupar estudiantes por departamento
  const groupedStudents = studentsData.reduce((acc, student) => {
    const department = student.department || 'Sin Departamento';
    if (!acc[department]) {
      acc[department] = [];
    }
    acc[department].push(student);
    return acc;
  }, {} as Record<string, Student[]>);

  return (
    <div className="space-y-8"> {/* Ajustar espaciado si se prefiere */}
      <h1 className="text-3xl font-bold text-gray-800">Dashboard de Administrador - Resumen por Departamento</h1>

      {Object.entries(groupedStudents).map(([department, studentsInDepartment]) => {
        // Calcular promedios
        const totalStudents = studentsInDepartment.length;
        const avgStress = totalStudents > 0 ? studentsInDepartment.reduce((sum, s) => sum + s.stressRisk, 0) / totalStudents : 0;
        const avgDropout = totalStudents > 0 ? studentsInDepartment.reduce((sum, s) => sum + s.dropoutRisk, 0) / totalStudents : 0;
        
        // Usar la función de normalización importada para generar el slug
        const departmentSlug = normalizeAndSlugify(department);

        return (
          <section key={department} className="border p-4 rounded-lg bg-white shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700 flex items-center">
                <Building className="h-5 w-5 mr-2 text-blue-600" />
                {department}
              </h2>
              <Link href={`/admin/departamento/${departmentSlug}`} passHref>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Detalles ({totalStudents})
                </Button>
              </Link>
            </div>
            
            <DepartmentSummaryCard 
              departmentName={department} 
              studentCount={totalStudents} 
              avgStressRisk={avgStress} 
              avgDropoutRisk={avgDropout}
            />
          </section>
        )
      })}
    </div>
  );
} 