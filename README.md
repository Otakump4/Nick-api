<!-- Icon offset for Markdown render -->
<div style="margin-left: 2rem;"></div>

# Nick-API 👞👂

![Banner](https://placehold.co/1920x400/000000/FFFFFF/png?text=Nick-API+♂️+Crie+nicks+incríveis+para+seus+jogos!&font=raleway)

<p align="center">
  <a href="https://github.com/Otakump4/Nick-api">
    <img src="https://img.shields.io/github/stars/Otakump4/Nick-api?style=social" alt="GitHub stars" />
  </a>
  <img src="https://img.shields.io/badge/version-2.0.0-brightgreen" alt="Versão" />
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="Licença" />
  <img src="https://img.shields.io/badge/node.js-18.x-green" alt="Node.js" />
</p>

---

## 📖 Sumário

- [✨ Sobre](#-sobre)  
- [🚀 Recursos](#-recursos)  
- [⚙️ Instalação](#️-instalação)  
- [💡 Exemplos de Uso](#-exemplos-de-uso)  
- [📚 Endpoints](#-endpoints)  
- [🛠 Tecnologias](#-tecnologias)  
- [🧑‍💻 Autor](#-autor)  
- [📄 Licença](#-licença)  

---

## ✨ Sobre

O **Nick-API** é um serviço leve em **Node.js + Express** que gera variações estilizadas de nicks para games, streams e redes sociais. Escolha entre mais de 35 fontes e diversas decorações para destacar seu nickname em qualquer plataforma!

---

## 🚀 Recursos

- 🎨 **+35 fontes** tipográficas  
- 🔣 **Variações decoradas** com símbolos e emojis  
- ⚡️ Rápida geração via endpoint REST  
- 🌐 Uso simples em **qualquer** projeto web ou bot  

---

## ⚙️ Instalação

1. Clone o repositório:  
   ```sh
   git clone https://github.com/Otakump4/Nick-api.git
   ```
2. Entre na pasta do projeto e instale dependências:  
   ```sh
   cd Nick-api
   ```
   ```sh
   npm install
   ```
3. Inicie a API:  
   ```sh
   sh start.sh
   ```
   > Por padrão, a aplicação roda em `http://localhost:4000`

---

## 💡 Exemplos de Uso

### JavaScript (Fetch)
```js
fetch('http://localhost:4000/nicks/generate?nick=Player')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### cURL
```sh
curl "http://localhost:4000/nicks/generate?nick=Gamer123"
```

---

## 📚 Endpoints

<details>
  <summary><strong>GET /nicks/generate</strong> – Gera variações tipográficas</summary>

```http
GET /nicks/generate?nick=<seu_nick>
```

**Resposta Exemplo**  
```json
{
  "original": "Player",
  "fonts": [
    { "font": "boldSerif", "nick": "𝗣𝗹𝗮𝘆𝗲𝗿" },
    { "font": "script",    "nick": "𝓟𝓵𝓪𝔂𝓮𝓻" },
    ...
  ]
}
```
</details>

<details>
  <summary><strong>GET /nicks/decorated</strong> – Aplica decorações</summary>

```http
GET /nicks/decorated?nick=<seu_nick>
```

**Resposta Exemplo**  
```json
{
  "original": "Demo",
  "variants": [
    "🚐Demo1",
    "✨Demo✨",
    ...
  ]
}
```
</details>

---

## 🛠 Tecnologias

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express" />
</p>

---

## 🧑‍💻 Autor

<p align="center">
  <img src="https://zero-two.info/uploads/images/file-1748107531316-459394158.jpeg" width="80" height="80" alt="Foto do autor" />
  <br />
  <strong>@lucas_mod_domina</strong>  
  <a href="https://wa.me/559491569380">Contate-me no WhatsApp</a>
</p>

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License**.  
Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
