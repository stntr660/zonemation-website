import Script from 'next/script'

// Google Analytics 4, property "Zonemation (zonemation.com)".
// The Measurement ID is public (it ships in every page), not a secret.
// Override with NEXT_PUBLIC_GA4_ID at build time if the property changes.
const DEFAULT_GA4_ID = 'G-G8SZ4GVGXF'

export function GoogleAnalytics() {
  // Only in production builds: no hits from `next dev` or local tests.
  if (process.env.NODE_ENV !== 'production') return null

  const gaId = process.env.NEXT_PUBLIC_GA4_ID || DEFAULT_GA4_ID
  // Guard against a malformed env value being injected into inline JS.
  if (!/^G-[A-Z0-9]+$/.test(gaId)) return null

  // App Router client navigations use the History API; GA4 enhanced
  // measurement ("page changes based on browser history events", on by
  // default) sends a page_view for each of them.
  return (
    <>
      <Script
        id="ga4-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
      </Script>
    </>
  )
}
