export const GA4_MEASUREMENT_ID = "G-V0MPCYVGG7"

type Gtag = (
  command: "event",
  eventName: "page_view",
  parameters: {
    send_to: string
    page_path: string
    page_location: string
    page_title: string
  },
) => void

declare global {
  interface Window {
    gtag?: Gtag
  }
}

export function createPageViewTracker(initialPagePath: string) {
  let lastTrackedPagePath = initialPagePath

  return (
    pagePath: string,
    pageLocation: string,
    pageTitle: string,
    gtag: Gtag | undefined,
  ) => {
    if (pagePath === lastTrackedPagePath) return false

    lastTrackedPagePath = pagePath
    gtag?.("event", "page_view", {
      send_to: GA4_MEASUREMENT_ID,
      page_path: pagePath,
      page_location: pageLocation,
      page_title: pageTitle,
    })
    return true
  }
}

const initialPagePath =
  typeof window === "undefined"
    ? ""
    : `${window.location.pathname}${window.location.search}`

const trackPageView = createPageViewTracker(initialPagePath)

export function trackClientPageView(pagePath: string) {
  return trackPageView(
    pagePath,
    window.location.href,
    document.title,
    window.gtag,
  )
}
