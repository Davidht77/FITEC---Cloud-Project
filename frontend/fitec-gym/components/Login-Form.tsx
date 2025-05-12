"use client"

import type React from "react"

import Link from "next/link"
import { Eye, EyeOff, User, Briefcase } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Función para decodificar un token JWT
function parseJwt(token: string) {
  try {
    // Dividir el token en sus partes (header, payload, signature)
    const base64Url = token.split(".")[1]
    // Reemplazar caracteres especiales y decodificar
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    // Decodificar la parte del payload
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    )
    // Convertir a objeto JSON
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error("Error al decodificar el token JWT:", error)
    return {}
  }
}

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<"cliente" | "empleado">("cliente")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Adjust the endpoint based on user type
      const endpoint =
        userType === "cliente"
          ? "http://3.85.78.6:8080/auth/login"
          : "http://3.85.78.6:8080/auth/employee/login"

      // Convertir userType de "cliente"/"empleado" a "client"/"employee" según Postman
      const apiUserType = userType === "cliente" ? "client" : "employee"

      // Crear el objeto de datos con el formato exacto de Postman
      const loginData = {
        email,
        password,
        userType: apiUserType,
      }

      console.log("Enviando datos de login:", loginData)

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })

      console.log("Respuesta status:", response.status)
      console.log("Respuesta statusText:", response.statusText)

      if (response.ok) {
        const data = await response.json()
        console.log("Respuesta completa:", data)

        // Guardar el token
        localStorage.setItem("token", data.token)
        // Set a cookie for the token that middleware can access
        document.cookie = `token=${data.token}; path=/; max-age=86400; SameSite=Strict`

        // Decodificar el token para obtener la información del usuario
        const decodedToken = parseJwt(data.token)
        console.log("Token decodificado:", decodedToken)

        // Extraer información del token decodificado
        // Nota: Ajusta estos nombres de campo según la estructura real de tu token
        localStorage.setItem("id", decodedToken.id || decodedToken.sub || "")
        localStorage.setItem("name", decodedToken.name || decodedToken.nombre || "")
        localStorage.setItem("role", decodedToken.role || decodedToken.rol || "")

        // Verificar lo que se guardó en localStorage
        console.log("Valores guardados en localStorage:", {
          token: localStorage.getItem("token"),
          id: localStorage.getItem("id"),
          name: localStorage.getItem("name"),
          role: localStorage.getItem("role"),
        })

        // Redirect based on user type
        if (userType === "cliente") {
          router.push("/dashboard")
        } else {
          router.push("/admin-dashboard")
        }
        console.log("Redirecting to:", userType === "cliente" ? "/dashboard" : "/admin-dashboard")
        console.log("Login successful, redirecting...")
        return
      } else {
        // Intentar obtener el mensaje de error
        try {
          const errorText = await response.text()
          console.log("Error response (text):", errorText)

          try {
            // Intentar parsear como JSON
            const errorData = JSON.parse(errorText)
            console.log("Error parsed as JSON:", errorData)
            alert(`❌ Error: ${errorData.message || errorData.error || "Credenciales inválidas"}`)
          } catch (jsonError) {
            // Si no es JSON, mostrar el texto tal cual
            alert(`❌ Error: ${errorText || "Credenciales inválidas"}`)
          }
        } catch (textError) {
          alert("❌ Credenciales inválidas")
        }
      }
    } catch (error) {
      console.error("❌ Error al contactar con el backend:", error)
      alert("❌ Error al conectar con el servidor")
    } finally {
      setLoading(false)
    }

    // ⛑️ Si falló el fetch o no se obtuvo login correcto: usar login por defecto solo si aplica
    if (userType === "cliente" && email === "test@fitec.com" && password === "123456") {
      console.log("🧪 Login por defecto ejecutado (cliente)")
      console.log("Redirecting to /dashboard with fake token")
      const fakeToken = "demo-token-123"
      const fakeId = "11"
      const fakeName = "Usuario Demo"
      const fakeRole = "cliente"

      localStorage.setItem("token", fakeToken)
      // Set a cookie for the token that middleware can access
      document.cookie = `token=${fakeToken}; path=/; max-age=86400; SameSite=Strict`
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
      // Set a cookie for the token that middleware can access
      document.cookie = `token=${fakeToken}; path=/; max-age=86400; SameSite=Strict`
      localStorage.setItem("id", fakeId)
      localStorage.setItem("name", fakeName)
      localStorage.setItem("role", fakeRole)
      router.push("/admin-dashboard")
      return
    }
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
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Procesando...
                </>
              ) : userType === "cliente" ? (
                "Iniciar Sesión"
              ) : (
                "Acceder al Sistema"
              )}
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
