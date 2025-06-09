import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import type { LucideIcon, LucideProps } from "lucide-react"

export interface IconProps extends Omit<LucideProps, "name"> {
  icon: LucideIcon
  size?: "sm" | "md" | "lg" | "xl"
}

const sizeStyles = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
}

const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ className, icon: IconComponent, size = "md", ...props }, ref) => {
    return (
      <IconComponent
        ref={ref}
        className={cn(sizeStyles[size], className)}
        {...props}
      />
    )
  }
)

Icon.displayName = "Icon"
export { Icon }
