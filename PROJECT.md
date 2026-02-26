# SAILHIGH SOFTWARE SOLUTIONS — STATIC WEBSITE BUILD BRIEF v2.0
> Feed this file to Claude Code. It contains all context, architecture, content, and task breakdown to build the complete Home Page in phases.

---

## 1. PROJECT OVERVIEW

**Company:** Sail High Software Solutions
**Location:** Thailand
**Type:** Static marketing website (no CMS, no backend, no auth, no server)
**Phase 1 Scope:** Home page only
**Future Pages:** Solutions, Industries, Implementation Approach, Security & Compliance, About Us, Contact
**Deploy Target:** AWS S3 + CloudFront OR Cloudflare Pages (pure static files, no Node.js server)

---

## 2. VISUAL DIRECTION & REFERENCES

Study these two sites before generating any component. The design must feel like a blend of both.

**Reference 1 — altar.io**
- Dark background dominant throughout
- Large, bold, confident typography with generous whitespace
- Minimal color — mostly black/white with one strong accent
- Clean section layouts, no clutter
- Smooth scroll-triggered reveals, nothing flashy
- Strong use of negative space to make content breathe

**Reference 2 — palantir.com**
- Cold, serious, enterprise-grade feel
- Dark navy / near-black backgrounds
- Geometric fonts give a "data / intelligence" feel
- Sparse text, high-impact statements — short sentences, not paragraphs
- Very subtle grid overlays or dot patterns in backgrounds
- Government and institutional trust signaling through restraint

**Synthesized Design Direction for Sail High:**
- Dark-first design (dark background is the default — this is NOT a light site)
- Deep navy `#050E1F` base, not pure black — feels premium not harsh
- Single accent: electric cyan `#00C6FF` for hover states, CTAs, highlighted text
- Generous whitespace — sections breathe, never cramped
- Large section numbers (01, 02, 03) as decorative background elements like Palantir
- Bold short headline statements like altar.io — avoid long paragraph heroes
- Subtle animated background: CSS dot grid, very low opacity
- Borders: thin 1px lines, `rgba(255,255,255,0.08)` — barely visible, adds structure
- Cards: glass-morphism style — `background: rgba(255,255,255,0.03)`, `backdrop-filter: blur(10px)`, thin border

---

## 3. TECH STACK (NON-NEGOTIABLE)

| Layer | Tool | Reason |
|---|---|---|
| Framework | Next.js 14+ (App Router, SSG, `output: 'export'`) | Full static build, no server needed |
| Styling | Tailwind CSS v4 | Purged CSS, utility-first |
| Animation | Framer Motion | Scroll reveals, stagger, entrance |
| Animation (complex) | GSAP (free) | Hero headline timeline |
| Fonts | next/font — Space Grotesk + DM Sans | See Section 6 |
| Icons | lucide-react | Tree-shakeable |
| Images | next/image with `unoptimized: true` | Required for static export |
| Content | JSON config files | All copy driven by JSON |
| Hosting | AWS S3 + CloudFront OR Cloudflare Pages | Pure static CDN, no server |

**Static Export Config — `next.config.ts`:**
```ts
const nextConfig = {
  output: 'export',        // generates /out folder of pure HTML/CSS/JS
  images: {
    unoptimized: true,     // required — no server to process images
  },
  trailingSlash: true,     // needed for S3/Cloudflare routing
}
export default nextConfig
```

**Build & Deploy:**
```bash
next build          # generates /out directory — upload this to S3 or Cloudflare Pages
```

**Rules:**
- Every page section is a React component receiving props from JSON config
- Zero hardcoded copy inside components — all text from JSON
- All animations scroll-triggered with `useInView` from Framer Motion
- Dark design is the default — NOT a light site with a dark toggle
- Mobile-first responsive (sm, md, lg, xl breakpoints)
- Use `unoptimized: true` in next.config.ts — no image server features

---

## 4. PROJECT STRUCTURE

