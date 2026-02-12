import { Search } from "lucide-react"
import { useRadio } from "../../context/RadioContext"

export default function SearchBar() {
  const { state, dispatch } = useRadio()

  return (
    <div className="flex items-center gap-2 bg-paper border border-ink/10 px-4 py-3 hover:border-ink transition-colors">
      <span className="font-pixel text-acid text-sm">&gt;</span>
      <input
        type="text"
        value={state.searchQuery}
        onChange={(e) =>
          dispatch({ type: "SET_SEARCH", payload: e.target.value })
        }
        placeholder="SEARCH_STATIONS..."
        className="flex-1 bg-transparent font-mono text-sm text-ink placeholder:text-mid/50 outline-none"
      />
      <Search size={16} className="text-mid" />
    </div>
  )
}
