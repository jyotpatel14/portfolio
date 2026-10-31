import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import Glass from '@/components/Glass'
import type { PortfolioData } from '@/types'

interface HomeProps {
  data: PortfolioData
}

/**
 * Home Page - Premium paginated hero with introduction, tech stack, experience, and education
 */
const Home: React.FC<HomeProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const isMobile = window.innerWidth < 768
  const profile = data.profile
  const skills = data.skills
  const experience = data.experience
  const education = data.education

  if (!profile) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-white text-opacity-60">Loading profile...</p>
      </div>
    )
  }

  const pages = [
    'hero',
    ...(skills ? ['tech-stack'] : []),
    ...(experience ? ['experience'] : []),
    ...(education ? ['education'] : []),
  ]

  const handleWheel = (e: React.WheelEvent) => {
    if (isMobile) return
    
    if (e.deltaY > 0 && currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
    } else if (e.deltaY < 0 && currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' && currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
    } else if (e.key === 'ArrowUp' && currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div
      className="w-full min-h-screen focus:outline-none"
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {isMobile ? (
        // Mobile: Vertical scrolling
        <MobileHome profile={profile} skills={skills} experience={experience} education={education} />
      ) : (
        // Desktop: Paginated horizontal view
        <DesktopHome
          currentPage={currentPage}
          pages={pages}
          setCurrentPage={setCurrentPage}
          profile={profile}
          skills={skills}
          experience={experience}
          education={education}
        />
      )}
    </div>
  )
}

interface MobileHomeProps {
  profile: any
  skills: any
  experience: any
  education: any
}

const MobileHome: React.FC<MobileHomeProps> = ({ profile, skills, experience, education }) => {
  return (
    <div className="space-y-12 p-6 pb-12">
      {/* Hero Section */}
      <HeroSection profile={profile} />

      {/* Tech Stack */}
      {skills && <TechStackSection skills={skills} />}

      {/* Experience Preview */}
      {experience && <ExperiencePreview experience={experience} />}

      {/* Education Preview */}
      {education && <EducationPreview education={education} />}
    </div>
  )
}

interface DesktopHomeProps {
  currentPage: number
  pages: string[]
  setCurrentPage: (page: number) => void
  profile: any
  skills: any
  experience: any
  education: any
}

