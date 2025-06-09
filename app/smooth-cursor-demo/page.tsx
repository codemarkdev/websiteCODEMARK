"use client"

import { SmoothCursor } from "@/registry/magicui/smooth-cursor" // Updated import path
import { ResponsiveText } from "@/components/ui/responsive-text"
import { ResponsiveContainer } from "@/components/ui/responsive-container"

export default function SmoothCursorDemo() {
  // Changed to default export as per user's provided code
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-background text-foreground overflow-hidden p-8">
      <ResponsiveContainer maxWidth="md" className="text-center z-10">
        <ResponsiveText as="h1" size="4xl" weight="bold" className="mb-4">
          Smooth Cursor Demo
        </ResponsiveText>
        <ResponsiveText as="p" size="lg" color="muted" className="mb-8">
          <span className="hidden md:block">Move your mouse around</span>
          <span className="block md:hidden">Tap anywhere to see the cursor</span>
        </ResponsiveText>
      </ResponsiveContainer>
      <SmoothCursor />
    </div>
  )
}
