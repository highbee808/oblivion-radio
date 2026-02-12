import AnimatedPage from "../components/shared/AnimatedPage"
import HeroSection from "../components/home/HeroSection"
import LiveNowStrip from "../components/home/LiveNowStrip"
import StatsGrid from "../components/shared/StatsGrid"
import RegionHighlights from "../components/home/RegionHighlights"
import SectionLabel from "../components/shared/SectionLabel"
import { useSystemMetrics } from "../hooks/useSystemMetrics"

export default function Home() {
  const metrics = useSystemMetrics()

  const stats = [
    { value: metrics.activeStations, label: "ACTIVE STATIONS" },
    { value: metrics.listeners, label: "GLOBAL LISTENERS", format: "comma" },
    { value: metrics.uptime, label: "NETWORK UPTIME" },
  ]

  return (
    <AnimatedPage>
      <HeroSection />
      <LiveNowStrip />

      {/* Stats Section */}
      <div className="px-6 md:px-12 py-12 bg-paper border-b border-ink/10">
        <SectionLabel className="mb-6">NETWORK_STATUS</SectionLabel>
        <StatsGrid stats={stats} />
      </div>

      <RegionHighlights />

      {/* Footer accent */}
      <div className="px-6 md:px-12 py-8 bg-concrete border-t border-ink/10">
        <div className="font-pixel text-[11px] text-mid text-center">
          OBLIVION RADIO — GLOBAL BROADCAST NETWORK — ALL FREQUENCIES ACTIVE
        </div>
      </div>
    </AnimatedPage>
  )
}
