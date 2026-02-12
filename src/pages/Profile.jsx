import AnimatedPage from "../components/shared/AnimatedPage"
import HugeTitle from "../components/shared/HugeTitle"
import SectionLabel from "../components/shared/SectionLabel"
import StationCard from "../components/shared/StationCard"
import { useRadio } from "../context/RadioContext"
import { stations } from "../data/stations"
import { Terminal, User, Heart, Clock } from "lucide-react"

export default function Profile() {
  const { state } = useRadio()

  const favoriteStations = stations.filter((s) =>
    state.favoriteStations.includes(s.id)
  )
  const recentStations = state.recentlyPlayed
    .map((id) => stations.find((s) => s.id === id))
    .filter(Boolean)
    .slice(0, 4)

  return (
    <AnimatedPage className="px-6 md:px-12 py-8">
      {/* Header */}
      <div className="mb-8">
        <SectionLabel className="mb-3">IDENTITY</SectionLabel>
        <HugeTitle>PROFILE</HugeTitle>
      </div>

      {/* Terminal identity block */}
      <div className="bg-carbon text-paper p-6 mb-8 font-mono text-sm">
        <div className="flex items-center gap-2 mb-4">
          <Terminal size={14} className="text-acid" />
          <span className="font-pixel text-[11px] text-acid">
            USER_TERMINAL
          </span>
        </div>
        <div className="space-y-1.5 text-[13px]">
          <div>
            <span className="text-mid">user@oblivion:</span>
            <span className="text-acid">~</span>
            <span className="text-paper">$ whoami</span>
          </div>
          <div className="flex items-center gap-3 pl-4">
            <div className="w-10 h-10 bg-acid/20 border border-acid/30 flex items-center justify-center">
              <User size={18} className="text-acid" />
            </div>
            <div>
              <div className="text-paper">ANONYMOUS_LISTENER</div>
              <div className="text-mid text-[11px]">
                SECTOR_7 // CLEARANCE: BROADCAST
              </div>
            </div>
          </div>
          <div className="mt-3">
            <span className="text-mid">user@oblivion:</span>
            <span className="text-acid">~</span>
            <span className="text-paper">$ cat stats.log</span>
          </div>
          <div className="pl-4 space-y-0.5 text-paper/60">
            <div>
              STATIONS_FAVORITED: {state.favoriteStations.length}
            </div>
            <div>
              RECENTLY_PLAYED: {state.recentlyPlayed.length}
            </div>
            <div>
              CURRENT_STATION:{" "}
              {state.currentStation?.name || "NONE"}
            </div>
            <div>
              STATUS: {state.isPlaying ? "BROADCASTING" : "STANDBY"}
            </div>
          </div>
          <div className="mt-2">
            <span className="text-mid">user@oblivion:</span>
            <span className="text-acid">~</span>
            <span className="text-paper terminal-cursor">$ </span>
          </div>
        </div>
      </div>

      {/* Favorites */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Heart size={14} className="text-acid" />
          <SectionLabel>FAVORITE_STATIONS</SectionLabel>
        </div>
        {favoriteStations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteStations.map((station, i) => (
              <StationCard key={station.id} station={station} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-paper border border-ink/10">
            <div className="font-pixel text-mid">NO_FAVORITES</div>
            <div className="font-mono text-xs text-mid/60 mt-1">
              Heart a station to add it here
            </div>
          </div>
        )}
      </div>

      {/* Recently Played */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Clock size={14} />
          <SectionLabel>RECENTLY_PLAYED</SectionLabel>
        </div>
        {recentStations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {recentStations.map((station, i) => (
              <StationCard key={station.id} station={station} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-paper border border-ink/10">
            <div className="font-pixel text-mid">NO_HISTORY</div>
            <div className="font-mono text-xs text-mid/60 mt-1">
              Start listening to build your history
            </div>
          </div>
        )}
      </div>
    </AnimatedPage>
  )
}
