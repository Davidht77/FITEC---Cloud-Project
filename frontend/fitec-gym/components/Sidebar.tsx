// components/Sidebar.tsx
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow h-full p-4 flex flex-col space-y-4">
      <h2 className="text-xl font-bold">FITEC</h2>
      <Button variant="ghost" className="justify-start">🏠 Inicio</Button>
      <Button variant="ghost" className="justify-start">📍 Sedes</Button>
      <Button variant="ghost" className="justify-start">🏋️ Programas</Button>
      <Button variant="ghost" className="justify-start">👤 Perfil</Button>
      <Button variant="ghost" className="justify-start mt-auto text-red-500">🚪 Cerrar sesión</Button>
    </aside>
  );
}
