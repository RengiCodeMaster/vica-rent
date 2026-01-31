import React, { useState } from 'react';
import { Car } from '../types';
import { Shield, Fuel, Gauge, ArrowRight, Users, Settings } from 'lucide-react';

interface CarCardProps {
  car: Car;
  onSelect: (car: Car) => void;
  index: number;
}

const CarCard: React.FC<CarCardProps> = ({ car, onSelect, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative group h-[420px] w-full perspective-1000 animate-slide-up`}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`
          w-full h-full glass-panel rounded-3xl p-6 transition-all duration-500 ease-out transform-gpu flex flex-col justify-between overflow-hidden
          ${isHovered ? 'border-vica-orange/50 shadow-[0_0_30px_rgba(245,158,11,0.2)]' : 'border-white/10'}
        `}
      >
        {/* Background Gradient Blob */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-vica-500/10 rounded-full blur-3xl group-hover:bg-vica-orange/10 transition-colors duration-500" />

        {/* Header */}
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider text-vica-orange bg-vica-orange/10 rounded-full mb-2 border border-vica-orange/20">
                {car.type.toUpperCase()}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-vica-orange transition-colors line-clamp-1">
                {car.name}
              </h3>
            </div>
            <div className="text-right whitespace-nowrap pl-2">
              <p className="text-2xl md:text-3xl font-display font-bold text-white">s/{car.price}</p>
              <p className="text-xs text-gray-400">/día</p>
            </div>
          </div>
        </div>

        {/* Image Area */}
        <div className="relative z-10 flex-grow flex items-center justify-center py-2">
          <img 
            src={car.image} 
            alt={car.name} 
            className={`
              w-full h-44 object-contain filter drop-shadow-2xl transition-all duration-700
              ${isHovered ? 'scale-110 -translate-y-2' : 'scale-100'}
            `}
          />
        </div>

        {/* Specs & Button */}
        <div className="relative z-10 space-y-4">
          <div className="flex justify-between text-xs md:text-sm text-gray-300 border-t border-white/10 pt-4 px-1">
            <div className="flex flex-col items-center gap-1">
              <Users size={16} className="text-vica-orange" />
              <span>{car.passengers} Pas.</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Settings size={16} className="text-vica-orange" />
              <span>{car.transmission === 'Automático' ? 'Auto' : 'Mec.'}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Fuel size={16} className="text-vica-orange" />
              <span>Gas/GLP</span>
            </div>
          </div>

          <button 
            onClick={() => onSelect(car)}
            className={`
              w-full py-3 md:py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 text-sm md:text-base
              ${isHovered ? 'bg-vica-orange text-vica-900 shadow-lg shadow-vica-orange/20' : 'bg-white/5 text-white hover:bg-white/10'}
            `}
          >
            RESERVAR AHORA
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;