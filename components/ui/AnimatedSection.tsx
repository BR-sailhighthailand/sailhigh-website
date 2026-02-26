'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  variants?: Variants
  delay?: number
  as?: keyof JSX.IntrinsicElements
}

export default function AnimatedSection({
  children,
  className,
  variants = fadeInUp,
  delay = 0,
  as: Tag = 'div',
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const motionVariants: Variants = delay
    ? {
        hidden: variants.hidden,
        visible: {
          ...(variants.visible as object),
          transition: {
            ...(typeof variants.visible === 'object' && 'transition' in variants.visible
              ? (variants.visible as { transition?: object }).transition
              : {}),
            delay,
          },
        },
      }
    : variants

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={motionVariants}
    >
      {children}
    </motion.div>
  )
}
