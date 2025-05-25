// By: 𖧄 𝐋𝐔𝐂𝐀𝐒 𝐌𝐎𝐃 𝐃𝐎𝐌𝐈𝐍𝐀 𖧄
// Canal: https://whatsapp.com/channel/0029Va6riekH5JLwLUFI7P2B

class NickGenerator {
static #version = '2.0.0';

static init() {
document.getElementById('generateBtn').addEventListener('click', () => this.generate());
document.getElementById('mainInput').addEventListener('keypress', (e) => {
if (e.key === 'Enter') this.generate();
});
}

static async generate() {
const input = document.getElementById('mainInput').value.trim();
if (!input) return this.#showError('Digite um texto para gerar os nicks!');
try {
this.#showLoader();
const startTime = Date.now();
const [fontsResponse, decoratedResponse] = await Promise.all([
fetch(`/nicks/generate?nick=${encodeURIComponent(input)}`),
fetch(`/nicks/decorated?nick=${encodeURIComponent(input)}`)
]);
if (!fontsResponse.ok || !decoratedResponse.ok) {
throw new Error(`HTTP error! status: ${fontsResponse.status} / ${decoratedResponse.status}`);
}
const [fontsData, decoratedData] = await Promise.all([
fontsResponse.json(),
decoratedResponse.json()
]);
if (fontsData.status === 'error' || decoratedData.status === 'error') {
throw new Error(fontsData.message || decoratedData.message);
}
this.#renderResults(fontsData, decoratedData);
this.#logPerformance(startTime);
} catch (error) {
this.#showError(error.message);
} finally {
this.#hideLoader();
}
}

static #renderResults(fonts, decorated) {
const resultsContainer = document.getElementById('results');
resultsContainer.innerHTML = this.#createResultsTemplate(fonts, decorated);
this.#initInteractiveElements();
}

static #createResultsTemplate(fonts, decorated) {
return `
<h3 class="neon-glow mb-4">
<i class="fas fa-file-code me-2"></i>Resultados para: 
<span class="text-danger">${this.#escapeHtml(fonts.original)}</span>
<small class="text-muted d-block mt-2">
${new Date(fonts.timestamp).toLocaleString()} | 
${fonts.count + decorated.count} variações
</small>
</h3>

<ul class="nav nav-tabs mb-4" id="resultsTabs">
<li class="nav-item">
<button class="nav-link active" data-bs-toggle="tab" data-bs-target="#fontsTab">
<i class="fas fa-font me-2"></i>Fontes (${fonts.count})
</button>
</li>
<li class="nav-item">
<button class="nav-link" data-bs-toggle="tab" data-bs-target="#decoratedTab">
<i class="fas fa-paint-brush me-2"></i>Decorados (${decorated.count})
</button>
</li>
</ul>

<div class="tab-content">
${this.#createFontsTab(fonts.results)}
${this.#createDecoratedTab(decorated.variants)}
</div>
`;
}

static #createFontsTab(results) {
return `
<div class="tab-pane fade show active" id="fontsTab">
<div class="row g-4">
${results.map((font, index) => this.#createFontCard(font, index + 1)).join('')}
</div>
</div>
`;
}

static #createDecoratedTab(variants) {
return `
<div class="tab-pane fade" id="decoratedTab">
<div class="row g-4">
${variants.map((variant, index) => this.#createDecoratedCard(variant, index + 1)).join('')}
</div>
</div>
`;
}

static #createFontCard(font, index) {
return `
<div class="col-12 col-md-6 col-lg-4">
<div class="cyber-card h-100">
<div class="d-flex justify-content-between align-items-center mb-3">
<div>
<small class="text-neon">${index.toString().padStart(2, '0')}.</small>
<span class="ms-2 text-uppercase small">${this.#escapeHtml(font.style)}</span>
</div>
<button class="btn copy-btn" 
data-bs-toggle="tooltip" 
title="Copiar Nick" 
onclick="NickGenerator.copyToClipboard('${this.#escapeHtml(font.nick)}')">
<i class="fas fa-copy"></i>
</button>
</div>
<div class="font-preview text-center">${font.nick}</div>
</div>
</div>
`;
}

