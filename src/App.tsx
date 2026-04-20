import { useState, useEffect } from 'react';
import { Monitor, Code, Star, Send, ChevronRight, Menu, X, Award, Shield, Zap, MessageCircle, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      title: "Diseño Web Premium",
      desc: "Interfaces exclusivas que capturan la esencia de tu marca con elegancia.",
      icon: <Monitor className="w-8 h-8" />
    },
    {
      title: "Desarrollo a Medida",
      desc: "Código limpio y escalable utilizando las últimas tecnologías del mercado.",
      icon: <Code className="w-8 h-8" />
    },
    {
      title: "Optimización y SEO",
      desc: "Velocidad máxima y posicionamiento estratégico en buscadores.",
      icon: <Zap className="w-8 h-8" />
    }
  ];

  const stats = [
    { label: "Tiempo Entrega", value: "3-13d" },
    { label: "Proyectos Exitosos", value: "500+" },
    { label: "Clientes Felices", value: "300+" },
    { label: "Tazas de Café", value: "∞" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-white selection:text-black">
      {/* Navegación */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-gray-800 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm">
              <span className="text-black font-black text-xl italic">WT</span>
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase font-display">Web Testing</span>
          </motion.div>
          
          <div className="hidden md:flex gap-8 text-xs font-medium uppercase tracking-[0.2em]">
            {['Inicio', 'Servicios', 'Por qué elegirnos', 'Contacto'].map((item, i) => (
              <motion.a 
                key={item} 
                href={item === 'Por qué elegirnos' ? '#experiencia' : `#${item.toLowerCase()}`}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i }}
                className="hover:text-white text-gray-400 transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 text-2xl font-bold uppercase tracking-tighter">
              {['Inicio', 'Servicios', 'Por qué elegirnos', 'Contacto'].map((item) => (
                <a 
                  key={item} 
                  href={item === 'Por qué elegirnos' ? '#experiencia' : `#${item.toLowerCase()}`} 
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-gray-400 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden border-b border-gray-900">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 border border-gray-800 text-[10px] tracking-[0.4em] uppercase mb-8 rounded-full bg-white/5 backdrop-blur-sm text-gray-400 font-medium">
              Innovación digital sin límites
            </span>
            <h1 className="text-6xl md:text-[120px] font-black mb-8 leading-[0.9] tracking-tighter font-display uppercase">
              DISEÑO QUE <br/>
              <span className="text-gradient">
                TRASCIENDE
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Perfeccionando el arte de la venta digital. Creamos plataformas de alto impacto que convierten visitantes en clientes leales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('experiencia')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-all shadow-xl shadow-white/5"
              >
                Por qué elegirnos
              </motion.button>
              <motion.button 
                whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-gray-800 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs transition-all"
              >
                Ver Portafolio
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-600"
        >
          <div className="w-px h-12 bg-gradient-to-b from-gray-800 to-transparent"></div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-black py-24 relative z-10 border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center"
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={itemVariants} className="space-y-2">
                <p className="text-white text-5xl md:text-6xl font-black tracking-tighter font-display">{stat.value}</p>
                <p className="text-gray-500 uppercase text-[10px] tracking-[0.3em] font-bold">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-xl">
              <span className="text-gray-600 uppercase text-[10px] tracking-[0.3em] font-bold mb-4 block">Expertise</span>
              <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter italic font-display">Nuestros Servicios</h2>
              <p className="text-gray-500 leading-relaxed">Soluciones integrales diseñadas para dominar el mercado digital actual con elegancia y rendimiento.</p>
            </div>
            <div className="h-px flex-1 bg-gray-900 mb-6 hidden md:block"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-10 border border-gray-900 rounded-3xl hover:border-gray-700 transition-all duration-500 hover:bg-zinc-900/50 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 text-gray-900 font-display font-black text-6xl group-hover:text-gray-800 transition-colors">
                  0{i + 1}
                </div>
                <div className="mb-10 text-gray-500 group-hover:text-white transition-colors relative z-10">
                  {s.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight relative z-10">{s.title}</h3>
                <p className="text-gray-500 group-hover:text-gray-400 leading-relaxed mb-10 font-light relative z-10">
                  {s.desc}
                </p>
                <a href="#" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.25em] text-white group-hover:gap-3 transition-all relative z-10">
                  Saber más <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiencia / Trust */}
      <section id="experiencia" className="py-32 bg-black overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none italic font-display">
              Por qué elegirnos <br />
              <span className="text-gray-700">excelencia digital</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Rapidez Extrema", icon: <Zap />, desc: "Entregamos entre 3 a 13 dias, sin comprometer la calidad." },
                { title: "Los más Baratos", icon: <Award />, desc: "350 a 1250 USD dependiendo de la página. Calidad premium al mejor precio." },
                { title: "Flexibilidad Total", icon: <Star />, desc: "Pide cambios a tu web cuando quieras. Tu visión evoluciona y nosotros contigo." }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -10 }}
                  className="flex flex-col items-center gap-4 p-8 bg-zinc-950 rounded-3xl transition-colors border border-gray-900"
                >
                  <div className="text-white p-4 bg-white/5 rounded-full">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-xl uppercase tracking-tighter mb-2">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-32 bg-zinc-950 relative">
         <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black uppercase mb-4 italic tracking-tighter font-display">¿Listo para el siguiente nivel?</h2>
            <p className="text-gray-500 font-light">Cuéntanos tu visión y la haremos realidad con nuestra pasión por el diseño.</p>
          </div>
          
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left" 
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] text-gray-600 font-bold ml-4">Nombre</label>
              <input type="text" placeholder="Tu nombre" className="w-full bg-black border border-gray-900 p-6 focus:border-gray-600 outline-none transition-colors rounded-3xl font-light text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] text-gray-600 font-bold ml-4">Email</label>
              <input type="email" placeholder="tu@email.com" className="w-full bg-black border border-gray-900 p-6 focus:border-gray-600 outline-none transition-colors rounded-3xl font-light text-sm" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] text-gray-600 font-bold ml-4">Mensaje</label>
              <textarea placeholder="Háblanos sobre tu proyecto..." rows={5} className="w-full bg-black border border-gray-900 p-6 focus:border-gray-600 outline-none transition-colors rounded-[2.5rem] resize-none font-light text-sm"></textarea>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="md:col-span-2 bg-white text-black p-6 font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 hover:bg-gray-200 transition-all rounded-full"
            >
              Enviar Propuesta <Send className="w-4 h-4" />
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-900 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3 grayscale opacity-30 hover:opacity-100 transition-opacity cursor-pointer">
            <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
              <span className="text-black font-black text-sm italic">WT</span>
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase font-display">Web Testing</span>
          </div>
          <p className="text-gray-700 text-[10px] tracking-[0.35em] uppercase font-bold text-center">
            © 2024 Web Testing - Innovación digital de alto rendimiento
          </p>
          <div className="flex gap-10 items-center">
            <motion.a 
              href="https://www.instagram.com/lolo.lasnier/" 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ y: -2, color: "#fff" }}
              className="text-gray-600 transition-colors text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2"
            >
              <Instagram size={14} />
              Instagram
            </motion.a>
            <motion.a 
              href="https://wa.me/5491130750355" 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ y: -2, color: "#fff" }}
              className="text-gray-600 transition-colors text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2"
            >
              <MessageCircle size={14} fill="currentColor" />
              WhatsApp
            </motion.a>
          </div>
        </div>
      </footer>
    </div>
  );
}
