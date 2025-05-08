"use client"

import { type ReactNode } from "react"
import DashboardNavbar from "@/components/DashboardNavbar"
import DashboardSidebar from "@/components/DashboardSidebar"
import { SidebarProvider, useSidebar } from "@/context/DashboardNarvarContext"

function LayoutContent({ children }: { children: ReactNode }) {
  const { sidebarVisible, setSidebarVisible, isMobile } = useSidebar()

  return (
    <div className="flex min-h-screen text-black bg-gray-50">
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
        className={`${
          isMobile ? "fixed z-20" : "relative"
        } top-0 h-screen w-72 bg-white border-r transform transition-transform duration-300 ease-in-out ${
          sidebarVisible ? "translate-x-0" : isMobile ? "-translate-x-full" : "hidden"
        }`}
        aria-hidden={!sidebarVisible && isMobile}
      >
        <DashboardSidebar />
      </aside>



      {/* Contenido principal: se ajusta dinámicamente */}
      <div className="flex flex-col min-w-0 flex-1 transition-all duration-300">
        <DashboardNavbar />
        <main className="flex-1 p-4 md:p-6" id="main-content" tabIndex={-1}>
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
