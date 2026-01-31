import React, { useState, useEffect } from 'react';
import { Car } from './types';
import CarCard from './components/CarCard';

import { Menu, MapPin, Calendar, Search, Star, ChevronDown, Phone, Car as CarIcon, CheckCircle, Shield, Clock, ThumbsUp, X, Settings } from 'lucide-react';

// --- DATA ---
const FLEET: Car[] = [
  {
    id: '1',
    name: 'Toyota Hilux 4x4',
    type: 'Pickup',
    price: 280,
    image: 'https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&q=80&w=800', // Ford Raptor (Best matching Pickup)
    features: ['4x4', 'Turbo Diesel', 'Tolva Amplia'],
    passengers: 5,
    transmission: 'Mecánico',
    available: true
  },
  {
    id: '2',
    name: 'Toyota Fortuner',
    type: 'SUV',
    price: 350,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=800', // White Luxury SUV
    features: ['Lujo', '3 Filas', 'Cuero'],
    passengers: 7,
    transmission: 'Automático',
    available: true
  },
  {
    id: '3',
    name: 'Kia Picanto',
    type: 'Sedan',
    price: 120,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800', // Small Compact Car
    features: ['Económico', 'Compacto', 'CarPlay'],
    passengers: 4,
    transmission: 'Mecánico',
    available: true
  },
  {
    id: '4',
    name: 'Hyundai H1',
    type: 'Van',
    price: 300,
    image: 'https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?auto=format&fit=crop&q=80&w=800', // Van
    features: ['Turismo', 'Aire Acondicionado', 'Amplio'],
    passengers: 12,
    transmission: 'Mecánico',
    available: true
  },
  {
    id: '5',
    name: 'Toyota Rush',
    type: 'SUV',
    price: 220,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800', // Compact SUV
    features: ['Económico', 'Alto Despeje', '7 Asientos'],
    passengers: 7,
    transmission: 'Automático',
    available: true
  },
  {
    id: '6',
    name: 'Toyota Yaris',
    type: 'Sedan',
    price: 150,
    image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=800', // Sedan
    features: ['Confort', 'Maletera Amplia', 'Gasolinero'],
    passengers: 5,
    transmission: 'Automático',
    available: true
  }
];

const TESTIMONIALS = [
  { name: "Carlos M.", text: "Excelente servicio. La Hilux estaba impecable para ir a las cataratas.", stars: 5 },
  { name: "Ana P.", text: "Muy puntuales en el aeropuerto. El precio es justo y sin sorpresas.", stars: 5 },
  { name: "Roberto S.", text: "Alquilé un auto para mi familia y todo fue seguro. Recomendados.", stars: 4 }
];

