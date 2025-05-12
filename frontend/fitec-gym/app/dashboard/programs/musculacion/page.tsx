import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, User } from "lucide-react"

export default function MusculacionPage() {
  return (
    <div className="p-6 max-w-full">
      {/* Navegación */}
      <div className="mb-6 flex items-center">
        <Link href="/programs" className="text-sky-600 hover:text-sky-800 flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Volver a Programas</span>
        </Link>
      </div>

      {/* Encabezado */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Musculación</h1>
          <p className="opacity-90">
            Enfocado en el desarrollo muscular y aumento de fuerza, con rutinas específicas para cada grupo muscular.
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-sky-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Duración</p>
                <p className="font-medium">12 semanas</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-sky-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Frecuencia</p>
                <p className="font-medium">4-6 sesiones por semana</p>
              </div>
            </div>
            <div className="flex items-center">
              <User className="w-5 h-5 text-sky-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Nivel</p>
                <p className="font-medium">Intermedio a Avanzado</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda */}
        <div className="lg:col-span-2 space-y-6">
          {/* Descripción */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Sobre el Programa</h2>
              <p className="text-gray-600 mb-4">
                Nuestro programa de Musculación está diseñado para quienes buscan desarrollar masa muscular y aumentar
                su fuerza. Utilizamos técnicas probadas de hipertrofia y entrenamiento de fuerza, con rutinas
                específicas para cada grupo muscular.
              </p>
              <p className="text-gray-600">
                Los entrenamientos están estructurados en ciclos de progresión que te permitirán aumentar gradualmente
                la intensidad y el volumen de trabajo, maximizando tus resultados y evitando el estancamiento.
              </p>
            </div>
          </div>

          {/* Características */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Características</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-sky-100 rounded-full p-1 mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-sky-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-600">Entrenamiento de hipertrofia específico</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-sky-100 rounded-full p-1 mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-sky-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-600">Rutinas divididas por grupos musculares</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-sky-100 rounded-full p-1 mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-sky-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-600">Técnicas avanzadas de entrenamiento</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-sky-100 rounded-full p-1 mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-sky-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-600">Suplementación recomendada</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Horarios */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Horarios Disponibles</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Día</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Mañana</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Tarde</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">Lunes</td>
                      <td className="py-3 px-4">9:00 - 10:30</td>
                      <td className="py-3 px-4">17:00 - 18:30</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">Martes</td>
                      <td className="py-3 px-4">9:00 - 10:30</td>
                      <td className="py-3 px-4">17:00 - 18:30</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">Jueves</td>
                      <td className="py-3 px-4">9:00 - 10:30</td>
                      <td className="py-3 px-4">17:00 - 18:30</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Viernes</td>
                      <td className="py-3 px-4">9:00 - 10:30</td>
                      <td className="py-3 px-4">17:00 - 18:30</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="space-y-6">
          {/* Imagen */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative h-48 w-full">
              <Image src="/placeholder.svg?height=200&width=400" alt="Musculación" fill className="object-cover" />
            </div>
          </div>

          {/* Instructores */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Instructores</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-medium mr-3">
                    RM
                  </div>
                  <div>
                    <p className="font-medium">Roberto Martínez</p>
                    <p className="text-sm text-gray-500">Especialista en Hipertrofia</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-medium mr-3">
                    AS
                  </div>
                  <div>
                    <p className="font-medium">Ana Sánchez</p>
                    <p className="text-sm text-gray-500">Entrenadora de Fuerza</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Información adicional */}
          <div className="bg-yellow-50 rounded-xl shadow-sm overflow-hidden border border-yellow-100">
            <div className="p-6">
              <h2 className="text-lg font-bold mb-3 text-yellow-800">Información Importante</h2>
              <p className="text-yellow-700 text-sm">
                Este programa está incluido sin costo adicional para todos los miembros de FITEC. No se requiere
                inscripción especial ni pagos extras.
              </p>
            </div>
          </div>

          {/* Otros programas */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Otros Programas</h2>
              <div className="space-y-2">
                <Link href="/programs/fitness" className="block p-3 rounded-lg hover:bg-gray-50">
                  <p className="font-medium">Fitness General</p>
                </Link>
                <Link href="/programs/perdida-de-peso" className="block p-3 rounded-lg hover:bg-gray-50">
                  <p className="font-medium">Pérdida de Peso</p>
                </Link>
                <Link href="/programs/crossfit" className="block p-3 rounded-lg hover:bg-gray-50">
                  <p className="font-medium">CrossFit</p>
                </Link>
                <Link href="/programs/yoga-pilates" className="block p-3 rounded-lg hover:bg-gray-50">
                  <p className="font-medium">Yoga y Pilates</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
