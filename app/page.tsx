import { HeroSection } from "@/components/hero-section"
import { PerformanceStats } from "@/components/performance-stats"
import { TradingHistory } from "@/components/trading-history"
import { HowItWorks } from "@/components/how-it-works"
import { PricingSection } from "@/components/pricing-section"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PerformanceStats />
      <TradingHistory />
      <HowItWorks />
      <PricingSection />
      <Footer />
    </main>
  )
}
