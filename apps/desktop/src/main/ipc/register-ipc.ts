import { BrowserWindow, ipcMain } from 'electron'
import { showOverlayWindow } from '../windows/overlay-window'
import {
  ipcChannels,
  type OverlayWindowState
} from '../../shared/ipc-channels'

function getOverlayState(
  overlayWindow: BrowserWindow
): OverlayWindowState {
  return {
    visible: overlayWindow.isVisible(),
    clickThrough: true
  }
}

export function registerIpcHandlers(
  overlayWindow: BrowserWindow
): void {
  ipcMain.handle(
    ipcChannels.overlay.getState,
    () => getOverlayState(overlayWindow)
  )

  ipcMain.handle(
    ipcChannels.overlay.show,
    () => {
      showOverlayWindow(overlayWindow)
      return getOverlayState(overlayWindow)
    }
  )

  ipcMain.handle(
    ipcChannels.overlay.hide,
    () => {
      overlayWindow.hide()
      return getOverlayState(overlayWindow)
    }
  )

  ipcMain.handle(
    ipcChannels.overlay.toggle,
    () => {
      if (overlayWindow.isVisible()) {
        overlayWindow.hide()
      } else {
        showOverlayWindow(overlayWindow)
      }

      return getOverlayState(overlayWindow)
    }
  )
}