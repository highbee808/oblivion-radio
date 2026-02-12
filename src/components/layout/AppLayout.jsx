import { Outlet } from "react-router-dom"
import { Headphones } from "lucide-react"
import Sidebar from "./Sidebar"
import StatusBar from "./StatusBar"
import PlayerPanel from "./PlayerPanel"
import ChatPanel from "./ChatPanel"
import MobileTabBar from "./MobileTabBar"
import MiniPlayer from "./MiniPlayer"
import MobilePlayerModal from "./MobilePlayerModal"
import { useRadio } from "../../context/RadioContext"
import { useAudioPlayer } from "../../hooks/useAudioPlayer"

export default function AppLayout() {
  const { state, dispatch } = useRadio()
  useAudioPlayer()

  return (
    <div className="app-grid">
      {/* Sidebar — visible on tablet (80px icons) and desktop (320px full) */}
      <aside className="app-grid-sidebar bg-concrete border-r border-ink hidden md:block">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="app-grid-main">
        <Outlet />
      </main>

      {/* Right Panel — tablet/desktop only */}
      <div
        className={`app-grid-right bg-carbon text-paper ${state.rightPanelOpen ? "open" : ""}`}
      >
        {state.rightPanelMode === "player" ? <PlayerPanel /> : <ChatPanel />}
      </div>

      {/* Status Bar */}
      <footer className="app-grid-status hidden md:block">
        <StatusBar />
      </footer>

      {/* Mobile Only: mini player + tab bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
        <MiniPlayer />
        <MobileTabBar />
      </div>

      {/* Mobile: full-screen player modal (rendered at root level, outside wrappers) */}
      {state.rightPanelOpen && (
        <div className="md:hidden">
          <MobilePlayerModal />
        </div>
      )}

      {/* Tablet: floating toggle for right panel */}
      <button
        className="hidden md:flex xl:hidden fixed bottom-4 right-4 z-30 items-center gap-2 bg-acid text-ink px-4 py-2 font-mono text-xs"
        onClick={() => dispatch({ type: "TOGGLE_RIGHT_PANEL" })}
        aria-label="Toggle now playing panel"
      >
        <Headphones size={14} />
        NOW_PLAYING
      </button>

      {/* Overlay backdrop for tablet panel */}
      {state.rightPanelOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[45] xl:hidden hidden md:block"
          onClick={() => dispatch({ type: "SET_RIGHT_PANEL_OPEN", payload: false })}
        />
      )}
    </div>
  )
}
