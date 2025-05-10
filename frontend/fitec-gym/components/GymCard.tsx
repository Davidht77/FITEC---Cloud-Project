import Image from "next/image";
import { MapPin, Clock, Users } from 'lucide-react';
import Link from "next/link";

interface GymCardProps {
  sede: {
    id: string
    name: string
    address: string
    phone: string
  }
}


export default function GymCard({ sede }: GymCardProps) {
  const {
    id,
    name,
    address,
    phone
  } = sede;

  // Valores simulados por defecto solo para mostrar
  const image = "/placeholder.svg";
  const currentUsers = Math.floor(Math.random() * 100); // simulado
  const maxCapacity = 100;
  const occupancy = Math.round((currentUsers / maxCapacity) * 100);
  const isOpen = true; // valor fijo simulado
  const hours = "6:00 - 22:00";

  let occupancyColor = "bg-green-500";
  if (occupancy > 80) occupancyColor = "bg-red-500";
  else if (occupancy > 50) occupancyColor = "bg-yellow-500";

  return (
    <Link href={`/dashboard/sedes/${sede.id}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
        <div className="relative h-40">
          <Image 
            src={image || "/placeholder.svg"} 
            alt={name} 
            fill 
            className="object-cover"
          />
          <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium text-white ${isOpen ? 'bg-green-500' : 'bg-gray-500'}`}>
            {isOpen ? 'Abierto' : 'Cerrado'}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-900">{name}</h3>
          
          <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
            <MapPin className="w-4 h-4" />
            <span>{address}</span>
          </div>

          <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
            <span className="font-semibold">Tel:</span>
            <span>{phone}</span>
          </div>
          
          <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
            <Clock className="w-4 h-4" />
            <span>{hours}</span>
          </div>
          
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Users className="w-4 h-4" />
                <span>{currentUsers}/{maxCapacity} usuarios</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
