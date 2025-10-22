"use client"

import Image from "next/image"
import { useState } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ClientItem } from "../data/types"
import { ClientDialog } from "./ClientDialog"

// Placeholder SVG inline (no depende de /public)
const FALLBACK_SVG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'>
      <rect width='100%' height='100%' rx='24' fill='#0b1520'/>
      <g fill='none' stroke='#36d7b7' stroke-width='14'>
        <circle cx='256' cy='256' r='110'/>
        <path d='M166 256h180M256 166v180'/>
      </g>
    </svg>`
  )

export function ClientCard({ client }: { client: ClientItem }) {
  // SIEMPRE usar el logo en el grid
  const [src, setSrc] = useState(client.logo || FALLBACK_SVG)
  const alt = client.name ? `Logo de ${client.name}` : "Logo de cliente"

  return (
    <ClientDialog client={client}>
      <button
        className="group w-full text-left focus:outline-none rounded-3xl transition focus-visible:ring-2 focus-visible:ring-primary/50"
        aria-label={`Ver detalles de ${client.name}`}
      >
        <Card
          role="listitem"
          className="
            relative overflow-hidden rounded-3xl
            border border-border/60 bg-card/65 backdrop-blur-sm
            shadow-sm transition hover:shadow-xl hover:border-border
            h-[320px] md:h-[380px] lg:h-[440px] xl:h-[500px] 2xl:h-[560px]
            flex flex-col
          "
        >
          {/* Logo grande */}
          <div className="relative w-full h-[54%] md:h-[58%] lg:h-[60%] xl:h-[62%]">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain p-3 md:p-5 lg:p-7 xl:p-8 transition-transform duration-300 group-hover:scale-[1.035]"
              sizes="(max-width:480px) 90vw, (max-width:768px) 45vw, (max-width:1280px) 24vw, (max-width:1536px) 20vw, 18vw"
              loading="lazy"
              // fallback robusto (evita bucles)
              onError={() => {
                if (src !== FALLBACK_SVG) setSrc(FALLBACK_SVG)
              }}
            />
          </div>

          <CardContent className="flex-1 p-4 md:p-5 lg:p-6 flex flex-col">
            {/* Título centrado, 2 líneas máx, sin recortes feos */}
            <div className="min-h-[3.2em] flex items-start justify-center text-center">
              <CardTitle
                className="
                  font-semibold leading-snug
                  text-[clamp(1rem,1.15vw,1.25rem)]
                  whitespace-normal break-words [word-break:break-word] text-balance
                  line-clamp-2
                  w-full
                "
                title={client.name}
              >
                {client.name}
              </CardTitle>
            </div>

            {/* Tags opcionales */}
            {client.tags?.length ? (
              <div className="mt-2 flex flex-wrap justify-center gap-2 max-h-20 overflow-hidden">
                {client.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="rounded-full text-[11px] md:text-xs">
                    {t}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="mt-2" />
            )}

            {/* CTA abajo */}
            <div className="mt-auto pt-2 text-center">
              <span className="text-primary underline underline-offset-4 text-[clamp(0.9rem,1.05vw,1rem)]">
                Ver detalles
              </span>
            </div>
          </CardContent>
        </Card>
      </button>
    </ClientDialog>
  )
}
