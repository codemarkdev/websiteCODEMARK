"use client"
import { useRef, useLayoutEffect, useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { motion, useMotionValue, useAnimationFrame, useReducedMotion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ResponsiveContainer } from "@/components/ui/responsive-container"
import { ResponsiveText } from "@/components/ui/responsive-text"
import { NetworkBackground } from "@/components/ui/backgrounds/network-background"
import { useTheme } from "@/app/theme-provider"
import { clientLogos } from "./data/data"

export default function Clients() {
  const { theme } = useTheme()
  const prefersReducedMotion = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const [loopWidth, setLoopWidth] = useState(0)

  // Velocidad del carrusel (px/s)
  const SPEED = 40

  // Tamaños de las tarjetas (logos)
  const cardWidth = "clamp(160px, 24vw, 320px)"
  const cardHeight = "clamp(72px, 10vw, 140px)"

  // Datos (una sola tanda); duplicamos visualmente con otro bloque
  const items = useMemo(() => clientLogos, [])
  const x = useMotionValue(0)
  const [paused, setPaused] = useState(false)

  // Medir ancho de UNA tanda (trackRef)
  useLayoutEffect(() => {
    const el = trackRef.current
    if (!el) return
    const measure = () => setLoopWidth(el.scrollWidth)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Animación continua sin “saltos”
  useAnimationFrame((_, deltaMs) => {
    if (prefersReducedMotion || paused || !loopWidth) return
    const deltaPx = (SPEED * deltaMs) / 1000
    let next = x.get() - deltaPx
    if (next <= -loopWidth) next += loopWidth
    x.set(next)
  })

  // Pausar si la pestaña no está visible
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden)
    document.addEventListener("visibilitychange", onVisibility)
    return () => document.removeEventListener("visibilitychange", onVisibility)
  }, [])

  return (
    <section
      className="relative min-h-[50vh] flex items-center bg-background text-foreground overflow-hidden py-16 md:py-24 lg:py-32"
      id="clients"
      aria-labelledby="clients-heading"
    >
      {/* Background detrás y sin capturar eventos (clave para que el botón reciba clicks) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <NetworkBackground color={theme === "dark" ? "#64ffda" : "#0891b2"} density={30} />
      </div>

      {/* Contenido sobre el background */}
      <ResponsiveContainer maxWidth="2xl" paddingX="lg">
        <div className="relative z-10">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <ResponsiveText as="h2" id="clients-heading" size="5xl" weight="bold" color="primary" className="mb-4">
              Nuestros Clientes
            </ResponsiveText>
            <ResponsiveText as="p" size="xl" color="muted" className="max-w-3xl mx-auto">
              Confían en nosotros para impulsar su éxito digital
            </ResponsiveText>
          </div>

          {/* Carrusel infinito */}
          <div
            className="relative w-full overflow-hidden py-8 md:py-12 bg-card/50 backdrop-blur-md rounded-3xl border border-border shadow-lg"
            aria-label="Carrusel continuo de logotipos de clientes"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <motion.div
              className="flex items-center gap-10 md:gap-16 lg:gap-24 px-4 will-change-transform"
              style={{ x }}
              aria-live="off"
            >
              {/* Tanda A (referencia para medir) */}
              <div ref={trackRef} className="flex items-center gap-10 md:gap-16 lg:gap-24">
                {items.map((client, index) => (
                  <div
                    key={`${client?.name ?? "client"}-${index}`}
                    className="flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-300"
                    role="listitem"
                    aria-label={client?.name ?? "Cliente"}
                  >
                    <div className="relative" style={{ width: cardWidth, height: cardHeight }}>
                      <Image
                        src={client.logo || "/placeholder.svg"}
                        alt={client.name}
                        fill
                        className="object-contain"
                        loading="lazy"
                        sizes="(max-width: 640px) 60vw, (max-width: 1024px) 36vw, 24vw"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Tanda B (clon contiguo) */}
              <div className="flex items-center gap-10 md:gap-16 lg:gap-24" aria-hidden>
                {items.map((client, index) => (
                  <div key={`clone-${client?.name ?? "client"}-${index}`} className="flex-shrink-0 opacity-80">
                    <div className="relative" style={{ width: cardWidth, height: cardHeight }}>
                      <Image
                        src={client.logo || "/placeholder.svg"}
                        alt=""
                        fill
                        className="object-contain"
                        loading="lazy"
                        sizes="(max-width: 640px) 60vw, (max-width: 1024px) 36vw, 24vw"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Fades laterales, ya sin capturar eventos */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          </div>

          {/* Botón "Ver más" */}
          <div className="mt-8 md:mt-10 flex justify-center z-20">
            {/* Si exportas estático con trailingSlash:true, puedes usar href="/clientes/" */}
            <Link href="/clientes" aria-label="Ver todos los clientes y detalles" className="inline-block">
              <Button size="lg" className="rounded-2xl px-8">
                Ver más
              </Button>
            </Link>
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  )
}
