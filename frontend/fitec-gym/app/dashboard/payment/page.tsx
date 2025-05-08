"use client"

import { useState, useEffect } from "react"
import { Calendar, CreditCard, Search, Filter, ArrowRight, Download } from 'lucide-react'
import Link from "next/link"

// Tipo para los pagos
type PaymentType = "CARD" | "BANK_TRANSFER" | "PAYPAL" | "CASH"

type PaymentSummary = {
  id: string
  clientName: string
  planName: string
  amount: number
  date: string
  payment: PaymentType
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [clientId, setClientId] = useState<string | null>(null)

  // Cargar el ID del cliente desde localStorage al iniciar
  useEffect(() => {
    const id = localStorage.getItem("id")
    setClientId(id)
  }, [])

  // Cargar pagos
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true)
        
        // Si hay un ID de cliente, cargar solo sus pagos
        const endpoint = clientId 
          ? `http://localhost:8080/payment/client/${clientId}`
          : "http://localhost:8080/payment"
        
        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })

        if (!response.ok) {
          throw new Error("Error al cargar los pagos")
        }

        const data = await response.json()
        setPayments(data)
      } catch (error) {
        console.error("Error fetching payments:", error)
        // Datos de ejemplo como fallback
        setPayments([
          {
            id: "1",
            clientName: "Juan Pérez",
            planName: "Plan Premium",
            amount: 80.00,
            date: "2025-05-01T10:30:00",
            payment: "CARD"
          },
          {
            id: "2",
            clientName: "María López",
            planName: "Plan Básico",
            amount: 50.00,
            date: "2025-04-28T15:45:00",
            payment: "PAYPAL"
          },
          {
            id: "3",
            clientName: "Carlos Rodríguez",
            planName: "Plan VIP",
            amount: 120.00,
            date: "2025-04-25T09:15:00",
            payment: "BANK_TRANSFER"
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchPayments()
  }, [clientId])

  // Filtrar pagos según el término de búsqueda
  const filteredPayments = payments.filter(payment => 
    payment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.planName.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
        return <CreditCard className="w-4 h-4 text-blue-500" />
      case "BANK_TRANSFER":
        return <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      case "PAYPAL":
        return <svg className="w-4 h-4 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      case "CASH":
        return <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      default:
        return <CreditCard className="w-4 h-4" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Historial de Pagos</h1>
        <p className="mt-2 text-gray-600">
          Visualiza y gestiona todos tus pagos en FITEC
        </p>
      </div>

      {/* Barra de búsqueda y acciones */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar por cliente o plan..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            <Filter className="h-5 w-5 mr-2" />
            Filtros
          </button>
          <Link
            href="/dashboard/payment/new"
            className="inline-flex items-center px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
          >
            <CreditCard className="h-5 w-5 mr-2" />
            Nuevo Pago
          </Link>
        </div>
      </div>

      {/* Estado de carga */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600"></div>
        </div>
      ) : (
        <>
          {/* Tabla de pagos */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Monto
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Método
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{payment.clientName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{payment.planName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">${payment.amount.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 flex items-center">
                          <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                          {formatDate(payment.date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getPaymentIcon(payment.payment)}
                          <span className="ml-1 text-sm text-gray-900">
                            {payment.payment === "CARD" ? "Tarjeta" : 
                             payment.payment === "BANK_TRANSFER" ? "Transferencia" :
                             payment.payment === "PAYPAL" ? "PayPal" : "Efectivo"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link 
                          href={`/payment/${payment.id}`}
                          className="text-sky-600 hover:text-sky-900 mr-3"
                        >
                          Ver
                        </Link>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Download className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mensaje si no hay resultados */}
          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No se encontraron pagos que coincidan con tu búsqueda.</p>
              <button 
                onClick={() => setSearchTerm("")}
                className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
              >
                Mostrar todos los pagos
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
