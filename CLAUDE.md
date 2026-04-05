@AGENTS.md

# KOVA Business Discovery Framework

## Project Overview
A Next.js 16 web application for **KOVA (Intelligent Automation)** that guides businesses through AI customer discovery and generates implementation recommendations. Built with TypeScript, Tailwind CSS v4, and React 19.

## Brand Guidelines (from KOVA_Brand_Kit.pdf)
- **Primary color**: Violet `#8B5CF6`
- **Deep violet**: `#6D28D9`
- **Pale violet**: `#C4B5FD`
- **Navy background**: `#0F0D1A` (dark theme throughout)
- **Navy mid**: `#1A1730`, **Navy light**: `#242040`
- **Gold** `#F7A623`: ROI/money figures only
- **Teal** `#2DD4BF`: Success states
- **Red** `#EF4444`: Pain points/issues
- **Display font**: Poppins (Bold for headings)
- **Mono font**: DejaVu Mono (data/numbers)
- **Logo**: Diamond + K mark, wordmark always "KOVA" in all caps
- Colors defined via `@theme inline` in `src/app/globals.css` (Tailwind v4 CSS-based config)

## App Structure
- **`/`** — Landing page (Hero, Features, HowItWorks)
- **`/assessment`** — 5-step guided questionnaire (Company Overview, Workflows, Pain Points, Goals, Tech Stack)
- **`/report`** — AI opportunity report with readiness score, ranked opportunities, roadmap, and JSON export
- **`/implement`** — KOVA internal hub: upload client report JSON, get service recommendations with budget alternatives + task tracker

## Key Architecture
- **State**: React Context + useReducer (`src/context/DiscoveryContext.tsx`)
- **Analysis engine**: Rule-based (`src/lib/analysis.ts`) — scores opportunities against 15 templates in `src/lib/recommendations.ts`
- **Service catalog**: `src/lib/service-catalog.ts` — 22 AI services with budget/mid/premium tiers and linked alternatives
- **Service matcher**: `src/lib/service-matcher.ts` — greedy set cover algorithm for optimal bundle (max coverage, min investment)
- **Report export**: `src/lib/report-export.ts` — JSON export/import for passing data between report and implementation hub
- **Tailwind v4**: Uses `@tailwindcss/postcss`, no `tailwind.config.ts` — all config in CSS `@theme`

## Codespace Notes
- Tailwind v4 native oxide binary requires `rm -rf node_modules package-lock.json .next && npm install` when syncing
- Dev server needs `--hostname 0.0.0.0` for Codespace proxy (already in package.json)
- Google Fonts blocked in build env — Poppins loaded via CSS `@import` in globals.css
