<div align="center">

# Pruthvi Shah — Portfolio

**ML Engineer building intelligent products from idea to deployment**

[![Live Site](https://img.shields.io/badge/Live-https://portfolio-v2-bay-seven.vercel.app-2ea44f?style=for-the-badge)](https://portfolio-v2-bay-seven.vercel.app)
![Next.js](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS%204-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

A modern, animated personal portfolio for **Pruthvi Shah**, a Machine Learning Engineer. Showcases ML engineering projects — RAG systems, custom vector retrieval, time-series forecasting, and AI products — with a polished, motion-heavy UI.

## ✨ Features

- **Animated experience** — boot sequence, custom cursor, ambient background, page transitions, and scroll progress built with Framer Motion (`motion/react`)
- **Featured projects** — curated ML projects with live demos, tech stacks, and key results
- **Project spotlight** — expanded cards with highlights for Football IQ, Custom Retrieval Engine, and Stock Market Forecasting
- **Responsive + accessible** — mobile-first layouts with reduced-motion support
- **SEO-ready** — Open Graph, Twitter cards, and dynamic metadata via `NEXT_PUBLIC_SITE_URL`

## 🛠️ Tech Stack

- **Framework:** Next.js 16 + React 19 (App Router)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion (`motion/react`), custom cursor + boot sequence
- **Language:** TypeScript
- **Deployment:** Vercel

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📦 Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint
npx tsc --noEmit # typecheck
```

## 🔧 Configuration

- Site content (name, title, tech stack) lives in `src/data/site.ts`
- Projects live in `src/data/projects.ts`
- Site URL for metadata comes from `NEXT_PUBLIC_SITE_URL` (falls back to the dev URL)
