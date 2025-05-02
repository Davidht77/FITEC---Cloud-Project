"use client"

import Link from "next/link"
import { Dumbbell, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Inicio", path: "/" },
    { name: "Programas", path: "/programas" },
    { name: "Precios", path: "/precios" },
    { name: "Entrenadores", path: "/entrenadores" },
    { name: "Ayuda", path: "/ayuda" },
  ]

  return (
    <header className="container mx-auto px-4 py-6 flex items-center justify-between relative z-50" style={{ viewTransitionName: 'main-navbar' }}>
      <div className="flex items-center gap-2">
        <Dumbbell className="h-6 w-6 text-yellow-400" />
        <Link href="/" className="text-xl font-bold">
          FITEC
        </Link>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-sky-900/95 flex flex-col items-center justify-center md:hidden">
          <nav className="flex flex-col items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-lg font-medium ${pathname === item.path ? "text-yellow-400" : "hover:text-yellow-400 transition-colors"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-4 mt-8">
              <Button variant="outline" className="border-sky-600 hover:bg-sky-800 w-full">
                Iniciar Sesión
              </Button>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-sky-900 font-medium w-full">Registrarse</Button>
            </div>
          </nav>
        </div>
      )}

      {/* Desktop menu */}
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`text-sm ${pathname === item.path ? "text-yellow-400" : "hover:text-yellow-400 transition-colors"}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="hidden md:flex items-center gap-4">
        <Link href="/login" className="text-sm hover:text-yellow-400 transition-colors">
          Iniciar Sesión
        </Link>
        <Link href="/register">
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-sky-900 font-medium rounded-full px-4 py-2 text-sm">
          Registrarse
        </Button>
        </Link>
      </div>
    </header>
  )
}
