"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface WordRotateProps {
  words: string[]
  className?: string
  interval?: number
  animation?: "fade" | "slide"
}

export function WordRotate({ words = ["Word"], className, interval = 2000, animation = "slide" }: WordRotateProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isAnimating, setIsAnimating] = React.useState(false)

  React.useEffect(() => {
    if (words.length <= 1) return

    const timer = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
        setIsAnimating(false)
      }, 300) // Reduced transition time
    }, interval)

    return () => clearInterval(timer)
  }, [words.length, interval])

  // Find the longest word to reserve space
  const longestWord = React.useMemo(() => {
    return words.reduce((longest, current) => (current.length > longest.length ? current : longest), words[0])
  }, [words])

  return (
    <span className={cn("relative inline-block", className)}>
      {/* Invisible text to reserve space */}
      <span className="invisible" aria-hidden="true">
        {longestWord}
      </span>

      {/* Animated text */}
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-start transition-all duration-300",
          animation === "fade" && isAnimating ? "opacity-0" : "opacity-100",
          animation === "slide" && isAnimating ? "-translate-y-4 opacity-0" : "translate-y-0 opacity-100",
        )}
      >
        {words[currentIndex]}
      </span>
    </span>
  )
}
