'use client'

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

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

function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    project: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    setTimeout(() => {
      setSubmitMessage("Message envoyé! Nous reviendrons vers vous dans les 24h.")
      setIsSubmitting(false)
      setFormState({
        name: '',
        company: '',
        email: '',
        phone: '',
        project: '',
        message: '',
      })
      
      setTimeout(() => setSubmitMessage(''), 5000)
    }, 2000)
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      onSubmit={handleSubmit}
      className="space-y-8 max-w-2xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <input
          type="text"
          name="name"
          required
          value={formState.name}
          onChange={handleChange}
          className="w-full px-6 py-4 text-xl bg-transparent border-2 border-slate-700 focus:border-[#a7d26d] rounded-lg text-white placeholder-white/50 transition-all duration-300 outline-none"
          placeholder="Votre nom *"
        />

        <input
          type="text"
          name="company"
          value={formState.company}
          onChange={handleChange}
          className="w-full px-6 py-4 text-xl bg-transparent border-2 border-slate-700 focus:border-[#a7d26d] rounded-lg text-white placeholder-white/50 transition-all duration-300 outline-none"
          placeholder="Société"
        />

        <input
          type="email"
          name="email"
          required
          value={formState.email}
          onChange={handleChange}
          className="w-full px-6 py-4 text-xl bg-transparent border-2 border-slate-700 focus:border-[#a7d26d] rounded-lg text-white placeholder-white/50 transition-all duration-300 outline-none"
          placeholder="Email *"
        />

        <input
          type="tel"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
          className="w-full px-6 py-4 text-xl bg-transparent border-2 border-slate-700 focus:border-[#a7d26d] rounded-lg text-white placeholder-white/50 transition-all duration-300 outline-none"
          placeholder="Téléphone"
        />
      </div>

      <select
        name="project"
        value={formState.project}
        onChange={handleChange}
        className="w-full px-6 py-4 text-xl bg-transparent border-2 border-slate-700 focus:border-[#a7d26d] rounded-lg text-white transition-all duration-300 outline-none"
      >
        <option value="" className="bg-[#181a0e] text-white">Type de projet</option>
        <option value="transformation" className="bg-[#181a0e] text-white">Transformation digitale</option>
        <option value="strategy" className="bg-[#181a0e] text-white">Stratégie business</option>
        <option value="consulting" className="bg-[#181a0e] text-white">Conseil & accompagnement</option>
        <option value="development" className="bg-[#181a0e] text-white">Développement sur mesure</option>
        <option value="other" className="bg-[#181a0e] text-white">Autre</option>
      </select>

      <textarea
        name="message"
        required
        rows={6}
        value={formState.message}
        onChange={handleChange}
        className="w-full px-6 py-4 text-xl bg-transparent border-2 border-slate-700 focus:border-[#a7d26d] rounded-lg text-white placeholder-white/50 transition-all duration-300 resize-none outline-none"
        placeholder="Décrivez votre vision... *"
      />

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-8 py-5 bg-[#a7d26d] hover:bg-[#8fb55a] text-[#181a0e] font-medium text-2xl rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="inline-flex items-center gap-3">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="text-2xl"
            >
              ⟳
            </motion.span>
            Envoi en cours...
          </span>
        ) : (
          "Commencer la conversation"
        )}
      </motion.button>

      <AnimatePresence>
        {submitMessage && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-[#a7d26d] text-center text-xl"
          >
            {submitMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.form>
  )
}

function ContactInfo() {
  const contactItems = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "Téléphone",
      value: "+212 6 61 90 30 77",
      link: "tel:+212661903077"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Email",
      value: "hello@zonemation.com",
      link: "mailto:hello@zonemation.com"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Adresse",
      value: "Casablanca, Maroc",
      link: null
    }
  ]

  return (
    <div className="space-y-8">
      {contactItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
          whileHover={{ scale: 1.02 }}
        >
          {item.link ? (
            <a
              href={item.link}
              className="flex items-center gap-6 text-white hover:text-[#a7d26d] transition-colors duration-300 group p-4 rounded-lg hover:bg-white/5"
            >
              <span className="p-4 border-2 border-slate-700 group-hover:border-[#a7d26d] rounded-lg transition-colors duration-300">
                {item.icon}
              </span>
              <div className="flex-1">
                <p className="text-lg text-slate-400 mb-2">{item.label}</p>
                <p className="text-2xl font-light">{item.value}</p>
              </div>
            </a>
          ) : (
            <div className="flex items-center gap-6 text-white p-4 rounded-lg">
              <span className="p-4 border-2 border-slate-700 rounded-lg">
                {item.icon}
              </span>
              <div className="flex-1">
                <p className="text-lg text-slate-400 mb-2">{item.label}</p>
                <p className="text-2xl font-light">{item.value}</p>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

function SocialLinks() {
  const socials = [
    { name: 'LinkedIn', icon: 'in', link: 'https://linkedin.com/company/zonemation' },
    { name: 'Twitter', icon: '𝕏', link: 'https://twitter.com/zonemation' },
    { name: 'Instagram', icon: '◈', link: 'https://instagram.com/zonemation' },
  ]

  return (
    <div className="flex gap-4 justify-center md:justify-start">
      {socials.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full border border-slate-700 hover:border-[#a7d26d] flex items-center justify-center text-slate-300 hover:text-[#a7d26d] transition-all duration-300"
        >
          <span className="text-xl font-light">{social.icon}</span>
        </motion.a>
      ))}
    </div>
  )
}

function FloatingLetters() {
  const letters = ['Z', 'O', 'N', 'E', 'M', 'A', 'T', 'I', 'O', 'N']
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 })
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5">
      {letters.map((letter, index) => (
        <motion.div
          key={index}
          className="absolute text-6xl font-thin text-[#a7d26d]"
          initial={{
            x: Math.random() * windowSize.width,
            y: Math.random() * windowSize.height,
            opacity: 0
          }}
          animate={{
            y: [null, -100, windowSize.height + 100],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: index * 2,
            ease: "linear"
          }}
        >
          {letter}
        </motion.div>
      ))}
    </div>
  )
}

