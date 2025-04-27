"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Bell, Shield, Bus } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export default function ConfiguracionPage() {
  const [notificaciones, setNotificaciones] = useState({
    email: true,
    push: false,
    calificaciones: true,
    eventos: true
  })

  const [medioTransporte, setMedioTransporte] = useState("bus")

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Configuración</h1>

        {/* Información Personal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 text-green-600 mr-2" />
              Información Personal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input id="telefono" placeholder="+57 300 123 4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Input id="direccion" placeholder="Calle 123 #45-67" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medio de Transporte */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bus className="h-5 w-5 text-green-600 mr-2" />
              Medio de Transporte
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="transporte">Selecciona tu medio de transporte habitual</Label>
              <Select value={medioTransporte} onValueChange={setMedioTransporte}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un medio de transporte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bus">Bus público</SelectItem>
                  <SelectItem value="bicicleta">Bicicleta</SelectItem>
                  <SelectItem value="carro">Carro particular</SelectItem>
                  <SelectItem value="moto">Moto</SelectItem>
                  <SelectItem value="caminando">Caminando</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notificaciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 text-green-600 mr-2" />
              Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificaciones por email</Label>
                  <p className="text-sm text-gray-500">Recibe actualizaciones en tu correo</p>
                </div>
                <Switch
                  checked={notificaciones.email}
                  onCheckedChange={(checked) => setNotificaciones({ ...notificaciones, email: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificaciones push</Label>
                  <p className="text-sm text-gray-500">Recibe notificaciones en tu navegador</p>
                </div>
                <Switch
                  checked={notificaciones.push}
                  onCheckedChange={(checked) => setNotificaciones({ ...notificaciones, push: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Calificaciones</Label>
                  <p className="text-sm text-gray-500">Notificaciones de nuevas calificaciones</p>
                </div>
                <Switch
                  checked={notificaciones.calificaciones}
                  onCheckedChange={(checked) => setNotificaciones({ ...notificaciones, calificaciones: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Eventos académicos</Label>
                  <p className="text-sm text-gray-500">Notificaciones de eventos y actividades</p>
                </div>
                <Switch
                  checked={notificaciones.eventos}
                  onCheckedChange={(checked) => setNotificaciones({ ...notificaciones, eventos: checked })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacidad y Seguridad */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 text-green-600 mr-2" />
              Privacidad y Seguridad
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Contraseña actual</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nueva contraseña</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            <Button className="w-full mt-4">Cambiar contraseña</Button>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button variant="outline">Cancelar</Button>
          <Button className="bg-green-600 hover:bg-green-700">Guardar cambios</Button>
        </div>
      </div>
    </main>
  )
} 