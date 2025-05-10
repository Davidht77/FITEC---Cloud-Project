"use client"

import { useState, useEffect, use } from "react"
import { ArrowLeft, Check, Shield, Clock, Users, Award, Star } from "lucide-react"
import Link from "next/link"

// Tipo para los planes
type Plan = {
  id: string
  name: string
  description: string
  price: number
}

// Características de los planes
const planFeatures = {
  "Plan Básico": [
    "Acceso limitado al gimnasio",
    "Horario restringido (8am - 5pm)",
    "Acceso a equipamiento básico",
    "Sin clases grupales",
  ],
  "Plan Plus": [
    "Acceso completo al gimnasio",
    "Horario extendido (6am - 10pm)",
    "Acceso a todas las áreas",
    "Clases grupales incluidas",
    "Evaluación física mensual",
  ],
  "Plan Premium": [
    "Acceso ilimitado 24/7",
    "Todas las clases incluidas",
    "Entrenador personal (2 sesiones/semana)",
    "Evaluación nutricional",
    "Acceso a todas las sedes",
    "Invitados gratuitos (2 por mes)",
  ],
}

// Iconos para los planes
const planIcons = {
  "Plan Básico": <Clock className="w-8 h-8 text-blue-500" />,
  "Plan Plus": <Users className="w-8 h-8 text-green-500" />,
  "Plan Premium": <Award className="w-8 h-8 text-red-500" />,
}

