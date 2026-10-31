import React from 'react'
import { motion } from 'framer-motion'
import Glass from '@/components/Glass'
import type { PortfolioData } from '@/types'

interface ResearchProps {
  data: PortfolioData
}

const Research: React.FC<ResearchProps> = ({ data }) => {
  const papers = data.research?.papers || []

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
          <p className="eyebrow mb-4">Research</p>
          <h1 className="text-4xl md:text-5xl font-bold">Publications</h1>
        </motion.div>

        {papers.length > 0 ? (
          <div className="space-y-6">
            {papers.map((paper: any, index: number) => (
              <Glass
                key={paper.id}
                variant="default"
                animation="slideUp"
                delay={index * 0.1}
                className="p-8 space-y-3"
              >
                <h3 className="text-xl font-bold">{paper.title}</h3>
                <p className="text-sm text-accent-secondary">{paper.conference || paper.journal}</p>
                <p className="text-white text-opacity-80">{paper.abstract}</p>
              </Glass>
            ))}
          </div>
        ) : (
          <Glass variant="elevated" className="text-center">
            <p className="text-white text-opacity-60">Research page coming soon</p>
          </Glass>
        )}
      </div>
    </div>
  )
}

export default Research
