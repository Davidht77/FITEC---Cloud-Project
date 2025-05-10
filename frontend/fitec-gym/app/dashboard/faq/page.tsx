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
  {
    _id: "6",
    question: "¿Necesito reservar para asistir a una clase?",
    answer:
      "Sí, es necesario reservar tu lugar en las clases con anticipación a través de nuestra aplicación o sitio web. Las reservas se abren 48 horas antes de cada clase.",
    category_slug: "clases",
    category_name: "Clases y Programas",
    order: 2,
  },
  {
    _id: "7",
    question: "¿Qué instalaciones tienen disponibles?",
    answer:
      "Nuestras sedes cuentan con áreas de pesas, cardio, salones para clases grupales, vestidores con duchas, y algunas sedes tienen piscina y sauna.",
    category_slug: "instalaciones",
    category_name: "Instalaciones",
    order: 1,
  },
  {
    _id: "8",
    question: "¿Cuáles son los horarios de atención?",
    answer:
      "La mayoría de nuestras sedes operan de lunes a viernes de 6:00 a 22:00, sábados de 8:00 a 20:00 y domingos de 9:00 a 18:00. Consulta los horarios específicos de cada sede.",
    category_slug: "horarios",
    category_name: "Horarios y Reservas",
    order: 1,
  },
  {
    _id: "9",
    question: "¿Cómo puedo conocer a los instructores?",
    answer:
      "Puedes ver los perfiles de nuestros instructores en la sección 'Instructores' de nuestra aplicación o sitio web. También puedes conocerlos personalmente asistiendo a sus clases.",
    category_slug: "instructores",
    category_name: "Instructores",
    order: 1,
  },
  {
    _id: "10",
    question: "¿Puedo cancelar mi membresía en cualquier momento?",
    answer:
      "Sí, puedes cancelar tu membresía en cualquier momento. Sin embargo, dependiendo del plan que hayas elegido, puede aplicar un período mínimo de permanencia o una tarifa de cancelación anticipada.",
    category_slug: "membresia",
    category_name: "Membresía y Pagos",
    order: 3,
  },
]

export default function FAQPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Cargar categorías y preguntas al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Obtener todas las categorías únicas
        const categoriesResponse = await fetch("http://localhost:8080/faq?slug=&name=")
        let categoriesData: Category[] = []

        if (categoriesResponse.ok) {
          categoriesData = await categoriesResponse.json()
        }

        // Si no hay datos o la respuesta está vacía, usar datos de ejemplo
        if (!categoriesData || categoriesData.length === 0) {
          console.log("Usando categorías de ejemplo porque no hay datos del backend")
          categoriesData = mockCategories
        }

        setCategories(categoriesData)

        // Obtener todas las preguntas
        const questionsResponse = await fetch("http://localhost:8080/faq")
        let questionsData: Question[] = []

        if (questionsResponse.ok) {
          questionsData = await questionsResponse.json()
        }

        // Si no hay datos o la respuesta está vacía, usar datos de ejemplo
        if (!questionsData || questionsData.length === 0) {
          console.log("Usando preguntas de ejemplo porque no hay datos del backend")
          questionsData = mockQuestions
        }

        setQuestions(questionsData)
      } catch (err) {
        console.error("Error fetching FAQ data:", err)
        console.log("Usando datos de ejemplo debido a un error")
        setCategories(mockCategories)
        setQuestions(mockQuestions)
        setError(null) // No mostrar error al usuario ya que tenemos datos de respaldo
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

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
          >
            Intentar nuevamente
          </button>
        </div>
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
                className={`group p-4 ${index !== category.questions.length - 1 ? "border-b border-gray-100" : ""}`}
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
