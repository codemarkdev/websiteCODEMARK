"use client"
import { CheckCircle2 } from "lucide-react"
import { ResponsiveText } from "@/components/ui/responsive-text"

export function SuccessMessage() {
  return (
    <div className="text-center px-4 py-12">
      <div className="flex justify-center mb-6">
        <CheckCircle2 className="w-16 h-16 text-green-500" />
      </div>
      <ResponsiveText as="h3" size="3xl" weight="bold" className="mb-4 text-green-600 dark:text-green-400">
        ¡Mensaje enviado correctamente!
      </ResponsiveText>
      <p className="text-muted-foreground text-base max-w-xl mx-auto">
        Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible.
      </p>
    </div>
  )
}
