import { HomeHero } from '@/components/home/home-hero'
import { ProductsShowcase } from '@/components/products-showcase'
import { ClosingSection } from '@/components/home/closing-section'
import { Pillars } from '@/components/home/pillars'
import { ScrollProgress } from '@/components/home/scroll-progress'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <HomeHero />
      <Pillars />
      <ProductsShowcase />
      <ClosingSection />
    </>
  )
}
