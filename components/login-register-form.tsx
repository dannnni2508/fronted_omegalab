"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { AtSign, Lock, User, Mail, Key } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Esquema de validación para el formulario de inicio de sesión
const loginSchema = z.object({
  email: z.string().email({ message: "Correo electrónico inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
})

// Esquema de validación para el formulario de registro
const registerSchema = z
  .object({
    name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    email: z.string().email({ message: "Correo electrónico inválido" }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    confirmPassword: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })

export function LoginRegisterForm() {
  const [activeTab, setActiveTab] = useState("login")

  // Formulario de inicio de sesión
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Formulario de registro
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  // Manejar envío del formulario de inicio de sesión
  function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    console.log("Login values:", values)
    // Aquí iría la lógica para autenticar al usuario
    alert(`Iniciando sesión: ${values.email}`)
  }

  // Manejar envío del formulario de registro
  function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
    console.log("Register values:", values)
    // Aquí iría la lógica para registrar al usuario
    alert(`Registrando: ${values.name} (${values.email})`)
  }

  return (
    <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="login" className="text-base">
          Iniciar Sesión
        </TabsTrigger>
        <TabsTrigger value="register" className="text-base">
          Registrarse
        </TabsTrigger>
      </TabsList>

      {/* Contenido de inicio de sesión */}
      <TabsContent value="login">
        <Card className="border-0 shadow-none">
          <CardHeader className="px-0">
            <CardTitle className="text-2xl text-green-700">Bienvenido de nuevo</CardTitle>
            <CardDescription>Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <AtSign className="absolute left-3 top-3 h-4 w-4 text-green-600" />
                          <Input placeholder="correo@universidad.edu" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-green-600" />
                          <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Iniciar Sesión
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="px-0 flex justify-center">
            <Button variant="link" className="text-green-600" onClick={() => setActiveTab("register")}>
              ¿No tienes una cuenta? Regístrate
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Contenido de registro */}
      <TabsContent value="register">
        <Card className="border-0 shadow-none">
          <CardHeader className="px-0">
            <CardTitle className="text-2xl text-green-700">Crear una cuenta</CardTitle>
            <CardDescription>Completa el formulario para registrarte en el sistema</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                <FormField
                  control={registerForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre completo</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-green-600" />
                          <Input placeholder="Juan Pérez" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-green-600" />
                          <Input placeholder="correo@universidad.edu" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <p className="text-xs text-muted-foreground mt-1">
                        Utiliza tu correo institucional para registrarte
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Key className="absolute left-3 top-3 h-4 w-4 text-green-600" />
                          <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar contraseña</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-green-600" />
                          <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Registrarse
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="px-0 flex justify-center">
            <Button variant="link" className="text-green-600" onClick={() => setActiveTab("login")}>
              ¿Ya tienes una cuenta? Inicia sesión
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
