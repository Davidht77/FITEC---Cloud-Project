"use client"

import { useEffect, useState, useRef } from "react"
import { Star, Quote } from 'lucide-react'

type Feedback = {
  feedbackId: string
  clientId: string
  rating: number
  comment: string
  createdAt: Date
  clientName?: string // Añadido para mostrar el nombre del cliente
}

// Datos de ejemplo para cuando no hay respuesta del backend
const mockFeedbacks: Feedback[] = [
  {
    feedbackId: "1",
    clientId: "101",
    rating: 5,
    comment: "¡Excelente servicio! Los entrenadores son muy profesionales y las instalaciones están siempre limpias.",
    createdAt: new Date("2023-05-15"),
    clientName: "María García"
  },
  {
    feedbackId: "2",
    clientId: "102",
    rating: 4,
    comment: "Me encanta la variedad de clases disponibles. He mejorado mucho mi condición física desde que me uní.",
    createdAt: new Date("2023-06-02"),
    clientName: "Carlos Rodríguez"
  },
  {
    feedbackId: "3",
    clientId: "103",
    rating: 5,
    comment: "El ambiente es muy motivador. Recomiendo FITEC a todos mis amigos de la universidad.",
    createdAt: new Date("2023-06-10"),
    clientName: "Ana Martínez"
  },
  {
    feedbackId: "4",
    clientId: "104",
    rating: 4,
    comment: "Las clases de yoga son increíbles, me han ayudado mucho con el estrés de los exámenes.",
    createdAt: new Date("2023-06-18"),
    clientName: "Juan López"
  },
  {
    feedbackId: "5",
    clientId: "105",
    rating: 5,
    comment: "Los horarios son muy flexibles, lo que me permite entrenar incluso con mi apretada agenda universitaria.",
    createdAt: new Date("2023-06-25"),
    clientName: "Laura Sánchez"
  }
]

export default function FeedbackCarousel() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
  const fetchFeedbacks = async () => {
        try {
        setLoading(true)
        const response = await fetch("http://localhost:8080/feedback")

        if (response.ok) {
            const data = await response.json()
            if (data && data.length > 0) {
            setFeedbacks(data)
            } else {
            console.log("No hay comentarios disponibles, usando datos de ejemplo")
            setFeedbacks(mockFeedbacks)
            }
        } else {
            console.log("Error al cargar comentarios, usando datos de ejemplo")
            setFeedbacks(mockFeedbacks)
        }
        } catch (err) {
        console.error("Error fetching feedback:", err)
        console.log("Usando datos de ejemplo debido a un error")
        setFeedbacks(mockFeedbacks)
        } finally {
        setLoading(false)
        }
    }

    fetchFeedbacks()

    return () => {
        if (intervalRef.current) {
        clearInterval(intervalRef.current)
        }
    }
    }, []) // <- solo una vez al montar

    // ✅ Nuevo useEffect que inicia el carrusel cuando ya hay feedbacks
    useEffect(() => {
    if (feedbacks.length > 0) {
        startCarousel()
    }
    }, [feedbacks])

  
  const startCarousel = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => 
        prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000) // Cambiar cada 5 segundos
  }
  
  const handleFeedbackClick = (index: number) => {
    setCurrentIndex(index)
    
    // Reiniciar el carrusel después de un clic manual
    startCarousel()
  }
  
  // Renderizar estrellas según la calificación
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ))
  }
  
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-4 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-600"></div>
      </div>
    )
  }
  
  if (feedbacks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-4">
        <div className="text-center py-8">
          <p className="text-gray-500">No hay comentarios disponibles</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="font-bold text-lg text-gray-900">Lo que dicen nuestros usuarios</h2>
        <Link
          href="/dashboard/feedback"
          className="text-sky-600 hover:text-sky-800 text-sm font-medium"
        >
          Ver todos
        </Link>
      </div>
      
      <div className="p-4">
        <div className="relative h-48 overflow-hidden">
          {feedbacks.map((feedback, index) => (
            <div 
              key={feedback.feedbackId}
              className={`absolute w-full transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div className="flex items-start mb-2">
                <Quote className="w-8 h-8 text-sky-100 mr-2 flex-shrink-0" />
                <p className="text-gray-600 italic">{feedback.comment}</p>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{feedback.clientName || "Usuario"}</p>
                  <div className="flex mt-1">
                    {renderStars(feedback.rating)}
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Indicadores */}
        <div className="flex justify-center mt-4 space-x-2">
          {feedbacks.map((_, index) => (
            <button
              key={index}
              onClick={() => handleFeedbackClick(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-sky-600' : 'bg-gray-300'
              }`}
              aria-label={`Ver comentario ${index + 1}`}
            />
          ))}
        </div>
        
        <Link
          href="/dashboard/perfil/feedback"
          className="mt-4 block w-full text-center bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Deja tu opinión
        </Link>
      </div>
    </div>
  )
}

import Link from "next/link"
