import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('desktopApi', {
  runtime: {
    electron: process.versions.electron,
    chromium: process.versions.chrome,
    node: process.versions.node,
    platform: process.platform
  }
})
