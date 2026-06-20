import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { OverlayApp } from './OverlayApp'
import './overlay.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Overlay renderer root element was not found.')
}

createRoot(rootElement).render(
  <StrictMode>
    <OverlayApp />
  </StrictMode>
)
