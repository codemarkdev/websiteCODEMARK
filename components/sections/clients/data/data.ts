import type { ClientItem } from "./types"

/**
 * Tipo mínimo que quieres usar siempre (name + logo).
 * Puedes añadir slug si quieres controlar la clave.
 */
type BasicClient = {
  name: string
  logo: string
  slug?: string
}

/**
 * 1) Lista mínima (tu formato actual).
 *    ✅ Úsala tal cual hoy.
 */
const basicClients: BasicClient[] = [
  { name: "herrerasshipping",    logo: "/images/clients/1.svg" },
  { name: "sumachomeremodeling", logo: "/images/clients/2.svg" },
  { name: "Zona Digital",        logo: "/images/clients/6.png" },
  { name: "Mr.H Coffee",         logo: "/images/clients/3.svg" },
  { name: "Tortisal",            logo: "/images/clients/4.svg" },
  { name: "Salvalex",            logo: "/images/clients/5.svg" },
 
]

/**
 * 2) Detalles opcionales por cliente.
 *    La clave es el slug (normalizado del nombre) para fusionar.
 *    Agrega aquí SOLO a los que quieras enriquecer.
 */
const detailsBySlug: Partial<Record<string, Omit<ClientItem, "name" | "logo">>> = {
  // ejemplo: enriquecemos algunos
  herrerasshipping: {
    cover: "/clients/herrera/cover.jpg",
    // photos: ["/clients/herrera/1.jpg", "/clients/herrera/2.jpg"],
    url: "https://herrerasshipping.com/",
    description: "Operador logístico internacional. Rediseñamos su web, optimizamos performance (Core Web Vitals).",
    tags: ["Next.js", "Tailwind", ],
    industry: "Logística",
    country: "USA",
    year: 2025,
    services: ["UX/UI", "Desarrollo Web", "Integraciones"],
  },

  sumachomeremodeling: {
    cover: "/clients/sumac/cover.jpg",
    // photos: ["/clients/sumac/1.jpg"],
    url: "https://sumachomeremodeling.com/",
    description:
      "Empresa de remodelaciones. Landing orientada a leads con formularios dinámicos y automatización de contacto.",
   tags: ["Next.js", "Tailwind", ],
    industry: "Construcción",
    country: "USA",
    year: 2025,
    services: ["Landing", "Automatización", "SEO Técnico"],
  },

  "zona-digital": {
    cover: "/images/clients/zonadigital/1.png",
    photos: ["/images/clients/zonadigital/2.jpeg", "/images/clients/zonadigital/3.jpeg"],
    url: "https://zonadigitalsv.com/",
    description:
      "E-commerce con checkout multi-paso, inventario y pasarelas de pago y mejoras de optimización y seguridad.",
    tags: ["E-commerce", "Checkout"],
    industry: "Retail",
    country: "SV",
    year: 2025,
    services: ["E-commerce", "Optimización de Conversión"],
  },

  // puedes seguir enriqueciendo:
   "mr-h-coffee": { 
  cover: "/images/clients/3.svg",
    // photos: ["/images/clients/zonadigital/2.jpeg", "/images/clients/zonadigital/3.jpeg"],
    url: "https://mrhcoffee.shop/",
    description:
      "website de la marca.",
     tags: ["Next.js", "Tailwind", ],
    industry: "Retail",
    country: "USA",
    year: 2025,
    services: ["E-commerce", "Optimización de Conversión"],

    },
  // tortisal: { ... },
  // salvalex: { ... },
}

/** Utilidad: normaliza a slug predecible (coincide con claves del mapa). */
function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita tildes
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

/**
 * 3) Fusión: convierte la lista mínima en ClientItem[]
 *    inyectando detalles si existen para ese slug.
 */
export const clientLogos: ClientItem[] = basicClients.map((b) => {
  const key = b.slug ?? slugify(b.name)
  const extra = detailsBySlug[key] ?? detailsBySlug[b.name] ?? {}
  return { ...b, ...extra }
})

/**
 * 4) Helpers opcionales (útiles si navegas por slug en rutas dinámicas).
 */
export function getClientBySlug(slug: string): ClientItem | undefined {
  const map = new Map(clientLogos.map((c) => [slugify(c.slug ?? c.name), c]))
  return map.get(slug)
}

export function listBasicClients(): BasicClient[] {
  return basicClients
}
