'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Truck, Factory, ShoppingCart, Package, BookOpen, Landmark, type LucideIcon } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { fadeInUp, staggerContainer } from '@/lib/animations'

interface IndustryItem {
  label: string
  icon: string
}

interface IndustriesSectionProps {
  tag: string
  heading: string
  items: IndustryItem[]
}

const iconMap: Record<string, LucideIcon> = {
  truck: Truck,
  factory: Factory,
  'shopping-cart': ShoppingCart,
  package: Package,
  'book-open': BookOpen,
  landmark: Landmark,
}

function IndustryTile({ item }: { item: IndustryItem }) {
  const [hovered, setHovered] = useState(false)
  const IconComp: LucideIcon = iconMap[item.icon] ?? Package

  return (
    <motion.div
      variants={fadeInUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '14px',
        padding: '28px 16px',
        borderRadius: '12px',
        border: `1px solid ${hovered ? 'var(--border-accent)' : 'var(--border-default)'}`,
        background: hovered ? 'var(--color-cyan-bg)' : 'var(--glass-bg)',
        backdropFilter: 'blur(12px)',
        textAlign: 'center',
        transition: 'border-color 0.25s, background 0.25s',
        cursor: 'default',
      }}
    >
      {/* Icon in a subtle circle */}
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: hovered ? 'var(--color-cyan-border)' : 'var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.25s',
          flexShrink: 0,
        }}
      >
        <IconComp
          size={24}
          style={{
            color: hovered ? 'var(--accent)' : 'var(--text-muted)',
            transition: 'color 0.25s',
          }}
        />
      </div>

      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          fontWeight: 500,
          color: hovered ? 'var(--text-primary)' : 'var(--text-secondary)',
          lineHeight: 1.4,
          transition: 'color 0.25s',
        }}
      >
        {item.label}
      </span>
    </motion.div>
  )
}

export default function IndustriesSection({ tag, heading, items }: IndustriesSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="industries"
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
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <SectionHeading tag={tag} heading={heading} centered />
        </motion.div>

        {/*
          Responsive grid — Tailwind handles column count, CSS handles the rest.
          2 cols on mobile → 3 cols on sm → 6 cols on lg.
          Stacked tiles (icon above label) stay consistent height at any column width.
        */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
          style={{ gap: '12px' }}
        >
          {items.map((item) => (
            <IndustryTile key={item.label} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
