'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface SlideData {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  category: string
  date: string
  type: 'article' | 'video' | 'report'
  cta?: string
}

const slides: SlideData[] = [
  {
    id: 1,
    title: 'The 2025 M&A Report: The Brave New World',
    subtitle: 'ARTICLE',
    description: 'Executives have a clear mandate: make selective bold moves, embrace AI and advanced analytics, and play for long-term advantage.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&crop=faces',
    category: 'M&A, TRANSACTIONS, AND PMI',
    date: 'OCTOBER 28, 2025',
    type: 'article',
    cta: 'LEARN MORE'
  },
  {
    id: 2,
    title: 'Making AI Agents Safe for the World',
    subtitle: 'ARTICLE',
    description: 'How leading organizations are implementing responsible AI practices while maintaining competitive advantage.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&crop=faces',
    category: 'ARTIFICIAL INTELLIGENCE',
    date: 'OCTOBER 24, 2025',
    type: 'article'
  },
  {
    id: 3,
    title: 'Digital Transformation Accelerators',
    subtitle: 'REPORT',
    description: 'Five key strategies that separate digital leaders from followers in the modern enterprise.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=faces',
    category: 'DIGITAL TRANSFORMATION',
    date: 'OCTOBER 20, 2025',
    type: 'report'
  },
  {
    id: 4,
    title: 'Climate Strategy for the Next Decade',
    subtitle: 'VIDEO',
    description: 'Building sustainable business models that create value while advancing environmental responsibility.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=faces',
    category: 'SUSTAINABILITY',
    date: 'OCTOBER 18, 2025',
    type: 'video'
  },
  {
    id: 5,
    title: 'Future of Work Excellence',
    subtitle: 'ARTICLE', 
    description: 'How organizations are adapting their workforce strategies for the next generation of collaboration.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&crop=faces',
    category: 'PEOPLE & ORGANIZATION',
    date: 'OCTOBER 15, 2025',
    type: 'article'
  }
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setTimeout(() => setIsTransitioning(false), 800)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setTimeout(() => setIsTransitioning(false), 800)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return
    setIsTransitioning(true)
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), 800)
    setIsAutoPlaying(false)
  }

  const getVisibleSlides = () => {
    const visible = []
    for (let i = 0; i < 5; i++) {
      const index = (currentSlide + i) % slides.length
      visible.push({ ...slides[index], position: i })
    }
    return visible
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  return (
    <section className="relative bg-white dark:bg-black pt-16 pb-20 overflow-hidden min-h-[90vh]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Welcome Text with Animation */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p 
            className="caption text-gray-600 dark:text-gray-400 spacing-small mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            WELCOME TO ZONEMATION
          </motion.p>
          <motion.h1 
            className="text-[2.45rem] lg:text-[3.15rem] xl:text-[3.85rem] font-light leading-[1.1] text-gray-900 dark:text-white tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Unlocking the Potential of Those Who
            <br />
            <span className="font-normal">Advance the World</span>
          </motion.h1>
        </motion.div>

        {/* Main Carousel Container */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
          transition={{ duration: 1, delay: 0.6 }}
        >

          {/* Navigation Arrows */}
          <motion.button
            onClick={prevSlide}
            disabled={isTransitioning}
            className={`absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white dark:bg-gray-900 shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-300 ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Previous slide"
            whileHover={!isTransitioning ? { scale: 1.1, x: -4 } : {}}
            whileTap={!isTransitioning ? { scale: 0.95 } : {}}
            animate={isTransitioning && direction === -1 ? {
              x: [-4, 4, -4, 0],
              transition: { duration: 0.3 }
            } : {}}
          >
            <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            disabled={isTransitioning}
            className={`absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white dark:bg-gray-900 shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-300 ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Next slide"
            whileHover={!isTransitioning ? { scale: 1.1, x: 4 } : {}}
            whileTap={!isTransitioning ? { scale: 0.95 } : {}}
            animate={isTransitioning && direction === 1 ? {
              x: [4, -4, 4, 0],
              transition: { duration: 0.3 }
            } : {}}
          >
            <ChevronRight className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          </motion.button>

          {/* Coverflow Container */}
          <motion.div 
            className="relative h-[520px] lg:h-[580px] overflow-hidden mx-auto w-full" 
            style={{ maxWidth: '1200px' }}
            animate={isTransitioning ? {
              scale: [1, 0.98, 1],
              transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
            } : {}}
          >
            <AnimatePresence initial={false}>
              {getVisibleSlides().map((slide, index) => {
                const isCenter = index === 2
                const isLeft = index === 1
                const isRight = index === 3
                const isFarLeft = index === 0
                const isFarRight = index === 4

                // Define card properties with non-overlapping positioning
                const getCardProps = () => {
                  const centerWidth = 400
                  const sideWidth = 300  
                  const farWidth = 220
                  const margin = 40 // Margin between cards
                  
                  if (isCenter) return {
                    scale: 1.0,
                    x: 0,
                    z: 30,
                    opacity: 1.0,
                    blur: 0,
                    width: 'w-[400px]',
                    height: 'h-[520px]',
                    rotateY: 0
                  }
                  if (isLeft || isRight) return {
                    scale: 0.75,
                    x: isLeft ? -(centerWidth/2 + margin + sideWidth/2) : (centerWidth/2 + margin + sideWidth/2),
                    z: 20,
                    opacity: 0.8,
                    blur: 1,
                    width: 'w-[300px]',
                    height: 'h-[390px]',
                    rotateY: isLeft ? 15 : -15
                  }
                  if (isFarLeft || isFarRight) return {
                    scale: 0.55,
                    x: isFarLeft 
                      ? -(centerWidth/2 + margin + sideWidth + margin + farWidth/2)
                      : (centerWidth/2 + margin + sideWidth + margin + farWidth/2),
                    z: 10,
                    opacity: 0.5,
                    blur: 2,
                    width: 'w-[220px]',
                    height: 'h-[286px]',
                    rotateY: isFarLeft ? 25 : -25
                  }
                  return { scale: 0, x: 0, z: 0, opacity: 0, blur: 4, width: 'w-0', height: 'h-0', rotateY: 0 }
                }

                const cardProps = getCardProps()
                if (cardProps.scale === 0) return null

                return (
                  <motion.div
                    key={`card-${slide.id}-${index}`}
                    className={`absolute top-1/2 left-1/2 cursor-pointer ${cardProps.width} ${cardProps.height}`}
                    style={{ 
                      zIndex: cardProps.z,
                      perspective: '1000px'
                    }}
                    initial={false}
                    animate={{
                      x: `calc(-50% + ${cardProps.x}px)`,
                      y: '-50%',
                      scale: cardProps.scale,
                      opacity: cardProps.opacity,
                      filter: `blur(${cardProps.blur}px)`,
                      rotateY: cardProps.rotateY,
                      rotateX: 0
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: index * 0.05
                    }}
                    onClick={() => !isCenter && goToSlide((currentSlide + index) % slides.length)}
                    whileHover={!isTransitioning ? (isCenter ? { 
                      scale: 1.02,
                      y: '-48%',
                      transition: { duration: 0.3 }
                    } : { 
                      scale: cardProps.scale * 1.08,
                      rotateY: cardProps.rotateY * 0.7,
                      y: '-48%',
                      transition: { duration: 0.3 }
                    }) : {}}
                  >
                    {/* Card */}
                    <div className="relative w-full h-full rounded-3xl shadow-2xl overflow-hidden group bg-white dark:bg-gray-900">
                      {/* Background Image */}
                      <div className="absolute inset-0">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-cover transition-all duration-500 group-hover:blur-md group-hover:scale-105"
                          priority={isCenter}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 group-hover:from-black/85 group-hover:via-black/45 group-hover:to-black/25 transition-all duration-500" />
                      </div>

                      {/* Content Overlay - Full content for center, minimal for sides */}
                      {isCenter ? (
                        <motion.div 
                          className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12 text-white"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                        >
                          {/* Category Badge */}
                          <div className="flex items-center justify-between mb-6">
                            <span className="inline-flex items-center bg-gray-200/90 backdrop-blur-sm text-gray-800 text-sm font-medium px-4 py-2 rounded-full group-hover:bg-white/95 group-hover:text-black transition-all duration-500">
                              {slide.subtitle} • {slide.date}
                            </span>
                            {slide.type === 'video' && (
                              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-500">
                                <Play className="w-5 h-5 text-white" />
                              </div>
                            )}
                          </div>

                          {/* Title and Description */}
                          <div className="max-w-md">
                            <h3 className="text-2xl lg:text-3xl xl:text-4xl font-light leading-tight mb-4 group-hover:text-white group-hover:drop-shadow-lg transition-all duration-500">
                              {slide.title}
                            </h3>
                            <p className="text-base lg:text-lg opacity-90 leading-relaxed mb-6 group-hover:opacity-100 group-hover:text-white group-hover:drop-shadow-md transition-all duration-500">
                              {slide.description}
                            </p>
                            
                            {/* CTA Button */}
                            {slide.cta && (
                              <motion.button 
                                className="inline-flex items-center bg-[#a7d26d] text-black px-6 py-3 rounded-full font-medium text-base hover:bg-[#95c255] transition-all duration-300 group-hover:shadow-xl"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {slide.cta}
                                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                              </motion.button>
                            )}
                          </div>
                        </motion.div>
                      ) : (
                        // Side cards content
                        <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-6 text-white">
                          <div className="space-y-2">
                            <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                              {slide.subtitle}
                            </span>
                            <h4 className="text-base lg:text-lg font-medium leading-tight line-clamp-2 group-hover:drop-shadow-lg transition-all duration-500">
                              {slide.title}
                            </h4>
                            {(isLeft || isRight) && (
                              <p className="text-sm opacity-80 line-clamp-2 group-hover:opacity-100 transition-all duration-500">
                                {slide.description}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Center Card Indicator */}
                      {isCenter && (
                        <motion.div
                          className="absolute top-6 right-6 w-3 h-3 bg-[#a7d26d] rounded-full shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                        />
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>

          {/* Dots Indicator */}
          <motion.div 
            className="flex justify-center mt-8 space-x-3"
            animate={isTransitioning ? {
              y: [0, -4, 0],
              transition: { duration: 0.4, delay: 0.2 }
            } : {}}
          >
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`transition-all duration-500 relative overflow-hidden ${
                  index === currentSlide
                    ? 'w-8 h-3 bg-gray-900 dark:bg-white rounded-full'
                    : 'w-3 h-3 bg-gray-400 dark:bg-gray-600 rounded-full hover:bg-gray-600 dark:hover:bg-gray-400'
                } ${isTransitioning ? 'cursor-not-allowed' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
                whileHover={!isTransitioning ? { 
                  scale: 1.2,
                  y: -2
                } : {}}
                whileTap={!isTransitioning ? { scale: 0.9 } : {}}
                animate={index === currentSlide ? {
                  scale: [1, 1.1, 1],
                  transition: { duration: 0.5, delay: 0.3 }
                } : {}}
              >
                {/* Active dot glow effect */}
                {index === currentSlide && (
                  <motion.div
                    className="absolute inset-0 bg-[#a7d26d] rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 1.5, 0],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{ 
                      duration: 1.2, 
                      repeat: Infinity,
                      repeatDelay: 2 
                    }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Category Navigation - Exact BCG Style */}
        <motion.div 
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="bg-white dark:bg-gray-900 rounded-lg px-6 py-3 shadow-sm border border-gray-300 dark:border-gray-700">
            <div className="flex flex-wrap justify-center gap-6">
              {['BCG SPOTLIGHT', 'M&A, TRANSACTIONS, AND PMI', 'ARTIFICIAL INTELLIGENCE', 'RISK MANAGEMENT AND COMPLIANCE'].map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 text-sm font-bold text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200 uppercase tracking-tighter"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}