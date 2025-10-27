// lib/seo.ts
import type { Metadata } from "next"

export const SITE_URL = "https://codemark.es" // ← cámbialo

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CodeMark",
    template: "%s | CodeMark",
  },
  description: "Transformando ideas en resultados",
  applicationName: "CodeMark",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "CodeMark",
    title: "CodeMark",
    description: "Transformando ideas en resultados",
    locale: "es_SV",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@tucuenta", // opcional
  },
}

type BuildOpts = {
  title?: string
  description?: string
  path?: string // ej: "/servicios/desarrollo-web"
}

export function buildMetadata(opts: BuildOpts = {}): Metadata {
  const url = opts.path?.startsWith("/") ? opts.path : `/${opts.path ?? ""}`
  return {
    ...defaultMetadata,
    title: opts.title ? { default: opts.title, template: `%s | CodeMark` } : defaultMetadata.title,
    description: opts.description ?? defaultMetadata.description,
    alternates: { canonical: url },
    openGraph: {
      ...defaultMetadata.openGraph,
      url: `${SITE_URL}${url}`,
      title: opts.title ?? (defaultMetadata.openGraph as any)?.title,
      description: opts.description ?? (defaultMetadata.openGraph as any)?.description,
    },
  }
}
