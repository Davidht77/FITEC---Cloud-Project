"use client"

import { useState, useEffect } from "react"
import { Check, ChevronRight, Star, Shield, Clock, Users, Award, ArrowRight } from "lucide-react"

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
  "Plan Básico": <Clock className="w-6 h-6 transition-colors duration-300" />,
  "Plan Plus": <Users className="w-6 h-6 transition-colors duration-300" />,
  "Plan Premium": <Award className="w-6 h-6 transition-colors duration-300" />,
}

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [userPlanId, setUserPlanId] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [detailPlan, setDetailPlan] = useState<Plan | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  // Cargar planes y plan del usuario
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:8080/plan")

        if (!response.ok) {
          throw new Error("Error al cargar los planes")
        }

        const data = await response.json()
        setPlans(data)

        // Intentar obtener el plan del usuario (simulado)
        // En una implementación real, esto vendría de una API
        const userPlanIdFromApi = localStorage.getItem("userPlanId") || "1" // Plan básico por defecto
        setUserPlanId(userPlanIdFromApi)
      } catch (error) {
        console.error("Error fetching plans:", error)
        // Datos de ejemplo como fallback
        setPlans([
          {
            id: "1",
            name: "Plan Básico",
            description: "Acceso limitado al gimnasio",
            price: 50.0,
          },
          {
            id: "2",
            name: "Plan Plus",
            description: "Incluye clases de yoga",
            price: 80.0,
          },
          {
            id: "3",
            name: "Plan Premium",
            description: "Todo incluido + entrenador personal",
            price: 120.0,
          },
        ])
        setUserPlanId("1") // Plan básico por defecto
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [])

  // Obtener detalles de un plan
  const fetchPlanDetails = async (planId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:8080/plan/${planId}`)

      if (!response.ok) {
        throw new Error("Error al cargar los detalles del plan")
      }

      const data = await response.json()
      setDetailPlan(data)
      setShowDetailModal(true)
    } catch (error) {
      console.error("Error fetching plan details:", error)
      // Usar el plan de la lista como fallback
      const fallbackPlan = plans.find((p) => p.id === planId)
      if (fallbackPlan) {
        setDetailPlan(fallbackPlan)
        setShowDetailModal(true)
      }
    } finally {
      setLoading(false)
    }
  }

  // Verificar si un plan es el plan actual del usuario
  const isUserPlan = (planId: string) => {
    return planId === userPlanId
  }

  // Verificar si un plan es el seleccionado actualmente
  const isPlanSelected = (planId: string) => {
    return planId === selectedPlan
  }

  // Verificar si el cursor está sobre un plan
  const isHovered = (planId: string) => {
    return hoveredPlan === planId || isPlanSelected(planId)
  }

  // Cerrar modal de detalles
  const closeDetailModal = () => {
    setShowDetailModal(false)
    setDetailPlan(null)
  }

  // Renderizar el encabezado del plan según su tipo
  const renderPlanHeader = (plan: Plan) => {
    const isHovering = isHovered(plan.id)
    const isActive = isUserPlan(plan.id)

    if (plan.name === "Plan Básico") {
      return (
        <div
          className={`p-6 transition-colors duration-300 ${
            isHovering || isActive ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800"
          }`}
        >
          <div className="flex items-center mb-2">
            <div
              className={`${isHovering || isActive ? "text-white" : "text-blue-600"} transition-colors duration-300`}
            >
              {planIcons[plan.name]}
            </div>
            <h3 className="text-xl font-bold ml-2">{plan.name}</h3>
          </div>
          <p className="opacity-90 text-sm">{plan.description}</p>
          <div className="mt-4">
            <span className="text-3xl font-bold">${plan.price}</span>
            <span className="text-sm opacity-90">/mes</span>
          </div>
        </div>
      )
    } else if (plan.name === "Plan Plus") {
      return (
        <div
          className={`p-6 transition-colors duration-300 ${
            isHovering || isActive ? "bg-green-600 text-white" : "bg-green-100 text-green-800"
          }`}
        >
          <div className="flex items-center mb-2">
            <div
              className={`${isHovering || isActive ? "text-white" : "text-green-600"} transition-colors duration-300`}
            >
              {planIcons[plan.name]}
            </div>
            <h3 className="text-xl font-bold ml-2">{plan.name}</h3>
          </div>
          <p className="opacity-90 text-sm">{plan.description}</p>
          <div className="mt-4">
            <span className="text-3xl font-bold">${plan.price}</span>
            <span className="text-sm opacity-90">/mes</span>
          </div>
        </div>
      )
    } else if (plan.name === "Plan Premium") {
      return (
        <div
          className={`p-6 transition-colors duration-300 ${
            isHovering || isActive ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-800"
          }`}
        >
          <div className="flex items-center mb-2">
            <div
              className={`${isHovering || isActive ? "text-white" : "text-purple-600"} transition-colors duration-300`}
            >
              {planIcons[plan.name]}
            </div>
            <h3 className="text-xl font-bold ml-2">{plan.name}</h3>
          </div>
          <p className="opacity-90 text-sm">{plan.description}</p>
          <div className="mt-4">
            <span className="text-3xl font-bold">${plan.price}</span>
            <span className="text-sm opacity-90">/mes</span>
          </div>
        </div>
      )
    } else {
      // Plan por defecto
      return (
        <div
          className={`p-6 transition-colors duration-300 ${
            isHovering || isActive ? "bg-gray-600 text-white" : "bg-gray-100 text-gray-800"
          }`}
        >
          <div className="flex items-center mb-2">
            <Star
              className={`w-6 h-6 ${isHovering || isActive ? "text-white" : "text-gray-600"} transition-colors duration-300`}
            />
            <h3 className="text-xl font-bold ml-2">{plan.name}</h3>
          </div>
          <p className="opacity-90 text-sm">{plan.description}</p>
          <div className="mt-4">
            <span className="text-3xl font-bold">${plan.price}</span>
            <span className="text-sm opacity-90">/mes</span>
          </div>
        </div>
      )
    }
  }

  // Renderizar el borde de la tarjeta según el tipo de plan
  const getPlanBorderClass = (plan: Plan) => {
    const isHovering = isHovered(plan.id)
    const isActive = isUserPlan(plan.id)

    if (plan.name === "Plan Básico") {
      return isActive || isHovering ? "border-blue-500" : "border-blue-200 hover:border-blue-500"
    } else if (plan.name === "Plan Plus") {
      return isActive || isHovering ? "border-green-500" : "border-green-200 hover:border-green-500"
    } else if (plan.name === "Plan Premium") {
      return isActive || isHovering ? "border-purple-500" : "border-purple-200 hover:border-purple-500"
    } else {
      return isActive || isHovering ? "border-gray-500" : "border-gray-200 hover:border-gray-500"
    }
  }

  // Renderizar el botón de acción según el tipo de plan
  const renderActionButton = (plan: Plan) => {
    const isActive = isUserPlan(plan.id)
    const isHovering = isHovered(plan.id)

    if (isActive) {
      if (plan.name === "Plan Básico") {
        return (
          <button
            className="w-full py-2 px-4 rounded-lg bg-blue-100 text-blue-700 font-medium flex items-center justify-center"
            disabled
          >
            <Shield className="w-4 h-4 mr-2" />
            Plan Activo
          </button>
        )
      } else if (plan.name === "Plan Plus") {
        return (
          <button
            className="w-full py-2 px-4 rounded-lg bg-green-100 text-green-700 font-medium flex items-center justify-center"
            disabled
          >
            <Shield className="w-4 h-4 mr-2" />
            Plan Activo
          </button>
        )
      } else if (plan.name === "Plan Premium") {
        return (
          <button
            className="w-full py-2 px-4 rounded-lg bg-purple-100 text-purple-700 font-medium flex items-center justify-center"
            disabled
          >
            <Shield className="w-4 h-4 mr-2" />
            Plan Activo
          </button>
        )
      } else {
        return (
          <button
            className="w-full py-2 px-4 rounded-lg bg-gray-100 text-gray-700 font-medium flex items-center justify-center"
            disabled
          >
            <Shield className="w-4 h-4 mr-2" />
            Plan Activo
          </button>
        )
      }
    } else {
      if (plan.name === "Plan Básico" && isHovering) {
        return (
          <button
            className="w-full py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              alert(`Cambio al plan: ${plan.name}`)
            }}
          >
            Cambiar a este plan
          </button>
        )
      } else if (plan.name === "Plan Plus" && isHovering) {
        return (
          <button
            className="w-full py-2 px-4 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              alert(`Cambio al plan: ${plan.name}`)
            }}
          >
            Cambiar a este plan
          </button>
        )
      } else if (plan.name === "Plan Premium" && isHovering) {
        return (
          <button
            className="w-full py-2 px-4 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              alert(`Cambio al plan: ${plan.name}`)
            }}
          >
            Cambiar a este plan
          </button>
        )
      } else {
        return (
          <button
            className="w-full py-2 px-4 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white font-medium transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              alert(`Cambio al plan: ${plan.name}`)
            }}
          >
            Cambiar a este plan
          </button>
        )
      }
    }
  }

  // Renderizar los checks según el tipo de plan
  const renderCheckIcon = (plan: Plan) => {
    if (plan.name === "Plan Básico") {
      return "text-blue-100"
    } else if (plan.name === "Plan Plus") {
      return "text-green-200"
    } else if (plan.name === "Plan Premium") {
      return "text-purple-900"
    } else {
      return "text-gray-500"
    }
  }

  // Mostrar pantalla de carga
  if (loading && plans.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Encabezado */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Planes de Membresía</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Elige el plan que mejor se adapte a tus necesidades y objetivos de fitness
        </p>
      </div>

      {/* Planes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`
              relative rounded-xl overflow-hidden transform transition-all duration-300
              border-2 ${getPlanBorderClass(plan)}
              shadow-md hover:shadow-lg hover:scale-105
              cursor-pointer
            `}
            onClick={() => setSelectedPlan(isPlanSelected(plan.id) ? null : plan.id)}
            onMouseEnter={() => setHoveredPlan(plan.id)}
            onMouseLeave={() => setHoveredPlan(null)}
          >
            {/* Encabezado del plan */}
            {renderPlanHeader(plan)}

            {/* Características del plan */}
            <div className="p-6 bg-white">
              <ul className="space-y-3">
                {(planFeatures[plan.name as keyof typeof planFeatures] || []).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className={`w-5 h-5 mr-2 flex-shrink-0 ${renderCheckIcon(plan)}`} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Botones de acción */}
              <div className="mt-6 space-y-3">
                {renderActionButton(plan)}

                <button
                  className="w-full py-2 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation()
                    fetchPlanDetails(plan.id)
                  }}
                >
                  Ver detalles
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sección de comparación */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-12">
        <div className="p-6 bg-gradient-to-r from-sky-600 to-blue-700 text-white">
          <h2 className="text-2xl font-bold">Comparativa de Planes</h2>
          <p className="opacity-90">Encuentra el plan perfecto para ti</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Característica
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Acceso al gimnasio</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Limitado (8am - 5pm)</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Completo (6am - 10pm)</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ilimitado 24/7</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Clases grupales</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="text-red-500">✕</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="text-green-500">✓</span> Incluidas
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="text-green-500">✓</span> Todas incluidas
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Entrenador personal</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="text-red-500">✕</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="text-red-500">✕</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="text-green-500">✓</span> 2 sesiones/semana
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Evaluación física</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="text-red-500">✕</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="text-green-500">✓</span> Mensual
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="text-green-500">✓</span> Quincenal
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Acceso a sedes</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Solo sede principal</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3 sedes</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Todas las sedes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de detalles del plan */}
      {showDetailModal && detailPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Encabezado del modal según el tipo de plan */}
            {detailPlan.name === "Plan Básico" && (
              <div className="p-6 bg-blue-600 text-white flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">{detailPlan.name}</h3>
                  <p className="opacity-90">{detailPlan.description}</p>
                </div>
                <button
                  onClick={closeDetailModal}
                  className="text-white bg-white/20 rounded-full p-1 hover:bg-white/30 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            {detailPlan.name === "Plan Plus" && (
              <div className="p-6 bg-green-600 text-white flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">{detailPlan.name}</h3>
                  <p className="opacity-90">{detailPlan.description}</p>
                </div>
                <button
                  onClick={closeDetailModal}
                  className="text-white bg-white/20 rounded-full p-1 hover:bg-white/30 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            {detailPlan.name === "Plan Premium" && (
              <div className="p-6 bg-purple-600 text-white flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">{detailPlan.name}</h3>
                  <p className="opacity-90">{detailPlan.description}</p>
                </div>
                <button
                  onClick={closeDetailModal}
                  className="text-white bg-white/20 rounded-full p-1 hover:bg-white/30 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-2">Precio</h4>
                <p className="text-3xl font-bold text-gray-900">
                  ${detailPlan.price} <span className="text-sm text-gray-500 font-normal">/mes</span>
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-2">Características incluidas</h4>
                <ul className="space-y-3">
                  {(planFeatures[detailPlan.name as keyof typeof planFeatures] || []).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className={`w-5 h-5 mr-2 flex-shrink-0 ${renderCheckIcon(detailPlan)}`} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-2">Beneficios adicionales</h4>
                <p className="text-gray-600 mb-4">
                  Al suscribirte a {detailPlan.name}, también obtienes los siguientes beneficios:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <ArrowRight className="w-4 h-4 mr-2 text-gray-400" />
                    Acceso a la aplicación móvil
                  </li>
                  <li className="flex items-center text-gray-700">
                    <ArrowRight className="w-4 h-4 mr-2 text-gray-400" />
                    Seguimiento de progreso
                  </li>
                  <li className="flex items-center text-gray-700">
                    <ArrowRight className="w-4 h-4 mr-2 text-gray-400" />
                    Descuentos en productos de la tienda
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                {isUserPlan(detailPlan.id) ? (
                  <>
                    {detailPlan.name === "Plan Básico" && (
                      <button
                        className="flex-1 py-3 px-4 rounded-lg bg-blue-100 text-blue-700 font-medium flex items-center justify-center"
                        disabled
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Plan Activo
                      </button>
                    )}
                    {detailPlan.name === "Plan Plus" && (
                      <button
                        className="flex-1 py-3 px-4 rounded-lg bg-green-100 text-green-700 font-medium flex items-center justify-center"
                        disabled
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Plan Activo
                      </button>
                    )}
                    {detailPlan.name === "Plan Premium" && (
                      <button
                        className="flex-1 py-3 px-4 rounded-lg bg-purple-100 text-purple-700 font-medium flex items-center justify-center"
                        disabled
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Plan Activo
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    {detailPlan.name === "Plan Básico" && (
                      <button
                        className="flex-1 py-3 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
                        onClick={() => {
                          alert(`Cambio al plan: ${detailPlan.name}`)
                          closeDetailModal()
                        }}
                      >
                        Cambiar a este plan
                      </button>
                    )}
                    {detailPlan.name === "Plan Plus" && (
                      <button
                        className="flex-1 py-3 px-4 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition-colors"
                        onClick={() => {
                          alert(`Cambio al plan: ${detailPlan.name}`)
                          closeDetailModal()
                        }}
                      >
                        Cambiar a este plan
                      </button>
                    )}
                    {detailPlan.name === "Plan Premium" && (
                      <button
                        className="flex-1 py-3 px-4 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium transition-colors"
                        onClick={() => {
                          alert(`Cambio al plan: ${detailPlan.name}`)
                          closeDetailModal()
                        }}
                      >
                        Cambiar a este plan
                      </button>
                    )}
                  </>
                )}
                <button
                  className="py-3 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
                  onClick={closeDetailModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
