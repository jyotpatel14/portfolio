import React from 'react'
import { motion } from 'framer-motion'
import Glass from '@/components/Glass'
import type { PortfolioData } from '@/types'

interface ProjectsProps {
  data: PortfolioData
}

const Projects: React.FC<ProjectsProps> = ({ data }) => {
  const projects = data.projects?.projects || []

  return (
    <div className="w-full min-h-screen p-8 md:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-4">Projects</p>
          <h1 className="text-4xl md:text-5xl font-bold">Featured Work</h1>
        </motion.div>

        {projects.length > 0 ? (
          <div className="grid gap-8">
            {projects.slice(0, 4).map((project: any, index: number) => (
              <Glass
                key={project.id}
                variant="default"
                animation="slideUp"
                delay={index * 0.1}
                className="p-8 space-y-4"
              >
                <h3 className="text-2xl font-bold">{project.name}</h3>
                <p className="text-white text-opacity-80">{project.description}</p>
                {project.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 5).map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-accent-primary bg-opacity-10 text-accent-primary rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </Glass>
            ))}
          </div>
        ) : (
          <Glass variant="elevated" className="text-center">
            <p className="text-white text-opacity-60">Projects page coming soon</p>
          </Glass>
        )}
      </div>
    </div>
  )
}

export default Projects
