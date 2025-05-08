"use client"

import { useState, useEffect, use } from "react"
import { ArrowLeft, Calendar, CreditCard, User, FileText, Download, Printer } from 'lucide-react'
import Link from "next/link"

// Tipo para los pagos
type PaymentType = "CARD" | "BANK_TRANSFER" | "PAYPAL" | "CASH"

type PaymentDetail = {
  id: string
  clientName: string
  planName: string
  amount: number
  date: string
  payment: PaymentType
  planDescription: string
}

export default function PaymentDetailPage(props: { params: Promise<{ id?: string }> }) {
  const { id } = use(props.params)
  const [payment, setPayment] = useState<PaymentDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPaymentDetail = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`http://localhost:8080/payment/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Pago no encontrado")
          }
          throw new Error("Error al cargar los detalles del pago")
        }

        const data = await response.json()
        setPayment(data)
      } catch (error) {
        console.error("Error fetching payment details:", error)
        setError(error instanceof Error ? error.message : "Error desconocido")
        
        // Datos de ejemplo como fallback
        if (id === "1") {
          setPayment({
            id: "1",
            clientName: "Juan Pérez",
            planName: "Plan Premium",
            amount: 80.00,
            date: "2025-05-01T10:30:00",
            payment: "CARD",
            planDescription: "Acceso ilimitado a todas las instalaciones y clases"
          })
        }
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPaymentDetail()
    }
  }, [id])

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  // Obtener icono según tipo de pago
  const getPaymentIcon = (type: PaymentType) => {
    switch (type) {
      case "CARD":
        return <CreditCard className="w-5 h-5 text-blue-500" />
      case "BANK_TRANSFER":
        return <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      case "PAYPAL":
        return <svg className="w-5 h-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      case "CASH":
        return <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      default:
        return <CreditCard className="w-5 h-5" />
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

  // Mostrar error
  if (error || !payment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/payment" className="inline-flex items-center text-sky-600 hover:text-sky-800">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver a Pagos
          </Link>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600 mb-4">{error || "No se pudo cargar la información del pago"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navegación */}
      <div className="mb-6">
        <Link href="/payment" className="inline-flex items-center text-sky-600 hover:text-sky-800">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Volver a Pagos
        </Link>
      </div>

      {/* Encabezado */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-6">
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2">Detalle de Pago</h1>
              <p className="text-white/90">Comprobante #{payment.id}</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-lg text-white">
                <Download className="w-5 h-5" />
              </button>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-lg text-white">
                <Printer className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Información del pago */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-bold text-lg text-gray-900">Información del Pago</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Cliente</h3>
                <div className="flex items-center">
                  <User className="w-5 h-5 text-sky-600 mr-2" />
                  <p className="text-gray-900 font-medium">{payment.clientName}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Fecha de Pago</h3>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-sky-600 mr-2" />
                  <p className="text-gray-900">{formatDate(payment.date)}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Plan</h3>
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-sky-600 mr-2" />
                  <p className="text-gray-900">{payment.planName}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Método de Pago</h3>
                <div className="flex items-center">
                  {getPaymentIcon(payment.payment)}
                  <p className="text-gray-900 ml-2">
                    {payment.payment === "CARD" ? "Tarjeta" : 
                     payment.payment === "BANK_TRANSFER" ? "Transferencia" :
                     payment.payment === "PAYPAL" ? "PayPal" : "Efectivo"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Descripción del Plan</h3>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{payment.planDescription}</p>
            </div>
          </div>
        </div>

        {/* Resumen del pago */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-fit">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-bold text-lg text-gray-900">Resumen</h2>
          </div>
          <div className="p-6">
            <div className="flex justify-between mb-4 pb-4 border-b border-gray-100">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900 font-medium">${payment.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 pb-4 border-b border-gray-100">
              <span className="text-gray-600">Impuestos</span>
              <span className="text-gray-900 font-medium">$0.00</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span className="text-gray-900">Total</span>
              <span className="text-sky-600">${payment.amount.toFixed(2)}</span>
            </div>
            
            <div className="mt-6 p-3 bg-green-50 text-green-700 rounded-lg text-sm text-center">
              Pago completado exitosamente
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
