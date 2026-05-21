import { useState, useEffect, useRef } from 'react';
import { Monitor, Code, Zap, MessageCircle, Instagram, Menu, X, Star, Award, Shield, ChevronRight, MapPin, Clock, Check } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

const WHATSAPP = "https://wa.me/5491130750355";
const INSTAGRAM = "https://www.instagram.com/lolo.lasnier/";

const services = [
  {
    title: "Diseño Web",
    tag: "01",
    desc: "Interfaces exclusivas que capturan la esencia de tu marca. Diseño moderno, animado y adaptado a cualquier dispositivo.",
    icon: <Monitor className="w-6 h-6" />,
  },
  {
    title: "Desarrollo a Medida",
    tag: "02",
    desc: "Código limpio y escalable con las últimas tecnologías. React, Tailwind, animaciones, formularios y más.",
    icon: <Code className="w-6 h-6" />,
  },
  {
    title: "SEO & Velocidad",
    tag: "03",
    desc: "Tu sitio optimizado para aparecer en Google y cargar rápido. Más visitas, más ventas.",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    title: "Google Maps",
    tag: "04",
    desc: "Ponemos tu negocio en el mapa. Optimización de perfil, visibilidad local y más clientes cerca tuyo.",
    icon: <MapPin className="w-6 h-6" />,
  },
];

const plans = [
  {
    title: "Página Web",
    price: "35",
    suffix: "USD",
    period: "pago único",
    highlight: false,
    features: [
      "Diseño profesional personalizado",
      "Adaptada a celular y tablet",
      "Entrega en 3 a 13 días",
      "Código limpio y moderno",
    ],
  },
  {
    title: "Mantenimiento",
    price: "44",
    suffix: "USD",
    period: "/ mes",
    highlight: true,
    badge: "MÁS POPULAR",
    features: [
      "Dominio .com incluido",
      "5 modificaciones por mes",
      "Soporte prioritario",
      "Primer mes 100% bonificado",
      "Modificaciones pequeñas sin límite",
    ],
  },
  {
    title: "Rediseño / Funciones",
    price: "55",
    suffix: "USD",
    period: "desde",
    highlight: false,
    features: [
      "Rediseño de secciones",
      "Nuevas funcionalidades",
      "Presupuesto exacto previo",
      "Escalabilidad garantizada",
    ],
  },
];

const portfolio = [
  {
    title: "Estudio de Pilates",
    type: "Landing Page",
    tags: ["Reservas online", "SEO local", "Mobile-first"],
    color: "from-zinc-900 to-stone-900",
    accent: "#e8d5b7",
  },
  {
    title: "Restaurante Gourmet",
    type: "Web Completa",
    tags: ["Menú digital", "Reservas", "Google Maps"],
    color: "from-zinc-900 to-neutral-900",
    accent: "#c9a96e",
  },
  {
    title: "Consultora Legal",
    type: "Sitio Corporativo",
    tags: ["Formulario de contacto", "Blog", "SEO"],
    color: "from-zinc-900 to-slate-900",
    accent: "#94a3b8",
  },
];

