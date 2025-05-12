"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, Search, Loader2 } from "lucide-react"

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

export default function FAQPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [questions, setQuestions] = useState<Question[]>(mockQuestions)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Cargar categorías y preguntas al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token")

        if (!token) {
          console.log("No se encontró token de autenticación, usando datos de ejemplo")
          setLoading(false)
          return
        }

        // Obtener todas las preguntas
        const questionsResponse = await fetch("http://54.83.178.156:8080/faq", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!questionsResponse.ok) {
          if (questionsResponse.status === 401) {
            console.log("Error de autenticación, usando datos de ejemplo")
          } else {
            console.log(`Error ${questionsResponse.status}, usando datos de ejemplo`)
          }
          return
        }

        const questionsData = await questionsResponse.json()

        if (questionsData && questionsData.length > 0) {
          setQuestions(questionsData)

          // Obtener categorías únicas
          try {
            const categoriesResponse = await fetch("http://54.83.178.156:8080/faq?slug=&name=", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })

            if (categoriesResponse.ok) {
              const categoriesData = await categoriesResponse.json()
              if (categoriesData && categoriesData.length > 0) {
                setCategories(categoriesData)
              } else {
                // Si no hay categorías, extraerlas manualmente de las preguntas
                const uniqueCategoriesMap = new Map<string, Category>()

                questionsData.forEach((q: Question) => {
                  if (!uniqueCategoriesMap.has(q.category_slug)) {
                    uniqueCategoriesMap.set(q.category_slug, {
                      slug: q.category_slug,
                      name: q.category_name,
                    })
                  }
                })

                const extractedCategories: Category[] = Array.from(uniqueCategoriesMap.values())
                setCategories(extractedCategories)
              }
            } else {
              // Si falla la obtención de categorías, extraerlas de las preguntas
              const uniqueCategoriesMap = new Map<string, Category>()

              questionsData.forEach((q: Question) => {
                if (!uniqueCategoriesMap.has(q.category_slug)) {
                  uniqueCategoriesMap.set(q.category_slug, {
                    slug: q.category_slug,
                    name: q.category_name,
                  })
                }
              })

              const extractedCategories: Category[] = Array.from(uniqueCategoriesMap.values())
              setCategories(extractedCategories)
            }
          } catch (error) {
            console.error("Error fetching categories:", error)
            // Extraer categorías de las preguntas como fallback
            const uniqueCategoriesMap = new Map<string, Category>()

            questionsData.forEach((q: Question) => {
              if (!uniqueCategoriesMap.has(q.category_slug)) {
                uniqueCategoriesMap.set(q.category_slug, {
                  slug: q.category_slug,
                  name: q.category_name,
                })
              }
            })

            const extractedCategories: Category[] = Array.from(uniqueCategoriesMap.values())
            setCategories(extractedCategories)
          }
        }
      } catch (err) {
        console.error("Error fetching FAQ data:", err)
        // No mostrar error al usuario ya que tenemos datos de respaldo
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filtrar preguntas según el término de búsqueda
  const filteredQuestions = questions.filter(
    (q) =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Agrupar preguntas por categoría para mostrarlas organizadas
  const questionsByCategory = filteredQuestions.reduce(
    (acc, question) => {
      if (!acc[question.category_slug]) {
        acc[question.category_slug] = {
          name: question.category_name,
          questions: [],
        }
      }
      acc[question.category_slug].questions.push(question)
      return acc
    },
    {} as Record<string, { name: string; questions: Question[] }>,
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
      {/* Encabezado */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-xl p-6 text-white shadow-md mb-8">
        <h1 className="text-2xl font-bold mb-2">Preguntas Frecuentes</h1>
        <p className="opacity-90">Encuentra respuestas a las preguntas más comunes sobre FITEC</p>
      </div>

      {/* Buscador */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar en las preguntas frecuentes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Categorías */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/dashboard/faq/${category.slug}`}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow flex justify-between items-center"
          >
            <span className="font-medium text-gray-800">{category.name}</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>
        ))}
      </div>

      {/* Preguntas agrupadas por categoría */}
      {Object.entries(questionsByCategory).map(([slug, category]) => (
        <div key={slug} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
            <Link href={`/dashboard/faq/${slug}`} className="text-sm text-sky-600 hover:text-sky-800 font-medium">
              Ver todas
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {category.questions.slice(0, 3).map((question, index) => (
              <details
                key={question._id}
                className={`group p-4 ${index !== category.questions.length - 1 && index < 2 ? "border-b border-gray-100" : ""}`}
              >
                <summary className="list-none flex justify-between items-center cursor-pointer">
                  <h3 className="font-medium text-gray-800">{question.question}</h3>
                  <ChevronRight className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-90" />
                </summary>
                <div className="mt-3 text-gray-600">
                  <p>{question.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      ))}

      {filteredQuestions.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium text-yellow-800 mb-2">No se encontraron resultados</h3>
          <p className="text-yellow-700">
            No hay preguntas que coincidan con tu búsqueda. Intenta con otros términos o consulta todas las categorías.
          </p>
        </div>
      )}
    </div>
  )
}
