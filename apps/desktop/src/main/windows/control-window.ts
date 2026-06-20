import { BrowserWindow } from 'electron'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const currentDirectory = dirname(fileURLToPath(import.meta.url))

export function createControlWindow(): BrowserWindow {
  const window = new BrowserWindow({
    title: 'TFT Overlay',
    width: 1180,
    height: 760,
    minWidth: 960,
    minHeight: 640,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#07101d',
    webPreferences: {
      preload: join(currentDirectory, '../preload/control.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true
    }
  })

  window.once('ready-to-show', () => {
    window.show()
  })

  const rendererUrl = process.env.ELECTRON_RENDERER_URL

  if (rendererUrl) {
    void window.loadURL(`${rendererUrl}/control/index.html`)
  } else {
    void window.loadFile(
      join(currentDirectory, '../renderer/control/index.html')
    )
  }

  return window
}

