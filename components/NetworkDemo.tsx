"use client"
import { useState } from "react"
import NetworkBackground from "./NetworkBackground"

export default function NetworkDemo() {
  const [color, setColor] = useState("#64ffda")
  const [density, setDensity] = useState(80)
  const [interactive, setInteractive] = useState(true)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <NetworkBackground color={color} density={density} interactive={interactive} />

      <div className="relative z-10 max-w-md p-6 bg-background/80 backdrop-blur-md rounded-xl border border-border">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Interactive Network Visualization</h2>
        <p className="mb-6 text-muted-foreground">
          This component creates an interactive network of nodes and connections that respond to your mouse movements.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">Density</label>
            <input
              type="range"
              min="20"
              max="150"
              value={density}
              onChange={(e) => setDensity(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground mt-1">Value: {density}</div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="interactive"
              checked={interactive}
              onChange={(e) => setInteractive(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="interactive" className="text-sm text-foreground">
              Interactive (responds to mouse)
            </label>
          </div>
        </div>
      </div>
    </section>
  )
}
