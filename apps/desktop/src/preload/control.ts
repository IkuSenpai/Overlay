import { contextBridge, ipcRenderer } from 'electron'
import { ipcChannels } from '../shared/ipc-channels'

contextBridge.exposeInMainWorld('desktopApi', {
  runtime: {
    electron: process.versions.electron,
    chromium: process.versions.chrome,
    node: process.versions.node,
    platform: process.platform
  },

  overlay: {
    getState: () =>
      ipcRenderer.invoke(ipcChannels.overlay.getState),

    show: () =>
      ipcRenderer.invoke(ipcChannels.overlay.show),

    hide: () =>
      ipcRenderer.invoke(ipcChannels.overlay.hide),

    toggle: () =>
      ipcRenderer.invoke(ipcChannels.overlay.toggle)
  }
})