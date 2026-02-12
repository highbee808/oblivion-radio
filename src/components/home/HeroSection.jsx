import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import HugeTitle from "../shared/HugeTitle"
import PillButton from "../shared/PillButton"
import Waveform from "../shared/Waveform"
import SignalBar from "../shared/SignalBar"
import DecoSquares from "../shared/DecoSquares"
import { useRadio } from "../../context/RadioContext"

export default function HeroSection() {
  const navigate = useNavigate()
  const { state } = useRadio()

  return (
    <div className="relative bg-carbon text-paper px-6 md:px-12 py-16 md:py-24 overflow-hidden">
      {/* Decorative elements */}
      <DecoSquares className="absolute top-6 right-6" count={4} />
      <div className="absolute top-6 left-6 font-pixel text-[11px] text-paper/20">
        SECTOR_7 // GLOBAL_BROADCAST
      </div>

      {/* Scanlines */}
      <div className="scanlines" />

      <div className="relative z-10 max-w-4xl">
        {/* Tag line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-pixel text-[11px] text-acid tracking-[0.4em] mb-6"
        >
          GLOBAL BROADCAST NETWORK
        </motion.div>

        {/* Title */}
        <HugeTitle dark>OBLIVION</HugeTitle>
        <HugeTitle dark className="mt-[-0.1em]">
          RADIO
        </HugeTitle>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-mono text-sm text-paper/50 max-w-md mt-6 leading-relaxed"
        >
          20 underground stations. 7 continents. One frequency. Tune into the
          world's most uncompromising broadcast network.
        </motion.p>

        {/* CTA + Status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-3 mt-8"
        >
          <PillButton variant="acid" size="lg" onClick={() => navigate("/listen")}>
            TUNE IN NOW
          </PillButton>
          <PillButton
            variant="ghost"
            size="lg"
            className="border border-paper/30 text-paper hover:bg-paper hover:text-ink"
            onClick={() => navigate("/browse")}
          >
            BROWSE STATIONS
          </PillButton>
        </motion.div>

        {/* Featured station mini-display */}
        {state.currentStation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <SignalBar strength={4} />
              <span className="font-pixel text-[11px] text-acid">
                {state.currentStation.frequency} MHz
              </span>
            </div>
            <span className="font-mono text-xs text-paper/40">
              {state.currentStation.name}
            </span>
            {state.isPlaying && (
              <span className="font-pixel text-[11px] text-acid animate-blink">
                ● LIVE
              </span>
            )}
          </motion.div>
        )}
      </div>

      {/* Bottom waveform */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-0 left-0 right-0 px-6"
      >
        <Waveform bars={80} height={40} />
      </motion.div>
    </div>
  )
}
