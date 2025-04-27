// /lib/data.ts

// --- Tipos --- 
export interface Student {
    id: number;
    name: string;
    program: string;
    semester: number;
    department?: string;
    stressRisk: number;
    dropoutRisk: number;
    posiblesFactoresEstres?: string[];
}

// --- Datos de Ejemplo --- 
export const studentsData: Student[] = [
    {
        id: 1, name: "Ana García", program: "Ingeniería Informática", semester: 3,
        department: "Ingeniería y Ciencias Exactas", stressRisk: 75, dropoutRisk: 40,
        posiblesFactoresEstres: ["Cálculo Integral", "Sobrecarga académica"]
    },
    {
        id: 2, name: "Luis Martínez", program: "Administración de Empresas", semester: 8,
        department: "Ciencias Económicas y Administrativas", stressRisk: 25, dropoutRisk: 10,
        posiblesFactoresEstres: []
    },
    {
        id: 3, name: "Sofía López", program: "Diseño Gráfico", semester: 5,
        department: "Artes y Diseño", stressRisk: 85, dropoutRisk: 65,
        posiblesFactoresEstres: ["Entrega Proyecto Final", "Problemas equipo"]
    },
    {
        id: 4, name: "Javier Fernández", program: "Medicina", semester: 2,
        department: "Ciencias de la Salud", stressRisk: 50, dropoutRisk: 20,
        posiblesFactoresEstres: ["Anatomía", "Adaptación universitaria"]
    },
    {
        id: 5, name: "Elena Gómez", program: "Ingeniería Civil", semester: 6,
        department: "Ingeniería y Ciencias Exactas", stressRisk: 92, dropoutRisk: 78,
        posiblesFactoresEstres: ["Cálculo Integral", "Física de Fluidos", "Sobrecarga académica"]
    },
    {
        id: 6, name: "Marcos Díaz", program: "Contaduría Pública", semester: 4,
        department: "Ciencias Económicas y Administrativas", stressRisk: 60, dropoutRisk: 30,
        posiblesFactoresEstres: ["Microeconomía", "Sobrecarga académica"]
    },
    {
        id: 7, name: "Valeria Torres", program: "Arquitectura", semester: 7,
        department: "Artes y Diseño", stressRisk: 45, dropoutRisk: 15,
        posiblesFactoresEstres: ["Entrega Proyecto Final"]
    },
];

// --- Funciones Utilitarias --- 

export function normalizeAndSlugify(str: string): string {
    if (!str) return "";
    return str
        .toLowerCase()
        .normalize("NFD") // Separar caracteres base de diacríticos
        .replace(/[\u0300-\u036f]/g, "") // Quitar diacríticos (acentos)
        .replace(/[^a-z0-9\s-]/g, "") // Quitar caracteres no alfanuméricos excepto espacios y guiones
        .trim() // Quitar espacios al inicio/final
        .replace(/\s+/g, '-'); // Reemplazar espacios con guiones
}

export function getDepartmentNameFromSlug(slug: string): string | undefined {
    const normalizedInputSlug = decodeURIComponent(slug); 
    for (const student of studentsData) {
        if (student.department) {
            const normalizedDepartmentSlug = normalizeAndSlugify(student.department);
            if (normalizedDepartmentSlug === normalizedInputSlug) {
                return student.department;
            }
        }
    }
    return undefined;
} 