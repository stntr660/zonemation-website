import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { AssistanceSection } from '@/components/assistance-section'
import { CompanySections } from '@/components/company-sections'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AssistanceSection />
      <CompanySections />
      <Footer />
    </main>
  )
}