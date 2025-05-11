// Tipos de eventos disponibles
export type EventType = {
  id: number
  title: string
  description: string
  icon: string // Nombre del icono de Lucide
  color: string // Color del evento (para el fondo)
  location: string[]
}

// Definición de un evento específico
export type Event = {
  id: string
  typeId: number
  title: string
  description: string
  date: Date
  location: string
  icon: string
  color: string
  isCompleted: boolean
}

// Pool de tipos de eventos posibles
export const eventTypes: EventType[] = [
  {
    id: 1,
    title: "Competencia CrossFit",
    description:
      "Demuestra tus habilidades en nuestra competencia mensual de CrossFit. Grandes premios para los ganadores.",
    icon: "Trophy",
    color: "yellow",
    location: ["Campus Central", "Campus Sur", "Campus Este"],
  },
  {
    id: 2,
    title: "2x1 en Membresías",
    description:
      "Aprovecha nuestra promoción especial de fin de semestre. Trae a un amigo y ambos obtienen un mes gratis.",
    icon: "Gift",
    color: "green",
    location: ["Todas las sedes"],
  },
  {
    id: 3,
    title: "Clase Especial Yoga",
    description: "Sesión especial de yoga para principiantes. Aprende las posturas básicas y técnicas de respiración.",
    icon: "Star",
    color: "purple",
    location: ["Campus Sur", "Campus Central"],
  },
  {
    id: 4,
    title: "Maratón de Spinning",
    description: "Tres horas de spinning intenso con los mejores instructores. ¡Pon a prueba tu resistencia!",
    icon: "Bike",
    color: "red",
    location: ["Campus Central", "Campus Norte"],
  },
  {
    id: 5,
    title: "Evaluación Nutricional",
    description: "Consulta gratuita con nuestros nutricionistas. Obtén un plan personalizado según tus objetivos.",
    icon: "Apple",
    color: "green",
    location: ["Campus Central", "Campus Sur", "Campus Este"],
  },
  {
    id: 6,
    title: "Taller de Meditación",
    description: "Aprende técnicas de meditación para reducir el estrés y mejorar tu concentración.",
    icon: "Heart",
    color: "pink",
    location: ["Campus Sur", "Campus Este"],
  },
  {
    id: 7,
    title: "Reto de Fuerza",
    description: "Compite en nuestro reto mensual de fuerza. Categorías para todos los niveles.",
    icon: "Dumbbell",
    color: "blue",
    location: ["Campus Central", "Campus Norte"],
  },
  {
    id: 8,
    title: "Charla de Nutrición Deportiva",
    description: "Conferencia sobre alimentación para deportistas. Aprende a optimizar tu rendimiento.",
    icon: "BookOpen",
    color: "orange",
    location: ["Campus Central", "Campus Sur"],
  },
  {
    id: 9,
    title: "Descuento en Suplementos",
    description: "20% de descuento en todos los suplementos de nuestra tienda. Válido solo por este día.",
    icon: "ShoppingBag",
    color: "indigo",
    location: ["Todas las sedes"],
  },
  {
    id: 10,
    title: "Entrenamiento Funcional",
    description: "Clase especial de entrenamiento funcional para todos los niveles.",
    icon: "Activity",
    color: "cyan",
    location: ["Campus Central", "Campus Sur", "Campus Norte", "Campus Este"],
  },
]

// Función para generar eventos aleatorios para una semana específica
export function generateWeeklyEvents(weekStartDate: Date): Event[] {
  // Crear una copia de los tipos de eventos para seleccionar aleatoriamente
  const availableTypes = [...eventTypes]
  const events: Event[] = []
  const today = new Date()

  // Seleccionar 3 tipos de eventos aleatorios
  for (let i = 0; i < 3; i++) {
    if (availableTypes.length === 0) break

    // Seleccionar un tipo aleatorio
    const randomIndex = Math.floor(Math.random() * availableTypes.length)
    const selectedType = availableTypes[randomIndex]

    // Eliminar el tipo seleccionado para evitar duplicados
    availableTypes.splice(randomIndex, 1)

    // Generar una fecha aleatoria dentro de la semana
    const dayOffset = Math.floor(Math.random() * 7) // 0-6 días
    const eventDate = new Date(weekStartDate)
    eventDate.setDate(eventDate.getDate() + dayOffset)

    // Seleccionar una ubicación aleatoria
    const locationIndex = Math.floor(Math.random() * selectedType.location.length)
    const selectedLocation = selectedType.location[locationIndex]

    // Determinar si el evento ya ha pasado
    const isCompleted = eventDate < today

    // Crear el evento
    events.push({
      id: `${selectedType.id}-${eventDate.getTime()}`,
      typeId: selectedType.id,
      title: selectedType.title,
      description: selectedType.description,
      date: eventDate,
      location: selectedLocation,
      icon: selectedType.icon,
      color: selectedType.color,
      isCompleted,
    })
  }

  // Ordenar eventos por fecha
  return events.sort((a, b) => a.date.getTime() - b.date.getTime())
}

// Función para obtener el primer día de la semana actual
export function getCurrentWeekStart(): Date {
  const today = new Date()
  const dayOfWeek = today.getDay() // 0 = domingo, 1 = lunes, etc.
  const diff = today.getDate() - dayOfWeek

  const weekStart = new Date(today)
  weekStart.setDate(diff)
  weekStart.setHours(0, 0, 0, 0)

  return weekStart
}

// Función para formatear la fecha en español
export function formatDate(date: Date): string {
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
