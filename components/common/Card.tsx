import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "elevated"
  padding?: "none" | "sm" | "md" | "lg"
  isHoverable?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "md", isHoverable = false, ...props }, ref) => {
    const variantStyles = {
      default: "bg-card text-card-foreground",
      bordered: "bg-card text-card-foreground border border-border",
      elevated: "bg-card text-card-foreground shadow-lg",
    }

    const paddingStyles = {
      none: "p-0",
      sm: "p-3",
      md: "p-6",
      lg: "p-8",
    }

    const hoverStyles = isHoverable ? "transition-all duration-300 hover:shadow-md hover:-translate-y-1" : ""

    return (
      <div
        ref={ref}
        className={cn("rounded-lg", variantStyles[variant], paddingStyles[padding], hoverStyles, className)}
        {...props}
      />
    )
  },
)

Card.displayName = "Card"

export { Card }
