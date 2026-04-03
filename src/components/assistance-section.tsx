'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const featuredContent = [
  {
    id: 1,
    category: 'CLIENT IMPACT LIBRARY',
    title: 'Unlocking the Potential of Those Who Advance the World',
    description: 'Discover how leading organizations transform challenges into opportunities through strategic innovation and digital excellence.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=entropy',
    cta: 'LEARN MORE',
    layout: 'large'
  },
  {
    id: 2,
    category: 'TECHNOLOGY INSIGHTS',
    title: 'The Future of Digital Innovation',
    description: 'Explore cutting-edge technologies and methodologies that drive business transformation in the digital age.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&crop=entropy',
    cta: 'WATCH THE INSIGHTS',
    layout: 'large'
  }
]

export function AssistanceSection() {

  return (
    <section className="bg-white dark:bg-black py-16 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Featured Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Left Large Card */}
          <motion.div
            className="lg:col-span-2 group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-xl">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={featuredContent[0].image}
                  alt={featuredContent[0].title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/85 group-hover:via-black/40 transition-all duration-500" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 lg:p-12 text-white">
                {/* Top Section */}
                <div className="flex items-start justify-between">
                  <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-full uppercase tracking-wider">
                    {featuredContent[0].category}
                  </span>
                </div>

                {/* Bottom Section */}
                <div className="max-w-2xl">
                  <h2 className="text-2xl lg:text-3xl xl:text-4xl font-light leading-tight mb-4 group-hover:transform group-hover:translate-y-[-2px] transition-all duration-500">
                    {featuredContent[0].title}
                  </h2>
                  <p className="text-base lg:text-lg opacity-90 leading-relaxed mb-8 group-hover:opacity-100 transition-all duration-500">
                    {featuredContent[0].description}
                  </p>
                  
                  {/* CTA Button */}
                  <motion.button 
                    className="inline-flex items-center bg-[#a7d26d] text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#95c255] transition-all duration-300 group-hover:shadow-2xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {featuredContent[0].cta}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Large Card */}
          <motion.div
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-xl">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={featuredContent[1].image}
                  alt={featuredContent[1].title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/85 group-hover:via-black/40 transition-all duration-500" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8 text-white">
                {/* Top Section */}
                <div className="flex items-start justify-between">
                  <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-full uppercase tracking-wider">
                    {featuredContent[1].category}
                  </span>
                </div>

                {/* Bottom Section */}
                <div>
                  <h3 className="text-xl lg:text-2xl font-light leading-tight mb-4 group-hover:transform group-hover:translate-y-[-2px] transition-all duration-500">
                    {featuredContent[1].title}
                  </h3>
                  <p className="text-sm lg:text-base opacity-90 leading-relaxed mb-6 group-hover:opacity-100 transition-all duration-500">
                    {featuredContent[1].description}
                  </p>
                  
                  {/* CTA Button */}
                  <motion.button 
                    className="inline-flex items-center bg-[#a7d26d] text-black px-6 py-3 rounded-full font-semibold text-base hover:bg-[#95c255] transition-all duration-300 group-hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {featuredContent[1].cta}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}