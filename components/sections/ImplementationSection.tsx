'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import GlassCard from '@/components/ui/GlassCard'
import { fadeInUp, staggerContainer } from '@/lib/animations'

interface Step {
  number: string
  title: string
  description: string
}

interface ImplementationSectionProps {
  tag: string
  heading: string
  description: string
  steps: Step[]
  footer_note: string
}

export default function ImplementationSection({
  tag,
  heading,
  description,
  steps,
  footer_note,
}: ImplementationSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section
      id="implementation"
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
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <SectionHeading tag={tag} heading={heading} subtext={description} centered />
        </motion.div>

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block">
          <div style={{ position: 'relative', marginBottom: '48px' }}>
            {/* Animated connecting line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                top: '24px',
                left: '10%',
                right: '10%',
                height: '1px',
                background: 'var(--border-accent)',
                transformOrigin: 'left',
              }}
            />

            {/* Step circles */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              {steps.map((step) => (
                <motion.div
                  key={step.number}
                  variants={fadeInUp}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1,
                    gap: '20px',
                  }}
                >
                  {/* Circle */}
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      border: '1px solid var(--border-accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--bg-base)',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 600,
                        fontSize: '14px',
                        color: 'var(--accent)',
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Card */}
                  <GlassCard style={{ padding: '20px 16px', width: '100%', maxWidth: '200px' }}>
                    <h4
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 600,
                        fontSize: '15px',
                        color: 'var(--text-primary)',
                        marginBottom: '8px',
                        lineHeight: 1.3,
                      }}
                    >
                      {step.title}
                    </h4>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        color: 'var(--text-muted)',
                        lineHeight: 1.6,
                      }}
                    >
                      {step.description}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <motion.div
          className="lg:hidden"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ position: 'relative' }}
        >
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: '23px',
              top: '48px',
              bottom: '0',
              width: '1px',
              background: 'var(--border-accent)',
              opacity: 0.5,
            }}
          />

          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={fadeInUp}
              style={{
                display: 'flex',
                gap: '20px',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--bg-surface)',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: 'var(--accent)',
                  }}
                >
                  {step.number}
                </span>
              </div>
              <GlassCard style={{ padding: '20px', flex: 1 }}>
                <h4
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    fontSize: '16px',
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                  }}
                >
                  {step.title}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--text-muted)',
                    lineHeight: 1.65,
                  }}
                >
                  {step.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
            marginTop: '48px',
          }}
        >
          {footer_note}
        </motion.p>
      </div>
    </section>
  )
}
