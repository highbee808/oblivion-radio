import AnimatedPage from "../components/shared/AnimatedPage"
import HugeTitle from "../components/shared/HugeTitle"
import SectionLabel from "../components/shared/SectionLabel"
import Waveform from "../components/shared/Waveform"
import WorldMap from "../components/radio/WorldMap"
import PresetGrid from "../components/radio/PresetGrid"
import StationTable from "../components/radio/StationTable"

export default function Radio() {
  return (
    <AnimatedPage>
      {/* Header */}
      <div className="px-6 md:px-12 pt-8 pb-4">
        <SectionLabel className="mb-3">BROADCAST_FREQUENCIES</SectionLabel>
        <HugeTitle>RADIO</HugeTitle>
      </div>

      {/* Full-width waveform */}
      <div className="px-6 md:px-12 py-4 bg-carbon">
        <Waveform bars={80} height={48} />
      </div>

      {/* Preset Grid */}
      <div className="px-6 md:px-12 py-8">
        <PresetGrid />
      </div>

      {/* World Map */}
      <div className="px-6 md:px-12 py-4">
        <SectionLabel className="mb-4">GLOBAL_NETWORK</SectionLabel>
        <WorldMap />
      </div>

      {/* Station Table */}
      <div className="px-6 md:px-12 py-8">
        <StationTable />
      </div>
    </AnimatedPage>
  )
}
