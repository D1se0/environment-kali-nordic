import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Github } from 'lucide-react'
import { SITE } from './config'
import { Hero, StatsBand, Features, Anatomy, InstallTabs, KeyRef, Faq, Cta, Footer } from './components/Sections'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('inicio')
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    SITE.nav.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-base/85 backdrop-blur-xl border-b border-edge shadow-glass' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <a href="#inicio" className="flex items-center gap-2.5 shrink-0">
          <span className="w-7 h-7 rounded-md bg-accent/15 border border-accent/40 flex items-center justify-center font-mono font-bold text-accent text-sm">
            {SITE.initial}
          </span>
          <span className="font-mono font-bold text-white text-sm tracking-tight">
            {SITE.name}
            <span className="text-accent animate-blink">_</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {SITE.nav.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`font-mono text-[13px] px-3 py-1.5 rounded-md transition-colors ${
                active === id ? 'text-accent bg-accent/10' : 'text-grey hover:text-ink'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href={SITE.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center gap-2 font-mono text-[13px] px-4 py-2 rounded-md border border-accent/50 text-accent hover:bg-accent hover:text-[#0b0b0e] hover:shadow-glow transition-all shrink-0"
        >
          <Github className="w-4 h-4" />
          GitHub
        </a>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-accent-dark via-accent to-accent-bright"
        style={{ scaleX }}
      />
    </header>
  )
}

export default function App() {
  return (
    <div className="overflow-x-hidden bg-base min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <StatsBand />
        <Features />
        <Anatomy />
        <InstallTabs />
        <KeyRef />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
