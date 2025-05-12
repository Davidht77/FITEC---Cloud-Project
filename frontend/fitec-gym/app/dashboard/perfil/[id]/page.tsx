"use client"

import { useState, useEffect } from "react"
import { User, Mail, Phone, Calendar, Edit, Camera, MessageSquare, AlertTriangle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Updated types to match the API response structure
type Plan = {
  planId: string | null
  name: string
  description: string
  price: number
  imagenUrlKey: string | null
}

type Client = {
  id: string
  name: string
  lastName: string
  age: number
  email: string
  phone: string
  plan: Plan | null
  // Additional UI fields that might not be in the API
  address?: string
  avatar?: string
}

export default function PerfilPage() {
  const [userData, setUserData] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("perfil")

  useEffect(() => {
    // Get the UUID from localStorage
    const id = localStorage.getItem("id")
    const token = localStorage.getItem("token")

    console.log("🔍 Debugging API connection:")
    console.log("- ID del usuario:", id)
    console.log("- Token disponible:", token ? "Sí (primeros 10 caracteres: " + token.substring(0, 10) + "...)" : "No")
    console.log("- URL de la API:", `http://54.83.178.156:8080/client/${id}`)

    if (!id) {
      console.error("❌ No se encontró ID de usuario en localStorage")
      setError("No se pudo identificar al usuario")
      setLoading(false)
      return
    }

    // Fetch client data from the API
    const fetchClientData = async () => {
      try {
        console.log("🔄 Iniciando petición a la API...")

        // Crear headers con el token de autorización
        const headers = new Headers()
        headers.set("Content-Type", "application/json")

        if (token) {
          headers.set("Authorization", `Bearer ${token}`)
          console.log("📤 Headers enviados:", {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.substring(0, 10)}...`,
          })
        } else {
          console.warn("⚠️ No hay token disponible para la autenticación")
        }

        // Realizar la petición
        const response = await fetch(`http://54.83.178.156:8080/client/${id}`, {
          method: "GET",
          headers: headers,
        })

        console.log("📥 Respuesta recibida:", {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok,
        })

        // Check if response is successful
        if (!response.ok) {
          const errorText = await response.text()
          console.error("❌ Error en la respuesta:", errorText)
          throw new Error(`Error HTTP: ${response.status} ${response.statusText}`)
        }

        // Parse and log the response data
        const data = await response.json()
        console.log("✅ Datos recibidos:", data)
        setUserData(data)
      } catch (err) {
        console.error("❌ Error completo:", err)
        setError(err instanceof Error ? err.message : "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    fetchClientData()
  }, [])

  // Fallback data if API request fails
  const dummyUser: Client = {
    id: "default",
    name: "Usuario",
    lastName: "Demo",
    age: 30,
    email: "usuario@ejemplo.com",
    phone: "+51 000 000 000",
    address: "Sin dirección",
    avatar: "/placeholder.svg",
    plan: {
      planId: null,
      name: "Plan Básico",
      description: "Acceso limitado al gimnasio",
      price: 9.99,
      imagenUrlKey: null,
    },
  }

  // Use API data if available, otherwise use dummy data
  const displayUser = userData || dummyUser

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Error message if needed */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}

      {/* Encabezado del perfil */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 h-32 md:h-48 relative">
          <button className="absolute bottom-2 right-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full text-white">
            <Camera className="w-5 h-5" />
          </button>
        </div>
        <div className="px-4 pb-4 pt-0 md:px-6 md:pb-6 flex flex-col md:flex-row gap-4 items-start md:items-end -mt-12">
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white bg-white overflow-hidden">
              <Image
                src={displayUser.avatar || "/placeholder.svg?height=128&width=128&query=person"}
                alt={`${displayUser.name} ${displayUser.lastName}`}
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-sky-100 hover:bg-sky-200 p-1.5 rounded-full text-sky-600 border-2 border-white">
              <Edit className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {displayUser.name} {displayUser.lastName}
            </h1>
            <p className="text-gray-600 flex items-center gap-1 mt-1">
              <Mail className="w-4 h-4" />
              {displayUser.email}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-sky-100 text-sky-800 px-2 py-1 rounded-full text-xs font-medium">
                ID: {displayUser.id.substring(0, 8)}...
              </span>
              {displayUser.plan && (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  {displayUser.plan.name}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2 self-end">
            <Link href={`/dashboard/perfil/edit`}>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition">
                Editar perfil
              </button>
            </Link>
          </div>
        </div>

        {/* Pestañas */}
        <div className="border-t border-gray-100 px-4 md:px-6">
          <div className="flex overflow-x-auto space-x-4">
            <button
              onClick={() => setActiveTab("perfil")}
              className={`py-3 px-1 font-medium text-sm border-b-2 whitespace-nowrap ${
                activeTab === "perfil" ? "border-sky-600 text-sky-600" : "border-transparent text-gray-600"
              }`}
            >
              Información Personal
            </button>
            <button
              onClick={() => setActiveTab("configuracion")}
              className={`py-3 px-1 font-medium text-sm border-b-2 whitespace-nowrap ${
                activeTab === "configuracion" ? "border-sky-600 text-sky-600" : "border-transparent text-gray-600"
              }`}
            >
              Configuración
            </button>
          </div>
        </div>
      </div>

      {/* Contenido de las pestañas */}
      {activeTab === "perfil" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Información personal */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-lg text-gray-900">Información Personal</h2>
              <button className="text-sky-600 hover:text-sky-800">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-sky-100 p-2 rounded-full text-sky-600">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Nombre completo</h3>
                  <p className="text-gray-900">
                    {displayUser.name} {displayUser.lastName}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-sky-100 p-2 rounded-full text-sky-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Correo electrónico</h3>
                  <p className="text-gray-900">{displayUser.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-sky-100 p-2 rounded-full text-sky-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
                  <p className="text-gray-900">{displayUser.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-sky-100 p-2 rounded-full text-sky-600">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Edad</h3>
                  <p className="text-gray-900">{displayUser.age} años</p>
                </div>
              </div>
              {displayUser.plan && (
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-100 p-2 rounded-full text-yellow-600">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Plan</h3>
                    <p className="text-gray-900">{displayUser.plan.name}</p>
                    <p className="text-sm text-gray-600">{displayUser.plan.description}</p>
                    <p className="text-sm font-medium text-sky-600 mt-1">${displayUser.plan.price}/mes</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Estadísticas */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-lg text-gray-900">Estadísticas</h2>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Visitas totales</span>
                  <span className="text-sm font-medium">45</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-sky-600 h-1.5 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Programas completados</span>
                  <span className="text-sm font-medium">8</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Clases asistidas</span>
                  <span className="text-sm font-medium">32</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: "80%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Puntos acumulados</span>
                  <span className="text-sm font-medium">1250</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>

              <Link
                href="/dashboard/estadisticas"
                className="mt-4 block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Ver Estadísticas Completas
              </Link>
            </div>
          </div>
        </div>
      )}

      {activeTab === "configuracion" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Configuración de la cuenta */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-lg text-gray-900">Configuración de la Cuenta</h2>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Edit className="w-5 h-5 text-gray-500" />
                  <div>
                    <h3 className="font-medium">Cambiar contraseña</h3>
                    <p className="text-sm text-gray-600">Actualiza tu contraseña de acceso</p>
                  </div>
                </div>
                <button className="text-sky-600 hover:text-sky-800">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-gray-500" />
                  <div>
                    <h3 className="font-medium">Notificaciones</h3>
                    <p className="text-sm text-gray-600">Gestiona tus preferencias de notificaciones</p>
                  </div>
                </div>
                <button className="text-sky-600 hover:text-sky-800">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Preferencias */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-lg text-gray-900">Preferencias</h2>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <h3 className="font-medium">Objetivos de entrenamiento</h3>
                    <p className="text-sm text-gray-600">Configura tus metas y objetivos</p>
                  </div>
                </div>
                <button className="text-sky-600 hover:text-sky-800">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sección de Feedback */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-lg text-gray-900">Tu opinión es importante</h2>
        </div>
        <div className="p-6 text-center">
          <MessageSquare className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">¿Cómo ha sido tu experiencia con FITEC?</h3>
          <p className="text-gray-600 mb-6">
            Nos encantaría conocer tu opinión sobre nuestros servicios. Tu feedback nos ayuda a mejorar.
          </p>
          <Link href="/dashboard/perfil/feedback">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg font-medium transition">
              Dejar mi opinión
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
