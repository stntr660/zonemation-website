'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from '@/i18n/routing'

function AnimatedLogo() {
  return (
    <div className="w-32 h-32 md:w-40 md:h-40">
      <svg viewBox="0 0 1200 1200" className="w-full h-full" suppressHydrationWarning>
        <g>
          <path fill="#0C130B" d="M1065.5,1178H140.5C73.4,1178,19,1123.6,19,1056.5V138.5C19,71.4,73.4,17,140.5,17h924.9c67.1,0,121.5,54.4,121.5,121.5v917.9C1187,1123.6,1132.6,1178,1065.5,1178z"/>
          <path className="logo-stroke" d="M1065.5,1178H140.5C73.4,1178,19,1123.6,19,1056.5V138.5C19,71.4,73.4,17,140.5,17h924.9c67.1,0,121.5,54.4,121.5,121.5v917.9C1187,1123.6,1132.6,1178,1065.5,1178z"/>
        </g>
        <g>
          <g>
            <defs>
              <path id="SVGID_1_" d="M1065.5,1178H140.5C73.4,1178,19,1123.6,19,1056.5V138.5C19,71.4,73.4,17,140.5,17h924.9c67.1,0,121.5,54.4,121.5,121.5v917.9C1187,1123.6,1132.6,1178,1065.5,1178z"/>
            </defs>
            <clipPath id="SVGID_2_">
              <use xlinkHref="#SVGID_1_" style={{overflow:'visible'}}/>
            </clipPath>
          </g>
          <g className="st0">
            <g className="sub_one">
              <polyline className="st1" points="-5,1200 673,255 159,255"/>
              <circle fill="#A7D26D" cx="168" cy="253" r="76"/>
            </g>
            <g className="sub_two">
              <line className="st1" x1="-63" y1="845" x2="183" y2="516"/>
              <circle fill="#A7D26D" cx="183" cy="516" r="76"/>
            </g>
          </g>
        </g>
        <g className="feat">
          <g className="st0">
            <g className="sub_one">
              <polyline className="st1" points="-5,1200 673,255 159,255"/>
              <circle fill="#A7D26D" cx="168" cy="253" r="76"/>
            </g>
            <g className="sub_two">
              <line className="st1" x1="-63" y1="845" x2="183" y2="516"/>
              <circle fill="#A7D26D" cx="183" cy="516" r="76"/>
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}

function PreLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2 }}
      className="fixed inset-0 bg-[#181a0e] z-50 flex items-center justify-center"
      style={{ pointerEvents: 'none' }}
    >
      <AnimatedLogo />
    </motion.div>
  )
}

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

function AnimatedText({ text, delay = 0 }: { text: string, delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="inline-block"
    >
      {text}
    </motion.span>
  )
}

const thankYouMessages = [
  "Votre message a été reçu avec enthousiasme",
  "Nous reviendrons vers vous dans les 24h",
  "Votre vision nous inspire déjà",
]

export default function ThankYouPage() {
  const [mounted, setMounted] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % thankYouMessages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-[calc(100vh-140px)] relative flex items-center justify-center">
      <PreLoader />
      <BackgroundOrbs />
      
      <div className="relative z-10 container mx-auto px-4 py-12 text-center">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <h1 className="text-8xl lg:text-9xl font-thin text-white tracking-wider mb-8">
              <AnimatedText text="Merci" delay={0} />
              <span className="text-[#a7d26d]">
                <AnimatedText text=" infiniment" delay={0.2} />
              </span>
            </h1>

            <div className="h-20 flex items-center justify-center mb-12">
              <AnimatePresence mode="wait">
                <motion.p
                  key={messageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl lg:text-3xl text-white font-light italic max-w-3xl mx-auto"
                >
                  {thankYouMessages[messageIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Success Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-12"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex justify-center"
              >
                <div className="w-32 h-32">
                  <AnimatedLogo />
                </div>
              </motion.div>
            </motion.div>

          </motion.div>

        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.5 }}
          className="text-center mt-24"
        >
          <p className="text-white/70 text-xl">
            Votre transformation digitale commence maintenant...
          </p>
        </motion.div>
      </div>
    </div>
  )
}