static #createDecoratedCard(variant, index) {
return `
<div class="col-12 col-md-6 col-lg-4">
<div class="cyber-card h-100">
<div class="d-flex justify-content-between align-items-center mb-3">
<div>
<small class="text-neon">${index.toString().padStart(2, '0')}.</small>
<span class="ms-2 small">Variação Decorada</span>
</div>
<button class="btn copy-btn" 
data-bs-toggle="tooltip" 
title="Copiar Nick" 
onclick="NickGenerator.copyToClipboard('${this.#escapeHtml(variant)}')">
<i class="fas fa-copy"></i>
</button>
</div>
<div class="font-preview text-center">${variant}</div>
</div>
</div>
`;
}

static #initInteractiveElements() {
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
[...tooltipTriggerList].forEach(tooltipTriggerEl => {
new bootstrap.Tooltip(tooltipTriggerEl);
});
const tabEl = document.querySelector('#resultsTabs button[data-bs-toggle="tab"]');
if (tabEl) new bootstrap.Tab(tabEl);
}

static #escapeHtml(text) {
return text
.replace(/&/g, '&amp;')
.replace(/</g, '&lt;')
.replace(/>/g, '&gt;')
.replace(/"/g, '&quot;')
.replace(/'/g, '&#039;');
}

static #showLoader() {
const loader = document.createElement('div');
loader.id = 'cyberLoader';
loader.innerHTML = `
<div class="cyber-loader">
<div class="cyber-spinner">
<div class="hexagon"></div>
<div class="spinner-border text-danger" role="status"></div>
</div>
<div class="cyber-progress">
<div class="progress-bar"></div>
</div>
</div>
`;
document.body.appendChild(loader);
}

static #hideLoader() {
const loader = document.getElementById('cyberLoader');
if (loader) loader.remove();
}

static #logPerformance(startTime) {
const loadTime = Date.now() - startTime;
console.log(`%cPerformance: ${loadTime}ms`, 'color: #2ed573; font-weight: bold;');
}

static #showError(message) {
const errorDiv = document.createElement('div');
errorDiv.className = 'cyber-alert';
errorDiv.innerHTML = `
<div class="alert alert-danger alert-dismissible fade show" role="alert">
<i class="fas fa-exclamation-triangle me-2"></i>
${this.#escapeHtml(message)}
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`;
document.body.prepend(errorDiv);
}

static copyToClipboard(text) {
navigator.clipboard.writeText(text)
.then(() => this.#showToast('Copiado para área de transferência!'))
.catch(() => this.#showError('Erro ao copiar texto!'));
}
static #showToast(message) {
const toastContainer = document.createElement('div');
toastContainer.className = 'cyber-toast-container';
toastContainer.innerHTML = `
<div class="toast cyber-toast" role="alert" data-bs-autohide="true" data-bs-delay="1500">
<div class="toast-body">
<i class="fas fa-check-circle me-2 text-success"></i>
${message}
</div>
</div>
`;
document.body.appendChild(toastContainer);
const toast = new bootstrap.Toast(toastContainer.querySelector('.toast'));
toast.show();
toastContainer.addEventListener('hidden.bs.toast', () => {
toastContainer.remove();
});
}
}

document.addEventListener('DOMContentLoaded', () => NickGenerator.init())

document.addEventListener('DOMContentLoaded', function() {
const audio = document.getElementById('backgroundAudio')
audio.volume = 0.4
audio.loop = true
const playOnInteraction = () => {
try {
audio.play()
.then(() => {
removeEventListeners()
})
.catch(error => console.error('Erro ao reproduzir:', error))
} catch (error) {
console.error('Erro:', error)
}
}
const events = ['click', 'touchstart', 'mousemove', 'keydown', 'scroll', 'drag', 'pointerdown']
const removeEventListeners = () => {
events.forEach(event => {
document.removeEventListener(event, playOnInteraction)
})
}
events.forEach(event => {
document.addEventListener(event, playOnInteraction, { once: true })
})
})