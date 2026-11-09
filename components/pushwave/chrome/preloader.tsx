/**
 * A 1.4s intro, entirely in CSS so it starts painting with the HTML and
 * never waits on JavaScript. The wordmark rises, the wave line draws, and
 * the curtain lifts as the hero headline starts its own reveal.
 * Reduced motion: not shown at all (see pushwave.css).
 */
export function Preloader() {
  const letters = 'PUSHWAVE'.split('');
  return (
    <div className="pw-preloader" aria-hidden>
      <div className="pw-preloader__inner">
        <div className="pw-preloader__word">
          {letters.map((letter, index) => (
            <span key={index} className="pw-preloader__char" style={{ '--i': index } as React.CSSProperties}>
              {letter}
            </span>
          ))}
        </div>
        <svg className="pw-preloader__wave" viewBox="0 0 360 28" preserveAspectRatio="none">
          <path
            pathLength={1}
            d="M2 14 C 30 14, 38 3, 60 3 S 92 25, 120 25 S 152 3, 180 3 S 212 25, 240 25 S 272 3, 300 3 S 330 14, 358 14"
          />
        </svg>
        <p className="pw-preloader__by">by PUSHWebb</p>
      </div>
    </div>
  );
}

/** Film grain over everything; a stepped transform so it shimmers without repainting. */
export function Grain() {
  return <div className="pw-grain" aria-hidden />;
}