```
sailhigh/
├── app/
│   ├── layout.tsx              # Root layout — fonts, header, footer
│   ├── page.tsx                # Home page — assembles sections from JSON
│   └── globals.css             # Tailwind base + CSS variables
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSnapshot.tsx
│   │   ├── SolutionsSection.tsx
│   │   ├── ImplementationSection.tsx
│   │   ├── IndustriesSection.tsx
│   │   ├── WhyChooseSection.tsx
│   │   ├── SecuritySection.tsx
│   │   └── ContactCTA.tsx
│   └── ui/
│       ├── AnimatedSection.tsx  # Scroll reveal wrapper (Framer Motion)
│       ├── SectionHeading.tsx   # Tag pill + H2 + optional subtext
│       └── GlassCard.tsx        # Reusable glassmorphism card
├── content/
│   ├── home.json
│   ├── nav.json
│   └── footer.json
├── lib/
│   ├── fonts.ts
│   └── animations.ts
├── public/
│   └── images/
├── tailwind.config.ts
└── next.config.ts
```

---

## 5. CONTENT JSON — HOME PAGE

> File: `content/home.json`

```json
{
  "hero": {
    "headline": "Transforming Operations with Smart AI & Mobility Solutions",
    "subheadline": "Secure, scalable, and government-ready technology systems that strengthen operations, enhance visibility, and support long-term growth across Thailand.",
    "description": "Enterprise-grade software · Smart education platforms · Professional IT talent services",
    "cta_primary": { "label": "Schedule a Consultation", "href": "#contact" },
    "cta_secondary": { "label": "Explore Solutions", "href": "#solutions" },
    "trust_line": "Thailand-based · Government-ready · Enterprise-grade"
  },

  "about_snapshot": {
    "tag": "About Us",
    "heading": "A Trusted Technology Partner for Sustainable Digital Growth",
    "body": "Sail High Software Solutions is a Thailand-based technology company delivering reliable enterprise systems, smart education platforms, and professional IT staffing services to organizations across the country.",
    "mission_points": [
      "Improve operational efficiency",
      "Enable data-driven decision-making",
      "Strengthen governance and compliance",
      "Support sustainable growth"
    ],
    "principles": [
      { "label": "Structured", "opposite": "not complicated" },
      { "label": "Secure", "opposite": "not vulnerable" },
      { "label": "Practical", "opposite": "not theoretical" },
      { "label": "Sustainable", "opposite": "not short-term" }
    ],
    "cta": { "label": "Learn More About Us", "href": "/about" }
  },

  "solutions": {
    "tag": "Our Solutions",
    "heading": "End-to-End Digital Systems Built for Thailand",
    "items": [
      {
        "id": "enterprise",
        "number": "01",
        "title": "Enterprise Systems & AI",
        "subtitle": "Control, Automation & Intelligence at Scale",
        "description": "We design and deploy enterprise-grade platforms that enhance control, automation, and decision-making.",
        "capabilities": [
          "Enterprise Resource Planning (ERP)",
          "Sales Force Automation (SFA)",
          "Last-Mile Delivery & Logistics Platforms",
          "AI-Driven Business Intelligence & Analytics",
          "Workflow & Process Automation"
        ],
        "impacts": [
          "Improved reporting accuracy",
          "Reduced manual processes",
          "Increased operational transparency",
          "Real-time performance visibility"
        ],
        "target": "Built for growing SMEs and large enterprises requiring reliability and scalability.",
        "icon": "cpu",
        "color_accent": "cyan"
      },
      {
        "id": "education",
        "number": "02",
        "title": "Smart Education Solutions",
        "subtitle": "Intelligent Platforms for Modern Institutions",
        "description": "Our smart classroom and school management systems support structured learning environments, performance tracking, and inclusive education.",
        "capabilities": [
          "Smart Classroom Software",
          "Student Performance Analytics",
          "School ERP & Administrative Systems",
          "Attendance & Assessment Management",
          "Inclusive Learning Modules",
          "AI-Based Learning Insights"
        ],
        "designed_for": [
          "Public schools",
          "Private institutions",
          "Training centers",
          "Government education programs"
        ],
        "note": "We prioritize accessibility, data security, and teacher-friendly implementation.",
        "icon": "graduation-cap",
        "color_accent": "emerald"
      },
      {
        "id": "staffing",
        "number": "03",
        "title": "IT Staffing & Technology Services",
        "subtitle": "Skilled Professionals to Support Your Digital Initiatives",
        "description": "We provide qualified IT specialists and project teams to support implementation, system upgrades, and digital transformation programs.",
        "capabilities": [
          "Contract Developers",
          "ERP Implementation Specialists",
          "AI & Data Analysts",
          "Project-Based Technical Teams",
          "On-Site & Remote Support"
        ],
        "note": "Our staffing solutions ensure continuity, technical excellence, and reduced project risk.",
        "icon": "users",
        "color_accent": "violet"
      }
    ]
  },

  "implementation": {
    "tag": "Our Approach",
    "heading": "Structured. Transparent. Accountable.",
    "description": "A disciplined methodology that ensures every project is delivered on time, within scope, and built to last.",
    "steps": [
      { "number": "01", "title": "Requirements Assessment", "description": "Deep-dive into your operations, goals, and technical environment before any system design begins." },
      { "number": "02", "title": "System Design & Customization", "description": "Architecture and workflow tailored to your specific industry and organizational structure." },
      { "number": "03", "title": "Secure Deployment", "description": "Controlled rollout with security-first configuration and data migration protocols." },
      { "number": "04", "title": "Training & Knowledge Transfer", "description": "Hands-on training for your team ensuring full adoption and operational independence." },
      { "number": "05", "title": "Ongoing Maintenance & Support", "description": "Long-term SLA-backed support with defined response times and system health monitoring." }
    ],
    "footer_note": "Each project is delivered with clear governance, documented milestones, and defined service level agreements (SLAs)."
  },

  "industries": {
    "tag": "Industries We Serve",
    "heading": "Built for Thailand's Key Sectors",
    "items": [
      { "label": "Distribution & Wholesale", "icon": "truck" },
      { "label": "Manufacturing", "icon": "factory" },
      { "label": "Retail", "icon": "shopping-cart" },
      { "label": "Logistics & Supply Chain", "icon": "package" },
      { "label": "Educational Institutions", "icon": "book-open" },
      { "label": "Public Sector Organizations", "icon": "landmark" }
    ]
  },

  "why_choose": {
    "tag": "Why Sail High",
    "heading": "We Focus on Measurable Value — Not Complexity",
    "items": [
      { "title": "Thailand-Based Technology Partner", "description": "Local expertise with deep understanding of Thai business and regulatory environments.", "icon": "map-pin" },
      { "title": "Government-Ready Implementation Model", "description": "Structured governance, compliance documentation, and accountability frameworks built in.", "icon": "shield-check" },
      { "title": "Practical & Scalable Systems", "description": "Solutions designed to grow with your organization — no over-engineering.", "icon": "trending-up" },
      { "title": "Experienced Technical Teams", "description": "Specialists across ERP, AI, logistics, and education technology domains.", "icon": "users-2" },
      { "title": "Long-Term Support Commitment", "description": "Post-deployment SLAs, training, and system evolution support — not just delivery.", "icon": "handshake" }
    ]
  },

  "security": {
    "tag": "Security & Compliance",
    "heading": "Data Protection Built Into Every System",
    "description": "We understand the importance of data protection and institutional governance.",
    "items": [
      "Secure system architecture",
      "Data privacy standards",
      "Access control management",
      "Cloud & On-Premise deployment options",
      "Long-term system support"
    ],
    "note": "Our solutions are designed to align with institutional requirements and regulatory standards."
  },

  "contact_cta": {
    "tag": "Contact Us",
    "heading": "Ready to Strengthen Your Digital Infrastructure?",
    "description": "Partner with Sail High Software Solutions to implement reliable systems that support efficiency, accountability, and growth.",
    "cta": { "label": "Schedule a Consultation", "href": "#contact" },
    "email": "Hello@sailhighthailand.com"
  }
}
```

