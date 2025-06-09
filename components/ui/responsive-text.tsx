import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveTextProps extends React.HTMLAttributes<HTMLElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl"
  responsive?: boolean
  weight?: "thin" | "extralight" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black"
  align?: "left" | "center" | "right" | "justify"
  color?: "default" | "muted" | "primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "info"
  transform?: "uppercase" | "lowercase" | "capitalize" | "normal-case"
  className?: string
  children: React.ReactNode
}

export function ResponsiveText({
  as: Component = "p",
  size = "base",
  responsive = true,
  weight = "normal",
  align = "left",
  color = "default",
  transform = "normal-case",
  className,
  children,
  ...props
}: ResponsiveTextProps) {
  // Tamaños base
  const baseSize = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
    "7xl": "text-7xl",
    "8xl": "text-8xl",
    "9xl": "text-9xl",
  }

  // Tamaños responsive (reducción para móviles)
  const responsiveSize = {
    xs: "text-xs",
    sm: "text-xs sm:text-sm",
    base: "text-sm sm:text-base",
    lg: "text-base sm:text-lg",
    xl: "text-lg sm:text-xl",
    "2xl": "text-xl sm:text-2xl",
    "3xl": "text-2xl sm:text-3xl",
    "4xl": "text-2xl sm:text-3xl md:text-4xl",
    "5xl": "text-3xl sm:text-4xl md:text-5xl",
    "6xl": "text-3xl sm:text-4xl md:text-6xl", // Adjusted for better mobile scaling
    "7xl": "text-4xl sm:text-5xl md:text-7xl", // Adjusted for better mobile scaling
    "8xl": "text-5xl sm:text-6xl md:text-8xl",
    "9xl": "text-6xl sm:text-7xl md:text-9xl",
  }

  // Pesos de fuente
  const fontWeight = {
    thin: "font-thin",
    extralight: "font-extralight",
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
    black: "font-black",
  }

  // Alineación de texto
  const textAlign = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  }

  // Colores de texto
  const textColor = {
    default: "text-foreground",
    muted: "text-muted-foreground",
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    success: "text-green-600 dark:text-green-500",
    warning: "text-amber-600 dark:text-amber-500",
    danger: "text-red-600 dark:text-red-500",
    info: "text-blue-600 dark:text-blue-500",
  }

  // Transformación de texto
  const textTransform = {
    uppercase: "uppercase",
    lowercase: "lowercase",
    capitalize: "capitalize",
    "normal-case": "normal-case",
  }

  return (
    <Component
      className={cn(
        responsive ? responsiveSize[size] : baseSize[size],
        fontWeight[weight],
        textAlign[align],
        textColor[color],
        textTransform[transform],
        "tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
