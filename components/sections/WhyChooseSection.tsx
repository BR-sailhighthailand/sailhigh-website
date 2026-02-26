'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, ShieldCheck, TrendingUp, Users2, Handshake, type LucideIcon } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { fadeInUp, staggerContainer } from '@/lib/animations'

interface WhyChooseItem {
  title: string
  description: string
  icon: string
}

interface WhyChooseSectionProps {
  tag: string
  heading: string
  items: WhyChooseItem[]
}

const iconMap: Record<string, LucideIcon> = {
  'map-pin': MapPin,
  'shield-check': ShieldCheck,
  'trending-up': TrendingUp,
  'users-2': Users2,
  handshake: Handshake,
}

function WhyItem({ item, index }: { item: WhyChooseItem; index: number }) {
  const [hovered, setHovered] = useState(false)
  const IconComp: LucideIcon = iconMap[item.icon] ?? ShieldCheck

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '40px 24px',
        background: hovered ? 'var(--glass-bg)' : 'transparent',
        transition: 'background 0.3s',
        cursor: 'default',
        position: 'relative',
        borderRight: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      {/* Accent number — faint background decoration */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: '12px',
          right: '16px',
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: '64px',
          color: 'var(--decorative-num)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon — no box, direct on surface, accent-colored on hover */}
      <div
        style={{
          marginBottom: '20px',
          transition: 'transform 0.3s',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        }}
      >
        <IconComp
          size={36}
          style={{
            color: hovered ? 'var(--accent)' : 'var(--text-muted)',
            transition: 'color 0.3s',
          }}
        />
      </div>

      {/* Title */}
      <h4
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 600,
          fontSize: '16px',
          color: hovered ? 'var(--text-primary)' : 'var(--text-secondary)',
          marginBottom: '10px',
          lineHeight: 1.35,
          transition: 'color 0.3s',
          maxWidth: '180px',
        }}
      >
        {item.title}
      </h4>

      {/* Divider — accent line that expands on hover */}
      <div
        style={{
          width: hovered ? '32px' : '20px',
          height: '2px',
          background: 'var(--accent)',
          borderRadius: '1px',
          marginBottom: '12px',
          opacity: hovered ? 1 : 0.35,
          transition: 'width 0.3s, opacity 0.3s',
        }}
      />

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: 'var(--text-muted)',
          lineHeight: 1.7,
          maxWidth: '200px',
        }}
      >
        {item.description}
      </p>
    </motion.div>
  )
}

export default function WhyChooseSection({ tag, heading, items }: WhyChooseSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section
      id="why-choose"
      ref={ref}
      style={{
        background: 'var(--bg-surface)',
        padding: 'clamp(80px, 10vw, 140px) 24px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: '16px' }}
        >
          <SectionHeading tag={tag} heading={heading} centered />
        </motion.div>

        {/*
          5 columns on lg, 3+2 on md (auto-fit handles the orphaned 5th item),
          2 on sm, 1 on mobile. No card boxes — whitespace and the subtle
          hover-fill do the visual grouping.
        */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
          style={{
            gap: 0,
            borderTop: '1px solid var(--border-subtle)',
            borderLeft: '1px solid var(--border-subtle)',
          }}
        >
          {items.map((item, i) => (
            <WhyItem key={item.title} item={item} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
