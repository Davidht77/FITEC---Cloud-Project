"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

// Tipo para las sedes
type Sede = {
  id: string
  name: string
  address: string
  phone: string
}

// Tipo para la respuesta de validación de invitación
type ValidateInvitationResponse = {
  isValid: boolean
  email: string
  invitationType: string
}

export default function EmployeeRegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const invitationToken = searchParams.get("token")

  // Estado para validación de token de invitación
  const [tokenValidated, setTokenValidated] = useState<boolean>(false)
  const [invitedEmail, setInvitedEmail] = useState<string>("")
  const [validatingToken, setValidatingToken] = useState<boolean>(false)
  const [tokenError, setTokenError] = useState<string | null>(null)

  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    age: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    sedeId: "",
    invitationToken: invitationToken || "",
    accepted: false,
  })

  // Estado para mostrar/ocultar contraseña
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Estado para sedes
  const [sedes, setSedes] = useState<Sede[]>([])
  const [loading, setLoading] = useState(true)
  const [registering, setRegistering] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // API base URL
  const API_BASE_URL = "http://54.83.178.156:8080"

  // Datos estáticos para sedes
  const sedesPorDefecto: Sede[] = [
    {
      id: "1",
      name: "Campus Central",
      address: "Av. Universitaria 1234",
      phone: "987654321",
    },
    {
      id: "2",
      name: "Campus Sur",
      address: "Calle Sur 456",
      phone: "998877665",
    },
  ]

  // Validar token de invitación si existe
  useEffect(() => {
    if (invitationToken && !tokenValidated) {
      validateInvitationToken(invitationToken)
    }
  }, [invitationToken])

  // Función para validar token de invitación
  const validateInvitationToken = async (token: string) => {
    setValidatingToken(true)
    setTokenError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/invitation/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })

      if (response.ok) {
        const data: ValidateInvitationResponse = await response.json()

        if (data.isValid) {
          setTokenValidated(true)
          setInvitedEmail(data.email)
          setFormData((prev) => ({ ...prev, email: data.email }))
        } else {
          setTokenError("El token de invitación no es válido o ha expirado")
        }
      } else {
        setTokenError("Error al validar el token de invitación")
      }
    } catch (error) {
      console.error("Error validando token:", error)
      setTokenError("Error de conexión al validar el token")
    } finally {
      setValidatingToken(false)
    }
  }

  // Cargar sedes
  useEffect(() => {
    const fetchSedes = async () => {
      try {
        setLoading(true)

        // Intentar cargar sedes
        try {
          const sedesResponse = await fetch(`${API_BASE_URL}/sede`)
          if (sedesResponse.ok) {
            const sedesData = await sedesResponse.json()
            setSedes(sedesData)
          } else {
            throw new Error("Error al cargar sedes")
          }
        } catch (error) {
          console.error("Usando sedes por defecto:", error)
          setSedes(sedesPorDefecto)
        }
      } catch (error) {
        console.error("Error al cargar datos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSedes()
  }, [API_BASE_URL])

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    })
  }

  // Renderizar mensaje de validación de token
  const renderTokenValidation = () => {
    if (validatingToken) {
      return <div className="text-sky-600 text-sm mt-2">Validando token de invitación...</div>
    }

    if (tokenError) {
      return <div className="text-red-600 text-sm mt-2">{tokenError}</div>
    }

    if (tokenValidated) {
      return <div className="text-green-600 text-sm mt-2">Token válido para {invitedEmail}</div>
    }

    return null
  }

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    // Validar que la edad sea un número
    const age = Number.parseInt(formData.age)
    if (isNaN(age) || age <= 0) {
      setError("Por favor ingresa una edad válida")
      return
    }

    // Validar que el token sea válido
    if (!tokenValidated && !formData.invitationToken) {
      setError("Se requiere un token de invitación válido para registrarse como empleado")
      return
    }

    // Validar que se haya seleccionado una sede
    if (!formData.sedeId) {
      setError("Por favor selecciona una sede")
      return
    }

    setRegistering(true)

    try {
      // Preparar datos para empleado
      const employeeData = {
        name: formData.name,
        lastName: formData.lastName,
        age: Number.parseInt(formData.age),
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        sedeId: formData.sedeId,
        invitationToken: formData.invitationToken,
      }

      console.log("Enviando datos de empleado:", employeeData)

      // Enviar datos al backend para empleado
      const response = await fetch(`${API_BASE_URL}/auth/register/employee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      })

      if (response.ok) {
        // Registro exitoso
        setSuccess(true)
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      } else {
        // Error en el registro
        const errorData = await response.json().catch(() => ({ message: "Error desconocido" }))
        setError(`Error en el registro: ${errorData.message || "Intenta nuevamente"}`)
      }
    } catch (error) {
      console.error("Error al registrar:", error)
      setError("Error al conectar con el servidor. Intenta nuevamente.")
    } finally {
      setRegistering(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-16 bg-sky-900 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        {/* Mensajes de éxito o error */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            ¡Registro exitoso! Redirigiendo al inicio de sesión...
          </div>
        )}

        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>}

        {/* Título */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-sky-900 mb-2">Forma parte del equipo FITEC</h1>
            <p className="text-gray-600 text-sm">Regístrate como empleado de FITEC</p>
          </div>
          <Link href="/register/client" className="text-sm text-yellow-500 hover:text-yellow-600 font-medium">
            ¿Eres cliente?
          </Link>
        </div>

        {/* Mensaje para empleados sin invitación */}
        {!invitationToken && !tokenValidated && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
            <p className="text-yellow-800 text-sm">
              Para registrarte como empleado necesitas una invitación. Por favor, contacta con el administrador o
              ingresa tu token de invitación.
            </p>
          </div>
        )}

        {/* Formulario */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Token de invitación */}
          {!tokenValidated && (
            <div>
              <label htmlFor="invitationToken" className="block text-sm font-medium text-gray-700">
                Token de invitación
              </label>
              <div className="flex gap-2">
                <input
                  id="invitationToken"
                  name="invitationToken"
                  type="text"
                  required
                  value={formData.invitationToken}
                  onChange={handleChange}
                  placeholder="Ingresa el token de invitación"
                  className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => validateInvitationToken(formData.invitationToken)}
                  disabled={!formData.invitationToken || validatingToken}
                  className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:bg-gray-300"
                >
                  Validar
                </button>
              </div>
              {renderTokenValidation()}
            </div>
          )}

          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingresa tu nombre"
              className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
            />
          </div>

          {/* Apellido */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Ingresa tu apellido"
              className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
            />
          </div>

          {/* Edad */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Edad
            </label>
            <input
              id="age"
              name="age"
              type="number"
              required
              min="1"
              max="120"
              value={formData.age}
              onChange={handleChange}
              placeholder="Ingresa tu edad"
              className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="Ingresa tu número de teléfono"
              className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingresa tu correo electrónico"
              disabled={tokenValidated}
              className={`appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm ${
                tokenValidated ? "bg-gray-100" : ""
              }`}
            />
            {tokenValidated && (
              <p className="text-xs text-gray-500 mt-1">
                El correo electrónico está vinculado a tu invitación y no puede ser modificado.
              </p>
            )}
          </div>

          {/* Contraseña */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="appearance-none block w-full px-4 py-3 pr-12 border border-gray-300 rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[65%] right-3 -translate-y-1/2 text-gray-500 hover:text-gray-800 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Confirmar Contraseña */}
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="appearance-none block w-full px-4 py-3 pr-12 border border-gray-300 rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-[65%] right-3 -translate-y-1/2 text-gray-500 hover:text-gray-800 focus:outline-none"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Sede */}
          <div>
            <label htmlFor="sedeId" className="block text-sm font-medium text-gray-700">
              Sede
            </label>
            <select
              id="sedeId"
              name="sedeId"
              required
              value={formData.sedeId}
              onChange={handleChange}
              className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
            >
              <option value="">Selecciona una sede</option>
              {sedes.map((sede) => (
                <option key={sede.id} value={sede.id}>
                  {sede.name}
                </option>
              ))}
            </select>
          </div>

          {/* Términos y condiciones */}
          <div className="flex items-center">
            <input
              id="accepted"
              name="accepted"
              type="checkbox"
              required
              checked={formData.accepted}
              onChange={handleChange}
              className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-gray-300 rounded"
            />
            <label htmlFor="accepted" className="ml-2 block text-sm text-gray-900">
              Acepto los{" "}
              <a href="#" className="font-medium text-yellow-400 hover:text-yellow-500">
                Términos y Condiciones
              </a>{" "}
              y la{" "}
              <a href="#" className="font-medium text-yellow-400 hover:text-yellow-500">
                Política de Privacidad
              </a>
            </label>
          </div>

          {/* Botón de registro */}
          <div>
            <button
              type="submit"
              disabled={registering || (!tokenValidated && !formData.invitationToken)}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:bg-yellow-200 disabled:cursor-not-allowed"
            >
              {registering ? "Procesando..." : "Registrarme como empleado"}
            </button>
          </div>
        </form>

        {/* Pie de página */}
        <div className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="font-medium text-yellow-400 hover:text-yellow-500">
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </div>
  )
}
