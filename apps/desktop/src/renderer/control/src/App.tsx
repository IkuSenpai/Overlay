import { useEffect, useState } from 'react'

type OverlayWindowState = Awaited<
  ReturnType<Window['desktopApi']['overlay']['getState']>
>

export function App(): React.JSX.Element {
  const runtime = window.desktopApi.runtime

  const [overlayState, setOverlayState] =
    useState<OverlayWindowState | null>(null)

  const [isUpdatingOverlay, setIsUpdatingOverlay] =
    useState(false)

  const [overlayError, setOverlayError] =
    useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    window.desktopApi.overlay
      .getState()
      .then((state) => {
        if (isActive) {
          setOverlayState(state)
        }
      })
      .catch((error: unknown) => {
        if (isActive) {
          setOverlayError(
            error instanceof Error
              ? error.message
              : 'Unable to read the overlay state.'
          )
        }
      })

    return () => {
      isActive = false
    }
  }, [])

  async function runOverlayAction(
    action: () => Promise<OverlayWindowState>
  ): Promise<void> {
    setIsUpdatingOverlay(true)
    setOverlayError(null)

    try {
      const state = await action()
      setOverlayState(state)
    } catch (error: unknown) {
      setOverlayError(
        error instanceof Error
          ? error.message
          : 'The overlay action failed.'
      )
    } finally {
      setIsUpdatingOverlay(false)
    }
  }

  const isOverlayVisible = overlayState?.visible ?? false

  return (
    <main className="application-shell">
      <header className="hero">
        <div className="brand-mark" aria-hidden="true">
          T
        </div>

        <div>
          <p className="eyebrow">Desktop Companion</p>
          <h1>TFT Overlay</h1>
          <p className="subtitle">
            Smart guidance. Better placements.
          </p>
        </div>
      </header>

      <section className="status-card">
        <div>
          <p className="status-label">
            Development environment
          </p>
          <h2>Foundation ready</h2>
        </div>

        <span className="status-badge">Connected</span>
      </section>

      <section className="runtime-grid">
        <article className="runtime-card">
          <span>Electron</span>
          <strong>{runtime.electron}</strong>
        </article>

        <article className="runtime-card">
          <span>Chromium</span>
          <strong>{runtime.chromium}</strong>
        </article>

        <article className="runtime-card">
          <span>Node.js</span>
          <strong>{runtime.node}</strong>
        </article>

        <article className="runtime-card">
          <span>Platform</span>
          <strong>{runtime.platform}</strong>
        </article>
      </section>

      <section className="overlay-control-panel">
        <div className="overlay-control-copy">
          <p className="status-label">Overlay renderer</p>
          <h2>Development preview</h2>
          <p>
            Display the transparent board and shop highlights
            over your primary monitor.
          </p>
        </div>

        <div className="overlay-control-actions">
          <span
            className={
              isOverlayVisible
                ? 'overlay-state overlay-state-visible'
                : 'overlay-state'
            }
          >
            {isOverlayVisible ? 'Visible' : 'Hidden'}
          </span>

          <button
            className="secondary-button"
            disabled={isUpdatingOverlay}
            onClick={() => {
              void runOverlayAction(
                window.desktopApi.overlay.hide
              )
            }}
            type="button"
          >
            Hide
          </button>

          <button
            className="primary-button"
            disabled={isUpdatingOverlay}
            onClick={() => {
              void runOverlayAction(
                window.desktopApi.overlay.toggle
              )
            }}
            type="button"
          >
            {isUpdatingOverlay
              ? 'Updating...'
              : isOverlayVisible
                ? 'Hide Preview'
                : 'Show Preview'}
          </button>
        </div>

        {overlayError ? (
          <p className="overlay-error">{overlayError}</p>
        ) : null}
      </section>

      <section className="feature-grid">
        <article className="feature-card">
          <span className="feature-number">01</span>
          <h3>Board Planner</h3>
          <p>
            Display the selected composition directly over the
            TFT board.
          </p>
        </article>

        <article className="feature-card">
          <span className="feature-number">02</span>
          <h3>Shop Highlights</h3>
          <p>
            Highlight recommended shop units with a clean blue
            border.
          </p>
        </article>

        <article className="feature-card">
          <span className="feature-number">03</span>
          <h3>Live Coach</h3>
          <p>
            Keep the pinned composition visible while the match
            progresses.
          </p>
        </article>
      </section>
    </main>
  )
}