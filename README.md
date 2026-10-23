# Pilar Martínez — Portfolio Web

Sitio portfolio interactivo de **Pilar Martínez**, Analista de Comunicación y Publicidad (Rosario, Argentina).

## ✨ Características

- Diseño editorial elegante con tipografía Fraunces + Manrope
- Preloader animado con contador
- Cursor personalizado y botones magnéticos
- Tema claro / oscuro (persistente)
- Animaciones on-scroll (reveal, contadores, timeline, texto palabra por palabra)
- Marquee infinito con especialidades
- 100% responsive y accesible (`prefers-reduced-motion` soportado)
- Sin dependencias: HTML + CSS + JS vanilla

## 🗂️ Estructura

```
├── index.html          # Página principal
├── styles.css          # Estilos
├── script.js           # Interacciones
├── favicon.svg         # Ícono
└── assets/
    ├── pilar.png               # Foto de perfil
    └── CV_Pilar_Martinez.pdf   # CV descargable
```

## 🚀 Deploy

### GitHub

```bash
git init
git add .
git commit -m "Portfolio Pilar Martínez 2026"
git branch -M main
git remote add origin https://github.com/<usuario>/<repo>.git
git push -u origin main
```

### Vercel

1. Entrá a [vercel.com](https://vercel.com) → **Add New → Project**
2. Importá el repo de GitHub
3. No hace falta configurar nada (sitio estático) → **Deploy**

## 🛠️ Desarrollo local

Abrí `index.html` directamente o servilo con:

```bash
npx serve .
```
