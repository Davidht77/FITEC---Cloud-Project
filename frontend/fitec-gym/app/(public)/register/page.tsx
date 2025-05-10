"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Eye, EyeOff, User, Briefcase } from "lucide-react"
import Link from "next/link"

// Tipo para los planes
type Plan = {
  id: string
  name: string
  price: number
}

// Tipo para las sedes
type Sede = {
  id: string
  name: string
  address: string
  phone: string
}

export default function RegisterPage() {
  // Estado para el tipo de usuario
  const [userType, setUserType] = useState<"cliente" | "empleado">("cliente")

  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    // Campos comunes
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    sedeId: "",
    // Campos específicos de cliente
    planId: "",
    // Campos específicos de empleado
    salary: "",
    // Términos y condiciones
    accepted: false,
  })

  // Estado para mostrar/ocultar contraseña
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Estado para planes y sedes
  const [planes, setPlanes] = useState<Plan[]>([])
  const [sedes, setSedes] = useState<Sede[]>([])
  const [loading, setLoading] = useState(true)

  // Datos estáticos para planes y sedes
  const planesPorDefecto: Plan[] = [
    { id: "1", name: "Plan Básico", price: 50 },
    { id: "2", name: "Plan Premium", price: 80 },
    { id: "3", name: "Plan VIP", price: 120 },
  ]

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

  // Cargar planes y sedes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Intentar cargar sedes
        try {
          const sedesResponse = await fetch("http://localhost:8080/sede")
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

        // Intentar cargar planes (solo para clientes)
        try {
          const planesResponse = await fetch("http://localhost:8080/plan")
          if (planesResponse.ok) {
            const planesData = await planesResponse.json()
            setPlanes(planesData)
          } else {
            throw new Error("Error al cargar planes")
          }
        } catch (error) {
          console.error("Usando planes por defecto:", error)
          setPlanes(planesPorDefecto)
        }
      } catch (error) {
        console.error("Error al cargar datos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    })
  }

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }

    try {
      // Preparar datos según el tipo de usuario
      const endpoint =
        userType === "cliente"
          ? "http://localhost:8080/api/auth/register/client"
          : "http://localhost:8080/api/auth/register/employee"

      const requestData =
        userType === "cliente"
          ? {
              name: formData.name,
              lastName: formData.lastName,
              phone: formData.phone,
              email: formData.email,
              password: formData.password,
              planId: formData.planId,
              sedeId: formData.sedeId,
            }
          : {
              name: formData.name,
              lastName: formData.lastName,
              phone: formData.phone,
              email: formData.email,
              password: formData.password,
              salary: Number.parseFloat(formData.salary),
              sedeId: formData.sedeId,
            }

      // Enviar datos al backend
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })

      if (response.ok) {
        // Registro exitoso
        alert(`Registro de ${userType} exitoso`)
        window.location.href = "/login"
      } else {
        // Error en el registro
        const errorData = await response.json()
        alert(`Error en el registro: ${errorData.message || "Intenta nuevamente"}`)
      }
    } catch (error) {
      console.error("Error al registrar:", error)
      alert("Error al conectar con el servidor. Intenta nuevamente.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-16 bg-sky-900 px-4">
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
        <h1 className="text-3xl font-bold text-sky-900 mb-5 text-left">
          {userType === "cliente" ? "Únete a FITEC" : "Forma parte del equipo FITEC"}
        </h1>
        <p className="text-left text-gray-600 mb-5 text-sm">
          {userType === "cliente"
            ? "Comienza tu camino hacia una vida más saludable"
            : "Regístrate como empleado de FITEC"}
        </p>

        {/* Formulario */}
        <form className="space-y-4" onSubmit={handleSubmit}>
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
              className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
            />
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

          {/* Campos específicos según el tipo de usuario */}
          {userType === "cliente" ? (
            <div>
              <label htmlFor="planId" className="block text-sm font-medium text-gray-700">
                Plan
              </label>
              <select
                id="planId"
                name="planId"
                required
                value={formData.planId}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
              >
                <option value="">Selecciona un plan</option>
                {planes.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} - ${plan.price}/mes
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                Salario
              </label>
              <input
                id="salary"
                name="salary"
                type="number"
                required
                value={formData.salary}
                onChange={handleChange}
                placeholder="Ingresa el salario"
                className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
              />
            </div>
          )}

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
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
            >
              {userType === "cliente" ? "Crear cuenta" : "Registrarme como empleado"}
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
