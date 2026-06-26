import type {
  Hero, About, SkillCategory, Experience,
  Project, SocialLink, SiteConfig, StrapiResponse,
} from '@/types/strapi';

const STRAPI_URL = import.meta.env.STRAPI_URL ?? 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.STRAPI_API_TOKEN ?? '';

// ─── Core Fetcher ─────────────────────────────────────────────────────────────
async function strapiGet<T>(
  path: string,
  params: Record<string, string> = {},
): Promise<T> {
  const url = new URL(`/api/${path}`, STRAPI_URL);
  url.searchParams.set('populate', '*');
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (STRAPI_TOKEN) headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;

  const res = await fetch(url.toString(), { headers });
  if (!res.ok) throw new Error(`Strapi fetch failed: ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

function calcExpYears(): number {
  const start = new Date(2022, 4); // May 2022
  const now = new Date();
  const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  return Math.floor(months / 12);
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export async function getHero(): Promise<Hero['attributes']> {
  try {
    const data = await strapiGet<StrapiResponse<Hero>>('hero');
    return data.data.attributes;
  } catch {
    const years = calcExpYears();
    return {
      badge_text: 'Available for new opportunities',
      name: 'Deepanshu Bajaj',
      roles: ['React.js', 'Next.js', 'TypeScript', 'Supabase', 'Astro.js'],
      tagline: `Building <strong>performant, pixel perfect</strong> web experiences with React, Next.js and modern tooling. <span id="hero-tagline-exp">${years}+</span> years crafting products that scale.`,
      cta_primary_label: 'View My Work',
      cta_primary_href: '#projects',
      cta_secondary_label: 'Get in Touch',
      cta_secondary_href: '#contact',
      stat_experience: `${years}+`,
      stat_projects: '20+',
      stat_clients: '8+',
      stat_remote: '100%',
    };
  }
}

// ─── About ────────────────────────────────────────────────────────────────────
export async function getAbout(): Promise<About['attributes']> {
  try {
    const data = await strapiGet<StrapiResponse<About>>('about');
    return data.data.attributes;
  } catch {
    const years = calcExpYears();
    return {
      bio: `I'm <strong>Deepanshu Bajaj</strong>, a frontend engineer based in India with <strong>${years}+ years</strong> of professional experience building web applications at a product driven service company. I specialise in creating fast, accessible, and beautifully crafted digital experiences.\n\nMy stack of choice is <strong>React / Next.js</strong> on the frontend, paired with <strong>Supabase</strong> for the backend. I obsess over performance, clean architecture, and the UI details that most people don't notice until they're missing.\n\nWhen I'm not writing code, I'm exploring new design patterns, contributing to side projects, or diving deep into the latest frontend ecosystem developments.`,
      location: 'India 🇮🇳',
      status: 'Open to work',
      focus: 'Frontend / Full Stack',
      company: 'Web Forte Technologies Pvt. Ltd.',
      currently: 'Building cool things',
      availability: 'open',
      availability_types: ['Freelance', 'Full time'],
    };
  }
}

// ─── Skills ───────────────────────────────────────────────────────────────────
export async function getSkillCategories(): Promise<SkillCategory['attributes'][]> {
  try {
    const data = await strapiGet<StrapiResponse<SkillCategory[]>>('skill-categories', {
      'sort[0]': 'order:asc',
    });
    return data.data.map((d) => d.attributes);
  } catch {
    return [
      {
        title: 'Frontend Core', icon: '⚛️', order: 1,
        skills: [
          { id: 1, name: 'React.js', is_primary: true },
          { id: 2, name: 'Next.js', is_primary: true },
          { id: 3, name: 'TypeScript', is_primary: true },
          { id: 4, name: 'JavaScript ES6+', is_primary: false },
          { id: 37, name: 'Astro', is_primary: true },
        ],
      },
      {
        title: 'Styling & UI', icon: '🎨', order: 2,
        skills: [
          { id: 7, name: 'Tailwind CSS', is_primary: true },
          { id: 8, name: 'shadcn/ui', is_primary: true },
          { id: 9, name: 'Framer Motion', is_primary: true },
          { id: 43, name: 'Material UI', is_primary: true },
          { id: 10, name: 'Styled Components', is_primary: false },
          { id: 11, name: 'Radix UI', is_primary: false },
          { id: 12, name: 'SCSS', is_primary: false },
        ],
      },
      {
        title: 'Backend & Data', icon: '🗄️', order: 3,
        skills: [
          { id: 13, name: 'Supabase', is_primary: true },
          { id: 14, name: 'PostgreSQL', is_primary: true },
          { id: 15, name: 'Node.js', is_primary: false },
          { id: 16, name: 'REST APIs', is_primary: false },
          { id: 17, name: 'GraphQL', is_primary: false },
          { id: 40, name: 'Zod', is_primary: true },
          { id: 45, name: 'Stripe', is_primary: true },
          { id: 41, name: 'Axios', is_primary: false },
        ],
      },
      {
        title: 'State & Data Flow', icon: '🧰', order: 4,
        skills: [
          { id: 19, name: 'Zustand', is_primary: true },
          { id: 20, name: 'React Query', is_primary: true },
          { id: 44, name: 'React Hook Form', is_primary: true },
          { id: 21, name: 'Redux Toolkit', is_primary: false },
          { id: 22, name: 'Context API', is_primary: false },
        ],
      },
      {
        title: 'Tools & DevOps', icon: '🔧', order: 5,
        skills: [
          { id: 25, name: 'Git / GitHub', is_primary: true },
          { id: 26, name: 'Vercel', is_primary: true },
          { id: 38, name: 'Vite', is_primary: true },
          { id: 28, name: 'Docker', is_primary: false },
          { id: 30, name: 'Cypress', is_primary: false },
        ],
      },
      {
        title: 'Design & Collab', icon: '📐', order: 6,
        skills: [
          { id: 31, name: 'Figma', is_primary: true },
          { id: 42, name: 'Adobe XD', is_primary: false },
          { id: 36, name: 'Slack', is_primary: false },
        ],
      },
    ];
  }
}

