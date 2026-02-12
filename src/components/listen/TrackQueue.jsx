import { useRadio } from "../../context/RadioContext"
import SectionLabel from "../shared/SectionLabel"
import AlbumCard from "../shared/AlbumCard"

export default function TrackQueue() {
  const { state } = useRadio()
  const { currentStation, currentTrackIndex, isPlaying } = state

  if (!currentStation) return null

  return (
    <div>
      <SectionLabel className="mb-3">TRACK_QUEUE</SectionLabel>
      <div className="border border-ink/10 bg-paper divide-y divide-ink/5">
        {currentStation.tracks.map((track, i) => (
          <div key={i} className="flex items-center gap-2 px-2">
            <span className="font-pixel text-[11px] text-mid w-5 text-right">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1">
              <AlbumCard
                track={track}
                station={currentStation}
                isPlaying={i === currentTrackIndex && isPlaying}
                index={i}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
