export {}

interface RuntimeInformation {
  electron: string
  chromium: string
  node: string
  platform: NodeJS.Platform
}

interface DesktopApi {
  runtime: RuntimeInformation
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
