import { stations } from "../../data/stations"
import { useRadio } from "../../context/RadioContext"
import SectionLabel from "../shared/SectionLabel"

export default function StationTable() {
  const { state, tuneStation } = useRadio()

  return (
    <div>
      <SectionLabel className="mb-4">ALL_STATIONS</SectionLabel>
      <div className="border border-ink/10 bg-paper overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-ink/10 bg-concrete">
              <th className="text-left font-pixel text-[11px] text-mid px-3 py-2 tracking-widest">
                FREQ
              </th>
              <th className="text-left font-pixel text-[11px] text-mid px-3 py-2 tracking-widest">
                STATION
              </th>
              <th className="text-left font-pixel text-[11px] text-mid px-3 py-2 tracking-widest hidden sm:table-cell">
                CITY
              </th>
              <th className="text-left font-pixel text-[11px] text-mid px-3 py-2 tracking-widest hidden md:table-cell">
                GENRE
              </th>
              <th className="text-left font-pixel text-[11px] text-mid px-3 py-2 tracking-widest hidden md:table-cell">
                LISTENERS
              </th>
              <th className="text-left font-pixel text-[11px] text-mid px-3 py-2 tracking-widest">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station) => {
              const isActive = state.currentStation?.id === station.id
              return (
                <tr
                  key={station.id}
                  onClick={() => tuneStation(station)}
                  className={`border-b border-ink/5 transition-colors ${
                    isActive
                      ? "bg-acid/10"
                      : "hover:bg-concrete/50"
                  }`}
                >
                  <td className="px-3 py-2 font-archivo-stretched text-sm">
                    {station.frequency}
                  </td>
                  <td className="px-3 py-2 font-mono text-xs">
                    {station.name}
                  </td>
                  <td className="px-3 py-2 font-pixel text-[11px] text-mid hidden sm:table-cell">
                    {station.city}
                  </td>
                  <td className="px-3 py-2 hidden md:table-cell">
                    <span className="font-pixel text-[11px] bg-concrete px-1.5 py-0.5">
                      {station.genre}
                    </span>
                  </td>
                  <td className="px-3 py-2 font-pixel text-[11px] text-mid hidden md:table-cell">
                    {station.listeners.toLocaleString()}
                  </td>
                  <td className="px-3 py-2">
                    {station.isLive ? (
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-acid animate-pulse-dot" />
                        <span className="font-pixel text-[11px] text-acid">
                          LIVE
                        </span>
                      </span>
                    ) : (
                      <span className="font-pixel text-[11px] text-mid">
                        OFFLINE
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
