import type React from "react"
import type { LucideIcon } from "lucide-react"

export type FormStep = 1 | 2 | 3

export interface ContactFormData {
  name: string
  email: string
  company: string
  phone: string
  service: string
  message: string
}

export type FormErrors = {
  [K in keyof ContactFormData]?: string // Cada campo puede tener un mensaje de error
}

export interface FormFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  label?: string
  name: keyof ContactFormData
  icon: LucideIcon
  placeholder?: string
  type?: React.HTMLInputTypeAttribute
  as?: "input" | "textarea" | "select"
  options?: { value: string; label: string }[]
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  rows?: number
  error?: string // Nueva prop para el mensaje de error
}

export interface ContactFormStepProps {
  formData: ContactFormData
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  formErrors: FormErrors // Nueva prop para los errores del formulario
}

export interface FormNavigationProps {
  currentStep: FormStep
  prevStep: () => void
  nextStep: () => void
  canProceed: boolean
  isSubmitting: boolean
  handleSubmit: (e: React.FormEvent) => Promise<void>
}

export interface ContactInfoCardProps {
  icon: LucideIcon
  title: string
  content: string | string[]
  delay: number
}
