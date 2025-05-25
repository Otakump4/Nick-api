#!/usr/bin/env bash

# Definindo cores
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RESET='\033[0m'

animate_text() {
local text="$1"
i=0
length=${#text}

while [ "$i" -lt "$length" ]; do
echo -n "$(echo "$text" | cut -c $((i + 1)))"
sleep 0.05
i=$((i + 1))
done
echo
}
while : 
do

printf "${CYAN}"
animate_text "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ╔═════════════╗"
animate_text "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ║   NICK API  ║"
animate_text "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ╚═════════════╝"
printf "${YELLOW}"
animate_text "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★"
animate_text "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ @lucas_mod_domina"
animate_text "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★"
printf "${YELLOW}"
animate_text "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ • Ativando System Supremacy!"
printf "${RESET}"

node index.js

sleep 1
done
