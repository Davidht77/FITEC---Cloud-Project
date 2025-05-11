"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Datos de ejemplo para los comentarios
const feedbackData = [
  {
    id: 1,
    name: "María López",
    comment:
      "¡Increíble! Los programas son muy efectivos y los entrenadores muy profesionales. He notado grandes cambios en poco tiempo.",
    rating: 5,
  },
  {
    id: 2,
    name: "Juan Pérez",
    comment:
      "Las instalaciones son de primera y siempre están limpias. El ambiente es muy motivador y el personal muy amable.",
    rating: 4,
  },
  {
    id: 3,
    name: "Ana García",
    comment:
      "Me encanta la variedad de clases y la flexibilidad de horarios. Siempre encuentro algo que se adapta a mis necesidades.",
    rating: 5,
  },
]

export default function FeedbackCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbackData.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + feedbackData.length) % feedbackData.length)
  }

  const currentFeedback = feedbackData[currentIndex]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h2 className="font-bold text-lg text-gray-900">Comentarios de Usuarios</h2>
      </div>

      <div className="relative p-4">
        <p className="text-sm text-gray-600 italic">{`"${currentFeedback.comment}"`}</p>
        <p className="text-gray-800 font-medium mt-2">- {currentFeedback.name}</p>

        {/* Controles del carousel */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow-sm"
          aria-label="Comentario anterior"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow-sm"
          aria-label="Comentario siguiente"
        >
          <ChevronRight className="w-5 h-5 text-gray-800" />
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-2 right-2 flex gap-1">
          {feedbackData.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full ${index === currentIndex ? "bg-sky-600" : "bg-gray-300"}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
