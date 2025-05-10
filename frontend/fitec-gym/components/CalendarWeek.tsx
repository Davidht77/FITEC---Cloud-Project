"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, CalendarIcon, Trophy, Star, Gift } from "lucide-react"

// Tipo para eventos estáticos
type EventType = {
  date: Date
  title: string
  type: "concurso" | "promocion" | "evento"
  color: string
}

export default function WeeklyCalendar() {
  // Estado para la fecha actual y la semana
  const [currentDate, setCurrentDate] = useState(new Date())
  const [weekDays, setWeekDays] = useState<Date[]>([])

  // Eventos estáticos de ejemplo
  const staticEvents: EventType[] = [
    {
      date: new Date(2025, 4, 8), // 8 de mayo de 2025
      title: "Competencia CrossFit",
      type: "concurso",
      color: "bg-yellow-100 text-yellow-800 border-yellow-300",
    },
    {
      date: new Date(2025, 4, 10), // 10 de mayo de 2025
      title: "2x1 en Membresías",
      type: "promocion",
      color: "bg-green-100 text-green-800 border-green-300",
    },
    {
      date: new Date(2025, 4, 11), // 11 de mayo de 2025
      title: "Clase Especial Yoga",
      type: "evento",
      color: "bg-purple-100 text-purple-800 border-purple-300",
    },
  ]

  // Función para obtener los días de la semana actual
  const getWeekDays = (date: Date) => {
    const day = date.getDay() // 0 = domingo, 1 = lunes, etc.
    const diff = date.getDate() - day // Ajustar al domingo

    // Crear array con los 7 días de la semana
    return Array(7)
      .fill(null)
      .map((_, i) => {
        const d = new Date(date)
        d.setDate(diff + i)
        return d
      })
  }

  // Función para formatear la fecha en español
  const formatDay = (date: Date) => {
    return date.toLocaleDateString("es-ES", { weekday: "short" }).toUpperCase()
  }

  // Función para obtener eventos de un día específico
  const getEventsForDay = (date: Date) => {
    return staticEvents.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    )
  }

  // Función para navegar a la semana anterior
  const prevWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  // Función para navegar a la semana siguiente
  const nextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  // Función para ir a la semana actual
  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Actualizar los días de la semana cuando cambia la fecha actual
  useEffect(() => {
    setWeekDays(getWeekDays(currentDate))
  }, [currentDate])

  // Formatear el rango de fechas para el encabezado
  const formatDateRange = () => {
    const firstDay = weekDays[0]
    const lastDay = weekDays[6]

    const firstMonth = firstDay?.toLocaleDateString("es-ES", { month: "long" })
    const lastMonth = lastDay?.toLocaleDateString("es-ES", { month: "long" })

    const firstYear = firstDay?.getFullYear()
    const lastYear = lastDay?.getFullYear()

    if (firstMonth === lastMonth && firstYear === lastYear) {
      return `${firstMonth} de ${firstYear}`
    } else if (firstYear === lastYear) {
      return `${firstMonth} - ${lastMonth} de ${firstYear}`
    } else {
      return `${firstMonth} ${firstYear} - ${lastMonth} ${lastYear}`
    }
  }

  // Verificar si una fecha es hoy
  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  // Obtener el icono según el tipo de evento
  const getEventIcon = (type: string) => {
    switch (type) {
      case "concurso":
        return <Trophy className="w-4 h-4" />
      case "promocion":
        return <Gift className="w-4 h-4" />
      case "evento":
        return <Star className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Encabezado del calendario */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center">
          <CalendarIcon className="w-5 h-5 text-sky-600 mr-2" />
          <h2 className="text-lg font-bold text-gray-900">{formatDateRange()}</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={goToToday} className="px-3 py-1 text-sm bg-sky-100 text-sky-700 rounded-md hover:bg-sky-200">
            Hoy
          </button>
          <button onClick={prevWeek} className="p-1 rounded-full hover:bg-gray-100" aria-label="Semana anterior">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={nextWeek} className="p-1 rounded-full hover:bg-gray-100" aria-label="Semana siguiente">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="text-center py-2 border-r last:border-r-0 border-gray-200 font-medium text-xs text-gray-600"
          >
            {formatDay(day)}
          </div>
        ))}
      </div>

      {/* Fechas */}
      <div className="grid grid-cols-7 h-14 border-b border-gray-200">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center border-r last:border-r-0 border-gray-200 relative ${
              isToday(day) ? "bg-sky-50" : ""
            }`}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 text-sm font-medium ${
                isToday(day)
                  ? "bg-sky-600 text-white rounded-full"
                  : day.getDay() === 0 || day.getDay() === 6
                    ? "text-red-500"
                    : "text-gray-700"
              }`}
            >
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Eventos */}
      <div className="grid grid-cols-7 min-h-[120px]">
        {weekDays.map((day, index) => {
          const dayEvents = getEventsForDay(day)

          return (
            <div
              key={index}
              className={`p-1 border-r last:border-r-0 border-gray-200 ${isToday(day) ? "bg-sky-50" : ""}`}
            >
              {dayEvents.map((event, eventIndex) => (
                <div key={eventIndex} className={`mb-1 p-1 text-xs rounded border ${event.color} flex items-center`}>
                  {getEventIcon(event.type)}
                  <span className="ml-1 truncate">{event.title}</span>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
