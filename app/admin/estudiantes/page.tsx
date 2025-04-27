"use client"

import React from 'react';
import { studentsData, Student } from "@/lib/data"; // Importar datos y tipo
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { ArrowDownUp } from 'lucide-react'; // Para indicar ordenación (opcional)

export default function AllStudentsPage() {

    // Ordenar estudiantes por riesgo combinado descendente
    const sortedStudents = [...studentsData].sort((a, b) => 
        Math.max(b.stressRisk, b.dropoutRisk) - Math.max(a.stressRisk, a.dropoutRisk)
    );

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
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Lista General de Estudiantes</h1>
            
            <Table>
                <TableCaption>Lista de todos los estudiantes registrados, ordenados por riesgo.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[250px]">Nombre</TableHead>
                        <TableHead>Programa</TableHead>
                        <TableHead>Departamento</TableHead>
                        <TableHead className="text-center">Semestre</TableHead>
                        <TableHead className="text-right text-yellow-600">Estrés (%)</TableHead>
                        <TableHead className="text-right text-red-600">Deserción (%)</TableHead>
                        <TableHead className="text-center">Nivel Riesgo</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedStudents.map((student) => {
                        const maxRisk = Math.max(student.stressRisk, student.dropoutRisk);
                        const badgeVariant = getRiskBadgeVariant(maxRisk);
                        const badgeClasses = getRiskBadgeClasses(maxRisk);
                        const riskLabel = maxRisk > 70 ? 'Alto' : maxRisk > 40 ? 'Moderado' : 'Bajo';

                        return (
                            <TableRow key={student.id}>
                                <TableCell className="font-medium">{student.name}</TableCell>
                                <TableCell>{student.program}</TableCell>
                                <TableCell>{student.department || 'N/A'}</TableCell>
                                <TableCell className="text-center">{student.semester}</TableCell>
                                <TableCell className="text-right">{student.stressRisk}%</TableCell>
                                <TableCell className="text-right">{student.dropoutRisk}%</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={badgeVariant} className={badgeClasses}>
                                        {riskLabel}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
} 