// ─── Experience ───────────────────────────────────────────────────────────────
export async function getExperiences(): Promise<Experience['attributes'][]> {
  try {
    const data = await strapiGet<StrapiResponse<Experience[]>>('experiences', {
      'sort[0]': 'order:desc',
    });
    return data.data.map((d) => d.attributes);
  } catch {
    return [
      {
        role: 'Frontend Engineer',
        company: 'Web Forte Technologies Pvt. Ltd.',
        employment_type: 'Full time',
        start_date: '2022-05-01',
        end_date: null,
        order: 1,
        description: 'Lead a team of 3 frontend developers across 4 client projects, taking full ownership from requirement gathering and architecture decisions to delivery, all shipped ahead of schedule. Handled Scrum Master responsibilities including sprint planning, daily standups, and backlog grooming. Collaborated directly with clients to translate product vision into performant, pixel perfect web applications. Shipped 100+ features across projects while enforcing code quality standards, mentoring the team, and serving as the primary engineer for critical hotfixes and production issues.',
        technologies: [
          { id: 1, name: 'React.js' }, { id: 2, name: 'Next.js' },
          { id: 3, name: 'TypeScript' }, { id: 4, name: 'JavaScript ES6+' },
          { id: 5, name: 'Astro' }, { id: 6, name: 'Tailwind CSS' },
          { id: 7, name: 'shadcn/ui' }, { id: 8, name: 'Framer Motion' },
          { id: 9, name: 'Styled Components' }, { id: 10, name: 'Radix UI' },
          { id: 11, name: 'SCSS' }, { id: 12, name: 'Supabase' },
          { id: 13, name: 'PostgreSQL' }, { id: 14, name: 'Node.js' },
          { id: 15, name: 'REST APIs' }, { id: 16, name: 'GraphQL' },
          { id: 17, name: 'Zod' }, { id: 18, name: 'Axios' },
          { id: 19, name: 'Zustand' }, { id: 20, name: 'React Query' },
          { id: 21, name: 'Redux Toolkit' }, { id: 22, name: 'Context API' },
          { id: 23, name: 'Git / GitHub' }, { id: 24, name: 'Vercel' },
          { id: 25, name: 'Vite' }, { id: 26, name: 'Docker' },
          { id: 27, name: 'Cypress' }, { id: 28, name: 'Figma' },
          { id: 29, name: 'Adobe XD' },
        ],
      },
    ];
  }
}

