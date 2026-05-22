import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Monitor, Code, Zap, ChevronRight, Menu, X, MessageCircle, Instagram, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PLANS = [
  {
    title: "Desarrollo Web",
    price: "35$–50$",
    features: ["Diseño de alto impacto", "Adaptable a móviles", "Entrega ultra rápida"]
  },
  {
    title: "Mantenimiento Web",
    price: "44$",
    period: "/ mes",
    features: ["Dominio .com incluido", "5 modificaciones/mes", "Soporte prioritario", "Primer mes BONIFICADO*"]
  },
  {
    title: "Mod. Grande",
    price: "55$–497$",
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
    features: ["Seguimiento local", "Optimización de perfil", "Aumento de visibilidad", "Configuración completa"]
  },
  {
    title: "Bono Bienvenida",
    price: "GRATIS",
    isPromo: true,
    features: ["Primer mes sin costo", "Solo abonas dominio", "Modificaciones sin límite", "(pequeñas no cuentan)"]
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState<null | { title: string; desc: string; icon?: React.ReactNode }>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [cursor, setCursor] = useState({ x: -200, y: -200 });
  const [activeCard, setActiveCard] = useState(0);

  const mainRef = useRef<HTMLDivElement>(null);

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

  // Auto-advance card stack
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev: number) => (prev + 1) % PLANS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // GSAP animations
  useEffect(() => {
    if (selectedService) return;

    const magneticCleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      // ── Set initial states (before first paint clears) ──────────────────
      gsap.set('.hero-symbol', { opacity: 0, scale: 0.2, y: 8 });
      gsap.set('.hero-badge', { opacity: 0, y: 12 });
      gsap.set('.hero-word-inner', { y: '115%' });
      gsap.set('.hero-subtitle, .hero-btn-wrap', { opacity: 0, y: 22 });
      gsap.set('.service-card', { opacity: 0, y: 65, rotateX: -16, transformPerspective: 900 });
      gsap.set('.services-header-content', { opacity: 0, x: -55 });
      gsap.set('.services-cta', { opacity: 0, y: 25 });
      gsap.set('.pricing-header-content', { opacity: 0, y: 45 });
      gsap.set('.price-stack-container', { opacity: 0, scale: 0.8, rotateX: 14, transformPerspective: 1200 });
      gsap.set('.pricing-nav', { opacity: 0, y: 18 });
      gsap.set('.pricing-cta', { opacity: 0, y: 35 });
      gsap.set('.faq-heading', { opacity: 0, x: -50 });
      gsap.set('.faq-item', { opacity: 0, x: -42, rotateY: -7, transformPerspective: 800 });
      gsap.set('.about-photo', { opacity: 0, scale: 0.78, rotateY: -22, transformPerspective: 1100 });
      gsap.set('.about-text-item', { opacity: 0, x: -44 });
      gsap.set('.footer-content', { opacity: 0, y: 22 });
      gsap.set('.gradient-line', { scaleX: 0, transformOrigin: 'left center' });

      // ── Hero timeline ────────────────────────────────────────────────────
      const heroTl = gsap.timeline({ delay: 0.5 });
      heroTl
        .to('.hero-symbol', { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: 'back.out(2.2)' })
        .to('.hero-badge', { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, '-=0.28')
        .to('.hero-word-inner', {
          y: '0%',
          stagger: 0.13,
          duration: 1.1,
          ease: 'power4.out',
        })
        .to('.hero-subtitle', {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.75')
        .to('.hero-btn-wrap', {
          opacity: 1, y: 0,
          stagger: 0.1,
          duration: 0.55,
          ease: 'power3.out',
        }, '-=0.55');

      // ── Hero parallax (scrub) ────────────────────────────────────────────
      gsap.to('.grid-lines', {
        y: '-22%',
        ease: 'none',
        scrollTrigger: {
          trigger: '#inicio',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      gsap.to('.hero-inner-content', {
        y: '22%',
        ease: 'none',
        scrollTrigger: {
          trigger: '#inicio',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
      // Particles depth
      gsap.to('.particles', {
        y: '-12%',
        ease: 'none',
        scrollTrigger: {
          trigger: '#inicio',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
      // 3D grid depth
      gsap.to('.hero-3d-grid', {
        y: '-40%',
        ease: 'none',
        scrollTrigger: {
          trigger: '#inicio',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.8,
        },
      });

      // ── Services ─────────────────────────────────────────────────────────
      gsap.to('.services-header-content', {
        opacity: 1, x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#servicios', start: 'top 80%', once: true },
      });
      gsap.to('.gradient-line', {
        scaleX: 1,
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '#servicios', start: 'top 75%', once: true },
      });
      gsap.to('.service-card', {
        opacity: 1, y: 0, rotateX: 0,
        stagger: 0.14,
        duration: 0.88,
        ease: 'power3.out',
        delay: 0.1,
        scrollTrigger: { trigger: '#servicios', start: 'top 72%', once: true },
      });
      gsap.to('.services-cta', {
        opacity: 1, y: 0,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.services-cta', start: 'top 90%', once: true },
      });

      // ── Pricing ───────────────────────────────────────────────────────────
      gsap.to('.pricing-header-content', {
        opacity: 1, y: 0,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#presupuesto', start: 'top 80%', once: true },
      });
      gsap.to('.price-stack-container', {
        opacity: 1, scale: 1, rotateX: 0,
        duration: 1.15,
        ease: 'back.out(1.3)',
        scrollTrigger: { trigger: '#presupuesto', start: 'top 70%', once: true },
      });
      gsap.to('.pricing-nav', {
        opacity: 1, y: 0,
        duration: 0.55,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: { trigger: '.price-stack-container', start: 'top 72%', once: true },
      });
      gsap.to('.pricing-cta', {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.pricing-cta', start: 'top 88%', once: true },
      });

      // ── FAQ ───────────────────────────────────────────────────────────────
      gsap.to('.faq-heading', {
        opacity: 1, x: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#faq', start: 'top 82%', once: true },
      });
      gsap.to('.faq-item', {
        opacity: 1, x: 0, rotateY: 0,
        stagger: 0.07,
        duration: 0.65,
        ease: 'power3.out',
        delay: 0.1,
        scrollTrigger: { trigger: '#faq', start: 'top 78%', once: true },
      });

      // ── About ─────────────────────────────────────────────────────────────
      gsap.to('.about-photo', {
        opacity: 1, scale: 1, rotateY: 0,
        duration: 1.3,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#quien-soy', start: 'top 78%', once: true },
      });
      gsap.to('.about-text-item', {
        opacity: 1, x: 0,
        stagger: 0.11,
        duration: 0.72,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: { trigger: '#quien-soy', start: 'top 78%', once: true },
      });

      // ── Footer ────────────────────────────────────────────────────────────
      gsap.to('.footer-content', {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: 'footer', start: 'top 92%', once: true },
      });

      // ── Magnetic buttons ──────────────────────────────────────────────────
      document.querySelectorAll('.magnetic-btn').forEach((btn) => {
        const el = btn as HTMLElement;
        const onMove = (e: Event) => {
          const me = e as MouseEvent;
          const rect = el.getBoundingClientRect();
          const x = (me.clientX - rect.left - rect.width / 2) * 0.28;
          const y = (me.clientY - rect.top - rect.height / 2) * 0.28;
          gsap.to(el, { x, y, ease: 'power2.out', duration: 0.32 });
        };
        const onLeave = () => {
          gsap.to(el, { x: 0, y: 0, ease: 'elastic.out(1, 0.42)', duration: 0.85 });
        };
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        magneticCleanups.push(() => {
          el.removeEventListener('mousemove', onMove);
          el.removeEventListener('mouseleave', onLeave);
        });
      });
    }, mainRef);

    return () => {
      ctx.revert();
      magneticCleanups.forEach((fn) => fn());
    };
  }, [selectedService]);

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
    <div ref={mainRef} className="min-h-screen bg-black text-gray-100 font-sans selection:bg-white selection:text-black">
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
            transition={{ duration: 0.45 }}
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
            <section
              id="inicio"
              className="relative h-screen flex items-center justify-center overflow-hidden border-b border-gray-900 pt-20"
              onMouseMove={handleHeroMouse}
            >
              <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
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
              <div className="hero-3d-grid z-[1]" />

              {/* Hero content — parallax target */}
              <div className="hero-inner-content relative z-10 text-center px-6 max-w-5xl">
                <div className="flex justify-center mb-4">
                  <div className="hero-symbol" />
                </div>
                <span className="hero-badge inline-block px-4 py-1 text-[10px] tracking-[0.4em] uppercase mb-8 rounded-full text-gray-400 font-medium">
                  Innovación digital sin límites
                </span>

                {/* Word-reveal title */}
                <h1 className="font-black mb-8 leading-[0.9] tracking-tighter font-display uppercase text-6xl md:text-[120px]">
                  <span className="block" style={{ overflow: 'hidden', paddingTop: '0.15em' }}>
                    <span className="hero-word-inner block">DISEÑO QUE</span>
                  </span>
                  <span className="block" style={{ overflow: 'hidden' }}>
                    <span className="hero-word-inner text-chrome block">TRASCIENDE</span>
                  </span>
                </h1>

                <p className="hero-subtitle text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                  Tu negocio merece una web que lo represente bien.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="hero-btn-wrap magnetic-btn">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                      className="btn-sweep border border-gray-800 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs"
                    >
                      Nuestros Servicios
                    </motion.button>
                  </div>
                  <div className="hero-btn-wrap magnetic-btn">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => document.getElementById('presupuesto')?.scrollIntoView({ behavior: 'smooth' })}
                      className="btn-sweep border border-gray-800 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs"
                    >
                      Presupuesto
                    </motion.button>
                  </div>
                  <div className="hero-btn-wrap magnetic-btn">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => document.getElementById('quien-soy')?.scrollIntoView({ behavior: 'smooth' })}
                      className="btn-sweep border border-gray-800 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2"
                    >
                      Quiénes están detrás <ChevronRight className="w-3 h-3" />
                    </motion.button>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-600"
              >
                <div className="w-px h-12 bg-gradient-to-b from-gray-800 to-transparent" />
              </motion.div>
            </section>

            {/* Servicios */}
            <section id="servicios" className="py-32 bg-zinc-950">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
                  <div className="services-header-content max-w-xl">
                    <span className="text-gray-600 uppercase text-[10px] tracking-[0.3em] font-bold mb-4 block">Expertise</span>
                    <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter italic font-display">Nuestros Servicios</h2>
                    <p className="text-gray-500 leading-relaxed">Soluciones integrales diseñadas para dominar el mercado digital actual con elegancia y rendimiento.</p>
                  </div>
                  <div className="flex-1 gradient-line mb-6 hidden md:block" />
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {services.map((s, i) => (
                    <div key={i} className="tilt-wrap" onMouseMove={handleTilt} onMouseLeave={resetTilt}>
                      <div className={`service-card group p-10 border border-gray-900 rounded-3xl hover:border-gray-700 transition-all duration-500 hover:bg-zinc-900/50 relative overflow-hidden card-metallic`}>
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
                      </div>
                    </div>
                  ))}
                </div>

                <div className="services-cta flex justify-center mt-20">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedService({ title: "Nuestros Servicios", desc: "Información detallada sobre todos nuestros planes y soluciones digitales.", icon: null })}
                    className="btn-sweep border border-gray-800 text-white px-16 py-6 rounded-full font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-4 transition-all"
                  >
                    Saber más <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </section>

            {/* Precios */}
            <section id="presupuesto" className="py-32 bg-black border-t border-gray-900">
              <div className="max-w-7xl mx-auto px-6 text-center mb-20">
                <div className="pricing-header-content space-y-4">
                  <span className="text-zinc-600 uppercase text-[10px] tracking-[0.4em] font-bold block">Inversión Transparente</span>
                  <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic font-display">
                    LISTA DE <span className="text-gray-700 text-6xl md:text-8xl">PRECIOS</span>
                  </h2>
                  <p className="text-gray-500 max-w-2xl mx-auto font-light">
                    Sin sorpresas ni costos ocultos. Tarifas adaptadas a startups y negocios que buscan impacto real.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-12">
                {/* 3D Card Stack */}
                <div
                  className="price-stack-container relative"
                  style={{ width: '300px', height: '400px', perspective: '1400px' }}
                >
                  {PLANS.map((plan, i) => {
                    const total = PLANS.length;
                    const pos = (i - activeCard + total) % total;
                    const isTop = pos === 0;
                    return (
                      <motion.div
                        key={i}
                        className="absolute inset-x-0 top-0"
                        style={{ zIndex: total - pos, cursor: isTop ? 'pointer' : 'default' }}
                        animate={{
                          y: pos * 20,
                          scale: 1 - pos * 0.048,
                          rotateZ: pos === 0 ? 0 : (i % 2 === 0 ? pos * 2.2 : -pos * 2.2),
                          rotateX: -pos * 5,
                          opacity: pos > 4 ? 0 : 1 - pos * 0.14,
                        }}
                        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                        onClick={isTop ? () => setActiveCard((prev: number) => (prev + 1) % total) : undefined}
                        whileHover={isTop ? { y: -12, scale: 1.03 } : {}}
                      >
                        <motion.div
                          animate={isTop ? { y: [0, -7, 0] } : { y: 0 }}
                          transition={isTop
                            ? { duration: 3.6, repeat: Infinity, ease: 'easeInOut' }
                            : { duration: 0.3 }
                          }
                        >
                          <div className={`w-[300px] min-h-[320px] flex flex-col p-8 rounded-2xl border card-metallic select-none ${
                            plan.isPromo
                              ? 'border-dashed border-2 border-gray-700 price-card-solid-promo'
                              : `border border-gray-800 price-card-solid${i === 1 ? ' price-card-glow' : ''}`
                          }`}>
                            <div className="flex justify-between items-start mb-6">
                              <h3 className="text-zinc-500 uppercase text-[9px] tracking-[0.25em] font-bold leading-tight max-w-[180px]">
                                {plan.title}
                              </h3>
                              <span className="text-[#1c1c1c] font-display font-black text-5xl leading-none select-none">
                                0{i + 1}
                              </span>
                            </div>

                            <div className="mb-auto">
                              <span className={`font-black italic font-display tracking-tighter leading-none ${plan.isPromo ? 'text-3xl text-white' : 'text-4xl text-white'}`}>
                                {plan.price}
                              </span>
                              {plan.period && (
                                <span className="block text-zinc-600 font-bold uppercase text-[8px] tracking-widest mt-1">
                                  {plan.period}
                                </span>
                              )}
                            </div>

                            <ul className="space-y-2.5 pt-5 border-t border-gray-800 mt-5">
                              {plan.features.map((f, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-[11px] text-gray-500 font-light leading-snug">
                                  <div className="w-1 h-1 mt-1.5 bg-gray-700 rounded-full flex-shrink-0" />
                                  {f}
                                </li>
                              ))}
                            </ul>

                            {plan.isPromo && (
                              <div className="flex justify-center pt-4">
                                <Gift className="text-gray-500 glow-rgb" size={22} />
                              </div>
                            )}

                            {isTop && (
                              <p className="mt-5 text-center text-[9px] text-gray-700 uppercase tracking-[0.3em] font-bold">
                                clic para siguiente →
                              </p>
                            )}
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Navigation */}
                <div className="pricing-nav flex items-center gap-5">
                  <motion.button
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveCard((prev: number) => (prev - 1 + PLANS.length) % PLANS.length)}
                    className="w-9 h-9 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 hover:text-white hover:border-gray-600 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                  </motion.button>

                  <div className="flex gap-2">
                    {PLANS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveCard(i)}
                        className={`rounded-full transition-all duration-300 ${
                          i === activeCard
                            ? 'w-5 h-1.5 bg-white'
                            : 'w-1.5 h-1.5 bg-gray-700 hover:bg-gray-500'
                        }`}
                      />
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveCard((prev: number) => (prev + 1) % PLANS.length)}
                    className="w-9 h-9 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 hover:text-white hover:border-gray-600 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              <div className="pricing-cta max-w-7xl mx-auto px-6 mt-20 flex flex-col items-center gap-8 text-center pt-20 border-t border-gray-900/50">
                <p className="text-gray-400 text-xl font-light italic max-w-3xl leading-relaxed">
                  ¿Tenés un proyecto más grande o dudas sobre los planes? Consultanos por WhatsApp y armamos algo a tu medida en minutos.
                </p>
                <motion.a
                  href="https://wa.me/5491130750355"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="magnetic-btn inline-flex items-center justify-center gap-4 bg-white text-black px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-white/10 hover:bg-gray-100 transition-colors"
                >
                  <MessageCircle fill="currentColor" className="w-5 h-5 text-black" /> Hablar con Lorenzo
                </motion.a>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="py-32 bg-zinc-950 border-t border-gray-900">
              <div className="max-w-3xl mx-auto px-6">
                <div className="faq-heading mb-16 space-y-4">
                  <span className="text-gray-600 uppercase text-[10px] tracking-[0.3em] font-bold block">Preguntas Frecuentes</span>
                  <h2 className="text-5xl font-black uppercase tracking-tighter italic font-display">FAQ</h2>
                </div>

                <div className="space-y-3">
                  {faqs.map((item, i) => (
                    <div key={i} className="faq-item">
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
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Quien soy */}
            <section id="quien-soy" className="py-32 bg-black border-t border-gray-900">
              <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
                <div className="about-photo w-full md:w-1/3 aspect-square rounded-full border border-gray-800 overflow-hidden">
                  <img src="/yo.png" alt="Lorenzo" className="w-full h-full object-cover object-top" />
                </div>
                <div className="flex-1 space-y-6">
                  <span className="about-text-item text-gray-600 uppercase text-[10px] tracking-[0.3em] font-bold block">El fundador</span>
                  <h2 className="about-text-item text-5xl font-black uppercase tracking-tighter italic font-display">Soy Lorenzo</h2>
                  <p className="about-text-item text-gray-400 text-lg leading-relaxed font-light max-w-2xl">
                    Un joven emprendedor de <span className="text-white font-medium">15 años</span> con una visión clara: revolucionar el diseño web. Mi objetivo es demostrar que la edad no es un límite para la innovación y la excelencia digital.
                  </p>
                  <p className="about-text-item text-gray-500 leading-relaxed font-light max-w-2xl">
                    En Lorenzo Studio, fusiono creatividad audaz con rapidez extrema para entregar sitios que no solo se ven bien, sino que impulsan negocios reales al siguiente nivel. Estoy aquí para construir el futuro de la web, un proyecto a la vez.
                  </p>
                  <div className="about-text-item pt-6">
                    <div className="inline-block p-1 rounded-full bg-gradient-to-r from-gray-800 to-transparent">
                      <div className="bg-black px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                        Fundador de Lorenzo Studio
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-gray-900 bg-black">
              <div className="footer-content max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
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
