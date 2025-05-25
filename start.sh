#!/bin/sh
# By: 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄
# Canal: https://whatsapp.com/channel/0029Va6riekH5JLwLUFI7P2B

# Códigos de cores
CYAN='\033[1;36m'
YELLOW='\033[1;33m'
GREEN='\033[1;32m'
MAGENTA='\033[1;35m'
ORANGE='\033[1;38;5;208m'
NC='\033[0m'

# Largura do terminal
TERMINAL_WIDTH=$(stty size 2>/dev/null | awk '{print $2}' || echo 80)

smart_center() {
text=$1
clean_text=$(printf "%s" "$text" | sed -E 's/\\033\[[0-9;]*m//g')
text_length=${#clean_text}
total_pad=$((TERMINAL_WIDTH - text_length))
[ $total_pad -lt 0 ] && total_pad=0
left_pad=$((total_pad / 2))
printf "%*s%b\033[0m\n" $left_pad "" "$text"
}
show_animation() {
frame=0
while [ $frame -lt 12 ]; do
clear
smart_center "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ  ㅤ${CYAN}╔═════════════╗"
smart_center "ㅤㅤ${CYAN} ㅤ║   NICK API  ║"
smart_center "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ  ${CYAN}╚═════════════╝"
smart_center "${YELLOW}@lucas_mod_domina"
case $((frame % 4)) in
0) stars="★ ☆ ★"; color=$GREEN;;
1) stars="☆ ★ ☆"; color=$CYAN;;
2) stars="★ ☆ ★"; color=$MAGENTA;;
3) stars="☆ ★ ☆"; color=$ORANGE;;
esac
dots=$((frame % 5 + 1))
dot_bar=$(printf "%${dots}s" | tr ' ' '⋅')
empty_bar=$(printf "%$((5 - dots))s" | tr ' ' '·')
smart_center "ㅤㅤㅤㅤㅤㅤㅤ${color}  ${stars}  "
smart_center "${CYAN}[${YELLOW}${dot_bar}${CYAN}${empty_bar}]${NC}"
frame=$((frame + 1))
sleep 0.2
done
}

while true; do
show_animation
node index.js
done
