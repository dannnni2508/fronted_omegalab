# Sistema de Monitoreo Académico

Un sistema frontend moderno para monitorear el riesgo de estrés y deserción de estudiantes universitarios, permitiendo a los administradores visualizar datos por departamento y estudiante.

## Características

- **Portal de Administrador**: Dashboard con resumen de riesgos por departamento
- **Vista detallada por Departamento**: Análisis de estudiantes agrupados por factores de riesgo comunes
- **Listado General de Estudiantes**: Tabla ordenada por nivel de riesgo
- **Interfaz Adaptativa**: Diseño responsivo para diferentes dispositivos
- **Visualización de Datos**: Gráficos y métricas para análisis rápido de riesgos

## Tecnologías

- [Next.js 14](https://nextjs.org/) - Framework de React con App Router
- [React](https://reactjs.org/) - Biblioteca para interfaces de usuario
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático para JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitario
- [shadcn/ui](https://ui.shadcn.com/) - Componentes de UI reutilizables
- [Radix UI](https://www.radix-ui.com/) - Primitivos de UI accesibles
- [Lucide Icons](https://lucide.dev/) - Iconos SVG

## Estructura del Proyecto

```
/app                      # Rutas y páginas (Next.js App Router)
  /admin                  # Portal de administrador
    /dashboard            # Dashboard principal
    /departamento/[slug]  # Vista detallada por departamento
    /estudiantes          # Lista general de estudiantes
/components               # Componentes reutilizables
  /admin                  # Componentes específicos del admin
  /ui                     # Componentes de UI (shadcn)
/lib                      # Utilidades y datos
/public                   # Archivos estáticos
```

## Instalación

1. Clona el repositorio
```bash
git clone [url-del-repositorio]
cd login-system
```

2. Instala las dependencias
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. Ejecuta el servidor de desarrollo
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## Desarrollo

El proyecto utiliza Next.js con el App Router. Para añadir nuevas páginas, crea carpetas en `/app` siguiendo la estructura de rutas de Next.js.

## Despliegue

Este proyecto puede ser desplegado en [Vercel](https://vercel.com/) u otros proveedores que soporten Next.js. 