import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  cols?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
  children: React.ReactNode
}

export function ResponsiveGrid({
  as: Component = "div",
  cols = { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 },
  gap = "md",
  className,
  children,
  ...props
}: ResponsiveGridProps) {
  // Construir clases de columnas
  const colClasses = [
    cols.xs && `grid-cols-${cols.xs}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
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

  return (
    <Component className={cn("grid", colClasses, gapClasses[gap], className)} {...props}>
      {children}
    </Component>
  )
}
