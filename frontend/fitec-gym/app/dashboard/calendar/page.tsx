"use client"

import WeeklyCalendar from "@/components/CalendarWeek"
import { Trophy, Gift, Star } from "lucide-react"

export default function CalendarPage() {
  return (
    <div className="w-full max-w-6xl mx-auto mb-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Calendario de Actividades</h1>
      <div className="bg-white rounded-xl shadow p-6">
        <WeeklyCalendar />

        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Próximos Eventos</h2>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Competencia CrossFit</h3>
                <p className="text-sm text-gray-500">8 de mayo, 2025 • Campus Central</p>
                <p className="mt-1 text-sm text-gray-600">
                  Demuestra tus habilidades en nuestra competencia mensual de CrossFit. Grandes premios para los
                  ganadores.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <Gift className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">2x1 en Membresías</h3>
                <p className="text-sm text-gray-500">10 de mayo, 2025 • Todas las sedes</p>
                <p className="mt-1 text-sm text-gray-600">
                  Aprovecha nuestra promoción especial de fin de semestre. Trae a un amigo y ambos obtienen un mes
                  gratis.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Clase Especial Yoga</h3>
                <p className="text-sm text-gray-500">11 de mayo, 2025 • Campus Sur</p>
                <p className="mt-1 text-sm text-gray-600">
                  Sesión especial de yoga para principiantes. Aprende las posturas básicas y técnicas de respiración.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
