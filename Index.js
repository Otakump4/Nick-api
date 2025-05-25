//By: 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄
//Canal: https://whatsapp.com/channel/0029Va6riekH5JLwLUFI7P2B

import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import chalk from 'chalk'
import morgan from 'morgan'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 4000
const criador = "@lucas_mod_domina"

const logger = {
success: (...args) => console.log(chalk.green(chalk.bold('[SUCCESS]'), ...args)),
error: (...args) => console.log(chalk.red(chalk.bold('[ERROR]'), ...args)),
debug: (...args) => console.log(chalk.blue(chalk.bold('[DEBUG]'), ...args)),
request: (...args) => console.log(chalk.yellow(chalk.bold('[REQUEST]'), ...args)),
system: (...args) => console.log(chalk.magenta(chalk.bold('[SYSTEM]'), ...args))
}

app.use(express.static(path.join(__dirname, 'public'), {
setHeaders: (res) => {
res.setHeader('X-Powered-By', 'Lucas Fonts Generator')
res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
}
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan((tokens, req, res) => {
const status = tokens.status(req, res)
const method = tokens.method(req, res)
const url = tokens.url(req, res)
const responseTime = tokens['response-time'](req, res)
const logParts = [
chalk.hex('#34ace0').bold(method),
chalk.hex('#ffb142')(url),
chalk.hex('#ff5252').bold(status),
chalk.hex('#2ed573')(`${responseTime}ms`),
chalk.hex('#1e90ff')(req.headers['user-agent'])
]
logger.request(...logParts)
return null
}))

// ========== SISTEMA DE FONTES ==========
const fontStyles = {
// Estilos básicos
boldSerif: t => convertRange(t, 0x1D400),
boldSans: t => convertRange(t, 0x1D5D4),
italic: t => convertRange(t, 0x1D434),
boldItalic: t => convertRange(t, 0x1D468),
script: t => convertRange(t, 0x1D49C),
boldScript: t => convertRange(t, 0x1D4D0),
fraktur: t => convertRange(t, 0x1D504),
boldFraktur: t => convertRange(t, 0x1D56C),
monospace: t => convertRange(t, 0x1D670),
doubleStruck: t => convertRange(t, 0x1D538),
sansSerif: t => convertRange(t, 0x1D5A0),
sansBold: t => convertRange(t, 0x1D5D4),
sansItalic: t => convertRange(t, 0x1D608),
sansBoldItalic: t => convertRange(t, 0x1D63C),
// Estilos especiais
circled: t => convertRange(t, 0x24B6, 0x24D0),
squared: t => convertRange(t, 0x1F130, 0x1F150),
negativeSquared: t => convertRange(t, 0x1F170, 0x1F190),
parenthesized: t => Array.from(t).map(c => `(${c})`).join(''),
fullwidth: t => convertRange(t, 0xFF21, 0xFF41),
smallCaps: t => t.toLowerCase().split('').map(c => 
String.fromCodePoint(c.charCodeAt(0) + (c >= 'a' && c <= 'z' ? 0x1D68 : 0))).join(''),
// Estilos internacionais
cyrillic: t => t.replace(/[a-zA-Z]/g, m => {
const map = {
'A': 'А', 'B': 'В', 'C': 'С', 'E': 'Е', 'H': 'Н', 
'K': 'К', 'M': 'М', 'O': 'О', 'P': 'Р', 'T': 'Т',
'X': 'Х', 'a': 'а', 'c': 'с', 'e': 'е', 'o': 'о',
'p': 'р', 'x': 'х', 'y': 'у'
}
return map[m] || m
}),
runic: t => convertRange(t, 0x16A0).replace(/[^a-zA-Z]/g, ''),
greek: t => t.replace(/[a-zA-Z]/g, m => {
const grMap = {
'A': 'Α', 'B': 'Β', 'C': 'Ψ', 'D': 'Δ', 'E': 'Ε',
'F': 'Φ', 'G': 'Γ', 'H': 'Η', 'I': 'Ι', 'J': 'Ξ',
'K': 'Κ', 'L': 'Λ', 'M': 'Μ', 'N': 'Ν', 'O': 'Ο',
'P': 'Π', 'Q': 'Θ', 'R': 'Ρ', 'S': 'Σ', 'T': 'Τ',
'U': 'Υ', 'V': 'Ω', 'W': 'Ξ', 'X': 'Χ', 'Y': 'Υ',
'Z': 'Ζ', 'a': 'α', 'b': 'β', 'c': 'ψ', 'd': 'δ',
'e': 'ε', 'f': 'φ', 'g': 'γ', 'h': 'η', 'i': 'ι',
'j': 'ξ', 'k': 'κ', 'l': 'λ', 'm': 'μ', 'n': 'ν',
'o': 'ο', 'p': 'π', 'q': 'θ', 'r': 'ρ', 's': 'σ',
't': 'τ', 'u': 'υ', 'v': 'ω', 'w': 'ξ', 'x': 'χ',
'y': 'υ', 'z': 'ζ'
}
return grMap[m] || m
}),
hebrew: t => convertRange(t, 0x5D0),
arabic: t => convertRange(t, 0x621),
// Estilos decorativos
inverted: t => Array.from(t).reverse().map(c => 
String.fromCodePoint(0xFFFD - c.charCodeAt(0))).join(''),
upsideDown: t => t.split('').map(c => upsideDownMap[c] || c).reverse().join(''),
morse: t => t.toUpperCase().split('').map(c => morseCode[c] || c).join(' '),
braille: t => t.toUpperCase().split('').map(c => 
c.charCodeAt(0) > 255 ? c : String.fromCodePoint(0x2800 + c.charCodeAt(0))).join(''),
zalgo: t => zalgoGenerator(t),
// Estilos matemáticos
mathBold: t => convertRange(t, 0x1D400),
mathItalic: t => convertRange(t, 0x1D434),
mathBoldItalic: t => convertRange(t, 0x1D468),
mathScript: t => convertRange(t, 0x1D49C),
mathDoubleStruck: t => convertRange(t, 0x1D538),
// Estilos extras
gothic: t => convertRange(t, 0x10330),
glitch: t => t.split('').map(c => `${c}\u0301`).join(''),
wave: t => t.split('').map((c,i) => i%2 === 0 ? c.toUpperCase() : c.toLowerCase()).join(''),
bubble: t => t.split('').map(c => `(${c})`).join(''),
subscript: t => convertRange(t, 0x2080, false, -0x3A),
superscript: t => convertRange(t, 0x2070)
}

// ========== FUNÇÕES AUXILIARES ==========
const convertRange = (text, startUpper, startLower = startUpper + 26) => {
return text.split('').map(c => {
const code = c.charCodeAt(0)
if (code >= 65 && code <= 90) { // A-Z
return String.fromCodePoint(startUpper + (code - 65))
} else if (code >= 97 && code <= 122) { // a-z
return String.fromCodePoint(startLower + (code - 97))
} else {
return c
}
}).join('')
}
const upsideDownMap = {
a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ',
h: 'ɥ', i: 'ᴉ', j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u',
o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n',
v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z', ' ': ' '
}
const morseCode = {
'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
'3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
'8': '---..', '9': '----.'
}
const zalgoGenerator = (text) => {
const zalgoChars = ['\u030D','\u030E','\u0304','\u0305','\u033F','\u0311','\u0306','\u0310','\u0352','\u0357','\u0351','\u0307','\u0308','\u030A','\u0342','\u0343']
return text.split('').map(c => c + zalgoChars[Math.floor(Math.random() * zalgoChars.length)]).join('')
}

// ========== ROTAS ==========
const setupRoutes = () => {
const staticRoutes = ['/', '/terms', '/privacy', '/api']
staticRoutes.forEach(route => {
app.get(route, (req, res) => {
logger.debug(`Acesso à rota estática: ${route}`)
res.sendFile(path.join(__dirname, 'public', `${route === '/' ? 'index' : route}.html`))
})
})

app.get('/nicks/generate', async (req, res) => {
try {
const { nick } = req.query
logger.request(`Solicitação de geração para: ${nick}`)
if (!nick) {
logger.error('Nick não fornecido')
return res.status(400).json({ status: 'error', message: 'Parâmetro "nick" é obrigatório', example: '/nicks/generate?nick=SeuNick' })
}
const results = Object.entries(fontStyles).map(([style, generator]) => ({ style, nick: generator(nick)}))
logger.success(`Nick gerado com sucesso: ${nick}`)
res.json({ status: 'success', criador: `${criador}`, original: nick, count: results.length, timestamp: new Date().toISOString(), results })
} catch (error) {
logger.error(`Erro na geração: ${error.message}`)
res.status(500).json({ status: 'error', message: 'Falha na geração de nicks', error: error.message })
}
})

app.get('/nicks/decorated', async (req, res) => {
try {
const { nick } = req.query
logger.request(`Solicitação de decoração para: ${nick}`)
if (!nick) {
logger.error('Nick não fornecido')
return res.status(400).json({ status: 'error', message: 'Parâmetro "nick" é obrigatório', example: '/nicks/decorated?nick=SeuNick' })
}
const decorators = {
prefix: ['𖧄', '♱', '𓆣', '⛧', '꧁', '☯', '⚡', '✧', '✦', '❂'],
suffix: ['꧂', '♰', '𓃠', '⚛', '✞', '✠', '❁', '✪', '✰', '⋆'],
styles: ['boldSerif', 'fraktur', 'cyrillic', 'script', 'doubleStruck', 'runic', 'gothic']
}
const variants = Array.from({ length: 25 }, () => {
const prefix = decorators.prefix[Math.floor(Math.random() * decorators.prefix.length)]
const suffix = decorators.suffix[Math.floor(Math.random() * decorators.suffix.length)]
const style = decorators.styles[Math.floor(Math.random() * decorators.styles.length)]
return `${prefix} ${fontStyles[style](nick)} ${suffix}`
})
logger.success(`Decoração gerada com sucesso: ${nick}`)
res.json({ status: 'success', criador: `${criador}`, original: nick, count: variants.length, timestamp: new Date().toISOString(), variants })
} catch (error) {
logger.error(`Erro na decoração: ${error.message}`)
res.status(500).json({ status: 'error', message: 'Falha na geração de variantes decoradas', error: error.message })
}
})

app.get('/health', (req, res) => {
res.json({ status: 'healthy', timestamp: new Date().toISOString(), uptime: process.uptime(), memory: process.memoryUsage()})
})
}

// ========== INICIALIZAÇÃO DO SERVIDOR ==========
const startServer = () => {
setupRoutes()
app.listen(PORT, () => {
logger.system(chalk.green.bold(`Servidor ativo em: http://localhost:${PORT}\n\n`))
logger.system(chalk.blue.bold('Ambiente:', process.env.NODE_ENV || 'development'))
logger.system(chalk.blue.bold('Versão Node:', process.version))
logger.system(chalk.blue.bold('Memória inicial:', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB\n\n`))
})
process.on('uncaughtException', (error) => {
logger.error(chalk.red.bold(`Erro crítico: ${error.message}`))
process.exit(1)
})
process.on('unhandledRejection', (reason) => {
logger.error(chalk.red.bold(`Rejeição não tratada: ${reason}`))
})
}

startServer()