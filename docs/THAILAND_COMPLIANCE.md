# Thailand Legal & Regulatory Compliance

This document outlines the key Thai legal frameworks applicable to the Sail High Software Solutions website and its operations.

---

## 1. Personal Data Protection Act (PDPA) B.E. 2562 (2019)

Thailand's PDPA governs the collection, use, and disclosure of personal data.

### Key Requirements

| Requirement | Implementation |
|---|---|
| **Consent** | Obtain explicit, informed consent before collecting personal data via contact forms |
| **Privacy Policy** | Publish a clear Privacy Policy stating what data is collected, how it is used, and with whom it is shared |
| **Cookie Consent** | Display a cookie banner on first visit; non-essential cookies require opt-in consent |
| **Data Subject Rights** | Provide mechanisms for users to access, correct, delete, or port their personal data |
| **Breach Notification** | Notify the PDPC within 72 hours of discovering a personal data breach affecting rights and freedoms |
| **Data Retention** | Define and enforce data retention periods; delete data when no longer necessary |
| **Data Controller Registration** | Register as a Data Controller with the PDPC if processing sensitive categories of data |

### Action Items
- Add a Privacy Policy page (`/privacy-policy`)
- Implement a cookie consent banner (e.g., using a lightweight consent management platform)
- Add a contact form data notice with consent checkbox
- Designate a Data Protection Officer (DPO) contact

---

## 2. Computer Crime Act B.E. 2550/2560 (2007/2017)

Governs computer-related offences and obligations for website operators.

### Key Requirements

| Requirement | Detail |
|---|---|
| **Log Retention** | Service providers must retain traffic/access logs for at least 90 days |
| **Prohibited Content** | Do not publish content that is false, pornographic, threatening to national security, or violates the Computer Crime Act |
| **Authority Cooperation** | Cooperate with requests from the Electronic Transactions Development Agency (ETDA) and law enforcement |
| **Unlawful Access** | Implement security controls to prevent unauthorized access to systems |

### Action Items
- Configure web server / CDN to retain access logs for ≥ 90 days
- Ensure hosting infrastructure (AWS S3 / Cloudflare) has logging enabled
- Document incident response procedure

---

## 3. Electronic Transactions Act B.E. 2544 (2001)

Establishes the legal validity of electronic transactions and digital signatures.

### Key Requirements

| Requirement | Detail |
|---|---|
| **E-Contract Validity** | Electronic agreements (e.g., service contracts sent by email) are legally binding |
| **Digital Signatures** | Qualified electronic signatures carry the same legal weight as handwritten signatures |
| **Record Keeping** | Electronic records must be stored in a manner that maintains their integrity and accessibility |

### Action Items
- Ensure any digital service agreements reference the Electronic Transactions Act
- Use certified e-signature platforms for binding contracts

---

## 4. Ministry of Digital Economy and Society (MDES) Requirements

### Website Accessibility
- Thai government and government-related entities are expected to comply with **WCAG 2.1 Level AA** accessibility standards
- This website targets WCAG 2.1 AA compliance (see Accessibility section below)

### Business Registration
- Display company registration information prominently (see Mandatory Disclosures below)
- Ensure the company is registered with the **Department of Business Development (DBD)**

### Security
- Implement HTTPS across all pages (mandatory for data security)
- Use a valid SSL/TLS certificate

---

## 5. Mandatory Website Disclosures

Thai law and best practices require the following information to be displayed on the website:

| Field | Detail |
|---|---|
| **Company Name** | Sail High Software Solutions Co., Ltd. (or equivalent legal name) |
| **Company Registration Number** | As registered with the DBD |
| **Registered Address** | Full Thai registered business address |
| **Tax Identification Number (TIN)** | 13-digit Thai TIN |
| **Contact Email / Phone** | At minimum one direct contact method |

**Recommended location**: Footer of every page, or a dedicated `/about` page with a legal section.

---

## 6. WCAG 2.1 AA Compliance

This website targets WCAG 2.1 Level AA as required by MDES guidelines and Thai government standards.

### Implemented Measures
- **Skip link**: "Skip to main content" anchor for keyboard users
- **Focus indicators**: All interactive elements have visible `:focus-visible` outlines
- **ARIA attributes**: `aria-expanded`, `aria-haspopup`, `role="navigation"`, `aria-label` on all interactive UI components
- **Touch targets**: All buttons and links meet the 44×44px minimum touch target size
- **Color contrast**: Dark theme accent (#68E6ED on #050E1F = 8.2:1 ratio); Light theme accent (#0F4082 on #FFFFFF = 7.5:1 ratio) — both exceed AA (4.5:1) and achieve AAA (7:1)
- **Reduced motion**: Animations are suppressed via `prefers-reduced-motion: reduce` media query
- **Semantic HTML**: Proper heading hierarchy (`h1` → `h2` → `h3` → `h4`), landmark roles (`header`, `main`, `footer`, `nav`)

---

## 7. Content Restrictions

### Section 112 — Lèse-Majesté
Thailand's Criminal Code Section 112 prohibits any content that defames, insults, or threatens the King, Queen, Heir-Apparent, or Regent. Penalties include 3–15 years imprisonment per count.

**Policy**: All website content must be reviewed to ensure it contains no material that could be interpreted as violating Section 112.

### General Prohibited Content (Computer Crime Act Section 14)
- False information that causes public panic or damages national security
- Content that is obscene
- Content related to terrorism or national security threats

---

## 8. Recommended Next Steps

1. [ ] Engage a Thai data privacy legal counsel to review PDPA compliance
2. [ ] Implement cookie consent management platform
3. [ ] Add Privacy Policy page
4. [ ] Register with PDPC as Data Controller
5. [ ] Add mandatory business disclosures to website footer
6. [ ] Configure infrastructure log retention (≥ 90 days)
7. [ ] Conduct WCAG 2.1 AA audit using Lighthouse and axe DevTools
8. [ ] Obtain valid SSL certificate and enforce HTTPS

---

*Last updated: February 2026. This document is for informational purposes only and does not constitute legal advice. Consult a qualified Thai legal professional for binding compliance guidance.*
