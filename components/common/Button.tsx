import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link"
  size?: "sm" | "md" | "lg"
  icon?: LucideIcon
  iconPosition?: "left" | "right"
  href?: string
  fullWidth?: boolean
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
    ref,
  ) => {
    // Estilos base y variantes
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

    const variantStyles = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
      outline: "border border-primary text-primary hover:bg-primary/10",
      ghost: "hover:bg-muted hover:text-foreground",
      link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
    }

    const sizeStyles = {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4 py-2",
      lg: "h-11 px-6 text-lg",
    }

    const widthStyle = fullWidth ? "w-full" : ""

    const buttonClasses = cn(baseStyles, variantStyles[variant], sizeStyles[size], widthStyle, className)

    // Renderizar el contenido del botón
    const renderContent = () => (
      <>
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : Icon && iconPosition === "left" ? (
          <Icon className="mr-2 h-4 w-4" />
        ) : null}

        {children}

        {Icon && iconPosition === "right" && !isLoading ? <Icon className="ml-2 h-4 w-4" /> : null}
      </>
    )

    // Si hay un href, renderizar como Link
    if (href) {
      return (
        <Link href={href} className={buttonClasses}>
          {renderContent()}
        </Link>
      )
    }

    // De lo contrario, renderizar como botón
    return (
      <button className={buttonClasses} ref={ref} disabled={isLoading} {...props}>
        {renderContent()}
      </button>
    )
  },
)

Button.displayName = "Button"

export { Button }
