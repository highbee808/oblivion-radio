import { NavLink } from "react-router-dom"
import {
  Home,
  Search,
  Headphones,
  Radio,
  Archive,
  User,
  Signal,
  Cpu,
} from "lucide-react"
import { useSystemMetrics } from "../../hooks/useSystemMetrics"

const navItems = [
  { to: "/", icon: Home, label: "HOME" },
  { to: "/browse", icon: Search, label: "BROWSE" },
  { to: "/listen", icon: Headphones, label: "LISTEN" },
  { to: "/radio", icon: Radio, label: "RADIO" },
  { to: "/archive", icon: Archive, label: "ARCHIVE" },
  { to: "/profile", icon: User, label: "PROFILE" },
]

export default function Sidebar() {
  const metrics = useSystemMetrics()

  return (
    <div className="h-full flex flex-col p-3 xl:p-6 overflow-hidden">
      {/* Logo */}
      <div className="mb-6 xl:mb-8">
        <div className="hidden xl:block">
          <div className="font-archivo-stretched text-2xl leading-none tracking-tighter">
            OBLIVION
          </div>
          <div className="font-archivo-stretched text-2xl leading-none tracking-tighter">
            RADIO
          </div>
          <div className="font-pixel text-xs text-mid mt-1">
            GLOBAL_BROADCAST_NETWORK
          </div>
        </div>
        <div className="xl:hidden text-center">
          <div className="font-archivo-stretched text-sm leading-none">OR</div>
        </div>
        <div className="h-px bg-ink mt-3 xl:mt-4" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        <div className="hidden xl:block font-pixel text-[11px] text-mid mb-3 tracking-widest">
          [ NAVIGATION ]
        </div>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center justify-center xl:justify-start gap-3 px-2 xl:px-3 py-2.5 font-mono text-xs tracking-wider transition-all ${
                isActive
                  ? "bg-ink text-acid font-bold"
                  : "text-dark-mid hover:bg-ink/5 hover:text-ink"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={14} strokeWidth={1.5} />
                <span className="hidden xl:inline">{label}</span>
                {isActive && (
                  <span className="ml-auto text-acid font-pixel text-[11px] hidden xl:inline">
                    ◄
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* System Info — desktop only */}
      <div className="mt-auto pt-4 xl:pt-6 border-t border-ink/20 hidden xl:block">
        <div className="font-pixel text-[11px] text-mid mb-3 tracking-widest">
          [ SYSTEM_STATUS ]
        </div>
        <div className="space-y-2 font-pixel text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-mid flex items-center gap-1.5">
              <Cpu size={10} /> CPU
            </span>
            <span className="text-ink">{metrics.cpu.toFixed(1)}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-mid flex items-center gap-1.5">
              <Signal size={10} /> LATENCY
            </span>
            <span className="text-ink">{metrics.latency.toFixed(0)}ms</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-mid">STATIONS</span>
            <span className="text-ink">{metrics.activeStations}/20</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-mid">UPTIME</span>
            <span className="text-acid-dim">{metrics.uptime}</span>
          </div>
        </div>
        <div className="h-px bg-ink/20 mt-4" />
        <div className="font-pixel text-[11px] text-mid mt-3">
          v2.1.0 // SECTOR_7
        </div>
      </div>

      {/* Tablet: show compact metrics */}
      <div className="mt-auto pt-4 border-t border-ink/20 xl:hidden">
        <div className="flex flex-col items-center gap-1 font-pixel text-[11px]">
          <div className="flex items-center gap-1 text-mid">
            <Cpu size={8} />
            <span>{metrics.cpu.toFixed(0)}%</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-acid animate-pulse-dot" />
        </div>
      </div>
    </div>
  )
}
