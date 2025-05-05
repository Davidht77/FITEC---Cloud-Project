import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Clock, ChevronDown } from "lucide-react"
import Link from "next/link"

export default function AyudaPage() {
  const faqs = [
    {
      question: "¿Cuáles son los horarios del gimnasio?",
      answer:
        "Nuestro gimnasio está abierto de lunes a viernes de 6:00 a 22:00, sábados de 8:00 a 20:00, domingos de 9:00 a 18:00 y feriados de 10:00 a 16:00.",
    },
    {
      question: "¿Cómo puedo inscribirme?",
      answer:
        "Puedes inscribirte directamente en nuestras instalaciones o a través de nuestra página web en la sección 'Registrarse'. Necesitarás completar un formulario y realizar el pago correspondiente.",
    },
    {
      question: "¿Ofrecen prueba gratuita?",
      answer:
        "Sí, ofrecemos una prueba gratuita de 7 días para que puedas conocer nuestras instalaciones y servicios antes de decidir.",
    },
    {
      question: "¿Qué debo llevar a mi primera sesión?",
      answer:
        "Te recomendamos traer ropa deportiva cómoda, zapatillas deportivas, una toalla pequeña para el sudor, una botella de agua y, opcionalmente, guantes de entrenamiento si planeas usar pesas.",
    },
    {
      question: "¿Tienen estacionamiento?",
      answer: "Sí, contamos con estacionamiento gratuito para nuestros miembros durante su tiempo de entrenamiento.",
    },
    {
      question: "¿Puedo congelar mi membresía?",
      answer:
        "Sí, puedes congelar tu membresía hasta por 30 días al año, dependiendo del tipo de plan que tengas. Debes solicitarlo con al menos 5 días de anticipación.",
    },
    {
      question: "¿Ofrecen planes corporativos?",
      answer:
        "Sí, tenemos planes especiales para empresas. Contáctanos para obtener más información sobre nuestros paquetes corporativos.",
    },
    {
      question: "¿Tienen duchas y vestuarios?",
      answer:
        "Sí, contamos con duchas y vestuarios completos, incluyendo lockers para que puedas guardar tus pertenencias mientras entrenas.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Centro de Ayuda</h1>
        <p className="text-sky-200 max-w-2xl mx-auto">
          Estamos aquí para ayudarte. Encuentra respuestas a tus preguntas o contáctanos directamente.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-sky-800/20 rounded-xl p-6 border border-sky-700 flex flex-col items-center text-center">
          <Phone className="h-10 w-10 text-yellow-400 mb-4" />
          <h2 className="text-xl font-bold mb-2">Llámanos</h2>
          <p className="text-sky-200 mb-4">Estamos disponibles para atenderte de lunes a viernes de 8:00 a 20:00</p>
          <Link href="tel:+123456789" className="text-yellow-400 font-medium">
            +123 456 789
          </Link>
        </div>

        <div className="bg-sky-800/20 rounded-xl p-6 border border-sky-700 flex flex-col items-center text-center">
          <Mail className="h-10 w-10 text-yellow-400 mb-4" />
          <h2 className="text-xl font-bold mb-2">Escríbenos</h2>
          <p className="text-sky-200 mb-4">Responderemos a tu correo electrónico en un plazo máximo de 24 horas</p>
          <Link href="mailto:info@fitec.com" className="text-yellow-400 font-medium">
            info@fitec.com
          </Link>
        </div>

        <div className="bg-sky-800/20 rounded-xl p-6 border border-sky-700 flex flex-col items-center text-center">
          <MapPin className="h-10 w-10 text-yellow-400 mb-4" />
          <h2 className="text-xl font-bold mb-2">Visítanos</h2>
          <p className="text-sky-200 mb-4">Ven a conocer nuestras instalaciones y hablar con nuestro equipo</p>
          <address className="text-yellow-400 font-medium not-italic">Av. Principal 123, Ciudad</address>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Preguntas Frecuentes</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="group bg-sky-800/20 rounded-xl border border-sky-700 overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-6">
                <h3 className="font-medium text-lg">{faq.question}</h3>
                <ChevronDown className="h-5 w-5 text-yellow-400 transform group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-6 pt-0 text-sky-200">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Envíanos un Mensaje</h2>

        <form className="bg-sky-800/20 rounded-xl p-6 border border-sky-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 bg-sky-900/50 border border-sky-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-sky-900/50 border border-sky-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="subject" className="block text-sm font-medium mb-2">
              Asunto
            </label>
            <input
              type="text"
              id="subject"
              className="w-full px-4 py-2 bg-sky-900/50 border border-sky-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Asunto de tu mensaje"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Mensaje
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full px-4 py-2 bg-sky-900/50 border border-sky-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Escribe tu mensaje aquí..."
            ></textarea>
          </div>

          <Button className="bg-yellow-400 hover:bg-yellow-500 text-sky-900 font-medium w-full">Enviar Mensaje</Button>
        </form>
      </div>

      {/* Hours and Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        <div className="bg-sky-800/20 rounded-xl p-6 border border-sky-700">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="h-6 w-6 text-yellow-400" />
            <h2 className="text-xl font-bold">Horarios</h2>
          </div>

          <ul className="space-y-2">
            <li className="flex justify-between">
              <span className="text-sky-200">Lunes - Viernes</span>
              <span>6:00 - 22:00</span>
            </li>
            <li className="flex justify-between">
              <span className="text-sky-200">Sábados</span>
              <span>8:00 - 20:00</span>
            </li>
            <li className="flex justify-between">
              <span className="text-sky-200">Domingos</span>
              <span>9:00 - 18:00</span>
            </li>
            <li className="flex justify-between">
              <span className="text-sky-200">Feriados</span>
              <span>10:00 - 16:00</span>
            </li>
          </ul>
        </div>

        <div className="bg-sky-800/20 rounded-xl p-6 border border-sky-700">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-6 w-6 text-yellow-400" />
            <h2 className="text-xl font-bold">Ubicación</h2>
          </div>

          <p className="text-sky-200 mb-4">
            Estamos ubicados en una zona céntrica de fácil acceso, con estacionamiento disponible para nuestros
            miembros.
          </p>

          <address className="not-italic mb-4">
            <p>Av. Principal 123</p>
            <p>Ciudad, CP 12345</p>
          </address>

          <div className="bg-sky-900/50 h-48 rounded-lg flex items-center justify-center border border-sky-700">
            <p className="text-sky-300">Mapa de ubicación</p>
          </div>
        </div>
      </div>
    </div>
  )
}