const DesktopHome: React.FC<DesktopHomeProps> = ({
  currentPage,
  pages,
  setCurrentPage,
  profile,
  skills,
  experience,
  education,
}) => {
  const renderPage = () => {
    const page = pages[currentPage]
    switch (page) {
      case 'tech-stack':
        return <TechStackSection skills={skills} />
      case 'experience':
        return <ExperiencePreview experience={experience} />
      case 'education':
        return <EducationPreview education={education} />
      default:
        return <HeroSection profile={profile} />
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      {/* Current Page Content */}
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl"
      >
        {renderPage()}
      </motion.div>

      {/* Page Indicators */}
      <motion.div
        className="absolute bottom-8 flex gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {pages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentPage ? 'bg-accent-primary w-8' : 'bg-white bg-opacity-30 w-2'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </motion.div>

      {/* Navigation Hint */}
      <motion.div
        className="absolute bottom-20 text-white text-opacity-40 text-xs font-mono flex gap-2 items-center"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>Scroll or press ↓ for next</span>
      </motion.div>
    </div>
  )
}

const HeroSection: React.FC<{ profile: any }> = ({ profile }) => {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Left: Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div>
          <p className="eyebrow mb-4">Welcome</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
            {profile.name}
          </h1>
          <p className="text-lg md:text-xl text-accent-secondary mt-4">{profile.headline}</p>
        </div>

        <p className="text-base md:text-lg text-white text-opacity-80 leading-relaxed max-w-lg">
          {profile.summary}
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 pt-4">
          {profile.resumeUrl && (
            <motion.a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-dark-bg font-semibold rounded-lg hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} /> Resume
            </motion.a>
          )}

          {profile.socials?.find((s: any) => s.platform === 'GitHub') && (
            <motion.a
              href={profile.socials.find((s: any) => s.platform === 'GitHub')?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-accent-primary text-accent-primary font-semibold rounded-lg hover:bg-accent-primary hover:bg-opacity-10 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={18} /> GitHub
            </motion.a>
          )}
        </div>
      </motion.div>

      {/* Right: Portrait */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center items-center"
      >
        <Glass
          variant="elevated"
          className="p-0 overflow-hidden w-72 h-72 md:w-80 md:h-80"
        >
          {profile.profileImageUrl ? (
            <img
              src={profile.profileImageUrl}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent-primary to-accent-secondary opacity-50 flex items-center justify-center">
              <span className="text-white text-opacity-30">Profile Image</span>
            </div>
          )}
        </Glass>

        {/* Availability Badge */}
        <motion.div
          className="absolute bottom-0 right-0 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-dark-bg text-xs font-bold rounded-full shadow-lg"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Available
        </motion.div>
      </motion.div>
    </div>
  )
}

const TechStackSection: React.FC<{ skills: any }> = ({ skills }) => {
  if (!skills?.skills) return null

  const techStackSkills = skills.skills.slice(0, 12)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div>
        <p className="eyebrow mb-4">Tech Stack</p>
        <h2 className="text-3xl md:text-4xl font-bold">Technologies & Tools</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {techStackSkills.map((skill: any, index: number) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -8, scale: 1.05 }}
          >
            <Glass variant="default" className="h-24 flex flex-col items-center justify-center text-center">
              {skill.logoUrl ? (
                <img
                  src={skill.logoUrl}
                  alt={skill.name}
                  className="w-10 h-10 mb-2 object-contain"
                />
              ) : (
                <div className="w-10 h-10 mb-2 bg-accent-primary bg-opacity-20 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-accent-primary">{skill.name.slice(0, 2)}</span>
                </div>
              )}
              <p className="text-xs md:text-sm font-semibold">{skill.name}</p>
            </Glass>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

const ExperiencePreview: React.FC<{ experience: any }> = ({ experience }) => {
  if (!experience?.experiences) return null

  const currentRole = experience.experiences.find((exp: any) => exp.isCurrent)
  const pastRoles = experience.experiences.filter((exp: any) => !exp.isCurrent).slice(0, 2)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div>
        <p className="eyebrow mb-4">Experience</p>
        <h2 className="text-3xl md:text-4xl font-bold">Professional Journey</h2>
      </div>

      <div className="space-y-4">
        {currentRole && (
          <Glass variant="elevated" className="border-accent-primary border-opacity-40">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold">{currentRole.position}</h3>
                <p className="text-accent-secondary text-sm">{currentRole.company}</p>
              </div>
              <span className="px-3 py-1 bg-green-500 bg-opacity-20 text-green-400 text-xs font-bold rounded-full">
                Current
              </span>
            </div>
            <p className="text-sm text-white text-opacity-70 mb-3">{currentRole.startDate}</p>
            <p className="text-sm text-white text-opacity-80">{currentRole.description}</p>
          </Glass>
        )}

        {pastRoles.map((role: any, index: number) => (
          <Glass
            key={index}
            variant="default"
            className="hover:border-accent-primary hover:border-opacity-40 transition-all"
            animation="slideUp"
            delay={index * 0.1}
          >
            <div>
              <h3 className="text-lg font-bold">{role.position}</h3>
              <p className="text-accent-secondary text-sm mb-2">{role.company}</p>
              <p className="text-xs text-white text-opacity-60 font-mono">
                {role.startDate} - {role.endDate || 'Present'}
              </p>
            </div>
          </Glass>
        ))}
      </div>
    </motion.div>
  )
}

const EducationPreview: React.FC<{ education: any }> = ({ education }) => {
  if (!education?.education) return null

  const institutions = education.education.slice(0, 2)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div>
        <p className="eyebrow mb-4">Education</p>
        <h2 className="text-3xl md:text-4xl font-bold">Academic Background</h2>
      </div>

      <div className="space-y-4">
        {institutions.map((edu: any, index: number) => (
          <Glass
            key={index}
            variant="default"
            animation="slideUp"
            delay={index * 0.1}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold">{edu.degree}</h3>
                <p className="text-accent-secondary text-sm mb-2">{edu.university}</p>
                <p className="text-xs text-white text-opacity-70">
                  {edu.field} • {edu.startDate} - {edu.endDate}
                </p>
                {edu.cgpa && (
                  <p className="text-xs text-accent-primary mt-2 font-mono">CGPA: {edu.cgpa}</p>
                )}
              </div>
            </div>
          </Glass>
        ))}
      </div>
    </motion.div>
  )
}

export default Home
