//By: 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄
//Canal: https://whatsapp.com/channel/0029Va6riekH5JLwLUFI7P2B

class MatrixEffect {
constructor() {
this.canvas = document.createElement('canvas');
this.ctx = this.canvas.getContext('2d');
this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+';
this.drops = [];
this.fontSize = 15;
this.animationFrameId = null;
this.isAnimating = false;
this.init();
}

init() {
this.canvas.className = 'matrix-bg';
document.body.prepend(this.canvas);
this.resizeCanvas();
// Event listeners
window.addEventListener('resize', () => this.resizeCanvas());
this.start();
}
resizeCanvas() {
this.canvas.width = window.innerWidth;
this.canvas.height = window.innerHeight;
this.columns = Math.floor(this.canvas.width / this.fontSize);
this.drops = Array(this.columns).fill(1);
}
draw() {
// Fundo semi-transparente para efeito de rastro
this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
// Configurar estilo do texto
this.ctx.fillStyle = '#0F0';
this.ctx.font = `${this.fontSize}px monospace`;
// Desenhar caracteres
for (let i = 0; i < this.drops.length; i++) {
const char = this.characters[Math.floor(Math.random() * this.characters.length)];
const x = i * this.fontSize;
const y = this.drops[i] * this.fontSize;
// Desenhar caractere principal
this.ctx.fillStyle = '#0F0';
this.ctx.fillText(char, x, y);
// Adicionar brilho ao caractere líder
if (y > this.canvas.height * 0.3) {
this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
this.ctx.fillText(char, x, y - this.fontSize);
}
// Resetar drop quando chegar no final
if (y > this.canvas.height && Math.random() > 0.975) {
this.drops[i] = 0;
}
this.drops[i]++;
}
// Efeito de scanline
this.ctx.strokeStyle = 'rgba(0, 255, 0, 0.05)';
this.ctx.beginPath();
this.ctx.moveTo(0, Math.random() * this.canvas.height);
this.ctx.lineTo(this.canvas.width, Math.random() * this.canvas.height);
this.ctx.stroke();
this.animationFrameId = requestAnimationFrame(() => this.draw());
}

start() {
if (!this.isAnimating) {
this.isAnimating = true;
this.draw();
}
}

stop() {
if (this.isAnimating) {
cancelAnimationFrame(this.animationFrameId);
this.isAnimating = false;
}
}

setSpeed(speed) {
this.fontSize = Math.max(10, Math.min(25, speed));
this.resizeCanvas();
}
}

// Inicializar efeito
const matrix = new MatrixEffect();
// Opções de controle (pode ser acessado via console)
window.matrixController = {
start: () => matrix.start(),
stop: () => matrix.stop(),
setSpeed: (speed) => matrix.setSpeed(speed)
};

// Configuração inicial
matrix.setSpeed(15);