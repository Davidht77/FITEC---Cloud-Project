"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { generateWeeklyEvents, getCurrentWeekStart } from "./EventManager"
import { CalendarEvent } from "./CalendarEvent"
import type { Event } from "./EventManager"

export default function WeeklyCalendar() {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getCurrentWeekStart())
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Generar eventos cuando cambia la semana
  useEffect(() => {
    setIsLoading(true)

    // Simular una carga de datos
    setTimeout(() => {
      const newEvents = generateWeeklyEvents(currentWeekStart)
      setEvents(newEvents)
      setIsLoading(false)
    }, 300)
  }, [currentWeekStart])

  // Navegar a la semana anterior
  const goToPreviousWeek = () => {
    const newWeekStart = new Date(currentWeekStart)
    newWeekStart.setDate(newWeekStart.getDate() - 7)
    setCurrentWeekStart(newWeekStart)
  }

  // Navegar a la semana siguiente
  const goToNextWeek = () => {
    const newWeekStart = new Date(currentWeekStart)
    newWeekStart.setDate(newWeekStart.getDate() + 7)
    setCurrentWeekStart(newWeekStart)
  }

  // Ir a la semana actual
  const goToCurrentWeek = () => {
    setCurrentWeekStart(getCurrentWeekStart())
  }

  // Generar los días de la semana
  const weekDays = []
  const dayNames = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"]

  for (let i = 0; i < 7; i++) {
    const day = new Date(currentWeekStart)
    day.setDate(day.getDate() + i)
    weekDays.push(day)
  }

  // Verificar si un día es hoy
  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  // Obtener eventos para un día específico
  const getEventsForDay = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    )
  }

  // Obtener el mes y año actual para mostrar en el encabezado
  const currentMonth = new Intl.DateTimeFormat("es-ES", { month: "long" }).format(currentWeekStart)
  const currentYear = currentWeekStart.getFullYear()

  return (
    <div className="w-full">
      {/* Encabezado del calendario */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="text-lg font-medium">
            {currentMonth} de {currentYear}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={goToCurrentWeek}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
          >
            Hoy
          </button>
          <button onClick={goToPreviousWeek} className="p-1 rounded hover:bg-gray-100" aria-label="Semana anterior">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={goToNextWeek} className="p-1 rounded hover:bg-gray-100" aria-label="Semana siguiente">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendario semanal */}
      <div className="border rounded-lg overflow-hidden">
        {/* Encabezados de días */}
        <div className="grid grid-cols-7 border-b">
          {dayNames.map((name, index) => (
            <div key={index} className="py-2 text-center text-sm font-medium text-gray-500">
              {name}
            </div>
          ))}
        </div>

        {/* Números de días */}
        <div className="grid grid-cols-7 border-b">
          {weekDays.map((day, index) => (
            <div
              key={index}
              className={`py-2 text-center ${isToday(day) ? "bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto" : ""}`}
            >
              {day.getDate()}
            </div>
          ))}
        </div>

        {/* Celdas de eventos */}
        <div className="grid grid-cols-7">
          {weekDays.map((day, index) => {
            const dayEvents = getEventsForDay(day)
            return (
              <div
                key={index}
                className={`min-h-24 p-1 border-r last:border-r-0 ${
                  index % 7 === 0 || index % 7 === 6 ? "bg-gray-50" : ""
                } ${isToday(day) ? "bg-blue-50" : ""}`}
              >
                {isLoading ? (
                  <div className="animate-pulse h-6 bg-gray-200 rounded mt-1"></div>
                ) : (
                  <div className="space-y-1">
                    {dayEvents.map((event) => (
                      <CalendarEvent key={event.id} event={event} compact />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
