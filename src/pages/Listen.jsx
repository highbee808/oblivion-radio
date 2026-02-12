import AnimatedPage from "../components/shared/AnimatedPage"
import NowPlayingHero from "../components/listen/NowPlayingHero"
import TrackQueue from "../components/listen/TrackQueue"
import StationInfo from "../components/listen/StationInfo"
import { useRadio } from "../context/RadioContext"
import PillButton from "../components/shared/PillButton"

export default function Listen() {
  const { state, dispatch } = useRadio()

  return (
    <AnimatedPage>
      <NowPlayingHero />

      {/* Panel toggle (for tablet/mobile) */}
      <div className="xl:hidden px-6 py-3 bg-concrete border-b border-ink/10 flex gap-2">
        <PillButton
          size="sm"
          variant="outline"
          active={state.rightPanelMode === "player"}
          onClick={() => {
            dispatch({ type: "SET_PANEL_MODE", payload: "player" })
            dispatch({ type: "SET_RIGHT_PANEL_OPEN", payload: true })
          }}
        >
          PLAYER
        </PillButton>
        <PillButton
          size="sm"
          variant="outline"
          active={state.rightPanelMode === "chat"}
          onClick={() => {
            dispatch({ type: "SET_PANEL_MODE", payload: "chat" })
            dispatch({ type: "SET_RIGHT_PANEL_OPEN", payload: true })
          }}
        >
          SIGNAL_CHAT
        </PillButton>
      </div>

      <div className="px-6 md:px-12 py-8 space-y-8">
        <TrackQueue />
        <StationInfo />
      </div>
    </AnimatedPage>
  )
}
