import type React from "react"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  bordered?: boolean
  elevated?: boolean
}

export function Card({
  children,
  className,
  hoverable = false,
  bordered = true,
  elevated = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground rounded-lg p-6",
        bordered && "border border-border",
        elevated && "shadow-lg",
        hoverable && "card-hover",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardTitle({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-xl font-semibold mb-2", className)} {...props}>
      {children}
    </h3>
  )
}

export function CardContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  )
}
