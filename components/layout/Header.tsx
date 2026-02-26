'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import navData from '@/content/nav.json'

interface NavChild {
  label: string
  href: string
}

interface NavLink {
  label: string
  href: string
  highlight?: boolean
  children?: NavChild[]
}

// Colors used when header is transparent (floating over the dark hero photo)
const OVER_DARK = {
  text:        'rgba(255,255,255,0.88)',
  textMuted:   'rgba(255,255,255,0.50)',
  accent:      '#68E6ED',
  accentBorder:'rgba(104,230,237,0.40)',
  accentBg:    'rgba(104,230,237,0.10)',
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 60)
  })

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const links: NavLink[] = navData.links

  // True when header is transparent and floating over the hero photo
  const onDark = !scrolled && !mobileOpen

  return (
    <>
      <motion.header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
          background: scrolled || mobileOpen ? 'var(--header-scrolled-bg)' : 'transparent',
          backdropFilter: scrolled || mobileOpen ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--header-border)' : '1px solid transparent',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 0 }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '20px',
                color: onDark ? '#F0F4FF' : 'var(--text-primary)',
                lineHeight: 1.1,
                transition: 'color 0.3s',
              }}
            >
              {navData.logo.text}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: onDark ? OVER_DARK.textMuted : 'var(--text-muted)',
                lineHeight: 1.2,
                letterSpacing: '0.06em',
                transition: 'color 0.3s',
              }}
            >
              {navData.logo.tagline}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            role="navigation"
            aria-label="Main navigation"
            className="hidden md:flex"
            style={{ alignItems: 'center', gap: '32px' }}
          >
            {links.map((link) => {
              if (link.children) {
                return (
                  <div
                    key={link.label}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        color: dropdownOpen
                          ? (onDark ? OVER_DARK.accent : 'var(--accent)')
                          : (onDark ? OVER_DARK.text : 'var(--text-secondary)'),
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'color 0.2s',
                        padding: 0,
                        minHeight: '44px',
                      }}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        style={{
                          transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                          transition: 'transform 0.2s',
                        }}
                      />
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          style={{
                            position: 'absolute',
                            top: 'calc(100% + 12px)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'var(--dropdown-bg)',
                            border: '1px solid var(--border-default)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '12px',
                            padding: '8px',
                            minWidth: '220px',
                            boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
                          }}
                        >
                          {link.children.map((child, i) => (
                            <motion.div
                              key={child.label}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              <Link
                                href={child.href}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  padding: '10px 14px',
                                  fontFamily: 'var(--font-body)',
                                  fontSize: '14px',
                                  color: 'var(--text-secondary)',
                                  textDecoration: 'none',
                                  borderRadius: '8px',
                                  transition: 'color 0.2s, background 0.2s',
                                  minHeight: '44px',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = 'var(--accent)'
                                  e.currentTarget.style.background = 'var(--color-cyan-glow)'
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = 'var(--text-secondary)'
                                  e.currentTarget.style.background = 'transparent'
                                }}
                              >
                                {child.label}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }

              if (link.highlight) {
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: onDark ? OVER_DARK.accent : 'var(--accent)',
                      textDecoration: 'none',
                      border: `1px solid ${onDark ? OVER_DARK.accentBorder : 'var(--border-accent)'}`,
                      borderRadius: '6px',
                      padding: '7px 18px',
                      transition: 'background 0.2s, border-color 0.2s, color 0.3s',
                      minHeight: '44px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = onDark ? OVER_DARK.accentBg : 'var(--color-cyan-bg)'
                      e.currentTarget.style.borderColor = onDark ? OVER_DARK.accent : 'var(--accent)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderColor = onDark ? OVER_DARK.accentBorder : 'var(--border-accent)'
                    }}
                  >
                    {link.label}
                  </Link>
                )
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: onDark ? OVER_DARK.text : 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    minHeight: '44px',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = onDark ? OVER_DARK.accent : 'var(--accent)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = onDark ? OVER_DARK.text : 'var(--text-secondary)' }}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Hamburger */}
          <button
            className="flex md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: onDark ? '#F0F4FF' : 'var(--text-primary)',
              padding: '4px',
              minWidth: '44px',
              minHeight: '44px',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 60,
              transition: 'color 0.3s',
            }}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: '72px',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 40,
              background: 'var(--bg-elevated)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ flex: 1, padding: '32px 32px 24px' }}>
              {links.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '18px 0',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      fontSize: '22px',
                      color: link.highlight ? 'var(--accent)' : 'var(--text-primary)',
                      textDecoration: 'none',
                      borderBottom: '1px solid var(--border-subtle)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div style={{ paddingLeft: '0', paddingBottom: '8px' }}>
                      {link.children.map((child, j) => (
                        <motion.div
                          key={child.label}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 + j * 0.05 + 0.05 }}
                        >
                          <Link
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              padding: '12px 16px',
                              fontFamily: 'var(--font-body)',
                              fontSize: '16px',
                              color: 'var(--text-secondary)',
                              textDecoration: 'none',
                              borderBottom: '1px solid var(--border-subtle)',
                            }}
                          >
                            {child.label}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: links.length * 0.07 + 0.1 }}
              style={{
                padding: '24px 32px',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.04em',
                }}
              >
                {navData.logo.tagline}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
