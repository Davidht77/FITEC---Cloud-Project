"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useAuthFetch<T>() {
  const router = useRouter()
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const fetchData = useCallback(
    async (url: string, options: RequestInit = {}) => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }))

        // Obtener el token JWT del localStorage
        const token = localStorage.getItem("token")

        if (!token) {
          console.error("No se encontró token JWT en localStorage")
          setState((prev) => ({
            ...prev,
            loading: false,
            error: "No hay sesión activa. Por favor, inicie sesión.",
          }))

          // Redirigir al login
          setTimeout(() => {
            router.push("/login")
          }, 2000)

          return null
        }

        // Crear headers con el token de autorización
        const headers = new Headers(options.headers || {})

        // Añadir el Content-Type si no está definido
        if (!headers.has("Content-Type")) {
          headers.set("Content-Type", "application/json")
        }

        // Añadir el token de autorización
        headers.set("Authorization", `Bearer ${token}`)

        console.log("Enviando petición con token JWT:", token.substring(0, 15) + "...")

        // Realizar la petición
        const response = await fetch(url, {
          ...options,
          headers,
        })

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
          if (response.status === 401) {
            console.error("Token JWT expirado o inválido")
            localStorage.removeItem("token")
            setState((prev) => ({
              ...prev,
              loading: false,
              error: "Sesión expirada. Redirigiendo al login...",
            }))

            // Redirigir al login
            setTimeout(() => {
              router.push("/login")
            }, 2000)

            return null
          }

          throw new Error(`Error HTTP: ${response.status} ${response.statusText}`)
        }

        // Procesar los datos
        const data = await response.json()
        setState({ data, loading: false, error: null })
        return data
      } catch (error) {
        console.error("Error en la petición:", error)
        setState((prev) => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : "Error desconocido",
        }))
        return null
      }
    },
    [router],
  )

  return { ...state, fetchData }
}
