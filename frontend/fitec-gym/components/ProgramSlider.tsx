"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Clock, Flame } from "lucide-react"

// Datos de ejemplo para los programas
const programsData = [
  {
    id: "1",
    title: "HIIT Express",
    duration: "30 min",
    calories: "300 kcal",
    level: "Intermedio",
    image: "/placeholder.svg?height=150&width=300",
    color: "from-orange-400 to-red-500",
  },
  {
    id: "2",
    title: "Yoga para Principiantes",
    duration: "45 min",
    calories: "150 kcal",
    level: "Principiante",
    image: "/placeholder.svg?height=150&width=300",
    color: "from-blue-400 to-indigo-500",
  },
  {
    id: "3",
    title: "Fuerza Total",
    duration: "60 min",
    calories: "450 kcal",
    level: "Avanzado",
    image: "/placeholder.svg?height=150&width=300",
    color: "from-green-400 to-emerald-500",
  },
]

export default function ProgramSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === programsData.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? programsData.length - 1 : prevIndex - 1))
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h2 className="font-bold text-lg text-gray-900">Programas Recomendados</h2>
        <p className="text-sm text-gray-500 mt-1">Basados en tus preferencias y nivel</p>
      </div>

      <div className="relative">
        {/* Controles de navegación */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md hover:bg-white transition-colors"
          aria-label="Programa anterior"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md hover:bg-white transition-colors"
          aria-label="Programa siguiente"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {programsData.map((program) => (
              <div key={program.id} className="min-w-full">
                <div className="relative h-40">
                <Image
                    src={program.image || "/placeholder.svg"}
                    alt={program.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${program.color} opacity-60`}></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-lg">{program.title}</h3>
                    <p className="text-sm opacity-90">{program.level}</p>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Flame className="w-4 h-4" />
                      <span className="text-sm">{program.calories}</span>
                    </div>
                  </div>

                  <button className="mt-3 w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-1 p-2">
          {programsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${currentIndex === index ? "bg-sky-600" : "bg-gray-300"}`}
              aria-label={`Ir al programa ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
