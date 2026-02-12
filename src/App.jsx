import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import BootScreen from "./components/BootScreen"
import AppLayout from "./components/layout/AppLayout"
import Home from "./pages/Home"
import Browse from "./pages/Browse"
import Listen from "./pages/Listen"
import Radio from "./pages/Radio"
import Archive from "./pages/Archive"
import Profile from "./pages/Profile"

export default function App() {
  const [booted, setBooted] = useState(() => !!sessionStorage.getItem("oblivion-booted"))

  return (
    <AnimatePresence mode="wait">
      {!booted ? (
        <motion.div
          key="boot"
          exit={{ opacity: 0, filter: "brightness(2) blur(2px)", transition: { duration: 0.4 } }}
        >
          <BootScreen onComplete={() => setBooted(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="browse" element={<Browse />} />
                <Route path="listen" element={<Listen />} />
                <Route path="radio" element={<Radio />} />
                <Route path="archive" element={<Archive />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