// ─── Projects ─────────────────────────────────────────────────────────────────
export async function getProjects(): Promise<Project['attributes'][]> {
  try {
    const data = await strapiGet<StrapiResponse<Project[]>>('projects', {
      'sort[0]': 'order:desc',
    });
    return data.data.map((d) => d.attributes);
  } catch {
    return [
      {
        title: 'Honor Pet',
        slug: 'honor-pet',
        description: 'A full scale PWA digitising end to end pet cremation operations for a US based business, built by a team of 2 that I led. Serves 6 distinct roles:Admins, Team Members, Drivers, Clinics, Clinic Staff, and Pet Parents, each with a dedicated dashboard. Clinics are auto onboarded via a HubSpot deal webhook that fires a magic login link on conversion. Pet intake supports manual entry or PDF upload parsed by Document.ai. Each pet is assigned a dynamically generated cremation workflow, with steps auto decided by a rules engine based on cremation type, weight, clinic affiliation, shipping preference, and service type. Every step is timestamped, logged, and culminates in a downloadable SVG journey per pet. Pet parents receive upsell emails to a connected WooCommerce store for memorial items. Clinics are invoiced monthly via Authorize.net; D2C customers pay upfront. Driver routes are Mapbox optimised daily with live GPS tracking streamed to admins via Supabase Realtime, re routing around traffic in real time.',
        is_featured: true,
        live_url: 'https://app.honor.pet',
        github_url: null,
        gradient_from: '#0f0a18',
        gradient_to: '#1a1028',
        label_color: '#c084fc',
        label_text: 'HP',
        order: 5,
        tags: ['nextjs', 'fullstack'],
        tech_stack: [
          { id: 1, name: 'Next.js' },
          { id: 2, name: 'TypeScript' },
          { id: 3, name: 'Supabase' },
          { id: 4, name: 'Supabase Realtime' },
          { id: 5, name: 'shadcn/ui' },
          { id: 6, name: 'Tailwind CSS' },
          { id: 7, name: 'React Hook Form' },
          { id: 8, name: 'Zod' },
          { id: 9, name: 'Document.ai' },
          { id: 10, name: 'Mapbox' },
          { id: 11, name: 'Authorize.net' },
          { id: 12, name: 'Twilio' },
          { id: 13, name: 'Acuity' },
          { id: 14, name: 'Recharts' },
          { id: 15, name: 'PWA' },
          { id: 16, name: 'WooCommerce' },
          { id: 17, name: 'Redux' },
        ],
        cover_image: { data: { id: 3, attributes: { url: '/projects/honor-pet.png', alternativeText: null, width: 1280, height: 720 } } },
      },
      {
        title: 'We Raise Funds',
        slug: 'we-raise-funds',
        description: 'A multi role fundraising platform built around a full RBAC hierarchy. Super Admins oversee the entire ecosystem, Fundraiser Managers create campaigns with defined funding goals and assign them to schools or individual students, and students access a personal portal to track their assigned fundraiser progress and contributions in real time. Manager and admin dashboards surface KPIs through rich Recharts visualisations, giving stakeholders complete visibility into campaign performance across all active fundraisers. Campaigns generate shareable QR codes for ad distribution, channelling traffic directly to each fundraiser. Authorize.Net powers secure payment collection across the platform, built around a dynamic two tier fee engine with cent precise rounding, client side card validation, refunds, and real time financial KPIs. Built the entire Next.js frontend against custom Laravel REST APIs maintained by a separate backend team, owning all architecture decisions from kickoff through production. Navigated and resolved CORS challenges across environments. All forms are handled with React Hook Form and validated with Zod, with shadcn/ui ensuring a polished and consistent interface throughout.',
        is_featured: true,
        live_url: 'https://weraisefunds.org',
        github_url: null,
        gradient_from: '#061a12',
        gradient_to: '#0a2e1e',
        label_color: '#0ff4c6',
        label_text: 'WRF',
        order: 3,
        tags: ['nextjs', 'fullstack'],
        tech_stack: [
          { id: 1, name: 'Next.js' },
          { id: 2, name: 'TypeScript' },
          { id: 3, name: 'Tailwind CSS' },
          { id: 4, name: 'shadcn/ui' },
          { id: 5, name: 'React Hook Form' },
          { id: 6, name: 'Zod' },
          { id: 7, name: 'Recharts' },
          { id: 8, name: 'Axios' },
          { id: 9, name: 'Authorize.Net' },
          { id: 10, name: 'REST APIs' },
          { id: 11, name: 'Laravel' },
          { id: 12, name: 'RBAC' }
        ],
        cover_image: { data: { id: 1, attributes: { url: '/projects/we-raise-funds.png', alternativeText: null, width: 1280, height: 720 } } },
      },
      {
        title: 'Delfee',
        slug: 'delfee',
        description: 'A full stack jewellery ecommerce platform delivered solo end to end, covering the storefront, admin dashboard, payments, shipping, GST billing and content system, owning every technical decision from data modelling and API design through to deployment, as sole engineer and de facto technical lead setting the architecture a full team could scale on. Built on Medusa v2 with a Next.js 15 storefront, Refine.dev plus Supabase admin, and a headless CMS. Captures revenue across every way customers like to pay: Razorpay for UPI, cards and wallets alongside Cash on Delivery with a pay now, pay rest on delivery option. Adds GST compliant invoicing with HSN codes plus recovery for abandoned carts and charged but unsaved orders. Shipping runs through Shiprocket. An automated CI/CD pipeline on GitHub Actions drives a monorepo holding all three apps (store, backend, CMS), building only what changed on each push, then deploying, running database migrations and health checks before going live. Everything runs on a single cost efficient DigitalOcean server with automatic HTTPS, pushing features live in minutes.',
        is_featured: true,
        live_url: 'https://delfee.in',
        github_url: null,
        gradient_from: '#1a0f08',
        gradient_to: '#2e1a0a',
        label_color: '#f59e0b',
        label_text: 'DF',
        order: 4,
        tags: ['nextjs', 'fullstack'],
        tech_stack: [
          { id: 1, name: 'Medusa v2' }, { id: 2, name: 'Next.js 15' },
          { id: 3, name: 'TypeScript' }, { id: 4, name: 'Refine.dev' },
          { id: 5, name: 'Supabase' }, { id: 6, name: 'Razorpay' },
          { id: 7, name: 'Shiprocket' }, { id: 8, name: 'Tailwind CSS' },
          { id: 9, name: 'GitHub Actions' }, { id: 10, name: 'Docker' },
          { id: 11, name: 'DigitalOcean' }, { id: 12, name: 'GST / HSN' },
        ],
        cover_image: { data: { id: 4, attributes: { url: '/projects/delfee.png', alternativeText: 'Delfee jewellery storefront', width: 1600, height: 914 } } },
      },
      {
        title: 'Digivyap',
        slug: 'digivyap',
        is_coming_soon: true,
        progress: 10,
        description: 'A multi tenant SaaS CRM built for pharma sales teams, with AI powered lead management and strict tenant isolation to eliminate data leakage across organisations.',
        is_featured: false,
        live_url: null,
        github_url: null,
        gradient_from: '#080f1a',
        gradient_to: '#0d1828',
        label_color: '#818cf8',
        label_text: 'DV',
        order: 0,
        tags: ['nextjs', 'fullstack'],
        tech_stack: [
          { id: 1, name: 'Next.js' }, { id: 2, name: 'TypeScript' },
          { id: 3, name: 'Supabase' }, { id: 4, name: 'AI' },
          { id: 5, name: 'Multi tenant SaaS' },
        ],
        cover_image: { data: null },
      }
    ];
  }
}

