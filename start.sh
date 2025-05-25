#!/usr/bin/env bash

# ================================
# Script de Inicialização Nick API
# Criado por: @lucas_mod_domina
# Versão: V2
# ================================

# Definição das cores e estilos
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
MAGENTA='\033[0;35m'
BOLD='\033[1m'
RESET='\033[0m'

# Configurações de layout
LARGURA_MOLDURA=40
COLUNAS=$(tput cols 2>/dev/null || echo 80)
MARGEM_ESQUERDA=$(( (COLUNAS - LARGURA_MOLDURA) / 2 ))
ESQUERDA_FORMATADA=$(printf "%${MARGEM_ESQUERDA}s")

centralizar_texto() {
local texto="$1"
local largura="$2"
local padding_esquerdo=$(( (largura - ${#texto}) / 2 ))
printf "%${padding_esquerdo}s%s" "" "$texto"
}

desenhar_moldura() {
printf "%s┍╼" "$ESQUERDA_FORMATADA"
printf '┄%.0s' $(seq 1 $((LARGURA_MOLDURA - 2)))
printf "\n"

while IFS= read -r linha; do
linha_centralizada=$(centralizar_texto "$linha" $LARGURA_MOLDURA)
printf "%s┊%s\n" "$ESQUERDA_FORMATADA" "$linha_centralizada"
done

printf "%s┕┑\n" "$ESQUERDA_FORMATADA"
}

animate_text() {
local text="$1"
local comprimento=${#text}
i=0
while [ $i -lt $comprimento ]; do
char=$(printf "%s" "$text" | cut -c $((i + 1)))
printf "${MAGENTA}${BOLD}%s${RESET}" "$char"
sleep 0.03
i=$((i + 1))
done
printf "\n"
}

loading_bar() {
local duration=$1
local interval=0.1
local iterations=$(awk "BEGIN {print int($duration / $interval)}")
local bar_length=30
i=0

printf "${YELLOW}${BOLD}%s┊├╼" "$ESQUERDA_FORMATADA"
printf '┄%.0s' $(seq 1 $((LARGURA_MOLDURA - 4)))
printf "┑${RESET}\n"

while [ $i -lt $iterations ]; do
progress=$(( i * bar_length / iterations ))
printf "%s┊⎸╳ [" "$ESQUERDA_FORMATADA"
j=0
while [ $j -lt $bar_length ]; do
[ $j -lt $progress ] && printf "#" || printf "-"
j=$((j + 1))
done
printf "]\n"
sleep $interval
[ $i -ne $((iterations - 1)) ] && printf "\033[1A"
i=$((i + 1))
done
printf "%s┕╼" "$ESQUERDA_FORMATADA"
printf '┄%.0s' $(seq 1 $((LARGURA_MOLDURA - 2)))
printf "・${RESET}\n"
}

while :; do
clear

{
echo "Nick API by: @lucas_mod_domina"
echo "Version: V2"
} | desenhar_moldura

animate_text "$(centralizar_texto "Iniciando Sistema..." $LARGURA_MOLDURA)"

loading_bar 3

node index.js

sleep 1
done