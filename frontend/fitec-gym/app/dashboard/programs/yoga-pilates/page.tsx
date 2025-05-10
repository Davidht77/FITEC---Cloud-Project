import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, User } from "lucide-react"

export default function YogaPilatesPage() {
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
          <h1 className="text-2xl font-bold mb-2">Yoga y Pilates</h1>
          <p className="opacity-90">
            Mejora tu flexibilidad, equilibrio y fuerza central con nuestras clases de yoga y pilates.
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
                <p className="font-medium">2-3 sesiones por semana</p>
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
                Nuestro programa de Yoga y Pilates está diseñado para mejorar tu bienestar físico y mental. A través de
                estas disciplinas, trabajarás tu flexibilidad, equilibrio, fuerza central y consciencia corporal,
                mientras reduces el estrés y mejoras tu concentración.
              </p>
              <p className="text-gray-600">
                Ofrecemos diferentes estilos de yoga para adaptarnos a tus necesidades y preferencias, así como sesiones
                de pilates tanto en mat como con máquinas. Nuestros instructores certificados te guiarán en cada postura
                y ejercicio, asegurando una práctica segura y efectiva.
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
                  <span className="text-gray-600">Diferentes estilos de yoga (Hatha, Vinyasa, Yin)</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-sky-100 rounded-full p-1 mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-sky-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-600">Pilates mat y con máquinas</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-sky-100 rounded-full p-1 mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-sky-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-600">Meditación y mindfulness</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-sky-100 rounded-full p-1 mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-sky-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-600">Adecuado para todos los niveles</span>
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
                      <td className="py-3 px-4 font-medium">Martes</td>
                      <td className="py-3 px-4">10:00 - 11:00</td>
                      <td className="py-3 px-4">19:00 - 20:00</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">Jueves</td>
                      <td className="py-3 px-4">10:00 - 11:00</td>
                      <td className="py-3 px-4">19:00 - 20:00</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Sábado</td>
                      <td className="py-3 px-4">9:00 - 10:00</td>
                      <td className="py-3 px-4">-</td>
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
              <Image src="/placeholder.svg?height=200&width=400" alt="Yoga y Pilates" fill className="object-cover" />
            </div>
          </div>

          {/* Instructores */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Instructores</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-medium mr-3">
                    SL
                  </div>
                  <div>
                    <p className="font-medium">Sofía López</p>
                    <p className="text-sm text-gray-500">Instructora de Yoga</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-medium mr-3">
                    JM
                  </div>
                  <div>
                    <p className="font-medium">Javier Mendoza</p>
                    <p className="text-sm text-gray-500">Instructor de Pilates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Clase especial */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Clase Especial</h2>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <p className="font-medium text-purple-800">Clase Especial de Yoga</p>
                <p className="text-sm text-purple-700 mt-1">Mañana</p>
                <p className="text-sm text-gray-600 mt-2">
                  Sesión especial de yoga al amanecer en nuestra terraza. Cupos limitados, reserva tu lugar.
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
                <Link href="/programs/crossfit" className="block p-3 rounded-lg hover:bg-gray-50">
                  <p className="font-medium">CrossFit</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