---

## 6. NAVIGATION JSON

> File: `content/nav.json`

```json
{
  "logo": { "text": "Sail High", "tagline": "Software Solutions" },
  "links": [
    { "label": "Home", "href": "/" },
    {
      "label": "Solutions", "href": "/solutions",
      "children": [
        { "label": "Enterprise & AI Systems", "href": "/solutions/enterprise-ai" },
        { "label": "Smart Education Systems", "href": "/solutions/education" },
        { "label": "IT Staffing & Talent Services", "href": "/solutions/staffing" }
      ]
    },
    { "label": "Industries", "href": "/industries" },
    { "label": "Implementation Approach", "href": "/implementation" },
    { "label": "Security & Compliance", "href": "/security" },
    { "label": "About Us", "href": "/about" },
    { "label": "Contact", "href": "/contact", "highlight": true }
  ]
}
```

---

## 7. DESIGN SYSTEM

### Philosophy
> altar.io boldness × Palantir restraint = Sail High visual identity
> Dark, serious, enterprise-grade — confident, not flashy. Spacious, not cluttered.

---

### Color Palette — `globals.css`

```css
:root {
  /* Backgrounds */
  --bg-base:       #050E1F;   /* Deep navy — main page background */
  --bg-surface:    #0A1628;   /* Cards, alternate sections */
  --bg-elevated:   #0F1E35;   /* Hover states */

  /* Accent */
  --accent:        #00C6FF;   /* Electric cyan — CTAs, highlights */
  --accent-dim:    #0090BB;   /* Muted accent */
  --accent-glow:   rgba(0, 198, 255, 0.12);

  /* Solution card accents */
  --color-cyan:    #00C6FF;
  --color-emerald: #10B981;
  --color-violet:  #8B5CF6;

  /* Text */
  --text-primary:  #F0F4FF;   /* Headlines */
  --text-secondary:#8FA3C0;   /* Body */
  --text-muted:    #4A6280;   /* Captions, labels */

  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-default:rgba(255, 255, 255, 0.10);
  --border-accent: rgba(0, 198, 255, 0.30);
}

/* Dot grid background texture — apply to body */
body {
  background-color: var(--bg-base);
  background-image: radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px);
  background-size: 32px 32px;
}
```

