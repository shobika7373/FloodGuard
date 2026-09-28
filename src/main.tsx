import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'

import './index.css'
import App from './App.tsx'

// Register FloodGuard PWA service worker
registerSW({
  immediate: true,
  onRegistered() {
    console.log('FloodGuard service worker registered')
  },
  onRegisterError(error) {
    console.error('FloodGuard service worker registration failed:', error)
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)