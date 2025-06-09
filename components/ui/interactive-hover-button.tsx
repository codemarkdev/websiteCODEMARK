"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface InteractiveHoverButtonProps {
  children?: React.ReactNode
  className?: string
  as?: React.ElementType
  href?: string
}

export const InteractiveHoverButton = React.forwardRef<HTMLButtonElement, InteractiveHoverButtonProps>(
  ({ children, className, as = "button", href, ...props }, ref) => {
    const Component = as as any
    const buttonProps = {
      ref,
      className: cn(
        "group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-background px-6 font-medium text-foreground transition-colors hover:text-white",
        className,
      ),
      ...(as === "a" && href ? { href } : {}),
      ...props,
    }

    return (
      <Component {...buttonProps}>
        {/* Texto que se desliza */}
        <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-4 group-hover:opacity-0">
          {children}
        </span>

        {/* Texto que aparece */}
        <span className="absolute z-10 -translate-x-8 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          {children}
        </span>

        {/* Círculo que se expande */}
        <span className="absolute left-0 top-0 h-full w-full">
          <span className="absolute left-0 top-0 h-full w-full opacity-0 group-hover:opacity-100">
            <span className="absolute left-[20%] top-[30%] h-3 w-3 rounded-full bg-primary transition-all duration-500 group-hover:h-full group-hover:w-full group-hover:left-0 group-hover:top-0 group-hover:rounded-full"></span>
          </span>
        </span>
      </Component>
    )
  },
)

InteractiveHoverButton.displayName = "InteractiveHoverButton"
