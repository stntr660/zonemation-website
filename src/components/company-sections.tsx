'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'

export function CompanySections() {
  return (
    <div className="bg-white dark:bg-black">
      {/* Location Section - BCG in Africa style */}
      <section className="relative py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            {/* Image */}
            <div className="mb-8 lg:mb-0">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {/* Placeholder for African landscape image */}
                <div className="aspect-[4/3] bg-amber-300 relative">
                  {/* Simulated African tree silhouette */}
                  <div className="absolute bottom-0 left-1/3 w-32 h-40 bg-black/30 rounded-t-full transform -skew-x-12"></div>
                  <div className="absolute bottom-0 left-1/2 w-24 h-32 bg-black/40 rounded-t-full"></div>
                  <div className="absolute bottom-0 right-1/3 w-20 h-28 bg-black/35 rounded-t-full transform skew-x-6"></div>
                  
                  {/* Sun */}
                  <div className="absolute top-8 right-8 w-16 h-16 bg-yellow-300 rounded-full opacity-80"></div>
                  
                  {/* Road */}
                  <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-r from-amber-600 to-amber-500 opacity-60"></div>
                  <div className="absolute bottom-2 left-1/4 w-1/2 h-2 bg-yellow-200 opacity-40 rounded"></div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  OUR LOCATIONS
                </span>
              </div>
              <h2 className="heading-h1 text-gray-900 dark:text-white mb-6">
                Zonemation in Africa
              </h2>
              <p className="body-large text-gray-700 dark:text-gray-300 mb-8">
                Learn about our offices in Africa, read our latest thought leadership, 
                and connect with our team across the continent.
              </p>
              <button className="inline-flex items-center bg-primary-400 hover:bg-primary-500 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="py-20 bg-gray-50 dark:bg-black">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            {/* Content */}
            <div className="mb-8 lg:mb-0">
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  ZONEMATION CAREERS
                </span>
              </div>
              <h2 className="heading-h1 text-gray-900 dark:text-white mb-6">
                Go Beyond the Expected
              </h2>
              <p className="body-large text-gray-700 dark:text-gray-300 mb-8">
                We're dedicated to helping our clients do amazing things and unlocking the potential of 
                those who advance the world. Join us, and you can too.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="inline-flex items-center bg-primary-400 hover:bg-primary-500 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Explore Zonemation Careers
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className="inline-flex items-center border-2 border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-white font-medium px-6 py-3 rounded-xl transition-all duration-300">
                  Apply Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="lg:order-first">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {/* Placeholder for office/people image */}
                <div className="aspect-[4/3] bg-blue-200 relative">
                  {/* Simulated office scene */}
                  <div className="absolute inset-0 bg-black/10"></div>
                  
                  {/* People silhouettes */}
                  <div className="absolute bottom-8 left-8 w-16 h-20 bg-gray-800 rounded-t-full opacity-60"></div>
                  <div className="absolute bottom-8 left-28 w-14 h-18 bg-gray-700 rounded-t-full opacity-50"></div>
                  <div className="absolute bottom-8 right-16 w-15 h-19 bg-gray-800 rounded-t-full opacity-55"></div>
                  
                  {/* Office elements */}
                  <div className="absolute top-4 left-4 w-32 h-16 bg-white/20 rounded-lg"></div>
                  <div className="absolute top-4 right-4 w-24 h-12 bg-white/15 rounded-lg"></div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-primary-400/30 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Alumni Network */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-primary-400 rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Alumni Network
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Connect with our global network of former colleagues and industry leaders.
              </p>
              <button className="text-primary-400 hover:text-primary-500 font-medium transition-colors">
                Join the Network →
              </button>
            </div>

            {/* Global Impact */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-primary-400 rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Global Impact
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Discover how we're making a difference across industries and continents.
              </p>
              <button className="text-primary-400 hover:text-primary-500 font-medium transition-colors">
                Learn More →
              </button>
            </div>

            {/* Innovation Hub */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-primary-400 rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Innovation Hub
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Explore our latest innovations and digital transformation initiatives.
              </p>
              <button className="text-primary-400 hover:text-primary-500 font-medium transition-colors">
                Explore Innovation →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}