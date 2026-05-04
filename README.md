# Taw3ya — Quran & Azkar (Vite + React JS)

A plain JavaScript port of the Taw3ya app, built with **Vite + React 18 + TailwindCSS v4 + FontAwesome**. Includes the Quran reader (114 surahs, 28 translations, Mishary Alafasy audio, verse-range search) and Azkar (130+ categories with built-in counter).

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.

> If the `islam.js` Quran data fails to load on first install, run:
> ```bash
> cd node_modules/islam.js && node scripts/postinstall.js
> ```

## Build

```bash
npm run build
npm run preview
```

## Tech

- React 18 + React Router v6
- Vite 5
- TailwindCSS v4 (CSS-based config in `src/index.css`)
- FontAwesome icons
- framer-motion animations
- `islam.js` for Quran + Azkar data
