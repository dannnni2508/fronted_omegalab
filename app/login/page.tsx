import { LoginRegisterForm } from "@/components/login-register-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center">
          <Link href="/">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2"
              aria-label="Volver a la página principal"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-green-900">Acceso al Sistema</h1>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <LoginRegisterForm />
        </div>
      </div>
    </main>
  )
} 