/**
 * Full-screen branded fallback shown while a lazy route is loading.
 * It deliberately reuses the loader classes defined inline in index.html so
 * the hand-off from the first-paint loader is completely seamless.
 *
 * The first-paint loader is a once-per-session moment. The inline head script
 * adds `md-loader-skip` on repeat loads, so this fallback stays out of the way
 * instead of replaying the intro animation.
 */
const skipInitialLoader =
  typeof document !== 'undefined' &&
  document.documentElement.classList.contains('md-loader-skip');

export function PageLoader() {
  if (skipInitialLoader) return null;

  return (
    <div
      className="md-loader md-loader--persistent"
      role="status"
      aria-live="polite"
      aria-label="Loading MetaDev"
    >
      <div className="md-loader__backdrop" aria-hidden="true" />
      <div className="md-loader__grid" aria-hidden="true" />
      <span className="md-loader__glow md-loader__glow--a" aria-hidden="true" />
      <span className="md-loader__glow md-loader__glow--b" aria-hidden="true" />

      <div className="md-loader__content">
        <div className="md-loader__sigil" aria-hidden="true">
          <span className="md-loader__halo" />
          <span className="md-loader__pulse" />
          <span className="md-loader__pulse md-loader__pulse--b" />
          <svg className="md-loader__svg" viewBox="0 0 240 240" fill="none">
            <defs>
              <linearGradient
                id="mdPageStroke"
                x1="44"
                y1="28"
                x2="196"
                y2="214"
                gradientUnits="userSpaceOnUse"
              >
                <stop style={{ stopColor: 'var(--md-loader-mark-a)' }} />
                <stop offset="0.55" style={{ stopColor: 'var(--md-loader-mark-b)' }} />
                <stop offset="1" style={{ stopColor: 'var(--md-loader-mark-c)' }} />
              </linearGradient>
              <linearGradient
                id="mdPageComet"
                x1="44"
                y1="28"
                x2="196"
                y2="214"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#fff" stopOpacity="0" />
                <stop offset="0.5" style={{ stopColor: 'var(--md-loader-mark-b)' }} />
                <stop offset="1" stopColor="#fff" />
              </linearGradient>
            </defs>

            <g className="md-loader__ring">
              <circle
                cx="120"
                cy="120"
                r="114"
                stroke="var(--md-loader-line)"
                strokeWidth="1"
                opacity="0.16"
              />
              <circle
                cx="120"
                cy="120"
                r="108"
                stroke="var(--md-loader-line)"
                strokeWidth="1"
                opacity="0.3"
                pathLength={100}
                strokeDasharray="0.35 2.15"
              />
              <circle className="md-loader__ring-dot" cx="120" cy="12" r="2.4" />
              <g className="md-loader__sat-b-wrap">
                <circle className="md-loader__sat-b" cx="220" cy="120" r="1.6" />
              </g>
            </g>

            <g className="md-loader__cross" strokeLinecap="round">
              <path d="M120 2v7" />
              <path d="M120 231v7" />
              <path d="M2 120h7" />
              <path d="M231 120h7" />
            </g>

            <path
              className="md-loader__track"
              d="M154 34 C126 21 91 23 70 43 C56 57 54 78 43 99 L31 120 L43 141 C54 162 56 183 70 197 C91 217 126 219 154 206"
            />
            <path
              className="md-loader__stroke"
              style={{ stroke: 'url(#mdPageStroke)' }}
              pathLength={1}
              d="M154 34 C126 21 91 23 70 43 C56 57 54 78 43 99 L31 120 L43 141 C54 162 56 183 70 197 C91 217 126 219 154 206"
            />
            <path
              className="md-loader__comet"
              style={{ stroke: 'url(#mdPageComet)' }}
              pathLength={100}
              d="M154 34 C126 21 91 23 70 43 C56 57 54 78 43 99 L31 120 L43 141 C54 162 56 183 70 197 C91 217 126 219 154 206"
            />

            <g className="md-loader__monogram" style={{ stroke: 'url(#mdPageStroke)' }}>
              <path className="md-loader__m" pathLength={1} d="M88 142 V99 L111 123 L134 99 V142" />
              <path
                className="md-loader__d"
                pathLength={1}
                d="M144 142 V99 H157 C177 99 177 142 157 142 H144"
              />
            </g>
          </svg>
        </div>

        <div className="md-loader__wordmark" aria-hidden="true">
          <span>Meta</span>Dev
        </div>
        <span className="md-loader__rule" aria-hidden="true" />
        <p className="md-loader__tagline" aria-hidden="true">
          Engineering what&apos;s next
        </p>
      </div>

      <div className="md-loader__meta" aria-hidden="true">
        <span>Digital engineering</span>
        <span className="md-loader__status">
          Loading
          <span className="md-loader__dots">
            <i />
            <i />
            <i />
          </span>
        </span>
      </div>
      <span className="md-loader__edge" aria-hidden="true" />
    </div>
  );
}
