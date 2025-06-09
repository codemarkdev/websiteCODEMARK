import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveStackProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  direction?: {
    xs?: "row" | "column"
    sm?: "row" | "column"
    md?: "row" | "column"
    lg?: "row" | "column"
    xl?: "row" | "column"
  }
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl"
  align?: "start" | "center" | "end" | "stretch" | "baseline"
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
  wrap?: boolean
  className?: string
  children: React.ReactNode
}

export function ResponsiveStack({
  as: Component = "div",
  direction = { xs: "column", md: "row" },
  gap = "md",
  align = "start",
  justify = "start",
  wrap = false,
  className,
  children,
  ...props
}: ResponsiveStackProps) {
  // Construir clases de dirección
  const directionClasses = [
    direction.xs && (direction.xs === "row" ? "flex-row" : "flex-col"),
    direction.sm && (direction.sm === "row" ? "sm:flex-row" : "sm:flex-col"),
    direction.md && (direction.md === "row" ? "md:flex-row" : "md:flex-col"),
    direction.lg && (direction.lg === "row" ? "lg:flex-row" : "lg:flex-col"),
    direction.xl && (direction.xl === "row" ? "xl:flex-row" : "xl:flex-col"),
  ].filter(Boolean)

  // Clases de gap
  const gapClasses = {
    none: "gap-0",
    xs: "gap-2",
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-12",
  }

  // Clases de alineación
  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
    baseline: "items-baseline",
  }

  // Clases de justificación
  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  }

  return (
    <Component
      className={cn(
        "flex",
        directionClasses,
        gapClasses[gap],
        alignClasses[align],
        justifyClasses[justify],
        wrap && "flex-wrap",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
