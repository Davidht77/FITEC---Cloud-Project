import Link from "next/link"
import Image from "next/image"
import { Users, Trophy, Heart, Calendar, MessageCircle, ChevronRight, Star, Target, Lightbulb, Award, HandHeart, Megaphone } from 'lucide-react'

export default function CommunityPage() {
  return (
    <div className="p-6 max-w-full">
      {/* Encabezado */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Comunidad FITEC</h1>
          <p className="opacity-90">
            Conoce nuestra comunidad, eventos, concursos y cómo podemos ayudarte a alcanzar tus metas.
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda - Misión, Visión y Valores */}
        <div className="space-y-6">
          {/* Misión */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center">
                <div className="bg-sky-100 p-2 rounded-full mr-3">
                  <Target className="h-5 w-5 text-sky-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Nuestra Misión</h2>
              </div>
            </div>
            <div className="p-5">
              <p className="text-gray-600">
                Transformar vidas a través del fitness, ofreciendo un ambiente inclusivo y motivador donde cada persona
                pueda alcanzar su máximo potencial físico y mental.
              </p>
              <Link 
                href="/community/mision" 
                className="mt-4 inline-flex items-center text-sky-600 hover:text-sky-800"
              >
                Conoce más
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Visión */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center">
                <div className="bg-sky-100 p-2 rounded-full mr-3">
                  <Lightbulb className="h-5 w-5 text-sky-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Nuestra Visión</h2>
              </div>
            </div>
            <div className="p-5">
              <p className="text-gray-600">
                Ser reconocidos como la comunidad fitness universitaria líder, innovando constantemente en programas y
                servicios que promuevan un estilo de vida saludable y activo.
              </p>
              <Link 
                href="/community/vision" 
                className="mt-4 inline-flex items-center text-sky-600 hover:text-sky-800"
              >
                Conoce más
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Valores */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center">
                <div className="bg-sky-100 p-2 rounded-full mr-3">
                  <Star className="h-5 w-5 text-sky-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Nuestros Valores</h2>
              </div>
            </div>
            <div className="p-5">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-sky-100 rounded-full p-1 mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-sky-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-600"><strong>Compromiso</strong> con el bienestar de nuestra comunidad</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-sky-100 rounded-full p-1 mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-sky-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-600"><strong>Inclusión</strong> para personas de todos los niveles</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-sky-100 rounded-full p-1 mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-sky-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-600"><strong>Excelencia</strong> en nuestros servicios y programas</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-sky-100 rounded-full p-1 mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-sky-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-600"><strong>Innovación</strong> constante en métodos de entrenamiento</span>
                </li>
              </ul>
              <Link 
                href="/community/valores" 
                className="mt-4 inline-flex items-center text-sky-600 hover:text-sky-800"
              >
                Conoce más
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Columna central - Concursos y Eventos */}
        <div className="space-y-6">
          {/* Concursos Activos */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-2 rounded-full mr-3">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Concursos Activos</h2>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <Link href="/community/concursos/desafio-verano" className="block">
                  <h3 className="font-bold text-gray-800">Desafío de Verano</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Participa en nuestro desafío de 30 días y gana premios increíbles.
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-yellow-600 font-medium">En 3 días</span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      120 participantes
                    </span>
                  </div>
                </Link>
              </div>

              <div className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <Link href="/community/concursos/crossfit-challenge" className="block">
                  <h3 className="font-bold text-gray-800">Competencia de CrossFit</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Demuestra tus habilidades en nuestra competencia interna de CrossFit.
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-yellow-600 font-medium">Mañana</span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      85 participantes
                    </span>
                  </div>
                </Link>
              </div>

              <div className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <Link href="/community/concursos/reto-nutricion" className="block">
                  <h3 className="font-bold text-gray-800">Reto de Nutrición</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Aprende a mejorar tus hábitos alimenticios y gana premios por tus resultados.
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-yellow-600 font-medium">Próxima semana</span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      50 participantes
                    </span>
                  </div>
                </Link>
              </div>

              <Link 
                href="/community/concursos" 
                className="mt-2 inline-flex items-center text-sky-600 hover:text-sky-800"
              >
                Ver todos los concursos
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Próximos Eventos */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Próximos Eventos</h2>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <Link href="/community/eventos/masterclass-yoga" className="block">
                  <h3 className="font-bold text-gray-800">Masterclass de Yoga</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Clase especial con instructor invitado internacional.
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-purple-600 font-medium">15 de Junio, 10:00</span>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                      Gratuito
                    </span>
                  </div>
                </Link>
              </div>

              <div className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <Link href="/community/eventos/maraton-benefica" className="block">
                  <h3 className="font-bold text-gray-800">Maratón Benéfica</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Corre por una buena causa y ayuda a recaudar fondos.
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-purple-600 font-medium">20 de Junio, 8:00</span>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                      Inscripción $10
                    </span>
                  </div>
                </Link>
              </div>

              <div className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <Link href="/community/eventos/seminario-nutricion" className="block">
                  <h3 className="font-bold text-gray-800">Seminario de Nutrición</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Aprende sobre nutrición deportiva con nuestros especialistas.
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-purple-600 font-medium">25 de Junio, 17:00</span>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                      Gratuito
                    </span>
                  </div>
                </Link>
              </div>

              <Link 
                href="/community/eventos" 
                className="mt-2 inline-flex items-center text-sky-600 hover:text-sky-800"
              >
                Ver todos los eventos
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Columna derecha - Ayudas, Noticias y Testimonios */}
        <div className="space-y-6">
          {/* Programas de Ayuda */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <HandHeart className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Programas de Ayuda</h2>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <Link href="/community/ayudas/becas-deportivas" className="block">
                  <h3 className="font-bold text-gray-800">Becas Deportivas</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Programa de becas para estudiantes destacados en deportes.
                  </p>
                </Link>
              </div>

              <div className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <Link href="/community/ayudas/plan-inclusivo" className="block">
                  <h3 className="font-bold text-gray-800">Plan Inclusivo</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Programa especial para personas con capacidades diferentes.
                  </p>
                </Link>
              </div>

              <div className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <Link href="/community/ayudas/descuentos-estudiantes" className="block">
                  <h3 className="font-bold text-gray-800">Descuentos para Estudiantes</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Tarifas especiales para estudiantes universitarios.
                  </p>
                </Link>
              </div>

              <Link 
                href="/community/ayudas" 
                className="mt-2 inline-flex items-center text-sky-600 hover:text-sky-800"
              >
                Ver todos los programas
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Últimas Noticias */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <Megaphone className="h-5 w-5 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Últimas Noticias</h2>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <Link href="/community/noticias/nueva-sede" className="block">
                  <div className="relative h-32 w-full mb-3 rounded-md overflow-hidden">
                    <Image 
                      src="/placeholder.svg?height=150&width=300" 
                      alt="Nueva Sede" 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <h3 className="font-bold text-gray-800">Nueva Sede en el Campus Norte</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Inauguramos nuestra nueva sede con instalaciones de última generación.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Publicado: 1 de junio, 2023</p>
                </Link>
              </div>

              <div className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <Link href="/community/noticias/nuevos-equipos" className="block">
                  <h3 className="font-bold text-gray-800">Nuevos Equipos de Entrenamiento</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Hemos renovado todos nuestros equipos de musculación.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Publicado: 25 de mayo, 2023</p>
                </Link>
              </div>

              <Link 
                href="/community/noticias" 
                className="mt-2 inline-flex items-center text-sky-600 hover:text-sky-800"
              >
                Ver todas las noticias
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Testimonios */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Testimonios</h2>
              </div>
            </div>
            <div className="p-5">
              <div className="bg-blue-50 rounded-lg p-4 relative">
                <div className="flex items-start mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium mr-3">
                    MC
                  </div>
                  <div>
                    <p className="font-medium">María Castillo</p>
                    <p className="text-xs text-gray-500">Miembro desde 2022</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">
                  "FITEC cambió mi vida por completo. Gracias a sus programas y el apoyo de los instructores, logré
                  perder 15 kg en 6 meses y ahora me siento con más energía que nunca."
                </p>
                <div className="flex mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>

              <Link 
                href="/community/testimonios" 
                className="mt-4 inline-flex items-center text-sky-600 hover:text-sky-800"
              >
                Ver más testimonios
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Unirse a la comunidad */}
      <div className="mt-6 bg-gradient-to-r from-sky-600 to-blue-700 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 text-white">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 mr-3" />
            <h2 className="text-xl font-bold">Únete a Nuestra Comunidad</h2>
          </div>
          <p className="mb-4 opacity-90">
            Forma parte de la comunidad FITEC y disfruta de todos los beneficios que tenemos para ti. Participa en
            eventos exclusivos, concursos, talleres y mucho más.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/register"
              className="bg-white text-sky-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-medium"
            >
              Regístrate Ahora
            </Link>
            <Link
              href="/community/beneficios"
              className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-2 rounded-lg font-medium"
            >
              Conoce los Beneficios
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
