import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, User } from "lucide-react"

export default function CrossFitPage() {
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
          <h1 className="text-2xl font-bold mb-2">CrossFit</h1>
          <p className="opacity-90">
            Entrenamiento funcional de alta intensidad para mejorar todas tus capacidades físicas de forma integral.
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-sky-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Duración</p>
                <p className="font-medium">Continuo</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-sky-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Frecuencia</p>
                <p className="font-medium">3-5 sesiones por semana</p>
              </div>
            </div>
            <div className="flex items-center">
              <User className="w-5 h-5 text-sky-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Nivel</p>
                <p className="font-medium">Todos los niveles</p>
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
                Nuestro programa de CrossFit combina movimientos funcionales de alta intensidad para desarrollar tu
                condición física en todas sus dimensiones: resistencia cardiovascular, fuerza, flexibilidad, potencia,
                velocidad, coordinación, agilidad, equilibrio y precisión.
              </p>
              <p className="text-gray-600">
                Cada día presenta un nuevo desafío (WOD - Workout of the Day) que te permitirá superar tus límites en un
                ambiente de comunidad y apoyo mutuo. Los ejercicios son escalables, por lo que personas de todos los
                niveles pueden participar y progresar a su propio ritmo.
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
                  <span className="text-gray-600">WODs diarios con diferentes desafíos</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-sky-100 rounded-full p-1 mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-sky-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-600">Entrenamiento en grupo para mayor motivación</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-sky-100 rounded-full p-1 mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-sky-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-600">Competiciones internas periódicas</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-sky-100 rounded-full p-1 mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-sky-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-600">Énfasis en técnica y seguridad</span>
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
                      <td className="py-3 px-4">6:00 - 7:00</td>
                      <td className="py-3 px-4">18:00 - 19:00</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">Miércoles</td>
                      <td className="py-3 px-4">6:00 - 7:00</td>
                      <td className="py-3 px-4">18:00 - 19:00</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Viernes</td>
                      <td className="py-3 px-4">6:00 - 7:00</td>
                      <td className="py-3 px-4">18:00 - 19:00</td>
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
              <Image src="/placeholder.svg?height=200&width=400" alt="CrossFit" fill className="object-cover" />
            </div>
          </div>

          {/* Instructores */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Instructores</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-medium mr-3">
                    DT
                  </div>
                  <div>
                    <p className="font-medium">Daniel Torres</p>
                    <p className="text-sm text-gray-500">Coach de CrossFit</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-medium mr-3">
                    VR
                  </div>
                  <div>
                    <p className="font-medium">Valeria Ruiz</p>
                    <p className="text-sm text-gray-500">Coach de CrossFit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Próxima competencia */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Próxima Competencia</h2>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <p className="font-medium text-yellow-800">Competencia de CrossFit</p>
                <p className="text-sm text-yellow-700 mt-1">En 3 días</p>
                <p className="text-sm text-gray-600 mt-2">
                  Participa en nuestra competencia interna y pon a prueba tus habilidades. Abierto a todos los miembros.
                </p>
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
                <Link href="/programs/musculacion" className="block p-3 rounded-lg hover:bg-gray-50">
                  <p className="font-medium">Musculación</p>
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
