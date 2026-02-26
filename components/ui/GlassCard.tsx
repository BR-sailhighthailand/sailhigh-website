'use client'

import { useState } from 'react'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  accentColor?: string
  hoverBorderColor?: string
  style?: React.CSSProperties
}

export default function GlassCard({
  children,
  className = '',
  accentColor,
  hoverBorderColor,
  style,
}: GlassCardProps) {
  const [hovered, setHovered] = useState(false)

  const borderColor = hovered
    ? (hoverBorderColor ?? 'var(--border-accent)')
    : 'var(--border-default)'

  const boxShadow = hovered
    ? `0 0 32px ${accentColor ? `${accentColor}14` : 'var(--color-cyan-glow)'}`
    : 'var(--card-shadow)'

  return (
    <div
      className={className}
      style={{
        background: 'var(--glass-bg)',
        border: `1px solid ${borderColor}`,
        backdropFilter: 'blur(12px)',
        borderRadius: '12px',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow,
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  )
}
