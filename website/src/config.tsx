// environment-kali-nordic — config del sitio
import { Palette, Image, Type, Layers, Monitor, Zap, Search, Lock, Terminal, Download, Cog, CheckCircle2, ShieldCheck } from 'lucide-react'
import type { SiteConfig } from './config-types'

export const SITE: SiteConfig = {
  name: 'kali-nordic',
  short: 'XFCE ricing para Kali',
  initial: 'N',
  version: 'v1.0.0',
  accentRgb: '0,179,189',
  repoUrl: 'https://github.com/D1se0/environment-kali-nordic',
  author: 'D1se0',
  authorUrl: 'https://github.com/D1se0',
  footerText: ' XFCE · Everblush · Nordzy',
  prompt: 'kali@nordic:~$',
  titleA: 'Kali ',
  titleB: 'Nordic',
  heroText: (
    <>
      Un entorno <span className="text-white font-semibold">XFCE minimalista y moderno</span> para Kali Linux,
      diseñado para flujos de <span className="text-accent">hacking ético</span> sin renunciar a una
      interfaz pulida: temas Everblush, iconos Nordzy, widgets EWW y lanzador Findex.
    </>
  ),
  typewriter: [
    'xfce4 + everblush',
    'eww widgets live',
    'findex: shift+espacio',
    'i3lock-everblush',
    'nordzy cyan dark'
  ],
  chips: ['XFCE', 'Everblush GTK', 'Nordzy icons', 'Picom', 'EWW', 'Findex', 'i3lock-color'],
  ctaInstall: 'Instalar el entorno',
  ctaRepoBtn: 'Ver repositorio',
  ctaTitle: 'Tu Kali, con estética nórdica.',
  ctaText: 'Un solo script instala temas, iconos, fuentes, panel, EWW, Findex y lockscreen. Reinicia y entra a tu nuevo escritorio.',
  terminalTitle: 'kali@nordic — xfce4-terminal',
  terminalScript: [
    { kind: 'cmd', text: './install.sh' },
    { kind: 'out', text: '[*] Instalador de entorno Kali iniciado' },
    { kind: 'out', text: '[*] Actualizando sistema... ok' },
    { kind: 'out', text: '[✔] Temas GTK Everblush instalados' },
    { kind: 'out', text: '[✔] Nordzy cyan-dark-MOD instalado' },
    { kind: 'out', text: '[✔] Picom compilado (vcomp-notify)' },
    { kind: 'out', text: '[✔] EWW compilado con cargo --release' },
    { kind: 'out', text: '[✔] Findex instalado (Shift+Espacio)' },
    { kind: 'out', text: '[✔] i3lock-everblush en /usr/bin' },
    { kind: 'cmd', text: 'eww open main_bar' },
    { kind: 'out', text: '[✔] widgets en pantalla — listo. Reinicia y disfruta.' }
  ],
  terminalStats: [
    { value: 'Everblush', label: 'GTK+XFWM' },
    { value: 'Nordzy', label: 'icons' },
    { value: 'EWW', label: 'widgets' },
    { value: '#232a2d', label: 'lightdm' }
  ],
  nav: [
    { id: 'features', label: 'features' },
    { id: 'ricing', label: 'ricing' },
    { id: 'instalacion', label: 'instalación' },
    { id: 'post', label: 'post-install' },
    { id: 'faq', label: 'faq' }
  ],
  stats: [
    { value: 14, label: 'componentes instalados', sub: 'temas, iconos, fuentes, widgets…', icon: <Layers className="w-5 h-5" /> },
    { value: 1, label: 'script para todo', sub: './install.sh y a esperar', icon: <Terminal className="w-5 h-5" /> },
    { value: 4, label: 'monitores genmon', sub: 'CPU · RAM · hora', icon: <Monitor className="w-5 h-5" /> },
    { value: 0, label: 'tocar a mano (casi)', sub: 'solo wallpaper y genmon', icon: <CheckCircle2 className="w-5 h-5" /> }
  ],
  featuresTitle: 'Qué instala_',
  featuresSub: 'Cada pieza del ricing se descarga, compila y aplica por ti. Esto es lo que aparece tras ejecutar el instalador.',
  features: [
    { tag: 'theme', icon: <Palette className="w-5 h-5" />, title: 'Everblush GTK + XFWM', desc: 'Tema de ventana y GTK coherente en todos los paneles, menús y diálogos de XFCE.' },
    { tag: 'icons', icon: <Image className="w-5 h-5" />, title: 'Nordzy cyan-dark MOD', desc: 'Pack de iconos nórdico con variante cian oscuro, aplicado también en LightDM.' },
    { tag: 'cursors', icon: <Zap className="w-5 h-5" />, title: 'Radioactive Nord cursors', desc: 'Cursores radio (nord) clonados e instalados desde el repo de alvatip.' },
    { tag: 'fonts', icon: <Type className="w-5 h-5" />, title: 'JetBrainsMono Nerd + Roboto', desc: 'Tipografías del ricing listas en ~/.local/share/fonts para UI y terminal.' },
    { tag: 'qt', icon: <Cog className="w-5 h-5" />, title: 'Kvantum theming', desc: 'Tema Kvantum para que las apps Qt no rompan la estética Everblush.' },
    { tag: 'compositor', icon: <Monitor className="w-5 h-5" />, title: 'Picom compilado', desc: 'Compilado desde git con todas las dependencias xcb; backend xrender forzado para VMs.' },
    { tag: 'panel', icon: <Layers className="w-5 h-5" />, title: 'Panel XFCE dock-like', desc: 'Config completa del panel con docklike plugin y monitores genmon CPU/RAM/hora.' },
    { tag: 'widgets', icon: <Zap className="w-5 h-5" />, title: 'EWW widgets', desc: 'Widgets modernos compilados con Rust: barra lateral, reloj y métricas del sistema.' },
    { tag: 'launcher', icon: <Search className="w-5 h-5" />, title: 'Findex', desc: 'Lanzador tipo Spotlight con autostart incluido; se abre con Shift+Espacio.' },
    { tag: 'lock', icon: <Lock className="w-5 h-5" />, title: 'i3lock-everblush', desc: 'Lockscreen a juego con el tema, configurado como LockCommand de la sesión.' },
    { tag: 'fetch', icon: <Terminal className="w-5 h-5" />, title: 'Neofetch custom', desc: 'Neofetch compilado desde git con configuración personalizada del ricing.' },
    { tag: 'wallpapers', icon: <Image className="w-5 h-5" />, title: 'Pack de wallpapers', desc: 'Wallpapers nórdicos instalados en ~/.local/share/wallpapers (recomendado: mechanic-keyboard).' }
  ],
  anatomyId: 'ricing',
  anatomyTag: 'anatomía del escritorio',
  anatomyTitle: 'Anatomía del ricing_',
  anatomySub: 'Cada símbolo del escritorio tiene su porqué. Haz click en cada pieza para saber qué es y de dónde viene.',
  anatomy: [
    { sym: '❄', title: 'Nordic core', desc: 'La base: Everblush GTK + XFWM, iconos Nordzy y cursor Radioactive Nord. Todo comparte la misma paleta fría cian/gris para que nada destaque fuera de tono.' },
    { sym: '▣', title: 'Panel dock-like', desc: 'xfce4-panel con el plugin docklike: apps abiertas como iconos con indicadores. Los genmon (CPU/RAM/hora) se configuran a mano tras instalar.' },
    { sym: '⌘', title: 'EWW widgets', desc: 'Widgets escritos en XML/Yuck compilados con Rust. Se abren con Shift+S y muestran reloj, métricas y controles multimedia.' },
    { sym: '⌕', title: 'Findex', desc: 'Lanzador tipo Spotlight escrito en GTK. Autostart incluido; Shift+Espacio lo invoca sobre cualquier ventana.' },
    { sym: '🔒', title: 'i3lock-everblush', desc: 'Binario en /usr/bin registrado como LockCommand de XFCE. El screensaver original de XFCE se oculta para que solo exista este lock.' },
    { sym: '◐', title: 'Picom (xrender)', desc: 'El instalador compila picom desde git y fuerza backend xrender en lugar de glx: en VMware evita el tearing y el consumo de GPU.' }
  ],
  installSub: 'Instala Kali desde la ISO oficial, crea tu usuario y lanza el script. Todo lo demás va solo.',
  installTabs: [
    {
      label: 'Instalación clásica',
      icon: <Download className="w-4 h-4" />,
      desc: 'Clona el repo, da permisos y ejecuta el instalador como usuario normal (no root).',
      steps: [
        { text: 'Descarga Kali desde la ISO oficial (no uses imágenes pre-construidas para VM):', link: 'https://www.kali.org/get-kali/#kali-installer-images', linkText: 'kali.org/get-kali' },
        { text: 'Clona el repositorio y entra en la carpeta:', code: 'git clone https://github.com/D1se0/environment-kali-nordic.git\ncd environment-kali-nordic/' },
        { text: 'Da permisos y lanza el instalador:', code: 'chmod +x install.sh\n./install.sh' },
        { text: 'El script valida la versión, instala dependencias, aplica temas, iconos y fuentes, configura XFCE y compila Picom, EWW y Findex. Puedes seguir el progreso en install.log.', code: 'cat install.log', codeLabel: 'seguir el log' },
        { text: 'Cuando termine, acepta el reinicio (o hazlo a mano) y selecciona la sesión XFCE en LightDM.' }
      ],
      notes: [
        '[!] Ejecuta SIEMPRE como usuario normal (kali), nunca como root.',
        '[!] Diseñado para kernel 6.18.12+kali-amd64; en otras versiones el script te preguntará si continuar.'
      ]
    },
    {
      label: 'Post-install manual',
      icon: <Cog className="w-4 h-4" />,
      desc: 'Tres ajustes que el script no puede hacer por ti (wallpaper, color de LightDM y genmons).',
      steps: [
        { text: 'Wallpaper: ve a Escritorio → Fondo de pantalla → Carpeta "Otro..." y selecciona la carpeta de wallpapers instalada:', code: '/home/kali/.local/share/wallpapers', codeLabel: 'ruta' },
        { text: 'Elige el wallpaper recomendado: mechanic-keyboard.png' },
        { text: 'Color de LightDM: abre "LightDM GTK Greeter Settings" y pon el color personalizado #232a2d.' },
        { text: 'Monitores genmon: clic derecho en el panel → Panel → Preferencias → Elementos, y configura CPU, RAM y hora con los scripts:', code: '/home/kali/genmon-scripts/cpu.sh      # Period: 2.00\n/home/kali/genmon-scripts/mem.sh      # Period: 2.00\n/home/kali/genmon-scripts/datetime.sh # Period: 0.25', codeLabel: 'genmon-scripts' },
        { text: 'Desactiva la etiqueta (label) en los tres monitores para que solo se vea el valor.' }
      ]
    },
    {
      label: 'Solución de errores',
      icon: <ShieldCheck className="w-4 h-4" />,
      desc: 'Si algo falla durante o después de la instalación, esto es lo primero que hay que mirar.',
      steps: [
        { text: 'Consulta el log completo del instalador — cada paso se registra ahí:', code: 'cat install.log', codeLabel: 'log' },
        { text: 'Si el terminal zsh muestra errores de historial corrupto, aplica el fix clásico:', code: 'mv ~/.zsh_history ~/.zsh_history_bad\ntouch ~/.zsh_history\nchmod 600 ~/.zsh_history', codeLabel: 'zsh fix' },
        { text: 'Si picom no arranca tras reiniciar, prueba a regenerar su autostart:', code: 'cp /usr/share/applications/picom.desktop ~/.config/autostart/ 2>/dev/null || echo "ya existe"', codeLabel: 'picom' },
        { text: 'Si EWW no compila, instala Rust y vuelve a lanzar el instalador:', code: 'curl https://sh.rustup.rs -sSf | sh -s -- -y', codeLabel: 'rust' }
      ]
    }
  ],
  keysTitle: 'Atajos del entorno_',
  keysSub: 'Los bindings que vienen configurados tras instalar. Todo se puede cambiar desde la configuración de XFCE.',
  keys: [
    { desc: 'Abrir el launcher Findex', keys: ['Shift', 'Space'] },
    { desc: 'Mostrar/ocultar widgets EWW', keys: ['Shift', 'S'] },
    { desc: 'Terminal de XFCE', keys: ['Ctrl', 'Alt', 'T'] },
    { desc: 'Bloquear pantalla (i3lock)', keys: ['Ctrl', 'Alt', 'L'] },
    { desc: 'Wallpapers disponibles', keys: ['~/.local/share/wallpapers'] },
    { desc: 'Log de instalación', keys: ['cat install.log'] }
  ],
  faq: [
    { q: '¿Por qué mi Kali tiene que venir de la ISO y no de una imagen para VM?', a: 'Las imágenes pre-construidas de VMware/VirtualBox traen configuraciones y paquetes que rompen el instalador (usuarios, servicios y XFCE con estado). Instalar desde la ISO garantiza un entorno limpio donde el script puede aplicar todo sin conflictos.' },
    { q: '¿Puedo ejecutar el instalador como root?', a: 'No. El script lo comprueba y sale con error si EUID es 0. Se diseñó para ejecutarse como usuario normal (kali) porque aplica configuraciones de usuario (~/.themes, ~/.config) y solo usa sudo donde hace falta.' },
    { q: '¿Por qué picom usa backend xrender y no glx?', a: 'En máquinas virtuales y GPUs sin aceleración decente, glx produce tearing y artefactos. El instalador reescribe picom.conf para forzar xrender, más estable y ligero en estos escenarios.' },
    { q: '¿Por qué compila picom y EWW desde git en vez de usar apt?', a: 'Los paquetes de Kali/Debian suelen ir por detrás de las versiones que el ricing necesita (picom con efectos vcomp-notify, EWW con soporte de widgets modernos). Compilar desde git garantiza la versión exacta que el tema espera.' },
    { q: 'Tengo el terminal zsh con errores raros al abrir, ¿qué hago?', a: 'Es el historial corrupto clásico de zsh: renómbralo, crea uno limpio y dale permisos correctos. Los pasos exactos están en la pestaña "Solución de errores" de esta misma página.' },
    { q: '¿Qué hago si algo falla a mitad de instalación?', a: 'Todo el output del script se guarda en install.log dentro de la carpeta del repo. Búscalo con cat install.log y revisa el último [!] antes del fallo: la mayoría de problemas son dependencias faltantes que apt te sugerirá.' }
  ]
}
