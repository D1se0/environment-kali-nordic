// re-export compartido: cada config usa estos tipos
export type InstallStep = {
  text: string
  code?: string
  codeLabel?: string
  link?: string
  linkText?: string
}
export type InstallTab = {
  label: string
  icon: React.ReactNode
  desc: string
  steps: InstallStep[]
  notes?: string[]
}
export type SiteConfig = {
  name: string
  short: string
  initial: string
  version: string
  accentRgb: string
  repoUrl: string
  author: string
  authorUrl: string
  footerText: string
  prompt: string
  titleA: string
  titleB: string
  heroText: React.ReactNode
  typewriter: string[]
  chips: string[]
  ctaInstall: string
  ctaRepoBtn: string
  ctaTitle: string
  ctaText: string
  terminalTitle: string
  terminalScript: { kind: 'cmd' | 'out'; text: string }[]
  terminalStats: { value: string; label: string }[]
  nav: { id: string; label: string }[]
  stats: { value: number; suffix?: string; label: string; sub?: string; icon: React.ReactNode }[]
  featuresTitle: string
  featuresSub: string
  features: { tag: string; icon: React.ReactNode; title: string; desc: string }[]
  anatomyId: string
  anatomyTag: string
  anatomyTitle: string
  anatomySub: string
  anatomy: { sym: string; title: string; desc: string }[]
  installSub: string
  installTabs: InstallTab[]
  keysTitle: string
  keysSub: string
  keys: { desc: string; keys: string[] }[]
  faq: { q: string; a: string }[]
}
