interface HexHighlight {
  id: string
  name: string
  left: string
  top: string
}

const boardHighlights: HexHighlight[] = [
  {
    id: 'poppy',
    name: 'Poppy',
    left: '30%',
    top: '27%'
  },
  {
    id: 'veigar',
    name: 'Veigar',
    left: '37%',
    top: '56%'
  }
]

export function OverlayApp(): React.JSX.Element {
  return (
    <main className="overlay-canvas">
      <section className="board-highlights">
        {boardHighlights.map((highlight) => (
          <div
            className="hex-highlight"
            key={highlight.id}
            style={{
              left: highlight.left,
              top: highlight.top
            }}
          >
            <span>{highlight.name}</span>
          </div>
        ))}
      </section>

      <section
        aria-label="Recommended shop purchase"
        className="shop-highlight"
      >
        <span>Recommended</span>
      </section>

      <aside className="development-label">
        Overlay development preview
      </aside>
    </main>
  )
}
