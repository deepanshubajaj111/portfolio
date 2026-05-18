# Deepanshu Bajaj — Portfolio

A blazing-fast, dark-themed personal portfolio built with **Astro** + **Tailwind CSS**,
powered by **Strapi** as a headless CMS.

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Framework  | Astro v4 (static output)           |
| Styling    | Tailwind CSS v3                     |
| CMS        | Strapi v4 (headless, REST API)     |
| Fonts      | Syne (display) · DM Sans (body)    |
| Deployment | Vercel (frontend) · Railway (CMS)  |

## Project Structure

```
deepanshu-portfolio/
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Cursor.astro       # Custom magnetic cursor
│   │   ├── Nav.astro          # Sticky navigation
│   │   ├── Hero.astro         # Hero section w/ typed text
│   │   ├── About.astro        # About + info card
│   │   ├── Skills.astro       # Skills grid + tech marquee
│   │   ├── Experience.astro   # Timeline
│   │   ├── Projects.astro     # Projects grid w/ filter
│   │   ├── Contact.astro      # Contact + social links
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── BaseLayout.astro   # SEO, fonts, global scripts
│   ├── lib/
│   │   └── strapi.ts          # All Strapi fetchers + fallback data
│   ├── pages/
│   │   └── index.astro        # Entry point, assembles all sections
│   ├── styles/
│   │   └── global.css         # CSS vars, cursor, reveal animations
│   └── types/
│       └── strapi.ts          # TypeScript interfaces for all CMS types
├── .env.example
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── STRAPI_SETUP.md            # Step-by-step Strapi configuration guide
└── package.json
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment

```bash
cp .env.example .env
# Fill in your Strapi URL and API token
```

### 3. Run development server

```bash
npm run dev
# → http://localhost:4321
```

> The portfolio ships with **complete fallback data** — it works out of the box
> even without Strapi running. Connect Strapi whenever you're ready.

### 4. Connect Strapi CMS

See [STRAPI_SETUP.md](./STRAPI_SETUP.md) for the full guide on:
- Creating all content types
- Setting permissions
- Populating your content
- Deploying to production

## Sections

- **Hero** — Name, typed role, tagline, CTAs, stats
- **About** — Bio, availability card
- **Skills** — 6-category grid, animated tech marquee
- **Experience** — Animated timeline
- **Projects** — Filterable grid with featured project
- **Contact** — Email CTA, social links

## Customisation

All content lives in Strapi (or in the fallback data in `src/lib/strapi.ts`).
Design tokens are CSS variables in `src/styles/global.css`.
To change the accent colour, update `--cyan` and `--cyan-glow` in `:root`.

## Deployment

```bash
npm run build        # Generates static files in /dist
npm run preview      # Preview the build locally
```

Deploy the `/dist` folder to Vercel, Netlify, or any static host.
