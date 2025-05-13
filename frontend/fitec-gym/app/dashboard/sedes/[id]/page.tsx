"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, MapPin, Phone, Users, Edit, Trash, Save, X } from "lucide-react"
import Link from "next/link"
import { use } from "react"

// Tipo para la sede basado en el modelo proporcionado
type Sede = {
  id: string
  name: string
  address: string
  phone: string
}

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

// Componente wrapper para manejar los parámetros
function SedeDetailPageWrapper({ params }: { params: { id: string } }) {
  // Usamos React.use para desenvolver los parámetros
  const unwrappedParams = use(Promise.resolve(params))
  return <SedeDetailPageContent id={unwrappedParams.id} />
}

// Componente principal que recibe el ID ya desenvuelto
function SedeDetailPageContent({ id }: { id: string }) {
  const router = useRouter()
  const [sede, setSede] = useState<Sede | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<Sede | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)

  // Verificar el rol del usuario al cargar
  useEffect(() => {
    const role = localStorage.getItem("role")
    setUserRole(role)
  }, [])

  // Cargar datos de la sede desde backend o datos fijos
  useEffect(() => {
    const fetchSede = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://54.83.178.156:8080/sede/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        if (!response.ok) {
          throw new Error("No encontrada en backend")
        }

        const data = await response.json()
        setSede(data)
        setEditForm(data)
      } catch (err) {
        console.error("Error fetching sede:", err)

        // Buscar sede en datos fijos si el fetch falla
        const fallback = sedesPorDefecto.find((s) => s.id === id)
        if (fallback) {
          setSede(fallback)
          setEditForm(fallback)
        } else {
          setError("Sede no encontrada")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchSede()
  }, [id])

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editForm) return

    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    })
  }

  // Guardar cambios
  const handleSave = async () => {
    if (!editForm) return

    try {
      const response = await fetch(`http://54.83.178.156:8080/sede/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editForm),
      })

      if (!response.ok) {
        throw new Error("Error al actualizar la sede")
      }

      const updatedSede = await response.json()
      setSede(updatedSede)
      setIsEditing(false)
    } catch (err) {
      console.error("Error updating sede:", err)
      alert("Error al actualizar la sede. Inténtalo de nuevo.")
    }
  }

  // Eliminar sede
  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta sede? Esta acción no se puede deshacer.")) {
      return
    }

    try {
      const response = await fetch(`http://54.83.178.156:8080/sede/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Error al eliminar la sede")
      }

      router.push("/dashboard/sedes")
    } catch (err) {
      console.error("Error deleting sede:", err)
      alert("Error al eliminar la sede. Inténtalo de nuevo.")
    }
  }

  // Mostrar pantalla de carga
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600"></div>
      </div>
    )
  }

  // Mostrar error
  if (error || !sede) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600 mb-4">{error || "No se pudo cargar la información de la sede"}</p>
          <Link
            href="/dashboard/sedes"
            className="inline-flex items-center px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Sedes
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Navegación */}
      <div className="mb-6">
        <Link href="/dashboard/sedes" className="inline-flex items-center text-sky-600 hover:text-sky-800">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Volver a Sedes
        </Link>
      </div>

      {/* Encabezado */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editForm?.name || ""}
                  onChange={handleInputChange}
                  className="text-2xl font-bold bg-white/20 rounded px-2 py-1 mb-2 text-white"
                />
              ) : (
                <h1 className="text-2xl font-bold mb-2">{sede.name}</h1>
              )}

              <div className="flex items-center text-white/90 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={editForm?.address || ""}
                    onChange={handleInputChange}
                    className="bg-white/20 rounded px-2 py-1 text-white"
                  />
                ) : (
                  <span>{sede.address}</span>
                )}
              </div>

              <div className="flex items-center text-white/90">
                <Phone className="w-4 h-4 mr-1" />
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={editForm?.phone || ""}
                    onChange={handleInputChange}
                    className="bg-white/20 rounded px-2 py-1 text-white"
                  />
                ) : (
                  <span>{sede.phone}</span>
                )}
              </div>
            </div>

            {/* Botones de acción (solo para administradores) */}
            {userRole === "admin" && (
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
                      title="Guardar cambios"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false)
                        setEditForm(sede)
                      }}
                      className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full"
                      title="Cancelar"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full"
                      title="Editar sede"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                      title="Eliminar sede"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Estadísticas */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-sky-600" />
            <h3 className="text-lg font-medium text-gray-900">Capacidad</h3>
            <p className="text-2xl font-bold text-sky-600">100</p>
            <p className="text-sm text-gray-500">usuarios máximo</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="w-8 h-8 mx-auto mb-2 text-green-600 flex items-center justify-center">
              <span className="text-xl font-bold">5</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Programas</h3>
            <p className="text-2xl font-bold text-green-600">5</p>
            <p className="text-sm text-gray-500">programas activos</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="w-8 h-8 mx-auto mb-2 text-yellow-600 flex items-center justify-center">
              <span className="text-xl font-bold">4.8</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Calificación</h3>
            <p className="text-2xl font-bold text-yellow-600">4.8/5</p>
            <p className="text-sm text-gray-500">basado en 120 reseñas</p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Horarios */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-sky-600 p-4 text-white">
            <h2 className="text-lg font-bold">Horarios</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-600">Lunes - Viernes</span>
                <span className="font-medium">6:00 - 22:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Sábado</span>
                <span className="font-medium">8:00 - 20:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Domingo</span>
                <span className="font-medium">9:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Programas */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-green-600 p-4 text-white">
            <h2 className="text-lg font-bold">Programas Disponibles</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span>Entrenamiento Funcional</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span>Yoga</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span>Spinning</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span>Zumba</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span>Musculación</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Instructores */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-purple-600 p-4 text-white">
            <h2 className="text-lg font-bold">Instructores</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center text-gray-500">
                  JD
                </div>
                <div>
                  <p className="font-medium">Juan Díaz</p>
                  <p className="text-sm text-gray-500">Entrenamiento Funcional</p>
                </div>
              </li>
              <li className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center text-gray-500">
                  MR
                </div>
                <div>
                  <p className="font-medium">María Rodríguez</p>
                  <p className="text-sm text-gray-500">Yoga</p>
                </div>
              </li>
              <li className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center text-gray-500">
                  CP
                </div>
                <div>
                  <p className="font-medium">Carlos Pérez</p>
                  <p className="text-sm text-gray-500">Musculación</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href={`/dashboard/sedes/${id}/reservar`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium flex items-center"
        >
          Reservar Clase
        </Link>

        <Link
          href={`/dashboard/sedes/${id}/programas`}
          className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-medium flex items-center"
        >
          Ver Programas
        </Link>

        <Link
          href={`/dashboard/sedes/${id}/instructores`}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium flex items-center"
        >
          Conoce a los Instructores
        </Link>
      </div>
    </div>
  )
}

// Exportamos el componente wrapper como componente principal
export default SedeDetailPageWrapper
