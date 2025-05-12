export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-900">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
        <p>Cargando...</p>
      </div>
    </div>
  )
}
