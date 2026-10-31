import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import AnimatedBackground from '@/components/AnimatedBackground'
import Navigation from '@/components/Navigation'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Projects from '@/pages/Projects'
import Experience from '@/pages/Experience'
import Research from '@/pages/Research'
import Certifications from '@/pages/Certifications'
import Contact from '@/pages/Contact'

type PageKey = 'home' | 'about' | 'projects' | 'experience' | 'research' | 'certifications' | 'contact'

const pages: Record<PageKey, React.ComponentType<any>> = {
  home: Home,
  about: About,
  projects: Projects,
  experience: Experience,
  research: Research,
  certifications: Certifications,
  contact: Contact,
}

const pageOrder: PageKey[] = ['home', 'about', 'projects', 'experience', 'research', 'certifications', 'contact']

interface AppProps {}

/**
 * App - Main application component
 * Handles desktop/mobile navigation modes and page transitions
 */
const App: React.FC<AppProps> = () => {
  const { data, loading, error } = usePortfolioData()
  const [currentPage, setCurrentPage] = useState<PageKey>('home')
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [direction, setDirection] = useState(0)

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle page navigation with direction tracking
  const handleNavigate = (page: PageKey) => {
    const currentIndex = pageOrder.indexOf(currentPage)
    const nextIndex = pageOrder.indexOf(page)
    setDirection(nextIndex > currentIndex ? 1 : -1)
    setCurrentPage(page)
  }

  // Handle keyboard navigation on desktop
  useEffect(() => {
    if (isMobile) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = pageOrder.indexOf(currentPage)

      if (e.key === 'ArrowRight' && currentIndex < pageOrder.length - 1) {
        handleNavigate(pageOrder[currentIndex + 1])
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        handleNavigate(pageOrder[currentIndex - 1])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentPage, isMobile])

  // Handle mouse wheel navigation on desktop
  useEffect(() => {
    if (isMobile) return

    let wheelTimeout: ReturnType<typeof setTimeout>

    const handleWheel = (e: WheelEvent) => {
      clearTimeout(wheelTimeout)
      wheelTimeout = setTimeout(() => {
        const currentIndex = pageOrder.indexOf(currentPage)

        if (e.deltaX > 0 || e.deltaY > 0) {
          if (currentIndex < pageOrder.length - 1) {
            handleNavigate(pageOrder[currentIndex + 1])
          }
        } else {
          if (currentIndex > 0) {
            handleNavigate(pageOrder[currentIndex - 1])
          }
        }
      }, 100)
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      clearTimeout(wheelTimeout)
    }
  }, [currentPage, isMobile])

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-dark-bg">
        <AnimatedBackground />
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-accent-primary font-mono text-sm"
        >
          Loading portfolio...
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-dark-bg">
        <AnimatedBackground />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-accent-primary mb-4">Error Loading Portfolio</h1>
          <p className="text-white text-opacity-60">{error}</p>
        </div>
      </div>
    )
  }

  const CurrentPage = pages[currentPage]

  return (
    <div className="w-full min-h-screen bg-dark-bg overflow-hidden">
      <AnimatedBackground variant="subtle" />

      {/* Navigation */}
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isMobile={isMobile}
        pages={pageOrder}
      />

      {/* Main Content */}
      {isMobile ? (
        // Mobile: Vertical scrolling
        <main className="pt-20">
          <CurrentPage data={data} />
        </main>
      ) : (
        // Desktop: Horizontal page transitions
        <main className="w-full h-[calc(100vh-80px)] mt-20 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: direction > 0 ? 1000 : -1000 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -1000 : 1000 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full h-full"
            >
              <div className="w-full h-full overflow-y-auto">
                <CurrentPage data={data} />
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      )}

      {/* Navigation Dots (Desktop) */}
      {!isMobile && (
        <motion.div
          className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {pageOrder.map((page) => (
            <motion.button
              key={page}
              onClick={() => handleNavigate(page)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentPage === page
                  ? 'bg-accent-primary scale-125'
                  : 'bg-white bg-opacity-20 hover:bg-opacity-40'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to ${page}`}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default App