function ParallaxText({ children, offset = 50 }: { children: React.ReactNode, offset?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [elementTop, setElementTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const updatePosition = () => {
      setElementTop(element.offsetTop)
      setClientHeight(window.innerHeight)
    }

    const onScroll = () => setScrollY(window.scrollY)

    updatePosition()
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', updatePosition)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updatePosition)
    }
  }, [])

  const y = useTransform(
    useMotionValue(scrollY),
    [elementTop - clientHeight, elementTop + offset],
    [offset, -offset]
  )

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  )
}

const catchyPhrases = [
  "Votre transformation commence par un simple 'Bonjour'",
  "Même les plus grandes idées commencent par une conversation",
  "Nous transformons vos défis en opportunités digitales",
]

export default function ContactPage() {
  const [mounted, setMounted] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % catchyPhrases.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative">
      <PreLoader />
      <BackgroundOrbs />
      
      <div className="relative z-10 container mx-auto px-4 py-12 lg:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-7xl lg:text-8xl font-thin text-white tracking-wider">
            <AnimatedText text="Connectons" delay={0} />
            <span className="text-[#a7d26d]">
              <AnimatedText text=" nos visions" delay={0.2} />
            </span>
          </h1>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Contact Form Section */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-16 text-center"
            >
              <div className="flex justify-center mb-8">
                <AnimatedLogo />
              </div>
              <h2 className="text-4xl lg:text-5xl font-thin text-white mb-8">
                Partagez votre vision
              </h2>
              
              <div className="h-16 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={phraseIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl lg:text-2xl text-white/80 font-light italic max-w-3xl mx-auto"
                  >
                    {catchyPhrases[phraseIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
            
            <ContactForm />
          </div>

          {/* Fun Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center max-w-3xl mx-auto"
          >
            <p className="text-[#a7d26d] text-2xl font-light mb-6">Le saviez-vous?</p>
            <p className="text-white text-xl">
              "Nous avons aidé plus de 50 entreprises marocaines à se digitaliser, 
              mais notre propre site est toujours en construction. 
              L'ironie? C'est notre fierté - nous sommes trop occupés à transformer vos visions."
            </p>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-20 pb-8"
        >
          <motion.p 
            className="text-white/70 text-lg"
            whileHover={{ color: "rgba(167,210,109,0.7)" }}
            transition={{ duration: 0.3 }}
          >
            PS: Si vous lisez ceci, vous êtes déjà plus curieux que 90% de nos concurrents
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}