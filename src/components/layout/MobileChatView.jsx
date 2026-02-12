import { useState, useEffect, useRef } from "react"
import { Send } from "lucide-react"
import { useRadio } from "../../context/RadioContext"
import { getInitialMessages, getRandomMessage } from "../../data/chatMessages"

export default function MobileChatView() {
  const { state } = useRadio()
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
    <div className="flex-1 flex flex-col min-h-0">
      {/* Station info bar */}
      <div className="px-5 py-2.5 bg-paper/5 border-b border-paper/5 flex-shrink-0">
        <div className="font-mono text-xs text-paper/60">
          {state.currentStation
            ? `${state.currentStation.name} — ${state.currentStation.frequency} MHz`
            : "NO_STATION"}
        </div>
        <div className="font-pixel text-[11px] text-mid mt-0.5">
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
            <div className="font-mono text-xs text-paper/60 mt-0.5">
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="p-4 border-t border-paper/10 flex items-center gap-2 flex-shrink-0"
      >
        <span className="font-pixel text-acid text-xs">&gt;</span>
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
          <Send size={16} />
        </button>
      </form>
    </div>
  )
}
