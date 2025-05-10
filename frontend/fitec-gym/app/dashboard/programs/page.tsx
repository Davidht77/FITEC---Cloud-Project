import Link from "next/link"
import Image from "next/image"
import { Dumbbell, Weight, Flame, Timer, SpaceIcon as Yoga } from "lucide-react"

export default function ProgramsPage() {
  return (
    <div className="p-6 max-w-full">
      {/* Encabezado */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Programas de Entrenamiento</h1>
          <p className="opacity-90">
            Explora nuestros programas especializados diseñados para ayudarte a alcanzar tus objetivos fitness.
          </p>
        </div>
      </div>

      {/* Programas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Fitness General */}
        <Link
          href="/programs/fitness"
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="relative h-40 w-full">
            <Image src="/placeholder.svg?height=200&width=400" alt="Fitness General" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-4 text-white">
                <div className="flex items-center mb-1">
                  <Dumbbell className="w-4 h-4 mr-2 text-yellow-400" />
                  <span className="text-sm font-medium text-yellow-400">Fitness General</span>
                </div>
                <h3 className="font-bold">Entrenamiento completo</h3>
              </div>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-600 text-sm mb-3">
              Mejora tu condición física general, aumenta resistencia y tonifica el cuerpo.
            </p>
            <div className="flex justify-between text-xs text-gray-500">
              <span>12 semanas</span>
              <span>3-4 sesiones/semana</span>
            </div>
          </div>
        </Link>

        {/* Pérdida de Peso */}
        <Link
          href="/programs/perdida-de-peso"
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="relative h-40 w-full">
            <Image src="/placeholder.svg?height=200&width=400" alt="Pérdida de Peso" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-4 text-white">
                <div className="flex items-center mb-1">
                  <Flame className="w-4 h-4 mr-2 text-yellow-400" />
                  <span className="text-sm font-medium text-yellow-400">Pérdida de Peso</span>
                </div>
                <h3 className="font-bold">Quema grasa efectiva</h3>
              </div>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-600 text-sm mb-3">Programa especializado en quemar grasa y tonificar el cuerpo.</p>
            <div className="flex justify-between text-xs text-gray-500">
              <span>16 semanas</span>
              <span>4-5 sesiones/semana</span>
            </div>
          </div>
        </Link>

        {/* Musculación */}
        <Link
          href="/programs/musculacion"
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="relative h-40 w-full">
            <Image src="/placeholder.svg?height=200&width=400" alt="Musculación" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-4 text-white">
                <div className="flex items-center mb-1">
                  <Weight className="w-4 h-4 mr-2 text-yellow-400" />
                  <span className="text-sm font-medium text-yellow-400">Musculación</span>
                </div>
                <h3 className="font-bold">Desarrollo muscular</h3>
              </div>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-600 text-sm mb-3">Enfocado en el desarrollo muscular y aumento de fuerza.</p>
            <div className="flex justify-between text-xs text-gray-500">
              <span>12 semanas</span>
              <span>4-6 sesiones/semana</span>
            </div>
          </div>
        </Link>

        {/* CrossFit */}
        <Link
          href="/programs/crossfit"
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="relative h-40 w-full">
            <Image src="/placeholder.svg?height=200&width=400" alt="CrossFit" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-4 text-white">
                <div className="flex items-center mb-1">
                  <Timer className="w-4 h-4 mr-2 text-yellow-400" />
                  <span className="text-sm font-medium text-yellow-400">CrossFit</span>
                </div>
                <h3 className="font-bold">Entrenamiento funcional</h3>
              </div>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-600 text-sm mb-3">
              Entrenamiento funcional de alta intensidad para mejorar todas tus capacidades físicas.
            </p>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Continuo</span>
              <span>3-5 sesiones/semana</span>
            </div>
          </div>
        </Link>

        {/* Yoga y Pilates */}
        <Link
          href="/programs/yoga-pilates"
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="relative h-40 w-full">
            <Image src="/placeholder.svg?height=200&width=400" alt="Yoga y Pilates" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-4 text-white">
                <div className="flex items-center mb-1">
                  <Yoga className="w-4 h-4 mr-2 text-yellow-400" />
                  <span className="text-sm font-medium text-yellow-400">Yoga y Pilates</span>
                </div>
                <h3 className="font-bold">Flexibilidad y equilibrio</h3>
              </div>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-600 text-sm mb-3">
              Mejora tu flexibilidad, equilibrio y fuerza central con nuestras clases.
            </p>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Continuo</span>
              <span>2-3 sesiones/semana</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Información */}
      <div className="mt-6 bg-yellow-50 rounded-xl shadow-sm overflow-hidden border border-yellow-100">
        <div className="p-6">
          <h2 className="text-lg font-bold mb-3 text-yellow-800">Información Importante</h2>
          <p className="text-yellow-700">
            Todos estos programas están incluidos sin costo adicional para todos los miembros de FITEC. No se requiere
            inscripción especial ni pagos extras.
          </p>
        </div>
      </div>
    </div>
  )
}
