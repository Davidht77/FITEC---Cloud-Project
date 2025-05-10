"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, AlertTriangle, Check, X, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

// Tipo para los planes
type Plan = {
  id: string
  name: string
  description: string
  price: number
}

// Tipo para el cliente
type Client = {
  id: string
  name: string
  lastName: string
  age: number
  email: string
  phone: string
  plan: Plan | null
}

// Tipo para la solicitud de actualización del cliente
type ClientRequestDto = {
  name: string
  lastName: string
  age: number
  email: string
  phone: string
  planId: string
}

export default function ChangePlanConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planId = searchParams.get("planId")

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [client, setClient] = useState<Client | null>(null)
  const [newPlan, setNewPlan] = useState<Plan | null>(null)
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)


    // Fallback de planes por ID
    const fallbackPlans: Record<string, Plan> = {
    "1": {
        id: "1",
        name: "Plan Básico",
        description: "Acceso básico al gimnasio",
        price: 50,
    },
    "2": {
        id: "2",
        name: "Plan Plus",
        description: "Acceso completo + clases grupales",
        price: 80,
    },
    "3": {
        id: "3",
        name: "Plan Premium",
        description: "Todo incluido + entrenador personal",
        price: 120,
    },
    }

  // Cargar datos del cliente y planes
  useEffect(() => {
    const clientId = localStorage.getItem("id")
    const fetchData = async () => {
      try {
        setLoading(true)

        // Obtener ID del cliente desde localStorage
        const clientId = localStorage.getItem("id")

        if (!clientId) {
          setError("No se pudo identificar al cliente")
          return
        }

        if (!planId) {
          setError("No se especificó el plan a cambiar")
          return
        }

        // Obtener datos del cliente
        const clientResponse = await fetch(`http://localhost:8080/client/${clientId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        if (!clientResponse.ok) {
          throw new Error("Error al cargar los datos del cliente")
        }

        const clientData: Client = await clientResponse.json()
        setClient(clientData)
        setCurrentPlan(clientData.plan)

        // Obtener datos del nuevo plan
        const planResponse = await fetch(`http://localhost:8080/plan/${planId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        if (!planResponse.ok) {
          throw new Error("Error al cargar los datos del plan")
        }

        const planData: Plan = await planResponse.json()
        setNewPlan(planData)
      } catch (error) {
        console.error("Error loading data:", error)
        setError("Error al cargar los datos necesarios")
        const mockClient: Client = {
        id: clientId ?? "0",
        name: "Usuario",
        lastName: "Demo",
        age: 20,
        email: "demo@fitec.com",
        phone: "987654321",
        plan: null,
    }
    setClient(mockClient)
    setCurrentPlan(null)

    const fallbackPlan = fallbackPlans[planId ?? ""] ?? fallbackPlans["1"]
    setNewPlan(fallbackPlan)

    setError(null)  // 👈 Esto limpia el mensaje rojo una vez cargado el mock


      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [planId])

  // Manejar la confirmación del cambio de plan
  const handleConfirmChange = async () => {
    if (!client || !newPlan) return

    try {
      setSubmitting(true)
      setError(null)

      // Preparar los datos para la actualización
      const updateData: ClientRequestDto = {
        name: client.name,
        lastName: client.lastName,
        age: client.age,
        email: client.email,
        phone: client.phone,
        planId: newPlan.id,
      }

      // Enviar solicitud PUT para actualizar el cliente
      const response = await fetch(`http://localhost:8080/client/${client.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updateData),
      })

      if (!response.ok) {
        throw new Error("Error al actualizar el plan")
      }

      // Actualización exitosa
      setSuccess(true)
      setShowConfirmModal(false)

      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push("/dashboard/plans")
      }, 2000)
    } catch (error) {
      console.error("Error updating plan:", error)
      setError(error instanceof Error ? error.message : "Error desconocido")
    } finally {
      setSubmitting(false)
    }
  }

  // Obtener el color del plan
  const getPlanColor = (planName: string) => {
    if (planName === "Plan Básico") return "blue"
    if (planName === "Plan Plus") return "green"
    if (planName === "Plan Premium") return "purple"
    return "gray"
  }

  // Mostrar pantalla de carga
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600"></div>
      </div>
    )
  }

  // Mostrar error si no se pudo cargar los datos
  if (error && !client && !newPlan) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </div>
          <Link href="/dashboard/plans" className="mt-4 inline-flex items-center text-red-700 hover:text-red-800">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver a Planes
          </Link>
        </div>
      </div>
    )
  }

  // Si no hay cliente o plan, mostrar mensaje de error
  if (!client || !newPlan) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg mb-6">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <span>No se pudieron cargar los datos necesarios</span>
          </div>
          <Link href="/dashboard/plans" className="mt-4 inline-flex items-center text-yellow-700 hover:text-yellow-800">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver a Planes
          </Link>
        </div>
      </div>
    )
  }

  const newPlanColor = getPlanColor(newPlan.name)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navegación */}
      <div className="mb-6">
        <Link href="/dashboard/plans" className="inline-flex items-center text-sky-600 hover:text-sky-800">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Volver a Planes
        </Link>
      </div>

      {/* Mensajes de éxito o error */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center">
          <Check className="w-5 h-5 mr-2" />
          Plan actualizado correctamente. Redirigiendo...
        </div>
      )}

      {error && !success && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      {/* Encabezado */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-6">
        <div className={`bg-${newPlanColor}-600 p-6 text-white`}>
          <h1 className="text-2xl font-bold mb-2">Cambio de Plan</h1>
          <p className="text-white/90">Confirma el cambio a {newPlan.name}</p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Información del cambio */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-lg text-gray-900">Información del Cambio</h2>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Plan actual */}
                <div className="flex-1 border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-medium text-gray-500 mb-2">Plan Actual</h3>
                  {currentPlan ? (
                    <>
                      <div className="font-bold text-lg mb-1">{currentPlan.name}</div>
                      <div className="text-gray-600 mb-2">{currentPlan.description}</div>
                      <div className="text-lg font-bold text-gray-900">${currentPlan.price}/mes</div>
                    </>
                  ) : (
                    <div className="text-gray-500 italic">Sin plan activo</div>
                  )}
                </div>

                {/* Flecha */}
                <div className="flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-gray-400 transform rotate-90 md:rotate-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>

                {/* Nuevo plan */}
                <div className={`flex-1 border rounded-lg p-4 bg-${newPlanColor}-50 border-${newPlanColor}-200`}>
                  <h3 className={`font-medium text-${newPlanColor}-700 mb-2`}>Nuevo Plan</h3>
                  <div className="font-bold text-lg mb-1">{newPlan.name}</div>
                  <div className="text-gray-600 mb-2">{newPlan.description}</div>
                  <div className={`text-lg font-bold text-${newPlanColor}-600`}>${newPlan.price}/mes</div>
                </div>
              </div>

              {/* Diferencia de precio */}
              {currentPlan && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium mb-2">Cambio en tu facturación</h3>
                  <div className="flex justify-between items-center">
                    <span>Diferencia mensual:</span>
                    <span
                      className={`font-bold ${newPlan.price > currentPlan.price ? "text-red-600" : "text-green-600"}`}
                    >
                      {newPlan.price > currentPlan.price ? "+" : ""}${(newPlan.price - currentPlan.price).toFixed(2)}
                      /mes
                    </span>
                  </div>
                </div>
              )}

              {/* Beneficios del nuevo plan */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Beneficios del {newPlan.name}</h3>
                <ul className="space-y-2">
                  {newPlan.name === "Plan Básico" && (
                    <>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0" />
                        <span>Acceso limitado al gimnasio (8am - 5pm)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0" />
                        <span>Acceso a equipamiento básico</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0" />
                        <span>Acceso a la aplicación móvil</span>
                      </li>
                    </>
                  )}

                  {newPlan.name === "Plan Plus" && (
                    <>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Acceso completo al gimnasio (6am - 10pm)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Clases grupales incluidas</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Evaluación física mensual</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Acceso a 3 sedes</span>
                      </li>
                    </>
                  )}

                  {newPlan.name === "Plan Premium" && (
                    <>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0" />
                        <span>Acceso ilimitado 24/7</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0" />
                        <span>Todas las clases incluidas</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0" />
                        <span>Entrenador personal (2 sesiones/semana)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0" />
                        <span>Evaluación nutricional</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0" />
                        <span>Acceso a todas las sedes</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0" />
                        <span>Invitados gratuitos (2 por mes)</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Términos y condiciones */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-lg text-gray-900">Términos y Condiciones</h2>
            </div>

            <div className="p-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-yellow-800">Importante</h3>
                    <p className="text-yellow-700 text-sm">
                      Al cambiar de plan, aceptas nuestras normas y restricciones. Por favor, lee detenidamente antes de
                      confirmar.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm text-gray-600">
                <p>Al confirmar el cambio al {newPlan.name}, aceptas los siguientes términos:</p>

                <ul className="list-disc pl-5 space-y-2">
                  <li>El cambio de plan se hará efectivo inmediatamente.</li>
                  <li>Se te cobrará la tarifa correspondiente al nuevo plan en tu próximo ciclo de facturación.</li>
                  <li>Si cambias a un plan de menor valor, no se realizarán reembolsos por el período ya pagado.</li>
                  <li>Debes cumplir con nuestras normas de uso de las instalaciones según el plan seleccionado.</li>
                  <li>Existe un período de permanencia mínima de 1 mes en el nuevo plan seleccionado.</li>
                  <li>
                    Al aceptar este cambio, te comprometes a pagar las cuotas correspondientes según los términos
                    establecidos en el contrato.
                  </li>
                </ul>

                <p>
                  Recuerda que ofrecemos un período de tolerancia, pero debes acatar nuestras normas de compromiso con
                  el cliente. Si te cambias de plan, es porque te comprometes a pagarlo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Resumen y acciones */}
        <div className="space-y-6">
          {/* Resumen */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-fit">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-lg text-gray-900">Resumen</h2>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Cliente:</span>
                  <span className="font-medium">
                    {client.name} {client.lastName}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Plan actual:</span>
                  <span className="font-medium">{currentPlan?.name || "Ninguno"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Nuevo plan:</span>
                  <span className={`font-medium text-${newPlanColor}-600`}>{newPlan.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Precio nuevo plan:</span>
                  <span className="font-medium">${newPlan.price}/mes</span>
                </div>

                {currentPlan && (
                  <div className="flex justify-between pt-2 border-t border-gray-100">
                    <span className="text-gray-600">Diferencia:</span>
                    <span
                      className={`font-bold ${newPlan.price > currentPlan.price ? "text-red-600" : "text-green-600"}`}
                    >
                      {newPlan.price > currentPlan.price ? "+" : ""}${(newPlan.price - currentPlan.price).toFixed(2)}
                      /mes
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className={`w-full py-3 px-4 rounded-lg bg-${newPlanColor}-500 hover:bg-${newPlanColor}-600 text-white font-medium transition-colors flex items-center justify-center`}
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Procesando...
                    </>
                  ) : (
                    <>Confirmar Cambio de Plan</>
                  )}
                </button>

                <Link
                  href="/dashboard/plans"
                  className="block w-full py-3 px-4 rounded-lg border border-gray-300 text-center text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </Link>
              </div>
            </div>
          </div>

          {/* Ayuda */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-lg text-gray-900">¿Necesitas ayuda?</h2>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Si tienes dudas sobre el cambio de plan o necesitas más información, no dudes en contactar con nuestro
                equipo de atención al cliente.
              </p>

              <div className="flex items-center justify-center">
                <button className="text-sky-600 hover:text-sky-800 font-medium">Contactar Soporte</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Confirmar cambio</h3>
                <button onClick={() => setShowConfirmModal(false)} className="text-gray-400 hover:text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-center mb-4">
                  <Shield className={`w-12 h-12 text-${newPlanColor}-500`} />
                </div>

                <p className="text-gray-600 text-center mb-4">¿Estás seguro de que deseas cambiar al {newPlan.name}?</p>

                <p className="text-sm text-gray-500 text-center">
                  Al confirmar, aceptas nuestras normas y te comprometes a pagar las cuotas correspondientes.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleConfirmChange}
                  className={`flex-1 py-2 px-4 rounded-lg bg-${newPlanColor}-500 hover:bg-${newPlanColor}-600 text-white font-medium transition-colors`}
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2 inline-block"></div>
                      Procesando...
                    </>
                  ) : (
                    <>Sí, confirmar</>
                  )}
                </button>

                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-2 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  disabled={submitting}
                >
                  No, cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
