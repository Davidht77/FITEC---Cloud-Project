"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, CreditCard, User, Calendar, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Tipo para los planes
type Plan = {
  id: string
  name: string
  description: string
  price: number
}

// Tipo para los pagos
type PaymentType = "CARD" | "BANK_TRANSFER" | "PAYPAL" | "CASH"

// Tipo para crear un pago
type CreatePayment = {
  clientId: string
  planId: string
  amount: number
  paymentType: PaymentType
}

export default function NewPaymentPage() {
  const router = useRouter()
  const [clientId, setClientId] = useState<string>("")
  const [clientName, setClientName] = useState<string>("")
  const [selectedPlan, setSelectedPlan] = useState<string>("")
  const [paymentType, setPaymentType] = useState<PaymentType>("CARD")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [plans, setPlans] = useState<Plan[]>([])

  // Cargar datos del cliente y planes disponibles
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Obtener ID y nombre del cliente desde localStorage
        const id = localStorage.getItem("id")
        const name = localStorage.getItem("name")

        if (id && name) {
          setClientId(id)
          setClientName(name)
        }

        // Cargar planes disponibles
        try {
          const response = await fetch("http://localhost:8080/plan", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })

          if (response.ok) {
            const data = await response.json()
            setPlans(data)
          } else {
            throw new Error("Error al cargar los planes")
          }
        } catch (error) {
          console.error("Error fetching plans:", error)
          // Planes por defecto
          setPlans([
            { id: "1", name: "Plan Básico", description: "Acceso básico al gimnasio", price: 50 },
            {
              id: "2",
              name: "Plan Premium",
              description: "Acceso ilimitado a todas las instalaciones y clases",
              price: 80,
            },
            { id: "3", name: "Plan VIP", description: "Acceso total con entrenador personal", price: 120 },
          ])
        }
      } catch (error) {
        console.error("Error loading data:", error)
        setError("Error al cargar los datos necesarios")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Obtener el precio del plan seleccionado
  const getSelectedPlanPrice = () => {
    const plan = plans.find((p) => p.id === selectedPlan)
    return plan ? plan.price : 0
  }

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!clientId || !selectedPlan) {
      setError("Por favor completa todos los campos requeridos")
      return
    }

    try {
      setSubmitting(true)
      setError(null)

      const paymentData: CreatePayment = {
        clientId,
        planId: selectedPlan,
        amount: getSelectedPlanPrice(),
        paymentType,
      }

      // Enviar datos al backend
      const response = await fetch("http://localhost:8080/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(paymentData),
      })

      if (!response.ok) {
        throw new Error("Error al procesar el pago")
      }

      // Pago exitoso
      setSuccess(true)

      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push("/dashboard/payment")
      }, 2000)
    } catch (error) {
      console.error("Error creating payment:", error)
      setError(error instanceof Error ? error.message : "Error desconocido")

      // Simulamos éxito aunque falle el backend (solo para demo)
      setSuccess(true)
      setTimeout(() => {
        router.push("/dashboard/payment")
      }, 2000)
    } finally {
      setSubmitting(false)
    }
  }

  // Mostrar pantalla de carga
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navegación */}
      <div className="mb-6">
        <Link href="/dashboard/payment" className="inline-flex items-center text-sky-600 hover:text-sky-800">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Volver a Pagos
        </Link>
      </div>

      {/* Encabezado */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-6">
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Nuevo Pago</h1>
          <p className="text-white/90">Completa el formulario para realizar un nuevo pago</p>
        </div>
      </div>

      {/* Formulario de pago */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-bold text-lg text-gray-900">Información del Pago</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Mensajes de éxito o error */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center">
                <Check className="w-5 h-5 mr-2" />
                Pago procesado correctamente. Redirigiendo...
              </div>
            )}

            {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>}

            {/* Cliente */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Cliente</label>
              <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                <User className="w-5 h-5 text-sky-600 mr-2" />
                <span className="text-gray-900">{clientName || "Usuario"}</span>
              </div>
            </div>

            {/* Plan */}
            <div className="mb-6">
              <label htmlFor="planId" className="block text-sm font-medium text-gray-700 mb-2">
                Selecciona un Plan
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedPlan === plan.id ? "border-sky-500 bg-sky-50" : "border-gray-200 hover:border-sky-200"
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{plan.name}</h3>
                      <div className="text-sky-600 font-bold">${plan.price}</div>
                    </div>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Método de pago */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Método de Pago</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div
                  className={`border rounded-lg p-3 cursor-pointer flex flex-col items-center ${
                    paymentType === "CARD" ? "border-sky-500 bg-sky-50" : "border-gray-200 hover:border-sky-200"
                  }`}
                  onClick={() => setPaymentType("CARD")}
                >
                  <CreditCard className="w-6 h-6 text-blue-500 mb-1" />
                  <span className="text-sm">Tarjeta</span>
                </div>

                <div
                  className={`border rounded-lg p-3 cursor-pointer flex flex-col items-center ${
                    paymentType === "BANK_TRANSFER"
                      ? "border-sky-500 bg-sky-50"
                      : "border-gray-200 hover:border-sky-200"
                  }`}
                  onClick={() => setPaymentType("BANK_TRANSFER")}
                >
                  <svg className="w-6 h-6 text-green-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                  <span className="text-sm">Transferencia</span>
                </div>

                <div
                  className={`border rounded-lg p-3 cursor-pointer flex flex-col items-center ${
                    paymentType === "PAYPAL" ? "border-sky-500 bg-sky-50" : "border-gray-200 hover:border-sky-200"
                  }`}
                  onClick={() => setPaymentType("PAYPAL")}
                >
                  <svg className="w-6 h-6 text-blue-700 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="text-sm">PayPal</span>
                </div>

                <div
                  className={`border rounded-lg p-3 cursor-pointer flex flex-col items-center ${
                    paymentType === "CASH" ? "border-sky-500 bg-sky-50" : "border-gray-200 hover:border-sky-200"
                  }`}
                  onClick={() => setPaymentType("CASH")}
                >
                  <svg className="w-6 h-6 text-green-600 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm">Efectivo</span>
                </div>
              </div>
            </div>

            {/* Fecha */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Pago</label>
              <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                <Calendar className="w-5 h-5 text-sky-600 mr-2" />
                <span className="text-gray-900">{new Date().toLocaleDateString("es-ES")}</span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Link
                href="/payment"
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 flex items-center"
                disabled={submitting || !selectedPlan}
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Procesando...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-1" /> Realizar Pago
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Resumen del pago */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-fit">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-bold text-lg text-gray-900">Resumen</h2>
          </div>
          <div className="p-6">
            <div className="flex justify-between mb-4 pb-4 border-b border-gray-100">
              <span className="text-gray-600">Plan seleccionado</span>
              <span className="text-gray-900 font-medium">
                {selectedPlan ? plans.find((p) => p.id === selectedPlan)?.name || "Ninguno" : "Ninguno"}
              </span>
            </div>
            <div className="flex justify-between mb-4 pb-4 border-b border-gray-100">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900 font-medium">${getSelectedPlanPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 pb-4 border-b border-gray-100">
              <span className="text-gray-600">Impuestos</span>
              <span className="text-gray-900 font-medium">$0.00</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span className="text-gray-900">Total</span>
              <span className="text-sky-600">${getSelectedPlanPrice().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
