const usernames = [
  "void_walker",
  "neon_ghost",
  "static_dream",
  "bass_phantom",
  "circuit_witch",
  "hex_signal",
  "dark_frequency",
  "pixel_drift",
  "chrome_sage",
  "wave_runner",
  "acid_prophet",
  "sub_zero",
  "ghost_node",
  "signal_rat",
  "data_monk",
  "feedback_loop",
  "noise_priest",
  "zero_cool",
  "bit_crusher",
  "phase_shift",
]

const messages = [
  "this track is absolute fire 🔥",
  "the bass on this one hits different",
  "anyone know the ID on this?",
  "been waiting for this set all week",
  "MASSIVE tune",
  "need this on vinyl immediately",
  "the production quality is insane",
  "this frequency is everything",
  "vibes are immaculate rn",
  "who else is tuned in from the void?",
  "DROP 💀",
  "this DJ never misses",
  "can we get a tracklist?",
  "goosebumps every time",
  "the buildup on this...",
  "transmitting from the underground",
  "pure signal, no noise",
  "this is why I stay up at 3am",
  "oblivion radio stays undefeated",
  "the frequencies are aligned tonight",
  "anyone else feel that bass in their chest?",
  "inject this directly into my circuits",
  "TUNE.",
  "lost in the transmission",
  "this one goes out to the night shift",
  "404: sleep not found",
  "audio nirvana achieved",
  "the waveform doesn't lie",
  "broadcasting from sector 7",
  "respect to the operators",
  "signal strength: MAXIMUM",
  "another dimension of sound",
  "this is the frequency I was searching for",
  "late night protocol activated",
  "absolutely transcendent",
]

export function getRandomMessage() {
  const username = usernames[Math.floor(Math.random() * usernames.length)]
  const message = messages[Math.floor(Math.random() * messages.length)]
  const timestamp = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  })
  return { username, message, timestamp, id: Date.now() + Math.random() }
}

export function getInitialMessages(count = 8) {
  return Array.from({ length: count }, () => getRandomMessage())
}
