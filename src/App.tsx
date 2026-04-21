import { useState, useEffect } from 'react';
import { Monitor, Code, Star, Send, ChevronRight, Menu, X, Award, Shield, Zap, MessageCircle, Instagram, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState<null | typeof services[0]>(null);

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
    { label: "Tiempo Entrega", value: "3 - 13d" }
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
      <AnimatePresence mode="wait">
        {!selectedService ? (
          <motion.div
            key="main-web"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
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
          
          <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
            {['Inicio', 'PORQUÉ ELEGIRNOS', 'Sobre mí'].map((item, i) => (
              <motion.a 
                key={item} 
                href={item === 'PORQUÉ ELEGIRNOS' ? '#experiencia' : item === 'Sobre mí' ? '#quien-soy' : `#${item.toLowerCase()}`}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i }}
                className="text-gray-400 hover:text-white transition-colors"
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
              {['Inicio', 'PORQUÉ ELEGIRNOS', 'Sobre mí'].map((item) => (
                <a 
                  key={item} 
                  href={item === 'PORQUÉ ELEGIRNOS' ? '#experiencia' : item === 'Sobre mí' ? '#quien-soy' : `#${item.toLowerCase()}`} 
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-sweep border border-gray-800 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl shadow-white/5"
              >
                Nuestros Servicios
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('presupuesto')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-sweep border border-gray-800 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs"
              >
                Presupuesto
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('quien-soy')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-sweep border border-gray-800 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2"
              >
                Quienes estan detras <ChevronRight className="w-3 h-3" />
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
            className="flex flex-col md:flex-row items-center justify-center gap-12 text-center"
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
                <p className="text-gray-500 group-hover:text-gray-400 leading-relaxed font-light relative z-10">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-20"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedService({ title: "Nuestros Servicios", desc: "Información detallada sobre todos nuestros planes y soluciones digitales.", icon: null })}
              className="btn-sweep border border-gray-800 text-white px-16 py-6 rounded-full font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-white/5 flex items-center gap-4 transition-all"
            >
              Saber más <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
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
                { title: "Rapidez Extrema", icon: <Zap />, desc: "Entregamos entre 3 - 13 días, sin comprometer la calidad." },
                { title: "EL MEJOR PRECIO", icon: <Award />, desc: "350 a 1250 USD dependiendo de la página. Calidad premium al mejor precio." },
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

      {/* Presupuesto Section */}
      <section id="presupuesto" className="py-32 bg-zinc-950 border-t border-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <span className="text-zinc-600 uppercase text-[10px] tracking-[0.4em] font-bold block">Inversión Transparente</span>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic font-display">
                  PRESUPUESTO <br />
                  <span className="text-gray-700">PERSONALIZADO</span>
                </h2>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed font-light">
                Cada proyecto es único. Por eso, para saber con exactitud el costo de tu servicio, deberás contactarnos directamente por WhatsApp.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <motion.a 
                  href="https://wa.me/5491130750355"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-4 btn-sweep border border-gray-800 text-white px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs"
                >
                  <MessageCircle fill="currentColor" className="w-5 h-5" /> Consultar WhatsApp
                </motion.a>
                <motion.button 
                  onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-sweep border border-gray-800 px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs text-gray-400 hover:text-white"
                >
                  Ver Servicios
                </motion.button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-video lg:aspect-square bg-zinc-900 rounded-[3rem] border border-gray-800 overflow-hidden p-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              <div className="h-full w-full bg-black rounded-[2.8rem] flex flex-col items-center justify-center p-12 text-center space-y-4">
                <Shield size={60} className="text-gray-800 mb-4" />
                <h3 className="text-2xl font-bold uppercase tracking-tight">Garantía de Valor</h3>
                <p className="text-gray-500 font-light text-sm">Precios competitivos adaptados a las necesidades reales de tu negocio, sin costos ocultos.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quien soy Section */}
      <section id="quien-soy" className="py-32 bg-black border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full md:w-1/3 aspect-square bg-zinc-950 rounded-full border border-gray-800 flex items-center justify-center p-12 overflow-hidden group"
          >
            <User size={120} className="text-gray-800 group-hover:text-white transition-colors duration-500" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-6"
          >
            <span className="text-gray-600 uppercase text-[10px] tracking-[0.3em] font-bold block">El fundador</span>
            <h2 className="text-5xl font-black uppercase tracking-tighter italic font-display">Soy Lorenzo</h2>
            <p className="text-gray-400 text-lg leading-relaxed font-light max-w-2xl">
              Un joven emprendedor de <span className="text-white font-medium">15 años</span> con una visión clara: revolucionar el diseño web. Mi objetivo es demostrar que la edad no es un límite para la innovación y la excelencia digital.
            </p>
            <p className="text-gray-500 leading-relaxed font-light max-w-2xl">
              En Web Testing, fusiono creatividad audaz con rapidez extrema para entregar sitios que no solo se ven bien, sino que impulsan negocios reales al siguiente nivel. Estoy aquí para construir el futuro de la web, un proyecto a la vez.
            </p>
            <div className="pt-6">
              <div className="inline-block p-1 rounded-full bg-gradient-to-r from-gray-800 to-transparent">
                <div className="bg-black px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                  Fundador de Web Testing
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-32 bg-zinc-950 relative border-t border-gray-900">
         <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
              <h3 className="text-3xl font-black uppercase mb-4 italic tracking-tighter font-display">O déjanos un mensaje</h3>
              <p className="text-gray-500 font-light text-sm">Si lo prefieres, completa el formulario y te escribiremos nosotros.</p>
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
                className="md:col-span-2 btn-sweep border border-gray-800 text-white p-6 font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 rounded-full"
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
    </motion.div>
  ) : (
          <motion.div
            key="service-detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen flex items-center justify-center bg-black p-6"
          >
            <div className="max-w-3xl w-full">
              <button 
                onClick={() => setSelectedService(null)}
                className="mb-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" /> Volver al inicio
              </button>
              
              <div className="space-y-12">
                {selectedService.icon && (
                  <div className="p-6 bg-white/5 w-fit rounded-3xl text-white">
                    {selectedService.icon}
                  </div>
                )}
                
                <div className="space-y-4">
                  <span className="text-zinc-600 uppercase text-[10px] tracking-[0.4em] font-bold block">Información Detallada</span>
                  <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none italic font-display">
                    {selectedService.title}
                  </h2>
                </div>
                
                <div className="p-10 border border-gray-800 rounded-[3rem] bg-zinc-950/50 space-y-8">
                  <p className="text-gray-400 text-xl leading-relaxed font-light">
                    Para obtener información técnica detallada, ejemplos de implementación y una propuesta personalizada sobre <span className="text-white font-medium">{selectedService.title}</span>, por favor contáctanos directamente.
                  </p>
                  
                  <div className="pt-8 border-t border-gray-900">
                    <h4 className="text-xl font-bold uppercase tracking-tight mb-6 italic">¿LISTO PARA EMPEZAR?</h4>
                    <motion.a 
                      href="https://wa.me/5491130750355"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-4 btn-sweep border border-gray-800 text-white px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-white/5"
                    >
                      <MessageCircle fill="currentColor" className="w-5 h-5" /> Consultar por WhatsApp
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