const FAQS = [
  { q: "¿Qué requisitos necesito para alquilar?", a: "Solo necesitas tu DNI/Pasaporte vigente, Licencia de Conducir y una garantía (tarjeta de crédito o efectivo)." },
  { q: "¿Incluye seguro?", a: "Sí, todos nuestros vehículos cuentan con SOAT y seguro contra todo riesgo (con franquicia)." },
  { q: "¿Puedo salir de Tingo María?", a: "Sí, permitimos viajes a zonas aledañas como Huánuco o Pucallpa con autorización previa." },
  { q: "¿Entregan en el aeropuerto?", a: "¡Claro! Te esperamos en el aeropuerto de Tingo María sin costo adicional en horarios de oficina." }
];

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [filter, setFilter] = useState<'Todos' | 'Pickup' | 'SUV' | 'Sedan'>('Todos');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Booking Form State
  const [bookingData, setBookingData] = useState({ name: '', dni: '', days: '1' });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Scroll Reveal Logic
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const filteredFleet = filter === 'Todos' ? FLEET : FLEET.filter(c => c.type === filter);

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCar) return;

    const message = `Hola VICA RENT, me interesa alquilar el vehículo:
*${selectedCar.name}*
Precio Ref: s/${selectedCar.price}/día
Días: ${bookingData.days}

Mi nombre es: ${bookingData.name}
DNI: ${bookingData.dni}

Quedo atento a la disponibilidad.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/51932386873?text=${encodedMessage}`, '_blank');
    setSelectedCar(null);
  };

  return (
    <div className="min-h-screen bg-vica-900 font-sans selection:bg-vica-orange selection:text-vica-900 text-slate-200">

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-vica-900/95 backdrop-blur-lg border-b border-white/10 py-4 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-3xl tracking-tighter text-white">VICA</span>
              <span className="font-display font-bold text-lg tracking-widest text-vica-orange -mt-1">RENT</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#fleet" className="hover:text-vica-orange transition-colors">Flota</a>
            <a href="#services" className="hover:text-vica-orange transition-colors">Servicios</a>
            <a href="#testimonials" className="hover:text-vica-orange transition-colors">Testimonios</a>
            <a href="#faq" className="hover:text-vica-orange transition-colors">Preguntas</a>
          </div>

          <a href="tel:932386873" className="hidden md:flex items-center gap-2 px-6 py-2 bg-vica-orange text-vica-900 rounded-full hover:bg-white transition-all duration-300 font-bold text-sm shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            <Phone size={16} />
            932 386 873
          </a>

          <button
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-vica-900/95 backdrop-blur-xl border-b border-white/10 overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col p-6 gap-4">
            <a href="#fleet" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-gray-300 hover:text-vica-orange px-4 py-2 hover:bg-white/5 rounded-xl transition-all">Flota</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-gray-300 hover:text-vica-orange px-4 py-2 hover:bg-white/5 rounded-xl transition-all">Servicios</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-gray-300 hover:text-vica-orange px-4 py-2 hover:bg-white/5 rounded-xl transition-all">Testimonios</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-gray-300 hover:text-vica-orange px-4 py-2 hover:bg-white/5 rounded-xl transition-all">Preguntas</a>
            <a href="tel:932386873" className="flex items-center gap-2 justify-center bg-vica-orange text-vica-900 font-bold py-3 rounded-xl mt-2">
              <Phone size={18} />
              Llamar Ahora
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Car Background"
            className="w-full h-full object-cover opacity-90 animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-vica-900 via-vica-900/90 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-vica-900 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-up">


            <h1 className="text-5xl md:text-7xl font-display font-bold leading-none text-white drop-shadow-xl">
              EXPLORA LA SELVA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-vica-orange to-vica-yellow">SIN LÍMITES</span>
            </h1>

            <p className="text-lg text-gray-300 max-w-lg leading-relaxed drop-shadow-md">
              Especialistas en alquiler de camionetas 4x4 y autos modernos. Viaja seguro y cómodo por todo Tingo María y la selva central con VICA RENT.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#fleet" className="bg-vica-orange hover:bg-white hover:text-vica-900 text-vica-900 px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-vica-orange/20">
                VER VEHÍCULOS
                <ChevronDown size={20} />
              </a>
              <a href="https://wa.me/51932386873" target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-bold transition-all backdrop-blur-sm flex items-center justify-center">
                CONTACTAR ASESOR
              </a>
            </div>

            <div className="pt-8 flex items-center gap-8 text-sm text-gray-400 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-vica-orange" />
                <span>Atención 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-vica-orange" />
                <span>Seguro Incluido</span>
              </div>
            </div>
          </div>

          {/* Hero Floating Element Removed */}
        </div>
      </section>

      {/* Services Section (New) */}
      <section id="services" className="py-20 bg-vica-800/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
            <span className="text-vica-orange font-bold tracking-widest text-sm uppercase">Experiencia VICA</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">¿POR QUÉ ELEGIRNOS?</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-vica-900/50 p-8 rounded-2xl border border-white/5 hover:border-vica-orange/30 transition-all duration-300 hover:-translate-y-2 group reveal-on-scroll opacity-0 translate-y-8 ease-out" style={{ transitionDelay: '100ms' }}>
              <div className="w-12 h-12 bg-vica-orange/10 rounded-xl flex items-center justify-center text-vica-orange mb-4 group-hover:scale-110 transition-transform">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Seguridad Total</h3>
              <p className="text-sm text-gray-400">Todos nuestros vehículos cuentan con SOAT vigente y seguro contra todo riesgo para tu tranquilidad.</p>
            </div>

            <div className="bg-vica-900/50 p-8 rounded-2xl border border-white/5 hover:border-vica-orange/30 transition-all duration-300 hover:-translate-y-2 group reveal-on-scroll opacity-0 translate-y-8 ease-out" style={{ transitionDelay: '200ms' }}>
              <div className="w-12 h-12 bg-vica-orange/10 rounded-xl flex items-center justify-center text-vica-orange mb-4 group-hover:scale-110 transition-transform">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Puntualidad</h3>
              <p className="text-sm text-gray-400">Tu tiempo vale oro. Garantizamos la entrega del vehículo a la hora pactada en aeropuerto u hotel.</p>
            </div>

            <div className="bg-vica-900/50 p-8 rounded-2xl border border-white/5 hover:border-vica-orange/30 transition-all duration-300 hover:-translate-y-2 group reveal-on-scroll opacity-0 translate-y-8 ease-out" style={{ transitionDelay: '300ms' }}>
              <div className="w-12 h-12 bg-vica-orange/10 rounded-xl flex items-center justify-center text-vica-orange mb-4 group-hover:scale-110 transition-transform">
                <Settings size={24} /> {/* Using Settings as Maintenance/Mechanic icon placeholder */}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Mantenimiento</h3>
              <p className="text-sm text-gray-400">Flota renovada constantemente y revisada por mecánicos expertos antes de cada entrega.</p>
            </div>

            <div className="bg-vica-900/50 p-8 rounded-2xl border border-white/5 hover:border-vica-orange/30 transition-all duration-300 hover:-translate-y-2 group reveal-on-scroll opacity-0 translate-y-8 ease-out" style={{ transitionDelay: '400ms' }}>
              <div className="w-12 h-12 bg-vica-orange/10 rounded-xl flex items-center justify-center text-vica-orange mb-4 group-hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Rutas Libres</h3>
              <p className="text-sm text-gray-400">Te asesoramos con las mejores rutas turísticas a cataratas y cuevas para que aproveches tu 4x4.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section id="fleet" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <span className="text-vica-orange font-bold tracking-widest text-sm">CATÁLOGO EXCLUSIVO</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-2">
                NUESTRA <span className="text-vica-orange">FLOTA</span>
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 p-1 bg-white/5 rounded-xl backdrop-blur-sm overflow-x-auto reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out delay-100">
              {(['Todos', 'Pickup', 'SUV', 'Sedan'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${filter === t ? 'bg-vica-orange text-vica-900 shadow' : 'text-gray-400 hover:text-white'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFleet.map((car, idx) => (
              <div key={car.id} className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out" style={{ transitionDelay: `${idx * 100}ms` }}>
                <CarCard
                  car={car}
                  index={idx}
                  onSelect={(c) => {
                    setSelectedCar(c);
                    setBookingData(prev => ({ ...prev, name: '', dni: '', days: '1' }));
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section id="testimonials" className="py-20 bg-black/20 overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-bold text-center mb-12 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">CLIENTES <span className="text-vica-orange">SATISFECHOS</span></h2>

          <div className="relative max-w-4xl mx-auto h-[300px] flex items-center justify-center">
            {TESTIMONIALS.map((t, i) => {
              const isActive = i === activeTestimonial;
              return (
                <div
                  key={i}
                  className={`absolute transition-all duration-700 ease-in-out w-full md:w-2/3 bg-vica-800/60 backdrop-blur-md p-8 rounded-3xl border border-white/10 flex flex-col items-center gap-6 shadow-2xl ${isActive ? 'opacity-100 translate-x-0 scale-100 z-20' : 'opacity-0 translate-x-10 scale-95 z-10'}`}
                  style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                >
                  <div className="flex gap-1 text-vica-orange animate-pulse-slow">
                    {[...Array(t.stars)].map((_, si) => <Star key={si} size={20} fill="currentColor" />)}
                  </div>
                  <p className="text-xl md:text-2xl text-gray-200 italic font-light leading-relaxed">"{t.text}"</p>
                  <div>
                    <p className="font-bold text-white text-lg">{t.name}</p>
                    <p className="text-vica-orange/60 text-xs tracking-widest uppercase mt-1">Cliente Verificado</p>
                  </div>
                  <div className="absolute top-4 right-8 text-white/5">
                    <ThumbsUp size={100} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === activeTestimonial ? 'w-8 bg-vica-orange' : 'w-2 bg-white/20 hover:bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-display font-bold text-center mb-10 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">PREGUNTAS <span className="text-vica-orange">FRECUENTES</span></h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-vica-800/20 border border-white/10 rounded-xl overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-white/5 transition-colors">
                    <span className="font-bold text-white">{faq.q}</span>
                    <span className="bg-white/10 rounded-full p-1 group-open:rotate-180 transition-transform">
                      <ChevronDown size={16} />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-white/10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-col">
            <span className="font-display font-bold text-2xl text-white">VICA <span className="text-vica-orange">RENT</span></span>
            <span className="text-gray-500 text-sm mt-1">Tu mejor opción en Tingo María</span>
          </div>

          <div className="flex flex-col md:flex-row gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <MapPin size={16} className="text-vica-orange" />
              <span>Av. Raimondi 123, Tingo María</span>
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Phone size={16} className="text-vica-orange" />
              <span>932 386 873</span>
            </div>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-vica-orange transition-colors">Facebook</a>
            <a href="#" className="text-gray-500 hover:text-vica-orange transition-colors">Instagram</a>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-8 pt-8 border-t border-white/5 text-center text-xs text-gray-600">
          © 2024 VICA RENT. Todos los derechos reservados.
        </div>
      </footer>



      {/* Booking Modal */}
      {selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-reveal">
          <div className="bg-vica-900 border border-white/10 p-6 md:p-8 rounded-3xl max-w-md w-full relative shadow-2xl shadow-black">
            <button
              onClick={() => setSelectedCar(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all"
            >
              <X size={20} />
            </button>

            <div className="mb-6 flex gap-4 items-center border-b border-white/10 pb-6">
              <img src={selectedCar.image} alt={selectedCar.name} className="w-24 h-16 object-contain" />
              <div>
                <span className="text-vica-orange text-xs font-bold uppercase tracking-widest">Cotizar Alquiler</span>
                <h3 className="text-xl font-bold font-display text-white">{selectedCar.name}</h3>
                <p className="text-gray-400 text-sm">Desde s/{selectedCar.price} / día</p>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleWhatsAppRedirect}>
              <div>
                <label className="text-xs text-gray-400 ml-1 mb-1 block">Tu Nombre Completo</label>
                <input
                  type="text"
                  value={bookingData.name}
                  onChange={e => setBookingData({ ...bookingData, name: e.target.value })}
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:border-vica-orange outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 ml-1 mb-1 block">DNI / Pasaporte</label>
                <input
                  type="text"
                  value={bookingData.dni}
                  onChange={e => setBookingData({ ...bookingData, dni: e.target.value })}
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:border-vica-orange outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 ml-1 mb-1 block">Días estimados de alquiler</label>
                <select
                  value={bookingData.days}
                  onChange={e => setBookingData({ ...bookingData, days: e.target.value })}
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:border-vica-orange outline-none transition-colors"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 10, 15, 30].map(d => (
                    <option key={d} value={d} className="bg-vica-900 text-white">{d} {d === 1 ? 'Día' : 'Días'}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 transform hover:-translate-y-1">
                  <Phone size={20} />
                  SOLICITAR POR WHATSAPP
                </button>
                <p className="text-center text-xs text-gray-500 mt-3">
                  Serás redirigido a WhatsApp para confirmar disponibilidad con un asesor.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;