export const ipcChannels = {
  overlay: {
    getState: 'overlay:get-state',
    show: 'overlay:show',
    hide: 'overlay:hide',
    toggle: 'overlay:toggle'
  }
} as const

export interface OverlayWindowState {
  visible: boolean
  clickThrough: boolean
}