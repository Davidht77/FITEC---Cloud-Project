import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function PreciosPage() {
  const planes = [
    {
      name: "Básico",
      price: "$XX.XX",
      period: "mes",
      description: "Perfecto para principiantes que buscan comenzar su viaje fitness.",
      features: [
        "Acceso a área de pesas",
        "Acceso a área cardiovascular",
        "Horario limitado (6:00 - 16:00)",
        "Evaluación física inicial",
        "App de seguimiento básica",
      ],
      popular: false,
      buttonText: "Comenzar ahora",
    },
    {
      name: "Premium",
      price: "$XX.XX",
      period: "mes",
      description: "Nuestro plan más popular con acceso completo a instalaciones y clases.",
      features: [
        "Acceso ilimitado 24/7",
        "Todas las áreas del gimnasio",
        "Clases grupales incluidas",
        "Evaluación física mensual",
        "App de seguimiento completa",
        "1 sesión con entrenador personal/mes",
      ],
      popular: true,
      buttonText: "Elegir Premium",
    },
    {
      name: "Elite",
      price: "$XX.XX",
      period: "mes",
      description: "La experiencia fitness definitiva con atención personalizada.",
      features: [
        "Todo lo incluido en Premium",
        "4 sesiones con entrenador personal/mes",
        "Plan nutricional personalizado",
        "Acceso a área VIP y spa",
        "Casillero personal",
        "Suplementos básicos incluidos",
        "Invitados (2 por mes)",
      ],
      popular: false,
      buttonText: "Elegir Elite",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Planes y Precios</h1>
        <p className="text-sky-200 max-w-2xl mx-auto">
          Ofrecemos diferentes planes para adaptarnos a tus necesidades y objetivos. Todos incluyen acceso a nuestras
          instalaciones de primera clase.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {planes.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl p-6 border ${
              plan.popular
                ? "bg-gradient-to-b from-sky-800 to-sky-900 border-yellow-400"
                : "bg-sky-800/20 border-sky-700"
            } relative flex flex-col`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-sky-900 font-bold px-4 py-1 rounded-full text-sm">
                Más Popular
              </div>
            )}

            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <div className="flex items-baseline mb-4">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-sky-300">/{plan.period}</span>
            </div>
            <p className="text-sky-200 mb-6">{plan.description}</p>

            <ul className="space-y-3 mb-8 flex-grow">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                  <span className="text-sky-100">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className={`w-full ${
                plan.popular ? "bg-yellow-400 hover:bg-yellow-500 text-sky-900" : "bg-sky-700 hover:bg-sky-600"
              } font-medium`}
            >
              {plan.buttonText}
            </Button>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>

        <div className="space-y-6">
          <div className="bg-sky-800/20 rounded-xl p-6 border border-sky-700">
            <h3 className="font-bold text-lg mb-2">¿Hay algún costo de inscripción?</h3>
            <p className="text-sky-200">
              Sí, hay una cuota de inscripción única de $XX.XX que cubre tu evaluación inicial y configuración de
              cuenta.
            </p>
          </div>

          <div className="bg-sky-800/20 rounded-xl p-6 border border-sky-700">
            <h3 className="font-bold text-lg mb-2">¿Puedo cambiar de plan?</h3>
            <p className="text-sky-200">
              Sí, puedes actualizar o cambiar tu plan en cualquier momento. Los cambios se aplicarán en tu próximo ciclo
              de facturación.
            </p>
          </div>

          <div className="bg-sky-800/20 rounded-xl p-6 border border-sky-700">
            <h3 className="font-bold text-lg mb-2">¿Ofrecen descuentos para estudiantes o familias?</h3>
            <p className="text-sky-200">
              Sí, ofrecemos descuentos especiales para estudiantes, familias y adultos mayores. Consulta con nuestro
              equipo para más detalles.
            </p>
          </div>

          <div className="bg-sky-800/20 rounded-xl p-6 border border-sky-700">
            <h3 className="font-bold text-lg mb-2">¿Hay algún compromiso de permanencia?</h3>
            <p className="text-sky-200">
              Nuestros planes mensuales no tienen compromiso de permanencia. También ofrecemos descuentos por pago
              trimestral o anual.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 bg-gradient-to-r from-sky-800 to-sky-900 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
        <p className="text-sky-200 max-w-2xl mx-auto mb-8">
          Únete a FITEC hoy y comienza tu transformación con una prueba gratuita de 7 días.
        </p>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-sky-900 font-medium">Obtener prueba gratuita</Button>
      </div>
    </div>
  )
}
