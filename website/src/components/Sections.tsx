import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, XCircle, CircleDot } from 'lucide-react'
import { SITE } from '../config'
import { Reveal, Section, CopyBlock, Counter, Typewriter, FaqItem } from './ui'

/* ================= HERO ================= */
export function Hero() {
  const [line, setLine] = useState(0)
  const [chars, setChars] = useState(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const idx = line % SITE.terminalScript.length
  const current = SITE.terminalScript[idx]
  useEffect(() => {
    if (chars <= current.text.length) {
      timer.current = setTimeout(() => setChars(c => c + 1), current.kind === 'cmd' ? 46 : 14)
    } else {
      timer.current = setTimeout(
        () => {
          setLine(l => l + 1)
          setChars(0)
        },
        idx === SITE.terminalScript.length - 1 ? 4200 : 240
      )
    }
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [chars, line, current.text.length, current.kind, idx])

  const visible = SITE.terminalScript.slice(0, idx + 1)
  const body = visible.map((l, i) => (
    <div key={i} className={l.kind === 'cmd' ? 'text-ink' : 'text-grey'}>
      {l.kind === 'cmd' ? (
        <>
          <span className="text-accent font-bold">{SITE.prompt}</span> {l.text.slice(0, i === visible.length - 1 ? chars : undefined)}
          {i === visible.length - 1 && chars <= l.text.length && <span className="text-accent animate-blink">▊</span>}
        </>
      ) : (
        l.text
      )}
    </div>
  ))

  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg animate-grid-drift opacity-60" />
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full blur-[140px] bg-accent/15" />
      <div className="absolute top-40 -right-32 w-[380px] h-[380px] rounded-full blur-[140px] bg-accent/10" />

      <div className="relative max-w-6xl mx-auto px-6 pt-36 pb-24 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 chip mb-6"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-green-500 opacity-60 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500" />
            </span>
            <span className="font-mono text-xs text-grey">
              {SITE.prompt} <Typewriter phrases={SITE.typewriter} className="text-ink" />
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05]"
          >
            {SITE.titleA}
            <span className="text-accent text-glow">{SITE.titleB}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-grey leading-relaxed text-lg"
          >
            {SITE.heroText}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#instalacion"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-[#0b0b0e] font-bold hover:shadow-glow transition-all group"
            >
              {SITE.ctaInstall}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#atajos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-edge text-ink hover:border-accent/50 hover:bg-accent/5 transition-all"
            >
              Ver atajos
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-2.5"
          >
            {SITE.chips.map((c, i) => (
              <span
                key={c}
                className="chip animate-floatSlow"
                style={{ animationDelay: `${i * 0.35}s` }}
              >
                {c}
              </span>
            ))}
          </motion.div>
        </div>

        {/* live terminal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-3xl blur-3xl bg-accent/10 pointer-events-none" />
          <div className="relative rounded-2xl border border-edge bg-black/80 shadow-glass overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-edge">
              <span className="w-3 h-3 rounded-full bg-accent" />
              <span className="w-3 h-3 rounded-full bg-edge" />
              <span className="w-3 h-3 rounded-full bg-edge" />
              <span className="ml-3 font-mono text-xs text-grey">
                {SITE.terminalTitle}
              </span>
              <span className="ml-auto font-mono text-[11px] text-green-500">● live</span>
            </div>
            <div className="relative">
              <div className="px-5 py-5 min-h-[320px] font-mono text-[13px] leading-[1.8]">
                {body}
                <div className="h-1" />
              </div>
              <div className="absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-accent/[0.05] to-transparent animate-scanline pointer-events-none" />
            </div>
            <div className="border-t border-edge px-5 py-3 grid grid-cols-4 gap-2 font-mono text-[11px]">
              {SITE.terminalStats.map(s => (
                <div key={s.label}>
                  <div className="text-accent font-bold text-sm">{s.value}</div>
                  <div className="text-grey/70">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ================= STATS ================= */
export function StatsBand() {
  return (
    <section className="border-y border-edge bg-panel/40">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        {SITE.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center font-mono text-accent font-bold text-lg">
                {s.icon}
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-white">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="font-mono text-xs text-grey">{s.label}</div>
              {s.sub && <div className="text-[11px] text-grey/60">{s.sub}</div>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ================= FEATURES ================= */
export function Features() {
  return (
    <Section id="features" tag="features" title={SITE.featuresTitle} subtitle={SITE.featuresSub}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SITE.features.map((f, i) => (
          <Reveal key={f.title} delay={Math.min(i * 0.07, 0.4)}>
            <div className="card relative h-full">
              <span className="absolute top-3 right-3 font-mono text-[10px] text-grey/50 border-b border-l border-edge rounded-bl-lg px-2 py-0.5 bg-base/60">
                {f.tag}
              </span>
              <div className="w-11 h-11 rounded-lg bg-accent/15 border border-accent/40 flex items-center justify-center text-accent text-xl mb-4 transition-transform duration-300">
                {f.icon}
              </div>
              <h3 className="text-white font-bold mb-1.5">{f.title}</h3>
              <p className="text-grey text-sm leading-relaxed">{f.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ================= ANATOMY ================= */
export function Anatomy() {
  const [sel, setSel] = useState(0)
  const item = SITE.anatomy[sel]
  return (
    <Section id={SITE.anatomyId} tag={SITE.anatomyTag} title={SITE.anatomyTitle} subtitle={SITE.anatomySub}>
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <Reveal>
          <div className="rounded-2xl border border-edge bg-black/80 p-8 font-mono text-2xl md:text-3xl flex flex-wrap items-center gap-x-2 gap-y-4 min-h-[180px]">
            {SITE.anatomy.map((a, i) => (
              <button
                key={a.sym}
                onClick={() => setSel(i)}
                className={`px-2 py-1 rounded-md transition-all duration-200 ${
                  sel === i
                    ? 'text-accent [text-shadow:0_0_18px_rgba(' + SITE.accentRgb + ',0.8)] bg-accent/10'
                    : 'text-ink hover:text-accent hover:bg-accent/5'
                }`}
              >
                {a.sym}
              </button>
            ))}
            <span className="text-accent animate-blink">▊</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-edge bg-panel/70 p-6 min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={sel}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="font-mono text-accent text-sm mb-3">{item.sym}</div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-grey text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

/* ================= INSTALL TABS ================= */
export function InstallTabs() {
  const [tab, setTab] = useState(0)
  return (
    <Section id="instalacion" tag="install" title="Instalación_" subtitle={SITE.installSub}>
      <div className="flex flex-wrap gap-2 mb-6">
        {SITE.installTabs.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setTab(i)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border font-mono text-sm transition-all ${
              tab === i
                ? 'bg-accent/15 border-accent/60 text-accent shadow-glow'
                : 'border-edge text-grey hover:text-ink hover:border-accent/30'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.3 }}
        >
          <div className="card !p-0 overflow-hidden">
            <div className="px-6 py-5 border-b border-edge">
              <h3 className="text-white font-bold">{SITE.installTabs[tab].label}</h3>
              <p className="text-grey text-sm mt-1">{SITE.installTabs[tab].desc}</p>
            </div>
            <div className="p-6 space-y-4">
              {SITE.installTabs[tab].steps.map((s, i) => (
                <div key={i} className="flex gap-4">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-accent/15 border border-accent/40 text-accent font-mono text-xs flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1 space-y-2">
                    <p className="text-ink text-sm">{s.text}</p>
                    {s.code && <CopyBlock text={s.code} label={s.codeLabel} />}
                    {s.link && (
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-sm text-accent hover:underline"
                      >
                        {s.linkText || s.link} <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
              {SITE.installTabs[tab].notes &&
                SITE.installTabs[tab].notes!.map((n, i) => (
                  <p key={i} className="text-xs text-grey/70 font-mono border-l-2 border-accent/40 pl-3">
                    {n}
                  </p>
                ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  )
}

/* ================= KEY REFERENCE ================= */
export function KeyRef() {
  return (
    <Section id="atajos" tag="reference" title={SITE.keysTitle} subtitle={SITE.keysSub}>
      <div className="grid md:grid-cols-2 gap-3">
        {SITE.keys.map((k, i) => (
          <Reveal key={k.desc} delay={Math.min(i * 0.05, 0.4)}>
            <div className="flex items-center justify-between gap-4 border border-edge rounded-xl px-5 py-3.5 bg-panel/50 hover:border-accent/50 transition-colors">
              <span className="text-sm text-ink">{k.desc}</span>
              <span className="flex items-center gap-1.5 shrink-0 font-mono">
                {k.keys.map((key, j) => (
                  <span key={j} className="flex items-center gap-1.5">
                    {j > 0 && <span className="text-accent text-xs font-bold">+</span>}
                    <kbd className="kbd">{key}</kbd>
                  </span>
                ))}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ================= FAQ ================= */
export function Faq() {
  return (
    <Section id="faq" tag="faq" title="Preguntas frecuentes_">
      <div className="space-y-3 max-w-3xl">
        {SITE.faq.map((f, i) => (
          <Reveal key={f.q} delay={Math.min(i * 0.06, 0.3)}>
            <FaqItem q={f.q} a={f.a} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ================= CTA ================= */
export function Cta() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-base via-transparent to-base" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <div className="mx-auto w-16 h-16 rounded-2xl bg-accent/15 border border-accent/40 flex items-center justify-center text-accent shadow-glow mb-8 animate-floatSlow">
            <CircleDot className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold gradient-text tracking-tight">
            {SITE.ctaTitle}
          </h2>
          <p className="mt-5 text-grey text-lg max-w-2xl mx-auto">{SITE.ctaText}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={SITE.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-accent text-[#0b0b0e] font-bold hover:shadow-glow transition-all"
            >
              {SITE.ctaRepoBtn}
            </a>
            <a
              href="#instalacion"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-edge text-ink hover:border-accent/50 hover:bg-accent/5 transition-all"
            >
              {SITE.ctaInstall}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ================= FOOTER ================= */
export function Footer() {
  return (
    <footer className="border-t border-edge">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-grey">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>
            {SITE.name} — {SITE.footerText}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a href={SITE.authorUrl} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
            {SITE.author}
          </a>
          <span className="text-grey/50">build {SITE.version}</span>
        </div>
      </div>
    </footer>
  )
}

/* keep tree-shaking honest about imports used by configs */
export const __icons = { CheckCircle2, XCircle }
