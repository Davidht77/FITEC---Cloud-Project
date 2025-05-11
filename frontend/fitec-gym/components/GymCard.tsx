import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone } from "lucide-react"

// Interfaz que coincide con la estructura del backend
interface Sede {
  id: string
  name: string
  address: string
  phone: string
  imagenUrlKey?: string
}

interface GymCardProps {
  sede: Sede
}

export default function GymCard({ sede }: GymCardProps) {
  // Generar URL de imagen basada en imagenUrlKey o usar placeholder
  const imageUrl = sede.imagenUrlKey
    ? `https://tu-bucket-s3.amazonaws.com/${sede.imagenUrlKey}` // Ajusta esta URL según tu configuración
    : "/modern-gym-interior.png"

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="relative h-40">
        <Image src={imageUrl || "/placeholder.svg"} alt={sede.name} fill className="object-cover" />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg">{sede.name}</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Abierto</span>
        </div>

        <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
          <MapPin className="w-4 h-4" />
          <span>{sede.address}</span>
        </div>

        <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
          <Phone className="w-4 h-4" />
          <span>{sede.phone}</span>
        </div>

        <Link
          href={`/dashboard/sedes/${sede.id}`}
          className="mt-3 block w-full text-center bg-sky-50 hover:bg-sky-100 text-sky-700 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  )
}
