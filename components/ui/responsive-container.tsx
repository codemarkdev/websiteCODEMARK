import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "prose" | "none"
  paddingX?: "none" | "sm" | "md" | "lg" | "xl"
  paddingY?: "none" | "sm" | "md" | "lg" | "xl"
  centered?: boolean
  fluid?: boolean
  className?: string
  children: React.ReactNode
}

export function ResponsiveContainer({
  as: Component = "div",
  maxWidth = "xl",
  paddingX = "md",
  paddingY = "none",
  centered = true,
  fluid = false,
  className,
  children,
  ...props
}: ResponsiveContainerProps) {
  const maxWidthClasses = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-7xl",
    full: "max-w-full",
    prose: "max-w-prose",
    none: "",
  }

  const paddingXClasses = {
    none: "px-0",
    sm: "px-4",
    md: "px-6 sm:px-8",
    lg: "px-6 sm:px-8 lg:px-12",
    xl: "px-6 sm:px-10 lg:px-16",
  }

  const paddingYClasses = {
    none: "py-0",
    sm: "py-4",
    md: "py-6 sm:py-8",
    lg: "py-8 sm:py-12 lg:py-16",
    xl: "py-12 sm:py-16 lg:py-24",
  }

  return (
    <Component
      className={cn(
        "w-full",
        fluid ? "max-w-full" : maxWidthClasses[maxWidth],
        paddingXClasses[paddingX],
        paddingYClasses[paddingY],
        centered && "mx-auto",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