---

### Typography

**Font Pairing: Space Grotesk (headings) + DM Sans (body)**

- **Space Grotesk** — geometric with slightly quirky terminals. Modern-technical feel used by AI/fintech companies. Confident and precise. Matches Palantir's cold intelligence aesthetic while being warmer than a pure monospace.
- **DM Sans** — clean, optically balanced sans-serif. Highly readable at body sizes. Warmer than Inter, less corporate than Helvetica.

```ts
// lib/fonts.ts
import { Space_Grotesk, DM_Sans } from 'next/font/google'

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500'],
  display: 'swap',
})
```

**Scale:**

| Usage | Font | Desktop | Mobile | Weight | Notes |
|---|---|---|---|---|---|
| Hero H1 | Space Grotesk | 64–72px | 36–42px | 700 | tracking `-0.03em` |
| Section H2 | Space Grotesk | 42–48px | 28–32px | 600 | |
| Card H3 | Space Grotesk | 20–22px | 18px | 600 | |
| Body | DM Sans | 16–17px | 15px | 400 | line-height 1.75 |
| Tag/Label | DM Sans | 11–12px | 11px | 500 | uppercase, `0.12em` spacing |
| Decorative number | Space Grotesk | 96–120px | 64px | 700 | absolute, opacity 0.04 |

---

### Reusable Component Specs

**GlassCard — `components/ui/GlassCard.tsx`**
```css
background: rgba(255, 255, 255, 0.03);
border: 1px solid rgba(255, 255, 255, 0.08);
backdrop-filter: blur(12px);
border-radius: 12px;
transition: border-color 0.3s ease, box-shadow 0.3s ease;
/* Hover: */
border-color: rgba(0, 198, 255, 0.30);
box-shadow: 0 0 32px rgba(0, 198, 255, 0.08);
```

**SectionHeading — `components/ui/SectionHeading.tsx`**
- Small tag pill above every H2: DM Sans 11px, uppercase, `0.12em` spacing, accent color text, `rgba(0,198,255,0.08)` bg, `1px solid rgba(0,198,255,0.2)` border, `border-radius: 4px`, `padding: 4px 12px`
- H2 below: Space Grotesk, color `--text-primary`
- Optional subtext: DM Sans, color `--text-secondary`

**Decorative large numbers**
```css
/* Behind section titles — 01, 02, 03 */
font: Space Grotesk 700, 120px;
color: rgba(255,255,255,0.03);
position: absolute;
user-select: none;
pointer-events: none;
```

---

### Animation Defaults — `lib/animations.ts`

