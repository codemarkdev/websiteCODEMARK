"use client"
import Particles from "@tsparticles/react"
import type { ISourceOptions } from "@tsparticles/engine"

export default function ParticleBackground() {
  // Puedes definir tus opciones afuera o aquí mismo:
  const options: ISourceOptions = {
    fullScreen: { enable: false },
    background: {
      color: { value: "transparent" },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "repulse" },
       
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 200, duration: 0.4 },
      },
    },
    particles: {
      color: { value: "#64ffda" },
      links: {
        color: "#64ffda",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: { enable: true },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        
        value: 80,
      },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 5 } },
    },
    detectRetina: true,
  }

  return (
    <div>
      <Particles id="tsparticles" options={options} />
    </div>
  )
}
