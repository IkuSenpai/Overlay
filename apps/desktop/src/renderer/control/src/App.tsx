export function App(): React.JSX.Element {
  const runtime = window.desktopApi.runtime

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
          <p className="status-label">Development environment</p>
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

      <section className="feature-grid">
        <article className="feature-card">
          <span className="feature-number">01</span>
          <h3>Board Planner</h3>
          <p>
            Display the selected composition directly over the TFT board.
          </p>
        </article>

        <article className="feature-card">
          <span className="feature-number">02</span>
          <h3>Shop Highlights</h3>
          <p>
            Highlight recommended shop units with a clean blue border.
          </p>
        </article>

        <article className="feature-card">
          <span className="feature-number">03</span>
          <h3>Live Coach</h3>
          <p>
            Keep the pinned composition visible while the match progresses.
          </p>
        </article>
      </section>
    </main>
  )
}
