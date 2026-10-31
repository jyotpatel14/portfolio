import React from 'react'
import { motion } from 'framer-motion'
import Glass from '@/components/Glass'
import Timeline from '@/components/Timeline'
import type { PortfolioData, TimelineItem } from '@/types'

interface ExperienceProps {
  data: PortfolioData
}

const Experience: React.FC<ExperienceProps> = ({ data }) => {
  const experience = data.experience?.experiences || []

  const timelineItems: TimelineItem[] = experience.map((exp: any, index: number) => ({
    id: `exp-${index}`,
    title: exp.position,
    subtitle: exp.company,
    date: `${exp.startDate} - ${exp.endDate || 'Present'}`,
    content: exp.description,
    details: exp.responsibilities,
    technologies: exp.technologies,
    metrics: exp.achievements,
    isCurrent: exp.isCurrent,
    color: (["blue", "purple", "cyan", "pink"] as const)[index % 4],
  }))

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
          <p className="eyebrow mb-4">Experience</p>
          <h1 className="text-4xl md:text-5xl font-bold">Career Journey</h1>
        </motion.div>

        {timelineItems.length > 0 ? (
          <Timeline items={timelineItems} variant="vertical" />
        ) : (
          <Glass variant="elevated" className="text-center">
            <p className="text-white text-opacity-60">Experience page coming soon</p>
          </Glass>
        )}
      </div>
    </div>
  )
}

export default Experience
