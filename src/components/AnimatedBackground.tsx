import React from 'react'
import { motion } from 'framer-motion'

interface AnimatedBackgroundProps {
  variant?: 'subtle' | 'medium' | 'intense'
}

/**
 * AnimatedBackground - Creates an immersive animated background with mesh gradients, glows, and particles
 * Never distracts from content but keeps the interface alive
 */
export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ variant = 'subtle' }) => {
  const blobs = [
    { size: 'w-96 h-96', top: '-20%', left: '-10%', color: 'from-blue-600', duration: 20 },
    { size: 'w-80 h-80', top: '20%', right: '-5%', color: 'from-purple-600', duration: 25 },
    { size: 'w-72 h-72', bottom: '-10%', left: '50%', color: 'from-cyan-600', duration: 30 },
    { size: 'w-64 h-64', bottom: '10%', right: '10%', color: 'from-pink-600', duration: 35 },
  ]

  const opacityVariant = {
    subtle: 0.08,
    medium: 0.12,
    intense: 0.18,
  }

  const durationVariant = {
    subtle: 40,
    medium: 30,
    intense: 20,
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Mesh gradient blobs */}
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          className={`absolute ${blob.size} rounded-full opacity-${Math.round(
            opacityVariant[variant] * 100
          )} filter blur-3xl pointer-events-none`}
          style={{
            top: blob.top,
            left: blob.left,
            right: blob.right,
            bottom: blob.bottom,
            background: `linear-gradient(135deg, rgb(${index * 50 + 100}, ${100 + index * 30}, 255) 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 20, -20, 0],
            y: [0, 30, -30, 0],
            opacity: [
              opacityVariant[variant] * 0.8,
              opacityVariant[variant],
              opacityVariant[variant] * 0.8,
            ],
          }}
          transition={{
            duration: durationVariant[variant] + index * 5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Radiant gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(54, 82, 208, 0.08), transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 30%, rgba(10, 15, 31, 0.4) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='400' height='400' fill='white' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

export default AnimatedBackground
