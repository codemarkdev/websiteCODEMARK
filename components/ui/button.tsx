import React from "react"

import { cn } from "@/lib/utils"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

const baseStyles =
  "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300"

const variantStyles = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-1 hover:shadow-lg",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  outline: "border border-primary text-primary hover:bg-primary/10 hover:-translate-y-1",
  ghost: "hover:bg-muted hover:text-foreground",
  link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
}

const sizeStyles = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 py-2",
  lg: "h-11 px-6 text-lg",
  icon: "h-9 w-9 p-0",
}

// <-- SOLO CAMBIO: export en la interface
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles
  size?: keyof typeof sizeStyles
  icon?: LucideIcon
  iconPosition?: "left" | "right"
  href?: string
  fullWidth?: boolean
  isLoading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon: Icon,
      iconPosition = "left",
      href,
      fullWidth = false,
      isLoading = false,
      children,
      ...props
    },
    ref
  ) => {
    const widthStyle = fullWidth ? "w-full" : ""

    const buttonClasses = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      widthStyle,
      className
    )

    const renderContent = () => (
      <>
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : Icon && iconPosition === "left" ? (
          <Icon className="mr-2 h-4 w-4" />
        ) : null}

        {children}

        {Icon && iconPosition === "right" && !isLoading ? (
          <Icon className="ml-2 h-4 w-4" />
        ) : null}
      </>
    )

    if (href) {
      // Link no acepta ref directo, ignora ref para Link
      return (
        <Link href={href} className={buttonClasses}>
          {renderContent()}
        </Link>
      )
    }

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={isLoading}
        {...props}
      >
        {renderContent()}
      </button>
    )
  }
)

Button.displayName = "Button"

// Exporta buttonVariants para usar estilos en otros componentes
export function buttonVariants({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
}: {
  variant?: keyof typeof variantStyles
  size?: keyof typeof sizeStyles
  fullWidth?: boolean
  className?: string
} = {}) {
  return cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    className
  )
}
