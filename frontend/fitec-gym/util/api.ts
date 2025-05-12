// Utility function for authenticated API requests
export async function fetchWithAuth<T>(url: string, options: RequestInit = {}): Promise<T> {
  // Get token from localStorage
  const token = localStorage.getItem("token")

  if (!token) {
    throw new Error("No se encontró token de autenticación")
  }

  // Create headers with authorization token
  const headers = new Headers(options.headers || {})

  // Add Content-Type if not defined
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  // Add authorization token
  headers.set("Authorization", `Bearer ${token}`)

  // Combine options with updated headers
  const fetchOptions: RequestInit = {
    ...options,
    headers,
  }

  try {
    const response = await fetch(url, fetchOptions)

    // Check if response is successful
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`)
    }

    // Return data as JSON
    return await response.json()
  } catch (error) {
    console.error("Error en la petición:", error)
    throw error
  }
}
