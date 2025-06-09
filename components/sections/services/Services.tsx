"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { services } from "./data"
import { ServiceCard } from "./components/ServiceCard"
import { useMediaQuery } from "@/hooks/media/useMediaQuery"
import { cn } from "@/lib/utils"
import styles from "./Services.module.css"
import { NetworkBackground } from "@/components/ui/backgrounds"

export function Services({ className }: { className?: string }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const isMobile = useMediaQuery("(max-width: 767px)")

  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % services.length)
      }, 5000)
    }
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay])

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + services.length) % services.length)
    setAutoplay(false)
  }

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % services.length)
    setAutoplay(false)
  }

  const handleDotClick = (index: number) => {
    setActiveSlide(index)
    setAutoplay(false)
  }

  return (
    <section className={cn(styles.services, className)} id="services">
      <NetworkBackground color="#6366f1" density={60} />
      <div className={styles.services__container}>
        <h2 className={styles.services__title}>Nuestros Servicios</h2>
        {isMobile ? (
          <div className={styles.services__slider}>
            <div className={styles.slider__controls}>
              <button onClick={handlePrev} className={styles.slider__arrow} aria-label="Anterior">
                <ChevronLeft />
              </button>
              <button onClick={handleNext} className={styles.slider__arrow} aria-label="Siguiente">
                <ChevronRight />
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className={styles.service__slide}
              >
                <ServiceCard
                  service={services[activeSlide]}
                  index={activeSlide}
                  activeSlide={activeSlide}
                />
              </motion.div>
            </AnimatePresence>

            <div className={styles.dots}>
              {services.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${index === activeSlide ? styles.activeDot : ""}`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Ver servicio ${services[index].title}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.services__grid}>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                index={index}
                activeSlide={activeSlide}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
