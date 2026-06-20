import { BrowserWindow, screen } from 'electron'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const currentDirectory = dirname(fileURLToPath(import.meta.url))

function enforceOverlayZOrder(window: BrowserWindow): void {
  if (window.isDestroyed()) {
    return
  }

  window.setAlwaysOnTop(true, 'screen-saver')
  window.moveTop()
}

export function showOverlayWindow(
  window: BrowserWindow
): void {
  if (window.isDestroyed()) {
    return
  }

  window.showInactive()
  enforceOverlayZOrder(window)

  setTimeout(() => {
    if (window.isVisible()) {
      enforceOverlayZOrder(window)
    }
  }, 50)
}

export function createOverlayWindow(): BrowserWindow {
  const display = screen.getPrimaryDisplay()

  const window = new BrowserWindow({
    title: 'TFT Overlay Renderer',
    x: display.bounds.x,
    y: display.bounds.y,
    width: display.bounds.width,
    height: display.bounds.height,
    show: false,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    hasShadow: false,
    focusable: false,
    webPreferences: {
      preload: join(currentDirectory, '../preload/overlay.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      backgroundThrottling: false
    }
  })

  window.setIgnoreMouseEvents(true, { forward: true })
  enforceOverlayZOrder(window)

  window.on('show', () => {
    enforceOverlayZOrder(window)
  })

  window.on(
    'always-on-top-changed',
    (_event, isAlwaysOnTop) => {
      if (!isAlwaysOnTop && window.isVisible()) {
        enforceOverlayZOrder(window)
      }
    }
  )

  const rendererUrl = process.env.ELECTRON_RENDERER_URL

  if (rendererUrl) {
    void window.loadURL(`${rendererUrl}/overlay/index.html`)
  } else {
    void window.loadFile(
      join(currentDirectory, '../renderer/overlay/index.html')
    )
  }

  return window
}