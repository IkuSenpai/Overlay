import { app, BrowserWindow } from 'electron'
import { registerIpcHandlers } from './ipc/register-ipc'
import { createControlWindow } from './windows/control-window'
import { createOverlayWindow } from './windows/overlay-window'

let controlWindow: BrowserWindow | null = null
let overlayWindow: BrowserWindow | null = null

function createApplicationWindows(): void {
  overlayWindow = createOverlayWindow()
  controlWindow = createControlWindow()

  registerIpcHandlers(overlayWindow)

  controlWindow.on('closed', () => {
    controlWindow = null
  })

  overlayWindow.on('closed', () => {
    overlayWindow = null
  })
}

const hasSingleInstanceLock = app.requestSingleInstanceLock()

if (!hasSingleInstanceLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (!controlWindow) {
      return
    }

    if (controlWindow.isMinimized()) {
      controlWindow.restore()
    }

    controlWindow.show()
    controlWindow.focus()
  })

  app.whenReady().then(() => {
    createApplicationWindows()

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createApplicationWindows()
      }
    })
  })

  app.on('window-all-closed', () => {
    app.quit()
  })
}