import { useState, useEffect, useMemo, useCallback } from 'react';
import { Monitor, Code, Zap, ChevronRight, Menu, X, MessageCircle, Instagram, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState<null | typeof services[0]>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [cursor, setCursor] = useState({ x: -200, y: -200 });

  const particles = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${(i * 5.7 + 3) % 100}%`,
      delay: `-${(i * 1.9) % 14}s`,
      duration: `${13 + (i * 2.3) % 11}s`,
    })), []
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleMouse = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  const handleHeroMouse = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  const handleTilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    el.style.setProperty('--rx', `${-dy * 9}deg`);
    el.style.setProperty('--ry', `${dx * 9}deg`);
  }, []);

  const resetTilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
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

  const faqs = [
    {
      q: "¿En cuánto tiempo tengo lista mi web?",
      a: "Entre 3 y 13 días según la complejidad del proyecto, sin comprometer la calidad."
    },
    {
      q: "¿Necesito saber de tecnología para contratarme?",
      a: "No. Solo contame tu idea y yo me encargo de todo el proceso técnico."
    },
    {
      q: "¿Qué pasa si quiero cambios después de la entrega?",
      a: "El plan de mantenimiento incluye 5 modificaciones mensuales. El primer mes es 100% bonificado. Las modificaciones pequeñas nunca cuentan como cupo."
    },
    {
      q: "¿Los precios son en dólares o pesos?",
      a: "En dólares americanos (USD). El desarrollo web parte desde 35 USD y el mantenimiento desde 44 USD/mes."
    },
    {
      q: "¿Puedo ver ejemplos de tu trabajo?",
      a: "Esta misma página es un ejemplo de lo que hacemos. Para más proyectos consultanos por WhatsApp o Instagram."
    },
  ];

  const navLinks = [
    { label: 'Inicio',     href: '#inicio' },
    { label: 'Servicios',  href: '#servicios' },
    { label: 'FAQ',        href: '#faq' },
    { label: 'Sobre mí',   href: '#quien-soy' },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-white selection:text-black">
      <div
        className="custom-cursor-ring"
        style={{ transform: `translate(${cursor.x - 13}px, ${cursor.y - 13}px)` }}
      />
      <div
        className="custom-cursor-dot"
        style={{ transform: `translate(${cursor.x - 2}px, ${cursor.y - 2}px)` }}
      />
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
            <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-gray-800 py-4 nav-glow' : 'bg-transparent py-6'}`}>
              <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-10 h-10 logo-box-metallic flex items-center justify-center rounded-sm glow-rgb">
                    <span className="text-black font-black text-xl italic">LS</span>
                  </div>
                  <span className="text-xl font-bold tracking-tighter uppercase font-display">Lorenzo Studio</span>
                </motion.div>

                <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
                  {navLinks.map((item, i) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * i }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
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
                    {navLinks.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="hover:text-gray-400 transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hero Section */}
            <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden border-b border-gray-900" onMouseMove={handleHeroMouse}>
              <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
              </div>
              <div className="hero-spotlight" />
              <div className="grid-lines z-[1]" />
              <div className="aurora-overlay z-[1]" />
              <div className="scan-effect z-[1]" />
              <div className="particles z-[1]">
                {particles.map(p => (
                  <div
                    key={p.id}
                    className="particle"
                    style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }}
                  />
                ))}
              </div>

              <div className="relative z-10 text-center px-6 max-w-5xl">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="hero-badge inline-block px-4 py-1 text-[10px] tracking-[0.4em] uppercase mb-8 rounded-full text-gray-400 font-medium">
                    Innovación digital sin límites
                  </span>
                  <h1 className="text-6xl md:text-[120px] font-black mb-8 leading-[0.9] tracking-tighter font-display uppercase">
                    DISEÑO QUE <br/>
                    <span className="text-chrome">
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
                      className="btn-sweep border border-gray-800 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs"
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
                      Quiénes están detrás <ChevronRight className="w-3 h-3" />
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-600"
              >
                <div className="w-px h-12 bg-gradient-to-b from-gray-800 to-transparent"></div>
              </motion.div>
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
                  <div className="flex-1 gradient-line mb-6 hidden md:block"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {services.map((s, i) => (
                    <div key={i} className="tilt-wrap" onMouseMove={handleTilt} onMouseLeave={resetTilt}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="group p-10 border border-gray-900 rounded-3xl hover:border-gray-700 transition-all duration-500 hover:bg-zinc-900/50 relative overflow-hidden card-metallic"
                    >
                      <div className="absolute top-0 right-0 p-8 text-[#111111] font-display font-black text-6xl group-hover:text-[#1e1e1e] transition-colors">
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
                    </div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex justify-center mt-20"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedService({ title: "Nuestros Servicios", desc: "Información detallada sobre todos nuestros planes y soluciones digitales.", icon: null })}
                    className="btn-sweep border border-gray-800 text-white px-16 py-6 rounded-full font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-4 transition-all"
                  >
                    Saber más <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              </div>
            </section>

            {/* Precios */}
            <section id="presupuesto" className="py-32 bg-black border-t border-gray-900 overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 text-center mb-20">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <span className="text-zinc-600 uppercase text-[10px] tracking-[0.4em] font-bold block">Inversión Transparente</span>
                  <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic font-display">
                    LISTA DE <span className="text-gray-700 text-6xl md:text-8xl">PRECIOS</span>
                  </h2>
                  <p className="text-gray-500 max-w-2xl mx-auto font-light">
                    Sin sorpresas ni costos ocultos. Tarifas adaptadas a startups y negocios que buscan impacto real.
                  </p>
                </motion.div>
              </div>

              <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Desarrollo Web",
                      price: "35$ - 50$",
                      features: ["Diseño de alto impacto", "Adaptable a móviles", "Entrega ultra rápida"]
                    },
                    {
                      title: "Mantenimiento",
                      price: "44$",
                      period: "/ mes",
                      features: ["Incluye Dominio .com", "5 Modificaciones mensuales", "Soporte prioritario", "Primer mes 100% BONIFICADO*"]
                    },
                    {
                      title: "Modificación Grande",
                      price: "55$ - 497$",
                      features: ["Rediseño de secciones", "Nuevas funcionalidades", "Escalabilidad", "Presupuesto exacto previo"]
                    },
                    {
                      title: "Dominio .app",
                      price: "10$",
                      features: ["Un año de suscripción", "Ideal para webapps", "Configuración DNS", "Privacidad incluida"]
                    },
                    {
                      title: "Google Maps",
                      price: "30$",
                      features: ["Seguimiento local exclusivo", "Optimización de perfil", "Aumento de visibilidad", "Configuración completa"]
                    }
                  ].map((plan, i) => (
                    <div key={i} className="tilt-wrap" onMouseMove={handleTilt} onMouseLeave={resetTilt}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      whileHover={{ y: -5 }}
                      className={`bg-zinc-950 border border-gray-900 p-10 rounded-[2.5rem] flex flex-col justify-between group hover:border-gray-700 transition-colors card-metallic${i === 1 ? ' price-card-glow' : ''}`}
                    >
                      <div className="space-y-8">
                        <h3 className="text-zinc-500 uppercase text-[10px] tracking-[0.3em] font-bold">{plan.title}</h3>
                        <div className="flex items-baseline gap-1">
                          <span className="text-5xl font-black italic font-display tracking-tighter text-white">{plan.price}</span>
                          {plan.period && <span className="text-zinc-600 font-bold uppercase text-[10px] tracking-widest">{plan.period}</span>}
                        </div>
                        <ul className="space-y-4 pt-4 border-t border-gray-900">
                          {plan.features.map((f, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-sm text-gray-500 group-hover:text-gray-400 transition-colors font-light italic">
                              <div className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full group-hover:bg-white transition-colors" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                    </div>
                  ))}

                  {/* Promo Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-zinc-900/50 border-2 border-dashed border-gray-800 p-10 rounded-[2.5rem] flex flex-col justify-center text-center space-y-6"
                  >
                    <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto glow-rgb">
                      <Gift className="text-white" size={32} />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter italic font-display text-white">BONO DE BIENVENIDA</h3>
                    <p className="text-gray-500 text-sm font-light leading-relaxed italic">
                      *El primer mes las modificaciones y el mantenimiento <span className="text-white font-medium">NO TIENEN COSTO</span>. Solo abonas el dominio.
                    </p>
                    <p className="text-xs text-zinc-600 font-bold uppercase tracking-widest leading-relaxed">
                      (Las modificaciones pequeñas nunca cuentan como cupo mensual)
                    </p>
                  </motion.div>
                </div>

                <div className="mt-20 flex flex-col items-center gap-8 text-center pt-20 border-t border-gray-900/50">
                  <p className="text-gray-400 text-xl font-light italic max-w-3xl leading-relaxed">
                    ¿Tenés un proyecto más grande o dudas sobre los planes? Consultanos por WhatsApp y armamos algo a tu medida en minutos.
                  </p>
                  <motion.a
                    href="https://wa.me/5491130750355"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-4 bg-white text-black px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-white/10 hover:bg-gray-100 transition-colors"
                  >
                    <MessageCircle fill="currentColor" className="w-5 h-5 text-black" /> Hablar con Lorenzo
                  </motion.a>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="py-32 bg-zinc-950 border-t border-gray-900">
              <div className="max-w-3xl mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="mb-16 space-y-4"
                >
                  <span className="text-gray-600 uppercase text-[10px] tracking-[0.3em] font-bold block">Preguntas Frecuentes</span>
                  <h2 className="text-5xl font-black uppercase tracking-tighter italic font-display">FAQ</h2>
                </motion.div>

                <div className="space-y-3">
                  {faqs.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-6 border border-gray-900 rounded-2xl text-left hover:border-gray-700 transition-colors group"
                      >
                        <span className="font-bold text-sm uppercase tracking-tight group-hover:text-white transition-colors">{item.q}</span>
                        <ChevronRight className={`w-4 h-4 text-gray-600 transition-transform duration-300 flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-90' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 py-5 text-gray-500 text-sm leading-relaxed font-light border border-t-0 border-gray-900 rounded-b-2xl -mt-2">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Quien soy */}
            <section id="quien-soy" className="py-32 bg-black border-t border-gray-900">
              <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="w-full md:w-1/3 aspect-square rounded-full border border-gray-800 overflow-hidden"
                >
                  <img src="/yo.png" alt="Lorenzo" className="w-full h-full object-cover object-top" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
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
                    En Lorenzo Studio, fusiono creatividad audaz con rapidez extrema para entregar sitios que no solo se ven bien, sino que impulsan negocios reales al siguiente nivel. Estoy aquí para construir el futuro de la web, un proyecto a la vez.
                  </p>
                  <div className="pt-6">
                    <div className="inline-block p-1 rounded-full bg-gradient-to-r from-gray-800 to-transparent">
                      <div className="bg-black px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                        Fundador de Lorenzo Studio
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-gray-900 bg-black">
              <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
                <div className="flex items-center gap-3 grayscale opacity-30 hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
                    <span className="text-black font-black text-sm italic">LS</span>
                  </div>
                  <span className="text-xl font-bold tracking-tighter uppercase font-display">Lorenzo Studio</span>
                </div>
                <p className="text-gray-700 text-[10px] tracking-[0.35em] uppercase font-bold text-center">
                  © 2026 LORENZO STUDIO — DISEÑADO Y DESARROLLADO POR LORENZO
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
                      className="inline-flex items-center gap-4 btn-sweep border border-gray-800 text-white px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] text-sm"
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
