"use client"
import Particles from "@tsparticles/react"
import type { ISourceOptions } from "@tsparticles/engine"

interface NetworkBackgroundProps {
  className?: string
  color?: string
  linesColor?: string
  interactive?: boolean
  density?: number
}

export function NetworkBackground({
  className = "",
  color = "#64ffda",
  linesColor = "#64ffda",
  interactive = true,
  density = 80,
}: NetworkBackgroundProps) {
  const options: ISourceOptions = {
    fullScreen: { enable: false },
    background: {
      color: { value: "transparent" },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: { enable: interactive, mode: "push" },
        onHover: { enable: interactive, mode: "repulse" },
     
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 150, duration: 0.4 },
      },
    },
    particles: {
      color: { value: color },
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
        outModes: { default: "bounce" },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
     
        value: density,
      },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  }

  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <Particles
        id={`tsparticles-${Math.random().toString(36).substring(7)}`}
        options={options}
      />
    </div>
  )
}
