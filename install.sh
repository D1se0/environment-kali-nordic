#!/usr/bin/env bash

# ==========================================================
# ❄️ Kali Nordic Environment Installer
# ==========================================================
#
# Author: D1se0
# GitHub: https://github.com/D1se0
#
# YouTube: Diseo (@hacking_community)
# TikTok: Diseo (@hacking_community)
#
# Description:
# Automated installer for a Nordic-style XFCE environment
# on Kali Linux, optimized for hacking workflows while
# maintaining a clean and modern graphical interface.
#
# Features:
# - Everblush Theme
# - Nordzy Icons
# - Picom Compositor
# - EWW Widgets
# - Findex Launcher
# - Custom XFCE Panel
#
# Disclaimer:
# This script is intended for educational and ethical
# hacking environments only. Use responsibly.
#
# Source: https://www.pling.com/p/1908883/
#
# ==========================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="$SCRIPT_DIR/install.log"
KALI_TARGET="6.18.12+kali-amd64"

RED='\033[1;31m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;34m'
NC='\033[0m'

log(){ echo -e "${BLUE}[*]${NC} $1"; }
ok(){ echo -e "${GREEN}[✔]${NC} $1"; }
warn(){ echo -e "${YELLOW}[!]${NC} $1"; }
error(){ echo -e "${RED}[✘]${NC} $1"; }
pause(){ read -n 1 -s -r -p "Pulse cualquier tecla para continuar..."; echo; }
run(){ bash -c "$1" &>> "$LOG_FILE"; }

clear
log "Instalador de entorno Kali iniciado"

# =========================
# VERIFICACIONES
# =========================

if [[ $EUID -eq 0 ]]; then
    error "No ejecutar como root"
    exit 1
fi

if ! sudo -n true 2>/dev/null; then
    error "Se requieren permisos sudo"
    exit 1
fi

CURRENT_KERNEL=$(uname -r)

if [[ "$CURRENT_KERNEL" != *"$KALI_TARGET"* ]]; then
    warn "Script diseñado para Kali $KALI_TARGET"
    warn "Tu versión: $CURRENT_KERNEL"
    read -p "¿Continuar? (y/n): " opt
    [[ "$opt" != "y" ]] && exit 1
fi

warn "IMPORTANTE: Usuario esperado: kali"
pause

# =========================
# ACTUALIZAR
# =========================

log "Actualizando sistema"
run "sudo apt update"

# =========================
# DEPENDENCIAS
# =========================

log "Instalando dependencias"
run "echo 'deb http://deb.debian.org/debian unstable main' | sudo tee -a /etc/apt/sources.list"
run "sudo apt update && sudo apt install -y mugshot xfce4-terminal unzip git curl p7zip-full"

run "xfconf-query -c xfce4-session -p /general/TerminalEmulator -s xfce4-terminal --create -t string"
echo "TerminalEmulator=xfce4-terminal" > ~/.config/xfce4/helpers.rc
run "xfce4-panel -r"

# =========================
# TEMAS
# =========================

cd "$SCRIPT_DIR"

run "7z x Nordzy-cyan-dark-MOD.7z && rm -rf Nordzy-cyan-dark-MOD.7z"

log "Instalando temas GTK"
run "unzip -o GTK-XFWM-Theme.zip"
mkdir -p ~/.themes
run "mv GTK-XFWM-Everblush-Theme/* ~/.themes"
run "rm -rf GTK-XFWM-Everblush-Theme GTK-XFWM-Theme.zip"

log "Instalando iconos"
run "unzip -o Nordzy-cyan-dark-MOD.zip"
mkdir -p ~/.local/share/icons
run "mv Nordzy-cyan-dark-MOD ~/.local/share/icons"
run "rm -rf Nordzy-cyan-dark-MOD.zip"

log "Cursores"
run "git clone https://github.com/alvatip/Radioactive-nord.git"
run "cd Radioactive-nord && ./install.sh && cd .."
run "rm -rf Radioactive-nord"

log "Fuentes"
run "7z x fonts.7z && mv fonts/fonts/* fonts && rm -rf fonts/fonts"
run "mv fonts ~/.local/share"
run "rm -rf fonts.7z"

