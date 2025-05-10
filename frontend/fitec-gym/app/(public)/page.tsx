import { Button } from "@/components/ui/button"
import { ChevronRight, MessageCircle, ArrowRight, Clock, Users, Dumbbell, Star, CheckCircle, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="bg-sky-950 text-white">
      {/* Hero Section - Limpio y nítido */}
      <section
        className="relative w-full min-h-[90vh] flex items-center justify-center px-4 py-16 md:py-24 bg-center bg-cover"
        style={{ backgroundImage: "url('/fitecfondo.png')" }}
      >
        {/* Overlay sólido sin degradado */}
        <div className="absolute inset-0 bg-sky-950/80 z-0"></div>

        {/* Contenido sobre la imagen */}
        <div className="relative z-10 text-center max-w-5xl mx-auto space-y-8 px-4">
          {/* Banner anuncio con color sólido */}
          <div className="inline-block bg-sky-800 px-6 py-2.5 rounded-lg text-sm font-medium border-2 border-sky-700">
            <span className="mr-2 inline-flex items-center justify-center bg-yellow-500 text-sky-900 w-5 h-5 rounded-full text-xs font-bold">
              !
            </span>
            ¡Nuevo! Inauguramos área de CrossFit
          </div>

          {/* Título principal sin efectos difuminados */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white">
            Transforma tu cuerpo <span className="text-yellow-400">Supera</span> tus límites
          </h1>

          {/* Descripción */}
          <p className="text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed">
            FITEC es el gimnasio universitario que te ofrece entrenamiento personalizado, equipos de última generación y
            una comunidad que te impulsa a alcanzar tu máximo potencial.
          </p>

          {/* Estadísticas rápidas con fondos sólidos */}
          <div className="flex flex-wrap justify-center gap-8 py-6">
            {[
              { number: "10+", label: "Programas" },
              { number: "20+", label: "Entrenadores" },
              { number: "1000+", label: "Miembros" },
            ].map((stat, index) => (
              <div key={index} className="text-center bg-sky-800 px-6 py-3 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400">{stat.number}</div>
                <div className="text-white text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Botones con colores sólidos */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-sky-900 font-semibold rounded-lg px-8 py-6 text-lg flex items-center gap-2">
              <span>Prueba Gratuita</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-sky-800 rounded-lg px-8 py-6 text-lg"
            >
              <Play className="mr-2 h-5 w-5" /> Ver Instalaciones
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section - Diseño nítido con tarjetas de color sólido */}
      <section className="container mx-auto px-4 py-24 bg-sky-900">
        <div className="text-center mb-16">
          <div className="inline-block bg-sky-800 px-4 py-1 rounded-lg text-sm font-medium text-white mb-4 border border-sky-700">
            NUESTROS BENEFICIOS
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            ¿Por qué elegir <span className="text-yellow-400">FITEC</span>?
          </h2>
          <p className="text-white max-w-2xl mx-auto text-lg">
            Descubre lo que nos hace diferentes y cómo podemos ayudarte a alcanzar tus objetivos fitness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Dumbbell className="h-10 w-10 text-yellow-400" />,
              title: "Equipamiento de Última Generación",
              description: "Contamos con las mejores máquinas y equipos para un entrenamiento efectivo y seguro.",
              features: ["Máquinas Technogym", "Área de peso libre", "Zona funcional"],
            },
            {
              icon: <Users className="h-10 w-10 text-yellow-400" />,
              title: "Entrenadores Certificados",
              description: "Nuestro equipo de profesionales te guiará en cada paso de tu transformación.",
              features: ["Certificaciones internacionales", "Especialistas por área", "Seguimiento personalizado"],
            },
            {
              icon: <Clock className="h-10 w-10 text-yellow-400" />,
              title: "Horarios Flexibles",
              description: "Abierto todos los días con amplios horarios para adaptarnos a tu rutina universitaria.",
              features: ["Abierto 24/7", "Clases desde 6:00 AM", "Reservas online"],
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-sky-800 rounded-xl p-8 border-2 border-sky-700 hover:border-yellow-500 transition-colors"
            >
              <div className="bg-sky-700 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white mb-6">{feature.description}</p>
              <ul className="space-y-2">
                {feature.features.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-white">
                    <CheckCircle className="h-4 w-4 text-yellow-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Programs Preview - Tarjetas nítidas con colores sólidos */}
      <section className="py-24 bg-sky-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-sky-800 px-4 py-1 rounded-lg text-sm font-medium text-white mb-4 border border-sky-700">
              PROGRAMAS DE ENTRENAMIENTO
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Diseñados para tus objetivos</h2>
            <p className="text-white max-w-2xl mx-auto text-lg">
              Ofrecemos una variedad de programas diseñados para diferentes objetivos y niveles de experiencia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Fitness General",
                description: "Entrenamiento completo para mejorar tu condición física general.",
                image: "/placeholder.svg?height=200&width=300",
                level: "Todos los niveles",
                duration: "60 min",
              },
              {
                title: "Pérdida de Peso",
                description: "Programa especializado en quemar grasa y tonificar el cuerpo.",
                image: "/placeholder.svg?height=200&width=300",
                level: "Principiante-Intermedio",
                duration: "45 min",
              },
              {
                title: "Musculación",
                description: "Enfocado en el desarrollo muscular y aumento de fuerza.",
                image: "/placeholder.svg?height=200&width=300",
                level: "Intermedio-Avanzado",
                duration: "75 min",
              },
              {
                title: "CrossFit",
                description: "Entrenamiento funcional de alta intensidad para mejorar todas tus capacidades.",
                image: "/placeholder.svg?height=200&width=300",
                level: "Todos los niveles",
                duration: "50 min",
              },
            ].map((program, index) => (
              <div
                key={index}
                className="bg-sky-800 rounded-xl overflow-hidden border-2 border-sky-700 hover:border-yellow-500 transition-colors"
              >
                 {/* Estadísticas rápidas con fondos sólidos 
                <div className="relative h-56 overflow-hidden">
                  <Image src={program.image || "/placeholder.svg"} alt={program.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-sky-900/70"></div>
                  <div className="absolute top-4 left-4 bg-yellow-500 text-sky-900 text-xs font-bold px-3 py-1 rounded-lg">
                    {program.level}
                  </div>
                </div>
                */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold">{program.title}</h3>
                    <div className="flex items-center text-white text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {program.duration}
                    </div>
                  </div>
                  <p className="text-white text-sm mb-4">{program.description}</p>
                  <Link
                    href="/programas"
                    className="text-yellow-400 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Ver detalles <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              className="bg-yellow-500 hover:bg-yellow-600 text-sky-900 font-semibold px-8 py-6 rounded-lg"
            >
              <Link href="/programas">
                <span className="flex items-center gap-2">
                  Ver todos los programas
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials - Diseño limpio con tarjetas de color sólido */}
      <section className="container mx-auto px-4 py-24 bg-sky-900">
        <div className="text-center mb-16">
          <div className="inline-block bg-sky-800 px-4 py-1 rounded-lg text-sm font-medium text-white mb-4 border border-sky-700">
            TESTIMONIOS
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Lo que dicen nuestros miembros</h2>
          <p className="text-white max-w-2xl mx-auto text-lg">
            Historias reales de estudiantes que han transformado sus vidas con FITEC.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Carlos Rodríguez",
              role: "Estudiante de Ingeniería",
              quote:
                "Desde que me uní a FITEC, he perdido 15kg y me siento con más energía que nunca. Los entrenadores son increíbles y el ambiente universitario me motiva.",
              avatar: "/placeholder.svg?height=100&width=100",
              rating: 5,
            },
            {
              name: "María González",
              role: "Estudiante de Medicina",
              quote:
                "El ambiente en FITEC es inigualable. Me encanta la comunidad y cómo todos nos apoyamos mutuamente para alcanzar nuestras metas. Perfecto para mi horario de clases.",
              avatar: "/placeholder.svg?height=100&width=100",
              rating: 5,
            },
            {
              name: "Juan Pérez",
              role: "Estudiante de Arquitectura",
              quote:
                "Los programas personalizados de FITEC me han ayudado a superar mis límites. He mejorado mi rendimiento deportivo considerablemente y puedo concentrarme mejor en mis estudios.",
              avatar: "/placeholder.svg?height=100&width=100",
              rating: 4,
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-sky-800 rounded-xl p-8 border-2 border-sky-700 hover:border-yellow-500 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
              
      {/* Membership Plans - Diseño nítido con tarjetas de color sólido 
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-400">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                */}
                <div>
                  <h3 className="font-bold text-lg">{testimonial.name}</h3>
                  <p className="text-white text-sm">{testimonial.role}</p>
                  <div className="flex mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-sky-700"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-white italic leading-relaxed">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Membership Plans - Diseño nítido con tarjetas de color sólido */}
      <section className="py-24 bg-sky-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-sky-800 px-4 py-1 rounded-lg text-sm font-medium text-white mb-4 border border-sky-700">
              MEMBRESÍAS
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Planes diseñados para estudiantes</h2>
            <p className="text-white max-w-2xl mx-auto text-lg">
              Elige el plan que mejor se adapte a tus necesidades y objetivos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Básico",
                price: "$29.99",
                period: "mensual",
                description: "Perfecto para comenzar tu viaje fitness",
                features: ["Acceso a área de pesas", "Acceso a cardio", "Horario limitado", "1 clase grupal/semana"],
                popular: false,
                cta: "Comenzar ahora",
              },
              {
                name: "Premium",
                price: "$49.99",
                period: "mensual",
                description: "Nuestra opción más popular",
                features: [
                  "Acceso completo 24/7",
                  "Todas las áreas",
                  "Clases ilimitadas",
                  "1 sesión con entrenador",
                  "Acceso a app de seguimiento",
                ],
                popular: true,
                cta: "Elegir plan",
              },
              {
                name: "Elite",
                price: "$79.99",
                period: "mensual",
                description: "Para quienes buscan resultados rápidos",
                features: [
                  "Todo lo de Premium",
                  "4 sesiones con entrenador",
                  "Plan nutricional",
                  "Acceso a todas las sedes",
                  "Descuentos en suplementos",
                ],
                popular: false,
                cta: "Obtener Elite",
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`
                  rounded-xl overflow-hidden
                  ${plan.popular ? "bg-yellow-500 border-2 border-yellow-400" : "bg-sky-800 border-2 border-sky-700"}
                `}
              >
                {plan.popular && (
                  <div className="bg-yellow-600 text-white text-center py-2 font-semibold">Más Popular</div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className={`${plan.popular ? "text-sky-900" : "text-white"} mb-6`}>{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className={`${plan.popular ? "text-sky-900" : "text-white"}`}>/{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle
                          className={`h-5 w-5 ${plan.popular ? "text-sky-900" : "text-yellow-400"} shrink-0 mt-0.5`}
                        />
                        <span className={`${plan.popular ? "text-sky-900" : "text-white"}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full py-6 font-semibold text-lg ${
                      plan.popular
                        ? "bg-sky-900 hover:bg-sky-800 text-white"
                        : "bg-yellow-500 hover:bg-yellow-600 text-sky-900"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Diseño limpio con colores sólidos */}
      <section className="container mx-auto px-4 py-24 bg-sky-900">
        <div className="bg-sky-800 rounded-xl p-8 md:p-12 border-2 border-sky-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para comenzar tu transformación?</h2>
              <p className="text-white mb-8 text-lg">
                Únete a FITEC hoy y da el primer paso hacia una versión más fuerte y saludable de ti mismo. Ofrecemos
                descuentos especiales para estudiantes universitarios.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-sky-900 font-semibold px-8 py-6 text-lg">
                  Prueba gratuita
                </Button>
                <Button variant="outline" className="border-2 border-white hover:bg-sky-700 px-8 py-6 text-lg">
                  Conocer planes
                </Button>
              </div>
            </div>

            {/* Imagen con borde definido 
            <div className="relative w-full h-32 md:w-1/3 aspect-square max-w-xs">
              {/* Imagen con borde definido 
              <div className="absolute inset-0 border-4 border-yellow-500 rounded-xl -m-3 z-0"></div>
              <Image
                src="/placeholder.svg"
                alt="Entrenamiento en FITEC"
                fill
                unoptimized
                className="object-cover rounded-xl z-10"
              />

            </div>
            */}
          </div>
        </div>
      </section>

      {/* Chat-like Interface - Diseño limpio con colores sólidos */}
      <section className="container mx-auto px-4 pb-24 bg-sky-950">
        <div className="max-w-3xl mx-auto w-full bg-sky-800 rounded-xl p-8 border-2 border-sky-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-yellow-500 rounded-lg p-2">
              <MessageCircle className="h-6 w-6 text-sky-900" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Pregunta a un entrenador</h3>
              <p className="text-white text-sm">Respuesta inmediata 24/7</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-sky-700 rounded-lg p-4 border-2 border-sky-600 max-w-[80%]">
              <p className="text-white">
                Hola, me gustaría saber más sobre los programas para estudiantes universitarios.
              </p>
              <span className="text-xs text-sky-300 mt-1 block">Usuario, 10:30 AM</span>
            </div>

            <div className="bg-yellow-500 rounded-lg p-4 border-2 border-yellow-400 max-w-[80%] ml-auto">
              <p className="text-sky-900">
                ¡Hola! En FITEC ofrecemos programas especialmente diseñados para estudiantes universitarios, con
                horarios flexibles y precios accesibles. Nuestros entrenadores están certificados y te ayudarán a
                alcanzar tus objetivos fitness mientras balanceas tus estudios.
              </p>
              <span className="text-xs text-sky-900 mt-1 block">Entrenador FITEC, 10:32 AM</span>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Escribe tu pregunta aquí..."
              className="w-full bg-sky-700 border-2 border-sky-600 rounded-lg py-3 px-5 pr-12 text-white placeholder:text-sky-300 focus:outline-none focus:border-yellow-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-sky-900 rounded-lg p-2">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <p className="text-sm text-white mt-4 text-center">
            Nuestros entrenadores están disponibles para responder todas tus preguntas y ayudarte a comenzar tu
            transformación.
          </p>
        </div>
      </section>
    </div>
  )
}