  "use client"

  import Link from "next/link"
  import { useRouter } from "next/navigation"
  import { useState } from "react"
  import { Home, MapPin, Dumbbell, Sparkles , LogOut, Calendar, Trophy, Users, ChevronDown, X,ArrowLeftFromLine ,CreditCard, Layers } from "lucide-react"
  import { useSidebar } from "@/context/DashboardNarvarContext";

  interface DashboardSidebarProps {
    isMobile?: boolean;
  }

  export default function DashboardSidebar({  isMobile }: DashboardSidebarProps) {
    const [activeSection, setActiveSection] = useState<string | null>(null)
    const { toggleSidebar } = useSidebar();
    const router = useRouter();


    const toggleSection = (section: string) => {
      if (activeSection === section) {
        setActiveSection(null)
      } else {
        setActiveSection(section)
      }
    }

    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      router.push("/login"); // Redirige al login u otra ruta pública
    };

    return (
      <div className="fixed top-0 left-0 h-screen w-72 bg-white shadow-md z-50 flex flex-col ">

        {/* Parte superior */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Logo y botón de cerrar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 pl-2">
              <div className="w-8 h-8 bg-sky-800 rounded-md flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-sky-800">FITEC</h1>
            </div>

            {/* Botón para ocultar el sidebar */}
            <button
              onClick={toggleSidebar}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Ocultar menú"
              type="button"
            >
              <ArrowLeftFromLine  className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Navegación */}
          <nav className="flex flex-col gap-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-gray-700 hover:bg-sky-50 hover:text-sky-800 p-3 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Inicio</span>
            </Link>

            <Link
              href="/dashboard/sedes"
              className="flex items-center gap-2 text-gray-700 hover:bg-sky-50 hover:text-sky-800 p-3 rounded-lg transition-colors"
            >
              <MapPin className="w-5 h-5" />
              <span>Sedes</span>
            </Link>

            {/* Sección de Programas */}
            <div>
              <button
                onClick={() => toggleSection("programas")}
                className="w-full flex items-center justify-between text-gray-700 hover:bg-sky-50 hover:text-sky-800 p-3 rounded-lg transition-colors"
                type="button"
              >
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-5 h-5" />
                  <span>Programas</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${activeSection === "programas" ? "rotate-180" : ""}`}
                />
              </button>

              {activeSection === "programas" && (
                <div className="ml-9 mt-1 flex flex-col gap-1">
                  <Link href="/dashboard/programs/fitness-general" className="text-gray-600 hover:text-sky-800 py-2 text-sm">
                    Fitness General
                  </Link>
                  <Link href="/dashboard/programs/perdida-de-peso" className="text-gray-600 hover:text-sky-800 py-2 text-sm">
                    Pérdida de Peso
                  </Link>
                  <Link href="/dashboard/programs/musculacion" className="text-gray-600 hover:text-sky-800 py-2 text-sm">
                    Musculación
                  </Link>
                  <Link href="/dashboard/programs/crossfit" className="text-gray-600 hover:text-sky-800 py-2 text-sm">
                    CrossFit
                  </Link>
                  <Link href="/dashboard/programs/personal" className="text-gray-600 hover:text-sky-800 py-2 text-sm">
                    Entrenamiento Personal
                  </Link>
                  <Link href="/dashboard/programs/yoga-pilates" className="text-gray-600 hover:text-sky-800 py-2 text-sm">
                    Yoga y Pilates
                  </Link>
                </div>
              )}
            </div>


            <Link
              href="/dashboard/calendar"
        
              className="flex items-center gap-2 text-gray-700 hover:bg-sky-50 hover:text-sky-800 p-3 rounded-lg transition-colors"
            >
              <Calendar className="w-5 h-5" />
              <span>Calendario</span>
            </Link>

            <Link
              href="/dashboard/community"
    
              className="flex items-center gap-2 text-gray-700 hover:bg-sky-50 hover:text-sky-800 p-3 rounded-lg transition-colors"
            >
              <Users className="w-5 h-5" />
              <span>Comunidad</span>
            </Link>

            {/* Pagos */}
              <Link
                href="/dashboard/payment"
                className="flex items-center gap-2 text-gray-700 hover:bg-sky-50 hover:text-sky-800 p-3 rounded-lg transition-colors"
              >
                <CreditCard className="w-5 h-5" />
                <span>Pago</span>
              </Link>

              {/* Planes */}
              <Link
                href="/dashboard/plans"
                className="flex items-center gap-2 text-gray-700 hover:bg-sky-50 hover:text-sky-800 p-3 rounded-lg transition-colors"
              >
                <Layers className="w-5 h-5" />
                <span>Mi Plan</span>
              </Link>

             <Link
              href="/dashboard/faq"
              className="flex items-center px-4 py-4 text-sm font-semibold hover:bg-teal-700/10 hover:text-teal-300 rounded-lg transition-colors"
            >
              <div className="relative w-5 h-5 mr-3 flex items-center justify-center">
                <div className="absolute rounded-md bg-blue-500 w-full h-full" />
                <Sparkles className="w-5 h-5 text-white relative z-10" />
              </div>
              <span className="text-blue-500">Preguntas Frecuentes</span> {/* Texto con el mismo color de fondo */}
            </Link>
          </nav>
        </div>

        {/* Parte inferior */}
        <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:bg-red-50 p-3 rounded-lg transition-colors w-full"
          type="button"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar sesión</span>
        </button>
        </div>
      </div>
    )
  }
