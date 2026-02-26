'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { fadeInUp } from '@/lib/animations'

interface ContactCTAProps {
  tag: string
  heading: string
  description: string
  cta: { label: string; href: string }
  email: string
}

export default function ContactCTA({ tag, heading, description, cta, email }: ContactCTAProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: 'radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 70%), var(--bg-base)',
        borderTop: '1px solid var(--border-subtle)',
        padding: 'clamp(80px, 10vw, 140px) 24px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <SectionHeading tag={tag} heading={heading} subtext={description} centered />

          <div style={{ marginTop: '40px' }}>
            <a
              href={cta.href}
              style={{
                display: 'inline-block',
                background: 'var(--accent)',
                color: 'var(--cta-text)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '16px',
                padding: '18px 40px',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'box-shadow 0.3s, transform 0.2s',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 48px var(--accent-glow)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {cta.label}
            </a>
          </div>

          <div style={{ marginTop: '28px' }}>
            <a
              href={`mailto:${email}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              <Mail size={24} />
              {email}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
