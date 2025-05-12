  "use client"

  import { type ReactNode } from "react"
  import DashboardNavbar from "@/components/DashboardNavbar"
  import DashboardSidebar from "@/components/DashboardSidebar"
  import { SidebarProvider, useSidebar } from "@/context/DashboardNarvarContext"

  function LayoutContent({ children }: { children: ReactNode }) {
    const { sidebarVisible, setSidebarVisible, isMobile } = useSidebar()

    return (
      
      
      <div className="flex h-screen w-screen overflow-hidden text-black bg-gray-50">

        {/* For Tailwind to detect dynamic utility classes */}
        <div className="hidden duration-1000 duration-300 translate-x-0 -translate-x-full transition-transform" />

        {/* Overlay para móvil cuando el sidebar está abierto */}
        {sidebarVisible && isMobile && (
          <div
            className="fixed inset-0 bg-black/20 z-10 md:hidden"
            onClick={() => setSidebarVisible(false)}
            aria-hidden="true"
          />
        )}
        
        {/* Sidebar lateral con animación */}
        <aside
          className={`fixed top-0 left-0 h-screen w-72 bg-white z-30
            transform transition-transform ease-out duration-500
            ${isMobile ? "fixed top-0" : ""}
            ${sidebarVisible ? "translate-x-0" : isMobile ? "-translate-x-full" : "hidden"}
          `}
          aria-hidden={!sidebarVisible && isMobile}
        >
          <DashboardSidebar />
        </aside>

        {/* Contenido principal: se ajusta dinámicamente */}
        <div
          className={`flex flex-col min-w-0 flex-1 h-screen overflow-y-auto transition-all duration-300 ${
            !isMobile && sidebarVisible ? "ml-72 " : "ml-0"
          }`}
        >
          <DashboardNavbar />
          <main className="flex flex-col flex-1 pl-4 pt-4" id="main-content" tabIndex={-1}>
            {children}
          </main>
        </div>



      </div>
    )
    
  }

  export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
      <SidebarProvider>
        <LayoutContent children={children} />
      </SidebarProvider>
    )
  }