'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 inset-x-0 h-0.5 bg-[#a7d26d] origin-left rtl:origin-right z-50"
    />
  )
}
