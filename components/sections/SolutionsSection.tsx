'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Cpu, GraduationCap, Users, type LucideIcon } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import GlassCard from '@/components/ui/GlassCard'
import { fadeInUp, staggerContainer } from '@/lib/animations'

interface SolutionItem {
  id: string
  number: string
  title: string
  subtitle: string
  description: string
  capabilities: string[]
  impacts?: string[]
  target?: string
  designed_for?: string[]
  note?: string
  icon: string
  color_accent: string
}

interface SolutionsSectionProps {
  tag: string
  heading: string
  items: SolutionItem[]
}

const iconMap: Record<string, LucideIcon> = {
  cpu: Cpu,
  'graduation-cap': GraduationCap,
  users: Users,
}

// Map color_accent names to CSS variable triplets
const accentVars: Record<string, { color: string; bg: string; border: string; glow: string }> = {
  cyan: {
    color: 'var(--color-cyan)',
    bg: 'var(--color-cyan-bg)',
    border: 'var(--color-cyan-border)',
    glow: 'var(--color-cyan-glow)',
  },
  emerald: {
    color: 'var(--color-emerald)',
    bg: 'var(--color-emerald-bg)',
    border: 'var(--color-emerald-border)',
    glow: 'var(--color-emerald-glow)',
  },
  violet: {
    color: 'var(--color-violet)',
    bg: 'var(--color-violet-bg)',
    border: 'var(--color-violet-border)',
    glow: 'var(--color-violet-glow)',
  },
}

function SolutionCard({ item, index }: { item: SolutionItem; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const vars = accentVars[item.color_accent] ?? accentVars.cyan
  const IconComp: LucideIcon = iconMap[item.icon] ?? Cpu
  const visibleCaps = expanded ? item.capabilities : item.capabilities.slice(0, 3)
  const remaining = item.capabilities.length - 3

  return (
    <motion.div variants={fadeInUp} custom={index}>
      <GlassCard
        hoverBorderColor={vars.border}
        style={{ padding: '36px 28px', height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
      >
        {/* Decorative large number */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: '-8px',
            left: '16px',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '120px',
            color: 'var(--decorative-num)',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {item.number}
        </span>

        {/* Icon */}
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '12px',
            background: vars.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <IconComp size={28} style={{ color: vars.color }} />
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: '21px',
            color: 'var(--text-primary)',
            marginBottom: '6px',
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--text-muted)',
            marginBottom: '16px',
            letterSpacing: '0.02em',
          }}
        >
          {item.subtitle}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: '24px',
          }}
        >
          {item.description}
        </p>

        {/* Capability list */}
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {visibleCaps.map((cap) => (
            <li
              key={cap}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: vars.color,
                  flexShrink: 0,
                  display: 'inline-block',
                }}
              />
              {cap}
            </li>
          ))}
        </ul>

        {remaining > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--text-muted)',
              padding: '8px 0',
              marginBottom: '20px',
              transition: 'color 0.2s',
              minHeight: '44px',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            {expanded ? '− Show less' : `+ ${remaining} more`}
          </button>
        )}

        {/* Target audience pill — pinned to bottom via flex */}
        {(item.target || item.note) && (
          <div style={{ marginTop: 'auto', paddingTop: '16px', flexShrink: 0 }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: '12px',
                fontFamily: 'var(--font-body)',
                color: vars.color,
                background: vars.bg,
                border: `1px solid ${vars.border}`,
                borderRadius: '4px',
                padding: '4px 10px',
                lineHeight: 1.5,
              }}
            >
              {item.target ?? item.note}
            </span>
          </div>
        )}
      </GlassCard>
    </motion.div>
  )
}

export default function SolutionsSection({ tag, heading, items }: SolutionsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section
      id="solutions"
      ref={ref}
      style={{
        background: 'var(--bg-base)',
        padding: 'clamp(80px, 10vw, 140px) 24px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <SectionHeading tag={tag} heading={heading} centered />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {items.map((item, i) => (
            <SolutionCard key={item.id} item={item} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
