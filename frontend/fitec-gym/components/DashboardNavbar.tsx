"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // 👈 importa esto
import { Menu, Bell, Search, X } from "lucide-react";
import { useSidebar } from "@/context/DashboardNarvarContext";
import Link from "next/link";

export default function DashboardNavbar() {
  const { toggleSidebar, sidebarVisible } = useSidebar()
  const [showSearch, setShowSearch] = useState(false);
  const [notifications, setNotifications] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userId, setUserId] = useState<string | null>(null); // 👈 aquí defines userId

  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem("id");
    setUserId(id);
  }, []);

  const goToProfile = () => {
    if (userId) {
      router.push(`/dashboard/perfil/${userId}`);
    } else {
      alert("No se encontró el ID del usuario.");
    }
  };

  return (
    
    <header className="bg-white shadow-sm px-6 py-3 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center">
        {/* Botón hamburguesa */}
        {!sidebarVisible && (
          <button 
            onClick={toggleSidebar}
            className="mr-4 hover:bg-gray-100 p-2 rounded-md transition-colors"
            aria-label="Abrir menú"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
        )}

        {/* Logo en el navbar (visible en móvil) */}
        <Link href="/dashboard" className="md:hidden">
          <h1 className="text-xl font-bold text-sky-800">FITEC</h1>
        </Link>
      </div>

      {/* Buscador expandible */}
      <div className={`${showSearch ? 'flex absolute left-0 right-0 px-4' : 'hidden md:flex'} items-center max-w-md mx-auto relative`}>
        {showSearch && (
          <button 
            onClick={() => setShowSearch(false)}
            className="md:hidden p-2 mr-1"
            aria-label="Cerrar búsqueda"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        )}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar programas, sedes..."
            className="w-full p-2 pl-10 border border-gray-200 rounded-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 text-sm"
          />
        </div>
      </div>

      

      {/* Botón de notificaciones */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="p-2 hover:bg-gray-100 rounded-full relative"
          aria-label="Notificaciones"
        >
          <Bell className="w-5 h-5 text-gray-700" />
          {notifications > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {notifications}
            </span>
          )}
        </button>

        {/* Dropdown estático */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-4 text-sm text-gray-800">
              <p className="font-semibold">¡Bienvenido a FITEC!</p>
              <p className="text-gray-600">Explora programas, sedes y más desde tu panel.</p>
            </div>
          </div>
        )}
      </div>


        {/* 👤 Ícono de perfil que redirige usando router */}
        <button
          onClick={goToProfile}
          className="flex items-center gap-2 hover:bg-gray-100 p-1 px-2 rounded-full transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-sky-600 to-blue-500 flex items-center justify-center">
            <span className="text-sm font-semibold text-white">U</span>
          </div>
          <span className="text-sm font-medium text-gray-700 hidden md:inline">
            Usuario
          </span>
        </button>
      
    </header>
  );
}
