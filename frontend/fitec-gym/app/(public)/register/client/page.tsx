"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ClientRegisterPage() {
  const router = useRouter()

  // Log that this page was loaded
  console.log("Register client page loaded")

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    age: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    planName: "",
    accepted: false,
  })

  // State for showing/hiding password
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // State for registration
  const [registering, setRegistering] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // API base URL
  const API_BASE_URL = "http://3.85.78.6:8080"

  // Default plans - just names without prices or IDs
  const planes = ["Plan Basico", "Plan Plus", "Plan Premium"]

  // Handle changes in form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    })
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    // Validate that passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    // Validate that age is a number
    const age = Number.parseInt(formData.age)
    if (isNaN(age) || age <= 0) {
      setError("Por favor ingresa una edad válida")
      return
    }

    // Validate that a plan has been selected
    if (!formData.planName) {
      setError("Por favor selecciona un plan")
      return
    }

    setRegistering(true)

    try {
      // Prepare client data according to the format that works in Postman
      const clientData = {
        name: formData.name,
        lastName: formData.lastName,
        age: Number.parseInt(formData.age),
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        planName: formData.planName,
        userType: "client", // Add userType as "client" according to Postman
      }

      console.log("Sending client data:", clientData)

      // Send data to backend for client
      const response = await fetch(`${API_BASE_URL}/auth/register/client`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientData),
      })

      console.log("Response status:", response.status)
      console.log("Response statusText:", response.statusText)

      if (response.ok) {
        // Successful registration
        setSuccess(true)
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      } else {
        // Error in registration
        try {
          const errorText = await response.text()
          console.log("Error response (text):", errorText)

          try {
            // Try to parse as JSON
            const errorData = JSON.parse(errorText)
            console.log("Error parsed as JSON:", errorData)

            if (errorData && typeof errorData === "object") {
              if (errorData.message) {
                setError(`Error en el registro: ${errorData.message}`)
              } else if (errorData.error) {
                setError(`Error en el registro: ${errorData.error}`)
              } else {
                setError(`Error en el registro: ${response.statusText || "Internal Server Error"}`)
              }
            } else {
              setError(`Error en el registro: ${response.statusText || "Internal Server Error"}`)
            }
          } catch (jsonError) {
            // If it's not JSON, show the text as is
            setError(`Error en el registro: ${errorText || response.statusText || "Internal Server Error"}`)
          }
        } catch (textError) {
          // If the text cannot be obtained
          setError(`Error en el registro: ${response.statusText || "Internal Server Error"}`)
        }
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
        {/* Success or error messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            ¡Registro exitoso! Redirigiendo al inicio de sesión...
          </div>
        )}

        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>}

        {/* Title */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-sky-900 mb-2">Únete a FITEC</h1>
            <p className="text-gray-600 text-sm">Comienza tu camino hacia una vida más saludable</p>
          </div>
          <Link href="/register/employee" className="text-sm text-yellow-500 hover:text-yellow-600 font-medium">
            ¿Eres empleado?
          </Link>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
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

          {/* Last Name */}
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

          {/* Age */}
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

          {/* Phone */}
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
              className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
            />
          </div>

          {/* Password */}
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

          {/* Confirm Password */}
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

          {/* Plan */}
          <div>
            <label htmlFor="planName" className="block text-sm font-medium text-gray-700">
              Plan
            </label>
            <select
              id="planName"
              name="planName"
              required
              value={formData.planName}
              onChange={handleChange}
              className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
            >
              <option value="">Selecciona un plan</option>
              {planes.map((plan) => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>
          </div>

          {/* Terms and conditions */}
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

          {/* Registration button */}
          <div>
            <button
              type="submit"
              disabled={registering}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:bg-yellow-200 disabled:cursor-not-allowed"
            >
              {registering ? "Procesando..." : "Crear cuenta"}
            </button>
          </div>
        </form>

        {/* Footer */}
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
