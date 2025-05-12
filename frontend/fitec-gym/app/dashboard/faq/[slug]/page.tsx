"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Loader2 } from "lucide-react"

// Definición de tipos basados en el esquema del backend
type Category = {
  slug: string
  name: string
}

type Question = {
  _id: string
  question: string
  answer: string
  category_slug: string
  category_name: string
  order?: number
}

// Añadir datos de ejemplo para cuando no hay respuesta del backend
const mockCategories: Category[] = [
  { slug: "general", name: "Información General" },
  { slug: "membresia", name: "Membresía y Pagos" },
  { slug: "clases", name: "Clases y Programas" },
  { slug: "instalaciones", name: "Instalaciones" },
  { slug: "horarios", name: "Horarios y Reservas" },
  { slug: "instructores", name: "Instructores" },
]

const mockQuestions: Question[] = [
  {
    _id: "1",
    question: "¿Qué es FITEC?",
    answer:
      "FITEC es una plataforma de fitness universitario que ofrece acceso a gimnasios, clases y programas de entrenamiento para estudiantes y personal universitario.",
    category_slug: "general",
    category_name: "Información General",
    order: 1,
  },
  {
    _id: "2",
    question: "¿Cómo puedo registrarme en FITEC?",
    answer:
      "Puedes registrarte en FITEC a través de nuestra página web o aplicación móvil. Necesitarás proporcionar tu correo electrónico institucional y algunos datos personales básicos.",
    category_slug: "general",
    category_name: "Información General",
    order: 2,
  },
  {
    _id: "3",
    question: "¿Cuánto cuesta la membresía?",
    answer:
      "Ofrecemos diferentes planes de membresía. El plan básico para estudiantes cuesta $20 mensuales, mientras que el plan premium cuesta $35 mensuales e incluye acceso a todas las sedes y clases especiales.",
    category_slug: "membresia",
    category_name: "Membresía y Pagos",
    order: 1,
  },
  {
    _id: "4",
    question: "¿Cómo puedo pagar mi membresía?",
    answer:
      "Aceptamos pagos con tarjeta de crédito/débito, transferencia bancaria o en efectivo en nuestras sedes. También puedes configurar pagos automáticos mensuales.",
    category_slug: "membresia",
    category_name: "Membresía y Pagos",
    order: 2,
  },
  {
    _id: "5",
    question: "¿Qué tipos de clases ofrecen?",
    answer:
      "Ofrecemos una amplia variedad de clases, incluyendo entrenamiento funcional, yoga, spinning, zumba, musculación, pilates y más. Consulta el horario en cada sede para ver la disponibilidad.",
    category_slug: "clases",
    category_name: "Clases y Programas",
    order: 1,
  },
]

