import { createContext, useContext, useReducer, useCallback } from "react"
import { stations } from "../data/stations"

const RadioContext = createContext(null)

const initialState = {
  currentStation: stations[0],
  currentTrackIndex: 0,
  isPlaying: false,
  volume: 75,
  streamStatus: "idle", // "idle" | "loading" | "playing" | "error"
  streamError: null,
  rightPanelMode: "player",
  rightPanelOpen: false,
  activeGenreFilter: null,
  activeRegionFilter: null,
  searchQuery: "",
  favoriteStations: [1, 3, 9],
  recentlyPlayed: [1, 4, 7],
}

function radioReducer(state, action) {
  switch (action.type) {
    case "SET_STATION":
      return {
        ...state,
        currentStation: action.payload,
        currentTrackIndex: 0,
        isPlaying: true,
        streamStatus: "loading",
        streamError: null,
        recentlyPlayed: [
          action.payload.id,
          ...state.recentlyPlayed.filter((id) => id !== action.payload.id),
        ].slice(0, 10),
      }
    case "TOGGLE_PLAY":
      return { ...state, isPlaying: !state.isPlaying }
    case "SET_PLAYING":
      return { ...state, isPlaying: action.payload }
    case "SET_VOLUME":
      return { ...state, volume: action.payload }
    case "SET_STREAM_STATUS":
      return {
        ...state,
        streamStatus: action.payload,
        ...(action.payload === "playing" ? { streamError: null } : {}),
      }
    case "SET_STREAM_ERROR":
      return {
        ...state,
        streamError: action.payload,
        streamStatus: "error",
      }
    case "NEXT_STATION": {
      const idx = stations.findIndex((s) => s.id === state.currentStation?.id)
      const nextStation = stations[(idx + 1) % stations.length]
      return {
        ...state,
        currentStation: nextStation,
        currentTrackIndex: 0,
        isPlaying: true,
        streamStatus: "loading",
        streamError: null,
        recentlyPlayed: [
          nextStation.id,
          ...state.recentlyPlayed.filter((id) => id !== nextStation.id),
        ].slice(0, 10),
      }
    }
    case "PREV_STATION": {
      const idx = stations.findIndex((s) => s.id === state.currentStation?.id)
      const prevStation = stations[(idx - 1 + stations.length) % stations.length]
      return {
        ...state,
        currentStation: prevStation,
        currentTrackIndex: 0,
        isPlaying: true,
        streamStatus: "loading",
        streamError: null,
        recentlyPlayed: [
          prevStation.id,
          ...state.recentlyPlayed.filter((id) => id !== prevStation.id),
        ].slice(0, 10),
      }
    }
    case "NEXT_TRACK": {
      const tracks = state.currentStation?.tracks || []
      const nextIndex = (state.currentTrackIndex + 1) % tracks.length
      return { ...state, currentTrackIndex: nextIndex }
    }
    case "PREV_TRACK": {
      const tracks = state.currentStation?.tracks || []
      const prevIndex =
        (state.currentTrackIndex - 1 + tracks.length) % tracks.length
      return { ...state, currentTrackIndex: prevIndex }
    }
    case "SET_PANEL_MODE":
      return { ...state, rightPanelMode: action.payload }
    case "TOGGLE_RIGHT_PANEL":
      return { ...state, rightPanelOpen: !state.rightPanelOpen }
    case "SET_RIGHT_PANEL_OPEN":
      return { ...state, rightPanelOpen: action.payload }
    case "SET_GENRE_FILTER":
      return {
        ...state,
        activeGenreFilter:
          state.activeGenreFilter === action.payload ? null : action.payload,
      }
    case "SET_REGION_FILTER":
      return {
        ...state,
        activeRegionFilter:
          state.activeRegionFilter === action.payload ? null : action.payload,
      }
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload }
    case "TOGGLE_FAVORITE":
      return {
        ...state,
        favoriteStations: state.favoriteStations.includes(action.payload)
          ? state.favoriteStations.filter((id) => id !== action.payload)
          : [...state.favoriteStations, action.payload],
      }
    default:
      return state
  }
}

export function RadioProvider({ children }) {
  const [state, dispatch] = useReducer(radioReducer, initialState)

  const tuneStation = useCallback(
    (station) => dispatch({ type: "SET_STATION", payload: station }),
    []
  )
  const togglePlay = useCallback(
    () => dispatch({ type: "TOGGLE_PLAY" }),
    []
  )
  const nextTrack = useCallback(
    () => dispatch({ type: "NEXT_TRACK" }),
    []
  )
  const prevTrack = useCallback(
    () => dispatch({ type: "PREV_TRACK" }),
    []
  )
  const nextStation = useCallback(
    () => dispatch({ type: "NEXT_STATION" }),
    []
  )
  const prevStation = useCallback(
    () => dispatch({ type: "PREV_STATION" }),
    []
  )

  return (
    <RadioContext.Provider value={{ state, dispatch, tuneStation, togglePlay, nextTrack, prevTrack, nextStation, prevStation }}>
      {children}
    </RadioContext.Provider>
  )
}

export function useRadio() {
  const context = useContext(RadioContext)
  if (!context) throw new Error("useRadio must be used within RadioProvider")
  return context
}
