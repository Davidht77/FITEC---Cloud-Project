"use client"

import { useEffect, useState } from "react"
import { MapPin, Phone, Search, Filter, ArrowRight } from "lucide-react"
import Link from "next/link"

// Tipo para la sede basado en el modelo proporcionado
type Sede = {
  id: string
  name: string
  address: string
  phone: string
}

// Datos estáticos de sedes para usar como fallback
const sedesPorDefecto: Sede[] = [
  {
    id: "1",
    name: "Campus Central",
    address: "Av. Universitaria 1234",
    phone: "987654321",
  },
  {
    id: "2",
    name: "Campus Sur",
    address: "Calle Sur 456",
    phone: "998877665",
  },
]

export default function SedesPage() {
  const [sedes, setSedes] = useState<Sede[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
  const fetchSedes = async () => {
    try {
      setLoading(true)

      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("No se encontró el token de sesión")
      }

      const response = await fetch("http://54.83.178.156:8080/sede", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Error al cargar las sedes")
      }

      const data = await response.json()

      const formateadas = data.map((sede: any) => ({
        id: sede.id,
        name: sede.name,
        address: sede.address,
        phone: sede.phone,
      }))

      setSedes(formateadas)
    } catch (error) {
      console.error("Error fetching sedes:", error)
      setSedes(sedesPorDefecto)
    } finally {
      setLoading(false)
    }
  }

  fetchSedes()
}, [])


  // Filtrar sedes según el término de búsqueda
  const filteredSedes = sedes.filter(
    (sede) =>
      sede.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sede.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Nuestras Sedes</h1>
        <p className="mt-2 text-gray-600">Explora todas las sedes de FITEC disponibles para ti</p>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar por nombre o ubicación..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
          <Filter className="h-5 w-5 mr-2" />
          Filtros
        </button>
      </div>

      {/* Estado de carga */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600"></div>
        </div>
      ) : (
        <>
          {/* Grid de sedes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSedes.map((sede) => (
              <div
                key={sede.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                {/* Imagen de la sede (placeholder) */}
                <div className="h-48 bg-gray-200 relative">
                  <img
                    src={`/placeholder.svg?height=200&width=400&text=${sede.name}`}
                    alt={sede.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Información de la sede */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{sede.name}</h3>

                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{sede.address}</span>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{sede.phone}</span>
                  </div>

                  {/* Botón para ver detalles */}
                  <Link
                    href={`/dashboard/sedes/${sede.id}`}
                    className="w-full inline-flex justify-center items-center px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                  >
                    Ver detalles
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Mensaje si no hay resultados */}
          {filteredSedes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No se encontraron sedes que coincidan con tu búsqueda.</p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
              >
                Mostrar todas las sedes
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
