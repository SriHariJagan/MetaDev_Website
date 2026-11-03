/**
 * Full-screen branded fallback shown while a lazy route is loading.
 * It deliberately reuses the classes defined inline in index.html so the
 * hand-off from the first-paint loader is completely seamless.
 */
export function PageLoader() {
  return (
    <div
      className="md-loader md-loader--persistent"
      role="status"
      aria-live="polite"
      aria-label="Loading MetaDev"
    >
      <div className="md-loader__content">
        <div className="md-loader__mark" aria-hidden="true">
          <span className="md-loader__halo" />
          <span className="md-loader__arc" />
          <svg className="md-loader__glyph" viewBox="0 0 48 48" fill="none">
            <path
              d="M12 33V15l12 12 12-12v18"
              stroke="url(#md-page-loader-gradient)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient
                id="md-page-loader-gradient"
                x1="10"
                y1="12"
                x2="38"
                y2="35"
                gradientUnits="userSpaceOnUse"
              >
                <stop style={{ stopColor: 'var(--md-loader-mark-a)' }} />
                <stop offset="1" style={{ stopColor: 'var(--md-loader-mark-b)' }} />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="md-loader__wordmark" aria-hidden="true">
          <span>Meta</span>Dev
        </div>
        <div className="md-loader__track" aria-hidden="true">
          <span />
        </div>
        <p className="md-loader__caption" aria-hidden="true">
          Engineering what&apos;s next
        </p>
      </div>
    </div>
  );
}
