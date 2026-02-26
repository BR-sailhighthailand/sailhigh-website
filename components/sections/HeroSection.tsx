'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import gsap from 'gsap'

interface HeroBackground {
  type: string        // 'video' | 'image'
  src: string
  poster?: string
}

interface HeroProps {
  headline: string
  subheadline: string
  description: string
  trust_line: string
  cta_primary: { label: string; href: string }
  cta_secondary: { label: string; href: string }
  background?: HeroBackground
}

export default function HeroSection({
  headline,
  subheadline,
  description,
  trust_line,
  cta_primary,
  cta_secondary,
  background,
}: HeroProps) {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const videoRef    = useRef<HTMLVideoElement>(null)
  const { scrollY } = useScroll()
  const chevronOpacity = useTransform(scrollY, [0, 300], [1, 0])

  // GSAP word-by-word headline animation
  useEffect(() => {
    const el = headlineRef.current
    if (!el) return
    const words = el.querySelectorAll('.word')
    gsap.fromTo(
      words,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  // Respect prefers-reduced-motion — pause video if user prefers no motion
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) video.pause()
    const handler = (e: MediaQueryListEvent) => {
      e.matches ? video.pause() : video.play().catch(() => {})
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
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
      {/* ── Background layer (video or image, driven by home.json) ── */}
      {background?.type === 'video' && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={background.poster}
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            pointerEvents: 'none',
          }}
        >
          <source src={background.src} type="video/mp4" />
        </video>
      )}

      {background?.type === 'image' && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={background.src}
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Dark overlay — lets background show while keeping text legible */}
      {background && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(5, 14, 31, 0.62)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Radial cyan glow — always applied, always visible */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 60%, rgba(104,230,237,0.14), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Content ── */}
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
              color: '#68E6ED',
              background: 'rgba(104,230,237,0.12)',
              border: '1px solid rgba(104,230,237,0.35)',
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
            color: '#F0F4FF',
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
            color: 'rgba(255,255,255,0.82)',
            lineHeight: 1.75,
            maxWidth: '720px',
            marginBottom: '16px',
          }}
        >
          {subheadline}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.62)',
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
              background: '#68E6ED',
              color: '#050E1F',
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
              e.currentTarget.style.boxShadow = '0 0 40px rgba(104,230,237,0.40)'
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
              color: 'rgba(255,255,255,0.88)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 500,
              fontSize: '15px',
              padding: '16px 32px',
              borderRadius: '8px',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.22)',
              transition: 'border-color 0.3s, color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(104,230,237,0.70)'
              e.currentTarget.style.color = '#68E6ED'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.88)'
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
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          <ChevronDown size={36} />
        </motion.div>
      </motion.div>
    </section>
  )
}
