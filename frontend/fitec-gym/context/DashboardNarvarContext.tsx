"use client"

import { createContext, useContext, useEffect, useState, Dispatch, SetStateAction } from "react"

// 1. Tipo del contexto con tipos más específicos
interface SidebarContextType {
  sidebarVisible: boolean
  toggleSidebar: () => void
  setSidebarVisible: Dispatch<SetStateAction<boolean>>
  isMobile: boolean
}

// 2. Valor inicial por defecto (temporal)
const SidebarContext = createContext<SidebarContextType>({
  sidebarVisible: true,
  toggleSidebar: () => {},
  setSidebarVisible: () => false,
  isMobile: false,
})

// 3. Hook personalizado
export const useSidebar = () => useContext(SidebarContext)

// 4. Provider del contexto
export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Detectar si es móvil al cargar y al redimensionar
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setSidebarVisible(!mobile)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleSidebar = () => setSidebarVisible((prev) => !prev)

  return (
    <SidebarContext.Provider value={{ sidebarVisible, toggleSidebar, setSidebarVisible, isMobile }}>
      {children}
    </SidebarContext.Provider>
  )
}
