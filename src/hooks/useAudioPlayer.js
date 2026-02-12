import { useEffect, useRef } from "react"
import { Howl } from "howler"
import { useRadio } from "../context/RadioContext"
import { useRadioStatic } from "./useRadioStatic"

export function useAudioPlayer() {
  const { state, dispatch } = useRadio()
  const { playStatic } = useRadioStatic()
  const howlRef = useRef(null)
  const stationIdRef = useRef(null)

  // Handle station changes
  useEffect(() => {
    const station = state.currentStation
    if (!station) return

    // Same station, no need to reload
    if (stationIdRef.current === station.id && howlRef.current) {
      return
    }

    // Unload previous
    if (howlRef.current) {
      howlRef.current.unload()
      howlRef.current = null
    }

    stationIdRef.current = station.id

    if (!state.isPlaying) return

    // Play static burst during transition
    playStatic(400)

    dispatch({ type: "SET_STREAM_STATUS", payload: "loading" })

    const howl = new Howl({
      src: [station.streamUrl],
      html5: true,
      format: ["mp3"],
      volume: state.volume / 100,
    })

    howl.on("play", () => {
      dispatch({ type: "SET_STREAM_STATUS", payload: "playing" })
    })

    howl.on("loaderror", (_id, err) => {
      dispatch({ type: "SET_STREAM_ERROR", payload: `Stream unavailable` })
    })

    howl.on("playerror", (_id, err) => {
      dispatch({ type: "SET_STREAM_ERROR", payload: `Playback error` })
    })

    howlRef.current = howl
    howl.play()

    return () => {
      howl.unload()
    }
  }, [state.currentStation?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Handle play/pause toggle
  useEffect(() => {
    const howl = howlRef.current
    if (!howl) {
      // No howl yet but user wants to play — create one
      if (state.isPlaying && state.currentStation) {
        playStatic(400)
        dispatch({ type: "SET_STREAM_STATUS", payload: "loading" })

        const newHowl = new Howl({
          src: [state.currentStation.streamUrl],
          html5: true,
          format: ["mp3"],
          volume: state.volume / 100,
        })

        newHowl.on("play", () => {
          dispatch({ type: "SET_STREAM_STATUS", payload: "playing" })
        })

        newHowl.on("loaderror", () => {
          dispatch({ type: "SET_STREAM_ERROR", payload: "Stream unavailable" })
        })

        newHowl.on("playerror", () => {
          dispatch({ type: "SET_STREAM_ERROR", payload: "Playback error" })
        })

        howlRef.current = newHowl
        stationIdRef.current = state.currentStation.id
        newHowl.play()
      }
      return
    }

    if (state.isPlaying) {
      if (!howl.playing()) howl.play()
    } else {
      howl.pause()
    }
  }, [state.isPlaying]) // eslint-disable-line react-hooks/exhaustive-deps

  // Handle volume changes
  useEffect(() => {
    if (howlRef.current) {
      howlRef.current.volume(state.volume / 100)
    }
  }, [state.volume])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (howlRef.current) {
        howlRef.current.unload()
        howlRef.current = null
      }
    }
  }, [])
}
