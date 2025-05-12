"use client"

import { useState, useEffect } from "react"
import { generateWeeklyEvents, getCurrentWeekStart } from "@/components/EventManager"
import { CalendarEvent } from "@/components/CalendarEvent"
import type { Event } from "@/components/EventManager"
import WeeklyCalendar  from "@/components/CalendarWeek";



export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Generar eventos para la semana actual
    const currentWeekStart = getCurrentWeekStart()
    const weeklyEvents = generateWeeklyEvents(currentWeekStart)

    // Simular carga de datos
    setTimeout(() => {
      setEvents(weeklyEvents)
      setIsLoading(false)
    }, 300)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto mb-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Calendario de Actividades</h1>
      <div className="bg-white rounded-xl shadow p-6">
        <WeeklyCalendar />

        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Próximos Eventos</h2>

          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse flex">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : events.length > 0 ? (
            <div className="space-y-4">
              {events.map((event) => (
                <CalendarEvent key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-6">No hay eventos programados para esta semana.</p>
          )}
        </div>
      </div>
    </div>
  )
}
