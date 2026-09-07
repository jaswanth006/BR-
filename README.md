# MBR Smart Analytics — Web App

**Monthly Business Review analytics for Bizom SME field sales.**

## Deploy in 60 seconds

### Option A — Vercel (recommended)
1. Go to [vercel.com](https://vercel.com) → New Project
2. Drag this folder into the deploy zone
3. Done — get a `*.vercel.app` URL

### Option B — Netlify
1. Go to [netlify.com](https://netlify.com) → Sites → Deploy manually
2. Drag this folder → Deploy
3. Done — get a `*.netlify.app` URL

### Option C — GitHub Pages
1. Push folder to a GitHub repo
2. Settings → Pages → Source: main branch
3. Done — get a `*.github.io` URL

## Features
- 📊 Upload CSV/XLSX → instant field sales dashboard
- ⏱ Field discipline, attendance gap, rep scorecard
- 🛒 SKU-level product intelligence
- 📈 Order analytics: AOV per outlet, AOV per day, weekly trends
- ⚠ Zero-order analysis with reason breakdown
- 📍 Outlet coverage gap
- 💡 Bizom module recommendations (pain-point matched)
- 🏆 CEO action plan (auto-generated)
- 🖨 PDF export with headers + 📊 PPT export (7 slides)
- 📅 MBR history (saves 24 months to localStorage)
- 📲 PWA — installable, works offline

## Tech
- Zero backend — 100% browser processing
- Chart.js 4.4, PapaParse 5.4, SheetJS 0.18
- Service worker for offline + caching
