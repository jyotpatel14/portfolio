import React from 'react'
import { motion } from 'framer-motion'
import Glass from '@/components/Glass'
import { Mail, Github, Linkedin, Download } from 'lucide-react'
import type { PortfolioData } from '@/types'

interface ContactProps {
  data: PortfolioData
}

const Contact: React.FC<ContactProps> = ({ data }) => {
  const profile = data.profile

  return (
    <div className="w-full min-h-screen p-8 md:p-12 flex items-center">
      <div className="max-w-2xl mx-auto w-full space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-4">Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold">Let's Connect</h1>
        </motion.div>

        {/* Contact Info */}
        {profile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            {profile.email && (
              <Glass variant="elevated" className="flex items-center gap-4">
                <div className="p-3 bg-accent-primary bg-opacity-20 rounded-lg">
                  <Mail className="w-6 h-6 text-accent-primary" />
                </div>
                <div>
                  <p className="text-sm text-white text-opacity-60">Email</p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-lg font-semibold text-accent-primary hover:underline"
                  >
                    {profile.email}
                  </a>
                </div>
              </Glass>
            )}

            {/* GitHub */}
            {profile.socials?.find((s: any) => s.platform === 'GitHub') && (
              <Glass variant="elevated" className="flex items-center gap-4">
                <div className="p-3 bg-accent-primary bg-opacity-20 rounded-lg">
                  <Github className="w-6 h-6 text-accent-primary" />
                </div>
                <div>
                  <p className="text-sm text-white text-opacity-60">GitHub</p>
                  <a
                    href={profile.socials.find((s: any) => s.platform === 'GitHub')?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-accent-primary hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              </Glass>
            )}

            {/* LinkedIn */}
            {profile.socials?.find((s: any) => s.platform === 'LinkedIn') && (
              <Glass variant="elevated" className="flex items-center gap-4">
                <div className="p-3 bg-accent-primary bg-opacity-20 rounded-lg">
                  <Linkedin className="w-6 h-6 text-accent-primary" />
                </div>
                <div>
                  <p className="text-sm text-white text-opacity-60">LinkedIn</p>
                  <a
                    href={profile.socials.find((s: any) => s.platform === 'LinkedIn')?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-accent-primary hover:underline"
                  >
                    Connect
                  </a>
                </div>
              </Glass>
            )}

            {/* Resume */}
            {profile.resumeUrl && (
              <Glass variant="elevated" className="flex items-center gap-4">
                <div className="p-3 bg-accent-primary bg-opacity-20 rounded-lg">
                  <Download className="w-6 h-6 text-accent-primary" />
                </div>
                <div>
                  <p className="text-sm text-white text-opacity-60">Resume</p>
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-accent-primary hover:underline"
                  >
                    Download
                  </a>
                </div>
              </Glass>
            )}
          </div>
        )}

        {/* Location */}
        {profile?.location && (
          <Glass variant="default" className="text-center">
            <p className="text-white text-opacity-60">
              {profile.location.city}, {profile.location.state} • {profile.location.country}
            </p>
          </Glass>
        )}
      </div>
    </div>
  )
}

export default Contact
