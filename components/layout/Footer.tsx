'use client'

import Link from 'next/link'
import { Mail } from 'lucide-react'
import navData from '@/content/nav.json'
import footerData from '@/content/footer.json'

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--footer-bg)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '64px 24px 0',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
            paddingBottom: '56px',
          }}
        >
          {/* Col 1: Logo + tagline */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '20px',
                color: 'var(--text-primary)',
                marginBottom: '4px',
              }}
            >
              {navData.logo.text}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
                marginBottom: '16px',
              }}
            >
              {navData.logo.tagline}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
              }}
            >
              {footerData.tagline}
            </p>
          </div>

          {/* Col 2: Nav links */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.10em',
                color: 'var(--text-muted)',
                marginBottom: '20px',
              }}
            >
              Navigation
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navData.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      minHeight: '44px',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Get in touch */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.10em',
                color: 'var(--text-muted)',
                marginBottom: '20px',
              }}
            >
              Get In Touch
            </p>
            <a
              href={`mailto:${footerData.email}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.2s',
                minHeight: '44px',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              <Mail size={24} />
              {footerData.email}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            padding: '20px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-muted)' }}>
            {footerData.copyright}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-muted)' }}>
            {footerData.built_in}
          </p>
        </div>
      </div>
    </footer>
  )
}