log "Kvantum"
run "unzip -o Kvantum-theme.zip"
run "sudo apt install -y qt5-style-kvantum qt-style-kvantum-themes"
run "mv Kvantum ~/.config"
run "rm -rf Kvantum-theme.zip"

# =========================
# CONFIG VISUAL
# =========================

log "Aplicando configuración visual"

run "gsettings set org.gnome.desktop.interface gtk-theme 'Everblush'"
run "gsettings set org.gnome.desktop.interface icon-theme 'Nordzy-cyan-dark-MOD'"
run "gsettings set org.gnome.desktop.interface font-name 'Roboto Regular 10'"
run "gsettings set org.gnome.desktop.interface monospace-font-name 'JetBrainsMono Nerd Font Mono Medium 10'"

run "xfconf-query -c xfwm4 -p /general/theme -s 'Everblush-xfwm'"
run "xfconf-query -c xsettings -p /Gtk/CursorThemeName -s 'Radioactive-nord' --create -t string"
run "xfconf-query -c xfce4-desktop -p /desktop-icons/style -s 0 --create -t int"

# =========================
# WALLPAPERS
# =========================

log "Wallpapers"
run "unzip -o wallpapers.zip"
run "mv wallpapers ~/.local/share"
run "rm -rf wallpapers.zip"

echo
warn "Configura fondo manualmente en:"
echo "/home/kali/.local/share/wallpapers"
echo "Recomendado: mechanic-keyboard.png"
pause

# =========================
# LIGHTDM
# =========================

log "Configurando LightDM"

run "cd ~/.themes && sudo cp -R Everblush /usr/share/themes"
run "cd ~/.local/share/icons && sudo cp -R Nordzy-cyan-dark-MOD /usr/share/icons"

run "sudo sed -i -e 's/theme-name = .*/theme-name = Everblush/' -e 's/icon-theme-name = .*/icon-theme-name = Nordzy-cyan-dark-MOD/' -e 's/background = .*/background = \/home\/kali\/.local\/share\/wallpapers\/mechanic-keyboard.png/' -e '/^$/a background-color = #232a2d' /etc/lightdm/lightdm-gtk-greeter.conf"

warn "Configura color manual en LightDM: #232a2d"
pause

# =========================
# PICOM
# =========================

log "Instalando Picom"

run "sudo apt install -y libxext-dev libxcb1-dev libxcb-damage0-dev libxcb-xfixes0-dev libxcb-shape0-dev libxcb-render-util0-dev libxcb-render0-dev libxcb-randr0-dev libxcb-composite0-dev libxcb-image0-dev libxcb-present-dev libxcb-xinerama0-dev libxcb-glx0-dev libpixman-1-dev libdbus-1-dev libconfig-dev libgl1-mesa-dev libpcre2-dev libpcre3-dev libevdev-dev libev-dev libx11-xcb-dev meson uthash-dev"

run "git clone https://github.com/yshui/picom.git"

run "cd picom && sudo apt install -y libxcb-util-dev libepoxy-dev && git submodule update --init --recursive && meson --buildtype=release . build && ninja -C build && sudo ninja -C build install"

run "rm -rf picom"

run "unzip -o picom-config.zip"
run "mv picom-config/picom.conf ~/.config"
run "rm -rf picom-config picom-config.zip"

run "sed -i -e 's/^backend = \"glx\";$/# backend = \"glx\";/' -e 's/^# backend = \"xrender\";$/backend = \"xrender\";/' ~/.config/picom.conf"

run "xfconf-query -c xfwm4 -p /general/use_compositing -s false"

cat > ~/.config/autostart/picom.desktop << 'EOF'
[Desktop Entry]
Type=Application
Name=Picom Startup
Exec=picom
Terminal=false
EOF

# =========================
# XFCE PANEL COMPLETO
# =========================

log "Configurando XFCE Panel"

run "xfce4-panel --quit && pkill xfconfd"

run "unzip -o home-config.zip"
run "mv home-config/.assets ~/ && mv ~/.profile ~/.profile-00 && mv home-config/.profile home-config/.Xresources ~/"
run "rm -rf home-config home-config.zip"

