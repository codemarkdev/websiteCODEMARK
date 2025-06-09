"use client"
import { MessageSquare } from "lucide-react"
import { FormField } from "./FormField"
import type { ContactFormStepProps } from "../types"
import { ResponsiveText } from "@/components/ui/responsive-text"

// Eliminamos la prop setCaptchaValue ya que no se usará
export function ContactFormStep3({ formData, handleInputChange, formErrors }: ContactFormStepProps) {
  return (
    <>
      <ResponsiveText as="h3" size="xl" weight="semibold" className="mb-6 text-primary">
        Detalles del Proyecto
      </ResponsiveText>
      <FormField
        name="message"
        as="textarea"
        placeholder="Cuéntanos sobre tu proyecto"
        icon={MessageSquare}
        value={formData.message}
        onChange={handleInputChange}
        required
        rows={6} // Increased rows for better message input
        error={formErrors.message} // Pasar el error
      />
      {/* Se ha eliminado el placeholder de reCAPTCHA y su lógica */}
    </>
  )
}
