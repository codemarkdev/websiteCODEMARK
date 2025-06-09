"use client"
import { useRef, useLayoutEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ResponsiveContainer } from "@/components/ui/responsive-container"
import { ResponsiveText } from "@/components/ui/responsive-text"
import { NetworkBackground } from "@/components/ui/backgrounds/network-background"
import { useTheme } from "@/app/theme-provider"
import { useIsMobile, useIsTablet } from "@/hooks/useBreakpoint"
import { clientLogos } from "./data"

export default function Clients() {
  const { theme } = useTheme()
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  const duplicatedLogos = [...clientLogos, ...clientLogos]

  useLayoutEffect(() => {
    if (containerRef.current) {
      const totalWidth = containerRef.current.scrollWidth
      const visibleWidth = containerRef.current.clientWidth
      setContainerWidth(totalWidth / 2 || visibleWidth)
    }
  }, [])

  const scrollSpeed = 40 // px/s — más bajo = más fluido
  const duration = containerWidth > 0 ? containerWidth / scrollSpeed : 30

  const marqueeVariants = {
    animate: {
      x: -containerWidth,
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: duration,
          ease: "linear",
        },
      },
    },
  }

  return (
    <section
      className="relative min-h-[50vh] flex items-center bg-background text-foreground overflow-hidden py-16 md:py-24 lg:py-32"
      id="clients"
    >
      <NetworkBackground color={theme === "dark" ? "#64ffda" : "#0891b2"} density={30} />

      <ResponsiveContainer maxWidth="2xl" paddingX="lg">
        <motion.div
          className="text-center mb-8 md:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <ResponsiveText as="h2" size="5xl" weight="bold" color="primary" className="mb-4">
            Nuestros Clientes
          </ResponsiveText>
          <ResponsiveText as="p" size="xl" color="muted" className="max-w-3xl mx-auto">
            Confían en nosotros para impulsar su éxito digital
          </ResponsiveText>
        </motion.div>

        <div className="relative w-full overflow-hidden py-8 md:py-12 bg-card/50 backdrop-blur-md rounded-3xl border border-border shadow-lg">
          <motion.div
            ref={containerRef}
            className="flex items-center gap-12 md:gap-24 lg:gap-32 px-4 will-change-transform"
            variants={marqueeVariants}
            animate="animate"
          >
            {duplicatedLogos.map((client, index) => (
              <div key={index} className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-300">
                <Image
                  src={client.logo || "/placeholder.svg"}
                  alt={client.name}
                  width={isMobile ? 100 : isTablet ? 120 : 150}
                  height={isMobile ? 50 : isTablet ? 60 : 75}
                  className="object-contain h-auto max-w-[150px]"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>

          {/* Fades laterales */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      </ResponsiveContainer>
    </section>
  )
}
