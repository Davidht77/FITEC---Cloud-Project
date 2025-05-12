"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Star, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function FeedbackPage() {
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      setError("Por favor, selecciona una calificación")
      return
    }

    if (comment.trim() === "") {
      setError("Por favor, escribe un comentario")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Obtener el ID del cliente del localStorage
      const clientId = localStorage.getItem("id") || "default-user"

      const feedbackData = {
        clientId,
        rating,
        comment,
        createdAt: new Date(),
      }

      const response = await fetch("http://localhost:8080/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(feedbackData),
      })

      if (response.ok) {
        setSuccess(true)
        setRating(0)
        setComment("")

        // Redirigir después de 2 segundos
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } else {
        const errorData = await response.json()
        setError(errorData.message || "Error al enviar el comentario")
      }
    } catch (err) {
      console.error("Error al enviar feedback:", err)
      setError("Error de conexión. Inténtalo de nuevo más tarde.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Navegación */}
      <div className="mb-6">
        <Link href="/dashboard/perfil" className="inline-flex items-center text-sky-600 hover:text-sky-800">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Volver a mi perfil
        </Link>
      </div>

      {/* Encabezado */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-xl p-6 text-white shadow-md mb-8">
        <h1 className="text-2xl font-bold mb-2">Deja tu opinión</h1>
        <p className="opacity-90">Tu feedback nos ayuda a mejorar nuestros servicios</p>
      </div>

      {/* Formulario de feedback */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {success ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">¡Gracias por tu opinión!</h2>
            <p className="text-gray-600 mb-4">Tu comentario ha sido enviado correctamente.</p>
            <p className="text-sm text-gray-500">Serás redirigido al dashboard en unos segundos...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
            )}

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">¿Cómo calificarías nuestro servicio?</label>
              <div className="flex items-center justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        (hoverRating || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="text-center mt-2 text-sm text-gray-600">
                {rating === 1 && "Malo"}
                {rating === 2 && "Regular"}
                {rating === 3 && "Bueno"}
                {rating === 4 && "Muy bueno"}
                {rating === 5 && "Excelente"}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">
                Tu comentario
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Cuéntanos tu experiencia con FITEC..."
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg font-medium flex items-center disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  "Enviar comentario"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
