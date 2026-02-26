'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import gsap from 'gsap'

interface HeroProps {
  headline: string
  subheadline: string
  description: string
  trust_line: string
  cta_primary: { label: string; href: string }
  cta_secondary: { label: string; href: string }
}

export default function HeroSection({
  headline,
  subheadline,
  description,
  trust_line,
  cta_primary,
  cta_secondary,
}: HeroProps) {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const { scrollY } = useScroll()
  const chevronOpacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const el = headlineRef.current
    if (!el) return

    const words = el.querySelectorAll('.word')
    gsap.fromTo(
      words,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: 'power3.out',
        delay: 0.2,
      }
    )
  }, [])

  const words = headline.split(' ')

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        padding: '120px 24px 80px',
        overflow: 'hidden',
      }}
    >
      {/* Radial glow overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 60%, var(--accent-glow), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%', position: 'relative' }}>
        {/* Trust line pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ marginBottom: '28px' }}
        >
          <span
            style={{
              display: 'inline-block',
              fontSize: '11px',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--accent)',
              background: 'var(--color-cyan-bg)',
              border: '1px solid var(--color-cyan-border)',
              borderRadius: '4px',
              padding: '4px 12px',
            }}
          >
            {trust_line}
          </span>
        </motion.div>

        {/* Headline — GSAP word animation */}
        <h1
          ref={headlineRef}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: 'clamp(36px, 5.5vw, 70px)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            marginBottom: '28px',
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="word"
              style={{ display: 'inline-block', marginRight: '0.28em', opacity: 0 }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            maxWidth: '720px',
            marginBottom: '16px',
          }}
        >
          {subheadline}
        </motion.p>

        {/* Description dot-separated */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--text-muted)',
            marginBottom: '40px',
            letterSpacing: '0.02em',
          }}
        >
          {description}
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
        >
          <a
            href={cta_primary.href}
            style={{
              display: 'inline-block',
              background: 'var(--accent)',
              color: 'var(--cta-text)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: '15px',
              padding: '16px 32px',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'box-shadow 0.3s, transform 0.2s',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 40px var(--accent-glow)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {cta_primary.label}
          </a>
          <a
            href={cta_secondary.href}
            style={{
              display: 'inline-block',
              background: 'transparent',
              color: 'var(--cta-secondary-text)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 500,
              fontSize: '15px',
              padding: '16px 32px',
              borderRadius: '8px',
              textDecoration: 'none',
              border: '1px solid var(--cta-secondary-border)',
              transition: 'border-color 0.3s, color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--accent)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--cta-secondary-border)'
              e.currentTarget.style.color = 'var(--cta-secondary-text)'
            }}
          >
            {cta_secondary.label}
          </a>
        </motion.div>
      </div>

      {/* Scroll chevron */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: chevronOpacity,
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'var(--text-muted)' }}
        >
          <ChevronDown size={36} />
        </motion.div>
      </motion.div>
    </section>
  )
}