export default function PlanDetailPage(props: { params: Promise<{ id?: string }> }) {
  const { id } = use(props.params)
  const [plan, setPlan] = useState<Plan | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userPlanId, setUserPlanId] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlanDetail = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:8080/plan/${id}`)

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Plan no encontrado")
          }
          throw new Error("Error al cargar los detalles del plan")
        }

        const data = await response.json()
        setPlan(data)

        // Obtener el plan del usuario (simulado)
        const userPlanIdFromApi = localStorage.getItem("userPlanId") || "1"
        setUserPlanId(userPlanIdFromApi)
      } catch (error) {
        console.error("Error fetching plan details:", error)
        setError(error instanceof Error ? error.message : "Error desconocido")

        // Datos de ejemplo como fallback
        if (id === "1") {
          setPlan({
            id: "1",
            name: "Plan Básico",
            description: "Acceso limitado al gimnasio",
            price: 50.0,
          })
        } else if (id === "2") {
          setPlan({
            id: "2",
            name: "Plan Plus",
            description: "Incluye clases de yoga",
            price: 80.0,
          })
        } else if (id === "3") {
          setPlan({
            id: "3",
            name: "Plan Premium",
            description: "Todo incluido + entrenador personal",
            price: 120.0,
          })
        }

        setUserPlanId("1") // Plan básico por defecto
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPlanDetail()
    }
  }, [id])

  // Obtener color según el plan
  const getPlanColor = (planName: string) => {
    switch (planName) {
      case "Plan Básico":
        return "blue"
      case "Plan Plus":
        return "green"
      case "Plan Premium":
        return "red"
      default:
        return "gray"
    }
  }

  // Verificar si es el plan actual del usuario
  const isUserPlan = (planId: string) => {
    return planId === userPlanId
  }

  // Mostrar pantalla de carga
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600"></div>
      </div>
    )
  }

  // Mostrar error
  if (error || !plan) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/plans" className="inline-flex items-center text-sky-600 hover:text-sky-800">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver a Planes
          </Link>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600 mb-4">{error || "No se pudo cargar la información del plan"}</p>
        </div>
      </div>
    )
  }

  const planColor = getPlanColor(plan.name)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navegación */}
      <div className="mb-6">
        <Link href="/plans" className="inline-flex items-center text-sky-600 hover:text-sky-800">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Volver a Planes
        </Link>
      </div>

      {/* Encabezado */}
      <div className={`bg-${planColor}-500 text-white rounded-xl shadow-lg overflow-hidden mb-8`}>
        <div className="p-8">
          <div className="flex items-center mb-4">
            {planIcons[plan.name as keyof typeof planIcons] || <Star className="w-8 h-8" />}
            <h1 className="text-3xl font-bold ml-3">{plan.name}</h1>
          </div>
          <p className="text-lg opacity-90 mb-4">{plan.description}</p>
          <div className="flex items-baseline">
            <span className="text-4xl font-bold">${plan.price}</span>
            <span className="ml-2 text-xl opacity-90">/mes</span>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Características del plan */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-bold text-lg text-gray-900">Características del Plan</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {(planFeatures[plan.name as keyof typeof planFeatures] || []).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className={`w-5 h-5 mr-3 flex-shrink-0 text-${planColor}-500`} />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">¿Qué incluye este plan?</h3>
              <p className="text-gray-600">
                {plan.name === "Plan Básico" &&
                  "Este plan te ofrece acceso básico a nuestras instalaciones en horarios específicos. Ideal para quienes están comenzando su rutina de ejercicios o tienen un presupuesto limitado."}
                {plan.name === "Plan Plus" &&
                  "Este plan te brinda acceso completo a nuestras instalaciones y clases grupales. Perfecto para quienes buscan variedad en su entrenamiento y flexibilidad de horarios."}
                {plan.name === "Plan Premium" &&
                  "Nuestro plan más completo incluye acceso ilimitado, entrenador personal y beneficios exclusivos. La mejor opción para quienes buscan resultados rápidos y atención personalizada."}
              </p>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-fit">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-bold text-lg text-gray-900">Resumen</h2>
          </div>
          <div className="p-6">
            <div className="flex justify-between mb-4 pb-4 border-b border-gray-100">
              <span className="text-gray-600">Precio mensual</span>
              <span className="text-gray-900 font-medium">${plan.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 pb-4 border-b border-gray-100">
              <span className="text-gray-600">Inscripción</span>
              <span className="text-gray-900 font-medium">$0.00</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span className="text-gray-900">Total</span>
              <span className={`text-${planColor}-600`}>${plan.price.toFixed(2)}</span>
            </div>

            <div className="mt-6 space-y-4">
              {isUserPlan(plan.id) ? (
                <div className={`p-3 bg-${planColor}-100 text-${planColor}-700 rounded-lg text-sm text-center`}>
                  <Shield className="w-4 h-4 inline-block mr-1" />
                  Este es tu plan actual
                </div>
              ) : (
                <button
                  className="w-full py-3 px-4 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white font-medium transition-colors"
                  onClick={() => {
                    // Aquí iría la lógica para cambiar de plan
                    alert(`Cambio al plan: ${plan.name}`)
                  }}
                >
                  Cambiar a este plan
                </button>
              )}

              <Link
                href="/plans"
                className="block w-full py-3 px-4 rounded-lg border border-gray-300 text-center text-gray-700 font-medium hover:bg-gray-50"
              >
                Ver todos los planes
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de beneficios */}
      <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-lg text-gray-900">Beneficios adicionales</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-3">
                <div className={`w-10 h-10 rounded-full bg-${planColor}-100 flex items-center justify-center`}>
                  <Clock className={`w-5 h-5 text-${planColor}-500`} />
                </div>
                <h3 className="font-medium text-gray-900 ml-3">Flexibilidad de horarios</h3>
              </div>
              <p className="text-gray-600 text-sm">
                {plan.name === "Plan Básico"
                  ? "Acceso en horario limitado de 8am a 5pm."
                  : plan.name === "Plan Plus"
                    ? "Horario extendido de 6am a 10pm todos los días."
                    : "Acceso 24/7 sin restricciones de horario."}
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-3">
                <div className={`w-10 h-10 rounded-full bg-${planColor}-100 flex items-center justify-center`}>
                  <Users className={`w-5 h-5 text-${planColor}-500`} />
                </div>
                <h3 className="font-medium text-gray-900 ml-3">Clases grupales</h3>
              </div>
              <p className="text-gray-600 text-sm">
                {plan.name === "Plan Básico"
                  ? "No incluye clases grupales."
                  : plan.name === "Plan Plus"
                    ? "Acceso a todas las clases grupales básicas."
                    : "Acceso prioritario a todas las clases, incluyendo las especiales."}
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-3">
                <div className={`w-10 h-10 rounded-full bg-${planColor}-100 flex items-center justify-center`}>
                  <Award className={`w-5 h-5 text-${planColor}-500`} />
                </div>
                <h3 className="font-medium text-gray-900 ml-3">Beneficios exclusivos</h3>
              </div>
              <p className="text-gray-600 text-sm">
                {plan.name === "Plan Básico"
                  ? "Acceso a la app móvil básica."
                  : plan.name === "Plan Plus"
                    ? "Evaluaciones físicas mensuales y descuentos en tienda."
                    : "Entrenador personal, evaluación nutricional y acceso VIP a eventos."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonios */}
      <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-lg text-gray-900">Lo que dicen nuestros miembros</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                  JD
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-900">Juan Díaz</h4>
                  <div className="flex text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "Desde que me uní con el {plan.name}, he notado una gran mejora en mi condición física. Las
                instalaciones son excelentes y el personal muy profesional."
              </p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                  MR
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-900">María Rodríguez</h4>
                  <div className="flex text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "El {plan.name} ofrece una excelente relación calidad-precio. Recomendaría FITEC a cualquiera que busque
                mejorar su salud y bienestar."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
