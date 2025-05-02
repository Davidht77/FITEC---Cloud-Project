"use client";

import Link from "next/link";

export default function LoginForm() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-24 bg-sky-900 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        {/* Título */}
        <h1 className="text-3xl font-bold text-sky-900 mb-5 text-left">
          Te damos la bienvenida nuevamente
        </h1>
        <p className="text-left text-gray-600 mb-5 text-sm">
          Que gusto verte en Fitec
        </p>

        {/* Formulario */}
        <form className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Ingresa tu correo electrónico"
              className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
            />

          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
            />
          </div>

          {/* Opciones extra */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                Recuérdame
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-yellow-400 hover:text-yellow-500">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          {/* Botón de login */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

        {/* Pie de página */}
        <div className="mt-6 text-center text-sm text-gray-600">
          ¿Nuevo en FITEC?{" "}
          <Link href="/register" className="font-medium text-yellow-400 hover:text-yellow-500">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
