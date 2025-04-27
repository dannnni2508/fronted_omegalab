"use client"

import React, { use } from 'react';
import { StudentRiskCard } from "@/components/admin/student-risk-card";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building, Layers } from 'lucide-react';
// Importar datos y funciones desde lib
import { studentsData, Student, getDepartmentNameFromSlug } from "@/lib/data"; 

// Eliminar la definición local de Student y studentsData
/*
interface Student { ... }
const studentsData: Student[] = [ ... ];
function normalizeAndSlugify(str: string): string { ... }
function getDepartmentNameFromSlug(slug: string): string | undefined { ... }
*/

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function DepartmentDetailPage({ params }: PageProps) {
    const resolvedParams = use(params);
    const slug = resolvedParams.slug; 
    // Usar la función importada
    const departmentName = getDepartmentNameFromSlug(slug); 

    if (!departmentName) {
        return (
            <div className="text-center py-10">
                <p className="text-red-600 font-semibold mb-2">Departamento no encontrado.</p>
                <Link href="/admin/dashboard">
                  <Button variant="link">Volver al Dashboard</Button>
                </Link>
            </div>
        );
    }

    // Filtrar estudiantes usando los datos importados
    const studentsInDepartment = studentsData
        .filter((student: Student) => student.department === departmentName); 
        // No necesitamos ordenar aquí si el análisis de factores lo hará después

    // Analizar factores comunes (solo entre estudiantes con riesgo > 40)
    const factorCounts: Record<string, { count: number; students: Student[] }> = {};
    studentsInDepartment.forEach(student => {
        if ((student.stressRisk > 40 || student.dropoutRisk > 40) && student.posiblesFactoresEstres) {
            student.posiblesFactoresEstres.forEach(factor => {
                if (!factorCounts[factor]) {
                    factorCounts[factor] = { count: 0, students: [] };
                }
                factorCounts[factor].count++;
                // Ordenar estudiantes dentro de cada factor por riesgo descendente
                factorCounts[factor].students.push(student);
                factorCounts[factor].students.sort((a, b) => Math.max(b.stressRisk, b.dropoutRisk) - Math.max(a.stressRisk, a.dropoutRisk));
            });
        }
    });

    // Filtrar factores comunes (más de 1 estudiante) y ordenarlos por frecuencia
    const commonFactors = Object.entries(factorCounts)
        .filter(([_, data]) => data.count > 1)
        .sort(([, a], [, b]) => b.count - a.count)
        .map(([factor, data]) => ({ factor, students: data.students })); // students ya están ordenados

    // Estudiantes sin factores comunes de alto riesgo o con riesgo bajo
    const studentsWithoutCommonHighRiskFactors = studentsInDepartment
        .filter(student => {
            // Incluir si el riesgo es bajo (<40)
            if (student.stressRisk <= 40 && student.dropoutRisk <= 40) return true;
            // Incluir si el riesgo es alto pero sus factores no son comunes (>1)
            if (!student.posiblesFactoresEstres) return true; // Si no tiene factores
            return student.posiblesFactoresEstres.every(factor => factorCounts[factor]?.count <= 1);
        })
        .sort((a, b) => Math.max(b.stressRisk, b.dropoutRisk) - Math.max(a.stressRisk, a.dropoutRisk));

    return (
        <div className="space-y-8">
            {/* Header y Volver */}
            <div className="flex justify-between items-center">
                 <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                    <Building className="h-8 w-8 mr-3 text-blue-600" />
                    {departmentName} - Análisis de Riesgo
                </h1>
                <Link href="/admin/dashboard" className="inline-flex items-center text-blue-600 hover:underline">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Volver al Resumen
                </Link>
            </div>

            {/* Sección de Factores Comunes */}
            {commonFactors.length > 0 && (
                <section className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                    <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                        <Layers className="h-5 w-5 mr-2" />
                        Grupos por Factor Común de Estrés (Riesgo {'>'} 40%)
                    </h2>
                    <div className="space-y-6">
                        {commonFactors.map(({ factor, students }) => (
                            <div key={factor}>
                                <h3 className="font-medium text-gray-700 mb-2">
                                    {factor} ({students.length} estudiantes)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {students.map((student) => (
                                        <StudentRiskCard key={`${factor}-${student.id}`} student={student} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Sección Otros Estudiantes */}
            {studentsWithoutCommonHighRiskFactors.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Otros Estudiantes (Riesgo Bajo o Factores No Comunes)
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {studentsWithoutCommonHighRiskFactors.map((student: Student) => (
                            <StudentRiskCard key={student.id} student={student} />
                        ))}
                    </div>
                </section>
            )}

            {/* Mensaje si no hay estudiantes */}
            {studentsInDepartment.length === 0 && (
                 <p className="text-gray-600 text-center py-10">No hay estudiantes registrados en este departamento.</p>
            )}
        </div>
    );
} 