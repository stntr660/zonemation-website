'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface AnimatedLogoProps {
  size?: number
  isLoading?: boolean
  loop?: boolean
  onAnimationComplete?: () => void
}

export function AnimatedLogo({ 
  size = 64, 
  isLoading = false, 
  loop = false,
  onAnimationComplete 
}: AnimatedLogoProps) {
  const [animationKey, setAnimationKey] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isLoading && mounted) {
      const timer = setTimeout(() => {
        if (loop) {
          setAnimationKey(prev => prev + 1)
        } else {
          onAnimationComplete?.()
        }
      }, 2500)

      return () => clearTimeout(timer)
    }
  }, [isLoading, loop, mounted, animationKey, onAnimationComplete])

  if (!mounted) {
    return <div style={{ width: size, height: size }} />
  }

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 0.8,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" as const },
        opacity: { duration: 0.3 }
      }
    }
  }

  const fillVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.8,
        duration: 0.5
      }
    }
  }

  const glowVariants = {
    pulse: {
      opacity: [0.3, 0.8, 0.3],
      transition: {
        duration: 2,
        repeat: Infinity,
        delay: 1.5,
        ease: "easeInOut" as const
      }
    }
  }

  const sparkVariants = {
    travel: {
      scale: [0, 1, 1, 0],
      opacity: [0, 1, 1, 0],
      transition: {
        duration: 1.2,
        ease: "easeInOut" as const
      }
    }
  }

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        className="overflow-visible"
      >
        {/* Main Logo Paths */}
        <motion.g
          key={`fill-${animationKey}`}
          variants={fillVariants}
          initial="hidden"
          animate={isLoading ? "visible" : "hidden"}
        >
          <path 
            fill="#A7D26D" 
            d="M39.1,11.9c-0.2-0.4-0.9-0.2-1.4-0.2h-23c-1.1,0.1-2.1-0.4-2.7-1.2c-1.2-1.4-3.3-1.8-4.9-0.8 c-1.6,0.8-2.6,2.6-2.4,4.5c0.5,1.8,2,3.1,3.8,3.4c1.4,0.2,2.7-0.3,3.7-1.3c0.5-0.5,1.1-0.7,1.8-0.7h17.6l0.5,0.1 c-10,14.5-20.5,28.4-30.6,43c0.5,1.6,1.3,2.6,2.3,3.3c-0.1-0.2,0-0.5,0.4-1L14,47.2l24.4-33.9C38.7,12.8,39.3,12.4,39.1,11.9z"
          />
          <path 
            fill="#A7D26D" 
            d="M11.6,24.2c-1.5-1-3.5-0.9-4.9,0.3c-1.4,1-1.9,2.9-1.3,4.5c0.3,0.7,0.2,1.5-0.2,2.1l-3.7,5.1v5.4 l6.3-8.5c0.5-0.7,1.3-1.1,2.1-1.2c1.8-0.3,3.2-1.7,3.5-3.5C13.8,26.8,13,25.1,11.6,24.2z"
          />
          <path 
            fill="#A7D26D" 
            d="M63.1,27.8v-6.2c0,0.1-0.1,0.2-0.2,0.3c-2.2,3-4.4,6-6.6,9.1c-0.5,0.7-1.3,1.1-2.1,1.2 c-2.3,0.4-3.8,2.5-3.4,4.8c0.1,0.7,0.4,1.4,0.9,1.9c1.1,1.3,2.9,1.8,4.5,1.3c1.6-0.5,2.7-1.8,2.9-3.4c0.1-0.4,0-0.8-0.1-1.2 c-0.5-0.8-0.3-1.9,0.3-2.6C60.5,31.3,61.8,29.5,63.1,27.8z"
          />
          <path 
            fill="#A7D26D" 
            d="M60.2,2.9c-2.7,3.6-5.3,7.3-7.9,11l-15.2,21L24.9,51.8c-0.2,0.2-0.5,0.4-0.4,0.7 c0.1,0.1,0.2,0.2,0.3,0.2c0.2,0,0.3,0,0.5,0c7.8-0.3,15.6,0.2,23.5,0c0.3,0,0.6,0,0.9,0c0.9,0.1,1.8,0.5,2.5,1.1 c0.7,0.6,1.5,0.9,2.4,1c1.4,0.1,2.9-0.4,3.9-1.6c0.1-0.1,0.2-0.2,0.3-0.4c1.1-1.8,0.7-4.2-1-5.5c-0.6-0.5-1.3-0.8-2.1-0.9 c-1.2-0.1-2.5,0.3-3.4,1.2c-0.8,0.9-2,1.4-3.2,1.3H31.8l0,0c0,0,0,0,0,0L62.8,5.4C62,3.8,61,2.7,60.4,2.2 C60.5,2.4,60.4,2.6,60.2,2.9z"
          />
          <path 
            fill="#0C130B" 
            d="M31.8,49c6,0,11.7,0,17.3,0c1.2,0.1,2.4-0.4,3.2-1.3c0.9-1,2.2-1.4,3.4-1.2 c0.7,0.1,1.5,0.4,2.1,0.9c1.7,1.3,2.1,3.7,1,5.5c-0.1,0.1-0.2,0.3-0.3,0.4c-1,1.2-2.5,1.7-3.9,1.6c-0.9-0.1-1.7-0.4-2.4-1 c-0.7-0.6-1.6-1-2.5-1.1c-0.3,0-0.6,0-0.9,0c-7.8,0.2-15.6-0.3-23.5,0c-0.1,0-0.3,0-0.5,0c-0.2,0-0.3,0-0.4-0.2 c-0.1-0.3,0.2-0.5,0.4-0.7l12.2-16.9l15.2-21c2.6-3.7,5.3-7.3,7.9-11c0.2-0.3,0.3-0.6,0.2-0.8c-0.3-0.3-0.5-0.5-0.5-0.5 c-1.1-0.6-2.4-0.9-3.7-0.8h-48H7c-3.3,0.3-5.9,3-5.9,6.3c0,9.4,0,18.8,0,28.2c0,0.3,0.1,0.6,0.2,0.9l3.8-5.3 c0.4-0.6,0.5-1.4,0.2-2.1c-0.6-1.6-0.1-3.4,1.3-4.5c1.4-1.1,3.4-1.2,4.9-0.3c1.5,0.9,2.2,2.5,1.9,4.2c-0.3,1.8-1.7,3.2-3.5,3.5 c-0.8,0.1-1.6,0.5-2.1,1.2l-6.3,8.5c-0.2,0.3-0.4,0.7-0.3,1.1c0,4.3,0,8.7,0,13.1c0,1,0.1,1.9,0.4,2.6c10.1-14.5,20.6-28.5,30.6-43 l-0.5-0.1H14c-0.7,0-1.3,0.3-1.8,0.7c-1,1-2.3,1.5-3.7,1.3c-1.8-0.2-3.3-1.6-3.8-3.4c-0.2-1.8,0.7-3.6,2.4-4.5 c1.6-0.9,3.7-0.6,4.9,0.8c0.6,0.8,1.7,1.3,2.7,1.2h23c0.5,0,1.2-0.3,1.4,0.2c0.2,0.4-0.4,0.9-0.7,1.3L14,47.2L4.2,60.8 c-0.4,0.5-0.5,0.8-0.4,1C5.3,62.8,7,63,7.7,63c0.1,0,0.3,0,0.4,0h48.3c0.1,0,0.2,0,0.2,0c3.6,0,6.5-2.9,6.5-6.5c0-9.3,0-18.7,0-28 c0-0.2,0.1-0.6-0.2-0.7c-1.3,1.8-2.5,3.5-3.8,5.3c-0.6,0.7-0.8,1.8-0.3,2.6c0.2,0.4,0.2,0.8,0.1,1.2c-0.2,1.6-1.3,2.9-2.9,3.4 c-1.6,0.5-3.4,0-4.5-1.3c-0.5-0.6-0.8-1.2-0.9-1.9c-0.4-2.3,1.1-4.4,3.4-4.8c0.8-0.1,1.6-0.5,2.1-1.2c2.2-3,4.4-6.1,6.6-9.1 c0.2-0.3,0.4-0.7,0.4-1.1c0-4.5,0-9,0-13.4c0-0.6-0.1-1.1-0.3-1.7c0-0.1-0.1-0.1-0.1-0.2L31.8,49z"
          />
        </motion.g>

        {/* Circuit Trace Lines */}
        <motion.path
          key={`trace1-${animationKey}`}
          d="M14,47.2l24.4-33.9"
          fill="none"
          stroke="#A7D26D"
          strokeWidth="1"
          variants={pathVariants}
          initial="hidden"
          animate={isLoading ? "visible" : "hidden"}
        />
        <motion.path
          key={`trace2-${animationKey}`}
          d="M60.2,2.9L37.1,34.9L24.9,51.8"
          fill="none"
          stroke="#A7D26D"
          strokeWidth="1"
          variants={pathVariants}
          initial="hidden"
          animate={isLoading ? "visible" : "hidden"}
          transition={{ delay: 0.2 }}
        />
        <motion.path
          key={`trace3-${animationKey}`}
          d="M11.6,24.2c-1.5-1-3.5-0.9-4.9,0.3"
          fill="none"
          stroke="#A7D26D"
          strokeWidth="1"
          variants={pathVariants}
          initial="hidden"
          animate={isLoading ? "visible" : "hidden"}
          transition={{ delay: 0.4 }}
        />
        <motion.path
          key={`trace4-${animationKey}`}
          d="M63.1,27.8c-2.2,3-4.4,6-6.6,9.1"
          fill="none"
          stroke="#A7D26D"
          strokeWidth="1"
          variants={pathVariants}
          initial="hidden"
          animate={isLoading ? "visible" : "hidden"}
          transition={{ delay: 0.6 }}
        />

        {/* Circuit Glow */}
        <motion.path
          key={`glow1-${animationKey}`}
          d="M14,47.2l24.4-33.9"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          variants={glowVariants}
          initial={{ opacity: 0 }}
          animate={isLoading ? "pulse" : { opacity: 0 }}
        />
        <motion.path
          key={`glow2-${animationKey}`}
          d="M60.2,2.9L37.1,34.9L24.9,51.8"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          variants={glowVariants}
          initial={{ opacity: 0 }}
          animate={isLoading ? "pulse" : { opacity: 0 }}
        />

        {/* Data Sparks */}
        <motion.circle
          key={`spark1-${animationKey}`}
          cx="20"
          cy="35"
          r="1.2"
          fill="#ffffff"
          variants={sparkVariants}
          initial={{ opacity: 0, scale: 0 }}
          animate={isLoading ? "travel" : { opacity: 0, scale: 0 }}
          transition={{ delay: 0.5 }}
        />
        <motion.circle
          key={`spark2-${animationKey}`}
          cx="45"
          cy="20"
          r="1"
          fill="#ffffff"
          variants={sparkVariants}
          initial={{ opacity: 0, scale: 0 }}
          animate={isLoading ? "travel" : { opacity: 0, scale: 0 }}
          transition={{ delay: 0.7 }}
        />
        <motion.circle
          key={`spark3-${animationKey}`}
          cx="35"
          cy="42"
          r="1.1"
          fill="#ffffff"
          variants={sparkVariants}
          initial={{ opacity: 0, scale: 0 }}
          animate={isLoading ? "travel" : { opacity: 0, scale: 0 }}
          transition={{ delay: 0.9 }}
        />
        <motion.circle
          key={`spark4-${animationKey}`}
          cx="56"
          cy="32"
          r="0.9"
          fill="#ffffff"
          variants={sparkVariants}
          initial={{ opacity: 0, scale: 0 }}
          animate={isLoading ? "travel" : { opacity: 0, scale: 0 }}
          transition={{ delay: 1.1 }}
        />
      </svg>
    </div>
  )
}