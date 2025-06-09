import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full"
  padding?: "none" | "sm" | "md" | "lg"
  centered?: boolean
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "lg", padding = "md", centered = true, ...props }, ref) => {
    const sizeStyles = {
      sm: "max-w-3xl",
      md: "max-w-4xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-full",
    }

    const paddingStyles = {
      none: "px-0",
      sm: "px-4",
      md: "px-6",
      lg: "px-8",
    }

    const centeredStyles = centered ? "mx-auto" : ""

    return (
      <div
        ref={ref}
        className={cn("w-full", sizeStyles[size], paddingStyles[padding], centeredStyles, className)}
        {...props}
      />
    )
  },
)

Container.displayName = "Container"

export { Container }
