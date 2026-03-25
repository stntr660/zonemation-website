'use client'

import { motion } from 'framer-motion'

function BackgroundOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      <motion.div
        className="absolute top-20 left-20 w-80 h-80 bg-[#a7d26d]/10 rounded-full blur-3xl"
        animate={{
          x: [0, 50, -25, 0],
          y: [0, -25, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl"
        animate={{
          x: [0, -50, 25, 0],
          y: [0, 25, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  )
}

export function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      <BackgroundOrbs />
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {subtitle && (
            <p className="text-[#a7d26d]/70 text-base font-medium uppercase tracking-widest mb-4">
              {subtitle}
            </p>
          )}
          <h1 className="text-5xl lg:text-6xl font-thin text-white tracking-wider leading-tight">
            {title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
