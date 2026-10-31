import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

export interface TimelineItem {
  id: string
  title: string
  subtitle: string
  date: string
  content?: string
  details?: string[]
  technologies?: string[]
  metrics?: string[]
  image?: string
  color?: 'blue' | 'purple' | 'cyan' | 'pink'
  isCurrent?: boolean
}

interface TimelineProps {
  items: TimelineItem[]
  variant?: 'vertical' | 'horizontal'
  className?: string
}

const colorVariants = {
  blue: 'from-blue-500 to-cyan-500',
  purple: 'from-purple-500 to-pink-500',
  cyan: 'from-cyan-500 to-teal-500',
  pink: 'from-pink-500 to-rose-500',
}

const colorDots = {
  blue: 'bg-blue-500 ring-blue-500',
  purple: 'bg-purple-500 ring-purple-500',
  cyan: 'bg-cyan-500 ring-cyan-500',
  pink: 'bg-pink-500 ring-pink-500',
}

/**
 * Timeline Component - Display items chronologically with beautiful styling
 */
export const Timeline: React.FC<TimelineProps> = ({
  items,
  variant = 'vertical',
  className,
}) => {
  return (
    <div
      className={clsx(
        variant === 'vertical' ? 'space-y-6 md:space-y-8' : 'flex gap-6 overflow-x-auto pb-4',
        className
      )}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className={variant === 'vertical' ? 'relative' : 'flex-shrink-0 w-96'}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {/* Vertical timeline line and dot */}
          {variant === 'vertical' && (
            <>
              <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-gradient-to-b from-accent-primary to-accent-secondary" />
              <div
                className={clsx(
                  'absolute left-0 top-8 w-8 h-8 rounded-full ring-4 ring-dark-bg',
                  colorDots[item.color || 'blue'],
                  item.isCurrent && 'animate-pulse-glow'
                )}
              />
            </>
          )}

          {/* Timeline card */}
          <div className={clsx(variant === 'vertical' && 'ml-16')}>
            <motion.div
              className="bg-glass backdrop-blur-glass border border-accent-primary border-opacity-20 rounded-glass p-6 hover:border-opacity-40 transition-all"
              whileHover={{ y: -4 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-accent-secondary text-sm font-mono">{item.subtitle}</p>
                </div>
                {item.isCurrent && (
                  <div className="px-3 py-1 bg-gradient-to-r from-accent-primary to-accent-secondary text-dark-bg text-xs font-bold rounded-full">
                    Current
                  </div>
                )}
              </div>

              {/* Date */}
              <div className="text-xs text-white text-opacity-60 font-mono mb-4">{item.date}</div>

              {/* Content */}
              {item.content && <p className="text-sm text-white text-opacity-80 mb-4">{item.content}</p>}

              {/* Details */}
              {item.details && item.details.length > 0 && (
                <div className="space-y-2 mb-4">
                  {item.details.map((detail, i) => (
                    <div key={i} className="flex gap-2 text-sm text-white text-opacity-70">
                      <span className="text-accent-secondary">•</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Technologies */}
              {item.technologies && item.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-accent-primary bg-opacity-10 text-accent-primary rounded-md border border-accent-primary border-opacity-20"
                    >
                      {tech}
                    </span>
                  ))}
                  {item.technologies.length > 4 && (
                    <span className="text-xs px-2 py-1 text-white text-opacity-60">
                      +{item.technologies.length - 4} more
                    </span>
                  )}
                </div>
              )}

              {/* Metrics */}
              {item.metrics && item.metrics.length > 0 && (
                <div className="text-xs text-accent-secondary font-mono space-y-1">
                  {item.metrics.map((metric, i) => (
                    <div key={i}>→ {metric}</div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Timeline