// ─── Site Config ──────────────────────────────────────────────────────────────
export async function getSiteConfig(): Promise<SiteConfig['attributes']> {
  try {
    const data = await strapiGet<StrapiResponse<SiteConfig>>('site-config');
    return data.data.attributes;
  } catch {
    return {
      site_title: 'Deepanshu Bajaj | Frontend Engineer',
      meta_description: 'Senior Frontend Engineer specialising in React, Next.js, and Supabase. Building performant, pixel perfect web experiences.',
      og_image: { data: null },
      contact_email: 'dbajaj.dev@gmail.com',
      resume_url: '/resume.pdf',
      footer_note: 'Designed & developed with obsession.',
      tech_strip: [
        'React', 'Next.js', 'TypeScript', 'Supabase', 'Tailwind',
        'Framer Motion', 'shadcn/ui', 'Zustand', 'PostgreSQL',
        'Vercel', 'Node.js', 'GraphQL', 'Astro',
      ],
    };
  }
}

// ─── Social Links ─────────────────────────────────────────────────────────────
export async function getSocialLinks(): Promise<SocialLink['attributes'][]> {
  try {
    const data = await strapiGet<StrapiResponse<SocialLink[]>>('social-links', {
      'sort[0]': 'order:asc',
    });
    return data.data.map((d) => d.attributes);
  } catch {
    return [
      {
        platform: 'GitHub', url: 'https://github.com', order: 1,
        icon_svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
      },
      {
        platform: 'LinkedIn', url: 'https://linkedin.com', order: 2,
        icon_svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
      },
      {
        platform: 'Twitter / X', url: 'https://twitter.com', order: 3,
        icon_svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.733-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
      },
    ];
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function getStrapiImageUrl(image: import('@/types/strapi').StrapiImage): string | null {
  if (!image.data) return null;
  const url = image.data.attributes.url;
  if (url.startsWith('/uploads/')) return `${STRAPI_URL}${url}`;
  if (url.startsWith('/')) {
    const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');
    return `${base}${url}`;
  }
  return url;
}

export function formatDateRange(start: string, end: string | null): string {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  const s = fmt(start);
  const e = end ? fmt(end) : 'Present';
  const startMs = new Date(start).getTime();
  const endMs = end ? new Date(end).getTime() : Date.now();
  const yrs = Math.floor((endMs - startMs) / (1000 * 60 * 60 * 24 * 365));
  const dur = yrs > 0 ? `${yrs}+ yrs` : 'Less than a year';
  return `${s} to ${e} · ${dur}`;
}
