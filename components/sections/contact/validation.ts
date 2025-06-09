import type { ContactFormData, FormStep, FormErrors } from "./types"

export const validateField = (name: keyof ContactFormData, value: string): string | undefined => {
  let error: string | undefined
  switch (name) {
    case "name":
      if (!value.trim()) error = "El nombre es requerido."
      break
    case "email":
      if (!value.trim()) {
        error = "El correo electrónico es requerido."
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Formato de correo electrónico inválido."
      }
      break
    case "company":
      if (!value.trim()) error = "El nombre de la empresa es requerido."
      break
    case "phone":
      if (!value.trim()) {
        error = "El número de teléfono es requerido."
      } else if (!/^\+?[0-9\s-()]{7,20}$/.test(value)) {
        // Simple regex for phone numbers
        error = "Formato de teléfono inválido."
      }
      break
    case "service":
      if (!value) error = "Debes seleccionar un servicio."
      break
    case "message":
      if (!value.trim()) {
        error = "El mensaje es requerido."
      } else if (value.trim().length < 10) {
        error = "El mensaje debe tener al menos 10 caracteres."
      }
      break
  }
  return error
}

export const getStepErrors = (step: FormStep, currentFormData: ContactFormData): FormErrors => {
  const newErrors: FormErrors = {}

  if (step === 1) {
    const fields = ["name", "email"] as const
    fields.forEach((field) => {
      const error = validateField(field, currentFormData[field])
      if (error) {
        newErrors[field] = error
      }
    })
  } else if (step === 2) {
    const fields = ["company", "phone", "service"] as const
    fields.forEach((field) => {
      const error = validateField(field, currentFormData[field])
      if (error) {
        newErrors[field] = error
      }
    })
  } else if (step === 3) {
    const fields = ["message"] as const
    fields.forEach((field) => {
      const error = validateField(field, currentFormData[field])
      if (error) {
        newErrors[field] = error
      }
    })
  }
  return newErrors
}