```ts
export const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

export const fadeInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}
```

**AnimatedSection — `components/ui/AnimatedSection.tsx`**
- Wraps any section, triggers on 20% in viewport
- Uses `useInView` with `{ once: true, amount: 0.2 }`
- Respects `prefers-reduced-motion` — skip animation if set
- Props: `children`, `className`, `variants?` (override), `delay?`

---

## 8. SECTION-BY-SECTION BUILD TASKS

> Execute in ORDER. Bootstrap (Task 0) must complete before any section task.

---

### TASK 0 — Project Bootstrap
```
1. npx create-next-app@latest sailhigh --typescript --tailwind --app
2. npm install framer-motion gsap lucide-react
3. Configure next.config.ts: output:'export', images:{unoptimized:true}, trailingSlash:true
4. Create lib/fonts.ts — Space Grotesk + DM Sans
5. Create globals.css — CSS variables, body background, dot grid texture, font variables on html
6. Configure tailwind.config.ts — extend colors to map CSS variables, fontFamily for heading/body
7. Create content/home.json and content/nav.json from this brief
8. Create lib/animations.ts with all 4 animation variants
9. Create components/ui/AnimatedSection.tsx
10. Create components/ui/SectionHeading.tsx
11. Create components/ui/GlassCard.tsx
```

---

### TASK 1 — Header & Navigation
```
Component: components/layout/Header.tsx
Data: content/nav.json

- Fixed top-0, z-50, full width
- Default: transparent background
- Scrolled (>60px): rgba(5,14,31,0.85) bg + backdrop-blur-xl + 1px bottom border
- Logo left: "Sail High" Space Grotesk bold + "Software Solutions" DM Sans muted small
- Nav links center: DM Sans 14px, --text-secondary, hover --accent
- "Solutions" dropdown on hover: GlassCard positioned absolute, 3 child links with stagger
- "Contact" link: outlined button, border --accent, text --accent, hover fill
- Mobile <768px: lucide Menu/X hamburger, slide-down menu with stagger Framer Motion
- Header scroll transition: Framer Motion useScroll + useMotionValueEvent
```

---

### TASK 2 — Hero Section
```
Component: components/sections/HeroSection.tsx
Data: content/home.json → hero

- min-h-screen, vertically centered
- Background: --bg-base + dot grid (inherited from body)
- Radial glow overlay: radial-gradient(ellipse at 50% 60%, rgba(0,198,255,0.06), transparent 70%)
- Layout: max-w-4xl, left-aligned desktop, centered mobile
- Trust line tag pill at very top (same style as SectionHeading tag)
- Headline: GSAP SplitText-style — each word slides up + fades in, 0.06s stagger per word
- Subheadline: Framer Motion fadeInUp, delay 1s
- Description dot-separated line: fadeInUp delay 1.4s, --text-muted color
- CTA row: fadeInUp delay 1.8s
  - Primary: filled --accent bg, Space Grotesk 15px, px-8 py-4, hover glow shadow
  - Secondary: transparent, 1px border --border-default, hover border --accent
- Bouncing scroll chevron at bottom center, fades out on scroll (useScroll opacity)
- NO images — typography + space IS the design
```

---

### TASK 3 — About Snapshot Section
```
Component: components/sections/AboutSnapshot.tsx
Data: content/home.json → about_snapshot

- Background: --bg-surface (creates depth break from hero)
- Two columns desktop (50/50): left = text, right = principles grid
- Left: SectionHeading + body paragraph + mission points checklist
  - Checklist: CheckCircle2 icon (lucide, --accent) + text, stagger fadeInUp on scroll
- Right: 2×2 grid of GlassCards
  - Each: large label (Space Grotesk white) + "not X" in --text-muted below
  - Hover: border-accent, subtle glow
- CTA text link bottom left: "Learn More About Us →" in --accent
- Left side: fadeInLeft animation, right side: stagger fadeInUp
```

---

