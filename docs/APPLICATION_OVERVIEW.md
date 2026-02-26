# Application Overview — Sail High Software Solutions Website

## Purpose

The Sail High Software Solutions website is a **marketing and lead-generation platform** for a Thailand-based B2B technology company. Its primary goal is to:

1. Communicate the company's enterprise software capabilities to decision-makers
2. Build trust with government agencies and large enterprises
3. Generate qualified inbound leads via a contact call-to-action
4. Establish credibility through structured messaging around security, implementation, and industry focus

---

## Target Audiences

| Audience | Primary Need |
|---|---|
| **Enterprise IT Decision-Makers** | Understand product capabilities, integration approach, and enterprise readiness |
| **Government Agencies (Thai)** | Verify compliance, security posture, and local presence |
| **SME Owners** | Evaluate staffing and ERP solutions for growth |
| **Procurement / Legal Teams** | Access company registration details and compliance information |

---

## Site Architecture

The website is a **single-page application** (Next.js App Router, static export) with 8 sequential sections:

| Section | Component | Purpose |
|---|---|---|
| **Hero** | `HeroSection` | Brand statement, value proposition headline, primary CTA |
| **About** | `AboutSnapshot` | Company background, mission points, guiding principles |
| **Solutions** | `SolutionsSection` | Three service pillars: Enterprise Systems, Smart Education, IT Staffing |
| **Implementation** | `ImplementationSection` | 6-step delivery process — from discovery to support |
| **Industries** | `IndustriesSection` | 6 served verticals (with carousel on mobile) |
| **Why Choose** | `WhyChooseSection` | 5 differentiators: local presence, security, scalability, team, partnerships |
| **Security** | `SecuritySection` | Security commitments and compliance checklist |
| **Contact CTA** | `ContactCTA` | Final call-to-action with email link |

Navigation and footer are rendered via `Header` and `Footer` layout components.

---

## Content Management

All copy is **JSON-driven** — no CMS is required:

| File | Contents |
|---|---|
| `content/home.json` | All 8 section copy blocks (headings, body text, lists, CTAs) |
| `content/nav.json` | Logo text, tagline, navigation links with optional children |
| `content/footer.json` | Tagline, email, copyright, built-in notice |

To update content, edit the relevant JSON file and rebuild. No code changes are needed for copy updates.

---

## Theming System

The website supports two visual themes, selected at **build time** via an environment variable:

```bash
# Dark theme (default)
npm run build

# Light theme
NEXT_PUBLIC_SITE_THEME=light npm run build
```

### How It Works

1. `config/site.ts` reads `NEXT_PUBLIC_SITE_THEME` and exports `SITE_THEME: 'dark' | 'light'`
2. `app/layout.tsx` (Server Component) sets `data-theme={SITE_THEME}` on `<html>` — baked into static HTML
3. `app/globals.css` defines all design tokens as CSS custom properties under `[data-theme="dark"]` and `[data-theme="light"]`
4. Every component references `var(--token-name)` — no hardcoded hex values

### Logo-Derived Color Palette

Both themes are derived from the Sail High logo colors:

| Color | Logo Hex | Dark Theme Usage | Light Theme Usage |
|---|---|---|---|
| Navy | `#0F4082` | Background complement | Primary accent + text |
| Light Blue | `#68E6ED` | Primary accent | Darkened to `#008FA0` |
| Yellow | `#FECE2E` | Reserved for future use | Reserved |
| Green | `#7EC461` | Emerald accent | Darkened to `#4A7A2D` |
| Pink | `#BF256B` | Violet/magenta accent | Darkened to `#8B1A4C` |

---

## Deployment Model

The application uses **Next.js static export** (`output: 'export'`):

- `npm run build` → generates `/out` directory (pure HTML/CSS/JS, no server required)
- Deploy `/out` to **Cloudflare Pages** or **AWS S3 + CloudFront**
- No Node.js server, no database, no API routes

### Infrastructure Requirements

| Requirement | Detail |
|---|---|
| **CDN** | Cloudflare Pages or AWS CloudFront (recommended) |
| **SSL** | Mandatory — provided by CDN |
| **Log Retention** | CDN access logs ≥ 90 days (PDPA/CCA compliance) |
| **Custom Domain** | `sailhighthailand.com` |

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15, App Router |
| Language | TypeScript |
| Styling | Tailwind CSS v3 + CSS custom properties |
| Animation | Framer Motion (scroll, carousel, transitions), GSAP (hero headline) |
| Icons | lucide-react |
| Fonts | Space Grotesk (headings), DM Sans (body) via `next/font/google` |
| Build | `next build` → static `/out` |

---

## Accessibility

The website targets **WCAG 2.1 Level AA**:

- Skip navigation link
- Visible focus indicators (`:focus-visible` with CSS variable outline)
- ARIA roles and attributes on all interactive elements
- 44×44px minimum touch targets
- Keyboard-navigable carousel with `role="tab"` dots
- `prefers-reduced-motion` support
- Semantic landmark elements and heading hierarchy

---

## Development Commands

```bash
npm run dev      # Local development server at http://localhost:3000
npm run build    # Static export to /out
npm run start    # Preview built output (requires next start)

# Theme variants
NEXT_PUBLIC_SITE_THEME=dark npm run build
NEXT_PUBLIC_SITE_THEME=light npm run build
```

---

*Last updated: February 2026*
