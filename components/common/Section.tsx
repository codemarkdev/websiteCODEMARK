import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "none" | "sm" | "md" | "lg" | "xl"
  fullHeight?: boolean
  centered?: boolean
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing = "lg", fullHeight = false, centered = false, ...props }, ref) => {
    const spacingStyles = {
      none: "py-0",
      sm: "py-8",
      md: "py-16",
      lg: "py-24",
      xl: "py-32",
    }

    const heightStyles = fullHeight ? "min-h-screen" : ""

    const centeredStyles = centered ? "flex flex-col items-center justify-center" : ""

    return (
      <section ref={ref} className={cn(spacingStyles[spacing], heightStyles, centeredStyles, className)} {...props} />
    )
  },
)

Section.displayName = "Section"

export { Section }
