import Link from "next/link"
import { Dumbbell, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-sky-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-6 w-6 text-yellow-400" />
              <span className="text-xl font-bold">FITEC</span>
            </div>
            <p className="text-sky-200 text-sm">
              Tu gimnasio de alto rendimiento con los mejores equipos y entrenadores certificados.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-sky-300 hover:text-yellow-400">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-sky-300 hover:text-yellow-400">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-sky-300 hover:text-yellow-400">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-yellow-400">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sky-200 hover:text-yellow-400 text-sm">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/programas" className="text-sky-200 hover:text-yellow-400 text-sm">
                  Programas
                </Link>
              </li>
              <li>
                <Link href="/precios" className="text-sky-200 hover:text-yellow-400 text-sm">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="/entrenadores" className="text-sky-200 hover:text-yellow-400 text-sm">
                  Entrenadores
                </Link>
              </li>
              <li>
                <Link href="/ayuda" className="text-sky-200 hover:text-yellow-400 text-sm">
                  Ayuda
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-yellow-400">Horarios</h3>
            <ul className="space-y-2 text-sm text-sky-200">
              <li>Lunes - Viernes: 6:00 - 22:00</li>
              <li>Sábados: 8:00 - 20:00</li>
              <li>Domingos: 9:00 - 18:00</li>
              <li>Feriados: 10:00 - 16:00</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-yellow-400">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-sky-200">
                <MapPin className="h-4 w-4 text-yellow-400" />
                <span>Av. Principal 123, Ciudad</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-sky-200">
                <Phone className="h-4 w-4 text-yellow-400" />
                <span>+123 456 7890</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-sky-200">
                <Mail className="h-4 w-4 text-yellow-400" />
                <span>info@fitec.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sky-800 mt-8 pt-8 text-center text-sm text-sky-300">
          <p>&copy; {new Date().getFullYear()} FITEC. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
