import React from 'react'
import { motion } from 'framer-motion'
import Glass from '@/components/Glass'
import type { PortfolioData } from '@/types'

interface CertificationsProps {
  data: PortfolioData
}

const Certifications: React.FC<CertificationsProps> = ({ data }) => {
  const certifications = data.certifications?.certifications || []

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
          <p className="eyebrow mb-4">Certifications</p>
          <h1 className="text-4xl md:text-5xl font-bold">Credentials</h1>
        </motion.div>

        {certifications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert: any, index: number) => (
              <Glass
                key={cert.id}
                variant="default"
                animation="slideUp"
                delay={index * 0.05}
                className="p-6 text-center space-y-3"
              >
                <h3 className="text-lg font-bold">{cert.title}</h3>
                <p className="text-accent-secondary text-sm">{cert.issuer}</p>
                {cert.dateIssued && (
                  <p className="text-xs text-white text-opacity-60">{cert.dateIssued}</p>
                )}
              </Glass>
            ))}
          </div>
        ) : (
          <Glass variant="elevated" className="text-center">
            <p className="text-white text-opacity-60">Certifications page coming soon</p>
          </Glass>
        )}
      </div>
    </div>
  )
}

export default Certifications
