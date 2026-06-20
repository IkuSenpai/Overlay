import type {
  OverlayWindowState
} from '../shared/ipc-channels'

export {}

interface RuntimeInformation {
  electron: string
  chromium: string
  node: string
  platform: NodeJS.Platform
}

interface OverlayControls {
  getState: () => Promise<OverlayWindowState>
  show: () => Promise<OverlayWindowState>
  hide: () => Promise<OverlayWindowState>
  toggle: () => Promise<OverlayWindowState>
}

interface DesktopApi {
  runtime: RuntimeInformation
  overlay: OverlayControls
}

interface OverlayApi {
  runtime: RuntimeInformation
}

declare global {
  interface Window {
    desktopApi: DesktopApi
    overlayApi: OverlayApi
  }
}