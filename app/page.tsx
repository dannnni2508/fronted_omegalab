import { LoginRegisterForm } from "@/components/login-register-form"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block rounded-l-xl h-full relative overflow-hidden">
          <img
            src="/images/university-student.png"
            alt="Estudiante universitario"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent flex flex-col justify-end p-8 text-white">
            <h1 className="text-3xl font-bold mb-4 drop-shadow-md">Sistema Universitario</h1>
            <p className="text-center mb-6 drop-shadow-md">
              Accede a tu cuenta para gestionar tus recursos académicos y administrativos.
            </p>
            <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl font-bold">U</span>
            </div>
            <p className="text-sm text-center drop-shadow-md mt-4">Tu futuro académico comienza aquí</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-xl md:rounded-l-none shadow-lg">
          <LoginRegisterForm />
        </div>
      </div>
    </main>
  )
}
