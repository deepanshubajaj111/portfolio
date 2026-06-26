# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:4321
npm run build     # Static build to /dist
npm run preview   # Preview built site locally
```

No test runner or linter is configured.

## Deployment

Deployed to **GitHub Pages** via `.github/workflows/deploy.yml` (builds `./dist` and publishes on every push to `main`). Because of this, `astro.config.mjs` sets `site: 'https://deepanshubajaj111.github.io'` and `base: '/portfolio'` — the site is served from the `/portfolio` subpath. **Any internal link or asset URL must account for this base path**; use Astro's `import.meta.env.BASE_URL` rather than hardcoding root-relative `/` paths.

## Environment Setup

Copy `.env.example` and populate:
```
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token_here
```

`STRAPI_URL` defaults to `http://localhost:1337` and the token to `''` if unset. If Strapi is unavailable, `src/lib/strapi.ts` automatically falls back to bundled mock data — the dev server works fully offline. See `STRAPI_SETUP.md` for the full content-type schema needed to provision a matching Strapi instance.

## Architecture

**Astro 4 static site** (output: `static`) with Strapi v4 as headless CMS. All data is fetched at build time via `Promise.all()` in `src/pages/index.astro` — there is no client-side data fetching and no SSR.

### Data flow

1. `src/pages/index.astro` calls 7 parallel fetchers at build time
2. All fetchers live in `src/lib/strapi.ts` — one generic `strapiGet<T>()` wraps all requests with the API token and `populate=*`
3. Results are passed as props to section components
4. If the fetch fails or `STRAPI_URL` is unset, `strapi.ts` returns hardcoded fallback data

### CMS content types

| Strapi type | Kind | Used in |
|---|---|---|
| `hero` | Single | `Hero.astro` |
| `about` | Single | `About.astro` |
| `skill-categories` | Collection | `Skills.astro` |
| `experiences` | Collection | `Experience.astro` |
| `projects` | Collection | `Projects.astro` |
| `social-links` | Collection | `Contact.astro`, `Footer.astro` |
| `site-config` | Single | `BaseLayout.astro`, SEO, marquee |

TypeScript interfaces for all types are in `src/types/strapi.ts`.

### Styling

- **Tailwind CSS** for utilities; custom theme tokens in `tailwind.config.mjs` (colors, fonts, animations)
- **CSS custom properties** defined in `src/styles/global.css` (e.g. `--cyan`, `--bg`, `--surface`)
- Dynamic per-element colors use inline `style=` attributes
- Font stack: Syne (display headings) + DM Sans (body), loaded via Google Fonts in `BaseLayout.astro`

### Client-side interactivity

Components are fully static (no Astro `client:*` directives). Interactive behaviour is implemented with plain `<script>` tags inside components, which Astro bundles and hydrates as module scripts:

- **WebGL backgrounds** (`HeroCanvas.astro`, imported by `Hero.astro`) — animated `three.js` particle field rendered to a `<canvas>`; `three` is a runtime dependency. `PageScene.astro` holds a second wireframe-geometry scene.
- **Custom cursor** (`Cursor.astro`) — fixed dot + ring, `requestAnimationFrame` loop
- **Typed text** (`Hero.astro`) — cycles through role strings
- **Scroll reveal** (`global.css` + inline scripts) — `IntersectionObserver` on `.reveal`, `.timeline-entry`, `.project-entry`
- **Project filtering** (`Projects.astro`) — client-side tag filter

`Nav.astro`, `Cursor.astro`, and `Footer.astro` are mounted once in `BaseLayout.astro` and wrap every page.

### Path alias

`@/*` resolves to `./src/*` (configured in `tsconfig.json`).
