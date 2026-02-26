'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { fadeInLeft, fadeInUp, staggerContainer } from '@/lib/animations'

interface SecuritySectionProps {
  tag: string
  heading: string
  description: string
  items: string[]
  note: string
}

export default function SecuritySection({ tag, heading, description, items, note }: SecuritySectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="security"
      ref={ref}
      style={{
        background: 'var(--bg-base)',
        padding: 'clamp(80px, 10vw, 140px) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Faint shield SVG watermark */}
      <svg
        aria-hidden
        style={{
          position: 'absolute',
          right: '-60px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '400px',
          height: '400px',
          opacity: 0.015,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '64px',
            alignItems: 'start',
          }}
        >
          {/* Left */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <SectionHeading tag={tag} heading={heading} subtext={description} />
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                marginTop: '24px',
                fontStyle: 'italic',
              }}
            >
              {note}
            </p>
          </motion.div>

          {/* Right: checklist */}
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {items.map((item) => (
              <motion.li
                key={item}
                variants={fadeInUp}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  color: 'var(--text-secondary)',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '20px',
                }}
              >
                <ShieldCheck size={28} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
