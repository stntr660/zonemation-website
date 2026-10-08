'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Bot, Boxes, Facebook, Instagram, Mail, MessageCircle, QrCode, Sparkles, Wallet, Workflow } from 'lucide-react'
import { ProductStage } from '@/components/home/product-stage'
import { AtrapaFlow } from '@/components/home/atrapa-flow'
import { AtrapaWorkflow } from '@/components/home/atrapa-workflow'
import { JmlaAgentChat } from '@/components/home/jmla-agent-chat'

const CHANNELS = [
  { icon: MessageCircle, color: '#25D366', from: { x: -140, y: -60 }, at: 'top-[2%] -start-5' },
  { icon: Instagram, color: '#E1306C', from: { x: 140, y: -80 }, at: 'top-[2%] end-[18%]' },
  { icon: Facebook, color: '#0084FF', from: { x: 160, y: 40 }, at: 'top-[38%] -end-5' },
  { icon: Mail, color: '#F97316', from: { x: -160, y: 60 }, at: 'top-[68%] -end-5' },
]

/** WhatsApp, Instagram, Messenger and e-mail flying into the inbox. */
function ChannelOrbit() {
  const reduce = useReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block" aria-hidden>
      {CHANNELS.map(({ icon: Icon, color, from, at }, i) => (
        <motion.div
          key={i}
          initial={reduce ? false : { opacity: 0, x: from.x, y: from.y, scale: 0.4 }}
          whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: 'spring', stiffness: 70, damping: 12, delay: 0.3 + i * 0.18 }}
          className={`absolute ${at}`}
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center justify-center w-12 h-12 rounded-xl shadow-xl shadow-black/40"
            style={{ backgroundColor: color }}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

export function ProductsShowcase() {
  const t = useTranslations('products')

  return (
    <div id="products" className="relative scroll-mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center space-y-2 px-6 pt-4"
      >
        <p className="text-[#a7d26d] text-sm tracking-[0.3em] uppercase">{t('eyebrow')}</p>
        <h2 className="text-4xl lg:text-6xl font-thin text-slate-300/80 tracking-wide">{t('title')}</h2>
      </motion.div>

      <ProductStage
        id="jmlapro"
        eyebrow={t('jmlapro.eyebrow')}
        title={t('jmlapro.title')}
        text={t('jmlapro.text')}
        features={[
          { icon: <Sparkles className="w-4 h-4" />, label: t('jmlapro.feature1') },
          { icon: <Boxes className="w-4 h-4" />, label: t('jmlapro.feature2') },
          { icon: <Wallet className="w-4 h-4" />, label: t('jmlapro.feature3') },
        ]}
        url="https://jmlapro.com"
        domain="jmlapro.com"
        image="/products/jmlapro.webp"
        imageAlt={t('jmlapro.name')}
        cta={t('jmlapro.cta')}
        stores={[
          { store: 'appStore', href: 'https://apps.apple.com/app/id6783318181' },
          { store: 'googlePlay', href: 'https://play.google.com/store/apps/details?id=com.jmlapro.pro' },
        ]}
        overlay={<JmlaAgentChat />}
        overlayClass="lg:w-[14.5rem] lg:-end-12 lg:-top-10"
      />

      <ProductStage
        id="atrapa"
        reverse
        eyebrow={t('atrapa.eyebrow')}
        title={t('atrapa.title')}
        text={t('atrapa.text')}
        features={[
          { icon: <QrCode className="w-4 h-4" />, label: t('atrapa.feature1') },
          { icon: <Workflow className="w-4 h-4" />, label: t('atrapa.feature2') },
          { icon: <Bot className="w-4 h-4" />, label: t('atrapa.feature3') },
        ]}
        url="https://atrapa.io"
        domain="atrapa.io"
        image="/products/atrapa.webp"
        imageAlt={t('atrapa.name')}
        cta={t('atrapa.cta')}
        stores={[{ store: 'googlePlay', href: 'https://play.google.com/store/apps/details?id=io.atrapa.mobile' }]}
        overlay={<AtrapaFlow />}
        overlayClass="lg:w-[24rem] lg:-bottom-12 lg:-start-10"
        orbit={<ChannelOrbit />}
        visualFooter={<AtrapaWorkflow />}
      />
    </div>
  )
}
