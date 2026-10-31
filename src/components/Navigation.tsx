import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'

interface NavigationProps {
  currentPage: string
  onNavigate: (page: string) => void
  isMobile: boolean
  pages: string[]
}

const navLabels: Record<string, string> = {
  home: 'Home',
  about: 'About',
  projects: 'Projects',
  experience: 'Experience',
  research: 'Research',
  certifications: 'Certifications',
  contact: 'Contact',
}

/**
 * Navigation - Premium glass navigation bar with mobile menu
 */
const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate, isMobile, pages }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 border-b border-white border-opacity-10 backdrop-blur-glass bg-dark-bg bg-opacity-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => onNavigate('home')}
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            JP
          </motion.button>

          {/* Desktop Menu */}
          {!isMobile && (
            <div className="hidden md:flex items-center gap-2">
              {pages.map((page) => (
                <motion.button
                  key={page}
                  onClick={() => onNavigate(page)}
                  className={clsx(
                    'px-4 py-2 rounded-lg transition-all relative',
                    currentPage === page
                      ? 'text-accent-primary'
                      : 'text-white text-opacity-70 hover:text-opacity-100'
                  )}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {navLabels[page]}
                  {currentPage === page && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary"
                      layoutId="underline"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-accent-primary hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-white border-opacity-10 bg-dark-bg bg-opacity-60 backdrop-blur-glass"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-6 py-4 space-y-2">
              {pages.map((page) => (
                <motion.button
                  key={page}
                  onClick={() => {
                    onNavigate(page)
                    setMobileMenuOpen(false)
                  }}
                  className={clsx(
                    'w-full text-left px-4 py-3 rounded-lg transition-all',
                    currentPage === page
                      ? 'bg-accent-primary bg-opacity-20 text-accent-primary'
                      : 'text-white text-opacity-70 hover:bg-white hover:bg-opacity-10'
                  )}
                  whileTap={{ scale: 0.98 }}
                >
                  {navLabels[page]}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  )
}

export default Navigation
