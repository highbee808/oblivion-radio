import { NavLink } from "react-router-dom"
import { Home, Search, Headphones, Radio, Archive } from "lucide-react"

const tabs = [
  { to: "/", icon: Home, label: "HOME" },
  { to: "/browse", icon: Search, label: "BROWSE" },
  { to: "/listen", icon: Headphones, label: "LISTEN" },
  { to: "/radio", icon: Radio, label: "RADIO" },
  { to: "/archive", icon: Archive, label: "ARCHIVE" },
]

export default function MobileTabBar() {
  return (
    <nav className="bg-ink border-t border-acid/20 flex items-center justify-around py-2 px-1">
      {tabs.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-2 py-1 ${
              isActive ? "text-acid" : "text-mid"
            }`
          }
        >
          <Icon size={18} strokeWidth={1.5} />
          <span className="font-pixel text-[10px]">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
