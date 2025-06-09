"use client"
import { useCallback } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import type { Engine } from "tsparticles-engine"
import type { ISourceOptions } from "tsparticles-engine"
import { cn } from "@/lib/utils"

interface NetworkBackgroundProps {
  className?: string
  color?: string
  linesColor?: string
  interactive?: boolean
  density?: number
  id?: string // <--- AHORA PUEDES PASAR UN ID FIJO POR PROP
}

export function NetworkBackground({
  className,
  color = "#64ffda",
  linesColor = "#64ffda",
  interactive = true,
  density = 80,
  id = "tsparticles-main" // <--- VALOR POR DEFECTO FIJO, cámbialo por sección si tienes varias
}: NetworkBackgroundProps) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const options: ISourceOptions = {
    fullScreen: { enable: false },
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: interactive,
          mode: "push",
        },
        onHover: {
          enable: interactive,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 150,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: color,
      },
      links: {
        color: linesColor,
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: density,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  }

  return (
    <div className={cn("absolute inset-0 z-0", className)}>
      <Particles id={id} init={particlesInit} options={options} />
    </div>
  )
}
