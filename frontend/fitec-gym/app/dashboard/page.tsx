"use client"

import { useEffect, useState } from "react"
import GymCard from "@/components/GymCard"
import ProgramSlider from "@/components/ProgramSlider"
import FeedbackCarousel from "@/components/feedback-carousel"
import { Dumbbell, Calendar, Trophy, ArrowRight } from "lucide-react"
import Link from "next/link"

type Sede = {
  id: string
  name: string
  address: string
  phone: string
}

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

export default function DashboardPage() {
  const [gymsData, setGymsData] = useState<Sede[]>([])

  useEffect(() => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000) // ⏱ cancela después de 5 segundos

  const fetchSedes = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("No se encontró el token")

      const res = await fetch("http://54.83.178.156:8080/sede", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      })

      if (!res.ok) throw new Error("Falló la API")

      const data = await res.json()

      const formateadas = data.map((sede: any) => ({
        id: sede.id,
        name: sede.name,
        location: sede.address,
        image_url: sede.image_url || "/placeholder.svg",
        currentUsers: sede.usuariosActuales || 0,
        maxCapacity: sede.capacidad || 100,
        isOpen: true,
        hours: "6:00 - 22:00",
      }))

      setGymsData(formateadas)
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.warn("⏰ Timeout al esperar la respuesta del backend")
      } else {
        console.error("⚠️ Usando sedes por defecto:", error)
        setGymsData(sedesPorDefecto)
      }
    } finally {
      clearTimeout(timeoutId) // Limpia el timeout
    }
  }

  fetchSedes()

  return () => {
    controller.abort()
    clearTimeout(timeoutId)
  }
}, [])




  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Columna principal */}
      <div className="w-full lg:w-2/3 space-y-6">
        {/* Bienvenida */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-xl p-6 text-white shadow-sm">
          <h1 className="text-2xl font-bold">¡Bienvenido a FITEC!</h1>
          <p className="mt-2 opacity-90">
            Tu plataforma de fitness universitario. Explora nuestras sedes, programas y eventos.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/dashboard/programs"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Dumbbell className="w-5 h-5" />
              <span>Explorar Programas</span>
            </Link>
            <Link
              href="/dashboard/calendar"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              <span>Ver Calendario</span>
            </Link>
          </div>
        </div>

        {/* Sedes de Gimnasio */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Nuestras Sedes</h2>
            <Link
              href="/dashboard/sedes"
              className="text-sky-600 hover:text-sky-800 text-sm font-medium flex items-center gap-1"
            >
              Ver todas <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gymsData.map((sede) => (
              <GymCard key={sede.id} sede={sede} />
            ))}
          </div>
        </div>

        {/* Próximos Eventos */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Próximos Eventos</h2>
            <Link
              href="/dashboard/eventos"
              className="text-sky-600 hover:text-sky-800 text-sm font-medium flex items-center gap-1"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <h3 className="font-medium">Competencia de CrossFit</h3>
              </div>
              <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">En 3 días</span>
            </div>

            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-500" />
                <h3 className="font-medium">Clase Especial de Yoga</h3>
              </div>
              <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Mañana</span>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-green-500" />
                <h3 className="font-medium">Taller de Nutrición Deportiva</h3>
              </div>
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Próxima semana</span>
            </div>
          </div>
        </div>
      </div>

      {/* Columna lateral */}
      <div className="w-full lg:w-1/3 space-y-6">
        {/* Programas Recomendados */}
        <ProgramSlider />

        {/* Comentarios de usuarios (reemplaza "Tu Actividad") */}
        <FeedbackCarousel />
      </div>
    </div>
  )
}