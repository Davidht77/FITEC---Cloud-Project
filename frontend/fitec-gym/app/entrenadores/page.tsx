import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function EntrenadoresPage() {
  const entrenadores = [
    {
      id: "carlos-rodriguez",
      name: "Carlos Rodríguez",
      role: "Entrenador Principal",
      specialties: ["Musculación", "Pérdida de peso", "Nutrición deportiva"],
      bio: "Carlos cuenta con más de 10 años de experiencia en el mundo del fitness. Certificado en entrenamiento personal, nutrición deportiva y especialista en hipertrofia muscular. Ha ayudado a cientos de clientes a alcanzar sus objetivos de forma segura y efectiva.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        instagram: "#",
        facebook: "#",
        linkedin: "#",
      },
    },
    {
      id: "ana-martinez",
      name: "Ana Martínez",
      role: "Entrenadora de CrossFit",
      specialties: ["CrossFit", "Entrenamiento funcional", "Competición"],
      bio: "Ana es entrenadora certificada de CrossFit con nivel 3. Ex atleta de competición, ha participado en numerosos eventos nacionales e internacionales. Su pasión es ayudar a sus alumnos a superar sus límites y mejorar su rendimiento día a día.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        instagram: "#",
        facebook: "#",
        linkedin: "#",
      },
    },
    {
      id: "miguel-sanchez",
      name: "Miguel Sánchez",
      role: "Entrenador de Yoga y Pilates",
      specialties: ["Yoga", "Pilates", "Meditación", "Rehabilitación"],
      bio: "Miguel es instructor certificado de yoga y pilates con formación en India. Especialista en técnicas de respiración y meditación. Su enfoque holístico ayuda a sus alumnos a encontrar equilibrio entre cuerpo y mente.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        instagram: "#",
        facebook: "#",
        linkedin: "#",
      },
    },
    {
      id: "laura-gomez",
      name: "Laura Gómez",
      role: "Nutricionista Deportiva",
      specialties: ["Nutrición deportiva", "Planes alimenticios", "Suplementación"],
      bio: "Laura es graduada en Nutrición y especialista en nutrición deportiva. Trabaja de forma personalizada con cada cliente para diseñar planes alimenticios que complementen su entrenamiento y les ayuden a alcanzar sus objetivos.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        instagram: "#",
        facebook: "#",
        linkedin: "#",
      },
    },
    {
      id: "javier-lopez",
      name: "Javier López",
      role: "Entrenador de Fuerza",
      specialties: ["Powerlifting", "Halterofilia", "Fuerza funcional"],
      bio: "Javier es campeón nacional de powerlifting y entrenador certificado. Especialista en técnicas de levantamiento y desarrollo de fuerza. Su metodología se basa en la técnica perfecta y la progresión constante.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        instagram: "#",
        facebook: "#",
        linkedin: "#",
      },
    },
    {
      id: "sofia-torres",
      name: "Sofía Torres",
      role: "Entrenadora de Cardio y HIIT",
      specialties: ["HIIT", "Cardio", "Pérdida de peso", "Tonificación"],
      bio: "Sofía es especialista en entrenamientos de alta intensidad y programas de pérdida de peso. Su energía contagiosa y sus clases dinámicas hacen que sus alumnos den lo mejor de sí mismos en cada sesión.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        instagram: "#",
        facebook: "#",
        linkedin: "#",
      },
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Nuestro Equipo</h1>
        <p className="text-sky-200 max-w-2xl mx-auto">
          Conoce a nuestros entrenadores certificados que te guiarán en cada paso de tu transformación. Profesionales
          apasionados y comprometidos con tu éxito.
        </p>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {entrenadores.map((entrenador) => (
          <div
            key={entrenador.id}
            className="bg-sky-800/20 rounded-xl overflow-hidden border border-sky-700 flex flex-col"
          >
            <div className="relative h-80">
              <Image src={entrenador.image || "/placeholder.svg"} alt={entrenador.name} fill className="object-cover" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl font-bold">{entrenador.name}</h2>
              <p className="text-yellow-400 mb-2">{entrenador.role}</p>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-sky-300 mb-1">Especialidades:</h3>
                <div className="flex flex-wrap gap-2">
                  {entrenador.specialties.map((specialty, index) => (
                    <span key={index} className="bg-sky-700/50 text-sky-100 text-xs px-2 py-1 rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-sky-200 text-sm mb-4 flex-grow">{entrenador.bio}</p>

              <div className="flex gap-3 mt-auto">
                <Link href={entrenador.social.instagram} className="text-sky-300 hover:text-yellow-400">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href={entrenador.social.facebook} className="text-sky-300 hover:text-yellow-400">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href={entrenador.social.linkedin} className="text-sky-300 hover:text-yellow-400">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 bg-gradient-to-r from-sky-800 to-sky-900 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Quieres una sesión personalizada?</h2>
        <p className="text-sky-200 max-w-2xl mx-auto mb-8">
          Agenda una consulta con uno de nuestros entrenadores y descubre cómo podemos ayudarte a alcanzar tus
          objetivos.
        </p>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-sky-900 font-medium">Agendar consulta</Button>
      </div>
    </div>
  )
}
