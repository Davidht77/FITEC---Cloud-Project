"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";



export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    about: "",
    accepted: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, value, type } = target;
    
    setFormData({
      ...formData,
      [name]: type === "checkbox" 
        ? (target as HTMLInputElement).checked  // 👈 Solo aquí tratamos como input
        : value,
    });
  };
  
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };
  

  return (
    <div className="min-h-screen bg-sky-900 flex flex-col lg:flex-row items-center justify-center p-8">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between">
      {/* Izquierda - Promoción */}
      <div className="w-full lg:w-1/2 p-4">
        <h2 className="text-yellow-400 text-sm font-bold uppercase mb-2">Triunfa en línea</h2>
        <h1 className="text-4xl font-bold mb-6 leading-tight text-gray-800">
           Fortalece tu negocio con un sitio web
        </h1>
        <p className="text-white mb-8">
          Empieza hoy con nuestros servicios...
        </p>


        {/* Logos de partners */}
        <div className="flex items-center gap-8 mb-10">
          <img src="/logos/a2hosting.png" alt="A2 Hosting" className="h-8" />
          <img src="/logos/hubspot.png" alt="Hubspot" className="h-8" />
          <img src="/logos/youtube.png" alt="YouTube" className="h-8" />
        </div>

        {/* Tarjetas de servicios */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-red-100 rounded-lg p-4 flex items-center justify-center h-36 shadow-md">
            <p className="text-center font-medium">Diseño Web</p>
          </div>
          <div className="bg-gray-200 rounded-lg p-4 flex items-center justify-center h-36 shadow-md">
            <p className="text-center font-medium">E-commerce</p>
          </div>
          <div className="bg-green-200 rounded-lg p-4 flex items-center justify-center h-36 shadow-md">
            <p className="text-center font-medium">Marketing</p>
          </div>
        </div>
      </div>


      {/* Derecha - Formulario */}
      <div className="w-full lg:w-1/2 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full mx-auto">
          <h2 className="text-yellow-400 text-lg font-bold mb-2">REGÍSTRATE EN FITEC</h2>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Crea tu cuenta fácilmente</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nombre */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ingresa tu nombre completo"
          required
          className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Ingresa tu correo electrónico"
          required
          className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
        />
      </div>

      {/* Teléfono */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Teléfono
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Número de contacto"
          className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
        />
      </div>

      {/* Business */}
      <div>
        <label htmlFor="business" className="block text-sm font-medium text-gray-700">
          Nombre de tu negocio (opcional)
        </label>
        <input
          id="business"
          name="business"
          type="text"
          value={formData.business}
          onChange={handleChange}
          placeholder="Ej: FITEC Gym"
          className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
        />
      </div>

      {/* About */}
      <div>
        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
          Cuéntanos un poco sobre ti
        </label>
        <textarea
          id="about"
          name="about"
          rows={3}
          value={formData.about}
          onChange={handleChange}
          placeholder="Tus metas, tus pasiones..."
          className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
        />
      </div>

      {/* Políticas */}
      <div className="flex items-center">
        <input
          id="accepted"
          name="accepted"
          type="checkbox"
          checked={formData.accepted}
          onChange={handleChange}
          className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-gray-300 rounded"
          required
        />
        <label htmlFor="accepted" className="ml-2 block text-sm text-gray-900">
          Acepto las{" "}
          <a href="#" className="font-medium text-yellow-400 hover:text-yellow-500">
            Políticas de Privacidad
          </a>
        </label>
      </div>

      {/* Botón de registro */}
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
        >
          Crear cuenta
        </button>
      </div>
      </form>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Tus datos serán usados para brindarte la mejor experiencia.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
