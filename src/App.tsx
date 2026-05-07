import { useState, useEffect } from 'react';
import { Monitor, Code, Star, ChevronRight, Menu, X, Award, Zap, MessageCircle, Instagram, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import brandLogo from './assets/brand-logo.png';
import profilePhoto from './assets/yojuajau.jpg';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState<null | typeof services[0]>(null);
  const [showProcessPage, setShowProcessPage] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const syncDeviceMode = () => setIsMobileDevice(mediaQuery.matches);

    syncDeviceMode();
    mediaQuery.addEventListener('change', syncDeviceMode);

    return () => mediaQuery.removeEventListener('change', syncDeviceMode);
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
    { label: "Entrega estimada", value: "3 - 13 días" }
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
    <div
      data-device={isMobileDevice ? 'mobile' : 'desktop'}
      className="site-shell min-h-screen bg-black text-zinc-100 font-sans selection:bg-white selection:text-black"
    >
      <AnimatePresence mode="wait">
        {!selectedService && !showProcessPage ? (
          <motion.div
            key="main-web"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Navegación */}
            <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/85 backdrop-blur-md border-b border-zinc-700/40 py-3 md:py-4' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-2 md:gap-3"
          >
            <img
              src={brandLogo}
              alt="Logo de Web Testing"
              className="logo-glow h-9 w-9 md:h-11 md:w-11 rounded-full object-cover"
            />
            <span className="metal-text text-lg md:text-xl font-bold tracking-tighter uppercase font-display">Web Testing</span>
          </motion.div>
          
          <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
            {['Inicio', 'PORQUÉ ELEGIRNOS', 'Sobre mí'].map((item, i) => (
              <motion.a 
                key={item} 
                href={item === 'PORQUÉ ELEGIRNOS' ? '#experiencia' : item === 'Sobre mí' ? '#quien-soy' : `#${item.toLowerCase()}`}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i }}
                className="text-zinc-400 hover:text-zinc-100 transition-colors"
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
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 text-2xl font-bold uppercase tracking-tighter">
              {['Inicio', 'PORQUÉ ELEGIRNOS', 'Sobre mí'].map((item) => (
                <a 
                  key={item} 
                  href={item === 'PORQUÉ ELEGIRNOS' ? '#experiencia' : item === 'Sobre mí' ? '#quien-soy' : `#${item.toLowerCase()}`} 
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-zinc-200 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="inicio" className={`hero-light relative flex items-center justify-center overflow-hidden border-b border-zinc-800/70 ${isMobileDevice ? 'min-h-screen' : 'h-screen'}`}>
        <div className="absolute inset-0 z-0 opacity-50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(232,236,241,0.22),transparent_28%),radial-gradient(circle_at_20%_80%,rgba(147,151,159,0.15),transparent_24%),linear-gradient(180deg,#070707_0%,#111214_58%,#050505_100%)]"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-15"></div>
        </div>
        
        <div className={`relative z-10 text-center max-w-5xl ${isMobileDevice ? 'px-4 pt-24 pb-16' : 'px-6 pt-28 pb-10'}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={brandLogo}
              alt="Logo de Web Testing"
              className={`logo-glow mx-auto rounded-full object-cover ${isMobileDevice ? 'mb-6 h-20 w-20' : 'mb-8 h-28 w-28'}`}
            />
            <span className="inline-block max-w-[92vw] px-3 py-1.5 md:px-4 md:py-1 border border-zinc-700/70 text-[9px] md:text-[10px] tracking-[0.32em] md:tracking-[0.4em] uppercase mb-6 md:mb-8 rounded-full bg-zinc-200/6 backdrop-blur-sm text-zinc-300 font-medium leading-relaxed">
              Diseño web premium para marcas que quieren vender más
            </span>
            <h1 className={`title-glow headline-metal font-black font-display uppercase ${isMobileDevice ? 'text-5xl leading-[0.92] tracking-[-0.04em] mb-6' : 'text-[120px] leading-[0.9] tracking-tighter mb-8'}`}>
              DISEÑO QUE <br/>
              <span className="headline-metal">
                TRASCIENDE
              </span>
            </h1>
            <p className={`text-zinc-300 max-w-2xl mx-auto leading-relaxed font-light ${isMobileDevice ? 'text-base mb-8' : 'text-xl mb-12'}`}>
              Diseñamos experiencias digitales rápidas, elegantes y pensadas para convertir visitas en consultas reales.
            </p>
            <div className={`flex justify-center ${isMobileDevice ? 'flex-col gap-3 items-stretch' : 'flex-row gap-4 items-center'}`}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                className={`btn-sweep border border-zinc-600 text-white rounded-full font-bold uppercase flex items-center justify-center ${isMobileDevice ? 'w-full px-6 py-4 tracking-[0.2em] text-[11px]' : 'w-[260px] px-10 py-5 tracking-widest text-xs'}`}
              >
                Nuestros Servicios
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('presupuesto')?.scrollIntoView({ behavior: 'smooth' })}
                className={`btn-sweep border border-zinc-600 rounded-full font-bold uppercase flex items-center justify-center ${isMobileDevice ? 'w-full px-6 py-4 tracking-[0.2em] text-[11px]' : 'w-[260px] px-10 py-5 tracking-widest text-xs'}`}
              >
                Presupuesto
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('quien-soy')?.scrollIntoView({ behavior: 'smooth' })}
                className={`btn-sweep border border-zinc-600 rounded-full font-bold uppercase flex items-center justify-center gap-2 ${isMobileDevice ? 'w-full px-6 py-4 tracking-[0.2em] text-[11px]' : 'w-[260px] px-10 py-5 tracking-widest text-xs'}`}
              >
                Quiénes están detrás <ChevronRight className="w-3 h-3" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowProcessPage(true)}
                className={`btn-sweep border border-zinc-600 rounded-full font-bold uppercase flex items-center justify-center gap-2 ${isMobileDevice ? 'w-full px-6 py-4 tracking-[0.2em] text-[11px]' : 'w-[260px] px-10 py-5 tracking-widest text-xs'}`}
              >
                Cómo trabajamos <ChevronRight className="w-3 h-3" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-600 hidden md:block"
        >
          <div className="w-px h-12 bg-gradient-to-b from-zinc-700 to-transparent"></div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className={`bg-black relative z-10 border-b border-zinc-800/60 ${isMobileDevice ? 'py-16' : 'py-24'}`}>
        <div className={`max-w-7xl mx-auto ${isMobileDevice ? 'px-4' : 'px-6'}`}>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-center gap-12 text-center"
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={itemVariants} className="space-y-2">
                <p className="metal-text text-5xl md:text-6xl font-black tracking-tighter font-display">{stat.value}</p>
                <p className="text-zinc-500 uppercase text-[10px] tracking-[0.3em] font-bold">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className={`bg-zinc-950/90 ${isMobileDevice ? 'py-20' : 'py-32'}`}>
        <div className={`max-w-7xl mx-auto ${isMobileDevice ? 'px-4' : 'px-6'}`}>
          <div className={`flex gap-6 ${isMobileDevice ? 'flex-col items-start mb-12' : 'flex-col md:flex-row justify-between items-end mb-20'}`}>
            <div className="max-w-xl">
              <span className="eyebrow-metal uppercase text-[10px] tracking-[0.3em] font-bold mb-4 block">Expertise</span>
              <h2 className={`title-glow headline-metal slant-metal font-black mb-4 uppercase tracking-tighter font-display ${isMobileDevice ? 'text-4xl' : 'text-5xl'}`}>Nuestros Servicios</h2>
              <p className="copy-muted leading-relaxed">Soluciones integrales para negocios que necesitan una presencia online seria, veloz y lista para cerrar ventas.</p>
            </div>
            <div className="h-px flex-1 bg-zinc-800 mb-6 hidden md:block"></div>
          </div>

          <div className={`grid ${isMobileDevice ? 'gap-5' : 'md:grid-cols-3 gap-8'}`}>
            {services.map((s, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`silver-panel group border border-zinc-800 hover:border-zinc-500 transition-all duration-500 hover:bg-zinc-900/80 relative overflow-hidden ${isMobileDevice ? 'p-6 rounded-[1.8rem]' : 'p-10 rounded-3xl'}`}
              >
                <div className="absolute top-0 right-0 p-8 text-zinc-800 font-display font-black text-6xl group-hover:text-zinc-600 transition-colors">
                  0{i + 1}
                </div>
                <div className="mb-10 text-zinc-400 group-hover:text-zinc-100 transition-colors relative z-10">
                  {s.icon}
                </div>
                <h3 className={`font-bold mb-4 uppercase tracking-tight relative z-10 ${isMobileDevice ? 'text-xl' : 'text-2xl'}`}>{s.title}</h3>
                <p className="copy-muted group-hover:text-zinc-200 leading-relaxed font-light relative z-10">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex justify-center ${isMobileDevice ? 'mt-12' : 'mt-20'}`}
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedService({ title: "Nuestros Servicios", desc: "Información detallada sobre todos nuestros planes y soluciones digitales.", icon: null })}
                className={`btn-sweep border border-zinc-600 text-white rounded-full font-black uppercase flex items-center justify-center gap-4 transition-all ${isMobileDevice ? 'w-full px-8 py-5 tracking-[0.24em] text-[10px]' : 'px-16 py-6 tracking-[0.3em] text-[10px]'}`}
            >
              Saber más <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Experiencia / Trust */}
      <section id="experiencia" className="py-20 md:py-32 bg-black overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10 md:space-y-16"
          >
              <h2 className="title-glow headline-metal slant-metal text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none font-display">
              Por qué elegirnos <br />
              <span className="headline-metal">
                excelencia digital
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-5 md:gap-6">
              {[
                { title: "Rapidez Extrema", icon: <Zap />, desc: "Entregamos entre 3 - 13 días, sin comprometer la calidad." },
                { title: "Precio competitivo", icon: <Award />, desc: "Valores claros según el alcance del proyecto, con foco en calidad y resultado." },
                { title: "Flexibilidad Total", icon: <Star />, desc: "Pide cambios a tu web cuando quieras. Tu visión evoluciona y nosotros contigo." }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -10 }}
                  className="silver-panel flex flex-col items-center gap-4 p-6 md:p-8 rounded-[1.8rem] md:rounded-3xl transition-colors border border-zinc-800"
                >
                  <div className="text-zinc-100 p-4 bg-gradient-to-b from-zinc-200/10 to-zinc-500/5 rounded-full border border-zinc-600/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl uppercase tracking-tighter mb-2">{item.title}</h4>
                    <p className="copy-muted text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Presupuesto / Precios Section */}
      <section id="presupuesto" className="py-20 md:py-32 bg-zinc-950 border-t border-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="eyebrow-metal uppercase text-[10px] tracking-[0.4em] font-bold block">Inversión Transparente</span>
            <h2 className="title-glow headline-metal slant-metal text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none font-display">
              LISTA DE <span className="headline-metal text-6xl md:text-8xl">PRECIOS</span>
            </h2>
            <p className="copy-muted max-w-2xl mx-auto font-light">
              Sin sorpresas ni costos ocultos. Valores pensados para emprendimientos, marcas personales y negocios que quieren crecer.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {[
              { 
                title: "Desarrollo Web", 
                price: "35 USD - 50 USD", 
                features: ["Diseño de alto impacto", "Adaptable a móviles", "Entrega ultra rápida"] 
              },
              { 
                title: "Mantenimiento", 
                price: "44 USD", 
                period: "/ mes",
                features: ["Incluye Dominio .com", "5 Modificaciones mensuales", "Soporte prioritario", "Primer mes 100% BONIFICADO*"] 
              },
              { 
                title: "Modificación Grande", 
                price: "55 USD - 497 USD", 
                features: ["Rediseño de secciones", "Nuevas funcionalidades", "Escalabilidad", "Presupuesto exacto previo"] 
              },
              { 
                title: "Dominio .app", 
                price: "10 USD", 
                features: ["Un año de suscripción", "Ideal para webapps", "Configuración DNS", "Privacidad incluida"] 
              },
              { 
                title: "Google Maps", 
                price: "30 USD", 
                features: ["Seguimiento local exclusivo", "Optimización de perfil", "Aumento de visibilidad", "Configuración completa"] 
              }
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              className="silver-panel border border-zinc-800 p-6 md:p-10 rounded-[1.8rem] md:rounded-[2.5rem] flex flex-col justify-between group hover:border-zinc-500 transition-colors"
              >
                <div className="space-y-6 md:space-y-8">
                  <h3 className="text-zinc-400 uppercase text-[10px] tracking-[0.3em] font-bold">{plan.title}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="headline-metal slant-metal text-[2.6rem] sm:text-5xl font-black font-display tracking-tighter leading-none">{plan.price}</span>
                    {plan.period && <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">{plan.period}</span>}
                  </div>
                  <ul className="space-y-4 pt-4 border-t border-zinc-800">
                    {plan.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-zinc-300/80 group-hover:text-zinc-200 transition-colors font-light italic">
                        <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full group-hover:bg-zinc-100 transition-colors" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
            
            {/* Promo Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="silver-panel border-2 border-dashed border-zinc-700 p-6 md:p-10 rounded-[1.8rem] md:rounded-[2.5rem] flex flex-col justify-center text-center space-y-6"
            >
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Gift className="text-white" size={32} />
              </div>
              <h3 className="title-glow headline-metal slant-metal text-2xl font-black uppercase tracking-tighter font-display">BONO DE BIENVENIDA</h3>
              <p className="copy-muted text-sm font-light leading-relaxed italic">
                *El primer mes las modificaciones y el mantenimiento <span className="text-white font-medium">NO TIENEN COSTO</span>. Solo abonas el dominio.
              </p>
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
                (Las modificaciones pequeñas nunca cuentan como cupo mensual)
              </p>
            </motion.div>
          </div>

          <div className="mt-12 md:mt-20 flex flex-col items-center gap-6 md:gap-8 text-center pt-12 md:pt-20 border-t border-gray-900/50">
            <p className="text-zinc-300 text-xl font-light italic max-w-3xl leading-relaxed">
              ¿Tenés un proyecto más grande o dudas sobre los planes? Consultanos por WhatsApp y armamos algo a tu medida en minutos.
            </p>
            <motion.a 
              href="https://wa.me/5491130750355"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-4 bg-zinc-200 text-black px-8 md:px-12 py-5 md:py-6 rounded-full font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-zinc-200/10 hover:bg-white transition-colors"
            >
              <MessageCircle fill="currentColor" className="w-5 h-5 text-black" /> Hablar con Lorenzo
            </motion.a>
          </div>
        </div>
      </section>

      {/* Quien soy Section */}
      <section id="quien-soy" className="py-20 md:py-32 bg-black border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-[280px] md:max-w-none md:w-1/3 aspect-square bg-zinc-950 rounded-full border border-zinc-700 overflow-hidden group shadow-2xl shadow-zinc-900/40"
          >
            <img
              src={profilePhoto}
              alt="Lorenzo, fundador de Web Testing"
              className="h-full w-full object-cover object-[center_28%] transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-6"
          >
            <span className="eyebrow-metal uppercase text-[10px] tracking-[0.3em] font-bold block">El fundador</span>
            <h2 className="title-glow headline-metal slant-metal text-4xl md:text-5xl font-black uppercase tracking-tighter font-display">Soy Lorenzo</h2>
            <p className="text-zinc-300 text-lg leading-relaxed font-light max-w-2xl">
              Un joven emprendedor de <span className="text-white font-medium">15 años</span> con una visión clara: crear páginas que se vean premium y ayuden a vender de verdad. Mi objetivo es demostrar que la edad no limita la innovación ni la excelencia digital.
            </p>
            <p className="copy-muted leading-relaxed font-light max-w-2xl">
              En Web Testing combino creatividad, velocidad y atención al detalle para entregar sitios que no solo se ven bien, sino que también transmiten confianza y convierten mejor.
            </p>
            <div className="pt-6">
              <div className="inline-block p-1 rounded-full bg-gradient-to-r from-zinc-700 to-transparent">
                <div className="bg-black px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-300">
                  Fundador de Web Testing
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14 md:py-20 border-t border-gray-900 bg-black">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
          <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
            <img
              src={brandLogo}
              alt="Logo de Web Testing"
              className="logo-glow h-10 w-10 rounded-full object-cover"
            />
            <span className="metal-text text-xl font-bold tracking-tighter uppercase font-display">Web Testing</span>
          </div>
          <p className="text-zinc-500 text-[10px] tracking-[0.35em] uppercase font-bold text-center">
            © 2026 WEB TESTING — PÁGINA 100% HECHA CON WEB TESTING Y NUESTROS SERVICIOS
          </p>
          <div className="flex gap-6 md:gap-10 items-center">
            <motion.a 
              href="https://www.instagram.com/lolo.lasnier/" 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ y: -2, color: "#fff" }}
              className="text-zinc-400 transition-colors text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2"
            >
              <Instagram size={14} />
              Instagram
            </motion.a>
            <motion.a 
              href="https://wa.me/5491130750355" 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ y: -2, color: "#fff" }}
              className="text-zinc-400 transition-colors text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2"
            >
              <MessageCircle size={14} fill="currentColor" />
              WhatsApp
            </motion.a>
          </div>
        </div>
      </footer>
    </motion.div>
  ) : showProcessPage ? (
          <motion.div
            key="process-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen bg-black px-4 py-12 md:px-10 md:py-16"
          >
            <div className="mx-auto max-w-6xl">
              <button
                onClick={() => setShowProcessPage(false)}
                className="mb-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" /> Volver al inicio
              </button>

              <div className="mb-12 md:mb-16 max-w-4xl space-y-4 md:space-y-6">
                <span className="block text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">
                  Método Web Testing
                </span>
                <h2 className="title-glow headline-metal slant-metal text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none font-display">
                  Cómo trabajamos
                </h2>
                <p className="max-w-2xl text-lg leading-relaxed text-zinc-300 font-light">
                  Un proceso simple, rápido y pensado para que tengas claridad desde el primer mensaje hasta la entrega final.
                </p>
              </div>

              <div className="grid gap-5 md:gap-8 md:grid-cols-2">
                {[
                  {
                    step: "01",
                    title: "Primera charla",
                    desc: "Nos escribís por WhatsApp, me contás tu negocio y vemos qué tipo de web necesitás para vender mejor."
                  },
                  {
                    step: "02",
                    title: "Dirección visual",
                    desc: "Definimos estilo, referencias, estructura y objetivos para que el diseño tenga una identidad clara."
                  },
                  {
                    step: "03",
                    title: "Diseño y desarrollo",
                    desc: "Construyo la página con foco en velocidad, estética premium y una experiencia cómoda en celular y desktop."
                  },
                  {
                    step: "04",
                    title: "Revisión y ajustes",
                    desc: "Te muestro la propuesta, revisamos detalles y aplicamos cambios para que quede alineada a tu marca."
                  },
                  {
                    step: "05",
                    title: "Entrega y publicación",
                    desc: "Dejo la web lista para salir online, con soporte inicial y posibilidad de seguir mejorándola después."
                  },
                  {
                    step: "06",
                    title: "Acompañamiento",
                    desc: "Si querés mantenimiento o nuevas secciones, seguimos trabajando sobre la base ya creada sin arrancar de cero."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="silver-panel rounded-[1.8rem] md:rounded-[2rem] border border-zinc-800 p-6 md:p-10"
                  >
                    <div className="mb-6 text-5xl font-black tracking-tighter text-zinc-600 font-display">
                      {item.step}
                    </div>
                    <h3 className="mb-4 text-2xl font-bold uppercase tracking-tight text-white">
                      {item.title}
                    </h3>
                    <p className="text-zinc-300 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="silver-panel mt-12 md:mt-16 flex flex-col items-start gap-5 rounded-[1.8rem] md:rounded-[2rem] border border-zinc-800 p-6 md:p-10 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-500">
                    ¿Listo para empezar?
                  </p>
                  <p className="text-xl leading-relaxed text-zinc-200 font-light">
                    Si ya tenés una idea, la transformamos en una web clara, rápida y pensada para convertir.
                  </p>
                </div>
                <motion.a
                  href="https://wa.me/5491130750355"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-sweep w-full sm:w-auto border border-zinc-600 px-8 md:px-10 py-4 md:py-5 rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                >
                  Empezar proyecto <MessageCircle className="w-4 h-4" fill="currentColor" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="service-detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen flex items-center justify-center bg-black p-4 md:p-6"
          >
            <div className="max-w-3xl w-full">
              <button 
                onClick={() => setSelectedService(null)}
                className="mb-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" /> Volver al inicio
              </button>
              
              <div className="space-y-8 md:space-y-12">
                {selectedService.icon && (
                  <div className="p-6 bg-zinc-100/6 w-fit rounded-3xl text-white border border-zinc-700/40">
                    {selectedService.icon}
                  </div>
                )}
                
                <div className="space-y-4">
                  <span className="text-zinc-500 uppercase text-[0.4em] font-bold block">Información Detallada</span>
                  <h2 className="title-glow headline-metal slant-metal text-3xl sm:text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none font-display">
                    {selectedService.title}
                  </h2>
                </div>
                
                <div className="silver-panel p-6 md:p-10 border border-zinc-800 rounded-[2rem] md:rounded-[3rem] space-y-6 md:space-y-8">
                  <p className="text-zinc-300 text-lg md:text-xl leading-relaxed font-light">
                    Para obtener información técnica detallada, ejemplos de implementación y una propuesta personalizada sobre <span className="text-white font-medium">{selectedService.title}</span>, por favor contáctanos directamente.
                  </p>
                  
                  <div className="pt-8 border-t border-zinc-800">
                    <h4 className="text-xl font-bold uppercase tracking-tight mb-6 italic">¿LISTO PARA EMPEZAR?</h4>
                    <motion.a 
                      href="https://wa.me/5491130750355"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-4 btn-sweep border border-zinc-600 text-white px-8 md:px-12 py-5 md:py-6 rounded-full font-black uppercase tracking-[0.2em] text-sm"
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
