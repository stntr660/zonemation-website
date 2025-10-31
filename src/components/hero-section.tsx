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
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
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
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 xl:px-12">
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
            className="text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] font-light leading-[1.1] text-gray-900 dark:text-white tracking-tight"
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
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white dark:bg-gray-900 shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-300"
            aria-label="Previous slide"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white dark:bg-gray-900 shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-300"
            aria-label="Next slide"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          </motion.button>

          {/* Cards Container */}
          <div className="relative overflow-hidden">
            <motion.div 
              className="flex gap-6 lg:gap-8 transition-transform duration-700 ease-out"
              animate={{ x: `${-currentSlide * (100 / 3)}%` }}
            >
              {slides.concat(slides.slice(0, 2)).map((slide, index) => {
                const actualIndex = index % slides.length
                const isActive = actualIndex === currentSlide
                
                return (
                  <motion.div
                    key={`${slide.id}-${index}`}
                    className="flex-none w-full md:w-1/2 lg:w-1/3 cursor-pointer"
                    onClick={() => goToSlide(actualIndex)}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Card */}
                    <div className="relative h-[420px] lg:h-[480px] rounded-2xl shadow-xl overflow-hidden group bg-white dark:bg-gray-900">
                      {/* Background Image */}
                      <div className="absolute inset-0">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-cover transition-all duration-500 group-hover:blur-sm group-hover:scale-110"
                          priority={isActive}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 group-hover:via-black/50 group-hover:to-black/20 transition-all duration-500" />
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8 text-white">
                        {/* Top Section */}
                        <div className="flex items-start justify-between">
                          <span className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full group-hover:bg-white/90 group-hover:text-black transition-all duration-500">
                            {slide.subtitle}
                          </span>
                          {slide.type === 'video' && (
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-500">
                              <Play className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>

                        {/* Bottom Section */}
                        <div>
                          <p className="text-xs font-medium opacity-80 mb-2 uppercase tracking-wider group-hover:opacity-100 transition-all duration-500">
                            {slide.date}
                          </p>
                          <h3 className="text-xl lg:text-2xl xl:text-3xl font-light leading-tight mb-3 group-hover:text-white group-hover:drop-shadow-lg transition-all duration-500">
                            {slide.title}
                          </h3>
                          <p className="text-sm lg:text-base opacity-90 leading-relaxed mb-4 line-clamp-3 group-hover:opacity-100 group-hover:text-white group-hover:drop-shadow-md transition-all duration-500">
                            {slide.description}
                          </p>
                          
                          {/* Read More Link */}
                          <button className="text-white hover:text-[#a7d26d] text-sm font-medium transition-colors group-hover:underline flex items-center">
                            Read More 
                            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>

                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute top-4 right-4 w-3 h-3 bg-[#a7d26d] rounded-full shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-500 ${
                  index === currentSlide
                    ? 'w-8 h-3 bg-gray-900 dark:bg-white rounded-full'
                    : 'w-3 h-3 bg-gray-400 dark:bg-gray-600 rounded-full hover:bg-gray-600 dark:hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Category Navigation */}
        <motion.div 
          className="mt-16 flex flex-wrap justify-center gap-8 lg:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {['ZONEMATION SPOTLIGHT', 'M&A, TRANSACTIONS, AND PMI', 'ARTIFICIAL INTELLIGENCE', 'RISK MANAGEMENT AND COMPLIANCE'].map((category) => (
            <motion.button
              key={category}
              className="relative px-1 py-3 text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors group"
              whileHover={{ y: -2 }}
            >
              {category}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}