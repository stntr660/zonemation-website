'use client'

import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from '@/components/language-switcher'

function MiniLogo() {
  return (
    <svg viewBox="0 0 1200 1200" className="w-full h-full">
      <g>
        <path fill="#0C130B" d="M1065.5,1178H140.5C73.4,1178,19,1123.6,19,1056.5V138.5C19,71.4,73.4,17,140.5,17h924.9c67.1,0,121.5,54.4,121.5,121.5v917.9C1187,1123.6,1132.6,1178,1065.5,1178z"/>
        <path className="ps-logo-stroke" d="M1065.5,1178H140.5C73.4,1178,19,1123.6,19,1056.5V138.5C19,71.4,73.4,17,140.5,17h924.9c67.1,0,121.5,54.4,121.5,121.5v917.9C1187,1123.6,1132.6,1178,1065.5,1178z"/>
      </g>
      <g>
        <g>
          <defs>
            <path id="PS_SVGID_1_" d="M1065.5,1178H140.5C73.4,1178,19,1123.6,19,1056.5V138.5C19,71.4,73.4,17,140.5,17h924.9c67.1,0,121.5,54.4,121.5,121.5v917.9C1187,1123.6,1132.6,1178,1065.5,1178z"/>
          </defs>
          <clipPath id="PS_SVGID_2_">
            <use xlinkHref="#PS_SVGID_1_" style={{overflow:'visible'}}/>
          </clipPath>
        </g>
        <g className="ps-st0">
          <g className="ps-sub_one">
            <polyline className="ps-st1" points="-5,1200 673,255 159,255"/>
            <circle fill="#A7D26D" cx="168" cy="253" r="76"/>
          </g>
          <g className="ps-sub_two">
            <line className="ps-st1" x1="-63" y1="845" x2="183" y2="516"/>
            <circle fill="#A7D26D" cx="183" cy="516" r="76"/>
          </g>
        </g>
      </g>
      <g className="ps-feat">
        <g className="ps-st0">
          <g className="ps-sub_one">
            <polyline className="ps-st1" points="-5,1200 673,255 159,255"/>
            <circle fill="#A7D26D" cx="168" cy="253" r="76"/>
          </g>
          <g className="ps-sub_two">
            <line className="ps-st1" x1="-63" y1="845" x2="183" y2="516"/>
            <circle fill="#A7D26D" cx="183" cy="516" r="76"/>
          </g>
        </g>
      </g>
    </svg>
  )
}

export function SiteHeader() {
  const t = useTranslations('header')

  return (
    <header className="relative z-20 border-b border-white/10">
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12">
            <MiniLogo />
          </div>
          <span className="text-white/80 group-hover:text-[#a7d26d] transition-colors font-light text-[1.35rem] tracking-wider">
            Zonemation
          </span>
        </Link>
        <div className="flex items-center gap-5">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="text-[0.95rem] text-[#a7d26d] hover:text-white border border-[#a7d26d]/30 hover:border-white/30 px-5 py-2.5 rounded-lg transition-all duration-300"
          >
            {t('contact')}
          </Link>
        </div>
      </div>
    </header>
  )
}
