"use client"

import { useState, useEffect,use } from "react"
import { User, Mail, Phone, MapPin, Calendar, Edit, Camera } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// ✅ Primero definimos los tipos
type Plan = {
  id: string
  name: string
  description: string
}

type Client = {
  id: string
  name: string
  lastName: string
  email: string
  phone: string
  address: string
  avatar?: string
  plan: Plan
}

export default function PerfilPage(props: { params: Promise<{ id?: string }> }) {
  const { id } = use(props.params);

  const [userData, setUserData] = useState<Client | null>(null)
  const [activeTab, setActiveTab] = useState("perfil");


  useEffect(() => {
    if (id) {
      fetch(`/api/client/${id}`)
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((err) => {
          console.error("Error en el fetch, usando valores por defecto", err)
          setUserData(null)
        })
    } else {
      setUserData(null)
    }
  }, [id])

  // 🧪 Datos por defecto
  const dummyUser: Client = {
    id: "default",
    name: "Usuario Demo",
    lastName: "Ejemplo",
    email: "demo@ejemplo.com",
    phone: "+51 000 000 000",
    address: "Sin dirección",
    avatar: "/placeholder.svg",
    plan: {
      id: "plan0",
      name: "Plan Básico",
      description: "Acceso limitado al gimnasio"
    }
  }

  const displayUser = userData || dummyUser

  return (
    <div className="space-y-6">
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
                    src={displayUser.avatar || "/placeholder.svg"}
                    alt={displayUser.name}
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
                <h1 className="text-2xl font-bold text-gray-900">{displayUser.name} {displayUser.lastName}</h1>
              </div>
              <div className="flex gap-2 self-end">
              <Link href={`/dashboard/perfil/${id}/edit`}>
                <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition">
                  Editar perfil
                </button>
              </Link>
              </div>
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

              {/* Botón opcional que puedes dejar para el futuro */}
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
                <User className="w-5 h-5 text-sky-600 bg-sky-100 p-2 rounded-full" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Nombre completo</h3>
                  <p className="text-gray-900">{displayUser.name} {displayUser.lastName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-sky-600 bg-sky-100 p-2 rounded-full" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Correo electrónico</h3>
                  <p className="text-gray-900">{displayUser.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-sky-600 bg-sky-100 p-2 rounded-full" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
                  <p className="text-gray-900">{displayUser.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-600 bg-sky-100 p-2 rounded-full" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Dirección</h3>
                  <p className="text-gray-900">{displayUser.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-sky-600 bg-sky-100 p-2 rounded-full" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Plan</h3>
                  <p className="text-gray-900">{displayUser.plan?.name} - {displayUser.plan?.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-lg text-gray-900">Estadísticas</h2>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-sky-600 h-1.5 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
              <div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: "80%" }}></div>
                </div>
              
              <div>
                
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
    </div> // ⬅️ Esto cierra el contenedor principal
  );
} // ⬅️ Esto cierra el componente PerfilPage
