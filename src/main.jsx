import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { RadioProvider } from './context/RadioContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RadioProvider>
      <App />
    </RadioProvider>
  </React.StrictMode>
)
