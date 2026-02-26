'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import GlassCard from '@/components/ui/GlassCard'
import { fadeInLeft, fadeInUp, staggerContainer } from '@/lib/animations'

interface AboutSnapshotProps {
  tag: string
  heading: string
  body: string
  mission_points: string[]
  principles: { label: string; opposite: string }[]
  cta: { label: string; href: string }
}

export default function AboutSnapshot({
  tag,
  heading,
  body,
  mission_points,
  principles,
  cta,
}: AboutSnapshotProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: 'var(--bg-surface)',
        padding: 'clamp(80px, 10vw, 140px) 24px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '64px',
            alignItems: 'start',
          }}
        >
          {/* Left: text */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <SectionHeading tag={tag} heading={heading} />

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '17px',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                marginTop: '24px',
                marginBottom: '32px',
              }}
            >
              {body}
            </p>

            {/* Mission points */}
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              {mission_points.map((point) => (
                <motion.li
                  key={point}
                  variants={fadeInUp}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <CheckCircle2 size={24} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  {point}
                </motion.li>
              ))}
            </motion.ul>

            <Link
              href={cta.href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: 'var(--accent)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'gap 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.gap = '10px' }}
              onMouseLeave={(e) => { e.currentTarget.style.gap = '6px' }}
            >
              {cta.label} →
            </Link>
          </motion.div>

          {/* Right: principles grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}
          >
            {principles.map((p) => (
              <motion.div key={p.label} variants={fadeInUp}>
                <GlassCard
                  hoverBorderColor="var(--border-accent)"
                  style={{ padding: '28px 24px' }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '22px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '6px',
                    }}
                  >
                    {p.label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {p.opposite}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
