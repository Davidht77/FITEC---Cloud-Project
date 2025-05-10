"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Loader2 } from "lucide-react"

// Definición de tipos basados en el esquema del backend
type Question = {
  _id: string
  question: string
  answer: string
  category_slug: string
  category_name: string
  order?: number
}

// Añadir datos de ejemplo para cuando no hay respuesta del backend
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

// Datos de ejemplo para las otras categorías
const mockCategories = [
  { slug: "general", name: "Información General" },
  { slug: "membresia", name: "Membresía y Pagos" },
  { slug: "clases", name: "Clases y Programas" },
  { slug: "instalaciones", name: "Instalaciones" },
  { slug: "horarios", name: "Horarios y Reservas" },
  { slug: "instructores", name: "Instructores" },
]

export default function CategoryFAQPage({ params }: { params: { slug: string } }) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryName, setCategoryName] = useState("")
  const [otherCategories, setOtherCategories] = useState(mockCategories.filter((c) => c.slug !== params.slug))

  // Cargar preguntas de la categoría específica
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:8080/faq?slug=${params.slug}`)
        let data: Question[] = []

        if (response.ok) {
          data = await response.json()
        }

        // Si no hay datos o la respuesta está vacía, filtrar los datos de ejemplo por la categoría actual
        if (!data || data.length === 0) {
          console.log(`Usando preguntas de ejemplo para la categoría ${params.slug}`)
          data = mockQuestions.filter((q) => q.category_slug === params.slug)

          // Si aún no hay datos después de filtrar, mostrar un mensaje amigable
          if (data.length === 0) {
            setError("No hay preguntas disponibles para esta categoría")
          }
        }

        setQuestions(data)

        // Establecer el nombre de la categoría desde la primera pregunta
        if (data.length > 0) {
          setCategoryName(data[0].category_name)
        } else {
          // Si no hay preguntas, intentar obtener el nombre de la categoría de los datos de ejemplo
          const categoryFromMock = mockQuestions.find((q) => q.category_slug === params.slug)
          if (categoryFromMock) {
            setCategoryName(categoryFromMock.category_name)
          } else {
            setCategoryName("Categoría")
          }
        }

        // Intentar cargar otras categorías
        try {
          const categoriesResponse = await fetch("http://localhost:8080/faq?slug=&name=")
          if (categoriesResponse.ok) {
            const categoriesData = await categoriesResponse.json()
            if (categoriesData && categoriesData.length > 0) {
              setOtherCategories(categoriesData.filter((c: any) => c.slug !== params.slug))
            }
          }
        } catch (err) {
          console.log("Usando categorías de ejemplo para 'Otras categorías'")
          // Ya tenemos categorías de ejemplo cargadas por defecto
        }
      } catch (err) {
        console.error("Error fetching category questions:", err)
        console.log(`Usando datos de ejemplo para la categoría ${params.slug} debido a un error`)

        // Filtrar los datos de ejemplo por la categoría actual
        const filteredMockData = mockQuestions.filter((q) => q.category_slug === params.slug)
        setQuestions(filteredMockData)

        if (filteredMockData.length > 0) {
          setCategoryName(filteredMockData[0].category_name)
          setError(null) // No mostrar error al usuario ya que tenemos datos de respaldo
        } else {
          setCategoryName("Categoría")
          setError("No hay preguntas disponibles para esta categoría")
        }
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

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <Link
            href="/dashboard/faq"
            className="inline-flex items-center px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Preguntas Frecuentes
          </Link>
        </div>
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

      {/* Lista de preguntas */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question, index) => (
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
          ))
        ) : (
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium text-gray-800 mb-2">No se encontraron resultados</h3>
            <p className="text-gray-600">No hay preguntas que coincidan con tu búsqueda. Intenta con otros términos.</p>
          </div>
        )}
      </div>

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
