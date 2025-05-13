"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Check, ChevronRight, Star, Shield, Clock, Users, Award, ArrowRight } from "lucide-react"

// Tipo para los planes
type Plan = {
  id: string
  name: string
  description: string
  price: number
}

// Tipo para el cliente con su plan
type Client = {
  id: string
  name: string
  lastName: string
  email: string
  phone: string
  address: string
  plan: Plan | null
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
  "Plan Básico": <Clock className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />,
  "Plan Plus": <Users className="w-6 h-6 text-green-600 group-hover:text-white transition-colors duration-300" />,
  "Plan Premium": <Award className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors duration-300" />,
}

// Planes de fallback para usar si la API falla
const fallbackPlans: Plan[] = [
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
]

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>(fallbackPlans) // Inicializar con planes de fallback
  const [loading, setLoading] = useState(true)
  const [userPlanId, setUserPlanId] = useState<string | null>(null)
  const [clientData, setClientData] = useState<Client | null>(null)
  const [detailPlan, setDetailPlan] = useState<Plan | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dataFetched, setDataFetched] = useState(false)

  // Cargar planes y datos del cliente - optimizado para evitar múltiples re-renders
  useEffect(() => {
  // Si ya hemos cargado los datos, no hacemos nada
  if (dataFetched) return

  const fetchData = async () => {
    try {
      setLoading(true)

      // Obtener token y ID del usuario
      const token = localStorage.getItem("token")
      const userId = localStorage.getItem("id")

      if (!token || !userId) {
        throw new Error("No se encontró información de autenticación")
      }

      // Hacer ambas peticiones en paralelo para mejorar el rendimiento
      const [clientResponse, plansResponse] = await Promise.all([
        fetch(`http://54.83.178.156:8080/client/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch("http://54.83.178.156:8080/plan", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
      ])

      // Procesar respuesta del cliente
      if (clientResponse.ok) {
        const clientData = await clientResponse.json()
        setClientData(clientData)

        // Guardar el ID del plan del usuario si tiene uno
        if (clientData?.plan?.id) {
          console.log("Plan del usuario:", clientData.plan.id)
          setUserPlanId(clientData.plan.id)
        } else {
          console.warn("No se encontró el ID del plan del cliente.")
        }
      } else {
        console.error("Error al cargar los datos del cliente")
      }

      // Procesar respuesta de planes
      if (plansResponse.ok) {
        const plansData = await plansResponse.json()
        setPlans(plansData)
      } else {
        console.error("Error al cargar los planes")
      }

      // ✅ Marcar que los datos ya fueron cargados
      setDataFetched(true)

    } catch (error) {
      console.error("Error fetching data:", error)
      setError(error instanceof Error ? error.message : "Error desconocido")

      // Si no tenemos datos del cliente, usamos un valor por defecto para el plan
      if (!clientData) {
        setUserPlanId("1")
      }
    } finally {
      setLoading(false)
    }
  }

  fetchData()
}, [dataFetched, clientData])


  // Obtener detalles de un plan - optimizado para usar el plan de la lista si ya lo tenemos
  const fetchPlanDetails = (planId: string) => {
    // Buscar el plan en la lista que ya tenemos
    const planFromList = plans.find((p) => p.id === planId)

    if (planFromList) {
      setDetailPlan(planFromList)
      setShowDetailModal(true)
      return
    }

    // Si no lo encontramos, hacer la petición
    const fetchFromApi = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token")

        const response = await fetch(`http://54.83.178.156:8080/plan/${planId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

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

    fetchFromApi()
  }

  // Obtener color según el plan
  const getPlanColor = (planName: string) => {
    switch (planName) {
      case "Plan Básico":
        return "blue"
      case "Plan Plus":
        return "green"
      case "Plan Premium":
        return "purple"
      default:
        return "gray"
    }
  }

  // Verificar si un plan es el plan actual del usuario
  const isUserPlan = (planId: string) => {
    return planId === userPlanId
  }

  // Cerrar modal de detalles
  const closeDetailModal = () => {
    setShowDetailModal(false)
    setDetailPlan(null)
  }

  // Mostrar pantalla de carga solo durante la carga inicial
  if (loading && !dataFetched) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mensaje de error si existe */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}

      {/* Encabezado */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Planes de Membresía</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Elige el plan que mejor se adapte a tus necesidades y objetivos de fitness
        </p>

        {/* Mostrar el plan actual del usuario si tiene uno */}
        {clientData && clientData.plan && (
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-gray-700">
            <Shield className="w-4 h-4 mr-2 text-gray-600" />
            Tu plan actual: <span className="font-bold ml-1">{clientData.plan.name}</span>
          </div>
        )}
      </div>

      {/* Planes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan) => {
          const isCurrentPlan = isUserPlan(plan.id)
          const planColor = getPlanColor(plan.name)

          return (
            <div
              key={plan.id}
              className={`
                group
                relative rounded-xl overflow-hidden transform transition-all duration-300
                border-2 ${isCurrentPlan ? `border-${planColor}-500` : `border-${planColor}-200 hover:border-${planColor}-400`}
                shadow-md hover:shadow-lg ${!isCurrentPlan && "hover:scale-105"}
                ${isCurrentPlan ? "" : "cursor-pointer"}
              `}
            >
              {/* Etiqueta de plan actual */}
              {isCurrentPlan && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 text-xs font-bold z-10">
                  Plan Actual
                </div>
              )}

              {/* Encabezado del plan */}
              <div
                className={`
                  p-6 transition-colors duration-300
                  ${
                    isCurrentPlan
                      ? `bg-${planColor}-600 text-white`
                      : `bg-${planColor}-100 text-${planColor}-800 group-hover:bg-${planColor}-600 group-hover:text-white`
                  }
                `}
              >
                <div className="flex items-center mb-2">
                  {planIcons[plan.name as keyof typeof planIcons] || <Star className="w-6 h-6" />}
                  <h3 className="text-xl font-bold ml-2">{plan.name}</h3>
                </div>
                <p className="opacity-90 text-sm">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-sm opacity-90">/mes</span>
                </div>
              </div>

              {/* Características del plan */}
              <div className="p-6 bg-white">
                <ul className="space-y-3">
                  {(planFeatures[plan.name as keyof typeof planFeatures] || []).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className={`w-5 h-5 mr-2 flex-shrink-0 text-${planColor}-500`} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Botones de acción */}
                <div className="mt-6 space-y-3">
                  {isCurrentPlan ? (
                    <div
                      className={`w-full py-2 px-4 rounded-lg bg-${planColor}-100 text-${planColor}-700 font-medium flex items-center justify-center`}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Tu Plan Actual
                    </div>
                  ) : (
                    <Link
                      href={`/dashboard/plans/change?planId=${plan.id}`}
                      className={`w-full py-2 px-4 rounded-lg bg-${planColor}-500 hover:bg-${planColor}-600 text-white font-medium transition-colors text-center block`}
                    >
                      Cambiar a este plan
                    </Link>
                  )}

                  <button
                    className="w-full py-2 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 flex items-center justify-center"
                    onClick={() => fetchPlanDetails(plan.id)}
                  >
                    Ver detalles
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
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
                    key={`header-${plan.id}`}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {plan.name}
                    {isUserPlan(plan.id) && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                        Actual
                      </span>
                    )}
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

      {/* Sección de preguntas frecuentes */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Preguntas Frecuentes</h2>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">¿Puedo cambiar de plan en cualquier momento?</h3>
            <p className="text-gray-600">
              Sí, puedes cambiar de plan en cualquier momento. Si cambias a un plan de mayor valor, se aplicará el
              cambio inmediatamente. Si cambias a un plan de menor valor, el cambio se aplicará al finalizar tu ciclo de
              facturación actual.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">¿Hay algún contrato de permanencia?</h3>
            <p className="text-gray-600">
              No, todos nuestros planes son mensuales y puedes cancelar en cualquier momento. No hay contratos de
              permanencia ni penalizaciones por cancelación.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">¿Cómo puedo pagar mi membresía?</h3>
            <p className="text-gray-600">
              Aceptamos pagos con tarjeta de crédito/débito, transferencia bancaria y efectivo en nuestras
              instalaciones. Los pagos se procesan de forma segura a través de nuestra plataforma.
            </p>
          </div>
        </div>
      </div>

      {/* Modal de detalles del plan */}
      {showDetailModal && detailPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className={`p-6 bg-${getPlanColor(detailPlan.name)}-600 text-white flex justify-between items-start`}>
              <div>
                <h3 className="text-2xl font-bold">{detailPlan.name}</h3>
                <p className="opacity-90">{detailPlan.description}</p>
                {isUserPlan(detailPlan.id) && (
                  <div className="mt-2 inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-300 text-yellow-800">
                    Tu Plan Actual
                  </div>
                )}
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
                      <Check className={`w-5 h-5 mr-2 flex-shrink-0 text-${getPlanColor(detailPlan.name)}-500`} />
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
                  <button
                    className={`flex-1 py-3 px-4 rounded-lg bg-${getPlanColor(
                      detailPlan.name,
                    )}-100 text-${getPlanColor(detailPlan.name)}-700 font-medium flex items-center justify-center`}
                    disabled
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Tu Plan Actual
                  </button>
                ) : (
                  <Link
                    href={`/dashboard/plans/change?planId=${detailPlan.id}`}
                    className={`flex-1 py-3 px-4 rounded-lg bg-${getPlanColor(
                      detailPlan.name,
                    )}-500 hover:bg-${getPlanColor(
                      detailPlan.name,
                    )}-600 text-white font-medium transition-colors text-center flex items-center justify-center`}
                    onClick={closeDetailModal}
                  >
                    Cambiar a este plan
                  </Link>
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
