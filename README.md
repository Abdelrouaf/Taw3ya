# Taw3ya — Quran & Azkar

A modern, responsive Islamic web app for reading the Holy Quran and reciting daily Azkar (remembrances). Built with a warm, premium aesthetic and a focus on readability, the app brings together Quran recitation, multilingual translations, and authentic supplications in one clean interface.

## ✨ Features

### 📖 Quran
- **All 114 Surahs** with original Arabic text in the Amiri typeface (RTL, scholarly typography).
- **Multilingual translations** — English, Urdu, French, Indonesian, Turkish, Spanish, Russian, German, Bengali, Chinese, Persian, Malay, and more.
- **Full-surah audio recitation** by Sheikh Mishary Alafasy with seekable progress bar, play/pause/stop and prev/next controls.
- **Smart surah search** — filter by Arabic name, English name, or index number.
- **Verse-range search** — read a specific passage by selecting Surah / Start verse / End verse.
- **Meccan / Medinan tags** and verse counts for every surah.

### 🤲 Azkar
- **All categories** of authentic remembrances: Morning, Evening, After Prayer, Sleeping, Waking, and more.
- **Interactive counter** for each zikr — tap to increment, auto-resets when the recommended count is reached.
- **Progress persistence** via `localStorage` so your count survives accidental refreshes.
- **Copy-to-clipboard** on every zikr and a clean RTL drawer interface.

### 🎨 Design
- Dark, warm, premium aesthetic with copper/amber accents.
- Cream "paper" reader card with ornamental gold borders for long-form Arabic.
- Smooth Framer Motion animations.
- Fully responsive — desktop two-column reader, sticky audio bar on tablet, single-column mobile layout with hamburger nav.
- Accessible — ARIA labels, visible focus rings, keyboard navigation.

## 🛠 Tech Stack
- **TanStack Start** (React 19 + Vite 7, SSR-ready)
- **Tailwind CSS v4** with semantic design tokens
- **shadcn/ui** primitives
- **Framer Motion** for animations
- **islam.js** for Quran text and Azkar data
- **AlQuran.cloud CDN** for audio recitation

## 🚀 Getting Started

```bash
bun install
bun run dev
