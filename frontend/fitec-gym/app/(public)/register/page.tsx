"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RegisterRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirigir a la página de registro de clientes por defecto
    router.push("/register/client")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-900">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
        <p>Redirigiendo...</p>
      </div>
    </div>
  )
}
