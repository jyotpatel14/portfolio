import React from 'react'
import { motion } from 'framer-motion'
import Glass from '@/components/Glass'
import type { PortfolioData } from '@/types'

interface AboutProps {
  data: PortfolioData
}

const About: React.FC<AboutProps> = ({ data }) => {
  const about = data.about
  const profile = data.profile

  return (
    <div className="w-full min-h-screen p-8 md:p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-4">About</p>
          <h1 className="text-4xl md:text-5xl font-bold">My Story</h1>
        </motion.div>

        {/* Main content placeholder */}
        <Glass variant="elevated" className="space-y-6 text-center">
          <p className="text-lg text-white text-opacity-80">
            About page coming soon with full story, journey, philosophy, and values
          </p>
          {about?.philosophy && (
            <p className="text-base text-white text-opacity-70 italic">{about.philosophy}</p>
          )}
        </Glass>

        {/* Values grid */}
        {about?.values && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {about.values.map((value: string, index: number) => (
              <Glass
                key={index}
                variant="default"
                animation="slideUp"
                delay={index * 0.1}
                className="text-center py-8"
              >
                <p className="font-semibold text-accent-primary mb-2">✦</p>
                <p className="text-lg font-semibold">{value}</p>
              </Glass>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default About
