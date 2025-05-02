import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function ProgramasPage() {
  const programas = [
    {
      id: "fitness-general",
      title: "Fitness General",
      description:
        "Entrenamiento completo para mejorar tu condición física general, aumentar resistencia y tonificar el cuerpo.",
      image: "/placeholder.svg?height=300&width=600",
      features: [
        "Entrenamiento cardiovascular",
        "Ejercicios de fuerza",
        "Flexibilidad y movilidad",
        "Adecuado para todos los niveles",
      ],
      duration: "12 semanas",
      sessions: "3-4 sesiones por semana",
      price: "$XX.XX / mes",
    },
    {
      id: "perdida-peso",
      title: "Pérdida de Peso",
      description:
        "Programa especializado en quemar grasa y tonificar el cuerpo, combinando ejercicios cardiovasculares y de fuerza.",
      image: "/placeholder.svg?height=300&width=600",
      features: [
        "Entrenamiento HIIT",
        "Circuitos de quema de grasa",
        "Asesoramiento nutricional",
        "Seguimiento de progreso",
      ],
      duration: "16 semanas",
      sessions: "4-5 sesiones por semana",
      price: "$XX.XX / mes",
    },
    {
      id: "musculacion",
      title: "Musculación",
      description:
        "Enfocado en el desarrollo muscular y aumento de fuerza, con rutinas específicas para cada grupo muscular.",
      image: "/placeholder.svg?height=300&width=600",
      features: [
        "Entrenamiento de hipertrofia",
        "Rutinas divididas por grupos musculares",
        "Técnicas avanzadas de entrenamiento",
        "Suplementación recomendada",
      ],
      duration: "12 semanas",
      sessions: "4-6 sesiones por semana",
      price: "$XX.XX / mes",
    },
    {
      id: "crossfit",
      title: "CrossFit",
      description:
        "Entrenamiento funcional de alta intensidad para mejorar todas tus capacidades físicas de forma integral.",
      image: "/placeholder.svg?height=300&width=600",
      features: ["WODs diarios", "Entrenamiento en grupo", "Competiciones internas", "Técnica y seguridad"],
      duration: "Continuo",
      sessions: "3-5 sesiones por semana",
      price: "$XX.XX / mes",
    },
    {
      id: "entrenamiento-personal",
      title: "Entrenamiento Personal",
      description:
        "Atención individualizada con un entrenador dedicado que diseñará un programa específico para tus objetivos.",
      image: "/placeholder.svg?height=300&width=600",
      features: ["Plan 100% personalizado", "Atención one-to-one", "Seguimiento constante", "Ajustes según progreso"],
      duration: "A definir",
      sessions: "A definir",
      price: "$XX.XX / sesión",
    },
    {
      id: "yoga-pilates",
      title: "Yoga y Pilates",
      description: "Mejora tu flexibilidad, equilibrio y fuerza central con nuestras clases de yoga y pilates.",
      image: "/placeholder.svg?height=300&width=600",
      features: [
        "Diferentes estilos de yoga",
        "Pilates mat y con máquinas",
        "Meditación y mindfulness",
        "Adecuado para todos los niveles",
      ],
      duration: "Continuo",
      sessions: "2-3 sesiones por semana",
      price: "$XX.XX / mes",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12" style={{ viewTransitionName: `program-images` }}>
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Nuestros Programas</h1>
        <p className="text-sky-200 max-w-2xl mx-auto">
          En FITEC ofrecemos una variedad de programas diseñados para diferentes objetivos y niveles de experiencia.
          Encuentra el que mejor se adapte a tus metas.
        </p>
      </div>

      {/* Programs List */}
      <div className="space-y-16">
        {programas.map((programa, index) => (
          <div
            key={programa.id}
            className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 bg-sky-800/20 rounded-2xl p-6 border border-sky-700`}
          >
            <div className="md:w-1/2">
              <div className="relative h-64 md:h-full rounded-xl overflow-hidden">
                <Image src={programa.image || "/placeholder.svg"} alt={programa.title} fill className="object-cover" style={{ viewTransitionName: `program-image-${programa.id}` }}  />
              </div>
            </div>
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">{programa.title}</h2>
              <p className="text-sky-200">{programa.description}</p>

              <div className="grid grid-cols-2 gap-4 py-4">
                <div>
                  <h3 className="text-yellow-400 font-medium">Duración</h3>
                  <p className="text-sky-100">{programa.duration}</p>
                </div>
                <div>
                  <h3 className="text-yellow-400 font-medium">Frecuencia</h3>
                  <p className="text-sky-100">{programa.sessions}</p>
                </div>
                <div className="col-span-2">
                  <h3 className="text-yellow-400 font-medium">Precio</h3>
                  <p className="text-sky-100">{programa.price}</p>
                </div>
              </div>

              <h3 className="text-yellow-400 font-medium">Características</h3>
              <ul className="list-disc list-inside text-sky-200 space-y-1">
                {programa.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>

              <div className="pt-4">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-sky-900 font-medium">
                  Inscribirme ahora
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 bg-gradient-to-r from-sky-800 to-sky-900 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">¿No estás seguro de qué programa elegir?</h2>
        <p className="text-sky-200 max-w-2xl mx-auto mb-8">
          Agenda una consulta gratuita con uno de nuestros entrenadores y te ayudaremos a encontrar el programa perfecto
          para ti.
        </p>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-sky-900 font-medium">
          Agendar consulta gratuita
        </Button>
      </div>
    </div>
  )
}