run "unzip -o gtk-3.0-css.zip"
run "mv gtk-3.0/gtk.css ~/.config/gtk-3.0"
run "rm -rf gtk-3.0 gtk-3.0-css.zip"

run "unzip -o xfce4-config.zip"
run "mv genmon-scripts ~/ && mv ~/.config/xfce4 ~/.config/xfce4-00 && mv xfce4 ~/.config"
run "rm -rf xfce4-config.zip"

run "sudo apt install -y xfce4-docklike-plugin"

run "sed -i 's/^INFO+=\"<txt>\${CPU}%<\/txt>\"$/# &/' ~/genmon-scripts/cpu.sh"
run "sed -i 's/^INFO+=\"<txt>\${MEM}%<\/txt>\"$/# &/' ~/genmon-scripts/mem.sh"
run "sed -i 's/^INFO+=\"<txt>\${TIME}<\/txt>\"$/# &/' ~/genmon-scripts/datetime.sh"

run "xfce4-panel &"

warn "Configura manualmente los Generic Monitor (CPU/MEM/TIME)"
pause

run "sudo apt install -y xfce4-dev-tools libstartup-notification0-dev libwnck-3-dev libxfce4ui-2-dev libxfce4panel-2.0-dev"

# =========================
# EWW
# =========================

log "Instalando EWW"

run "sudo apt install -y alsa-utils brightnessctl jq playerctl"

# Instalar Rust
run "curl https://sh.rustup.rs -sSf | sh -s -- -y"

export PATH="$HOME/.cargo/bin:$PATH"

# Verificación opcional
if ! command -v cargo &>/dev/null; then
    error "Cargo no está disponible tras instalar Rust"
    exit 1
fi

run "git clone https://github.com/elkowar/eww"

run "cd eww && sudo apt install -y libdbusmenu-glib-dev libdbusmenu-gtk3-dev && $HOME/.cargo/bin/cargo build --release && sudo mv target/release/eww /usr/bin"

run "rm -rf eww"

run "unzip -o eww-config.zip"
run "mv eww ~/.config"
run "rm -rf eww-config.zip"

warn "EWW: Shift+S"
pause

# =========================
# FINDEX
# =========================

log "Instalando Findex"

run "sudo apt install -y libkeybinder-3.0-dev"
run "git clone https://github.com/mdgaziur/findex.git && cd findex && ./installer.sh && cd .. && rm -rf findex"

cat > ~/.config/autostart/findex-search.desktop <<'EOF'
[Desktop Entry]
Type=Application
Name=Findex search
Exec=findex
Terminal=false
EOF

warn "Findex: Shift+Espacio"
pause

# =========================
# I3LOCK
# =========================

log "i3lock"

run "unzip i3lock-color-everblush.zip"
run "sudo apt install -y i3lock-color"
run "xfconf-query --create -c xfce4-session -p /general/LockCommand -t string -s 'i3lock-everblush'"
run "sudo mv i3lock-color-everblush/i3lock-everblush /usr/bin"
run "echo 'Hidden=true' | sudo tee -a /etc/xdg/autostart/xfce4-screensaver.desktop"

# =========================
# NEOFETCH
# =========================

log "Instalando Neofetch"

run "sudo apt install -y git"

run "git clone https://github.com/dylanaraps/neofetch.git && cd neofetch && sudo make install && cd .. && cp neofetch/neofetch /usr/bin && rm -rf neofetch"

run "mkdir -p ~/.config/neofetch"

run "unzip neofetch-custom.zip && cp -r neofetch/* ~/.config/neofetch/"

run "rm -rf neofetch i3lock-color-everblush i3lock-color-everblush.zip findex-config.zip neofetch-custom.zip"

# =========================
# KEYBOARD SPANISH
# =========================

cat > ~/.config/autostart/teclado-espanol.desktop <<'EOF'
[Desktop Entry]
Type=Application
Name=Teclado Español
Comment=Teclado en español
Exec=setxkbmap es
X-GNOME-Autostart-enabled=true
Terminal=false
EOF

# =========================
# FINAL
# =========================

ok "Instalación completada"

read -p "¿Reiniciar ahora? (y/n): " r

if [[ "$r" == "y" ]]; then
    sudo reboot
else
    warn "Reinicia manualmente para aplicar cambios"
fi