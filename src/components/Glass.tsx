import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface GlassProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'subtle'
  interactive?: boolean
  delay?: number
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'scaleIn' | 'none'
  onClick?: () => void
}

const glassVariants = {
  default: 'bg-glass backdrop-blur-glass border border-accent-primary border-opacity-20 shadow-lg',
  elevated: 'bg-glass backdrop-blur-glass border border-accent-primary border-opacity-30 shadow-2xl',
  subtle: 'bg-glass backdrop-blur-glass border border-white border-opacity-10 shadow-md',
}

const animationVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
  },
  none: {
    initial: {},
    animate: {},
  },
}

/**
 * Glass - Premium glass morphism component
 * Provides liquid glass appearance with animations
 */
export const Glass: React.FC<GlassProps> = ({
  children,
  className,
  variant = 'default',
  interactive = false,
  delay = 0,
  animation = 'fadeIn',
  onClick,
}) => {
  const variants = animationVariants[animation]
  const glassClass = glassVariants[variant]

  return (
    <motion.div
      className={clsx(
        'glass-panel',
        glassClass,
        'rounded-glass',
        'p-6',
        interactive && 'cursor-pointer hover:shadow-2xl transition-shadow duration-300',
        className
      )}
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay }}
      whileHover={interactive ? { y: -4 } : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

export default Glass
