import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ---------------- Reveal on scroll ---------------- */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = ''
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ---------------- Section shell ---------------- */
export function Section({
  id,
  tag,
  title,
  subtitle,
  children
}: {
  id: string
  tag: string
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="relative max-w-6xl mx-auto px-6 py-24">
      <Reveal>
        <p className="section-tag mb-3">// {tag}</p>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          {title}
          <span className="text-accent">_</span>
        </h2>
        {subtitle && <p className="mt-4 text-grey max-w-2xl leading-relaxed">{subtitle}</p>}
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  )
}

/* ---------------- Copy block (fake terminal) ---------------- */
export function CopyBlock({ text, label = 'bash' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable */
    }
  }
  return (
    <div className="relative group rounded-lg border border-edge bg-black/70 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-edge bg-panel/60">
        <span className="w-2.5 h-2.5 rounded-full bg-accent" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-grey">{label}</span>
        <span className="ml-auto font-mono text-[11px] text-grey/60">bash</span>
      </div>
      <pre className="px-4 py-4 text-sm font-mono text-ink/90 whitespace-pre-wrap leading-relaxed">
        {text}
      </pre>
      <button
        onClick={copy}
        className="absolute top-2.5 right-3 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[11px] px-2.5 py-1 rounded-md border border-edge bg-base/80 text-grey hover:text-accent hover:border-accent/50"
      >
        {copied ? '✓ copiado' : 'copiar'}
      </button>
    </div>
  )
}

/* ---------------- Animated counter ---------------- */
export function Counter({ to, suffix = '', duration = 1400 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(to * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

/* ---------------- Typewriter ---------------- */
export function Typewriter({ phrases, className = '' }: { phrases: string[]; className?: string }) {
  const [txt, setTxt] = useState('')
  const [idx, setIdx] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const full = phrases[idx % phrases.length]
    const speed = del ? 28 : 62
    const t = setTimeout(() => {
      if (!del) {
        const next = full.slice(0, txt.length + 1)
        setTxt(next)
        if (next === full) setTimeout(() => setDel(true), 1800)
      } else {
        const next = full.slice(0, txt.length - 1)
        setTxt(next)
        if (next === '') {
          setDel(false)
          setIdx(i => i + 1)
        }
      }
    }, speed)
    return () => clearTimeout(t)
  }, [txt, del, idx, phrases])
  return (
    <span className={className}>
      {txt}
      <span className="text-accent animate-blink">▊</span>
    </span>
  )
}

/* ---------------- FAQ accordion item ---------------- */
export function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className={`border rounded-xl px-5 py-4 bg-panel/50 transition-colors duration-300 ${open ? 'border-accent/50' : 'border-edge'}`}
    >
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between gap-4 text-left">
        <span className="font-medium text-white">{q}</span>
        <span className={`font-mono text-accent text-xl transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pt-3 text-grey text-sm leading-relaxed whitespace-pre-wrap">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