export default function CategoryFAQPage({ params }: { params: { slug: string } }) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryName, setCategoryName] = useState("")
  const [otherCategories, setOtherCategories] = useState<Category[]>([])

  // Cargar preguntas de la categoría específica
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token")

        if (!token) {
          console.log("No se encontró token de autenticación, usando datos de ejemplo")
          // Filtrar los datos de ejemplo por la categoría actual
          const filteredMockData = mockQuestions.filter((q) => q.category_slug === params.slug)
          setQuestions(filteredMockData)

          if (filteredMockData.length > 0) {
            setCategoryName(filteredMockData[0].category_name)
          } else {
            const categoryFromMock = mockCategories.find((c) => c.slug === params.slug)
            setCategoryName(categoryFromMock?.name || "Categoría")
          }

          setOtherCategories(mockCategories.filter((c) => c.slug !== params.slug))
          setLoading(false)
          return
        }

        // Obtener preguntas por categoría
        const response = await fetch(`http://54.83.178.156:8080/faq?slug=${params.slug}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("No autorizado. Por favor, inicia sesión nuevamente.")
          } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`)
          }
        }

        const data = await response.json()

        // Si hay datos, establecerlos
        if (data && data.length > 0) {
          setQuestions(data)
          setCategoryName(data[0].category_name)
        } else {
          // Si no hay datos, usar datos de ejemplo
          const filteredMockData = mockQuestions.filter((q) => q.category_slug === params.slug)
          setQuestions(filteredMockData)

          if (filteredMockData.length > 0) {
            setCategoryName(filteredMockData[0].category_name)
          } else {
            const categoryFromMock = mockCategories.find((c) => c.slug === params.slug)
            setCategoryName(categoryFromMock?.name || "Categoría")
            setError("No hay preguntas disponibles para esta categoría")
          }
        }

        // Obtener todas las categorías para mostrar "Otras categorías"
        const categoriesResponse = await fetch("http://54.83.178.156:8080/faq?slug=&name=", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json()
          if (categoriesData && categoriesData.length > 0) {
            setOtherCategories(categoriesData.filter((c: Category) => c.slug !== params.slug))
          } else {
            setOtherCategories(mockCategories.filter((c) => c.slug !== params.slug))
          }
        } else {
          setOtherCategories(mockCategories.filter((c) => c.slug !== params.slug))
        }
      } catch (err) {
        console.error("Error fetching category questions:", err)

        // Usar datos de ejemplo como fallback
        const filteredMockData = mockQuestions.filter((q) => q.category_slug === params.slug)
        setQuestions(filteredMockData)

        if (filteredMockData.length > 0) {
          setCategoryName(filteredMockData[0].category_name)
          setError(null) // No mostrar error al usuario ya que tenemos datos de respaldo
        } else {
          const categoryFromMock = mockCategories.find((c) => c.slug === params.slug)
          setCategoryName(categoryFromMock?.name || "Categoría")
          setError("No hay preguntas disponibles para esta categoría")
        }

        setOtherCategories(mockCategories.filter((c) => c.slug !== params.slug))
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [params.slug])

  // Filtrar preguntas según el término de búsqueda
  const filteredQuestions = questions.filter(
    (q) =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Navegación */}
      <div className="mb-6">
        <Link href="/dashboard/faq" className="inline-flex items-center text-sky-600 hover:text-sky-800">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Volver a Preguntas Frecuentes
        </Link>
      </div>

      {/* Encabezado */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-xl p-6 text-white shadow-md mb-8">
        <h1 className="text-2xl font-bold mb-2">{categoryName || "Categoría"}</h1>
        <p className="opacity-90">Preguntas frecuentes sobre {categoryName.toLowerCase() || "esta categoría"}</p>
      </div>

      {/* Buscador */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder={`Buscar en ${categoryName || "esta categoría"}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Mensaje de error si no hay preguntas */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6 text-center mb-8">
          <h3 className="text-lg font-medium text-yellow-800 mb-2">Información</h3>
          <p className="text-yellow-700">{error}</p>
        </div>
      )}

      {/* Lista de preguntas */}
      {filteredQuestions.length > 0 && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          {filteredQuestions.map((question, index) => (
            <details
              key={question._id}
              className={`group p-6 ${index !== filteredQuestions.length - 1 ? "border-b border-gray-100" : ""}`}
            >
              <summary className="list-none flex justify-between items-center cursor-pointer">
                <h3 className="font-medium text-gray-800 text-lg">{question.question}</h3>
                <div className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 group-open:bg-yellow-400 group-open:border-yellow-400 transition-colors">
                  <span className="block group-open:hidden">+</span>
                  <span className="hidden group-open:block">-</span>
                </div>
              </summary>
              <div className="mt-4 text-gray-600">
                <p>{question.answer}</p>
              </div>
            </details>
          ))}
        </div>
      )}

      {/* Mensaje si no hay resultados de búsqueda */}
      {filteredQuestions.length === 0 && !error && (
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6 text-center mb-8">
          <h3 className="text-lg font-medium text-yellow-800 mb-2">No se encontraron resultados</h3>
          <p className="text-yellow-700">
            No hay preguntas que coincidan con tu búsqueda. Intenta con otros términos o consulta otras categorías.
          </p>
        </div>
      )}

      {/* Otras categorías */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Otras categorías</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            href="/dashboard/faq"
            className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 text-center transition-colors"
          >
            <span className="font-medium text-gray-800">Todas las preguntas</span>
          </Link>

          {otherCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/dashboard/faq/${category.slug}`}
              className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 text-center transition-colors"
            >
              <span className="font-medium text-gray-800">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
