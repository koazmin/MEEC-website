# MEEC Website — redesign

A modern, interactive redesign of [meec.edu.mm](https://meec.edu.mm/) for Mahar Euporia
Education Centre. All copy and photography are taken from the original site; the design,
layout, and interactions are new.

> 📖 **Maintenance & operations guide (Burmese): [MAINTENANCE.md](MAINTENANCE.md)** —
> hosting/DNS/email setup, content-editing recipes, troubleshooting, and checklists.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **Tailwind CSS v4**
- **Framer Motion** (scroll reveals, animated counters, program filter, lightbox)
- Fonts: Fraunces (display) + Plus Jakarta Sans (body) + Noto Sans Myanmar

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start   # production
```

## Pages

```
/                  Home — parallax hero, stats, mission, values, programs, gallery, contact
/about             Vision, mission, core values, leadership team, teaching approach
/programs          Full catalogue (filter tabs) + entry-requirements table
/japanese          Japanese language classes — JLPT prep, study in Japan, skilled-worker training
/oes               Overseas Education Services — counselling, applications, visas
/mvi               Mahar Vocational Institute — maritime training courses
/blog              Post listing  →  /blog/[slug]  post detail
/recruitments      Work with us — why join, how to apply
/contact           Address, phones, map, inquiry form, socials
```

## Structure

```
app/
  layout.tsx        fonts, metadata, skip-link
  page.tsx          homepage composition (overlay header)
  globals.css       design tokens (@theme) + base styles
  about|programs|oes|mvi|blog|recruitments|contact/page.tsx
components/
  SiteShell         header + footer + floating contact wrapper for inner pages
  SiteHeader        route nav, active state, transparent-over-hero on home
  PageHero          inner-page header band
  Hero              home parallax/video hero with banner crossfade
  Programs          interactive filter cards
  Gallery           lightbox + staggered reveals
  Counter Reveal Parallax SubscribeForm FloatingContact SiteFooter Icon
lib/content.ts      all real MEEC copy (single source of truth)
public/meec/        original images downloaded from meec.edu.mm
```

## Design system

- Colors: deep teal-green `#0F6E56` (brand) · warm gold accent `#D98A3D` · warm paper `#FBFAF6`
- Built to a quality floor: responsive (375px → desktop), visible focus states,
  `prefers-reduced-motion` respected, WebP images with reserved dimensions.

## Status

- Live at **https://www.meec.edu.mm** (Vercel, auto-deploys from `main`).
- Contact form delivers to `inquiry@meec.edu.mm` via the school's cPanel SMTP
  (`app/api/inquiry/route.ts`, nodemailer) — env vars documented in MAINTENANCE.md.
- Blog supports YouTube videos (including Shorts) via a `youtube` field on posts.
