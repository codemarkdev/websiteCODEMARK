"use client"
import { Mail, User } from "lucide-react"
import { FormField } from "./FormField"
import type { ContactFormStepProps } from "../types"
import { ResponsiveText } from "@/components/ui/responsive-text"

export function ContactFormStep1({ formData, handleInputChange, formErrors }: ContactFormStepProps) {
  return (
    <>
      <ResponsiveText as="h3" size="xl" weight="semibold" className="mb-6 text-primary">
        Información Personal
      </ResponsiveText>
      <FormField
        name="name"
        placeholder="Tu nombre"
        icon={User}
        value={formData.name}
        onChange={handleInputChange}
        required
        error={formErrors.name} // Pasar el error
      />
      <FormField
        name="email"
        type="email"
        placeholder="Tu correo electrónico"
        icon={Mail}
        value={formData.email}
        onChange={handleInputChange}
        required
        error={formErrors.email} // Pasar el error
      />
    </>
  )
}
