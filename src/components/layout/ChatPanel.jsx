import { useState, useEffect, useRef } from "react"
import { Send, Headphones, X } from "lucide-react"
import { useRadio } from "../../context/RadioContext"
import { getInitialMessages, getRandomMessage } from "../../data/chatMessages"
import SectionLabel from "../shared/SectionLabel"

export default function ChatPanel() {
  const { state, dispatch } = useRadio()
  const [messages, setMessages] = useState(() => getInitialMessages(10))
  const [input, setInput] = useState("")
  const bottomRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prev) => [...prev.slice(-50), getRandomMessage()])
    }, 3000 + Math.random() * 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        username: "you",
        message: input.trim(),
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
        isUser: true,
      },
    ])
    setInput("")
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-paper/10">
        <SectionLabel className="text-paper/40">SIGNAL_CHAT</SectionLabel>
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch({ type: "SET_PANEL_MODE", payload: "player" })}
            className="font-pixel text-xs text-mid hover:text-acid flex items-center gap-1.5 transition-colors"
          >
            <Headphones size={12} />
            PLAYER
          </button>
          <button
            onClick={() => dispatch({ type: "SET_RIGHT_PANEL_OPEN", payload: false })}
            className="xl:hidden text-mid hover:text-paper transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Station info bar */}
      <div className="px-4 py-2 bg-paper/5 border-b border-paper/5">
        <div className="font-mono text-xs text-paper/60">
          {state.currentStation
            ? `${state.currentStation.name} — ${state.currentStation.frequency} MHz`
            : "NO_STATION"}
        </div>
        <div className="font-pixel text-[11px] text-mid">
          {messages.length} MESSAGES IN BUFFER
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={msg.isUser ? "pl-4" : ""}>
            <div className="flex items-baseline gap-2">
              <span
                className={`font-pixel text-[11px] ${
                  msg.isUser ? "text-acid" : "text-mid"
                }`}
              >
                {msg.timestamp}
              </span>
              <span
                className={`font-mono text-xs font-bold ${
                  msg.isUser ? "text-acid" : "text-paper/80"
                }`}
              >
                {msg.username}
              </span>
            </div>
            <div className="font-mono text-xs text-paper/60 mt-0.5 pl-0">
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="p-3 border-t border-paper/10 flex items-center gap-2"
      >
        <span className="font-pixel text-acid text-[11px]">&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="TRANSMIT_MESSAGE..."
          className="flex-1 bg-transparent font-mono text-xs text-paper placeholder:text-mid/40 outline-none"
        />
        <button
          type="submit"
          className="text-mid hover:text-acid transition-colors"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  )
}
