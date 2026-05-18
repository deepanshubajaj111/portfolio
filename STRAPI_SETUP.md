# Strapi CMS Setup Guide
## For: Deepanshu Bajaj Portfolio

This guide walks you through creating all the content types in Strapi
that the portfolio fetches at build time.

---

## 1. Install & Run Strapi

```bash
npx create-strapi-app@latest portfolio-cms --quickstart
# Strapi runs at http://localhost:1337
# Admin panel: http://localhost:1337/admin
```

---

## 2. Create an API Token

1. Go to **Settings → API Tokens → Create new API Token**
2. Name: `Portfolio Read Token`
3. Token type: `Read-only`
4. Copy the token → paste into your `.env` file as `STRAPI_API_TOKEN`

---

## 3. Content Types to Create

Go to **Content-Type Builder** and create the following.
All are **Single Types** except Skill Category, Experience, Project, and Social Link
which are **Collection Types**.

---

### A. `site-config` — Single Type

| Field name        | Type        | Notes                         |
|-------------------|-------------|-------------------------------|
| site_title        | Text        | Required                      |
| meta_description  | Text (Long) | Required                      |
| og_image          | Media       | Single image                  |
| contact_email     | Email       | Required                      |
| resume_url        | Text        |                               |
| footer_note       | Text        | e.g. "Designed & developed…"  |
| tech_strip        | JSON        | Array of strings              |

---

### B. `hero` — Single Type

| Field name            | Type        | Notes                         |
|-----------------------|-------------|-------------------------------|
| badge_text            | Text        | e.g. "Available for…"        |
| name                  | Text        | e.g. "Deepanshu Bajaj"       |
| roles                 | JSON        | Array of strings for typer    |
| tagline               | Text (Long) | Supports HTML `<strong>`      |
| cta_primary_label     | Text        |                               |
| cta_primary_href      | Text        | e.g. "#projects"              |
| cta_secondary_label   | Text        |                               |
| cta_secondary_href    | Text        |                               |
| stat_experience       | Text        | e.g. "3.8+"                  |
| stat_projects         | Text        | e.g. "20+"                   |
| stat_clients          | Text        | e.g. "8+"                    |
| stat_remote           | Text        | e.g. "100%"                  |

---

### C. `about` — Single Type

| Field name          | Type        | Notes                              |
|---------------------|-------------|------------------------------------|
| bio                 | Text (Long) | Paragraphs separated by `\n\n`     |
| location            | Text        | e.g. "India 🇮🇳"                  |
| status              | Text        | e.g. "Open to work"               |
| focus               | Text        | e.g. "Frontend / Full-Stack"      |
| company             | Text        |                                    |
| currently           | Text        | e.g. "Building cool things"       |
| availability        | Enumeration | Values: `open`, `busy`, `closed`  |
| availability_types  | JSON        | Array, e.g. `["Freelance"]`       |

---

### D. `skill-category` — Collection Type

| Field name  | Type        | Notes                          |
|-------------|-------------|--------------------------------|
| title       | Text        | e.g. "Frontend Core"          |
| icon        | Text        | Emoji, e.g. "⚛️"              |
| order       | Integer     | Sort order (lower = first)     |
| skills      | Component   | Repeatable — see below ↓      |

**Skill component fields:**
| Field name  | Type    |
|-------------|---------|
| name        | Text    |
| is_primary  | Boolean |

---

### E. `experience` — Collection Type

| Field name       | Type        | Notes                               |
|------------------|-------------|-------------------------------------|
| role             | Text        | e.g. "Senior Frontend Developer"   |
| company          | Text        |                                     |
| employment_type  | Text        | e.g. "Full-time"                   |
| start_date       | Date        | ISO date                            |
| end_date         | Date        | Leave blank = "Present"            |
| description      | Text (Long) |                                     |
| order            | Integer     | Higher = shown first                |
| technologies     | Component   | Repeatable — just `name: Text`     |

---

### F. `project` — Collection Type

| Field name      | Type        | Notes                                  |
|-----------------|-------------|----------------------------------------|
| title           | Text        | Required                               |
| slug            | UID         | Based on title                         |
| description     | Text (Long) |                                        |
| is_featured     | Boolean     | Only one should be true               |
| live_url        | Text        |                                        |
| github_url      | Text        |                                        |
| gradient_from   | Text        | CSS hex, e.g. "#0a1628"               |
| gradient_to     | Text        | CSS hex                                |
| label_color     | Text        | CSS hex for the big placeholder text   |
| label_text      | Text        | e.g. "SaaS"                           |
| order           | Integer     | Higher = shown first                   |
| tags            | JSON        | e.g. `["nextjs","fullstack"]`         |
| tech_stack      | Component   | Repeatable — just `name: Text`        |
| cover_image     | Media       | Single image (optional)               |

---

### G. `social-link` — Collection Type

| Field name  | Type        | Notes                      |
|-------------|-------------|----------------------------|
| platform    | Text        | e.g. "GitHub"             |
| url         | Text        | Full URL                   |
| icon_svg    | Text (Long) | Raw SVG string             |
| order       | Integer     | Sort order                 |

---

## 4. Set Permissions

Go to **Settings → Users & Permissions → Roles → Public**

Enable `find` and `findOne` for all these content types:
- site-config ✓
- hero ✓
- about ✓
- skill-category ✓
- experience ✓
- project ✓
- social-link ✓

---

## 5. Environment Variables

Copy `.env.example` to `.env` and fill in:

```env
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_token_here
```

For production (e.g. Strapi Cloud or Railway):
```env
STRAPI_URL=https://your-strapi-instance.com
STRAPI_API_TOKEN=your_production_token
```

---

## 6. Build & Deploy

```bash
# Development (uses fallback data if Strapi is offline)
npm run dev

# Production build (Strapi must be running)
npm run build

# Preview production build locally
npm run preview
```

> **Note:** The portfolio uses **fallback hardcoded data** in `src/lib/strapi.ts`
> for every content type. This means you can run `npm run dev` and see a
> fully populated portfolio even before Strapi is set up.
> Once Strapi is live and populated, the live data takes over automatically.

---

## 7. Recommended Hosting

| Service       | Use for          | Free tier |
|---------------|------------------|-----------|
| Vercel        | Astro frontend   | ✓         |
| Strapi Cloud  | Strapi CMS       | 14-day trial |
| Railway       | Strapi + Postgres| ✓ (limited) |
| Render        | Strapi + Postgres| ✓ (spins down) |

For a production-ready zero-cost setup: **Vercel** (frontend) + **Railway** (Strapi + PostgreSQL).
