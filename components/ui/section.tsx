import type React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string
  fullHeight?: boolean
  centered?: boolean
  as?: "section" | "div" | "article"
  containerClassName?: string
}

export function Section({
  id,
  children,
  className,
  fullHeight = true,
  centered = true,
  as = "section",
  containerClassName,
  ...props
}: SectionProps) {
  const Component = as

  return (
    <Component
      id={id}
      className={cn(
        "relative overflow-hidden",
        fullHeight ? "min-h-screen" : "py-16",
        centered ? "flex items-center" : "",
        className,
      )}
      {...props}
    >
      <div className={cn("section-content", containerClassName)}>{children}</div>
    </Component>
  )
}

export function SectionTitle({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("section-title text-primary", className)} {...props}>
      {children}
    </h2>
  )
}

export function SectionSubtitle({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("section-subtitle text-muted-foreground", className)} {...props}>
      {children}
    </p>
  )
}
