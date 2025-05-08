"use client"

import type React from "react"

import Link from "next/link"
import { Eye, EyeOff, User, Briefcase } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<"cliente" | "empleado">("cliente")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Adjust the endpoint based on user type
      const endpoint =
        userType === "cliente"
          ? "http://localhost:8080/api/auth/login"
          : "http://localhost:8080/api/auth/employee/login"

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("token", data.token)
        localStorage.setItem("id", data.id)
        localStorage.setItem("name", data.name)
        localStorage.setItem("role", data.role)

        // Redirect based on user type
        if (userType === "cliente") {
          router.push("/dashboard")
        } else {
          router.push("/admin-dashboard")
        }
        return
      }
    } catch (error) {
      console.error("❌ Error al contactar con el backend:", error)
    }

    // ⛑️ Si falló el fetch o no se obtuvo login correcto: usar login por defecto solo si aplica
    if (userType === "cliente" && email === "test@fitec.com" && password === "123456") {
      console.log("🧪 Login por defecto ejecutado (cliente)")
      const fakeToken = "demo-token-123"
      const fakeId = "11"
      const fakeName = "Usuario Demo"
      const fakeRole = "cliente"

      localStorage.setItem("token", fakeToken)
      localStorage.setItem("id", fakeId)
      localStorage.setItem("name", fakeName)
      localStorage.setItem("role", fakeRole)
      router.push("/dashboard")
      return
    } else if (userType === "empleado" && email === "empleado@fitec.com" && password === "123456") {
      console.log("🧪 Login por defecto ejecutado (empleado)")
      const fakeToken = "demo-token-456"
      const fakeId = "22"
      const fakeName = "Empleado Demo"
      const fakeRole = "empleado"

      localStorage.setItem("token", fakeToken)
      localStorage.setItem("id", fakeId)
      localStorage.setItem("name", fakeName)
      localStorage.setItem("role", fakeRole)
      router.push("/admin-dashboard")
      return
    }

    alert("❌ Credenciales inválidas")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-24 bg-sky-900 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        {/* Selector de tipo de usuario */}
        <div className="flex mb-6 border-b">
          <button
            onClick={() => setUserType("cliente")}
            className={`flex items-center justify-center w-1/2 py-3 text-sm font-medium transition-colors ${
              userType === "cliente"
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <User className="w-4 h-4 mr-2" />
            Cliente
          </button>
          <button
            onClick={() => setUserType("empleado")}
            className={`flex items-center justify-center w-1/2 py-3 text-sm font-medium transition-colors ${
              userType === "empleado"
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Empleado
          </button>
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-sky-900 mb-5 text-left">Te damos la bienvenida nuevamente</h1>
        <p className="text-left text-gray-600 mb-5 text-sm">
          {userType === "cliente" ? "Que gusto verte en Fitec" : "Acceso para personal de Fitec"}
        </p>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder={userType === "cliente" ? "Ingresa tu correo electrónico" : "Correo corporativo"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
              className="appearance-none block w-full px-4 py-3 pr-12 border border-gray-300 rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm"
            />

            {/* OJO SIEMPRE VISIBLE */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[65%] right-3 -translate-y-1/2 text-gray-500 hover:text-gray-800 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Opciones extra */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                Recuérdame
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-yellow-400 hover:text-yellow-500">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          {/* Botón de login */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
            >
              {userType === "cliente" ? "Iniciar Sesión" : "Acceder al Sistema"}
            </button>
          </div>
        </form>

        {/* Pie de página - solo mostrar para clientes */}
        {userType === "cliente" && (
          <div className="mt-6 text-center text-sm text-gray-600">
            ¿Nuevo en FITEC?{" "}
            <Link href="/register" className="font-medium text-yellow-400 hover:text-yellow-500">
              Regístrate aquí
            </Link>
          </div>
        )}

        {/* Mensaje para empleados */}
        {userType === "empleado" && (
          <div className="mt-6 text-center text-sm text-gray-600">
            Si tienes problemas para acceder, contacta al departamento de TI
          </div>
        )}
      </div>
    </div>
  )
}
