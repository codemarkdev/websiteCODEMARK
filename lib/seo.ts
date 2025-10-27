// lib/seo.ts
import type { Metadata } from "next"

export const SITE_URL = "https://codemark.es"      
export const BRAND = "CodeMark"

export const DEFAULT_TITLE = BRAND
export const DEFAULT_DESC =
  "Desarrollo web, eCommerce y ciberseguridad en El Salvador. Sitios rápidos, seguros y listos para SEO."

// --- PALABRAS CLAVE (globales) ---
const KEYWORDS: string[] = [
  // Core
  "desarrollo web el salvador",
  "diseño de páginas web el salvador",
  "agencia de desarrollo web",
  "crear sitio web profesional",
  "empresa de páginas web",
  "mantenimiento web mensual",
  "soporte web",

  // eCommerce
  "tienda online el salvador",
  "ecommerce el salvador",
  "desarrollo ecommerce shopify",
  "desarrollo ecommerce woocommerce",
  "desarrollo ecommerce a medida",
  "pasarela de pago el salvador",
  "diseño de tienda virtual",
  "integraciones ecommerce paypal",
  "integraciones ecommerce visa",
  "integraciones ecommerce mastercard",

  // Ciberseguridad / Pentesting
  "ciberseguridad el salvador",
  "pentesting el salvador",
  "auditoría de seguridad web",
  "test de penetración aplicaciones web",
  "análisis de vulnerabilidades sitio web",
  "hardening de servidores web",
  "respuesta a incidentes",

  // Tecnologías
  "desarrollo web react el salvador",
  "desarrollo web next.js el salvador",
  "páginas web con next.js",
  "desarrollo frontend react",
  "node.js backend el salvador",
  "sitios rápidos core web vitals",

  // Landing / Micrositios
  "landing page el salvador",
  "landing page económica",
  "páginas de aterrizaje para campañas",
  "diseño de landing para anuncios",

  // SEO técnico
  "seo técnico el salvador",
  "optimización web velocidad",
  "schema markup",
  "rich results",
  "auditoría seo técnica",

  // Local (San Miguel + duplicables a otras ciudades si aplican)
  "desarrollo web san miguel",
  "diseño de páginas web san miguel",
  "ecommerce san miguel",
  "ciberseguridad san miguel",
  "pentesting san miguel",

  // Long-tail
  "cuánto cuesta una página web en el salvador",
  "precio tienda online el salvador",
  "empresa que haga páginas web en san miguel",
  "auditoría de seguridad web precio",
  "mejorar velocidad sitio web lighthouse",
  "migrar wordpress a hosting el salvador",
  "integrar paypal tienda online el salvador",
  "prueba de penetración para ecommerce",

  // B2B / Decisor
  "desarrollo web para pymes el salvador",
  "modernización de sitio web corporativo",
  "mantenimiento web para empresas",
  "consultoría de ciberseguridad pymes",

  // Problema / solución
  "sitio web lento cómo acelerar",
  "web hackeada qué hacer",
  "error core web vitals solución",
  "por qué mi tienda no convierte",
  "cómo aceptar pagos en línea el salvador",

  // Navegacionales de marca
  "codemark desarrollo web",
  "codemark ciberseguridad",
  "codemark ecommerce",
]

// --- DEFAULTS + HELPER ---
export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${BRAND}`,
  },
  description: DEFAULT_DESC,
  applicationName: BRAND,
  // Nota: Google ya no usa <meta name="keywords"> para ranking,
  // pero Next permite mantenerlas como referencia/consistencia.
  keywords: KEYWORDS,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: BRAND,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    locale: "es_SV",
  },
  twitter: {
    card: "summary_large_image",
  },
}

type BuildOpts = {
  title?: string
  description?: string
  path?: string       // ej: "/servicios/desarrollo-web"
  ogImage?: string
}

export function buildMetadata(opts: BuildOpts = {}): Metadata {
  const url = opts.path?.startsWith("/") ? opts.path : `/${opts.path ?? ""}`

  return {
    ...defaultMetadata,
    title: opts.title
      ? { default: opts.title, template: `%s | ${BRAND}` }
      : defaultMetadata.title,
    description: opts.description ?? defaultMetadata.description,
    alternates: { canonical: url },
    openGraph: {
      ...defaultMetadata.openGraph,
      url: `${SITE_URL}${url}`,
      title: opts.title ?? (defaultMetadata.openGraph as any)?.title,
      description: opts.description ?? (defaultMetadata.openGraph as any)?.description,
      images: opts.ogImage
        ? [{ url: opts.ogImage, width: 1200, height: 630, alt: `${opts.title ?? BRAND} — OG` }]
        : undefined,
    },
  }
}
