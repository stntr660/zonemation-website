import { HomeHero } from '@/components/home/home-hero'
import { ProductsShowcase } from '@/components/products-showcase'
import { ClosingSection } from '@/components/home/closing-section'
import { Pillars } from '@/components/home/pillars'
import { ScrollProgress } from '@/components/home/scroll-progress'
import { TeamSection } from '@/components/home/team-section'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <HomeHero />
      <ProductsShowcase />
      <Pillars />
      <TeamSection />
      <ClosingSection />
    </>
  )
}
