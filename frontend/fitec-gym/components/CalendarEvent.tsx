import type React from "react"
import { Trophy, Gift, Star, Bike, Apple, Heart, Dumbbell, BookOpen, ShoppingBag, Activity } from "lucide-react"
import type { Event } from "./EventManager"

// Mapeo de nombres de iconos a componentes de Lucide
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Trophy: (props) => <Trophy {...props} />,
  Gift: (props) => <Gift {...props} />,
  Star: (props) => <Star {...props} />,
  Bike: (props) => <Bike {...props} />,
  Apple: (props) => <Apple {...props} />,
  Heart: (props) => <Heart {...props} />,
  Dumbbell: (props) => <Dumbbell {...props} />,
  BookOpen: (props) => <BookOpen {...props} />,
  ShoppingBag: (props) => <ShoppingBag {...props} />,
  Activity: (props) => <Activity {...props} />,
}

// Mapeo de colores a clases de Tailwind
const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
  yellow: { bg: "bg-yellow-100", text: "text-yellow-800", icon: "text-yellow-600" },
  green: { bg: "bg-green-100", text: "text-green-800", icon: "text-green-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-800", icon: "text-purple-600" },
  red: { bg: "bg-red-100", text: "text-red-800", icon: "text-red-600" },
  blue: { bg: "bg-blue-100", text: "text-blue-800", icon: "text-blue-600" },
  pink: { bg: "bg-pink-100", text: "text-pink-800", icon: "text-pink-600" },
  orange: { bg: "bg-orange-100", text: "text-orange-800", icon: "text-orange-600" },
  indigo: { bg: "bg-indigo-100", text: "text-indigo-800", icon: "text-indigo-600" },
  cyan: { bg: "bg-cyan-100", text: "text-cyan-800", icon: "text-cyan-600" },
}

interface CalendarEventProps {
  event: Event
  compact?: boolean
}

export const CalendarEvent: React.FC<CalendarEventProps> = ({ event, compact = false }) => {
  const colors = colorMap[event.color] || colorMap.blue

  // Renderizar el icono correcto
  const IconComponent = iconMap[event.icon] || iconMap.Star

  // Versión compacta para mostrar en el calendario
  if (compact) {
    return (
      <div
        className={`${colors.bg} ${colors.text} p-1 rounded text-xs flex items-center ${
          event.isCompleted ? "opacity-60" : ""
        }`}
      >
        <span className={`mr-1 ${colors.icon}`}>
          <IconComponent className="w-3 h-3" />
        </span>
        <span className="truncate">{event.title}</span>
      </div>
    )
  }

  // Versión completa para la lista de eventos
  return (
    <div className="flex items-start mb-6">
      <div className={`flex-shrink-0 w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mr-4`}>
        <span className={colors.icon}>
          <IconComponent className="w-6 h-6" />
        </span>
      </div>
      <div>
        <div className="flex items-center">
          <h3 className="font-medium text-gray-900">{event.title}</h3>
          {event.isCompleted && (
            <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">Finalizado</span>
          )}
          {!event.isCompleted && (
            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Próximamente</span>
          )}
        </div>
        <p className="text-sm text-gray-500">
          {formatDate(event.date)} • {event.location}
        </p>
        <p className="mt-1 text-sm text-gray-600">{event.description}</p>
      </div>
    </div>
  )
}

// Función auxiliar para formatear la fecha
function formatDate(date: Date): string {
  const day = date.getDate()
  const monthNames = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ]
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()

  return `${day} de ${month}, ${year}`
}
    