### TASK 4 — Solutions Section
```
Component: components/sections/SolutionsSection.tsx
Data: content/home.json → solutions

- Background: --bg-base
- SectionHeading centered
- 3 GlassCards grid: 1 col mobile → 3 col desktop
- Each card:
  - Absolute decorative number (01/02/03) top-left, opacity 0.04, Space Grotesk 120px
  - Icon circle: lucide icon, solution's color_accent bg at 15% opacity, icon in color_accent
  - Title (Space Grotesk) + Subtitle (DM Sans muted)
  - Description paragraph
  - Capability list: first 3 visible, useState toggle for remaining items
  - "+ N more" / "Show less" button in --text-muted
  - Bottom tag: target audience text as small pill in solution's color_accent
- Hover: card border switches to solution's color_accent at 30% opacity
- Card entrance: stagger 0.12s left to right
```

---

### TASK 5 — Implementation Section
```
Component: components/sections/ImplementationSection.tsx
Data: content/home.json → implementation

- Background: --bg-surface
- SectionHeading centered
- Desktop: horizontal 5-step timeline
  - Numbered circles (Space Grotesk, --accent color, 1px border circle)
  - Connecting line between circles
  - Line animates left-to-right: Framer Motion scaleX from 0→1, transformOrigin: left
  - Below each circle: step title + description in GlassCard
- Mobile: vertical timeline, left-border line, stacked cards
- Footer note centered below in --text-muted, italic
```

---

### TASK 6 — Industries Section
```
Component: components/sections/IndustriesSection.tsx
Data: content/home.json → industries

- Background: --bg-base
- SectionHeading centered
- 6 GlassCards: 2 col mobile → 3 col tablet → 6 col desktop
- Each: lucide icon + label, compact and minimal
- Hover: border --accent, icon turns --accent, scale(1.04)
- Stagger entrance on scroll
- Keep visually light — supporting section, not hero
```

---

### TASK 7 — Why Choose Section
```
Component: components/sections/WhyChooseSection.tsx
Data: content/home.json → why_choose

- Background: --bg-surface
- SectionHeading centered
- 5 GlassCards: 1 col → 2 col → 3+2 col desktop (last row centered with CSS)
- Each: lucide icon in --accent circle, Space Grotesk title, DM Sans description
- Hover: left border 2px solid --accent appears
- Stagger animation on scroll
```

---

### TASK 8 — Security & Compliance Section
```
Component: components/sections/SecuritySection.tsx
Data: content/home.json → security

- Background: always --bg-base (signals seriousness)
- Two columns: left = SectionHeading + description + closing note, right = checklist
- Checklist: ShieldCheck lucide icon (--accent) + text, stagger fadeInUp on scroll
- Optional: very low opacity shield SVG watermark in background (CSS, pointer-events none)
- Palantir-style tone — minimal, sparse, institutional trust
- fadeInLeft left side, stagger right side
```

---

### TASK 9 — Contact CTA Section
```
Component: components/sections/ContactCTA.tsx
Data: content/home.json → contact_cta

- Background: radial-gradient(ellipse at center, rgba(0,198,255,0.08) 0%, transparent 70%), var(--bg-base)
- Border top: 1px --border-subtle
- Centered layout: SectionHeading tag + large H2 + description
- Large CTA button: Space Grotesk, --accent filled, px-10 py-4, hover: glow box-shadow
- Email link below: Mail lucide icon + "Hello@sailhighthailand.com" in --text-muted, mailto href
- fadeInUp entrance
```

---

### TASK 10 — Footer
```
Component: components/layout/Footer.tsx
Data: content/nav.json + email

- Background: #020912 (darker than --bg-base)
- Border top: 1px --border-subtle
- 3 columns desktop, stacked mobile:
  - Col 1: Logo + tagline + "Thailand-based technology company" in --text-muted
  - Col 2: Flat nav links list, DM Sans, --text-secondary, hover --accent
  - Col 3: "Get In Touch" + email link with Mail icon
- Bottom bar: thin top border, copyright left, "Built in Thailand 🇹🇭" right
- No animations — static
```

---

### TASK 11 — Home Page Assembly & Verification
```
File: app/page.tsx

1. Import all 8 section components
2. Import home.json statically (no fetch, no async)
3. Pass JSON slices as props to each component
4. Section order: Hero → About → Solutions → Implementation → Industries → WhyChoose → Security → CTA
5. Add JSON-LD Organization schema in <script type="application/ld+json">
6. Apply font variables in app/layout.tsx on <html> element

Verification:
- next build → confirm /out directory generated
- Confirm all routes show ○ (Static) in build output
- npx serve out → preview locally
- Check fonts load from /_next/static not googleapis.com
- Check all scroll animations trigger
- Check mobile hamburger opens/closes
- Lighthouse > 90 Performance
```

