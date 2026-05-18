// ─── Strapi Base ──────────────────────────────────────────────────────────────
export interface StrapiImage {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText: string | null;
      width: number;
      height: number;
      formats?: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
        large?: { url: string };
      };
    };
  } | null;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export interface Hero {
  id: number;
  attributes: {
    badge_text: string;
    name: string;
    roles: string[];           // cycling typed words
    tagline: string;
    cta_primary_label: string;
    cta_primary_href: string;
    cta_secondary_label: string;
    cta_secondary_href: string;
    stat_experience: string;
    stat_projects: string;
    stat_clients: string;
    stat_remote: string;
  };
}

// ─── About ────────────────────────────────────────────────────────────────────
export interface About {
  id: number;
  attributes: {
    bio: string;                // rich text / markdown
    location: string;
    status: string;
    focus: string;
    company: string;
    currently: string;
    availability: 'open' | 'busy' | 'closed';
    availability_types: string[];   // e.g. ["Freelance", "Full-time"]
  };
}

// ─── Skill ────────────────────────────────────────────────────────────────────
export interface SkillCategory {
  id: number;
  attributes: {
    title: string;
    icon: string;              // emoji or icon name
    order: number;
    skills: {
      id: number;
      name: string;
      is_primary: boolean;
    }[];
  };
}

// ─── Experience ───────────────────────────────────────────────────────────────
export interface Experience {
  id: number;
  attributes: {
    role: string;
    company: string;
    employment_type: string;   // Full-time / Contract / Freelance
    start_date: string;        // ISO date
    end_date: string | null;   // null = Present
    description: string;
    order: number;
    technologies: {
      id: number;
      name: string;
    }[];
  };
}

// ─── Project ──────────────────────────────────────────────────────────────────
export interface Project {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description: string;
    is_featured: boolean;
    is_coming_soon?: boolean;
    progress?: number;          // 0–100, only for coming_soon items
    live_url: string | null;
    github_url: string | null;
    gradient_from: string;     // CSS hex for card bg
    gradient_to: string;
    label_color: string;       // CSS hex for the big letter
    label_text: string;        // e.g. "SaaS"
    order: number;
    tags: string[];            // filter tags: "react" | "nextjs" | "fullstack"
    tech_stack: {
      id: number;
      name: string;
    }[];
    cover_image: StrapiImage;
  };
}

// ─── Social Link ──────────────────────────────────────────────────────────────
export interface SocialLink {
  id: number;
  attributes: {
    platform: string;
    url: string;
    icon_svg: string;          // raw SVG string
    order: number;
  };
}

// ─── Site Config ──────────────────────────────────────────────────────────────
export interface SiteConfig {
  id: number;
  attributes: {
    site_title: string;
    meta_description: string;
    og_image: StrapiImage;
    contact_email: string;
    resume_url: string | null;
    footer_note: string;
    tech_strip: string[];      // marquee items
  };
}