const faqs = [
  {
    q: "¿En cuánto tiempo tengo lista mi web?",
    a: "Entre 3 y 13 días hábiles dependiendo de la complejidad. Siempre te aviso el plazo exacto antes de empezar.",
  },
  {
    q: "¿Necesito saber de tecnología para contratarte?",
    a: "Para nada. Yo me encargo de todo. Vos solo me contás qué querés y yo lo construyo.",
  },
  {
    q: "¿Qué pasa si quiero cambios después de la entrega?",
    a: "El primer mes las modificaciones son 100% gratis. Después con el plan de mantenimiento tenés 5 modificaciones al mes.",
  },
  {
    q: "¿Los precios son en dólares o pesos?",
    a: "Los precios están en dólares pero podemos coordinar el pago en pesos al tipo de cambio del día.",
  },
  {
    q: "¿Puedo ver ejemplos de tu trabajo?",
    a: "¡Sí! Contactame por WhatsApp y te muestro proyectos reales en detalle.",
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const { scrollYProgress: pricingScroll } = useScroll({ target: pricingRef, offset: ["start 85%", "start 15%"] });
  const phoneX = useTransform(pricingScroll, [0, 1], ["-220px", "0px"]);
  const phoneOpacity = useTransform(pricingScroll, [0, 0.45], [0, 1]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-gray-100 font-sans selection:bg-white selection:text-black overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#080808]/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.button
            onClick={() => scrollTo('inicio')}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-2.5"
          >
            <div className="w-9 h-9 bg-white flex items-center justify-center rounded-[6px]">
              <span className="text-black font-black text-base italic tracking-tighter">L</span>
            </div>
            <span className="text-base font-bold tracking-tight">Lorenzo Studio</span>
          </motion.button>

          <div className="hidden md:flex items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.18em]">
            {[['Servicios', 'servicios'], ['Proyectos', 'portfolio'], ['Precios', 'precios'], ['Sobre mí', 'quien-soy']].map(([label, id], i) => (
              <motion.button
                key={id}
                onClick={() => scrollTo(id)}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 * i }}
                className="text-gray-500 hover:text-white transition-colors"
              >
                {label}
              </motion.button>
            ))}
            <motion.a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white text-black px-5 py-2.5 rounded-full font-bold hover:bg-gray-200 transition-colors"
            >
              Contactar
            </motion.a>
          </div>

          <button className="md:hidden text-white p-1" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-[#080808] flex flex-col justify-center px-8"
          >
            <div className="flex flex-col gap-6">
              {[['Servicios', 'servicios'], ['Proyectos', 'portfolio'], ['Precios', 'precios'], ['Sobre mí', 'quien-soy']].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-4xl font-black uppercase tracking-tighter text-left hover:text-gray-400 transition-colors"
                >
                  {label}
                </button>
              ))}
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-white text-black px-8 py-4 rounded-full font-bold text-center uppercase tracking-widest text-sm"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section id="inicio" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.06),transparent)]" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-6xl mx-auto pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-[11px] tracking-[0.3em] uppercase text-gray-400 mb-10 bg-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Disponible para nuevos proyectos
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[clamp(3rem,12vw,9rem)] font-black leading-[0.88] tracking-tighter font-display uppercase mb-8"
          >
            Páginas web
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-600">
              que venden
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-12"
          >
            Diseño y desarrollo sitios web modernos para negocios y emprendedores.
            Entrega rápida, precios accesibles y resultados reales.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs inline-flex items-center gap-3 justify-center hover:bg-gray-100 transition-colors"
            >
              <MessageCircle size={16} fill="currentColor" />
              Pedir presupuesto
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('portfolio')}
              className="border border-white/15 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs inline-flex items-center gap-2 justify-center hover:border-white/30 hover:bg-white/5 transition-all"
            >
              Ver proyectos <ChevronRight size={14} />
            </motion.button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-[11px] text-gray-600 font-medium uppercase tracking-[0.15em]"
          >
            <span className="flex items-center gap-2"><Clock size={12} /> Entrega en 3–13 días</span>
            <span className="w-px h-4 bg-gray-800" />
            <span className="flex items-center gap-2"><Shield size={12} /> Primer mes bonificado</span>
            <span className="w-px h-4 bg-gray-800" />
            <span className="flex items-center gap-2"><Star size={12} /> Desde 35 USD</span>
          </motion.div>
        </motion.div>

        {/* Scroll line */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-14 bg-gradient-to-b from-white/20 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-32 bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-gray-600 uppercase text-[10px] tracking-[0.35em] font-bold block mb-4">Lo que hago</span>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter font-display">Servicios</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group p-8 border border-white/5 rounded-2xl hover:border-white/15 hover:bg-white/[0.03] transition-all duration-500 relative overflow-hidden"
              >
                <span className="absolute top-6 right-6 text-[10px] font-black text-white/10 font-display">{s.tag}</span>
                <div className="mb-6 text-gray-600 group-hover:text-white transition-colors duration-300">
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 uppercase tracking-tight">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light group-hover:text-gray-400 transition-colors">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-32 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="text-gray-600 uppercase text-[10px] tracking-[0.35em] font-bold block mb-4">Trabajos recientes</span>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter font-display">Proyectos</h2>
            </div>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors flex items-center gap-2"
            >
              Ver más en WhatsApp <ChevronRight size={12} />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {portfolio.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group relative rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-br ${p.color} aspect-[4/3] flex flex-col justify-between p-8 hover:border-white/15 transition-all duration-500 cursor-pointer`}
              >
                {/* Decorative accent */}
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 blur-3xl" style={{ background: p.accent }} />
                
                <div className="flex gap-2 flex-wrap">
                  {p.tags.map((tag, j) => (
                    <span key={j} className="text-[10px] px-3 py-1 rounded-full border border-white/10 text-gray-400 backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-bold mb-2 block" style={{ color: p.accent }}>{p.type}</span>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">{p.title}</h3>
                </div>

                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest"
                  >
                    Ver detalle
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 text-sm mt-10"
          >
            ¿Querés ver más ejemplos? <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4">Escribime por WhatsApp</a>
          </motion.p>
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" ref={pricingRef} className="py-32 bg-[#080808] border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gray-600 uppercase text-[10px] tracking-[0.35em] font-bold block mb-4">Transparencia total</span>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter font-display mb-4">Precios</h2>
            <p className="text-gray-500 max-w-xl mx-auto font-light">Sin sorpresas ni costos ocultos. Precios pensados para emprendedores y negocios reales.</p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">

            {/* Phone mockup — slides in left → right on scroll */}
            <motion.div
              style={{ x: phoneX, opacity: phoneOpacity }}
              className="flex-shrink-0 hidden lg:block relative"
            >
              {/* Phone frame */}
              <div className="relative w-[285px] h-[580px] rounded-[3rem] border-[7px] border-white/10 bg-[#080808] shadow-[0_0_80px_rgba(255,255,255,0.04),inset_0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden">
                {/* Dynamic island */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-[72px] h-[22px] bg-black rounded-full z-10" />
                {/* Screen content */}
                <div className="h-full flex flex-col overflow-hidden pt-10 bg-[#080808]">
                  {/* Mini nav */}
                  <div className="flex justify-between items-center px-5 py-3">
                    <div className="w-8 h-8 bg-white rounded-[6px] flex items-center justify-center">
                      <span className="text-black text-[11px] font-black italic">L</span>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-14 h-1.5 bg-white/10 rounded-full" />
                      <div className="w-8 h-1.5 bg-white/10 rounded-full" />
                    </div>
                  </div>
                  {/* Mini hero */}
                  <div className="px-5 pt-3 pb-4">
                    <div className="text-[11px] text-gray-500 uppercase tracking-widest font-bold mb-2">Disponible ahora</div>
                    <div className="text-white text-[22px] font-black uppercase leading-[1] tracking-tighter">Páginas<br/>web que<br/><span className="text-gray-400">venden</span></div>
                  </div>
                  {/* Highlighted plan card */}
                  <div className="mx-4 bg-white rounded-2xl p-4 shadow-xl flex flex-col gap-2.5">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mb-0.5">Mantenimiento</div>
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-[10px] font-bold text-gray-400">USD</span>
                          <span className="text-[2.4rem] font-black text-black tracking-tighter leading-none">44</span>
                        </div>
                        <div className="text-[9px] text-gray-400">/ mes</div>
                      </div>
                      <div className="bg-black text-white text-[7px] px-2.5 py-1 rounded-full font-black uppercase tracking-wide mt-1">Popular</div>
                    </div>
                    <div className="border-t border-gray-100 pt-2.5 flex flex-col gap-1.5">
                      {["Dominio .com incluido", "5 modificaciones/mes", "Soporte prioritario", "Primer mes gratis"].map(f => (
                        <div key={f} className="flex items-center gap-1.5">
                          <div className="w-3.5 h-3.5 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                            <Check size={7} className="text-white" />
                          </div>
                          <span className="text-[9px] text-gray-600 font-medium">{f}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-black text-white text-center text-[9px] font-black py-2.5 rounded-full uppercase tracking-widest mt-1">
                      Empezar ahora
                    </div>
                  </div>
                </div>
                {/* Home bar */}
                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-24 h-[4px] bg-white/20 rounded-full" />
              </div>
              {/* Glow underneath */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-12 bg-white/5 blur-2xl rounded-full pointer-events-none" />
            </motion.div>

            {/* Pricing cards */}
            <div className="flex-1 w-full flex flex-col gap-4">
              {plans.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative rounded-2xl p-7 flex flex-col sm:flex-row sm:items-center gap-6 transition-all duration-300 ${
                    plan.highlight
                      ? 'bg-white text-black'
                      : 'bg-white/[0.03] border border-white/5 hover:border-white/15'
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-3 left-6 bg-black text-white text-[9px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border border-white/10">
                      {plan.badge}
                    </span>
                  )}

                  {/* Price block */}
                  <div className="flex-shrink-0 sm:w-36">
                    <p className={`text-[10px] uppercase tracking-[0.3em] font-bold mb-2 ${plan.highlight ? 'text-gray-500' : 'text-gray-600'}`}>
                      {plan.title}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-bold opacity-60">USD</span>
                      <span className="text-5xl font-black tracking-tighter font-display">{plan.price}</span>
                    </div>
                    <p className={`text-xs mt-1 ${plan.highlight ? 'text-gray-500' : 'text-gray-600'}`}>{plan.period}</p>
                  </div>

                  {/* Divider */}
                  <div className={`hidden sm:block w-px self-stretch ${plan.highlight ? 'bg-black/10' : 'bg-white/5'}`} />

                  {/* Features */}
                  <ul className="flex flex-wrap gap-x-6 gap-y-2 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm font-light">
                        <Check size={13} className={`flex-shrink-0 ${plan.highlight ? 'text-black' : 'text-gray-500'}`} />
                        <span className={plan.highlight ? 'text-gray-700' : 'text-gray-400'}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex-shrink-0 px-6 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs text-center transition-colors whitespace-nowrap ${
                      plan.highlight
                        ? 'bg-black text-white hover:bg-gray-900'
                        : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    Empezar ahora
                  </motion.a>
                </motion.div>
              ))}

              {/* Bono */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-dashed border-white/10 rounded-2xl p-6 text-center"
              >
                <p className="text-gray-400 text-sm font-light">
                  🎁 <span className="text-white font-semibold">Bono de bienvenida:</span> El primer mes de mantenimiento es 100% gratis. Solo abonás el dominio.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* QUIEN SOY */}
      <section id="quien-soy" className="py-32 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 overflow-hidden flex items-center justify-center">
                <div className="text-[12rem] font-black text-white/5 font-display select-none">L</div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.05),transparent_60%)]" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-white text-black px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-tight shadow-xl">
                15 años 🔥
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-gray-600 uppercase text-[10px] tracking-[0.35em] font-bold block">El fundador</span>
              <h2 className="text-5xl font-black uppercase tracking-tighter font-display leading-none">
                Hola, soy<br />Lorenzo
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed font-light">
                Tengo 15 años y empecé a programar porque quería construir cosas reales. Hoy ayudo a negocios y emprendedores a tener presencia digital profesional sin pagar precios de agencia.
              </p>
              <p className="text-gray-500 leading-relaxed font-light">
                Cada proyecto lo tomo en serio: escucho lo que necesitás, diseño algo a medida y lo entrego rápido. Sin intermediarios, sin vueltas.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {["React & Tailwind", "Animaciones", "SEO", "Google Maps", "Diseño UI"].map((skill) => (
                  <span key={skill} className="text-[11px] px-4 py-2 rounded-full border border-white/10 text-gray-400 font-medium">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                <motion.a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  className="bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-widest flex items-center gap-2"
                >
                  <MessageCircle size={15} fill="currentColor" /> WhatsApp
                </motion.a>
                <motion.a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  className="border border-white/10 text-gray-400 px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-widest flex items-center gap-2 hover:border-white/20 hover:text-white transition-all"
                >
                  <Instagram size={15} /> Instagram
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-[#080808] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gray-600 uppercase text-[10px] tracking-[0.35em] font-bold block mb-4">Preguntas frecuentes</span>
            <h2 className="text-5xl font-black uppercase tracking-tighter font-display">FAQ</h2>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="border border-white/5 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-semibold text-sm md:text-base">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronRight size={16} className="text-gray-500 flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-8 pb-6 text-gray-400 text-sm leading-relaxed font-light">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-32 bg-zinc-950 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter font-display leading-none">
              ¿Arrancamos?
            </h2>
            <p className="text-gray-400 text-lg font-light max-w-xl mx-auto">
              Contame tu proyecto por WhatsApp y en minutos tenés un presupuesto personalizado.
            </p>
            <motion.a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-white text-black px-14 py-6 rounded-full font-black uppercase tracking-[0.2em] text-sm hover:bg-gray-100 transition-colors"
            >
              <MessageCircle size={18} fill="currentColor" /> Hablar con Lorenzo
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5 opacity-40 hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 bg-white flex items-center justify-center rounded-[5px]">
              <span className="text-black font-black text-sm italic">L</span>
            </div>
            <span className="font-bold tracking-tight text-sm">Lorenzo Studio</span>
          </div>

          <p className="text-gray-700 text-[10px] tracking-[0.3em] uppercase font-bold text-center">
            © 2026 Lorenzo Studio — Diseño web desde Buenos Aires
          </p>

          <div className="flex items-center gap-6">
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1.5">
              <Instagram size={13} /> Instagram
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1.5">
              <MessageCircle size={13} fill="currentColor" /> WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

