"use client"

import { Briefcase, Phone } from "lucide-react"
import { FormField } from "./FormField"
import type { ContactFormStepProps } from "../types"
import { ResponsiveText } from "@/components/ui/responsive-text"

export function ContactFormStep2({ formData, handleInputChange, formErrors }: ContactFormStepProps) {
  const serviceOptions = [
    { value: "web", label: "Desarrollo Web Personalizado" },
    { value: "security", label: "Ciberseguridad Avanzada" },
    { value: "ai", label: "Automatización con IA" },
    { value: "optimization", label: "Optimización y Rendimiento" },
    { value: "marketing", label: "Marketing Digital" },
    { value: "consulting", label: "Consultas Personalizadas" },
  ]

  return (
    <>
      <ResponsiveText as="h3" size="xl" weight="semibold" className="mb-6 text-primary text-center xs:text-left">
        Detalles de Contacto
      </ResponsiveText>

      <div className="space-y-4">
        <FormField
          name="company"
          placeholder="Nombre de tu empresa"
          icon={Briefcase}
          value={formData.company}
          onChange={handleInputChange}
          required
          error={formErrors.company}
        />

        <FormField
          name="phone"
          type="tel"
          placeholder="Número de teléfono"
          icon={Phone}
          value={formData.phone}
          onChange={handleInputChange}
          required
          error={formErrors.phone}
        />

        <FormField
          name="service"
          as="select"
          placeholder="Selecciona un servicio"
          icon={Briefcase}
          value={formData.service}
          onChange={handleInputChange}
          options={serviceOptions}
          required
          error={formErrors.service}
        />
      </div>
    </>
  )
}
