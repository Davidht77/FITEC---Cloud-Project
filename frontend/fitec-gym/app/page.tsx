import { Button } from "@/components/ui/button"
import { ChevronRight, MessageCircle, ArrowRight, Clock, Users, DumbbellIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div style={{ viewTransitionName: 'page-content' }}>
      {/* Hero Section */}
      <section
        className="relative w-full h-[80vh] justify-center px-4 py-16 md:py-24 flex flex-col items-center bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url('/fitecfondo.png')" }}
      >
        

        {/* Contenido sobre la imagen */}
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
          
          {/* Banner anuncio */}
          <div className="bg-sky-800/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-8 border border-sky-700">
            ¡Nuevo! Inauguramos área de CrossFit
          </div>

          {/* Título principal */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
            Transforma tu cuerpo{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
              Supera
            </span>{" "}
            tus límites
          </h1>

          {/* Descripción */}
          <p className="text-lg text-sky-100 max-w-2xl mx-auto">
            FITEC es el gimnasio completo que te ofrece entrenamiento personalizado, equipos de última generación y una
            comunidad que te impulsa a ser mejor.
          </p>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-sky-900 font-medium rounded-lg px-8 py-6 text-lg flex items-center gap-2">
              <span>Prueba Gratuita</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="border-sky-600 text-blue-800 hover:text-yellow rounded-lg px-8 py-6 text-lg"
            >
              Ver Instalaciones
            </Button>
          </div>

        </div>
      </section>


      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Por qué elegir <span className="text-yellow-400">FITEC</span>?
          </h2>
          <p className="text-sky-200 max-w-2xl mx-auto">
            Descubre lo que nos hace diferentes y cómo podemos ayudarte a alcanzar tus objetivos fitness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <DumbbellIcon className="h-10 w-10 text-yellow-400" />,
              title: "Equipamiento de Última Generación",
              description: "Contamos con las mejores máquinas y equipos para un entrenamiento efectivo y seguro.",
            },
            {
              icon: <Users className="h-10 w-10 text-yellow-400" />,
              title: "Entrenadores Certificados",
              description: "Nuestro equipo de profesionales te guiará en cada paso de tu transformación.",
            },
            {
              icon: <Clock className="h-10 w-10 text-yellow-400" />,
              title: "Horarios Flexibles",
              description: "Abierto todos los días con amplios horarios para adaptarnos a tu rutina.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-sky-800/30 backdrop-blur-sm rounded-xl p-6 border border-sky-700 flex flex-col items-center text-center"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-sky-200">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Programs Preview */}
      <section className="container mx-auto px-4 py-16 bg-sky-900/50 rounded-2xl my-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Programas</h2>
          <p className="text-sky-200 max-w-2xl mx-auto">
            Ofrecemos una variedad de programas diseñados para diferentes objetivos y niveles de experiencia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Fitness General",
              description: "Entrenamiento completo para mejorar tu condición física general.",
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              title: "Pérdida de Peso",
              description: "Programa especializado en quemar grasa y tonificar el cuerpo.",
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              title: "Musculación",
              description: "Enfocado en el desarrollo muscular y aumento de fuerza.",
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              title: "CrossFit",
              description: "Entrenamiento funcional de alta intensidad para mejorar todas tus capacidades.",
              image: "/placeholder.svg?height=200&width=300",
            },
          ].map((program, index) => (
            <div
              key={index}
              className="bg-sky-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-sky-700 group"
            >
              <div className="relative h-48">
                <Image src={program.image || "/placeholder.svg"} alt={program.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{program.title}</h3>
                <p className="text-sky-200 text-sm mb-4">{program.description}</p>
                <Link
                  href="/programas"
                  className="text-yellow-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                  style={{ viewTransitionName: `program-image-${program.title}` }}
                >
                  Ver detalles <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-sky-900 font-medium">
            <Link href="/programas" style={{ viewTransitionName: `program-images` }}>Ver todos los programas </Link>
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Lo que dicen nuestros miembros</h2>
          <p className="text-sky-200 max-w-2xl mx-auto">
            Historias reales de personas que han transformado sus vidas con FITEC.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Carlos Rodríguez",
              role: "Miembro desde 2022",
              quote:
                "Desde que me uní a FITEC, he perdido 15kg y me siento con más energía que nunca. Los entrenadores son increíbles.",
              avatar: "/placeholder.svg?height=100&width=100",
            },
            {
              name: "María González",
              role: "Miembro desde 2021",
              quote:
                "El ambiente en FITEC es inigualable. Me encanta la comunidad y cómo todos nos apoyamos mutuamente para alcanzar nuestras metas.",
              avatar: "/placeholder.svg?height=100&width=100",
            },
            {
              name: "Juan Pérez",
              role: "Miembro desde 2023",
              quote:
                "Los programas personalizados de FITEC me han ayudado a superar mis límites. He mejorado mi rendimiento deportivo considerablemente.",
              avatar: "/placeholder.svg?height=100&width=100",
            },
          ].map((testimonial, index) => (
            <div key={index} className="bg-sky-800/30 backdrop-blur-sm rounded-xl p-6 border border-sky-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-sky-300 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-sky-200 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-sky-800 to-sky-900 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para comenzar tu transformación?</h2>
          <p className="text-sky-200 max-w-2xl mx-auto mb-8">
            Únete a FITEC hoy y da el primer paso hacia una versión más fuerte y saludable de ti mismo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-sky-900 font-medium">Prueba gratuita</Button>
            <Button variant="outline" className="border-sky-600 hover:bg-sky-800">
              Conocer planes
            </Button>
          </div>
        </div>
      </section>

      {/* Chat-like Interface */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto w-full bg-sky-800/30 backdrop-blur-sm rounded-xl p-6 border border-sky-700">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="h-5 w-5 text-yellow-400" />
            <span className="font-medium">Pregunta a un entrenador</span>
            <div className="ml-auto text-sm text-gray-400">24/7</div>
          </div>

          <div className="bg-sky-800/50 rounded-lg p-4 mb-4 border border-sky-700/50">
            <p className="text-sky-100">
              FITEC es el gimnasio que te ayuda a alcanzar tus metas fitness con entrenadores certificados, equipos
              modernos y un ambiente motivador para todos los niveles.
            </p>
          </div>

          <p className="text-sm text-sky-300">
            Nuestros entrenadores están disponibles para responder todas tus preguntas y ayudarte a comenzar tu
            transformación.
          </p>
        </div>
      </section>
    </div>
  )
}