---

## 9. TYPESCRIPT INTERFACES

```ts
// Place at top of each component file

interface HeroProps {
  headline: string; subheadline: string; description: string; trust_line: string
  cta_primary: { label: string; href: string }
  cta_secondary: { label: string; href: string }
}

interface SolutionItem {
  id: string; number: string; title: string; subtitle: string; description: string
  capabilities: string[]; impacts?: string[]; target?: string
  designed_for?: string[]; note?: string; icon: string
  color_accent: "cyan" | "emerald" | "violet"
}

interface ImplementationStep { number: string; title: string; description: string }

interface WhyChooseItem { title: string; description: string; icon: string }

interface IndustryItem { label: string; icon: string }

interface NavItem {
  label: string; href: string; highlight?: boolean
  children?: { label: string; href: string }[]
}
```

---

## 10. PERFORMANCE CHECKLIST

```
□ next build completes with zero errors
□ /out directory generated (not /.next)
□ All pages show ○ (Static) in build output
□ images.unoptimized: true in next.config.ts
□ Fonts load from /_next/static — NOT fonts.googleapis.com
□ Lighthouse Performance > 90, Accessibility > 90, CLS = 0
□ No console errors in browser
□ Mobile hamburger opens, animates, closes on link tap
□ All scroll animations trigger on entry (once)
□ prefers-reduced-motion: all animations disabled/instant
□ All lucide-react icons imported individually (never wildcard)
□ Zero hardcoded copy in any component — all from JSON props
```

---

## 11. DEPLOYMENT

### Option A — Cloudflare Pages (best for Thailand latency)
```bash
next build
# Connect GitHub repo to Cloudflare Pages
# Build command: next build | Output directory: out
# Free tier — global CDN, fast Southeast Asia edge nodes
```

### Option B — AWS S3 + CloudFront
```bash
next build
aws s3 sync out/ s3://your-bucket-name --delete
# S3: enable static website hosting, index.html as root
# CloudFront: point to S3, set default root object to index.html
# Add error page: 404 → /404.html
```

---

## 12. HOW TO FEED TO CLAUDE CODE

### Batch 1 — Foundation
**Feed:** Sections 1–7 (all except tasks) + Task 0
**Goal:** Scaffold, fonts, colors, JSON, AnimatedSection + GlassCard + SectionHeading ready

### Batch 2 — Top Half
**Feed:** Task 1 + Task 2 + Task 3 + Task 4 + Section 9 interfaces
**Tell Claude Code:** "AnimatedSection, GlassCard, SectionHeading already exist"
**Goal:** Header, Hero, About, Solutions complete

### Batch 3 — Bottom Half
**Feed:** Task 5 + Task 6 + Task 7 + Task 8
**Tell Claude Code:** "Reuse GlassCard, AnimatedSection, SectionHeading from existing codebase"
**Goal:** Implementation, Industries, Why Choose, Security complete

### Batch 4 — Ship
**Feed:** Task 9 + Task 10 + Task 11 + Sections 10–11 (checklist + deployment)
**Goal:** Full page assembled, /out generated, Lighthouse clean, deploy-ready

---

## 13. FUTURE PAGES (Phase 2+)

```
app/about/page.tsx          → content/about.json
app/solutions/page.tsx      → content/solutions.json
app/industries/page.tsx     → content/industries.json
app/implementation/page.tsx → content/implementation.json
app/security/page.tsx       → content/security.json
app/contact/page.tsx        → content/contact.json
                               (contact form via Formspree or EmailJS — no server needed)
```

All pages reuse Phase 1 section components. Adding a page = 1 route file + 1 JSON file.

---

*Sail High Software Solutions — Build Brief v2.0*
*Visual references: altar.io (bold, spacious) × palantir.com (restrained, enterprise)*
*Font: Space Grotesk + DM Sans — modern-professional, not generic*
*Deploy: pure static /out → S3 or Cloudflare Pages, zero server*
